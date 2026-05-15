
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { generateRandomPassword } from '@/utils/password-generator'
import { Copy, RotateCw, Eye, EyeOff } from 'lucide-react'

interface CreateAccountDialogProps {
  patientId: string
  patientName: string
  patientEmail: string
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onCreateAccount: (patientId: string, password: string) => void
}

export default function CreateAccountDialog({
  patientId,
  patientName,
  patientEmail,
  isOpen,
  onOpenChange,
  onCreateAccount,
}: CreateAccountDialogProps) {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleGeneratePassword = () => {
    const newPassword = generateRandomPassword(14)
    setPassword(newPassword)
  }

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(password)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const handleCreateAccount = async () => {
    if (!password) {
      alert('Please generate a password first')
      return
    }
    setIsLoading(true)
    try {
      await onCreateAccount(patientId, password)
      setPassword('')
      onOpenChange(false)
    } catch (error) {
      console.error('[v0] Account creation failed:', error)
      alert('Failed to create account. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Patient Account</DialogTitle>
          <DialogDescription>
            Set up a login account so {patientName} can track appointments and health reports
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Patient Name</p>
            <p className="font-semibold text-gray-900">{patientName}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Email (Login)</p>
            <p className="font-semibold text-gray-900 break-all">{patientEmail}</p>
            <p className="text-xs text-gray-500 mt-2">
              Patient will use this email to log in
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 h-auto p-0"
                onClick={handleGeneratePassword}
                disabled={isLoading}
              >
                <RotateCw className="w-4 h-4 mr-1" />
                Generate
              </Button>
            </div>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                readOnly
                placeholder="Click 'Generate' to create a random password"
                className="pr-10 font-mono text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {password && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800 mb-3">
                Share this password securely with the patient. They can change it after
                first login.
              </p>
              <Button
                type="button"
                variant="outline"
                className="w-full border-blue-300 text-blue-600 hover:bg-blue-100"
                onClick={handleCopyPassword}
              >
                <Copy className="w-4 h-4 mr-2" />
                {isCopied ? 'Copied to Clipboard!' : 'Copy Password'}
              </Button>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
              onClick={handleCreateAccount}
              disabled={!password || isLoading}
            >
              {isLoading ? 'Creating...' : 'Create Account'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
