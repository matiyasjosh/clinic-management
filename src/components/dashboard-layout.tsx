
'use client'

import { ReactNode } from 'react'
import Sidebar from '@/components/sidebar'

interface DashboardLayoutProps {
  children: ReactNode
  userRole: 'admin' | 'receptionist' | 'doctor' | 'patient'
}

export default function DashboardLayout({ children, userRole }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar userRole={userRole} />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
