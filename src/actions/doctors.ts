"use server"

import { createAdminClient} from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"

interface CreateDoctorInput {
  full_name: string;
  email: string;
  phone: string;
  specialization: string;
  license_number: string;
}

export async function createDoctor(data: CreateDoctorInput) {
  try {
    const supabaseAdmin = createAdminClient();
    
    const { data: authData, error : authError } = 
      await supabaseAdmin.auth.admin.createUser({
        email: data.email,
        password: "TempPassword123!",
        email_confirm: true,
      });

    if (authError) {
      throw new Error(authError.message);
    }

    const { error: profileError } = await supabaseAdmin.from("profile").insert({
      id: authData.user.id,
      full_name: data.full_name,
      email: data.email,
      phone: data.phone,
      role: "doctor",
    });

    if (profileError) {
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      throw new Error(profileError.message);
    }

    const { error: doctorError } = await supabaseAdmin.from("doctor").insert({
      profile_id: authData.user.id,
      specialization: data.specialization,
      license_number: data.license_number,
    });

    if (doctorError) {
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      throw new Error(doctorError.message);
    }

    revalidatePath("/admin/receptionists");

    return { success: true };
  } catch(err: any) {
    return { error: err.message || "An unexpected error occurred!" };
  }
}
