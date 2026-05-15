
'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Settings, Bell, Lock, Users } from 'lucide-react'

export default function AdminSettingsContent() {
  const [clinicName, setClinicName] = useState('ClinicHub Medical Center')
  const [email, setEmail] = useState('admin@clinic.com')
  const [phone, setPhone] = useState('+1 (555) 123-4567')

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage clinic settings and preferences</p>
      </div>

      <Card className="p-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <Settings className="w-6 h-6 text-emerald-600" />
          <h2 className="text-xl font-bold text-gray-900">Clinic Information</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Clinic Name</label>
            <Input
              value={clinicName}
              onChange={(e) => setClinicName(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full" />
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Save Changes</Button>
        </div>
      </Card>

      <Card className="p-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
        </div>
        <div className="space-y-4">
          {[
            { label: 'New Appointments', enabled: true },
            { label: 'Patient Registrations', enabled: true },
            { label: 'System Alerts', enabled: false },
          ].map((notif, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <span className="text-gray-700">{notif.label}</span>
              <input type="checkbox" defaultChecked={notif.enabled} className="w-5 h-5" />
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <Lock className="w-6 h-6 text-red-600" />
          <h2 className="text-xl font-bold text-gray-900">Security</h2>
        </div>
        <div className="space-y-4">
          <Button variant="outline" className="w-full border-gray-300 text-gray-700">
            Change Password
          </Button>
          <Button variant="outline" className="w-full border-gray-300 text-gray-700">
            Two-Factor Authentication
          </Button>
        </div>
      </Card>

      <Card className="p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-900">User Management</h2>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">Add User</Button>
        </div>
        <div className="space-y-3">
          {[
            { name: 'Admin User', role: 'Administrator', email: 'admin@clinic.com' },
            { name: 'Dr. John Smith', role: 'Doctor', email: 'john@clinic.com' },
            { name: 'Jane Receptionist', role: 'Receptionist', email: 'jane@clinic.com' },
          ].map((user, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm font-medium">
                  {user.role}
                </span>
                <Button variant="outline" size="sm" className="border-gray-300">
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
