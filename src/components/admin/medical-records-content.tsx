
'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Eye, Edit2, FileText } from 'lucide-react'

interface MedicalRecord {
  id: string
  patientName?: string
  date?: string
  doctorName?: string
  diagnosis?: string
  treatment?: string
}

interface MedicalRecordsContentProps {
  records: MedicalRecord[]
}

export default function MedicalRecordsContent({ records }: MedicalRecordsContentProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredRecords = records.filter(
    (record) =>
      record.patientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.diagnosis?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Medical Records</h1>
        <p className="text-gray-600 mt-1">Manage patient medical histories and diagnoses</p>
      </div>

      <Card className="p-4 border border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search by patient or diagnosis..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      <Card className="border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Patient</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Doctor</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Diagnosis</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Treatment</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record) => (
                <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900 font-medium">{record.patientName}</td>
                  <td className="px-6 py-4 text-gray-600">{record.date}</td>
                  <td className="px-6 py-4 text-gray-600">{record.doctorName}</td>
                  <td className="px-6 py-4 text-gray-600">{record.diagnosis}</td>
                  <td className="px-6 py-4 text-gray-600">{record.treatment}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                        <FileText className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {filteredRecords.length === 0 && (
        <Card className="p-12 text-center border border-gray-200">
          <p className="text-gray-500">No medical records found</p>
        </Card>
      )}
    </div>
  )
}
