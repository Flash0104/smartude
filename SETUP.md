# 🚀 SmartUDE Setup Guide

## 📋 Prerequisites

1. **Node.js 22+** installed
2. **Supabase account** ([supabase.com](https://supabase.com))
3. **Google Cloud Console** project for OAuth

## 🔧 Environment Setup

Create a `.env.local` file in the project root:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key

# Development
VITE_APP_URL=http://localhost:5173
```

## 🗄️ Database Setup

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Copy your project URL and anon key to `.env.local`

### 2. Run Database Migrations
Execute the SQL scripts in `/database/` folder in Supabase SQL Editor:

1. `01_user_profiles.sql` - User profiles table
2. `02_checklist_progress.sql` - Checklist progress tracking
3. `03_rls_policies.sql` - Row Level Security policies

### 3. Configure Google OAuth
1. Go to Supabase Dashboard → Authentication → Providers
2. Enable Google provider
3. Add your Google OAuth credentials:
   - **Client ID**: From Google Cloud Console
   - **Client Secret**: From Google Cloud Console
   - **Redirect URL**: `https://your-project.supabase.co/auth/v1/callback`

### 4. Google Cloud Console Setup
1. Create project at [console.cloud.google.com](https://console.cloud.google.com)
2. Enable Google+ API
3. Create OAuth 2.0 credentials
4. Add authorized redirect URIs:
   - `https://your-project.supabase.co/auth/v1/callback`
   - `http://localhost:5173/profile` (for development)

## 🚀 Development

```bash
npm install
npm run dev
```

## 📱 Production Deployment

### Vercel Deployment
1. Connect GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Update `VITE_APP_URL` to your production domain

### Netlify Deployment
1. Connect repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variables in Netlify dashboard

## 🔒 Security Checklist

- [ ] Environment variables are not committed to git
- [ ] Row Level Security (RLS) enabled on all tables
- [ ] Google OAuth redirect URIs are properly configured
- [ ] Supabase API keys are correctly set
- [ ] Production URLs are updated in environment variables

## 📊 Database Schema Overview

- **user_profiles**: Student profile information
- **checklist_progress**: Individual checklist completion tracking
- **Real-time subscriptions**: Live progress updates across devices

## 🛠️ Troubleshooting

### Common Issues
1. **White screen**: Check browser console for JavaScript errors
2. **Auth not working**: Verify Google OAuth configuration
3. **Database errors**: Check RLS policies and table permissions
4. **Environment variables**: Ensure `.env.local` is properly configured

### Support
- **UDE International Office**: +49 203 379-2740
- **Technical Issues**: Check GitHub repository issues 