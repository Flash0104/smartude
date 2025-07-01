import {
    ChevronDownIcon,
    ChevronRightIcon,
    ExclamationTriangleIcon,
    LinkIcon,
    MapPinIcon
} from '@heroicons/react/24/outline'
import { useState } from 'react'

const Guide = () => {
  const [expandedSections, setExpandedSections] = useState({})

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  const guides = [
    {
      id: 'anmeldung',
      title: 'Anmeldung (Address Registration)',
      icon: '📋',
      priority: 'high',
      deadline: '14 days after arrival',
      description: 'Mandatory registration of your address in Germany',
      content: {
        overview: 'The Anmeldung is legally required for everyone living in Germany. You must register within 14 days of moving to a new address.',
        documents: [
          'Valid passport or ID',
          'Rental contract (Mietvertrag) or landlord confirmation (Wohnungsgeberbestätigung)',
          'Anmeldung form (available at Bürgeramt or online)',
          'Sometimes: Birth certificate (translated if not in German/English)'
        ],
        process: [
          'Make an appointment at your local Bürgeramt online or by phone',
          'Gather all required documents',
          'Attend your appointment and submit documents',
          'Receive your Anmeldebescheinigung (registration certificate)',
          'Keep the certificate safe - you\'ll need it for many other processes'
        ],
        locations: [
          {
            name: 'Bürgeramt Duisburg',
            address: 'Königstraße 22, 47051 Duisburg',
            phone: '+49 203 283-0',
            online: 'https://www.duisburg.de/buergerservice/'
          },
          {
            name: 'Bürgeramt Essen',
            address: 'Gildehof 8-10, 45128 Essen',
            phone: '+49 201 88-0',
            online: 'https://www.essen.de/buergerservice/'
          }
        ],
        tips: [
          'Book your appointment as soon as possible - slots fill up quickly',
          'Bring originals AND copies of all documents',
          'The process usually takes 30-60 minutes',
          'Some Bürgeramts accept walk-ins early in the morning'
        ]
      }
    },
    {
      id: 'visa',
      title: 'Visa & Residence Permit',
      icon: '🛂',
      priority: 'high',
      deadline: 'Before expiry',
      description: 'Student visa and residence permit requirements',
      content: {
        overview: 'Non-EU students need a valid visa and residence permit to study in Germany. The process varies by nationality.',
        documents: [
          'Valid passport',
          'University admission letter',
          'Proof of financial resources (blocked account or scholarship)',
          'Health insurance confirmation',
          'Academic transcripts',
          'Language proficiency certificates',
          'Passport photos (biometric)',
          'Completed application forms'
        ],
        process: [
          'Apply for student visa at German consulate in your home country',
          'Upon arrival, register your address (Anmeldung)',
          'Apply for residence permit at Ausländerbehörde',
          'Attend biometric data collection appointment',
          'Receive residence permit card'
        ],
        locations: [
          {
            name: 'Ausländerbehörde Duisburg',
            address: 'Landfermannstraße 17, 47051 Duisburg',
            phone: '+49 203 283-3333',
            online: 'https://www.duisburg.de/microsites/auslaenderbehoerde/'
          },
          {
            name: 'Ausländerbehörde Essen',
            address: 'Gildehof 8-10, 45128 Essen',
            phone: '+49 201 88-88333',
            online: 'https://www.essen.de/leben/auslaender_integration/'
          }
        ],
        tips: [
          'Start the process early - it can take several months',
          'Keep all documents organized and make multiple copies',
          'Check specific requirements for your nationality',
          'Consider using UDE\'s international office support services'
        ]
      }
    },
    {
      id: 'health-insurance',
      title: 'Health Insurance',
      icon: '🏥',
      priority: 'high',
      deadline: 'Before enrollment',
      description: 'Mandatory health insurance for all students',
      content: {
        overview: 'Health insurance is mandatory for all students in Germany. You can choose between public (gesetzlich) or private insurance.',
        documents: [
          'Student enrollment certificate',
          'Passport or ID',
          'Previous insurance certificate (if applicable)',
          'Bank account details',
          'Registration certificate (Anmeldebescheinigung)'
        ],
        process: [
          'Choose between public or private insurance',
          'Apply online or visit insurance office',
          'Submit required documents',
          'Receive insurance certificate',
          'Submit certificate to university for enrollment'
        ],
        locations: [
          {
            name: 'AOK Rheinland/Hamburg',
            address: 'Kaiserstraße 6, 47051 Duisburg',
            phone: '+49 203 3099-0',
            online: 'https://www.aok.de/pk/rh/'
          },
          {
            name: 'Techniker Krankenkasse',
            address: 'Kettwiger Str. 2-10, 45127 Essen',
            phone: '+49 800 285-85-85',
            online: 'https://www.tk.de/'
          }
        ],
        tips: [
          'Public insurance is usually cheaper for students (around €110/month)',
          'Private insurance might have better services but is harder to change',
          'Student discounts are available until age 30',
          'You can switch insurance types only under specific conditions'
        ]
      }
    },
    {
      id: 'bank-account',
      title: 'German Bank Account',
      icon: '🏦',
      priority: 'high',
      deadline: 'Within first weeks',
      description: 'Essential for rent, insurance, and daily transactions',
      content: {
        overview: 'A German bank account is essential for paying rent, receiving money, and daily transactions. Most services require a local account.',
        documents: [
          'Valid passport or ID',
          'Registration certificate (Anmeldebescheinigung)',
          'Student enrollment certificate',
          'Initial deposit (varies by bank)',
          'Sometimes: proof of income or scholarship'
        ],
        process: [
          'Research banks and their student offers',
          'Make an appointment online or by phone',
          'Attend appointment with all documents',
          'Receive temporary card and PIN by mail',
          'Receive permanent bank card within 1-2 weeks'
        ],
        locations: [
          {
            name: 'Deutsche Bank',
            address: 'Königstraße 48, 47051 Duisburg',
            phone: '+49 203 99288-0',
            online: 'https://www.deutsche-bank.de/'
          },
          {
            name: 'Sparkasse Essen',
            address: 'Am Hauptbahnhof 2, 45127 Essen',
            phone: '+49 201 185-0',
            online: 'https://www.sparkasse-essen.de/'
          }
        ],
        tips: [
          'Many banks offer free accounts for students',
          'Online banks like N26 or DKB are popular with students',
          'Compare fees, especially for international transfers',
          'Keep your PIN safe and memorize it - chip cards are standard'
        ]
      }
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-md mx-auto px-4 py-4">
          <h1 className="text-xl font-semibold text-gray-900">Visa & Registration Guide</h1>
          <p className="text-sm text-gray-600 mt-1">
            Step-by-step guides for essential legal requirements
          </p>
        </div>
      </div>

      {/* Important Notice */}
      <div className="max-w-md mx-auto px-4 py-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <div className="flex items-start space-x-3">
            <ExclamationTriangleIcon className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-red-900 mb-1">⚠️ Critical Deadlines</h3>
              <p className="text-sm text-red-800">
                Anmeldung must be completed within <strong>14 days</strong> of arrival. 
                Failure to register can result in fines up to €1,000.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Guide Sections */}
      <div className="max-w-md mx-auto px-4">
        <div className="space-y-4">
          {guides.map((guide) => {
            const isExpanded = expandedSections[guide.id]
            
            return (
              <div key={guide.id} className="card">
                {/* Guide Header */}
                <button
                  onClick={() => toggleSection(guide.id)}
                  className="w-full flex items-center justify-between p-0 bg-transparent border-none cursor-pointer"
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">{guide.icon}</span>
                    <div className="text-left">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-gray-900">{guide.title}</h3>
                        {guide.priority === 'high' && (
                          <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full font-medium">
                            High Priority
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{guide.description}</p>
                      {guide.deadline && (
                        <p className="text-xs text-red-600 font-medium mt-1">
                          📅 Deadline: {guide.deadline}
                        </p>
                      )}
                    </div>
                  </div>
                  <ChevronDownIcon 
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      isExpanded ? 'rotate-180' : ''
                    }`} 
                  />
                </button>

                {/* Guide Content */}
                {isExpanded && (
                  <div className="mt-4 border-t border-gray-100 pt-4 space-y-4">
                    {/* Overview */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">📖 Overview</h4>
                      <p className="text-sm text-gray-600">{guide.content.overview}</p>
                    </div>

                    {/* Required Documents */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">📄 Required Documents</h4>
                      <ul className="space-y-1">
                        {guide.content.documents.map((doc, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start">
                            <span className="text-ude-blue mr-2 mt-1">•</span>
                            {doc}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Process */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">⚡ Process</h4>
                      <ol className="space-y-2">
                        {guide.content.process.map((step, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start">
                            <span className="bg-ude-blue text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                              {index + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Locations */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">📍 Locations</h4>
                      <div className="space-y-3">
                        {guide.content.locations.map((location, index) => (
                          <div key={index} className="bg-gray-50 rounded-lg p-3">
                            <h5 className="font-medium text-gray-900">{location.name}</h5>
                            <div className="mt-1 space-y-1 text-sm text-gray-600">
                              <div className="flex items-center">
                                <MapPinIcon className="w-4 h-4 mr-2" />
                                {location.address}
                              </div>
                              <div className="flex items-center">
                                <span className="w-4 h-4 mr-2 text-center">📞</span>
                                {location.phone}
                              </div>
                              <div className="flex items-center">
                                <LinkIcon className="w-4 h-4 mr-2" />
                                <a 
                                  href={location.online} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-ude-blue hover:underline"
                                >
                                  Visit Website
                                </a>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tips */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">💡 Tips</h4>
                      <ul className="space-y-1">
                        {guide.content.tips.map((tip, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start">
                            <span className="text-ude-green mr-2 mt-1">✓</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Additional Resources */}
        <div className="mt-6 card">
          <h3 className="font-semibold text-gray-900 mb-3">🔗 Additional Resources</h3>
          <div className="space-y-2 text-sm">
            <a 
              href="https://www.uni-due.de/international/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-ude-blue hover:underline"
            >
              <ChevronRightIcon className="w-4 h-4 mr-1" />
              UDE International Office
            </a>
            <a 
              href="https://www.study-in-germany.de/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-ude-blue hover:underline"
            >
              <ChevronRightIcon className="w-4 h-4 mr-1" />
              Official Study in Germany Portal
            </a>
            <a 
              href="https://www.make-it-in-germany.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-ude-blue hover:underline"
            >
              <ChevronRightIcon className="w-4 h-4 mr-1" />
              Make it in Germany - Official Portal
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Guide 