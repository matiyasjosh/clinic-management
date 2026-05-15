import DashboardLayout from '@/components/dashboard-layout'
import DoctorsClientPage from '@/components/admin/doctors-content'
import { createClient } from '@/utils/supabase/server'

export default async function DoctorsPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('doctor')
    .select(`
      id,
      specialization,
      license_number,
      consultation_fee,
      created_at,
      profile (
        id,
        full_name,
        email,
        phone
      )
    `);

  const doctors = data || [];
  console.log("here is doctors: ", data);

  return (
    <DashboardLayout userRole="admin">
      <DoctorsClientPage doctors={doctors} />
    </DashboardLayout>
  )
}
