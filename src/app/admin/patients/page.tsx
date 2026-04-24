
'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/dashboard-layout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Eye, Edit2, Trash2 } from 'lucide-react'

interface Patient {
  id: string
  name: string
  email: string
  phone: string
  totalAppointments: number
  status: 'active' | 'inactive'
}

export default function AdminPatientsPage() {
  const [patients] = useState<Patient[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      totalAppointments: 5,
      status: 'active',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+1 (555) 234-5678',
      totalAppointments: 8,
      status: 'active',
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+1 (555) 345-6789',
      totalAppointments: 3,
      status: 'inactive',
    },
  ])

  const [searchQuery, setSearchQuery] = useState('')

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Patients Overview</h1>
          <p className="text-gray-600 mt-1">Manage all patients and their records</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 border border-gray-200">
            <p className="text-gray-600 text-sm">Total Patients</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{patients.length}</p>
          </Card>
          <Card className="p-6 border border-gray-200">
            <p className="text-gray-600 text-sm">Active Patients</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {patients.filter((p) => p.status === 'active').length}
            </p>
          </Card>
          <Card className="p-6 border border-gray-200">
            <p className="text-gray-600 text-sm">Total Appointments</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {patients.reduce((sum, p) => sum + p.totalAppointments, 0)}
            </p>
          </Card>
        </div>

        {/* Search */}
        <Card className="p-4 border border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </Card>

        {/* Patients Table */}
        <Card className="border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Phone</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Appointments
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient) => (
                  <tr key={patient.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900 font-medium">{patient.name}</td>
                    <td className="px-6 py-4 text-gray-600">{patient.email}</td>
                    <td className="px-6 py-4 text-gray-600">{patient.phone}</td>
                    <td className="px-6 py-4 text-gray-600">{patient.totalAppointments}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${patient.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                          }`}
                      >
                        {patient.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-300 text-gray-700 hover:bg-gray-50"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-300 text-gray-700 hover:bg-gray-50"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-300 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
