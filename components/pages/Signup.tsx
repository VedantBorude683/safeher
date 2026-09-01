'use client'

import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Shield, Eye, EyeOff, Users, Lock, Mic2 } from 'lucide-react'
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
    else if (!formData.email.includes('@')) newErrors.email = 'Invalid email address'
    if (!formData.password) newErrors.password = 'Password is required'
    else if (formData.password.length < 6) newErrors.password = 'Minimum 6 characters'
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
    if (!formData.emergencyContactName.trim()) newErrors.emergencyContactName = 'Contact name is required'
    if (!formData.emergencyContactPhone.trim()) newErrors.emergencyContactPhone = 'Contact phone is required'
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to continue'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 600))

    const user = {
      id: Date.now().toString(),
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      emergencyContacts: [{ name: formData.emergencyContactName, phone: formData.emergencyContactPhone }],
    }

    localStorage.setItem('safeherUser', JSON.stringify(user))
    showToast('Account created. Welcome to SafeHer.', 'success')
    setLoading(false)
    navigate('/dashboard')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const inputStyle = (fieldName: string) => ({
    width: '100%', padding: '11px 14px',
    background: '#FFFFFF',
    border: `1px solid ${errors[fieldName] ? '#EF4444' : '#DDD9D0'}`,
    borderRadius: '8px', fontSize: '14px', color: '#1A1917',
    outline: 'none', transition: 'border-color 0.15s',
    boxSizing: 'border-box' as const,
  })

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr', fontFamily: "'Inter', system-ui, sans-serif" }} className="auth-grid">

      {/* ── LEFT PANEL — Dark brand side ── */}
      <div style={{
        background: 'linear-gradient(160deg, #0D1117 0%, #0F1923 50%, #0A1628 100%)',
        display: 'flex', flexDirection: 'column',
        padding: '48px', position: 'relative', overflow: 'hidden',
      }} className="auth-left-panel">

        <div style={{
          position: 'absolute', bottom: '10%', right: '-10%',
          width: '380px', height: '380px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(15,118,110,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: 'auto' }}>
          <Shield size={20} color="#14B8A6" strokeWidth={2.5} />
          <span style={{ fontSize: '16px', fontWeight: 700, color: '#F8FAFC', letterSpacing: '-0.02em' }}>SafeHer</span>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: '380px' }}>
          <p style={{ fontSize: '11px', fontWeight: 600, color: '#14B8A6', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px' }}>
            Setup takes 2 minutes
          </p>
          <h1 style={{
            fontFamily: 'var(--font-instrument-serif, Georgia, serif)',
            fontSize: 'clamp(32px, 3vw, 46px)',
            fontWeight: 400, lineHeight: 1.1,
            color: '#F8FAFC', letterSpacing: '-0.02em', marginBottom: '24px',
          }}>
            Protected from the<br />
            <em style={{ fontStyle: 'italic', color: '#14B8A6' }}>moment you sign up.</em>
          </h1>
          <p style={{ fontSize: '15px', color: '#94A3B8', lineHeight: 1.65, marginBottom: '40px' }}>
            Add one emergency contact and you're active. Everything else — risk maps, SOS, safe routes — is already waiting for you.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { icon: Users, text: 'Emergency contacts notified automatically' },
              { icon: Mic2, text: 'Voice SOS active from day one' },
              { icon: Lock, text: 'Your data stays yours — always' },
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

        <p style={{ fontSize: '12px', color: '#475569', marginTop: '48px' }}>
          © 2025 SafeHer AI · Emergency? Call 112
        </p>
      </div>

      {/* ── RIGHT PANEL — Form side ── */}
      <div style={{
        background: '#FAFAF8',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        padding: '48px 40px', overflowY: 'auto',
      }}>
        <div style={{ width: '100%', maxWidth: '420px' }}>
          <div style={{ marginBottom: '28px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1A1917', letterSpacing: '-0.02em', marginBottom: '6px' }}>
              Create your account
            </h2>
            <p style={{ fontSize: '14px', color: '#6B6860' }}>
              Free forever · No credit card needed
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* Full Name + Phone side by side */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
              <div>
                <label htmlFor="signup-name" style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#1A1917', marginBottom: '6px' }}>Full Name</label>
                <input
                  id="signup-name"
                  type="text" name="fullName" value={formData.fullName}
                  onChange={handleChange} placeholder="Priya Sharma"
                  autoComplete="name"
                  style={inputStyle('fullName')}
                  onFocus={e => (e.target.style.borderColor = '#0F766E')}
                  onBlur={e => (e.target.style.borderColor = errors.fullName ? '#EF4444' : '#DDD9D0')}
                />
                {errors.fullName && <p style={{ fontSize: '11px', color: '#EF4444', marginTop: '4px' }}>{errors.fullName}</p>}
              </div>
              <div>
                <label htmlFor="signup-phone" style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#1A1917', marginBottom: '6px' }}>Phone</label>
                <input
                  id="signup-phone"
                  type="tel" name="phone" value={formData.phone}
                  onChange={handleChange} placeholder="+91 98765 43210"
                  autoComplete="tel"
                  style={inputStyle('phone')}
                  onFocus={e => (e.target.style.borderColor = '#0F766E')}
                  onBlur={e => (e.target.style.borderColor = errors.phone ? '#EF4444' : '#DDD9D0')}
                />
                {errors.phone && <p style={{ fontSize: '11px', color: '#EF4444', marginTop: '4px' }}>{errors.phone}</p>}
              </div>
            </div>

            {/* Email */}
            <div style={{ marginBottom: '14px' }}>
              <label htmlFor="signup-email" style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#1A1917', marginBottom: '6px' }}>Email</label>
              <input
                id="signup-email"
                type="email" name="email" value={formData.email}
                onChange={handleChange} placeholder="priya@example.com"
                autoComplete="email"
                style={inputStyle('email')}
                onFocus={e => (e.target.style.borderColor = '#0F766E')}
                onBlur={e => (e.target.style.borderColor = errors.email ? '#EF4444' : '#DDD9D0')}
              />
              {errors.email && <p style={{ fontSize: '11px', color: '#EF4444', marginTop: '4px' }}>{errors.email}</p>}
            </div>

            {/* Password + Confirm side by side */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
              <div>
                <label htmlFor="signup-password" style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#1A1917', marginBottom: '6px' }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="signup-password"
                    type={showPassword ? 'text' : 'password'}
                    name="password" value={formData.password}
                    onChange={handleChange} placeholder="6+ chars"
                    autoComplete="new-password"
                    style={{ ...inputStyle('password'), paddingRight: '36px' }}
                    onFocus={e => (e.target.style.borderColor = '#0F766E')}
                    onBlur={e => (e.target.style.borderColor = errors.password ? '#EF4444' : '#DDD9D0')}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#A8A49D' }}>
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {errors.password && <p style={{ fontSize: '11px', color: '#EF4444', marginTop: '4px' }}>{errors.password}</p>}
              </div>
              <div>
                <label htmlFor="signup-confirm" style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#1A1917', marginBottom: '6px' }}>Confirm</label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="signup-confirm"
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword" value={formData.confirmPassword}
                    onChange={handleChange} placeholder="Repeat"
                    autoComplete="new-password"
                    style={{ ...inputStyle('confirmPassword'), paddingRight: '36px' }}
                    onFocus={e => (e.target.style.borderColor = '#0F766E')}
                    onBlur={e => (e.target.style.borderColor = errors.confirmPassword ? '#EF4444' : '#DDD9D0')}
                  />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} aria-label="Toggle confirm password" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#A8A49D' }}>
                    {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {errors.confirmPassword && <p style={{ fontSize: '11px', color: '#EF4444', marginTop: '4px' }}>{errors.confirmPassword}</p>}
              </div>
            </div>

            {/* Emergency contact divider */}
            <div style={{ borderTop: '1px solid #E8E6DF', paddingTop: '20px', marginBottom: '16px' }}>
              <p style={{ fontSize: '13px', fontWeight: 600, color: '#1A1917', marginBottom: '4px' }}>Emergency Contact</p>
              <p style={{ fontSize: '12px', color: '#A8A49D', marginBottom: '14px' }}>Alerted automatically when you activate SOS.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label htmlFor="signup-ec-name" style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#1A1917', marginBottom: '6px' }}>Name</label>
                  <input
                    id="signup-ec-name"
                    type="text" name="emergencyContactName" value={formData.emergencyContactName}
                    onChange={handleChange} placeholder="Mom"
                    style={inputStyle('emergencyContactName')}
                    onFocus={e => (e.target.style.borderColor = '#0F766E')}
                    onBlur={e => (e.target.style.borderColor = errors.emergencyContactName ? '#EF4444' : '#DDD9D0')}
                  />
                  {errors.emergencyContactName && <p style={{ fontSize: '11px', color: '#EF4444', marginTop: '4px' }}>{errors.emergencyContactName}</p>}
                </div>
                <div>
                  <label htmlFor="signup-ec-phone" style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#1A1917', marginBottom: '6px' }}>Phone</label>
                  <input
                    id="signup-ec-phone"
                    type="tel" name="emergencyContactPhone" value={formData.emergencyContactPhone}
                    onChange={handleChange} placeholder="+91 98765 43210"
                    style={inputStyle('emergencyContactPhone')}
                    onFocus={e => (e.target.style.borderColor = '#0F766E')}
                    onBlur={e => (e.target.style.borderColor = errors.emergencyContactPhone ? '#EF4444' : '#DDD9D0')}
                  />
                  {errors.emergencyContactPhone && <p style={{ fontSize: '11px', color: '#EF4444', marginTop: '4px' }}>{errors.emergencyContactPhone}</p>}
                </div>
              </div>
            </div>

            {/* Terms */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}>
                <input
                  type="checkbox" name="agreeToTerms"
                  checked={formData.agreeToTerms} onChange={handleChange}
                  style={{ marginTop: '2px', width: '15px', height: '15px', accentColor: '#0F766E', flexShrink: 0, cursor: 'pointer' }}
                />
                <span style={{ fontSize: '13px', color: '#6B6860', lineHeight: 1.5 }}>
                  I agree to the{' '}
                  <a href="#" style={{ color: '#0F766E', textDecoration: 'none', fontWeight: 500 }}>Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" style={{ color: '#0F766E', textDecoration: 'none', fontWeight: 500 }}>Privacy Policy</a>
                </span>
              </label>
              {errors.agreeToTerms && <p style={{ fontSize: '12px', color: '#EF4444', marginTop: '6px' }}>{errors.agreeToTerms}</p>}
            </div>

            {/* Submit */}
            <button
              id="signup-submit"
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '13px',
                background: loading ? '#5eadaa' : '#0F766E',
                color: '#fff', border: 'none',
                borderRadius: '8px', fontSize: '15px', fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'opacity 0.15s',
                boxShadow: '0 4px 16px rgba(15,118,110,0.25)',
              }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.opacity = '0.92' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
            >
              {loading ? 'Creating account…' : 'Create my account'}
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: '13px', color: '#A8A49D', marginTop: '20px' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#0F766E', fontWeight: 600, textDecoration: 'none' }}>
              Sign in
            </Link>
          </p>

          <p style={{ textAlign: 'center', fontSize: '11px', color: '#D4D0C8', marginTop: '24px', lineHeight: 1.6 }}>
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
