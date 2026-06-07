
'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Search, Calendar, X, CheckCircle, Clock } from 'lucide-react'

interface Appointment {
  id: string
  patient_name?: string
  date?: string
  time?: string
  status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  type?: string
}

interface DoctorAppointmentsContentProps {
  appointments: Appointment[]
}

export default function DoctorAppointmentsContent({ appointments }: DoctorAppointmentsContentProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled'>('all')
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const mockAppointments: Appointment[] = appointments.length > 0 ? appointments : [
    { id: '1', patient_name: 'John Doe', date: '2024-04-20', time: '10:00 AM', status: 'confirmed', type: 'Consultation' },
    { id: '2', patient_name: 'Jane Smith', date: '2024-04-20', time: '11:30 AM', status: 'pending', type: 'Follow-up' },
    { id: '3', patient_name: 'Mike Johnson', date: '2024-04-20', time: '2:00 PM', status: 'confirmed', type: 'Examination' },
    { id: '4', patient_name: 'Sarah Williams', date: '2024-04-21', time: '9:00 AM', status: 'confirmed', type: 'Consultation' },
  ]

  const filteredAppointments = mockAppointments.filter(
    (apt) =>
      (apt.patient_name?.toLowerCase().includes(searchQuery.toLowerCase()) || apt.date?.includes(searchQuery)) &&
      (filterStatus === 'all' || apt.status === filterStatus)
  )

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-emerald-600" />
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-blue-600" />
      case 'cancelled':
        return <X className="w-5 h-5 text-red-600" />
      default:
        return <Calendar className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-emerald-100 text-emerald-700'
      case 'pending':
        return 'bg-yellow-100 text-yellow-700'
      case 'completed':
        return 'bg-blue-100 text-blue-700'
      case 'cancelled':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900">My Appointments</h1>
        <p className="text-gray-600 mt-1">View and manage your patient appointments</p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <Card className="p-4 border border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search by patient name or date..."
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
      </div>

      {/* Appointments Calendar View */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {filteredAppointments.map((apt) => (
            <Card key={apt.id} className="p-6 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer" onClick={() => {
              setSelectedAppointment(apt)
              setIsDialogOpen(true)
            }}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="mt-1">{getStatusIcon(apt.status)}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{apt.patient_name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{apt.type}</p>
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {apt.date}
                      </span>
                      <span>{apt.time}</span>
                    </div>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(apt.status)}`}>
                  {apt.status}
                </span>
              </div>
              <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white flex-1">
                  Start Consultation
                </Button>
                <Button size="sm" variant="outline" className="border-gray-300 flex-1">
                  Reschedule
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Statistics */}
        <div className="space-y-4">
          <Card className="p-6 border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4">Today's Summary</h3>
            <div className="space-y-3">
              <div className="text-center p-4 bg-emerald-50 rounded-lg">
                <p className="text-3xl font-bold text-emerald-600">{filteredAppointments.length}</p>
                <p className="text-sm text-gray-600 mt-1">Total Appointments</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-3xl font-bold text-blue-600">{filteredAppointments.filter(a => a.status === 'confirmed').length}</p>
                <p className="text-sm text-gray-600 mt-1">Confirmed</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <p className="text-3xl font-bold text-yellow-600">{filteredAppointments.filter(a => a.status === 'pending').length}</p>
                <p className="text-sm text-gray-600 mt-1">Pending</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Appointment Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
          </DialogHeader>
          {selectedAppointment && (
            <div className="space-y-6 py-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Patient Name</label>
                  <p className="text-lg font-semibold text-gray-900 mt-1">{selectedAppointment.patient_name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Appointment Type</label>
                  <p className="text-lg font-semibold text-gray-900 mt-1">{selectedAppointment.type}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Date</label>
                  <p className="text-lg font-semibold text-gray-900 mt-1">{selectedAppointment.date}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Time</label>
                  <p className="text-lg font-semibold text-gray-900 mt-1">{selectedAppointment.time}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600 block mb-2">Consultation Notes</label>
                <textarea
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  rows={5}
                  placeholder="Add your consultation notes here..."
                  defaultValue="Patient presents with..."
                />
              </div>

              <div className="flex gap-3 justify-end">
                <Button variant="outline" className="border-gray-300" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  Save & Complete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
