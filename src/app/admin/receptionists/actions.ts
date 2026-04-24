"use server";

import { createAdminClient } from "@/utils/supabase/server"; // Import the new admin client
import { revalidatePath } from "next/cache";

interface CreateReceptionistInput {
  fullName: string;
  email: string;
  phone: string;
}

export async function createReceptionist(data: CreateReceptionistInput) {
  try {
    const supabaseAdmin = createAdminClient();

    const { data: authData, error: authError } =
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
      full_name: data.fullName,
      email: data.email,
      phone: data.phone,
      role: "receptionist",
    });

    if (profileError) {
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      throw new Error(profileError.message);
    }

    revalidatePath("/admin/receptionists");

    return { success: true };
  } catch (err: any) {
    return { error: err.message || "An unexpected error occurred!" };
  }
}

export async function deleteReceptionist(receptionistId: string) {
  try {
    const supabaseAdmin = createAdminClient();

    const { error } = await supabaseAdmin.auth.admin.deleteUser(receptionistId);

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/admin/receptionists");
    return { success: true };
  } catch (err: any) {
    return { error: err.message || "An unexpected error occured!" };
  }
}
