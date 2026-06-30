'use client'

import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import {
  Home,
  Map,
  Phone,
  Navigation,
  Building2,
  Scale,
  User,
  LogOut,
  Menu,
  X,
  Bell,
  Shield,
} from 'lucide-react'
import DashboardHome from '@/components/dashboard/DashboardHome'
import RiskMap from '@/components/dashboard/RiskMap'
import VoiceSOS from '@/components/dashboard/VoiceSOS'
import SafeRoute from '@/components/dashboard/SafeRoute'
import GovServices from '@/components/dashboard/GovServices'
import LegalAssistant from '@/components/dashboard/LegalAssistant'
import Profile from '@/components/dashboard/Profile'
import { showToast } from '@/components/Toast'

export default function Dashboard() {
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userStr = localStorage.getItem('safeherUser')
    if (userStr) {
      setUser(JSON.parse(userStr))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('safeherUser')
    showToast('Logged out successfully', 'success')
    navigate('/login')
  }

  const navItems = [
    { icon: Home, label: 'Home', path: '/dashboard' },
    { icon: Map, label: 'Risk Map', path: '/dashboard/risk-map' },
    { icon: Phone, label: 'SOS', path: '/dashboard/sos' },
    { icon: Navigation, label: 'Safe Route', path: '/dashboard/safe-route' },
    { icon: Building2, label: 'Gov Services', path: '/dashboard/gov' },
    { icon: Scale, label: 'Legal', path: '/dashboard/legal' },
    { icon: User, label: 'Profile', path: '/dashboard/profile' },
  ]

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard' || location.pathname === '/dashboard/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)]">
      <div className="hidden md:fixed md:left-0 md:top-0 md:w-72 md:h-screen md:border-r md:border-[var(--border)] md:bg-[var(--bg-surface)] md:flex md:flex-col md:pt-6">
        <div className="px-6 pb-6 border-b border-[var(--border)]">
          <div className="rounded-[2rem] bg-gradient-to-br from-[#7C3AED] via-[#9333EA] to-[#EC4899] p-5 shadow-[0_24px_80px_-40px_rgba(124,58,237,0.8)]">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-white/15 text-white shadow-lg shadow-[#000000]/10">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-white/75">SafeHer AI</p>
                <h1 className="mt-3 text-xl font-semibold text-white">Safety Hub</h1>
              </div>
            </div>
            <p className="mt-5 text-sm leading-6 text-white/80">Access your safety controls, alerts, and premium tools from one central command.</p>
          </div>
        </div>

        <nav className="flex-1 px-5 py-4 space-y-3 overflow-y-auto">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] font-semibold text-[var(--text-muted)] mb-3">Navigation</p>
            <div className="space-y-2">
              {navItems.slice(0, 4).map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-semibold transition ${
                      isActive(item.path)
                        ? 'bg-[var(--bg-base)] text-[var(--accent)] shadow-[0_15px_30px_-20px_rgba(124,58,237,0.35)]'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="pt-5 border-t border-[var(--border)]">
            <p className="text-xs uppercase tracking-[0.28em] font-semibold text-[var(--text-muted)] mb-3">Services</p>
            <div className="space-y-2">
              {navItems.slice(4, 6).map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-semibold transition ${
                      isActive(item.path)
                        ? 'bg-[var(--bg-base)] text-[var(--accent)] shadow-[0_15px_30px_-20px_rgba(124,58,237,0.35)]'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </nav>

        <div className="border-t border-[var(--border)] px-5 py-5 space-y-3">
          <button
            onClick={() => navigate('/dashboard/profile')}
            className={`w-full flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-semibold transition ${
              isActive('/dashboard/profile')
                ? 'bg-[var(--bg-base)] text-[var(--accent)] shadow-[0_15px_30px_-20px_rgba(124,58,237,0.35)]'
                : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]'
            }`}
          >
            <User size={18} />
            <span>Profile</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-semibold text-[var(--danger)] hover:bg-[var(--danger-muted)] transition"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      <div className="hidden md:flex md:fixed md:left-72 md:right-0 md:top-0 md:h-20 md:border-b md:border-[var(--border)] md:bg-[var(--bg-base)] md:px-8 md:items-center md:justify-between md:z-30">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-[var(--text-muted)]">Premium Dashboard</p>
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">High fidelity safety insights</h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-full border border-[var(--border)] bg-[var(--bg-surface)] px-4 py-2 text-xs text-[var(--text-secondary)]">
            Guardian Active
          </div>
          <button className="rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-[#7C3AED]/20 transition hover:opacity-95">
            Upgrade Plan
          </button>
          <button className="p-2 rounded-full border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent)] transition">
            <Bell size={18} />
          </button>
        </div>
      </div>

      <div className="md:hidden sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--bg-surface)] px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-[var(--primary)]" />
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">SafeHer AI</p>
            <h1 className="text-sm font-semibold text-[var(--text-primary)]">Safety command center</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1.5 hover:bg-[var(--bg-hover)] rounded-md text-[var(--text-secondary)]">
            <Bell size={16} />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 hover:bg-[var(--bg-hover)] rounded-md text-[var(--text-secondary)]"
          >
            {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[var(--border)] bg-[var(--bg-surface)] p-3 space-y-1 pb-20">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path)
                  setMobileMenuOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-2xl text-xs font-medium transition-all duration-150 ${
                  isActive(item.path)
                    ? 'bg-[var(--primary-muted)] text-[var(--accent)]'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'
                }`}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </button>
            )
          })}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-2xl text-xs font-medium text-[var(--danger)] hover:bg-[var(--danger-muted)] transition-all duration-150 mt-2 border-t border-[var(--border)] pt-3"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      )}

      <main className="md:ml-72 md:mt-20 pb-20 md:pb-0 min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(124,58,237,0.12),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(236,72,153,0.1),_transparent_35%)]">
        <div className="p-4 md:p-8">
          <Routes>
            <Route path="/" element={<DashboardHome user={user} />} />
            <Route path="/risk-map" element={<RiskMap />} />
            <Route path="/sos" element={<VoiceSOS user={user} />} />
            <Route path="/safe-route" element={<SafeRoute user={user} />} />
            <Route path="/gov" element={<GovServices />} />
            <Route path="/legal" element={<LegalAssistant />} />
            <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
          </Routes>
        </div>
      </main>

      <div className="md:hidden fixed bottom-0 left-0 right-0 border-t border-[var(--border)] bg-[var(--bg-surface)] grid grid-cols-5 gap-1 p-1 h-16">
        {navItems.slice(0, 5).map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center rounded-2xl transition-colors duration-150 ${
                isActive(item.path)
                  ? 'text-[var(--accent)] bg-[var(--primary-muted)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Icon size={18} />
              <span className="text-[10px] font-medium mt-0.5">{item.label.split(' ')[0]}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
