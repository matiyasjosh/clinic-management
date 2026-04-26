
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import DashboardLayout from '@/components/dashboard-layout'
import DashboardContent from '@/components/dashboard-content'

export const metadata: Metadata = {
  title: 'Dashboard - ClinicHub',
  description: 'Manage your clinic operations with ClinicHub dashboard',
}

type UserRole = 'admin' | 'receptionist' | 'doctor' | 'patient'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Get user profile to get role
  const { data: profile } = await supabase
    .from('profile')
    .select('role')
    .eq('id', user.id)
    .single()

  const userRole = (profile?.role || 'patient') as UserRole

  return (
    <DashboardLayout userRole={userRole}>
      <DashboardContent userRole={userRole} />
    </DashboardLayout>
  )
}
