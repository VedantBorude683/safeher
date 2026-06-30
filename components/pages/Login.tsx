'use client'

import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Shield, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { showToast } from '@/components/Toast'

interface FormErrors {
  [key: string]: string
}

export default function Login() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: '',
    rememberMe: false,
  })

  const validateForm = () => {
    const newErrors: FormErrors = {}

    if (!formData.emailOrPhone.trim()) {
      newErrors.emailOrPhone = 'Email or phone is required'
    }
    if (!formData.password) {
      newErrors.password = 'Password is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Demo login
    if (formData.emailOrPhone === 'demo@safeher.ai' && formData.password === 'demo1234') {
      const user = {
        id: '1',
        fullName: 'Priya Sharma',
        phone: '+91 98765 43210',
        email: 'demo@safeher.ai',
        emergencyContacts: [
          {
            name: 'Rahul Kumar',
            phone: '+91 87654 32109',
          },
        ],
      }
      localStorage.setItem('safeherUser', JSON.stringify(user))
      showToast('Login successful!', 'success')
      setLoading(false)
      navigate('/dashboard')
    } else {
      showToast('Invalid credentials. Use demo@safeher.ai / demo1234', 'error')
      setLoading(false)
    }
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
              <h1 className="text-lg font-semibold font-heading text-[var(--text-primary)]">Welcome back</h1>
              <p className="text-xs text-[var(--text-muted)]">Continue to SafeHer AI</p>
            </div>
          </div>

          {/* Demo Banner */}
          <div className="mb-6 p-3 rounded-md bg-[var(--primary-muted)] border border-[var(--border-focus)] flex items-start gap-2">
            <AlertCircle size={14} className="text-[var(--accent)] mt-0.5 flex-shrink-0" />
            <div className="text-xs text-[var(--accent)]">
              <p className="font-medium mb-1">Demo credentials</p>
              <p className="font-mono text-[10px]">demo@safeher.ai / demo1234</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email or Phone */}
            <div>
              <label className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Email or Phone</label>
              <input
                type="text"
                name="emailOrPhone"
                value={formData.emailOrPhone}
                onChange={handleChange}
                className="input-base"
                placeholder="demo@safeher.ai"
              />
              {errors.emailOrPhone && (
                <p className="text-[var(--danger)] text-xs mt-1">{errors.emailOrPhone}</p>
              )}
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
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
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

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 rounded-sm bg-[var(--bg-elevated)] border border-[var(--border)]"
                />
                Remember me
              </label>
              <a href="#" className="text-xs text-[var(--primary)] hover:text-[var(--primary-hover)] transition-colors">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 mt-6 bg-[var(--primary)] hover:bg-[var(--primary-hover)] disabled:opacity-50 text-white text-sm font-medium rounded-md transition-colors duration-150"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          {/* Signup Link */}
          <p className="text-center text-xs text-[var(--text-muted)] mt-6">
            No account?{' '}
            <Link to="/signup" className="text-[var(--primary)] hover:text-[var(--primary-hover)] font-medium transition-colors">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
