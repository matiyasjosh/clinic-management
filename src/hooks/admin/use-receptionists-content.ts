"use client";

import {
  createReceptionist,
  deleteReceptionist,
} from "@/app/admin/receptionists/actions";
import { useMemo, useState } from "react";

interface Receptionist {
  id: string;
  full_name?: string;
  email?: string;
  phone?: string;
  created_at?: string;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
}

export function useReceptionists(receptionists: Receptionist[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
  });

  const filteredReceptionists = useMemo(() => {
    return receptionists.filter(
      (receptionist) =>
        receptionist.full_name
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        receptionist.email?.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [receptionists, searchQuery]);

  const handleAddReceptionist = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await createReceptionist(formData);

      if (result?.error) {
        setError(result.error);
        return;
      }

      if (result?.success) {
        setFormData({
          fullName: "",
          email: "",
          phone: "",
        });
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error(err);
      setError("unknown error!");
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const updateFormField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const removeReceptionist = async (facultyId: string) => {
    try {
      const result = await deleteReceptionist(facultyId);

      if (result?.error) {
        setError(result.error);
        console.error("deletion failed:", result.error);
      } else if (result?.success) {
        console.log("successfully deleted!");
      }
    } catch (err: any) {
      console.error(err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    searchQuery,
    isModalOpen,
    formData,
    filteredReceptionists,
    closeModal,
    error,

    setIsModalOpen,
    setFormData,
    setSearchQuery,

    handleAddReceptionist,
    updateFormField,
    removeReceptionist,
  };
}
