
import type { Metadata } from 'next'
import { createClient } from '@/utils/supabase/server'
import DashboardLayout from '@/components/dashboard-layout'
import MedicalRecordsContent from '@/components/admin/medical-records-content'

export const metadata: Metadata = {
  title: 'Medical Records - ClinicHub Admin',
  description: 'Access and manage patient medical records',
}

interface MedicalRecord {
  id: string
  patientName?: string
  date?: string
  doctorName?: string
  diagnosis?: string
  treatment?: string
}

export default async function MedicalRecordsPage() {
  const supabase = await createClient()

  const { data } = await supabase
    .from('medical_records')
    .select('*')

  const records = data ?? [];
  return (
    <DashboardLayout userRole={"admin"}>
      <MedicalRecordsContent records={records} />
    </DashboardLayout>
  )
}

