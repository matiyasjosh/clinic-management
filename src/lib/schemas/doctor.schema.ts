
import { z } from 'zod'

export const createDoctorSchema = z.object({
  full_name: z
    .string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must be less than 100 characters'),
  email: z
    .string()
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .regex(
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
      'Please enter a valid phone number'
    ),
  specialization: z
    .string()
    .min(2, 'Specialization must be at least 2 characters')
    .max(100, 'Specialization must be less than 100 characters'),
  license_number: z
    .string()
    .min(5, 'License number must be at least 5 characters')
    .max(50, 'License number must be less than 50 characters'),
})

export type CreateDoctorFormData = z.infer<typeof createDoctorSchema>
