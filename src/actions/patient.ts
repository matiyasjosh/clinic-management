"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function registerPatientAction(formData: FormData) {
  const supabase = await createClient();

  // Extract data from the form
  const fullName = formData.get("fullName") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const dob = formData.get("dob") as string;
  const address = formData.get("address") as string;

  // Basic validation
  if (!fullName) {
    return { error: "Full name is required" };
  }

  // Insert into the 'patient' table (NOT the profile or auth.users table)
  // profile_id remains NULL by default, establishing "Record First, Auth Later"
  const { error } = await supabase.from("patient").insert({
    full_name: fullName,
    email: email || null,
    phone: phone || null,
    date_of_birth: dob || null,
    address: address || null,
  });

  if (error) {
    console.error("Error inserting patient:", error);
    return { error: error.message || "Failed to register patient" };
  }

  // Revalidate the page so the new patient shows up in the table immediately
  revalidatePath("/receptionist/patients"); // Update this path if your route is different

  return { success: true };
}
