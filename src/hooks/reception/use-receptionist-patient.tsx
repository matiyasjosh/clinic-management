"use client"

import { registerPatientAction } from "@/actions/patient";
import { useState, useTransition } from "react"

export function useReceptionistPatient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleRegisterPatient = (formDate: FormData) => {
    setError(null);

    startTransition(async () => {
      const result = await registerPatientAction(formDate);

      if (result?.error) {
        setError(result.error);
      } else if (result?.success) {
        setIsDialogOpen(false);
      }
    })
  }

  const handleDialogChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) setError(null);
  }

  return {
    searchQuery,
    isDialogOpen,
    isPending,
    error,

    setSearchQuery,
    setIsDialogOpen,
    handleRegisterPatient,
  };
}

