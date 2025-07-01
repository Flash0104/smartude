import {
    CheckCircleIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    ClockIcon,
    ExclamationTriangleIcon
} from '@heroicons/react/24/outline'
import { CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import {
    checklistCategories,
    getChecklistProgress,
    getProgressPercentage,
    toggleChecklistItem
} from '../utils/checklistData'

const Checklist = () => {
  const [progress, setProgress] = useState({})
  const [expandedCategories, setExpandedCategories] = useState({})
  const [progressPercentage, setProgressPercentage] = useState(0)

  useEffect(() => {
    setProgress(getChecklistProgress())
    setProgressPercentage(getProgressPercentage())
    // Expand the first category by default
    setExpandedCategories({ [checklistCategories[0].id]: true })
  }, [])

  const handleToggleItem = (itemId) => {
    const newProgress = toggleChecklistItem(itemId)
    setProgress(newProgress)
    setProgressPercentage(getProgressPercentage())
  }

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }))
  }

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return <ExclamationTriangleIcon className="w-4 h-4 text-red-500" />
      case 'medium':
        return <ClockIcon className="w-4 h-4 text-amber-500" />
      default:
        return <ClockIcon className="w-4 h-4 text-gray-400" />
    }
  }

  const getCategoryProgress = (category) => {
    const completed = category.items.filter(item => progress[item.id]).length
    return { completed, total: category.items.length }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">Onboarding Checklist</h1>
            <div className="text-right">
              <div className="text-2xl font-bold text-ude-blue">{progressPercentage}%</div>
              <div className="text-xs text-gray-500">Complete</div>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
            <div 
              className="bg-gradient-to-r from-ude-green to-emerald-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-md mx-auto px-4 py-4">
        <div className="space-y-4">
          {checklistCategories.map((category) => {
            const categoryProgress = getCategoryProgress(category)
            const isExpanded = expandedCategories[category.id]
            
            return (
              <div key={category.id} className="card">
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full flex items-center justify-between p-0 bg-transparent border-none cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${category.color}`}>
                      {categoryProgress.completed}/{categoryProgress.total}
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900">{category.title}</h3>
                      <p className="text-sm text-gray-600">{category.description}</p>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUpIcon className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                  )}
                </button>

                {/* Category Items */}
                {isExpanded && (
                  <div className="mt-4 space-y-3 border-t border-gray-100 pt-4">
                    {category.items.map((item) => {
                      const isCompleted = progress[item.id]
                      
                      return (
                        <div 
                          key={item.id} 
                          className={`flex items-start space-x-3 p-3 rounded-lg border transition-all ${
                            isCompleted 
                              ? 'bg-green-50 border-green-200' 
                              : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <button
                            onClick={() => handleToggleItem(item.id)}
                            className="mt-0.5 flex-shrink-0"
                          >
                            {isCompleted ? (
                              <CheckCircleIconSolid className="w-6 h-6 text-green-600" />
                            ) : (
                              <CheckCircleIcon className="w-6 h-6 text-gray-400 hover:text-green-500 transition-colors" />
                            )}
                          </button>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              {getPriorityIcon(item.priority)}
                              <h4 className={`font-medium ${isCompleted ? 'text-green-800 line-through' : 'text-gray-900'}`}>
                                {item.title}
                              </h4>
                            </div>
                            
                            <p className={`text-sm ${isCompleted ? 'text-green-700' : 'text-gray-600'}`}>
                              {item.description}
                            </p>
                            
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs text-gray-500">
                                ⏱️ {item.estimatedTime}
                              </span>
                              {item.deadline && (
                                <span className="text-xs font-medium text-red-600 bg-red-100 px-2 py-1 rounded">
                                  📅 {item.deadline}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Completion Message */}
        {progressPercentage === 100 && (
          <div className="mt-6 p-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg text-white text-center">
            <div className="text-4xl mb-3">🎉</div>
            <h3 className="text-xl font-bold mb-2">Congratulations!</h3>
            <p className="text-green-100">
              You've completed all onboarding tasks. Welcome to your new life at UDE!
            </p>
          </div>
        )}

        {/* Tips Section */}
        <div className="mt-6 card">
          <h3 className="font-semibold text-gray-900 mb-3">💡 Pro Tips</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Start with high-priority tasks (marked with ⚠️)</li>
            <li>• Some tasks have strict deadlines - pay attention to 📅 symbols</li>
            <li>• Keep important documents organized for easy access</li>
            <li>• Don't hesitate to ask for help at the International Office</li>
            <li>• Join student WhatsApp groups for real-time advice</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Checklist 