
'use client'

import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

interface PatientsSearchBarProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

export default function PatientsSearchBar({
  searchQuery,
  onSearchChange,
}: PatientsSearchBarProps) {
  return (
    <Card className="p-4 border border-gray-200">
      <div className="relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <Input
          placeholder="Search patients by name or email..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
    </Card>
  )
}
