'use client'

import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Shield, Eye, EyeOff, AlertCircle, Lock, MapPin, Mic2 } from 'lucide-react'
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
    if (!formData.emailOrPhone.trim()) newErrors.emailOrPhone = 'Email or phone is required'
    if (!formData.password) newErrors.password = 'Password is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (formData.emailOrPhone === 'demo@safeher.ai' && formData.password === 'demo1234') {
      const user = {
        id: '1',
        fullName: 'Priya Sharma',
        phone: '+91 98765 43210',
        email: 'demo@safeher.ai',
        emergencyContacts: [{ name: 'vedant', phone: '+91 93590 96377' }],
      }
      localStorage.setItem('safeherUser', JSON.stringify(user))
      showToast('Welcome back, Priya.', 'success')
      setLoading(false)
      navigate('/dashboard')
    } else {
      showToast('Invalid credentials. Use demo@safeher.ai / demo1234', 'error')
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr', fontFamily: "'Inter', system-ui, sans-serif" }} className="auth-grid">
      {/* ── LEFT PANEL — Dark brand side ── */}
      <div style={{
        background: 'linear-gradient(160deg, #0D1117 0%, #0F1923 50%, #0A1628 100%)',
        display: 'flex', flexDirection: 'column',
        padding: '48px',
        position: 'relative', overflow: 'hidden',
      }} className="auth-left-panel">

        {/* Subtle teal glow */}
        <div style={{
          position: 'absolute', top: '20%', left: '-10%',
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(15,118,110,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 'auto' }}>
          <Shield size={20} color="#14B8A6" strokeWidth={2.5} />
          <span style={{ fontSize: '16px', fontWeight: 700, color: '#F8FAFC', letterSpacing: '-0.02em' }}>SafeHer</span>
        </div>

        {/* Center copy */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: '380px' }}>
          <p style={{ fontSize: '11px', fontWeight: 600, color: '#14B8A6', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px' }}>
            Your safety, always on
          </p>
          <h1 style={{
            fontFamily: 'var(--font-instrument-serif, Georgia, serif)',
            fontSize: 'clamp(32px, 3vw, 46px)',
            fontWeight: 400, lineHeight: 1.1,
            color: '#F8FAFC', letterSpacing: '-0.02em',
            marginBottom: '24px',
          }}>
            Everything you need,<br />
            <em style={{ fontStyle: 'italic', color: '#14B8A6' }}>one tap away.</em>
          </h1>
          <p style={{ fontSize: '15px', color: '#94A3B8', lineHeight: 1.65, marginBottom: '40px' }}>
            Real-time risk intelligence, voice SOS, and live location sharing — running quietly in the background.
          </p>

          {/* Feature list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { icon: Mic2, text: 'Voice-activated SOS — no screen unlock needed' },
              { icon: MapPin, text: 'Live location shared with trusted contacts' },
              { icon: Lock, text: 'End-to-end encrypted. Zero data sold.' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(20,184,166,0.12)', border: '1px solid rgba(20,184,166,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={14} color="#14B8A6" />
                </div>
                <span style={{ fontSize: '13px', color: '#94A3B8', lineHeight: 1.5 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom note */}
        <p style={{ fontSize: '12px', color: '#475569', marginTop: '48px' }}>
          © 2025 SafeHer AI · Emergency? Call 112
        </p>
      </div>

      {/* ── RIGHT PANEL — Form side ── */}
      <div style={{
        background: '#FAFAF8', display: 'flex', alignItems: 'center',
        justifyContent: 'center', padding: '48px 40px',
      }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          {/* Heading */}
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1A1917', letterSpacing: '-0.02em', marginBottom: '6px' }}>
              Welcome back
            </h2>
            <p style={{ fontSize: '14px', color: '#6B6860' }}>
              Sign in to your SafeHer account
            </p>
          </div>

          {/* Demo banner */}
          <div style={{
            display: 'flex', alignItems: 'flex-start', gap: '10px',
            background: '#F0FDFA', border: '1px solid #CCFBF1',
            borderRadius: '10px', padding: '12px 14px', marginBottom: '28px',
          }}>
            <AlertCircle size={14} color="#0F766E" style={{ marginTop: '1px', flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: '12px', fontWeight: 600, color: '#0F766E', marginBottom: '2px' }}>Demo credentials</p>
              <p style={{ fontSize: '11px', color: '#0F766E', fontFamily: "'JetBrains Mono', monospace", opacity: 0.8 }}>
                demo@safeher.ai / demo1234
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div style={{ marginBottom: '16px' }}>
              <label htmlFor="login-email" style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#1A1917', marginBottom: '6px' }}>
                Email or Phone
              </label>
              <input
                id="login-email"
                type="text"
                name="emailOrPhone"
                value={formData.emailOrPhone}
                onChange={handleChange}
                placeholder="demo@safeher.ai"
                autoComplete="username"
                style={{
                  width: '100%', padding: '11px 14px',
                  background: '#FFFFFF', border: `1px solid ${errors.emailOrPhone ? '#EF4444' : '#DDD9D0'}`,
                  borderRadius: '8px', fontSize: '14px', color: '#1A1917',
                  outline: 'none', transition: 'border-color 0.15s',
                  boxSizing: 'border-box',
                }}
                onFocus={e => (e.target.style.borderColor = '#0F766E')}
                onBlur={e => (e.target.style.borderColor = errors.emailOrPhone ? '#EF4444' : '#DDD9D0')}
              />
              {errors.emailOrPhone && (
                <p style={{ fontSize: '12px', color: '#EF4444', marginTop: '4px' }}>{errors.emailOrPhone}</p>
              )}
            </div>

            {/* Password */}
            <div style={{ marginBottom: '8px' }}>
              <label htmlFor="login-password" style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#1A1917', marginBottom: '6px' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  style={{
                    width: '100%', padding: '11px 40px 11px 14px',
                    background: '#FFFFFF', border: `1px solid ${errors.password ? '#EF4444' : '#DDD9D0'}`,
                    borderRadius: '8px', fontSize: '14px', color: '#1A1917',
                    outline: 'none', transition: 'border-color 0.15s',
                    boxSizing: 'border-box',
                  }}
                  onFocus={e => (e.target.style.borderColor = '#0F766E')}
                  onBlur={e => (e.target.style.borderColor = errors.password ? '#EF4444' : '#DDD9D0')}
                />
                <button
                  type="button"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: '#A8A49D', padding: '2px',
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p style={{ fontSize: '12px', color: '#EF4444', marginTop: '4px' }}>{errors.password}</p>
              )}
            </div>

            {/* Remember + forgot */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', marginTop: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  style={{ width: '15px', height: '15px', accentColor: '#0F766E', cursor: 'pointer' }}
                />
                <span style={{ fontSize: '13px', color: '#6B6860' }}>Remember me</span>
              </label>
              <a href="#" style={{ fontSize: '13px', color: '#0F766E', textDecoration: 'none', fontWeight: 500 }}>
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button
              id="login-submit"
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '13px',
                background: loading ? '#5eadaa' : '#0F766E',
                color: '#fff', border: 'none',
                borderRadius: '8px', fontSize: '15px', fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'opacity 0.15s, transform 0.1s',
                boxShadow: '0 4px 16px rgba(15,118,110,0.25)',
              }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.opacity = '0.92' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: '13px', color: '#A8A49D', marginTop: '24px' }}>
            No account?{' '}
            <Link to="/signup" style={{ color: '#0F766E', fontWeight: 600, textDecoration: 'none' }}>
              Create one free
            </Link>
          </p>

          <p style={{ textAlign: 'center', fontSize: '11px', color: '#D4D0C8', marginTop: '32px', lineHeight: 1.6 }}>
            End-to-end encrypted · No data sold · Delete anytime
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .auth-grid { grid-template-columns: 1fr !important; }
          .auth-left-panel { display: none !important; }
        }
      `}</style>
    </div>
  )
}
