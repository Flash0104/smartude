import {
    ArrowRightOnRectangleIcon,
    CheckCircleIcon,
    EnvelopeIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
    LockClosedIcon,
    UserIcon,
    UserPlusIcon
} from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import {
    createUserProfile,
    getCurrentUser,
    getUserProfile,
    onAuthStateChange,
    saveChecklistProgress,
    signIn,
    signInWithGoogle,
    signOut,
    signUp
} from '../supabaseClient'
import { getCompletedItemsCount, getProgressPercentage, getTotalItemsCount } from '../utils/checklistData'

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
)

const Profile = () => {
  const [user, setUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authMode, setAuthMode] = useState('login') // 'login' or 'signup'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    checkUser()
    
    // Listen for auth changes
    const { data: authListener } = onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setUser(session.user)
        await loadUserProfile(session.user.id)
        await syncLocalProgress(session.user.id)
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
        setUserProfile(null)
      }
    })

    return () => {
      authListener?.subscription?.unsubscribe()
    }
  }, [])

  const checkUser = async () => {
    try {
      const { user, error } = await getCurrentUser()
      if (error) {
        console.error('Auth error:', error)
        setError('Authentication service unavailable. Please try again later.')
        return
      }
      
      setUser(user)
      if (user) {
        await loadUserProfile(user.id)
      }
    } catch (error) {
      console.error('Error checking user:', error)
      setError('Unable to connect to authentication service. Check your internet connection.')
    } finally {
      setLoading(false)
    }
  }

  const loadUserProfile = async (userId) => {
    try {
      const { data, error } = await getUserProfile(userId)
      if (error && error.code !== 'PGRST116') { // Not found error is OK
        console.error('Profile error:', error)
        return
      }
      setUserProfile(data)
    } catch (error) {
      console.error('Error loading profile:', error)
    }
  }

  const syncLocalProgress = async (userId) => {
    try {
      const localProgress = JSON.parse(localStorage.getItem('smartude-checklist') || '{}')
      if (Object.keys(localProgress).length > 0) {
        await saveChecklistProgress(userId, localProgress)
        setMessage('Your local progress has been synced to your account!')
      }
    } catch (error) {
      console.error('Error syncing progress:', error)
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setError('')
    
    try {
      const { error } = await signInWithGoogle()
      if (error) {
        setError('Google sign-in failed: ' + error.message)
      }
      // Note: The actual sign-in will be handled by the auth state change listener
    } catch (error) {
      setError('Google sign-in is temporarily unavailable. Please try email sign-in.')
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { data, error } = await signIn(formData.email, formData.password)
      
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          setError('Invalid email or password. Please check your credentials.')
        } else if (error.message.includes('Email not confirmed')) {
          setError('Please check your email and click the confirmation link.')
        } else {
          setError(error.message)
        }
      } else {
        setMessage('Successfully logged in!')
        setFormData({ email: '', password: '', confirmPassword: '' })
      }
    } catch (error) {
      setError('Sign-in service is temporarily unavailable. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)
    setError('')

    try {
      const { data, error } = await signUp(formData.email, formData.password)
      
      if (error) {
        if (error.message.includes('User already registered')) {
          setError('An account with this email already exists. Try signing in instead.')
        } else {
          setError(error.message)
        }
      } else {
        // Check if user needs to confirm email
        if (data.user && !data.session) {
          setMessage('✉️ Check your email! Click the confirmation link to activate your account.')
        } else {
          setMessage('Success! Check your email for the confirmation link.')
        }
        setFormData({ email: '', password: '', confirmPassword: '' })
        
        // Create user profile after successful signup
        if (data.user) {
          await createUserProfile(data.user.id, {
            email: data.user.email,
            full_name: data.user.user_metadata?.full_name || ''
          })
        }
      }
    } catch (error) {
      setError('Registration service is temporarily unavailable. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      setMessage('Successfully logged out!')
    } catch (error) {
      setError('Error signing out')
    }
  }

  const clearLocalData = () => {
    if (confirm('This will clear all your local checklist progress. Are you sure?')) {
      localStorage.removeItem('smartude-checklist')
      setMessage('Local data cleared successfully!')
      setTimeout(() => window.location.reload(), 1000)
    }
  }

  const progressPercentage = getProgressPercentage()
  const completedItems = getCompletedItemsCount()
  const totalItems = getTotalItemsCount()

  if (loading && !user) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ude-blue mx-auto"></div>
          <p className="text-gray-500 mt-2">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-md mx-auto px-4 py-4">
          <h1 className="text-xl font-semibold text-gray-900">Profile</h1>
          <p className="text-sm text-gray-600 mt-1">
            {user ? 'Manage your account and settings' : 'Sign in to save your progress'}
          </p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-4">
        {/* Messages */}
        {message && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <div className="flex items-start space-x-3">
              <CheckCircleIcon className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-green-800">{message}</p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <div className="flex items-start space-x-3">
              <ExclamationTriangleIcon className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          </div>
        )}

        {user ? (
          /* Logged In View */
          <div className="space-y-6">
            {/* User Info */}
            <div className="card">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-ude-blue text-white p-3 rounded-full">
                  <UserIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {userProfile?.full_name || 'Welcome back!'}
                  </h3>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  {user.user_metadata?.provider === 'google' && (
                    <span className="inline-flex items-center text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full mt-1">
                      <GoogleIcon />
                      <span className="ml-1">Google Account</span>
                    </span>
                  )}
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Your Progress</h4>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Onboarding Checklist</span>
                  <span className="font-medium text-ude-blue">{progressPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-ude-green to-emerald-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {completedItems} of {totalItems} tasks completed
                </p>
                <p className="text-xs text-green-600 mt-1">
                  ✓ Progress synced across all devices
                </p>
              </div>
            </div>

            {/* Account Actions */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Account Settings</h3>
              <div className="space-y-3">
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <ArrowRightOnRectangleIcon className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700">Sign Out</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Data Management */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Data Management</h3>
              <div className="space-y-3">
                <button
                  onClick={clearLocalData}
                  className="w-full flex items-center justify-between p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
                    <div className="text-left">
                      <span className="text-red-700 font-medium">Clear Local Progress</span>
                      <p className="text-xs text-red-600">Reset checklist progress on this device</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Not Logged In View */
          <div className="space-y-6">
            {/* Benefits Card */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-3">Why Create an Account?</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Save your checklist progress across devices
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Access personalized recommendations
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Get reminders for important deadlines
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Connect with other international students
                </li>
              </ul>
            </div>

            {/* Google Auth Button */}
            <div className="card">
              <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full flex items-center justify-center space-x-3 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600"></div>
                ) : (
                  <>
                    <GoogleIcon />
                    <span>Continue with Google</span>
                  </>
                )}
              </button>
              
              <div className="flex items-center my-4">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="px-4 text-sm text-gray-500">or</span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>
            </div>

            {/* Auth Form */}
            <div className="card">
              <div className="flex space-x-4 mb-4">
                <button
                  onClick={() => setAuthMode('login')}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    authMode === 'login'
                      ? 'bg-ude-blue text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setAuthMode('signup')}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    authMode === 'signup'
                      ? 'bg-ude-blue text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              <form onSubmit={authMode === 'login' ? handleLogin : handleSignup} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <EnvelopeIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ude-blue focus:border-ude-blue"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <LockClosedIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ude-blue focus:border-ude-blue"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                {authMode === 'signup' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <LockClosedIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ude-blue focus:border-ude-blue"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <>
                      {authMode === 'login' ? (
                        <ArrowRightOnRectangleIcon className="w-4 h-4" />
                      ) : (
                        <UserPlusIcon className="w-4 h-4" />
                      )}
                      <span>{authMode === 'login' ? 'Sign In' : 'Create Account'}</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Local Progress Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <InformationCircleIcon className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-blue-900 mb-1">Your Progress is Saved Locally</h3>
                  <p className="text-sm text-blue-800">
                    Your checklist progress is currently saved on this device. 
                    Create an account to sync it across all your devices and never lose your progress.
                  </p>
                  <div className="mt-2 text-sm text-blue-700">
                    Current progress: <strong>{progressPercentage}%</strong> ({completedItems}/{totalItems} tasks)
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* App Info */}
        <div className="mt-6 card">
          <h3 className="font-semibold text-gray-900 mb-3">About SmartUDE</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>
              SmartUDE is your comprehensive onboarding assistant for the University of Duisburg-Essen.
            </p>
            <p>
              Version 1.0 • Built with ❤️ for international students
            </p>
            <div className="pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Need help? Contact the UDE International Office at +49 203 379-2740
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile 