
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import DashboardLayout from '@/components/dashboard-layout'
import ReceptionistPatientsContent from '@/components/reception/receptionist-patients-content'

export const metadata: Metadata = {
  title: 'Patients - ClinicHub Receptionist',
  description: 'Register and manage patients',
}

type UserRole = 'admin' | 'receptionist' | 'doctor' | 'patient'

interface Patient {
  id: string
  name?: string
  email?: string
  phone?: string
  dateOfBirth?: string
  address?: string
  registrationDate?: string
}

export default async function ReceptionistPatientsPage() {
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

  if (userRole !== 'receptionist' && userRole !== 'admin') {
    redirect('/dashboard')
  }

  const { data: patients = [] } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'patient')

  const mockPatients: Patient[] = patients && patients?.length > 0 ? patients : [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      dateOfBirth: '1990-05-15',
      address: '123 Main St, City, State 12345',
      registrationDate: '2024-01-10',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1 (555) 234-5678',
      dateOfBirth: '1985-08-20',
      address: '456 Oak Ave, City, State 54321',
      registrationDate: '2024-02-15',
    },
  ]

  return (
    <DashboardLayout userRole={userRole}>
      <ReceptionistPatientsContent patients={mockPatients} />
    </DashboardLayout>
  )
}
