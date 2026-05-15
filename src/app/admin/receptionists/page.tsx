
import type { Metadata } from 'next'
import { createClient } from '@/utils/supabase/server'
import DashboardLayout from '@/components/dashboard-layout'
import ReceptionistsContent from '@/components/admin/receptionists-content'

export const metadata: Metadata = {
  title: 'Receptionists - ClinicHub Admin',
  description: 'Manage clinic receptionists and staff accounts',
};

export default async function ReceptionistsPage() {
  const supabase = await createClient();

  // Fetch receptionists from database
  const { data } = await supabase
    .from('profile')
    .select('*')
    .eq('role', 'receptionist');

  const receptionists = data ?? [];

  return (
    <DashboardLayout userRole={"receptionist"}>
      <ReceptionistsContent receptionists={receptionists} />
    </DashboardLayout>
  )
}
