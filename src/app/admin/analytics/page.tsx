
import type { Metadata } from 'next'
import DashboardLayout from '@/components/dashboard-layout'
import AnalyticsContent from '@/components/admin/analytics-content'

export const metadata: Metadata = {
  title: 'Analytics - ClinicHub Admin',
  description: 'View clinic performance metrics and insights',
}

export default async function AnalyticsPage() {
  return (
    <DashboardLayout userRole={"admin"}>
      <AnalyticsContent />
    </DashboardLayout>
  )
}
