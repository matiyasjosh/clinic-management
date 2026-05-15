'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Doctor } from '@/types/doctor.types'
import { createDoctor } from '@/actions/doctors'
import { createDoctorSchema, CreateDoctorFormData } from '@/lib/schemas/doctor.schema'

export function useDoctors(doctors: Doctor[]) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateDoctorFormData>({
    resolver: zodResolver(createDoctorSchema),
    mode: 'onChange',
  })

  const filteredDoctors = doctors.filter((doctor) => {
    const searchLower = searchQuery.toLowerCase()
    const nameMatch = doctor.profile?.full_name?.toLowerCase().includes(searchLower) || false
    const specMatch = doctor.specialization?.toLowerCase().includes(searchLower) || false

    return nameMatch || specMatch
  })

  const onSubmit = async (formData: CreateDoctorFormData) => {
    setSubmitError(null)
    setSubmitSuccess(false)

    try {
      const result = await createDoctor(formData)

      if (result?.error) {
        setSubmitError(result.error)
        return
      }

      if (result?.success) {
        setSubmitSuccess(true)
        reset()
        setIsDialogOpen(false)
        // Reset success message after 2 seconds
        setTimeout(() => {
          setSubmitSuccess(false)
          setIsDialogOpen(false)
        }, 2000)
      }
    } catch (err: any) {
      console.error('[v0] Error creating doctor:', err)
      setSubmitError(err?.message || 'An unexpected error occurred')
    }
  }

  return {
    // Form methods
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,

    // Search & Dialog
    searchQuery,
    isDialogOpen,
    setSearchQuery,
    setIsDialogOpen,

    // Data
    filteredDoctors,

    // Feedback
    submitError,
    submitSuccess,
  }
}
