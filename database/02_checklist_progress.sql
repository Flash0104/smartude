-- Checklist Progress Table
-- Tracks user progress through onboarding tasks

CREATE TABLE IF NOT EXISTS checklist_progress (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Progress Data (stored as JSONB for flexibility)
  progress_data JSONB DEFAULT '{}',
  
  -- Quick access statistics
  total_items INTEGER DEFAULT 0,
  completed_items INTEGER DEFAULT 0,
  completion_percentage DECIMAL(5,2) DEFAULT 0.00,
  
  -- Category completion tracking
  arrival_completed INTEGER DEFAULT 0,
  arrival_total INTEGER DEFAULT 4,
  registration_completed INTEGER DEFAULT 0,
  registration_total INTEGER DEFAULT 4,
  housing_completed INTEGER DEFAULT 0,
  housing_total INTEGER DEFAULT 4,
  integration_completed INTEGER DEFAULT 0,
  integration_total INTEGER DEFAULT 4,
  
  -- Timestamps
  first_task_completed_at TIMESTAMP WITH TIME ZONE,
  last_task_completed_at TIMESTAMP WITH TIME ZONE,
  estimated_completion_date DATE,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ensure one record per user
  UNIQUE(user_id)
);

-- Task Completion Log (for detailed tracking and analytics)
CREATE TABLE IF NOT EXISTS task_completion_log (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  task_id TEXT NOT NULL,
  task_category TEXT NOT NULL,
  task_title TEXT NOT NULL,
  
  -- Completion details
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  uncompleted_at TIMESTAMP WITH TIME ZONE, -- If task was unmarked
  completion_count INTEGER DEFAULT 1, -- How many times marked complete
  
  -- Additional metadata
  device_type TEXT, -- 'mobile', 'desktop', 'tablet'
  user_agent TEXT,
  session_duration_seconds INTEGER,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_checklist_progress_user_id ON checklist_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_checklist_progress_completion_percentage ON checklist_progress(completion_percentage);
CREATE INDEX IF NOT EXISTS idx_checklist_progress_updated_at ON checklist_progress(updated_at);

CREATE INDEX IF NOT EXISTS idx_task_completion_log_user_id ON task_completion_log(user_id);
CREATE INDEX IF NOT EXISTS idx_task_completion_log_task_id ON task_completion_log(task_id);
CREATE INDEX IF NOT EXISTS idx_task_completion_log_completed_at ON task_completion_log(completed_at);
CREATE INDEX IF NOT EXISTS idx_task_completion_log_task_category ON task_completion_log(task_category);

-- Function to update checklist statistics
CREATE OR REPLACE FUNCTION update_checklist_statistics()
RETURNS TRIGGER AS $$
DECLARE
  progress_obj JSONB;
  total_count INTEGER := 0;
  completed_count INTEGER := 0;
  category_stats JSONB;
BEGIN
  -- Parse progress data
  progress_obj := NEW.progress_data;
  
  -- Count total and completed items
  SELECT 
    COUNT(*) as total,
    COUNT(*) FILTER (WHERE value::boolean = true) as completed
  INTO total_count, completed_count
  FROM jsonb_each(progress_obj);
  
  -- Update statistics
  NEW.total_items := total_count;
  NEW.completed_items := completed_count;
  NEW.completion_percentage := CASE 
    WHEN total_count > 0 THEN (completed_count::decimal / total_count::decimal) * 100
    ELSE 0
  END;
  
  -- Update timestamp tracking
  IF completed_count > 0 AND OLD.completed_items = 0 THEN
    NEW.first_task_completed_at := NOW();
  END IF;
  
  IF completed_count > OLD.completed_items THEN
    NEW.last_task_completed_at := NOW();
  END IF;
  
  -- Calculate estimated completion date (based on current progress rate)
  IF completed_count > 0 AND completed_count < total_count THEN
    NEW.estimated_completion_date := CURRENT_DATE + 
      INTERVAL '1 day' * ((total_count - completed_count) * 2); -- Assume 2 days per remaining task
  ELSIF completed_count = total_count THEN
    NEW.estimated_completion_date := CURRENT_DATE;
  END IF;
  
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-update statistics
DROP TRIGGER IF EXISTS update_checklist_statistics_trigger ON checklist_progress;
CREATE TRIGGER update_checklist_statistics_trigger
  BEFORE UPDATE ON checklist_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_checklist_statistics();

-- Function to log task completion
CREATE OR REPLACE FUNCTION log_task_completion()
RETURNS TRIGGER AS $$
DECLARE
  old_progress JSONB;
  new_progress JSONB;
  task_key TEXT;
  task_value BOOLEAN;
  old_value BOOLEAN;
BEGIN
  old_progress := COALESCE(OLD.progress_data, '{}'::jsonb);
  new_progress := NEW.progress_data;
  
  -- Check for changes in task completion
  FOR task_key, task_value IN SELECT * FROM jsonb_each_text(new_progress)
  LOOP
    old_value := COALESCE((old_progress->task_key)::boolean, false);
    
    -- If task was just completed
    IF task_value::boolean = true AND old_value = false THEN
      INSERT INTO task_completion_log (
        user_id, 
        task_id, 
        task_category, 
        task_title,
        completed_at
      ) VALUES (
        NEW.user_id,
        task_key,
        SPLIT_PART(task_key, '-', 1), -- Extract category from task ID
        task_key, -- Will be updated with actual title in application
        NOW()
      );
    END IF;
    
    -- If task was uncompleted
    IF task_value::boolean = false AND old_value = true THEN
      UPDATE task_completion_log 
      SET uncompleted_at = NOW()
      WHERE user_id = NEW.user_id 
        AND task_id = task_key 
        AND uncompleted_at IS NULL;
    END IF;
  END LOOP;
  
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to log task completions
DROP TRIGGER IF EXISTS log_task_completion_trigger ON checklist_progress;
CREATE TRIGGER log_task_completion_trigger
  AFTER UPDATE ON checklist_progress
  FOR EACH ROW
  EXECUTE FUNCTION log_task_completion(); 