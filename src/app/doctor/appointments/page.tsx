
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import DashboardLayout from '@/components/dashboard-layout'
import DoctorAppointmentsContent from '@/components/doctor/doctor-appointments-content'

export const metadata: Metadata = {
  title: 'Appointments - ClinicHub Doctor',
  description: 'Manage your appointments and patient consultations',
}

type UserRole = 'admin' | 'receptionist' | 'doctor' | 'patient'

export default async function DoctorAppointmentsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  const { data: profile } = await supabase
    .from('profile')
    .select('role')
    .eq('id', user.id)
    .single()

  const userRole = (profile?.role || 'patient') as UserRole

  if (userRole !== 'doctor') {
    redirect('/dashboard')
  }

  const { data } = await supabase
    .from('appointments')
    .select('*')
    .eq('doctor_id', user.id)

  const appointments = data ?? [];
  return (
    <DashboardLayout userRole={userRole}>
      <DoctorAppointmentsContent appointments={appointments} />
    </DashboardLayout>
  )
}
