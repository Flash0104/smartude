# 📊 SmartUDE Database Schema

## 🏗️ Architecture Overview

SmartUDE uses **Supabase PostgreSQL** with Row Level Security (RLS) for secure, scalable data management. The database is designed to support international students throughout their UDE onboarding journey.

## 📋 Tables Overview

### 1. **user_profiles** - Student Information
Stores extended profile data for authenticated users.

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key, references `auth.users(id)` |
| `email` | TEXT | User email address |
| `full_name` | TEXT | Student's full name |
| `avatar_url` | TEXT | Profile picture URL |
| `student_id` | TEXT | UDE student identification number |
| `university_program` | TEXT | Degree program (e.g., "Computer Science MSc") |
| `semester_start` | DATE | When student started at UDE |
| `nationality` | TEXT | Student's nationality |
| `preferred_language` | TEXT | Interface language preference |
| `phone_number` | TEXT | Contact phone number |
| `emergency_contact_name` | TEXT | Emergency contact person |
| `emergency_contact_phone` | TEXT | Emergency contact number |
| `current_address` | TEXT | Current residential address |
| `housing_type` | TEXT | Type: 'dorm', 'wg', 'private', 'temporary' |
| `housing_status` | TEXT | Status: 'searching', 'applied', 'confirmed' |
| `onboarding_completed` | BOOLEAN | Whether onboarding is finished |
| `welcome_tour_completed` | BOOLEAN | Whether user completed app tour |
| `last_active_page` | TEXT | Last visited page for analytics |
| `notification_preferences` | JSONB | Notification settings |
| `privacy_settings` | JSONB | Privacy configuration |
| `created_at` | TIMESTAMPTZ | Profile creation timestamp |
| `updated_at` | TIMESTAMPTZ | Last update timestamp |

### 2. **checklist_progress** - Task Tracking
Tracks individual student progress through onboarding tasks.

| Column | Type | Description |
|--------|------|-------------|
| `id` | SERIAL | Primary key |
| `user_id` | UUID | References `auth.users(id)` |
| `progress_data` | JSONB | Task completion data |
| `total_items` | INTEGER | Total number of tasks |
| `completed_items` | INTEGER | Number of completed tasks |
| `completion_percentage` | DECIMAL(5,2) | Progress percentage |
| `arrival_completed` | INTEGER | Completed arrival tasks |
| `arrival_total` | INTEGER | Total arrival tasks |
| `registration_completed` | INTEGER | Completed registration tasks |
| `registration_total` | INTEGER | Total registration tasks |
| `housing_completed` | INTEGER | Completed housing tasks |
| `housing_total` | INTEGER | Total housing tasks |
| `integration_completed` | INTEGER | Completed integration tasks |
| `integration_total` | INTEGER | Total integration tasks |
| `first_task_completed_at` | TIMESTAMPTZ | When first task was completed |
| `last_task_completed_at` | TIMESTAMPTZ | When last task was completed |
| `estimated_completion_date` | DATE | Projected completion date |
| `created_at` | TIMESTAMPTZ | Record creation timestamp |
| `updated_at` | TIMESTAMPTZ | Last update timestamp |

### 3. **task_completion_log** - Audit Trail
Detailed log of all task completion events for analytics.

| Column | Type | Description |
|--------|------|-------------|
| `id` | SERIAL | Primary key |
| `user_id` | UUID | References `auth.users(id)` |
| `task_id` | TEXT | Unique task identifier |
| `task_category` | TEXT | Task category (arrival, registration, etc.) |
| `task_title` | TEXT | Human-readable task name |
| `completed_at` | TIMESTAMPTZ | When task was marked complete |
| `uncompleted_at` | TIMESTAMPTZ | When task was unmarked (nullable) |
| `completion_count` | INTEGER | Number of times marked complete |
| `device_type` | TEXT | Device used: 'mobile', 'desktop', 'tablet' |
| `user_agent` | TEXT | Browser/app information |
| `session_duration_seconds` | INTEGER | Time spent on task |
| `created_at` | TIMESTAMPTZ | Log entry timestamp |

## 🔐 Security Model

