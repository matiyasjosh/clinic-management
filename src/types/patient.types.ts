export interface NewPatientRecord {
  full_name: string;
  contact_email?: string | null; // Optional
  contact_phone?: string | null; // Optional
  date_of_birth?: string | null; // Optional (Format: YYYY-MM-DD)
  gender?: string | null;        // Optional
  address?: string | null;       // Optional
  emergency_contact?: string | null; // Optional
}

export interface Patient extends NewPatientRecord {
  id: string;
  profile_id: string | null;
  created_at: string;
}
