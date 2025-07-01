import { AcademicCapIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { getCompletedItemsCount, getProgressPercentage, getTotalItemsCount } from '../utils/checklistData'

const Home = () => {
  const progressPercentage = getProgressPercentage()
  const completedItems = getCompletedItemsCount()
  const totalItems = getTotalItemsCount()

  const quickActions = [
    {
      title: 'Onboarding Checklist',
      description: 'Track your progress through essential tasks',
      link: '/checklist',
      icon: '✅',
      progress: `${completedItems}/${totalItems} completed`,
    },
    {
      title: 'Visa & Anmeldung Guide',
      description: 'Step-by-step guides for legal requirements',
      link: '/guide',
      icon: '📋',
    },
    {
      title: 'Campus & City Map',
      description: 'Find important locations around UDE',
      link: '/map',
      icon: '🗺️',
    },
    {
      title: 'Housing Information',
      description: 'Find dorms, WGs, and rental tips',
      link: '/housing',
      icon: '🏠',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-ude-blue to-ude-lightblue text-white">
        <div className="max-w-md mx-auto px-4 py-8">
          <div className="flex items-center mb-4">
            <AcademicCapIcon className="w-8 h-8 mr-3" />
            <h1 className="text-2xl font-bold">SmartUDE</h1>
          </div>
          <p className="text-blue-100 text-lg leading-relaxed">
            Welcome to your onboarding assistant at the University of Duisburg-Essen! 
            Let's make your transition to student life in Germany smooth and stress-free.
          </p>
        </div>
      </div>

      {/* Progress Section */}
      <div className="max-w-md mx-auto px-4 -mt-4">
        <div className="card card-hover">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-900">Your Progress</h2>
            <span className="text-2xl font-bold text-ude-blue">{progressPercentage}%</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
            <div 
              className="bg-gradient-to-r from-ude-green to-emerald-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          
          <p className="text-sm text-gray-600">
            {completedItems} of {totalItems} onboarding tasks completed
          </p>
          
          {completedItems === 0 && (
            <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                🎯 <strong>Get started:</strong> Complete your first task in the checklist to begin your UDE journey!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-md mx-auto px-4 mt-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        
        <div className="space-y-3">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className="card card-hover block group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">{action.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 group-hover:text-ude-blue transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {action.description}
                    </p>
                    {action.progress && (
                      <p className="text-xs text-ude-blue font-medium mt-1">
                        {action.progress}
                      </p>
                    )}
                  </div>
                </div>
                <ChevronRightIcon className="w-5 h-5 text-gray-400 group-hover:text-ude-blue transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Important Notice */}
      <div className="max-w-md mx-auto px-4 mt-6">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h3 className="font-medium text-amber-900 mb-2">⚠️ Important Reminder</h3>
          <p className="text-sm text-amber-800">
            Remember to complete your <strong>Anmeldung (address registration)</strong> within 
            14 days of arrival in Germany. This is legally required and affects many other processes.
          </p>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="max-w-md mx-auto px-4 mt-6 mb-6">
        <div className="card">
          <h3 className="font-medium text-gray-900 mb-3">🆘 Emergency Contacts</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">UDE International Office:</span>
              <span className="font-medium">+49 203 379-2740</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Emergency (Police/Fire):</span>
              <span className="font-medium">112</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Medical Emergency:</span>
              <span className="font-medium">116 117</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home 