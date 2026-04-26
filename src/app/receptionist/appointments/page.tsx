
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import DashboardLayout from '@/components/dashboard-layout'
import ReceptionistAppointmentsContent from '@/components/reception/receptionist-appointments-content'

export const metadata: Metadata = {
  title: 'Appointments - ClinicHub Receptionist',
  description: 'Schedule and manage clinic appointments',
}

type UserRole = 'admin' | 'receptionist' | 'doctor' | 'patient'

interface Appointment {
  id: string
  patientName?: string
  doctorName?: string
  service?: string
  date?: string
  time?: string
  status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
}

export default async function ReceptionistAppointmentsPage() {
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

  const userRole = (profile?.role || 'patient') as UserRole;

  if (userRole !== 'receptionist' && userRole !== 'admin') {
    redirect('/')
  }

  const { data: appointments = [] } = await supabase
    .from('appointments')
    .select('*');

  const mockAppointments: Appointment[] | null = appointments && appointments?.length > 0 ? appointments : [
    {
      id: '1',
      patientName: 'John Doe',
      doctorName: 'Dr. John Smith',
      service: 'General Consultation',
      date: '2024-04-15',
      time: '10:00 AM',
      status: 'confirmed',
    },
    {
      id: '2',
      patientName: 'Jane Smith',
      doctorName: 'Dr. Sarah Johnson',
      service: 'Specialized Consultation',
      date: '2024-04-15',
      time: '11:30 AM',
      status: 'pending',
    },
  ]

  return (
    <DashboardLayout userRole={userRole}>
      <ReceptionistAppointmentsContent appointments={mockAppointments} />
    </DashboardLayout>
  )
}
