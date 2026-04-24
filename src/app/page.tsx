'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Users,
  Calendar,
  FileText,
  Stethoscope,
  BarChart3,
  Shield,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">ClinicHub</h1>
          </div>
          <Link href="/auth/login">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Sign In
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 text-balance">
          Professional Clinic Management Made Simple
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto text-balance">
          Streamline your clinic operations with our comprehensive management system. Handle appointments, patient records, and staff with ease.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/auth/login">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg">
              Get Started
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Powerful Features for Modern Clinics
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:border-emerald-300 transition-colors">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-emerald-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Appointment Management</h4>
              <p className="text-gray-600">
                Schedule and manage appointments with automated reminders and real-time availability tracking.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:border-emerald-300 transition-colors">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-emerald-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Patient Records</h4>
              <p className="text-gray-600">
                Maintain detailed and secure patient profiles with complete medical history and contact information.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:border-emerald-300 transition-colors">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-emerald-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Medical Records</h4>
              <p className="text-gray-600">
                Store and manage medical records, diagnoses, and treatment notes with easy access and updates.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:border-emerald-300 transition-colors">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <Stethoscope className="w-6 h-6 text-emerald-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Doctor Directory</h4>
              <p className="text-gray-600">
                Manage your medical team with detailed profiles, specializations, and availability schedules.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:border-emerald-300 transition-colors">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-emerald-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Analytics & Reports</h4>
              <p className="text-gray-600">
                Get insights into clinic operations with comprehensive analytics and detailed reports.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-8 rounded-lg border border-gray-200 hover:border-emerald-300 transition-colors">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-emerald-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Secure & Private</h4>
              <p className="text-gray-600">
                HIPAA-compliant security with encryption, role-based access, and audit trails.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          Why Choose ClinicHub?
        </h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            {['Save time with automated scheduling', 'Reduce paperwork with digital records', 'Improve patient satisfaction', 'Better team coordination'].map(
              (benefit, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">{benefit}</p>
                </div>
              )
            )}
          </div>
          <div className="space-y-4">
            {['HIPAA compliant and secure', 'Easy-to-use interface', '24/7 system uptime', 'Dedicated support team'].map(
              (benefit, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700">{benefit}</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-emerald-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h3 className="text-4xl font-bold mb-4">Ready to Transform Your Clinic?</h3>
          <p className="text-lg text-emerald-50 mb-8">
            Join hundreds of clinics already using ClinicHub to streamline their operations.
          </p>
          <Link href="/auth/login">
            <Button className="bg-white hover:bg-gray-100 text-emerald-600 px-8 py-6 text-lg font-semibold">
              Get Started Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-xl font-bold text-white">ClinicHub</h4>
          </div>
          <p className="text-sm">
            © 2024 ClinicHub. Professional clinic management system for modern healthcare providers.
          </p>
        </div>
      </footer>
    </div>
  )
}
