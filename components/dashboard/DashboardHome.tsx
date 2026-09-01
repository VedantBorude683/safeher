'use client'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Brain, Mic2, Map, Building2, AlertCircle, CheckCircle2, Shield,
  ArrowUpRight, ArrowDownRight, Radio, Bell, ArrowRight, Activity, Users,
} from 'lucide-react'

export default function DashboardHome({ user }: { user: any }) {
  const navigate = useNavigate()
  const [guardianActive, setGuardianActive] = useState(true)
  const [riskLevel] = useState(35)

  const quickActions = [
    {
      icon: Mic2,
      label: 'Voice SOS',
      desc: 'Hands-free voice emergency trigger',
      path: '/dashboard/sos',
      badge: 'Urgent',
      badgeColor: 'bg-red-50 text-red-700 border-red-200',
      iconBg: 'bg-red-50 text-red-600',
    },
    {
      icon: Map,
      label: 'Safe Route Finder',
      desc: 'Well-lit, high-crowd corridors',
      path: '/dashboard/safe-route',
      badge: 'Popular',
      badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
      iconBg: 'bg-teal-50 text-teal-700',
    },
    {
      icon: Brain,
      label: 'Area Risk Map',
      desc: 'Real-time street safety scoring',
      path: '/dashboard/risk-map',
      badge: 'Live',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      iconBg: 'bg-blue-50 text-blue-700',
    },
    {
      icon: Users,
      label: 'Crowd Safety Heatmap',
      desc: 'Active foot-traffic monitoring',
      path: '/dashboard/crowd',
      badge: 'Live',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      iconBg: 'bg-emerald-50 text-emerald-700',
    },
  ]

  const alerts = [
    { time: '10:30 PM', message: 'High risk zone detected near MG Road', type: 'caution' },
    { time: '8:15 PM', message: "Stationary for 8 min in a caution zone", type: 'warning' },
    { time: '7:45 PM', message: 'SOS readiness check passed with contacts', type: 'success' },
  ]

  const stats = [
    { label: 'Active Guardians', value: '24', change: '+8%', positive: true },
    { label: 'Verified Safe Routes', value: '12', change: '+14%', positive: true },
    { label: 'Incident Alerts Today', value: '3', change: '-5%', positive: false },
  ]

  const getRiskBadge = (level: number) => {
    if (level < 30) {
      return { text: 'LOW RISK', color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200', bar: 'bg-emerald-600' }
    }
    if (level < 60) {
      return { text: 'MODERATE RISK', color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200', bar: 'bg-amber-500' }
    }
    return { text: 'HIGH RISK', color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200', bar: 'bg-red-600' }
  }

  const badge = getRiskBadge(riskLevel)
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Morning' : hour < 18 ? 'Afternoon' : 'Evening'
  const firstName = user?.fullName?.split(' ')[0] || 'Priya'

  return (
    <div className="space-y-8 pb-16">
      {/* ────────────────────────────────────────────────────────
          TOP HERO OVERVIEW CARD
      ──────────────────────────────────────────────────────── */}
      <section className="bg-white border border-[var(--border)] rounded-2xl p-6 sm:p-8 shadow-card">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent-ghost)] border border-[var(--accent-light)] text-[var(--primary)] text-xs font-semibold uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse"></span>
              Live Safety Status
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif text-[var(--text-primary)] tracking-tight">
              Good {greeting}, {firstName}
            </h1>
            <p className="mt-2 text-sm text-[var(--text-secondary)] max-w-xl leading-relaxed">
              Your AI safety guardian is active. Live risk monitoring, crowd mapping, and 1-tap SOS assistance are ready.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] text-left sm:text-right">
              <span className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider block">Coverage</span>
              <span className="text-xl font-bold text-[var(--text-primary)]">24/7 Monitored</span>
              <span className="text-xs text-[var(--primary)] font-medium block mt-0.5">Contacts synced</span>
            </div>
            <button
              onClick={() => navigate('/dashboard/sos')}
              className="px-5 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-semibold transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <Mic2 size={16} />
              <span>Voice SOS Ready</span>
            </button>
          </div>
        </div>

        {/* Quick KPI Stat Strip */}
        <div className="mt-8 pt-6 border-t border-[var(--border)] grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="p-4 rounded-xl bg-[var(--bg-base)] border border-[var(--border)]">
              <span className="text-xs font-medium text-[var(--text-muted)] block">{stat.label}</span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[var(--text-primary)] font-sans">{stat.value}</span>
                <span
                  className={`inline-flex items-center text-xs font-semibold ${
                    stat.positive ? 'text-emerald-700' : 'text-amber-700'
                  }`}
                >
                  {stat.positive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          MAIN GRID: CURRENT RISK + GUARDIAN + RECENT ALERTS
      ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Risk Intelligence Widget */}
        <div className="bg-white border border-[var(--border)] rounded-2xl p-6 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Current Risk Level</span>
                <h3 className="text-xl font-bold text-[var(--text-primary)] mt-1">Area Scoring</h3>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${badge.bg} ${badge.color} ${badge.border}`}>
                {badge.text}
              </span>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-[var(--bg-base)] border border-[var(--border)]">
              <div className="flex justify-between items-center text-xs font-medium text-[var(--text-secondary)] mb-2">
                <span>Risk Index</span>
                <span className="text-base font-bold text-[var(--text-primary)]">{riskLevel} / 100</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[var(--border)] overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-500 ${badge.bar}`} style={{ width: `${riskLevel}%` }} />
              </div>
              <p className="text-[11px] text-[var(--text-muted)] mt-2">Calculated from lighting, crowd density & past police reports.</p>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-[var(--accent-ghost)] border border-[var(--accent-light)]">
              <span className="text-xs font-bold text-[var(--primary)] block mb-1">Recommended Action</span>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Stay along the main corridor. Safe Route navigation is recommended if moving after 9:00 PM.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate('/dashboard/risk-map')}
            className="mt-6 w-full py-2.5 bg-white hover:bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl text-xs font-semibold text-[var(--text-primary)] transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Explore Area Risk Map</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Risk Engine Widget */}
        <div className="bg-white border border-[var(--border)] rounded-2xl p-6 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Automated Shield</span>
                <h3 className="text-xl font-bold text-[var(--text-primary)] mt-1">Risk Engine</h3>
              </div>
              <button
                onClick={() => setGuardianActive(!guardianActive)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                  guardianActive
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-gray-100 text-gray-600 border border-gray-200'
                }`}
              >
                {guardianActive ? '✓ Armed' : 'Standby'}
              </button>
            </div>

            <div className="mt-6 space-y-2.5">
              {[
                { title: 'Motion & Shake Trigger', desc: 'Auto-activates SOS on 3 rapid shakes', active: true },
                { title: 'Safe Corridor Tracker', desc: 'Alerts contacts if you deviate off course', active: true },
                { title: 'Silent Check-in Timer', desc: 'Prompts confirmation every 30 mins late', active: true },
              ].map((feature) => (
                <div key={feature.title} className="p-3 rounded-xl bg-[var(--bg-base)] border border-[var(--border)] flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-[var(--primary)] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold text-[var(--text-primary)] block">{feature.title}</span>
                    <span className="text-[11px] text-[var(--text-muted)]">{feature.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => navigate('/dashboard/guardian')}
            className="mt-6 w-full py-2.5 bg-white hover:bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl text-xs font-semibold text-[var(--text-primary)] transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Configure Risk Engine Settings</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Live Incident Alerts Feed */}
        <div className="bg-white border border-[var(--border)] rounded-2xl p-6 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Real-time Feed</span>
                <h3 className="text-xl font-bold text-[var(--text-primary)] mt-1">Live Alerts</h3>
              </div>
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[11px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
                Active
              </span>
            </div>

            <div className="mt-6 space-y-3">
              {alerts.map((alert, index) => (
                <div key={index} className="p-3.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border)]">
                  <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] mb-1">
                    <span className="font-mono">{alert.time}</span>
                    <span className="font-medium text-[var(--primary)]">City Feed</span>
                  </div>
                  <p className="text-xs font-medium text-[var(--text-primary)] leading-relaxed">{alert.message}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] flex items-center justify-between">
            <span className="text-xs text-[var(--text-secondary)] font-medium">Auto-dispatch enabled</span>
            <span className="text-xs font-bold text-[var(--primary)]">Police 112 Ready</span>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────
          QUICK ACTIONS GRID
      ──────────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[var(--text-primary)]">Quick Safety Actions</h2>
            <p className="text-xs text-[var(--text-secondary)]">Direct access to core protection modules</p>
          </div>
          <span className="text-xs font-semibold text-[var(--text-muted)]">4 Services Online</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <button
                key={action.label}
                id={`quick-action-${action.label.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => navigate(action.path)}
                className="group p-5 bg-white hover:bg-[var(--bg-elevated)] border border-[var(--border)] hover:border-[var(--primary)] rounded-2xl text-left transition-all duration-150 shadow-card hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl ${action.iconBg} flex items-center justify-center transition-transform group-hover:scale-105`}>
                    <Icon size={20} strokeWidth={2.2} />
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${action.badgeColor}`}>
                    {action.badge}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--primary)] transition-colors">
                  {action.label}
                </h3>
                <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">
                  {action.desc}
                </p>
                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[var(--primary)] opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Open module</span>
                  <ArrowRight size={13} />
                </div>
              </button>
            )
          })}
        </div>
      </section>
    </div>
  )
}
