
'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, Calendar, FileText, Clock, Activity, TrendingUp } from 'lucide-react'

interface DoctorDashboardContentProps {
  doctorId: string
}

export default function DoctorDashboardContent({ doctorId }: DoctorDashboardContentProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'patients'>('overview')

  const stats = [
    { label: 'Today Appointments', value: '5', icon: Calendar, color: 'emerald' },
    { label: 'Pending Records', value: '3', icon: FileText, color: 'blue' },
    { label: 'Active Patients', value: '24', icon: Users, color: 'purple' },
    { label: 'Avg. Consultation', value: '45 min', icon: Clock, color: 'orange' },
  ]

  const upcomingAppointments = [
    { id: '1', patient: 'John Doe', time: '10:00 AM', status: 'confirmed', type: 'Consultation' },
    { id: '2', patient: 'Jane Smith', time: '11:30 AM', status: 'pending', type: 'Follow-up' },
    { id: '3', patient: 'Mike Johnson', time: '2:00 PM', status: 'confirmed', type: 'Examination' },
  ]

  const recentPatients = [
    { id: '1', name: 'Sarah Williams', lastVisit: '2 days ago', condition: 'Hypertension' },
    { id: '2', name: 'Tom Brown', lastVisit: '1 week ago', condition: 'Diabetes' },
    { id: '3', name: 'Emily Davis', lastVisit: '3 days ago', condition: 'Migraine' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Doctor Dashboard</h1>
        <p className="text-gray-600 mt-1">Manage your appointments and patient records</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          const colorClasses = {
            emerald: 'bg-emerald-100 text-emerald-600',
            blue: 'bg-blue-100 text-blue-600',
            purple: 'bg-purple-100 text-purple-600',
            orange: 'bg-orange-100 text-orange-600',
          }
          return (
            <Card key={stat.label} className="p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upcoming Appointments */}
        <Card className="lg:col-span-2 p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Today's Appointments</h2>
          <div className="space-y-4">
            {upcomingAppointments.map((apt) => (
              <div key={apt.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{apt.patient}</p>
                  <p className="text-sm text-gray-600">{apt.type}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{apt.time}</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-1 ${apt.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {apt.status}
                  </span>
                </div>
                <Button variant="outline" size="sm" className="ml-4 border-gray-300">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white justify-start">
              <FileText className="w-4 h-4 mr-2" />
              Record Patient Note
            </Button>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white justify-start">
              <Calendar className="w-4 h-4 mr-2" />
              Create Appointment
            </Button>
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white justify-start">
              <Users className="w-4 h-4 mr-2" />
              View My Patients
            </Button>
            <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white justify-start">
              <Activity className="w-4 h-4 mr-2" />
              Update Records
            </Button>
          </div>
        </Card>
      </div>

      {/* Recent Patients */}
      <Card className="p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Patients</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Condition</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Last Visit</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentPatients.map((patient) => (
                <tr key={patient.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900 font-medium">{patient.name}</td>
                  <td className="px-6 py-4 text-gray-600">{patient.condition}</td>
                  <td className="px-6 py-4 text-gray-600">{patient.lastVisit}</td>
                  <td className="px-6 py-4">
                    <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                      View Record
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
