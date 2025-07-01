import {
    BookOpenIcon,
    CheckCircleIcon,
    HomeIcon,
    HomeModernIcon,
    MapIcon,
    UserIcon,
} from '@heroicons/react/24/outline'
import {
    BookOpenIcon as BookOpenIconSolid,
    CheckCircleIcon as CheckCircleIconSolid,
    HomeIcon as HomeIconSolid,
    HomeModernIcon as HomeModernIconSolid,
    MapIcon as MapIconSolid,
    UserIcon as UserIconSolid,
} from '@heroicons/react/24/solid'
import { Link, useLocation } from 'react-router-dom'

const BottomNav = () => {
  const location = useLocation()

  const navItems = [
    {
      path: '/',
      label: 'Home',
      icon: HomeIcon,
      activeIcon: HomeIconSolid,
    },
    {
      path: '/checklist',
      label: 'Checklist',
      icon: CheckCircleIcon,
      activeIcon: CheckCircleIconSolid,
    },
    {
      path: '/guide',
      label: 'Guide',
      icon: BookOpenIcon,
      activeIcon: BookOpenIconSolid,
    },
    {
      path: '/map',
      label: 'Map',
      icon: MapIcon,
      activeIcon: MapIconSolid,
    },
    {
      path: '/housing',
      label: 'Housing',
      icon: HomeModernIcon,
      activeIcon: HomeModernIconSolid,
    },
    {
      path: '/profile',
      label: 'Profile',
      icon: UserIcon,
      activeIcon: UserIconSolid,
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-pb">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          const Icon = isActive ? item.activeIcon : item.icon
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`bottom-nav-item ${isActive ? 'active' : 'inactive'}`}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default BottomNav 