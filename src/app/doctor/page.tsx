
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import DashboardLayout from '@/components/dashboard-layout'
import DoctorDashboardContent from '@/components/doctor/doctor-dashboard-content'

export const metadata: Metadata = {
  title: 'Dashboard - ClinicHub Doctor',
  description: 'Doctor dashboard for managing patients and appointments',
}

type UserRole = 'admin' | 'receptionist' | 'doctor' | 'patient'

export default async function DoctorDashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  const userRole = (profile?.role || 'patient') as UserRole

  if (userRole !== 'doctor') {
    redirect('/dashboard')
  }

  return (
    <DashboardLayout userRole={userRole}>
      <DoctorDashboardContent doctorId={user.id} />
    </DashboardLayout>
  )
}