### Row Level Security (RLS)
All tables have RLS enabled with the following policies:

- **Users can only access their own data** using `auth.uid()`
- **No anonymous access** to user data
- **Admin policies prepared** but commented out for future use
- **Audit trail protection** in task completion log

### Authentication
- **Supabase Auth** with email/password and Google OAuth
- **JWT tokens** for session management
- **Email confirmation** required for new accounts
- **Password reset** flow supported

## 🔄 Database Triggers & Functions

### Automatic Statistics Updates
- **`update_checklist_statistics()`** - Auto-calculates completion percentages
- **`log_task_completion()`** - Creates audit trail entries
- **`update_updated_at_column()`** - Maintains timestamp consistency

### Performance Optimization
- **Indexes** on frequently queried columns
- **JSONB indexing** for progress data queries
- **Composite indexes** for analytics queries

## 📊 Entity Relationship Diagram

```
auth.users (Supabase)
    │
    │ 1:1
    ▼
user_profiles
    │
    │ 1:1
    ▼
checklist_progress
    │
    │ 1:many
    ▼
task_completion_log
```

## 🚀 API Usage Examples

### Creating User Profile
```javascript
import { createUserProfile } from '../supabaseClient'

const profile = await createUserProfile(userId, {
  full_name: "Jane Doe",
  nationality: "Germany",
  university_program: "Computer Science MSc",
  housing_status: "searching"
})
```

### Saving Checklist Progress
```javascript
import { saveChecklistProgress } from '../supabaseClient'

const progress = {
  "arrival-1": true,
  "arrival-2": false,
  "reg-1": true
}

await saveChecklistProgress(userId, progress)
```

### Retrieving User Data
```javascript
import { getUserProfile, getChecklistProgress } from '../supabaseClient'

const profile = await getUserProfile(userId)
const progress = await getChecklistProgress(userId)
```

## 📈 Analytics Capabilities

### Progress Tracking
- Individual task completion rates
- Category-wise progress analysis
- Time-to-completion metrics
- Device usage patterns

### Student Insights
- Most challenging tasks identification
- Completion time predictions
- Housing status tracking
- Nationality-based analytics

### Performance Metrics
- Average onboarding duration
- Task abandonment rates
- Peak usage times
- Success rate by category

## 🛠️ Migration Scripts

Run these scripts in order in your Supabase SQL Editor:

1. **`01_user_profiles.sql`** - Creates user profiles table
2. **`02_checklist_progress.sql`** - Creates progress tracking tables
3. **`03_rls_policies.sql`** - Applies security policies

## 🔧 Environment Setup

Required environment variables:
```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## 📊 Sample Data Structure

### Progress Data JSON Example
```json
{
  "arrival-1": true,
  "arrival-2": true, 
  "arrival-3": false,
  "arrival-4": false,
  "reg-1": true,
  "reg-2": false,
  "reg-3": false,
  "reg-4": false,
  "housing-1": false,
  "housing-2": false,
  "housing-3": false,
  "housing-4": false,
  "integration-1": false,
  "integration-2": false,
  "integration-3": false,
  "integration-4": false
}
```

### Notification Preferences JSON
```json
{
  "email": true,
  "push": false,
  "reminders": true,
  "deadline_alerts": true,
  "progress_updates": false
}
```

## 🔍 Query Performance Tips

1. **Use indexed columns** for WHERE clauses
2. **JSONB queries** use GIN indexes for performance
3. **Limit result sets** for mobile optimization
4. **Use prepared statements** for repeated queries
5. **Monitor query performance** in Supabase dashboard

## 🛡️ Data Privacy & GDPR

- **Right to deletion** - Users can delete their profiles
- **Data portability** - Export functionality available
- **Consent tracking** - Privacy settings stored
- **Audit trail** - All changes are logged
- **Anonymization** - Personal data can be anonymized

## 📞 Support & Monitoring

- **Supabase Dashboard** for real-time monitoring
- **Error logging** with Sentry integration
- **Performance monitoring** with built-in analytics
- **Backup strategy** with point-in-time recovery

---

**Last Updated**: January 2025  
**Database Version**: 1.0  
**Supabase Version**: Latest 