
'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Search, Edit2, Trash2, Mail, Phone } from 'lucide-react'
import { useReceptionists } from '@/hooks/admin/use-receptionists-content'

interface Receptionist {
  id: string
  full_name?: string
  email?: string
  phone?: string
  created_at?: string
}

interface ReceptionistsContentProps {
  receptionists: Receptionist[]
}

export default function ReceptionistsContent({ receptionists }: ReceptionistsContentProps) {
  const {
    searchQuery,
    setSearchQuery,
    isModalOpen,
    formData,
    error,
    setFormData,
    setIsModalOpen,
    filteredReceptionists,
    handleAddReceptionist,
    closeModal,
    updateFormField,
    removeReceptionist,
  } = useReceptionists(receptionists)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Receptionists</h1>
          <p className="text-gray-600">Manage your clinic receptionists and front-desk staff</p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          <Plus className="w-5 h-5" />
          Add Receptionist
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search receptionists by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* Receptionists Table */}
      <Card className="border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Phone</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredReceptionists.length > 0 ? (
                filteredReceptionists.map((receptionist) => (
                  <tr key={receptionist.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {receptionist.full_name || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        {receptionist.email || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        {receptionist.phone || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-medium">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm flex items-center gap-3">
                      <button
                        className="text-blue-600 hover:text-blue-700 transition-colors"
                        onClick={() => updateFormField}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800 transition-colors cursor-pointer"
                        onClick={() => removeReceptionist(receptionist.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No receptionists found. Create your first receptionist to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add Receptionist Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md border border-gray-200">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Add Receptionist</h2>

              {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-100 border border-red-300 text-red-700 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleAddReceptionist} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Full Name
                  </label>
                  <Input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    placeholder="John Smith"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="john@clinic.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    Create
                  </Button>
                </div>
              </form>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
