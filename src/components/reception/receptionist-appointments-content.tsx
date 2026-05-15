
'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus, Edit2, Check, X, Search, Calendar } from 'lucide-react'

interface Appointment {
  id: string
  patientName?: string
  doctorName?: string
  service?: string
  date?: string
  time?: string
  status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
}

interface ReceptionistAppointmentsContentProps {
  appointments: Appointment[]
}

export default function ReceptionistAppointmentsContent({ appointments }: ReceptionistAppointmentsContentProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | Appointment['status']>('all')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredAppointments = appointments.filter(
    (apt) =>
      (apt.patientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        apt.doctorName?.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (filterStatus === 'all' || apt.status === filterStatus)
  )

  const getStatusColor = (status?: Appointment['status']) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'completed':
        return 'bg-blue-100 text-blue-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-600 mt-1">Schedule and manage appointments</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2 w-fit">
              <Plus className="w-5 h-5" />
              New Appointment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule New Appointment</DialogTitle>
              <DialogDescription>Create a new appointment for a patient</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Input placeholder="Patient Name" />
              <Input placeholder="Doctor Name" />
              <Input placeholder="Service" />
              <Input type="date" />
              <Input type="time" />
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">Schedule Appointment</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="p-4 border border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search by patient or doctor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      <div className="flex gap-2 flex-wrap">
        {(['all', 'pending', 'confirmed', 'completed', 'cancelled'] as const).map((status) => (
          <Button
            key={status}
            variant={filterStatus === status ? 'default' : 'outline'}
            onClick={() => setFilterStatus(status)}
            className={`capitalize ${filterStatus === status ? 'bg-emerald-600 text-white' : 'border-gray-300'}`}
          >
            {status}
          </Button>
        ))}
      </div>

      <Card className="border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Patient</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Doctor</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Service</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date & Time</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((apt) => (
                <tr key={apt.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900 font-medium">{apt.patientName}</td>
                  <td className="px-6 py-4 text-gray-600">{apt.doctorName}</td>
                  <td className="px-6 py-4 text-gray-600">{apt.service}</td>
                  <td className="px-6 py-4 text-gray-600 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {apt.date} at {apt.time}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(apt.status)}`}>
                      {apt.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="border-emerald-300 text-emerald-600 hover:bg-emerald-50">
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="border-red-300 text-red-600 hover:bg-red-50">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {filteredAppointments.length === 0 && (
        <Card className="p-12 text-center border border-gray-200">
          <p className="text-gray-500">No appointments found</p>
        </Card>
      )}
    </div>
  )
}
