'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createClient } from '@/utils/supabase/client'
import { signUpSchema, type SignUpFormData } from '@/lib/schemas/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, CheckCircle } from 'lucide-react'

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  })

  const onSubmit = async (data: SignUpFormData) => {
    setError(null)
    setSuccess(false)
    setIsLoading(true)

    try {
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ??
            `${window.location.origin}/auth/callback`,
          data: {
            full_name: data.fullName,
          },
        },
      })

      if (signUpError) {
        setError(signUpError.message)
        return
      }

      if (authData.user) {
        setSuccess(true)
        setTimeout(() => {
          router.push('/auth/sign-up-success')
        }, 1500)
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
      console.error('Sign up error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
      {/* Form Section - Left Side */}
      <div className="flex flex-col items-center justify-center px-6 py-12 lg:px-8 order-2 lg:order-1">
        <div className="w-full max-w-sm">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">ClinicHub</h1>
                <p className="text-xs text-gray-600">Clinic Management System</p>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Get Started</h2>
            <p className="text-gray-600">Create your clinic account in just a few steps</p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6 bg-red-50 border-red-200">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-6 bg-emerald-50 border-emerald-200">
              <CheckCircle className="h-4 w-4 text-emerald-600" />
              <AlertDescription className="text-emerald-800">
                Account created! Redirecting...
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label htmlFor="fullName" className="block text-sm font-semibold text-gray-900 mb-2">
                Full Name
              </label>
              <Input
                id="fullName"
                type="text"
                placeholder="Dr. John Smith"
                disabled={isLoading}
                className={`w-full px-4 py-3 border rounded-lg transition-all ${errors.fullName
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-emerald-500'
                  }`}
                {...register('fullName')}
              />
              {errors.fullName && (
                <p className="text-red-600 text-sm mt-1">{errors.fullName.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="admin@clinic.com"
                disabled={isLoading}
                className={`w-full px-4 py-3 border rounded-lg transition-all ${errors.email
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-emerald-500'
                  }`}
                {...register('email')}
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-2">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                disabled={isLoading}
                className={`w-full px-4 py-3 border rounded-lg transition-all ${errors.password
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-emerald-500'
                  }`}
                {...register('password')}
              />
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
              )}
              <p className="text-xs text-gray-600 mt-1.5">
                At least 8 characters with uppercase, lowercase, and number
              </p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-900 mb-2">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                disabled={isLoading}
                className={`w-full px-4 py-3 border rounded-lg transition-all ${errors.confirmPassword
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-emerald-500'
                  }`}
                {...register('confirmPassword')}
              />
              {errors.confirmPassword && (
                <p className="text-red-600 text-sm mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg"
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-emerald-600 hover:text-emerald-700 font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-8">
          © 2024 ClinicHub. All rights reserved.
        </p>
      </div>

      {/* Image Section - Right Side */}
      <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100 relative overflow-hidden order-1 lg:order-2">
        <div className="absolute inset-0">
          <Image
            src="/clinic-team.jpg"
            alt="Healthcare team"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        </div>
        <div className="relative z-10 text-center text-white px-8 max-w-md">
          <h2 className="text-4xl font-bold mb-4">Join Our Team</h2>
          <p className="text-lg text-gray-100">
            Connect with healthcare professionals and manage your clinic seamlessly
          </p>
        </div>
      </div>
    </div>
  )
}

