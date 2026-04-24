
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import DashboardLayout from '@/components/dashboard-layout'
import ReceptionistsContent from '@/components/admin/receptionists-content'

export const metadata: Metadata = {
  title: 'Receptionists - ClinicHub Admin',
  description: 'Manage clinic receptionists and staff accounts',
};

type UserRole = 'admin' | 'receptionist' | 'doctor' | 'patient';

export default async function ReceptionistsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  // Get user profile to verify admin role
  const { data: profile } = await supabase
    .from('profile')
    .select('role')
    .eq('id', user.id)
    .single();

  const userRole = (profile?.role || 'patient') as UserRole;

  if (userRole !== 'admin') {
    redirect('/dashboard');
  }

  // Fetch receptionists from database
  const { data } = await supabase
    .from('profile')
    .select('*')
    .eq('role', 'receptionist');

  const receptionists = data ?? [];
  console.log("here they are: ", data);

  return (
    <DashboardLayout userRole={userRole}>
      <ReceptionistsContent receptionists={receptionists} />
    </DashboardLayout>
  )
}
