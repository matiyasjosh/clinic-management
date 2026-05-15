
export interface Appointment {
  id: string
  patientName?: string
  doctorName?: string
  service?: string
  date?: string
  time?: string
  status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
}

export interface AdminAppointmentsContentProps {
  appointments: Appointment[]
}
