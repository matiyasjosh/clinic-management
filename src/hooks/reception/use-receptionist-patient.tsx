"use client"

import { registerPatientAction, updatePatientAction } from "@/actions/patient";
import { useState, useTransition } from "react"
import { Patient } from "@/types/patient.types";

export function useReceptionistPatient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPatientId, setEditingPatientId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Patient | null>(null);

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

  const handleEditClick = (patient: Patient) => {
    setEditingPatientId(patient.id)
    setEditFormData({ ...patient })
  }

  const handleCancelEdit = () => {
    setEditingPatientId(null)
    setEditFormData(null)
  }

  const handleSaveEdit = async () => {
    if (!editingPatientId || !editFormData) return;

    // Construct the FormData from your state
    const formData = new FormData();
    formData.append("id", editingPatientId); // Pass the ID of the patient being edited

    // Note: Your state uses 'name' and 'dateOfBirth', so map them correctly
    formData.append("fullName", editFormData.name || "");
    formData.append("email", editFormData.email || "");
    formData.append("phone", editFormData.phone || "");
    formData.append("dob", editFormData.dateOfBirth || "");
    formData.append("address", editFormData.address || "");

    // Call the server action
    const result = await updatePatientAction(formData);

    if (result.error) {
      console.error(result.error);
      // You could show a toast notification here
    } else if (result.success) {
      // Reset your editing state to close the edit row
      setEditingPatientId(null);
      setEditFormData(null);
      // Show a success toast notification here
    }
  }

  const handleEditInputChange = (field: keyof Patient, value: string) => {
    if (editFormData) {
      setEditFormData({ ...editFormData, [field]: value })
    }
  }

  return {
    searchQuery,
    isDialogOpen,
    isPending,
    error,
    editingPatientId,
    editFormData,

    setSearchQuery,
    setIsDialogOpen,
    handleRegisterPatient,
    handleDialogChange,
    handleSaveEdit,
    handleCancelEdit,
    handleEditClick,
    handleEditInputChange,
  };
}

