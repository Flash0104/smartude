import {
    CheckCircleIcon,
    DocumentTextIcon,
    ExclamationTriangleIcon,
    HomeIcon,
    HomeModernIcon,
    LinkIcon,
    UsersIcon
} from '@heroicons/react/24/outline'
import { useState } from 'react'

const Housing = () => {
  const [selectedType, setSelectedType] = useState('all')

  const housingTypes = [
    { id: 'all', label: 'All Options', icon: HomeIcon },
    { id: 'dorm', label: 'Student Dorms', icon: HomeModernIcon },
    { id: 'wg', label: 'Shared Flats (WG)', icon: UsersIcon },
    { id: 'private', label: 'Private Apartments', icon: HomeIcon },
  ]

  const housingOptions = [
    {
      id: 'studentenwerk-dorms',
      type: 'dorm',
      title: 'Studentenwerk Dorms',
      priceRange: '€180-€350/month',
      pros: ['Cheapest option', 'Utilities included', 'International community', 'Furnished rooms'],
      cons: ['Long waiting lists', 'Limited privacy', 'Strict rules', 'May be far from campus'],
      description: 'Official student housing managed by Studentenwerk',
      application: [
        'Apply online at studentenwerk.uni-due.de',
        'Submit documents (passport, admission letter)',
        'Pay application fee (usually €25)',
        'Wait for assignment (can take months)',
        'Accept offer within deadline'
      ],
      tips: [
        'Apply as early as possible',
        'Consider multiple dorm options',
        'Join waiting lists even if they seem long',
        'Have backup plans ready'
      ],
      contact: {
        website: 'https://www.studentenwerk.uni-due.de/wohnen/',
        phone: '+49 203 379-3333',
        email: 'wohnen@studentenwerk.uni-due.de'
      }
    },
    {
      id: 'private-dorms',
      type: 'dorm',
      title: 'Private Student Residences',
      priceRange: '€400-€700/month',
      pros: ['Modern facilities', 'Faster application', 'Good locations', 'All-inclusive pricing'],
      cons: ['More expensive', 'Less community feel', 'Commercial operation', 'Contracts can be strict'],
      description: 'Privately operated student housing with modern amenities',
      application: [
        'Search on websites like studentenapartments.de',
        'Visit or take virtual tours',
        'Submit application with documents',
        'Pay deposit and first month rent',
        'Sign rental contract'
      ],
      tips: [
        'Compare all-inclusive vs. separate utility costs',
        'Check reviews from current residents',
        'Understand cancellation policies',
        'Visit in person if possible'
      ],
      contact: {
        website: 'https://www.thestudenthotel.com/',
        phone: 'Various providers',
        email: 'Contact individual providers'
      }
    },
    {
      id: 'wg-shared',
      type: 'wg',
      title: 'WG (Wohngemeinschaft)',
      priceRange: '€300-€500/month',
      pros: ['Social experience', 'Shared costs', 'Cultural exchange', 'Flexible contracts'],
      cons: ['Personality conflicts', 'Shared responsibilities', 'Finding good flatmates', 'Variable quality'],
      description: 'Shared apartments with German and international students',
      application: [
        'Search on WG-Gesucht.de, Facebook groups',
        'Create attractive profile with photos',
        'Write personalized messages',
        'Attend WG viewings (Besichtigungen)',
        'Meet current flatmates'
      ],
      tips: [
        'Be quick to respond to listings',
        'Prepare documents in advance',
        'Be honest about lifestyle and habits',
        'Ask about house rules and expenses'
      ],
      contact: {
        website: 'https://www.wg-gesucht.de/',
        phone: 'Online platform',
        email: 'Through platform messaging'
      }
    },
    {
      id: 'private-apartments',
      type: 'private',
      title: 'Private Apartments',
      priceRange: '€500-€800/month',
      pros: ['Complete privacy', 'Your own space', 'No flatmate issues', 'Long-term stability'],
      cons: ['Most expensive', 'Requires German guarantor', 'Higher deposits', 'Utility setup needed'],
      description: 'Independent studio or one-bedroom apartments',
      application: [
        'Search on Immobilienscout24, Immowelt',
        'Prepare extensive documentation',
        'Attend viewing appointments',
        'Submit formal application',
        'Provide financial guarantees'
      ],
      tips: [
        'Budget for deposits (2-3 months rent)',
        'Get liability insurance (Haftpflichtversicherung)',
        'Consider location vs. rent trade-offs',
        'Understand German rental laws'
      ],
      contact: {
        website: 'https://www.immobilienscout24.de/',
        phone: 'Contact landlords directly',
        email: 'Through property portals'
      }
    }
  ]

  const filteredOptions = selectedType === 'all' 
    ? housingOptions 
    : housingOptions.filter(option => option.type === selectedType)

  const requiredDocuments = [
    'Passport or ID copy',
    'University admission letter',
    'Proof of income/scholarship',
    'SCHUFA credit report (for private rentals)',
    'Bank statements (last 3 months)',
    'Employment certificate (if working)',
    'Previous landlord reference',
    'Liability insurance confirmation'
  ]

  const anmeldungProcess = [
    {
      step: 1,
      title: 'Get Wohnungsgeberbestätigung',
      description: 'Your landlord must provide this confirmation document'
    },
    {
      step: 2,
      title: 'Book Bürgeramt Appointment',
      description: 'Schedule online or call as early as possible'
    },
    {
      step: 3,
      title: 'Complete Anmeldung',
      description: 'Bring passport, rental contract, and confirmation to appointment'
    },
    {
      step: 4,
      title: 'Receive Anmeldebescheinigung',
      description: 'Keep this document safe - needed for many processes'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-md mx-auto px-4 py-4">
          <h1 className="text-xl font-semibold text-gray-900">Housing Information</h1>
          <p className="text-sm text-gray-600 mt-1">
            Find your perfect home in Duisburg or Essen
          </p>
        </div>
      </div>

      {/* Important Notice */}
      <div className="max-w-md mx-auto px-4 py-4">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <ExclamationTriangleIcon className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-amber-900 mb-1">⏰ Start Early!</h3>
              <p className="text-sm text-amber-800">
                Housing in Germany is competitive. Start your search at least 2-3 months before arrival. 
                Student dorms have waiting lists that can be 6+ months long.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Housing Type Filter */}
      <div className="max-w-md mx-auto px-4">
        <div className="flex overflow-x-auto space-x-2 pb-2">
          {housingTypes.map((type) => {
            const Icon = type.icon
            const isSelected = selectedType === type.id
            
            return (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  isSelected
                    ? 'bg-ude-blue text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{type.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Housing Options */}
      <div className="max-w-md mx-auto px-4 mt-4">
        <div className="space-y-6">
          {filteredOptions.map((option) => (
            <div key={option.id} className="card">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{option.title}</h3>
                  <span className="bg-ude-green text-white text-sm font-medium px-3 py-1 rounded-full">
                    {option.priceRange}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{option.description}</p>
              </div>

              {/* Pros and Cons */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-medium text-green-800 mb-2">✅ Pros</h4>
                  <ul className="space-y-1">
                    {option.pros.map((pro, index) => (
                      <li key={index} className="text-xs text-gray-600 flex items-start">
                        <CheckCircleIcon className="w-3 h-3 text-green-500 mr-1 mt-0.5 flex-shrink-0" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-red-800 mb-2">⚠️ Cons</h4>
                  <ul className="space-y-1">
                    {option.cons.map((con, index) => (
                      <li key={index} className="text-xs text-gray-600 flex items-start">
                        <span className="text-red-500 mr-1 mt-0.5">•</span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Application Process */}
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">📋 Application Process</h4>
                <ol className="space-y-2">
                  {option.application.map((step, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start">
                      <span className="bg-ude-blue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Tips */}
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">💡 Tips</h4>
                <ul className="space-y-1">
                  {option.tips.map((tip, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start">
                      <span className="text-ude-green mr-2 mt-1">✓</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div className="bg-gray-50 rounded-lg p-3">
                <h4 className="font-medium text-gray-900 mb-2">📞 Contact</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center">
                    <LinkIcon className="w-4 h-4 mr-2" />
                    <a 
                      href={option.contact.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-ude-blue hover:underline"
                    >
                      Visit Website
                    </a>
                  </div>
                  {option.contact.phone !== 'Online platform' && option.contact.phone !== 'Various providers' && (
                    <div className="flex items-center">
                      <span className="w-4 h-4 mr-2 text-center">📞</span>
                      {option.contact.phone}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Required Documents */}
        <div className="mt-6 card">
          <h3 className="font-semibold text-gray-900 mb-3">📄 Documents You'll Need</h3>
          <div className="grid grid-cols-1 gap-2">
            {requiredDocuments.map((doc, index) => (
              <div key={index} className="flex items-center text-sm text-gray-600">
                <DocumentTextIcon className="w-4 h-4 text-ude-blue mr-2 flex-shrink-0" />
                {doc}
              </div>
            ))}
          </div>
          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              💡 <strong>Tip:</strong> Prepare multiple copies of all documents and have them translated into German if needed.
            </p>
          </div>
        </div>

        {/* Anmeldung Process */}
        <div className="mt-6 card">
          <h3 className="font-semibold text-gray-900 mb-3">🏠 After Finding Housing: Anmeldung</h3>
          <p className="text-sm text-gray-600 mb-4">
            You must register your address within 14 days of moving in. Here's the process:
          </p>
          <div className="space-y-3">
            {anmeldungProcess.map((item) => (
              <div key={item.step} className="flex items-start space-x-3">
                <span className="bg-ude-blue text-white text-sm rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0">
                  {item.step}
                </span>
                <div>
                  <h4 className="font-medium text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Budget Calculator */}
        <div className="mt-6 card">
          <h3 className="font-semibold text-gray-900 mb-3">💰 Budget Planning</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Student Dorm:</span>
              <span className="font-medium">€180-€350/month</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">WG Room:</span>
              <span className="font-medium">€300-€500/month</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Private Apartment:</span>
              <span className="font-medium">€500-€800/month</span>
            </div>
            <div className="border-t border-gray-200 pt-2 mt-2">
              <div className="flex justify-between">
                <span className="text-gray-600">+ Security Deposit:</span>
                <span className="font-medium">2-3 months rent</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">+ Utilities (if not included):</span>
                <span className="font-medium">€50-€150/month</span>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Housing */}
        <div className="mt-6 card">
          <h3 className="font-semibold text-gray-900 mb-3">🆘 Emergency Housing</h3>
          <p className="text-sm text-gray-600 mb-3">
            If you arrive without permanent housing, here are temporary options:
          </p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start">
              <span className="text-ude-blue mr-2 mt-1">•</span>
              Youth hostels in Duisburg/Essen (€25-40/night)
            </li>
            <li className="flex items-start">
              <span className="text-ude-blue mr-2 mt-1">•</span>
              Airbnb short-term rentals
            </li>
            <li className="flex items-start">
              <span className="text-ude-blue mr-2 mt-1">•</span>
              Facebook groups for short-term sublets
            </li>
            <li className="flex items-start">
              <span className="text-ude-blue mr-2 mt-1">•</span>
              Contact UDE International Office for emergency advice
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Housing 