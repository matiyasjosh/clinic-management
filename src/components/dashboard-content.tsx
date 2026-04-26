
'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, Calendar, Stethoscope, AlertCircle } from 'lucide-react'

type UserRole = 'admin' | 'receptionist' | 'doctor' | 'patient'

interface DashboardContentProps {
  userRole: UserRole
}

export default function DashboardContent({ userRole }: DashboardContentProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 capitalize mb-2">
          Welcome to Your Dashboard
        </h1>
        <p className="text-gray-600">
          {userRole === 'admin' && 'Manage your entire clinic operations'}
          {userRole === 'receptionist' && 'Manage appointments and patient check-ins'}
          {userRole === 'doctor' && 'View your appointments and patient records'}
          {userRole === 'patient' && 'View your appointments and medical records'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Patients</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">1,234</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Today&apos;s Appointments</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">12</p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Active Doctors</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">8</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Pending Tasks</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">5</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      {userRole !== 'patient' && (
        <Card className="p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div>
                  <p className="font-medium text-gray-900">Activity #{item}</p>
                  <p className="text-sm text-gray-600">
                    {item === 1 && 'New patient registration'}
                    {item === 2 && 'Appointment scheduled'}
                    {item === 3 && 'Medical record updated'}
                    {item === 4 && 'Doctor profile created'}
                  </p>
                </div>
                <span className="text-sm text-gray-500">2 hours ago</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Quick Actions */}
      <Card className="p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {userRole === 'admin' && (
            <>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white w-full">
                Add Doctor
              </Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white w-full">
                Add Service
              </Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white w-full">
                View Reports
              </Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white w-full">
                Settings
              </Button>
            </>
          )}
          {userRole === 'receptionist' && (
            <>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white w-full">
                New Appointment
              </Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white w-full">
                Register Patient
              </Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white w-full">
                View Schedule
              </Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white w-full">
                Reports
              </Button>
            </>
          )}
          {userRole === 'doctor' && (
            <>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white w-full">
                My Appointments
              </Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white w-full">
                View Patients
              </Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white w-full">
                Add Notes
              </Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white w-full">
                Profile
              </Button>
            </>
          )}
          {userRole === 'patient' && (
            <>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white w-full">
                Book Appointment
              </Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white w-full">
                View History
              </Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white w-full">
                My Records
              </Button>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white w-full">
                Edit Profile
              </Button>
            </>
          )}
        </div>
      </Card>
    </div>
  )
}
