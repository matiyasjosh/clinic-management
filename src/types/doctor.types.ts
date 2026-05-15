
export interface Profile {
  id: string
  full_name: string
  email: string
  phone: string
  role?: string
}

export interface Doctor {
  id: string
  specialization: string
  license_number: string
  consultation_fee: number
  created_at?: string

  profile: Profile
}

export interface DoctorContentProps {
  doctors: Doctor[]
}

export interface FormData {
  full_name: string
  email: string
  specialization: string
  phone: string
  license_number: string
}
