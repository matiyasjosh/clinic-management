
'use client'

import { Card } from '@/components/ui/card'
import { BarChart3, TrendingUp, Users, Calendar } from 'lucide-react'

export default function AnalyticsContent() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Analytics & Reports</h1>
        <p className="text-gray-600 mt-1">Clinic performance metrics and insights</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Appointments</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">1,234</p>
              <p className="text-sm text-green-600 mt-2">+12% from last month</p>
            </div>
            <Calendar className="w-12 h-12 text-blue-100" />
          </div>
        </Card>

        <Card className="p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Active Patients</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">856</p>
              <p className="text-sm text-green-600 mt-2">+8% from last month</p>
            </div>
            <Users className="w-12 h-12 text-green-100" />
          </div>
        </Card>

        <Card className="p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Revenue</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">$45,600</p>
              <p className="text-sm text-green-600 mt-2">+15% from last month</p>
            </div>
            <TrendingUp className="w-12 h-12 text-emerald-100" />
          </div>
        </Card>

        <Card className="p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Satisfaction Rate</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">92%</p>
              <p className="text-sm text-green-600 mt-2">+3% from last month</p>
            </div>
            <BarChart3 className="w-12 h-12 text-purple-100" />
          </div>
        </Card>
      </div>

      <Card className="p-8 border border-gray-200 text-center">
        <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Appointment Trends</h3>
        <p className="text-gray-600">Chart visualization will be displayed here</p>
      </Card>

      <Card className="p-8 border border-gray-200 text-center">
        <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Revenue Analysis</h3>
        <p className="text-gray-600">Chart visualization will be displayed here</p>
      </Card>
    </div>
  )
}
