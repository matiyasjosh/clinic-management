
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

interface Service {
  id: string
  name: string
  description: string
  price: number
  duration: number
}

export default function ServicesPage() {
  const [services] = useState<Service[]>([
    {
      id: '1',
      name: 'General Consultation',
      description: 'Standard medical consultation with doctor',
      price: 50,
      duration: 30,
    },
    {
      id: '2',
      name: 'Specialized Consultation',
      description: 'Consultation with specialist doctor',
      price: 100,
      duration: 45,
    },
    {
      id: '3',
      name: 'Lab Work',
      description: 'Laboratory tests and analysis',
      price: 75,
      duration: 20,
    },
  ])

  const [searchQuery, setSearchQuery] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Services Management</h1>
            <p className="text-gray-600 mt-1">Manage clinic services and pricing</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2 w-fit">
                <Plus className="w-5 h-5" />
                Add Service
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Service</DialogTitle>
                <DialogDescription>Add a new service to your clinic</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <Input placeholder="Service Name" />
                <Input placeholder="Description" />
                <Input placeholder="Price ($)" type="number" />
                <Input placeholder="Duration (minutes)" type="number" />
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                  Add Service
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
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </Card>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <Card key={service.id} className="p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 mb-2">{service.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{service.description}</p>
              <div className="space-y-3 mb-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-bold text-emerald-600">${service.price}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-bold text-gray-900">{service.duration} min</span>
                </div>
              </div>
              <div className="flex gap-2 pt-4 border-t border-gray-200">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  <Edit2 className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <Card className="p-12 text-center border border-gray-200">
            <p className="text-gray-500">No services found</p>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
