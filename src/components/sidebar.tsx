'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  Calendar,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  BarChart3,
  Package,
} from 'lucide-react'

interface SidebarProps {
  userRole: 'admin' | 'receptionist' | 'doctor' | 'patient'
}

export default function Sidebar({ userRole }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/auth/login')
  }

  // Define navigation items based on user role
  const navigationItems = {
    admin: [
      { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { label: 'Doctors', href: '/admin/doctors', icon: Stethoscope },
      { label: 'Receptionists', href: '/admin/receptionists', icon: Users },
      { label: 'Services', href: '/admin/services', icon: Package },
      { label: 'Patients', href: '/admin/patients', icon: Users },
      { label: 'Appointments', href: '/admin/appointments', icon: Calendar },
      { label: 'Medical Records', href: '/admin/medical-records', icon: FileText },
      { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
      { label: 'Settings', href: '/admin/settings', icon: Settings },
    ],
    receptionist: [
      { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { label: 'Appointments', href: '/receptionist/appointments', icon: Calendar },
      { label: 'Patients', href: '/receptionist/patients', icon: Users },
      { label: 'Doctors', href: '/receptionist/doctors', icon: Stethoscope },
      { label: 'Services', href: '/receptionist/services', icon: Package },
      { label: 'Settings', href: '/receptionist/settings', icon: Settings },
    ],
    doctor: [
      { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { label: 'My Appointments', href: '/doctor/appointments', icon: Calendar },
      { label: 'My Patients', href: '/doctor/patients', icon: Users },
      { label: 'Medical Records', href: '/doctor/medical-records', icon: FileText },
      { label: 'Profile', href: '/doctor/profile', icon: Settings },
    ],
    patient: [
      { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { label: 'My Appointments', href: '/patient/appointments', icon: Calendar },
      { label: 'Medical Records', href: '/patient/medical-records', icon: FileText },
      { label: 'Profile', href: '/patient/profile', icon: Settings },
    ],
  }

  const items = navigationItems[userRole]

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white border border-gray-200 rounded-lg"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-gray-700" />
        ) : (
          <Menu className="w-6 h-6 text-gray-700" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col transition-transform lg:translate-x-0 z-40 ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">ClinicHub</h1>
              <p className="text-xs text-gray-600 capitalize">{userRole}</p>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto p-6 space-y-2">
          {items.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive(item.href)
                  ? 'bg-emerald-50 text-emerald-600 border-l-4 border-emerald-600'
                  : 'text-gray-700 hover:bg-gray-50'
                  }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-6 border-t border-gray-200">
          <Button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
