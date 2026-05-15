import type { Metadata } from 'next'
import DashboardLayout from '@/components/dashboard-layout'
import AdminSettingsContent from '@/components/admin/admin-settings-content'

export const metadata: Metadata = {
  title: 'Settings - ClinicHub Admin',
  description: 'Manage clinic settings and preferences',
}


export default async function AdminSettingsPage() {
  return (
    <DashboardLayout userRole={"admin"}>
      <AdminSettingsContent />
    </DashboardLayout>
  )
}


