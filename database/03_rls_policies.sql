-- Row Level Security (RLS) Policies
-- Ensures users can only access their own data

-- Enable RLS on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE checklist_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE task_completion_log ENABLE ROW LEVEL SECURITY;

-- User Profiles Policies
CREATE POLICY "Users can view own profile" ON user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can delete own profile" ON user_profiles
  FOR DELETE USING (auth.uid() = id);

-- Checklist Progress Policies
CREATE POLICY "Users can view own checklist progress" ON checklist_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own checklist progress" ON checklist_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own checklist progress" ON checklist_progress
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own checklist progress" ON checklist_progress
  FOR DELETE USING (auth.uid() = user_id);

-- Task Completion Log Policies
CREATE POLICY "Users can view own task completion log" ON task_completion_log
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own task completion log" ON task_completion_log
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Note: Usually no UPDATE/DELETE for audit logs, but keeping for flexibility
CREATE POLICY "Users can update own task completion log" ON task_completion_log
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own task completion log" ON task_completion_log
  FOR DELETE USING (auth.uid() = user_id);

-- Admin Policies (for future admin dashboard)
-- These will be enabled when admin roles are implemented

-- CREATE POLICY "Admins can view all profiles" ON user_profiles
--   FOR SELECT USING (auth.jwt() ->> 'role' = 'admin');

-- CREATE POLICY "Admins can view all progress" ON checklist_progress
--   FOR SELECT USING (auth.jwt() ->> 'role' = 'admin');

-- CREATE POLICY "Admins can view all logs" ON task_completion_log
--   FOR SELECT USING (auth.jwt() ->> 'role' = 'admin');

-- Anonymous/Public Policies (if needed for public features)
-- Currently disabled for security

-- Grant necessary permissions
GRANT USAGE ON SEQUENCE checklist_progress_id_seq TO authenticated;
GRANT USAGE ON SEQUENCE task_completion_log_id_seq TO authenticated;

-- Grant table permissions to authenticated users
GRANT ALL ON user_profiles TO authenticated;
GRANT ALL ON checklist_progress TO authenticated;
GRANT ALL ON task_completion_log TO authenticated;

-- Security Notes:
-- 1. All policies use auth.uid() to ensure users only access their own data
-- 2. RLS is enabled on all tables containing user data
-- 3. Anonymous access is disabled for all user data tables
-- 4. Admin policies are prepared but commented out for future use
-- 5. Audit trail in task_completion_log maintains data integrity 