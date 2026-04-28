
'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus, Edit2, Trash2, Search, Eye, Loader2 } from 'lucide-react'
import { useReceptionistPatient } from '@/hooks/reception/use-receptionist-patient'

interface Patient {
  id: string
  name?: string
  email?: string
  phone?: string
  dateOfBirth?: string
  address?: string
  registrationDate?: string
}

interface ReceptionistPatientsContentProps {
  patients: Patient[]
}

export default function ReceptionistPatientsContent({ patients }: ReceptionistPatientsContentProps) {
  const {
    searchQuery,
    isDialogOpen,
    isPending,
    error,
    setSearchQuery,
    setIsDialogOpen,
    handleRegisterPatient,
  } = useReceptionistPatient();

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.phone?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Patients</h1>
          <p className="text-gray-600 mt-1">Register and manage patient records</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2 w-fit">
              <Plus className="w-5 h-5" />
              Register Patient
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Register New Patient</DialogTitle>
              <DialogDescription>Add a new patient to the clinic</DialogDescription>
            </DialogHeader>

            <form action={handleRegisterPatient} className="space-y-4 py-4">
              {error && <p className="text-sm text-red-600 font-medium">{error}</p>}

              <Input name="fullName" placeholder="Full Name" required disabled={isPending} />
              <Input name="email" placeholder="Email Address" type="email" disabled={isPending} />
              <Input name="phone" placeholder="Phone Number" disabled={isPending} />
              <Input name="dob" placeholder="Date of Birth" type="date" disabled={isPending} />
              <Input name="address" placeholder="Address" disabled={isPending} />

              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Registering...
                  </>
                ) : 'Register Patient'}
              </Button>
            </form>

          </DialogContent>
        </Dialog>
      </div>

      <Card className="p-4 border border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search patients by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      <Card className="border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Phone</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">DOB</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Registered</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-900 font-medium">{patient.name}</td>
                  <td className="px-6 py-4 text-gray-600">{patient.email}</td>
                  <td className="px-6 py-4 text-gray-600">{patient.phone}</td>
                  <td className="px-6 py-4 text-gray-600">{patient.dateOfBirth}</td>
                  <td className="px-6 py-4 text-gray-600">{patient.registrationDate}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {filteredPatients.length === 0 && (
        <Card className="p-12 text-center border border-gray-200">
          <p className="text-gray-500">No patients found</p>
        </Card>
      )}
    </div>
  )
}
