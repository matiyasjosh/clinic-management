
'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Edit2, Trash2, Calendar } from 'lucide-react'
import { AdminAppointmentsContentProps } from '@/types/appointment.types'
import { useAdminAppointments } from '@/hooks/admin/use-appointment-content'

export default function AdminAppointmentsContent({ appointments }: AdminAppointmentsContentProps) {
  const {
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
    filteredAppointments,
    metrics,
    getStatusColor,
  } = useAdminAppointments(appointments)
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900">All Appointments</h1>
        <p className="text-gray-600 mt-1">Overview of all clinic appointments</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6 border border-gray-200">
          <p className="text-gray-600 text-sm">Total Appointments</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{appointments.length}</p>
        </Card>
        <Card className="p-6 border border-gray-200">
          <p className="text-gray-600 text-sm">Confirmed</p>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {appointments.filter((a) => a.status === 'confirmed').length}
          </p>
        </Card>
        <Card className="p-6 border border-gray-200">
          <p className="text-gray-600 text-sm">Pending</p>
          <p className="text-3xl font-bold text-yellow-600 mt-2">
            {appointments.filter((a) => a.status === 'pending').length}
          </p>
        </Card>
        <Card className="p-6 border border-gray-200">
          <p className="text-gray-600 text-sm">Completed</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {appointments.filter((a) => a.status === 'completed').length}
          </p>
        </Card>
      </div>

      <div className="space-y-4">
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
                      <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="border-red-300 text-red-600 hover:bg-red-50">
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

      {filteredAppointments.length === 0 && (
        <Card className="p-12 text-center border border-gray-200">
          <p className="text-gray-500">No appointments found</p>
        </Card>
      )}
    </div>
  )
}
