
import type { Metadata } from 'next'
import { createClient } from '@/utils/supabase/server'
import DashboardLayout from '@/components/dashboard-layout'
import AdminAppointmentsContent from '@/components/admin/admin-appointments-content'

export const metadata: Metadata = {
  title: 'Appointments - ClinicHub Admin',
  description: 'Manage all clinic appointments',
}

export default async function AdminAppointmentsPage() {
  const supabase = await createClient()

  const { data } = await supabase
    .from('appointment')
    .select('*')

  const appointments = data ?? [];

  return (
    <DashboardLayout userRole={"admin"}>
      <AdminAppointmentsContent appointments={appointments} />
    </DashboardLayout>
  )
}
