import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import DashboardLayout from '@/components/dashboard-layout'
import ReceptionistPatientsContent from '@/components/reception/receptionist-patients-content'

export const metadata: Metadata = {
  title: 'Patients - ClinicHub Receptionist',
  description: 'Register and manage patients',
}

type UserRole = 'admin' | 'receptionist' | 'doctor' | 'patient_user'

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


  const { data: profile } = await supabase
    .from('profile')
    .select('role')
    .eq('id', user?.id)
    .single()

  const userRole = (profile?.role || 'patient_user') as UserRole

  if (userRole !== 'receptionist' && userRole !== 'admin') {
    redirect('/dashboard')
  }

  // UPDATED: Fetching directly from the new 'patient' table (Medical Records)
  const { data: dbPatients } = await supabase
    .from('patient')
    .select('*')
    .order('created_at', { ascending: false })

  // Map the database columns to the frontend Patient interface
  const patients: Patient[] = dbPatients ? dbPatients.map((p) => ({
    id: p.id,
    name: p.full_name,
    email: p.contact_email,
    phone: p.contact_phone,
    dateOfBirth: p.date_of_birth,
    address: p.address,
    // Format the date properly for the table
    registrationDate: new Date(p.created_at).toLocaleDateString(),
  })) : []

  return (
    <DashboardLayout userRole={userRole}>
      <ReceptionistPatientsContent patients={patients} />
    </DashboardLayout>
  )
}
