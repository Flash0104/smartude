import {
    AcademicCapIcon,
    BuildingOfficeIcon,
    ClockIcon,
    HeartIcon,
    HomeIcon,
    MapPinIcon,
    PhoneIcon,
    ShoppingBagIcon,
    TruckIcon
} from '@heroicons/react/24/outline'
import { useState } from 'react'

const Map = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', label: 'All', icon: MapPinIcon, color: 'text-gray-600' },
    { id: 'university', label: 'University', icon: AcademicCapIcon, color: 'text-ude-blue' },
    { id: 'government', label: 'Government', icon: BuildingOfficeIcon, color: 'text-red-600' },
    { id: 'housing', label: 'Housing', icon: HomeIcon, color: 'text-green-600' },
    { id: 'shopping', label: 'Shopping', icon: ShoppingBagIcon, color: 'text-purple-600' },
    { id: 'healthcare', label: 'Healthcare', icon: HeartIcon, color: 'text-pink-600' },
    { id: 'transport', label: 'Transport', icon: TruckIcon, color: 'text-orange-600' },
  ]

  const locations = [
    // University Locations
    {
      id: 'ude-duisburg',
      name: 'UDE Duisburg Campus',
      category: 'university',
      address: 'Forsthausweg 2, 47057 Duisburg',
      description: 'Main campus with engineering, natural sciences, and business studies',
      phone: '+49 203 379-0',
      hours: 'Mon-Fri: 7:00-22:00, Sat: 8:00-20:00',
      tips: ['Student cafeteria available', 'Multiple library locations', 'Free WiFi across campus']
    },
    {
      id: 'ude-essen',
      name: 'UDE Essen Campus',
      category: 'university',
      address: 'Universitätsstraße 2, 45141 Essen',
      description: 'Campus focusing on humanities, social sciences, and medicine',
      phone: '+49 201 183-1',
      hours: 'Mon-Fri: 7:00-22:00, Sat: 8:00-20:00',
      tips: ['Medical school located here', 'Extensive library system', 'Student services center']
    },
    {
      id: 'international-office',
      name: 'International Office',
      category: 'university',
      address: 'Geibelstraße 41, 47057 Duisburg',
      description: 'Support for international students and exchange programs',
      phone: '+49 203 379-2740',
      hours: 'Mon-Thu: 9:00-16:00, Fri: 9:00-15:00',
      tips: ['Visa and residence permit help', 'Orientation events', 'Emergency contact point']
    },

    // Government Offices
    {
      id: 'buergeramt-duisburg',
      name: 'Bürgeramt Duisburg',
      category: 'government',
      address: 'Königstraße 22, 47051 Duisburg',
      description: 'Address registration (Anmeldung) and civil services',
      phone: '+49 203 283-0',
      hours: 'Mon, Wed: 8:00-16:00, Tue, Thu: 8:00-18:00, Fri: 8:00-12:00',
      tips: ['Book appointment online', 'Bring all documents', 'Allow 2-3 hours for visit']
    },
    {
      id: 'buergeramt-essen',
      name: 'Bürgeramt Essen',
      category: 'government',
      address: 'Gildehof 8-10, 45128 Essen',
      description: 'Address registration and municipal services',
      phone: '+49 201 88-0',
      hours: 'Mon-Wed: 8:00-16:00, Thu: 8:00-18:00, Fri: 8:00-12:00',
      tips: ['Online appointments recommended', 'Multiple locations available', 'Prepare documents in advance']
    },
    {
      id: 'auslaenderbehoerde-duisburg',
      name: 'Ausländerbehörde Duisburg',
      category: 'government',
      address: 'Landfermannstraße 17, 47051 Duisburg',
      description: 'Residence permits and visa extensions',
      phone: '+49 203 283-3333',
      hours: 'Mon, Wed: 8:00-12:00, Thu: 14:00-18:00',
      tips: ['Appointments mandatory', 'Long processing times', 'Bring translator if needed']
    },

    // Housing
    {
      id: 'studentenwerk-housing',
      name: 'Studentenwerk Housing Office',
      category: 'housing',
      address: 'Geibelstraße 41, 47057 Duisburg',
      description: 'Student dormitory applications and housing assistance',
      phone: '+49 203 379-3333',
      hours: 'Mon-Thu: 9:00-15:00, Fri: 9:00-12:00',
      tips: ['Apply early for dorms', 'Waiting lists common', 'Budget housing options available']
    },
    {
      id: 'wg-gesucht-office',
      name: 'WG-Gesucht Local Office',
      category: 'housing',
      address: 'City Center Duisburg',
      description: 'Shared apartment (WG) and private rental assistance',
      phone: 'Online platform',
      hours: '24/7 online',
      tips: ['Most popular housing platform', 'Prepare documents in advance', 'Be quick to respond to ads']
    },

    // Shopping & Daily Life
    {
      id: 'forum-duisburg',
      name: 'Forum Duisburg',
      category: 'shopping',
      address: 'Königstraße 48, 47051 Duisburg',
      description: 'Main shopping center with grocery stores and services',
      phone: '+49 203 99288-0',
      hours: 'Mon-Sat: 10:00-20:00',
      tips: ['REWE supermarket inside', 'ATMs available', 'Food court on upper level']
    },
    {
      id: 'limbecker-platz',
      name: 'Limbecker Platz Essen',
      category: 'shopping',
      address: 'Limbecker Pl. 1a, 45127 Essen',
      description: 'Large shopping mall with international brands',
      phone: '+49 201 8577-0',
      hours: 'Mon-Sat: 10:00-20:00',
      tips: ['Multiple supermarkets', 'Electronics stores', 'Direct U-Bahn connection']
    },

    // Healthcare
    {
      id: 'uk-essen',
      name: 'Universitätsklinikum Essen',
      category: 'healthcare',
      address: 'Hufelandstraße 55, 45147 Essen',
      description: 'University hospital with emergency services',
      phone: '+49 201 723-0',
      hours: '24/7 Emergency',
      tips: ['Bring insurance card', 'English-speaking doctors available', 'Emergency entrance clearly marked']
    },
    {
      id: 'malteser-duisburg',
      name: 'Malteser Hospital Duisburg',
      category: 'healthcare',
      address: 'An der Abtei 7-11, 47166 Duisburg',
      description: 'General hospital with emergency department',
      phone: '+49 203 546-0',
      hours: '24/7 Emergency',
      tips: ['Private and public insurance accepted', 'Parking available', 'Call ahead for non-emergency']
    },

    // Transportation
    {
      id: 'duisburg-hbf',
      name: 'Duisburg Hauptbahnhof',
      category: 'transport',
      address: 'Portsmouthplatz 1, 47051 Duisburg',
      description: 'Main train station with national and regional connections',
      phone: '+49 1806 996633',
      hours: '24/7',
      tips: ['Student discounts available', 'International connections', 'Bike parking available']
    },
    {
      id: 'essen-hbf',
      name: 'Essen Hauptbahnhof',
      category: 'transport',
      address: 'Am Hauptbahnhof 5, 45127 Essen',
      description: 'Central station connecting to all major German cities',
      phone: '+49 1806 996633',
      hours: '24/7',
      tips: ['ICE high-speed trains', 'Underground shopping', 'Multiple public transport connections']
    },
  ]

  const filteredLocations = selectedCategory === 'all' 
    ? locations 
    : locations.filter(location => location.category === selectedCategory)

  const getCategoryInfo = (categoryId) => {
    return categories.find(cat => cat.id === categoryId)
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4">
          <h1 className="text-xl font-semibold text-gray-900">Campus & City Map</h1>
          <p className="text-sm text-gray-600 mt-1">
            Important locations around UDE campuses
          </p>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="max-w-md mx-auto px-4 py-4">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-8 text-center border border-blue-200">
          <MapPinIcon className="w-12 h-12 text-ude-blue mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 mb-2">Interactive Map</h3>
          <p className="text-sm text-gray-600 mb-4">
            Interactive map feature coming soon! For now, browse locations below with addresses and contact information.
          </p>
          <div className="flex space-x-2 justify-center text-xs text-gray-500">
            <span>📍 Google Maps</span>
            <span>•</span>
            <span>🗺️ Offline Maps</span>
            <span>•</span>
            <span>🚌 Public Transport</span>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-md mx-auto px-4">
        <div className="flex overflow-x-auto space-x-2 pb-2">
          {categories.map((category) => {
            const Icon = category.icon
            const isSelected = selectedCategory === category.id
            
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  isSelected
                    ? 'bg-ude-blue text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{category.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Locations List */}
      <div className="max-w-md mx-auto px-4 mt-4">
        <div className="space-y-4">
          {filteredLocations.map((location) => {
            const categoryInfo = getCategoryInfo(location.category)
            const Icon = categoryInfo.icon
            
            return (
              <div key={location.id} className="card">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg bg-gray-100 ${categoryInfo.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-gray-900">{location.name}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        location.category === 'university' ? 'bg-blue-100 text-blue-800' :
                        location.category === 'government' ? 'bg-red-100 text-red-800' :
                        location.category === 'housing' ? 'bg-green-100 text-green-800' :
                        location.category === 'shopping' ? 'bg-purple-100 text-purple-800' :
                        location.category === 'healthcare' ? 'bg-pink-100 text-pink-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {categoryInfo.label}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mt-1 mb-3">
                      {location.description}
                    </p>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-start">
                        <MapPinIcon className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{location.address}</span>
                      </div>
                      
                      {location.phone && location.phone !== 'Online platform' && (
                        <div className="flex items-center">
                          <PhoneIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                          <span>{location.phone}</span>
                        </div>
                      )}
                      
                      {location.hours && (
                        <div className="flex items-start">
                          <ClockIcon className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{location.hours}</span>
                        </div>
                      )}
                    </div>
                    
                    {location.tips && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <h4 className="text-xs font-medium text-gray-900 mb-2">💡 Tips:</h4>
                        <ul className="space-y-1">
                          {location.tips.map((tip, index) => (
                            <li key={index} className="text-xs text-gray-600 flex items-start">
                              <span className="text-ude-green mr-1 mt-0.5">•</span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div className="mt-3 flex space-x-2">
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(location.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 btn-primary text-center text-sm py-2"
                      >
                        📍 Directions
                      </a>
                      {location.phone && location.phone !== 'Online platform' && (
                        <a
                          href={`tel:${location.phone}`}
                          className="btn-secondary text-sm py-2 px-4"
                        >
                          📞 Call
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Transportation Info */}
        <div className="mt-6 card">
          <h3 className="font-semibold text-gray-900 mb-3">🚌 Public Transportation</h3>
          <div className="space-y-3 text-sm">
            <div>
              <h4 className="font-medium text-gray-900">Student Transport Pass</h4>
              <p className="text-gray-600">Your student ID includes free public transport in NRW</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Between Campuses</h4>
              <p className="text-gray-600">
                RE1 train connects Duisburg ↔ Essen (20 minutes)
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Apps to Download</h4>
              <p className="text-gray-600">VRR App, DB Navigator, Google Maps</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Map