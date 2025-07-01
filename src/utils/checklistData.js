// Checklist categories and items for UDE onboarding
export const checklistCategories = [
  {
    id: 'arrival',
    title: 'First Week - Arrival',
    description: 'Essential tasks to complete immediately upon arrival',
    color: 'bg-red-100 text-red-800',
    items: [
      {
        id: 'arrival-1',
        title: 'Find temporary accommodation',
        description: 'Book a hostel/hotel or stay with friends until permanent housing is secured',
        priority: 'high',
        estimatedTime: '1-2 days',
        completed: false,
      },
      {
        id: 'arrival-2',
        title: 'Get a German SIM card',
        description: 'Essential for communication and navigation',
        priority: 'high',
        estimatedTime: '1 hour',
        completed: false,
      },
      {
        id: 'arrival-3',
        title: 'Register at UDE International Office',
        description: 'Complete your university enrollment process',
        priority: 'high',
        estimatedTime: '2-3 hours',
        completed: false,
      },
      {
        id: 'arrival-4',
        title: 'Open a German bank account',
        description: 'Required for rent payments and blocked account release',
        priority: 'high',
        estimatedTime: '1-2 hours',
        completed: false,
      },
    ],
  },
  {
    id: 'registration',
    title: 'Registration & Documentation',
    description: 'Legal requirements and important registrations',
    color: 'bg-amber-100 text-amber-800',
    items: [
      {
        id: 'reg-1',
        title: 'Anmeldung (Address Registration)',
        description: 'Register your address at the local Bürgeramt within 14 days',
        priority: 'high',
        estimatedTime: '2-3 hours',
        completed: false,
        deadline: '14 days after arrival',
      },
      {
        id: 'reg-2',
        title: 'Get your Steuerliche Identifikationsnummer',
        description: 'Tax ID automatically sent after Anmeldung',
        priority: 'medium',
        estimatedTime: 'Automatic',
        completed: false,
      },
      {
        id: 'reg-3',
        title: 'Health insurance registration',
        description: 'Mandatory for all students in Germany',
        priority: 'high',
        estimatedTime: '1-2 hours',
        completed: false,
      },
      {
        id: 'reg-4',
        title: 'Register for courses',
        description: 'Complete course registration through UDE systems',
        priority: 'high',
        estimatedTime: '2-3 hours',
        completed: false,
      },
    ],
  },
  {
    id: 'housing',
    title: 'Housing & Living',
    description: 'Secure permanent accommodation and set up utilities',
    color: 'bg-blue-100 text-blue-800',
    items: [
      {
        id: 'housing-1',
        title: 'Find permanent housing',
        description: 'Student dorm, WG, or private apartment',
        priority: 'high',
        estimatedTime: '1-4 weeks',
        completed: false,
      },
      {
        id: 'housing-2',
        title: 'Sign rental contract',
        description: 'Review contract terms carefully before signing',
        priority: 'high',
        estimatedTime: '1 day',
        completed: false,
      },
      {
        id: 'housing-3',
        title: 'Set up internet',
        description: 'Arrange internet connection with German providers',
        priority: 'medium',
        estimatedTime: '2-4 weeks setup time',
        completed: false,
      },
      {
        id: 'housing-4',
        title: 'Get apartment insurance',
        description: 'Haftpflichtversicherung and household insurance',
        priority: 'medium',
        estimatedTime: '1 hour',
        completed: false,
      },
    ],
  },
  {
    id: 'integration',
    title: 'Campus & Social Integration',
    description: 'Connect with the university community and student life',
    color: 'bg-green-100 text-green-800',
    items: [
      {
        id: 'integration-1',
        title: 'Attend orientation events',
        description: 'Join UDE orientation week and international student events',
        priority: 'medium',
        estimatedTime: 'Multiple days',
        completed: false,
      },
      {
        id: 'integration-2',
        title: 'Get student ID and library card',
        description: 'Access campus facilities and library resources',
        priority: 'medium',
        estimatedTime: '1 hour',
        completed: false,
      },
      {
        id: 'integration-3',
        title: 'Join student organizations',
        description: 'Find clubs, societies, or student groups that interest you',
        priority: 'low',
        estimatedTime: 'Ongoing',
        completed: false,
      },
      {
        id: 'integration-4',
        title: 'Explore Duisburg/Essen',
        description: 'Get familiar with your new city and transportation',
        priority: 'low',
        estimatedTime: 'Ongoing',
        completed: false,
      },
    ],
  },
]

// LocalStorage utilities
export const getChecklistProgress = () => {
  try {
    const saved = localStorage.getItem('smartude-checklist')
    return saved ? JSON.parse(saved) : {}
  } catch (error) {
    console.error('Error loading checklist progress:', error)
    return {}
  }
}

export const saveChecklistProgress = (progress) => {
  try {
    localStorage.setItem('smartude-checklist', JSON.stringify(progress))
  } catch (error) {
    console.error('Error saving checklist progress:', error)
  }
}

export const toggleChecklistItem = (itemId) => {
  const progress = getChecklistProgress()
  progress[itemId] = !progress[itemId]
  saveChecklistProgress(progress)
  return progress
}

export const getCompletedItemsCount = () => {
  const progress = getChecklistProgress()
  return Object.values(progress).filter(Boolean).length
}

export const getTotalItemsCount = () => {
  return checklistCategories.reduce((total, category) => {
    return total + category.items.length
  }, 0)
}

export const getProgressPercentage = () => {
  const completed = getCompletedItemsCount()
  const total = getTotalItemsCount()
  return total > 0 ? Math.round((completed / total) * 100) : 0
} 