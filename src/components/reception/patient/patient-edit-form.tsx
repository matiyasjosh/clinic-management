
'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface Patient {
  id: string
  name?: string
  email?: string
  phone?: string
  dateOfBirth?: string
  address?: string
  registrationDate?: string
}

interface PatientEditFormProps {
  patientData: Patient
  onInputChange: (field: keyof Patient, value: string) => void
  onCancel: () => void
  onSave: () => void
}

export default function PatientEditForm({
  patientData,
  onInputChange,
  onCancel,
  onSave,
}: PatientEditFormProps) {
  return (
    <tr className="border-b-2 border-emerald-200 bg-emerald-50">
      <td colSpan={6} className="px-6 py-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit Patient Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <Input
                value={patientData.name || ''}
                onChange={(e) => onInputChange('name', e.target.value)}
                placeholder="Full Name"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <Input
                type="email"
                value={patientData.email || ''}
                onChange={(e) => onInputChange('email', e.target.value)}
                placeholder="Email Address"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <Input
                value={patientData.phone || ''}
                onChange={(e) => onInputChange('phone', e.target.value)}
                placeholder="Phone Number"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
              <Input
                type="date"
                value={patientData.dateOfBirth || ''}
                onChange={(e) => onInputChange('dateOfBirth', e.target.value)}
                className="w-full"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <Input
                value={patientData.address || ''}
                onChange={(e) => onInputChange('address', e.target.value)}
                placeholder="Address"
                className="w-full"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-4 justify-end">
            <Button
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
              onClick={onSave}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </td>
    </tr>
  )
}
