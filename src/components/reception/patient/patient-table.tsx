
'use client'

import React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Edit2, Trash2, Eye } from 'lucide-react'
import PatientEditForm from './patient-edit-form'

interface Patient {
  id: string
  name?: string
  email?: string
  phone?: string
  dateOfBirth?: string
  address?: string
  registrationDate?: string
}

interface PatientsTableProps {
  patients: Patient[]
  editingPatientId: string | null
  editFormData: Patient | null
  onEditClick: (patient: Patient) => void
  onCancelEdit: () => void
  onSaveEdit: () => void
  onEditInputChange: (field: keyof Patient, value: string) => void
  onCreateAccount: (patientId: string) => void
}

export default function PatientsTable({
  patients,
  editingPatientId,
  editFormData,
  onEditClick,
  onCancelEdit,
  onSaveEdit,
  onEditInputChange,
  onCreateAccount,
}: PatientsTableProps) {
  return (
    <Card className="border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Phone</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">DOB</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Registered</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <React.Fragment key={patient.id}>
                <tr className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900 font-medium">{patient.name}</td>
                  <td className="px-6 py-4 text-gray-600">{patient.email}</td>
                  <td className="px-6 py-4 text-gray-600">{patient.phone}</td>
                  <td className="px-6 py-4 text-gray-600">{patient.dateOfBirth}</td>
                  <td className="px-6 py-4 text-gray-600">{patient.registrationDate}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 text-gray-700 hover:bg-gray-50"
                        title="View patient details"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-300 text-gray-700 hover:bg-gray-50"
                        onClick={() => onEditClick(patient)}
                        title="Edit patient information"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-emerald-300 text-emerald-600 hover:bg-emerald-50"
                        onClick={() => onCreateAccount(patient.id)}
                        title="Create login account"
                      >
                        <span className="text-xs font-medium">Account</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-300 text-red-600 hover:bg-red-50"
                        title="Delete patient"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
                {editingPatientId === patient.id && editFormData && (
                  <PatientEditForm
                    patientData={editFormData}
                    onInputChange={onEditInputChange}
                    onCancel={onCancelEdit}
                    onSave={onSaveEdit}
                  />
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
