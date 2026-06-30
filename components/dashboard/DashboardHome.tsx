'use client'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Brain, Mic2, Map, Building2, AlertCircle, CheckCircle2, Shield } from 'lucide-react'

export default function DashboardHome({ user }: { user: any }) {
  const navigate = useNavigate()
  const [guardianActive, setGuardianActive] = useState(true)
  const [riskLevel] = useState(35)

  const quickActions = [
    { icon: Brain, label: 'Risk Map', path: '/dashboard/risk-map', color: 'from-[#7C3AED] to-[#9333EA]' },
    { icon: Mic2, label: 'Voice SOS', path: '/dashboard/sos', color: 'from-[#EC4899] to-[#F43F5E]' },
    { icon: Map, label: 'Safe Route', path: '/dashboard/safe-route', color: 'from-[#10B981] to-[#14B8A6]' },
    { icon: Building2, label: 'Gov Services', path: '/dashboard/gov', color: 'from-[#F59E0B] to-[#F97316]' },
  ]

  const alerts = [
    { time: '10:30 PM', message: 'High risk zone detected near MG Road' },
    { time: '8:15 PM', message: 'You\'ve been stationary 8 min in a caution zone' },
    { time: '7:45 PM', message: 'SOS test sent to Rahul Kumar ✓' },
  ]

  const stats = [
    { label: 'Active Guards', value: '24', change: '+8%', accent: 'text-[#10B981]' },
    { label: 'Safe Routes', value: '12', change: '+14%', accent: 'text-[#7C3AED]' },
    { label: 'Incident Alerts', value: '3', change: '-5%', accent: 'text-[#F59E0B]' },
  ]

  const getRiskBadge = (level: number) => {
    if (level < 30) return { text: 'SAFE', icon: '🟢', color: 'text-[#10B981]' }
    if (level < 60) return { text: 'MEDIUM', icon: '🟡', color: 'text-[#F59E0B]' }
    return { text: 'HIGH', icon: '🔴', color: 'text-[#EF4444]' }
  }

  const badge = getRiskBadge(riskLevel)
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Morning' : hour < 18 ? 'Afternoon' : 'Evening'

  return (
    <div className="space-y-8 pb-24 md:pb-0">
      <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
        <section className="rounded-[2rem] border border-[#1E1E35] bg-[#11121F] p-8 shadow-[0_35px_60px_-45px_rgba(16,24,40,0.8)]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[#94A3B8]">Premium Insights</p>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Good {greeting}, {user?.fullName?.split(' ')[0] || 'Guardian'}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#94A3B8]">
                Your AI safety dashboard gives you instant visibility into alerts, route safety, and help resources — all in one premium control room.
              </p>
            </div>
            <div className="rounded-3xl border border-[#2E2E48] bg-[#0E1020]/80 p-4 text-right">
              <p className="text-xs uppercase tracking-[0.3em] text-[#94A3B8]">Coverage</p>
              <p className="mt-3 text-3xl font-semibold text-white">24/7 Protection</p>
              <p className="mt-2 text-sm text-[#94A3B8]">Instant alerts, smart routes, and legal support ready.</p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-[#1E1E35] bg-[#0F1020] p-5">
                <p className="text-sm text-[#94A3B8] uppercase tracking-[0.2em]">{stat.label}</p>
                <p className="mt-4 text-3xl font-semibold text-white">{stat.value}</p>
                <p className={`mt-2 text-sm ${stat.accent}`}>{stat.change}</p>
              </div>
            ))}
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-[2rem] border border-[#1E1E35] bg-[#11121F] p-6 shadow-[0_35px_60px_-45px_rgba(16,24,40,0.8)]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#94A3B8]">Current Risk</p>
                <h2 className="mt-4 text-2xl font-semibold text-white">{badge.text}</h2>
              </div>
              <div className={`rounded-2xl bg-white/5 px-4 py-2 text-sm font-semibold ${badge.color}`}>{badge.icon}</div>
            </div>
            <div className="mt-6 space-y-4">
              <div className="rounded-3xl bg-[#0D1020] p-5">
                <div className="flex items-center justify-between text-sm text-[#94A3B8]">
                  <span>Risk score</span>
                  <span className="text-white text-xl font-semibold">{riskLevel}</span>
                </div>
                <div className="mt-4 h-2 rounded-full bg-[#151728] overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899]" style={{ width: `${riskLevel}%` }} />
                </div>
              </div>
              <div className="rounded-3xl bg-[#0D1020] p-5">
                <p className="text-sm text-[#94A3B8]">Recommended action</p>
                <p className="mt-3 text-sm text-white">Activate Voice SOS when you're approaching a higher-risk area or traveling alone after dark.</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#1E1E35] bg-[#11121F] p-6 shadow-[0_35px_60px_-45px_rgba(16,24,40,0.8)]">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm uppercase tracking-[0.3em] text-[#94A3B8]">Guardian AI</p>
              <button
                onClick={() => setGuardianActive(!guardianActive)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${guardianActive ? 'bg-[#7C3AED] text-white' : 'bg-[#1E1E35] text-[#94A3B8]'}`}
              >
                {guardianActive ? 'Activated' : 'Disabled'}
              </button>
            </div>
            <div className="mt-5 space-y-3 text-sm text-[#94A3B8]">
              <div className="flex items-center gap-2 rounded-2xl bg-[#0D1020] p-4">
                <CheckCircle2 size={16} className="text-[#10B981]" />
                <span>Motion detection armed</span>
              </div>
              <div className="flex items-center gap-2 rounded-2xl bg-[#0D1020] p-4">
                <CheckCircle2 size={16} className="text-[#10B981]" />
                <span>Safe zone monitoring enabled</span>
              </div>
              <div className="flex items-center gap-2 rounded-2xl bg-[#0D1020] p-4">
                <CheckCircle2 size={16} className="text-[#10B981]" />
                <span>Emergency route suggestions ready</span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
        <section className="rounded-[2rem] border border-[#1E1E35] bg-[#11121F] p-8 shadow-[0_35px_60px_-45px_rgba(16,24,40,0.8)]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[#94A3B8]">Quick actions</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">Stay ready in one tap</h2>
            </div>
            <div className="rounded-full bg-[#0F1020] px-4 py-2 text-sm text-[#94A3B8]">Fast & secure</div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {quickActions.map((action, i) => {
              const Icon = action.icon
              return (
                <button
                  key={i}
                  onClick={() => navigate(action.path)}
                  className={`group rounded-[1.75rem] border border-[#1E1E35] bg-gradient-to-br ${action.color} p-5 text-left text-white shadow-lg shadow-[#000000]/20 transition hover:-translate-y-1`}
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-white/10 text-white shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <p className="mt-5 text-lg font-semibold">{action.label}</p>
                  <p className="mt-2 text-sm opacity-90">Open this module for more details.</p>
                </button>
              )
            })}
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-[2rem] border border-[#1E1E35] bg-[#11121F] p-6 shadow-[0_35px_60px_-45px_rgba(16,24,40,0.8)]">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm uppercase tracking-[0.3em] text-[#94A3B8]">Recent alerts</p>
              <span className="rounded-full bg-[#161623] px-3 py-1 text-xs text-[#94A3B8]">Live</span>
            </div>
            <div className="mt-5 space-y-3">
              {alerts.map((alert, index) => (
                <div key={index} className="rounded-3xl bg-[#0D1020] p-4 border border-[#1E1E35]">
                  <p className="text-sm font-semibold text-white">{alert.message}</p>
                  <p className="mt-2 text-xs text-[#94A3B8]">{alert.time}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#1E1E35] bg-[#11121F] p-6 shadow-[0_35px_60px_-45px_rgba(16,24,40,0.8)]">
            <p className="text-sm uppercase tracking-[0.3em] text-[#94A3B8]">Feature spotlight</p>
            <h3 className="mt-4 text-xl font-semibold text-white">Voice SOS assistant</h3>
            <p className="mt-3 text-sm leading-6 text-[#94A3B8]">
              One-touch emergency alerts with trusted contacts and local response guidance. Keep it enabled for automatic assistance when you need it most.
            </p>
            <button
              onClick={() => navigate('/dashboard/sos')}
              className="mt-6 w-full rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#EC4899] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-95"
            >
              Open Voice SOS
            </button>
          </div>
        </aside>
      </div>
    </div>
  )
}
