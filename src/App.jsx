import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import BottomNav from './components/BottomNav'

// Import pages
import Checklist from './pages/Checklist'
import Guide from './pages/Guide'
import Home from './pages/Home'
import Housing from './pages/Housing'
import Map from './pages/Map'
import Profile from './pages/Profile'

function App() {
  return (
    <Router>
      <div className="App">
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/checklist" element={<Checklist />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/map" element={<Map />} />
            <Route path="/housing" element={<Housing />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
        <BottomNav />
      </div>
    </Router>
  )
}

export default App
