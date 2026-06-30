'use client'

import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Shield, Eye, EyeOff } from 'lucide-react'
import { showToast } from '@/components/Toast'

interface FormErrors {
  [key: string]: string
}

export default function Signup() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    agreeToTerms: false,
  })

  const validateForm = () => {
    const newErrors: FormErrors = {}

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!formData.email.includes('@')) newErrors.email = 'Invalid email'
    if (!formData.password) newErrors.password = 'Password is required'
    else if (formData.password.length < 6) newErrors.password = 'Password must be 6+ characters'
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    if (!formData.emergencyContactName.trim()) {
      newErrors.emergencyContactName = 'Emergency contact name is required'
    }
    if (!formData.emergencyContactPhone.trim()) {
      newErrors.emergencyContactPhone = 'Emergency contact phone is required'
    }
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to terms'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    const user = {
      id: Date.now().toString(),
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      emergencyContacts: [
        {
          name: formData.emergencyContactName,
          phone: formData.emergencyContactPhone,
        },
      ],
    }

    localStorage.setItem('safeherUser', JSON.stringify(user))
    showToast('Account created successfully!', 'success')
    setLoading(false)
    navigate('/dashboard')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-xl p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-[var(--primary)]" />
            <div>
              <h1 className="text-lg font-semibold font-heading text-[var(--text-primary)]">Create account</h1>
              <p className="text-xs text-[var(--text-muted)]">Join SafeHer AI today</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="input-base"
                  placeholder="Priya Sharma"
                />
                {errors.fullName && (
                  <p className="text-[var(--danger)] text-xs mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-base"
                  placeholder="+91 98765 43210"
                />
                {errors.phone && <p className="text-[var(--danger)] text-xs mt-1">{errors.phone}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-base"
                  placeholder="priya@example.com"
                />
                {errors.email && <p className="text-[var(--danger)] text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="input-base pr-9"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                  >
                    {showPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-[var(--danger)] text-xs mt-1">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="input-base pr-9"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-[var(--danger)] text-xs mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Emergency Contact */}
              <div className="pt-2 border-t border-[var(--border)] space-y-3">
                <p className="text-xs font-medium text-[var(--text-secondary)]">Emergency Contact</p>
                
                <div>
                  <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Contact Name</label>
                  <input
                    type="text"
                    name="emergencyContactName"
                    value={formData.emergencyContactName}
                    onChange={handleChange}
                    className="input-base"
                    placeholder="Name"
                  />
                  {errors.emergencyContactName && (
                    <p className="text-[var(--danger)] text-xs mt-1">{errors.emergencyContactName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Contact Phone</label>
                  <input
                    type="tel"
                    name="emergencyContactPhone"
                    value={formData.emergencyContactPhone}
                    onChange={handleChange}
                    className="input-base"
                    placeholder="+91 98765 43210"
                  />
                  {errors.emergencyContactPhone && (
                    <p className="text-[var(--danger)] text-xs mt-1">{errors.emergencyContactPhone}</p>
                  )}
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-2 pt-2">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="w-4 h-4 rounded-sm bg-[var(--bg-elevated)] border border-[var(--border)] mt-0.5 flex-shrink-0"
                />
                <label className="text-xs text-[var(--text-secondary)]">
                  I agree to the Terms of Service and Privacy Policy
                </label>
              </div>
              {errors.agreeToTerms && (
                <p className="text-[var(--danger)] text-xs">{errors.agreeToTerms}</p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 mt-6 bg-[var(--primary)] hover:bg-[var(--primary-hover)] disabled:opacity-50 text-white text-sm font-medium rounded-md transition-colors duration-150"
              >
                {loading ? 'Creating account...' : 'Create account'}
              </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-xs text-[var(--text-muted)] mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-[var(--primary)] hover:text-[var(--primary-hover)] font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
