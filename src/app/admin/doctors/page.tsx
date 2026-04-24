
'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/dashboard-layout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Plus, Edit2, Trash2, Search } from 'lucide-react'

interface Doctor {
  id: string
  name: string
  specialization: string
  phone: string
  licenseNumber: string
  email: string
}

export default function DoctorsPage() {
  const [doctors] = useState<Doctor[]>([
    {
      id: '1',
      name: 'Dr. John Smith',
      specialization: 'Cardiology',
      phone: '+1 (555) 123-4567',
      licenseNumber: 'MD-12345',
      email: 'john@clinic.com',
    },
    {
      id: '2',
      name: 'Dr. Sarah Johnson',
      specialization: 'Neurology',
      phone: '+1 (555) 234-5678',
      licenseNumber: 'MD-23456',
      email: 'sarah@clinic.com',
    },
    {
      id: '3',
      name: 'Dr. Michael Brown',
      specialization: 'Orthopedics',
      phone: '+1 (555) 345-6789',
      licenseNumber: 'MD-34567',
      email: 'michael@clinic.com',
    },
  ])

  const [searchQuery, setSearchQuery] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Doctors Management</h1>
            <p className="text-gray-600 mt-1">Manage your medical team</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2 w-fit">
                <Plus className="w-5 h-5" />
                Add Doctor
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Doctor</DialogTitle>
                <DialogDescription>Add a new doctor to your clinic staff</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <Input placeholder="Full Name" />
                <Input placeholder="Email Address" type="email" />
                <Input placeholder="Phone Number" />
                <Input placeholder="Specialization" />
                <Input placeholder="License Number" />
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                  Create Doctor Account
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <Card className="p-4 border border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search by name or specialization..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </Card>

        {/* Doctors Table */}
        <Card className="border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Specialization
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Phone</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    License
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDoctors.map((doctor) => (
                  <tr key={doctor.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900 font-medium">{doctor.name}</td>
                    <td className="px-6 py-4 text-gray-600">{doctor.specialization}</td>
                    <td className="px-6 py-4 text-gray-600">{doctor.phone}</td>
                    <td className="px-6 py-4 text-gray-600">{doctor.licenseNumber}</td>
                    <td className="px-6 py-4 text-gray-600">{doctor.email}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
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

        {filteredDoctors.length === 0 && (
          <Card className="p-12 text-center border border-gray-200">
            <p className="text-gray-500">No doctors found</p>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
