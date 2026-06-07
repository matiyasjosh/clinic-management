'use client'

import { useState, useMemo } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Search, Calendar, X, CheckCircle, Clock, Plus, ChevronLeft, ChevronRight } from 'lucide-react'

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
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list')
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0])
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [isCreateAppointmentOpen, setIsCreateAppointmentOpen] = useState(false)
  const [formData, setFormData] = useState({
    patientName: '',
    patientEmail: '',
    appointmentDate: '',
    appointmentTime: '',
    appointmentType: 'Consultation',
    reason: '',
    notes: '',
  })

  const mockAppointments: Appointment[] = appointments.length > 0 ? appointments : [
    { id: '1', patient_name: 'John Doe', date: '2024-04-20', time: '10:00 AM', status: 'confirmed', type: 'Consultation' },
    { id: '2', patient_name: 'Jane Smith', date: '2024-04-20', time: '11:30 AM', status: 'pending', type: 'Follow-up' },
    { id: '3', patient_name: 'Mike Johnson', date: '2024-04-20', time: '2:00 PM', status: 'confirmed', type: 'Examination' },
    { id: '4', patient_name: 'Sarah Williams', date: '2024-04-21', time: '9:00 AM', status: 'confirmed', type: 'Consultation' },
  ]

  const filteredAppointments = useMemo(() => {
    return mockAppointments.filter(
      (apt) =>
        (apt.patient_name?.toLowerCase().includes(searchQuery.toLowerCase()) || apt.date?.includes(searchQuery)) &&
        (filterStatus === 'all' || apt.status === filterStatus)
    )
  }, [searchQuery, filterStatus, mockAppointments])

  const appointmentsByDate = useMemo(() => {
    const grouped: { [key: string]: Appointment[] } = {}
    mockAppointments.forEach((apt) => {
      if (apt.date) {
        if (!grouped[apt.date]) grouped[apt.date] = []
        grouped[apt.date].push(apt)
      }
    })
    return grouped
  }, [mockAppointments])

  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0]
  }

  const appointmentsOnDate = (dateStr: string) => {
    return appointmentsByDate[dateStr]?.length || 0
  }

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const handleCreateAppointment = () => {
    console.log('[v0] Creating appointment:', formData)
    setIsCreateAppointmentOpen(false)
    setFormData({
      patientName: '',
      patientEmail: '',
      appointmentDate: '',
      appointmentTime: '',
      appointmentType: 'Consultation',
      reason: '',
      notes: '',
    })
  }

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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">My Appointments</h1>
          <p className="text-gray-600 mt-1">View and manage your patient appointments</p>
        </div>
        <Button
          className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2 w-fit"
          onClick={() => setIsCreateAppointmentOpen(true)}
        >
          <Plus className="w-5 h-5" />
          Create Appointment
        </Button>
      </div>

      {/* View Mode Toggle */}
      <div className="flex gap-2">
        <Button
          variant={viewMode === 'list' ? 'default' : 'outline'}
          className={viewMode === 'list' ? 'bg-emerald-600 text-white' : 'border-gray-300'}
          onClick={() => setViewMode('list')}
        >
          List View
        </Button>
        <Button
          variant={viewMode === 'calendar' ? 'default' : 'outline'}
          className={viewMode === 'calendar' ? 'bg-emerald-600 text-white' : 'border-gray-300'}
          onClick={() => setViewMode('calendar')}
        >
          Calendar View
        </Button>
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

      {/* List View */}
      {viewMode === 'list' && (
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
                  <Button size="sm" variant="outline" className="border-gray-300 flex-1">
                    Reschedule
                  </Button>
                  <Button size="sm" className="bg-red-100 hover:bg-red-200 text-red-700 flex-1">
                    Cancel
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Statistics */}
          <div className="space-y-4">
            <Card className="p-6 border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4">Summary</h3>
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
      )}

      {/* Calendar View */}
      {viewMode === 'calendar' && (
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Mini Calendar */}
          <Card className="p-6 border border-gray-200 lg:col-span-1 h-fit">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">
                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h3>
              <div className="flex gap-1">
                <Button size="sm" variant="outline" onClick={handlePrevMonth} className="h-8 w-8 p-0">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={handleNextMonth} className="h-8 w-8 p-0">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-center text-xs font-semibold text-gray-600">
                  {day}
                </div>
              ))}
              {Array.from({ length: getFirstDayOfMonth(currentMonth) }).map((_, idx) => (
                <div key={`empty-${idx}`} className="text-center py-2" />
              ))}
              {Array.from({ length: daysInMonth(currentMonth) }).map((_, idx) => {
                const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), idx + 1)
                const dateStr = formatDate(date)
                const appointmentCount = appointmentsOnDate(dateStr)
                const isSelected = dateStr === selectedDate

                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedDate(dateStr)}
                    className={`text-center py-2 px-1 rounded text-sm font-medium transition-colors ${isSelected
                        ? 'bg-emerald-600 text-white'
                        : appointmentCount > 0
                          ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    <div>{idx + 1}</div>
                    {appointmentCount > 0 && <div className="text-xs">{appointmentCount} appt</div>}
                  </button>
                )
              })}
            </div>
          </Card>

          {/* Appointments for Selected Date */}
          <div className="lg:col-span-3 space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Appointments for {new Date(selectedDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </h2>
              {appointmentsByDate[selectedDate]?.length ? (
                <div className="space-y-4">
                  {appointmentsByDate[selectedDate].map((apt) => (
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
                            <p className="text-sm font-medium text-gray-900 mt-2">{apt.time}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(apt.status)}`}>
                          {apt.status}
                        </span>
                      </div>
                      <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                        <Button size="sm" variant="outline" className="border-gray-300 flex-1">
                          Reschedule
                        </Button>
                        <Button size="sm" className="bg-red-100 hover:bg-red-200 text-red-700 flex-1">
                          Cancel
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-12 text-center border border-gray-200">
                  <p className="text-gray-500">No appointments scheduled for this date</p>
                </Card>
              )}
            </div>
          </div>
        </div>
      )}

      {/* View Appointment Details Dialog */}
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
                  Close
                </Button>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  Save Notes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Create Appointment Dialog */}
      <Dialog open={isCreateAppointmentOpen} onOpenChange={setIsCreateAppointmentOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Appointment</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Patient Name</label>
                <Input
                  type="text"
                  placeholder="Enter patient name"
                  value={formData.patientName}
                  onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Patient Email</label>
                <Input
                  type="email"
                  placeholder="Enter patient email"
                  value={formData.patientEmail}
                  onChange={(e) => setFormData({ ...formData, patientEmail: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Appointment Date</label>
                <Input
                  type="date"
                  value={formData.appointmentDate}
                  onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Appointment Time</label>
                <Input
                  type="time"
                  value={formData.appointmentTime}
                  onChange={(e) => setFormData({ ...formData, appointmentTime: e.target.value })}
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700 block mb-2">Appointment Type</label>
                <select
                  value={formData.appointmentType}
                  onChange={(e) => setFormData({ ...formData, appointmentType: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Consultation">General Consultation</option>
                  <option value="Follow-up">Follow-up</option>
                  <option value="Examination">Examination</option>
                  <option value="Lab Work">Lab Work</option>
                  <option value="Surgery">Surgery</option>
                  <option value="Vaccination">Vaccination</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700 block mb-2">Reason for Visit</label>
                <Input
                  type="text"
                  placeholder="e.g., Regular checkup, Pain in shoulder, etc."
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700 block mb-2">Additional Notes</label>
                <textarea
                  placeholder="Any additional information about the appointment..."
                  rows={4}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
              <Button
                variant="outline"
                className="border-gray-300"
                onClick={() => setIsCreateAppointmentOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                onClick={handleCreateAppointment}
              >
                Create Appointment
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
