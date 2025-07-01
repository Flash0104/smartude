-- User Profiles Table
-- Stores additional profile information for SmartUDE users

CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  
  -- Student Information
  student_id TEXT,
  university_program TEXT,
  semester_start DATE,
  nationality TEXT,
  preferred_language TEXT DEFAULT 'en',
  
  -- Contact Information
  phone_number TEXT,
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  
  -- Housing Information
  current_address TEXT,
  housing_type TEXT, -- 'dorm', 'wg', 'private', 'temporary'
  housing_status TEXT DEFAULT 'searching', -- 'searching', 'applied', 'confirmed'
  
  -- Progress Tracking
  onboarding_completed BOOLEAN DEFAULT FALSE,
  welcome_tour_completed BOOLEAN DEFAULT FALSE,
  last_active_page TEXT,
  
  -- Preferences
  notification_preferences JSONB DEFAULT '{"email": true, "push": false, "reminders": true}',
  privacy_settings JSONB DEFAULT '{"profile_visible": false, "share_progress": false}',
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_student_id ON user_profiles(student_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_housing_status ON user_profiles(housing_status);
CREATE INDEX IF NOT EXISTS idx_user_profiles_created_at ON user_profiles(created_at);

-- Update timestamp function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Auto-update updated_at timestamp
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column(); 