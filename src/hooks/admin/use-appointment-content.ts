import { useState, useMemo } from "react";
import { Appointment } from "@/types/appointment.types";

export type FilterStatus = "all" | Appointment["status"];

export function useAdminAppointments(initialAppointments: Appointment[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");

  // Memoize metrics calculations so they don't re-run unless initialAppointments changes
  const metrics = useMemo(() => {
    return {
      total: initialAppointments.length,
      confirmed: initialAppointments.filter((a) => a.status === "confirmed")
        .length,
      pending: initialAppointments.filter((a) => a.status === "pending").length,
      completed: initialAppointments.filter((a) => a.status === "completed")
        .length,
    };
  }, [initialAppointments]);

  // Memoize filtering to prevent unnecessary re-computations on unrelated re-renders
  const filteredAppointments = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return initialAppointments.filter((apt) => {
      const matchesSearch =
        !query ||
        apt.patientName?.toLowerCase().includes(query) ||
        apt.doctorName?.toLowerCase().includes(query);

      const matchesStatus =
        filterStatus === "all" || apt.status === filterStatus;

      return matchesSearch && matchesStatus;
    });
  }, [initialAppointments, searchQuery, filterStatus]);

  // Centralized status styling dictionary
  const getStatusColor = (status?: Appointment["status"]) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return {
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
    filteredAppointments,
    metrics,
    getStatusColor,
  };
}
