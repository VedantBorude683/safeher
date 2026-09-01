'use client'

import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation, Link } from 'react-router-dom'
import {
  Home, Map, Phone, Navigation, Building2, Scale,
  User, LogOut, Menu, X, Bell, Shield, ShieldCheck, Users,
  ChevronRight, ArrowUpRight,
} from 'lucide-react'
import DashboardHome from '@/components/dashboard/DashboardHome'
import RiskMap from '@/components/dashboard/RiskMap'
import VoiceSOS from '@/components/dashboard/VoiceSOS'
import SafeRoute from '@/components/dashboard/SafeRoute'
import GovServices from '@/components/dashboard/GovServices'
import LegalAssistant from '@/components/dashboard/LegalAssistant'
import GuardianAI from '@/components/dashboard/GuardianAI'
import Profile from '@/components/dashboard/Profile'
import { showToast } from '@/components/Toast'
import useRiskEngine from '@/hooks/useRiskEngine'
import RiskModals from '@/components/dashboard/RiskModals'

const NAV_SECTIONS = [
  {
    label: 'Overview',
    items: [
      { icon: Home,        label: 'Home',         path: '/dashboard' },
      { icon: Map,         label: 'Risk Map',     path: '/dashboard/risk-map' },
      { icon: ShieldCheck, label: 'Risk Engine',  path: '/dashboard/guardian' },
    ],
  },
  {
    label: 'Safety Tools',
    items: [
      { icon: Phone,       label: 'Voice SOS',    path: '/dashboard/sos' },
      { icon: Navigation,  label: 'Safe Route',   path: '/dashboard/safe-route' },
      { icon: Building2,   label: 'Gov Services', path: '/dashboard/gov' },
      { icon: Scale,       label: 'Legal Help',   path: '/dashboard/legal' },
    ],
  },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)

  const {
    riskState,
    telemetryData,
    permissionsGranted,
    permissionError,
    requestPermissions,
    resetRiskState,
    escalateToCritical
  } = useRiskEngine(true)

  useEffect(() => {
    const userStr = localStorage.getItem('safeherUser')
    if (userStr) {
      try {
        setUser(JSON.parse(userStr))
      } catch {
        // ignore
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('safeherUser')
    showToast('Logged out successfully', 'success')
    navigate('/login')
  }

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard' || location.pathname === '/dashboard/'
    }
    return location.pathname.startsWith(path)
  }

  const allNavItems = NAV_SECTIONS.flatMap((s) => s.items)
  const currentItem = allNavItems.find((i) => isActive(i.path))
  const currentLabel = currentItem?.label ?? 'Dashboard'

  const initials = user?.fullName
    ? user.fullName
        .split(' ')
        .map((w: string) => w[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'PS'

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] font-sans antialiased">
      {/* ────────────────────────────────────────────────────────
          DESKTOP SIDEBAR
      ──────────────────────────────────────────────────────── */}
      <aside
        className="fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-[var(--border)] z-40 hidden md:flex flex-col"
        aria-label="Dashboard Sidebar"
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-[var(--border)] flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 text-decoration-none group">
            <div className="w-8 h-8 rounded-lg bg-[var(--primary)] flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
              <Shield size={18} strokeWidth={2.5} />
            </div>
            <div>
              <span className="text-base font-bold text-[var(--text-primary)] tracking-tight">SafeHer</span>
              <span className="block text-[11px] font-medium text-[var(--text-muted)] -mt-0.5">Safety Intelligence</span>
            </div>
          </Link>
          <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-[var(--accent-ghost)] text-[var(--primary)] border border-[var(--accent-light)]">
            v2.4
          </span>
        </div>

        {/* Navigation Sections */}
        <nav className="flex-1 overflow-y-auto px-3.5 py-5 space-y-6">
          {NAV_SECTIONS.map((section) => (
            <div key={section.label}>
              <p className="px-3 text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                {section.label}
              </p>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon
                  const active = isActive(item.path)
                  return (
                    <button
                      key={item.path}
                      id={`sidebar-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={() => navigate(item.path)}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 text-left ${
                        active
                          ? 'bg-[var(--accent-ghost)] text-[var(--primary)] font-semibold border border-[var(--accent-light)] shadow-xs'
                          : 'text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      <Icon
                        size={18}
                        className={active ? 'text-[var(--primary)]' : 'text-[var(--text-muted)]'}
                        strokeWidth={active ? 2.3 : 1.8}
                      />
                      <span className="flex-1">{item.label}</span>
                      {active && <ChevronRight size={14} className="text-[var(--primary)] opacity-70" />}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}

          {/* Quick SOS Card inside Sidebar */}
          <div className="p-3.5 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border)] space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[var(--text-primary)]">Emergency Hotline</span>
              <span className="text-[10px] font-bold text-red-600 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded">
                24/7
              </span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Immediate connection to National Emergency Helpline.
            </p>
            <a
              href="tel:112"
              className="flex items-center justify-center gap-2 w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold transition-colors shadow-xs"
            >
              <Phone size={13} />
              Call 112
            </a>
          </div>
        </nav>

        {/* User Profile & Logout Bottom Bar */}
        <div className="p-3.5 border-t border-[var(--border)] bg-white space-y-1.5">
          <button
            id="sidebar-profile-btn"
            onClick={() => navigate('/dashboard/profile')}
            className={`w-full flex items-center gap-3 p-2.5 rounded-xl transition-all text-left ${
              isActive('/dashboard/profile')
                ? 'bg-[var(--accent-ghost)] text-[var(--primary)] font-semibold border border-[var(--accent-light)]'
                : 'hover:bg-[var(--bg-elevated)] text-[var(--text-primary)]'
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-xs font-bold shrink-0">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-[var(--text-primary)] truncate">
                {user?.fullName || 'Priya Sharma'}
              </p>
              <p className="text-[11px] text-[var(--text-muted)] truncate">
                {user?.email || 'demo@safeher.ai'}
              </p>
            </div>
            <ChevronRight size={14} className="text-[var(--text-muted)]" />
          </button>

          <button
            id="sidebar-logout-btn"
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[var(--danger)] hover:bg-[var(--danger-muted)] rounded-lg transition-colors"
          >
            <LogOut size={15} />
            <span>Sign out</span>
          </button>
        </div>
      </aside>

      {/* ────────────────────────────────────────────────────────
          DESKTOP TOPBAR
      ──────────────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 md:left-64 right-0 h-16 bg-white/90 backdrop-blur-md border-b border-[var(--border)] z-30 px-6 sm:px-8 flex items-center justify-between">
        {/* Breadcrumb / Title */}
        <div className="flex items-center gap-2">
          <Link to="/dashboard" className="text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
            SafeHer
          </Link>
          <ChevronRight size={13} className="text-[var(--text-muted)]" />
          <span className="text-sm font-semibold text-[var(--text-primary)]">{currentLabel}</span>
        </div>

        {/* Topbar Actions */}
        <div className="flex items-center gap-3">
          {!permissionsGranted ? (
            <button
              onClick={requestPermissions}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold hover:bg-amber-100 transition-colors"
            >
              Enable Risk Engine
            </button>
          ) : (
            <div className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${
              riskState.tier === 'Normal' ? 'bg-[var(--accent-ghost)] border-[var(--accent-light)] text-[var(--primary)]' :
              riskState.tier === 'Elevated' ? 'bg-amber-50 border-amber-200 text-amber-700' :
              'bg-red-50 border-red-200 text-red-700'
            }`}>
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  riskState.tier === 'Normal' ? 'bg-[var(--primary)]' :
                  riskState.tier === 'Elevated' ? 'bg-amber-500' : 'bg-red-500'
                }`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${
                  riskState.tier === 'Normal' ? 'bg-[var(--primary)]' :
                  riskState.tier === 'Elevated' ? 'bg-amber-500' : 'bg-red-500'
                }`}></span>
              </span>
              <span>{telemetryData.monitoringStatus}</span>
              <span className="text-[10px] opacity-80">• {riskState.tier}</span>
            </div>
          )}

          {/* Quick SOS Trigger Button */}
          <button
            onClick={() => navigate('/dashboard/sos')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 text-xs font-semibold transition-colors"
          >
            <Phone size={13} />
            <span>SOS</span>
          </button>

          {/* Notification Button */}
          <button
            aria-label="Notifications"
            className="w-9 h-9 rounded-lg border border-[var(--border)] bg-white hover:bg-[var(--bg-elevated)] flex items-center justify-center text-[var(--text-secondary)] transition-colors relative"
          >
            <Bell size={16} />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[var(--primary)]"></span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-lg border border-[var(--border)] bg-white flex items-center justify-center text-[var(--text-secondary)]"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* ────────────────────────────────────────────────────────
          MOBILE SLIDE-DOWN DRAWER
      ──────────────────────────────────────────────────────── */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bottom-0 bg-white z-40 p-5 overflow-y-auto space-y-6">
          {NAV_SECTIONS.map((section) => (
            <div key={section.label}>
              <p className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
                {section.label}
              </p>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon
                  const active = isActive(item.path)
                  return (
                    <button
                      key={item.path}
                      onClick={() => {
                        navigate(item.path)
                        setMobileMenuOpen(false)
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
                        active
                          ? 'bg-[var(--accent-ghost)] text-[var(--primary)] font-semibold border border-[var(--accent-light)]'
                          : 'text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]'
                      }`}
                    >
                      <Icon size={18} />
                      <span className="flex-1 text-left">{item.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}

          <div className="pt-4 border-t border-[var(--border)] space-y-2">
            <button
              onClick={() => {
                navigate('/dashboard/profile')
                setMobileMenuOpen(false)
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]"
            >
              <User size={18} />
              <span>Profile Settings</span>
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-[var(--danger)] hover:bg-[var(--danger-muted)] font-medium"
            >
              <LogOut size={18} />
              <span>Log out</span>
            </button>
          </div>
        </div>
      )}

      {!permissionsGranted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px] p-4">
          <div className="w-full max-w-lg rounded-2xl border border-[var(--border)] bg-white p-6 shadow-2xl">
            <div className="mb-5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">Consent required</span>
              <h2 className="mt-2 text-2xl font-serif text-[var(--text-primary)]">Enable the Risk Engine</h2>
              <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                SafeHer uses motion, location, and microphone data only while this tab is active to detect risk patterns and keep silent check-ins accurate.
              </p>
            </div>

            <div className="space-y-3">
              {[
                ['Motion + device tilt', 'Detect sudden jerk, fall patterns, and stillness after motion.'],
                ['Location tracking', 'Monitor route deviation, erratic stop patterns, and live positioning.'],
                ['Microphone analysis', 'Detect short volume spikes followed by silence without storing continuous audio.'],
                ['Connectivity awareness', 'Flag signal loss as a risk multiplier and improve emergency confidence.'],
              ].map(([title, body]) => (
                <div key={title} className="rounded-xl border border-[var(--border)] bg-[var(--bg-base)] p-3.5">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 h-2.5 w-2.5 rounded-full bg-[var(--primary)]" />
                    <div>
                      <p className="text-sm font-semibold text-[var(--text-primary)]">{title}</p>
                      <p className="text-xs text-[var(--text-secondary)] mt-0.5">{body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={requestPermissions}
                className="flex-1 rounded-xl bg-[var(--primary)] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-95"
              >
                Allow monitoring
              </button>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm font-semibold text-[var(--text-primary)]"
              >
                Continue without sensors
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────
          MAIN ROUTE CONTENT WRAPPER
      ──────────────────────────────────────────────────────── */}
      <main className="md:ml-64 pt-16 min-h-screen bg-[var(--bg-base)]">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<DashboardHome user={user} />} />
            <Route path="/risk-map" element={<RiskMap />} />
            <Route path="/sos" element={<VoiceSOS user={user} />} />
            <Route path="/safe-route" element={<SafeRoute user={user} />} />
            <Route path="/gov" element={<GovServices />} />
            <Route path="/legal" element={<LegalAssistant />} />
            <Route path="/guardian" element={<GuardianAI />} />
            <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
          </Routes>
        </div>
      </main>

      {/* ────────────────────────────────────────────────────────
          MOBILE BOTTOM BAR
      ──────────────────────────────────────────────────────── */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-[var(--border)] grid grid-cols-5 items-center px-1 z-30 shadow-lg"
        aria-label="Mobile Navigation Bar"
      >
        {[
          { icon: Home, label: 'Home', path: '/dashboard' },
          { icon: Map, label: 'Map', path: '/dashboard/risk-map' },
          { icon: Phone, label: 'SOS', path: '/dashboard/sos' },
          { icon: Navigation, label: 'Route', path: '/dashboard/safe-route' },
          { icon: User, label: 'Profile', path: '/dashboard/profile' },
        ].map((item) => {
          const Icon = item.icon
          const active = isActive(item.path)
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center py-1 transition-colors ${
                active ? 'text-[var(--primary)] font-semibold' : 'text-[var(--text-muted)]'
              }`}
            >
              <Icon size={18} strokeWidth={active ? 2.5 : 1.8} />
              <span className="text-[10px] mt-0.5">{item.label}</span>
            </button>
          )
        })}
      </nav>

      <RiskModals
        user={user}
        riskState={riskState}
        telemetryData={telemetryData}
        onDismiss={resetRiskState}
        onEscalateToCritical={escalateToCritical}
      />
    </div>
  )
}
