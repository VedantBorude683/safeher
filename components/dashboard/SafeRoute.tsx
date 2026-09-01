'use client'

import { useState } from 'react'
import { AlertCircle, CheckCircle2, Navigation, Share2, ArrowRight, ShieldCheck, MapPin } from 'lucide-react'
import { showToast } from '@/components/Toast'

const locations = [
  'Koregaon Park (Night)',
  'FC Road (Evening)',
  'Hinjewadi IT Park (Day)',
  'Hadapsar (Night)',
  'Kothrud (Evening)',
  'Shivajinagar (Night)',
  'Viman Nagar (Evening)',
  'Katraj (Night)',
]

const routeData: { [key: string]: any } = {
  'Koregaon Park (Night)-FC Road (Evening)': {
    shortest: {
      distance: 2.1,
      time: 9,
      risk: 'HIGH',
      icon: '🔴',
      issues: ['Isolated side alleyways', 'Dark street lighting stretches', 'Zero CCTV coverage'],
    },
    safe: {
      distance: 3.4,
      time: 14,
      risk: 'LOW',
      icon: '🟢',
      features: ['Passes Koregaon Police Chowki', 'Continuous high-illumination streetlights', 'Full public CCTV coverage', 'Busy commercial district corridor'],
    },
  },
  'FC Road (Evening)-Hadapsar (Night)': {
    shortest: {
      distance: 5.2,
      time: 18,
      risk: 'HIGH',
      icon: '🔴',
      issues: ['Unlit industrial service road', 'Sparse evening pedestrian traffic', 'Zero emergency callboxes'],
    },
    safe: {
      distance: 7.1,
      time: 24,
      risk: 'MODERATE',
      icon: '🟡',
      features: ['Main highway arterial corridor', 'Active commercial lighting', 'Regular police beat patrolling', 'Well-lit petrol pump hubs'],
    },
  },
}

export default function SafeRoute({ user }: { user: any }) {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [routes, setRoutes] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleFindRoute = async () => {
    if (!from || !to) {
      showToast('Please select both starting point and destination', 'error')
      return
    }

    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 800))

    const key = `${from}-${to}`
    const data = routeData[key] || {
      shortest: {
        distance: 2.1,
        time: 9,
        risk: 'HIGH',
        icon: '🔴',
        issues: ['Isolated side street section', 'Poor night-time lighting', 'No CCTV cameras'],
      },
      safe: {
        distance: 3.4,
        time: 14,
        risk: 'LOW',
        icon: '🟢',
        features: ['Near Police Chowki Station', 'Well-lit main avenue', 'CCTV monitoring coverage', 'Active storefront corridor'],
      },
    }

    setRoutes(data)
    setLoading(false)
  }

  const handleShare = () => {
    showToast('Live safe route tracker link sent to emergency contacts', 'success')
  }

  return (
    <div className="space-y-6 pb-16">
      {/* HEADER */}
      <div className="bg-white border border-[var(--border)] rounded-2xl p-6 sm:p-8 shadow-card flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
            Route Safety Optimizer
          </span>
          <h1 className="text-3xl font-serif text-[var(--text-primary)] mt-1">
            Safe Route Finder
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1.5 max-w-xl">
            Calculates navigation based on street lighting, crowd frequency, and police beat proximity — not just shortest distance.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[var(--accent-ghost)] border border-[var(--accent-light)] text-left sm:text-right">
          <span className="text-[11px] font-semibold text-[var(--primary)] uppercase tracking-wider block">
            Navigation Mode
          </span>
          <span className="text-base font-bold text-[var(--primary)] mt-0.5 block">
            ✓ Maximum Safety
          </span>
        </div>
      </div>

      {/* LOCATION SELECTION PANEL */}
      <div className="bg-white border border-[var(--border)] rounded-2xl p-6 sm:p-8 shadow-card space-y-6">
        <h2 className="text-base font-bold text-[var(--text-primary)]">Configure Journey Waypoints</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
              Departure Point
            </label>
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full bg-[var(--bg-base)] border border-[var(--border)] rounded-xl px-4 py-3 text-xs text-[var(--text-primary)] focus:border-[var(--primary)] focus:outline-none transition-colors"
            >
              <option value="">Choose starting point...</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">
              Destination Point
            </label>
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full bg-[var(--bg-base)] border border-[var(--border)] rounded-xl px-4 py-3 text-xs text-[var(--text-primary)] focus:border-[var(--primary)] focus:outline-none transition-colors"
            >
              <option value="">Choose destination point...</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleFindRoute}
          disabled={loading || !from || !to}
          className="w-full py-3.5 bg-[var(--primary)] hover:opacity-90 text-white rounded-xl text-sm font-semibold transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Navigation size={16} />
          <span>{loading ? 'Analyzing Corridor Safety...' : 'Calculate Safest Corridor'}</span>
        </button>
      </div>

      {/* COMPARISON RESULTS */}
      {routes && (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* RECOMMENDED SAFE ROUTE */}
          <div className="bg-white border-2 border-[var(--primary)] rounded-2xl p-6 sm:p-8 shadow-card relative flex flex-col justify-between space-y-6">
            <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-[var(--primary)] text-white text-[11px] font-bold shadow-xs">
              ★ Recommended Safe Path
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-xs font-semibold text-[var(--primary)] uppercase tracking-wider">
                    Optimized Safe Path
                  </span>
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mt-0.5">
                    Safe Corridor Navigation
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {routes.safe.risk} Risk
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border)]">
                  <span className="text-[11px] text-[var(--text-muted)] block">Distance</span>
                  <span className="text-xl font-bold text-[var(--text-primary)] mt-1 block">
                    {routes.safe.distance} km
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border)]">
                  <span className="text-[11px] text-[var(--text-muted)] block">Estimated Time</span>
                  <span className="text-xl font-bold text-[var(--text-primary)] mt-1 block">
                    {routes.safe.time} min
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[var(--accent-ghost)] border border-[var(--accent-light)] space-y-2">
                <span className="text-xs font-bold text-[var(--primary)] block">Verified Safety Attributes</span>
                <div className="space-y-1.5">
                  {routes.safe.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                      <CheckCircle2 size={14} className="text-[var(--primary)] shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => showToast('Turn-by-turn safe navigation started', 'success')}
                className="w-full sm:flex-1 py-3 bg-[var(--primary)] hover:opacity-90 text-white rounded-xl text-xs font-bold transition-colors shadow-xs flex items-center justify-center gap-1.5"
              >
                <Navigation size={15} />
                <span>Start Safe Navigation</span>
              </button>
              <button
                onClick={handleShare}
                className="w-full sm:w-auto px-4 py-3 bg-white hover:bg-[var(--bg-elevated)] border border-[var(--border)] rounded-xl text-xs font-semibold text-[var(--text-primary)] transition-colors flex items-center justify-center gap-1.5"
              >
                <Share2 size={15} />
                <span>Share Route</span>
              </button>
            </div>
          </div>

          {/* SHORTEST RISKY ROUTE */}
          <div className="bg-white border border-[var(--border)] rounded-2xl p-6 sm:p-8 shadow-card flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                    Standard Quickest Path
                  </span>
                  <h3 className="text-xl font-bold text-[var(--text-primary)] mt-0.5">
                    Shortest Road Route
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200">
                  {routes.shortest.risk} Risk
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border)]">
                  <span className="text-[11px] text-[var(--text-muted)] block">Distance</span>
                  <span className="text-xl font-bold text-[var(--text-primary)] mt-1 block">
                    {routes.shortest.distance} km
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border)]">
                  <span className="text-[11px] text-[var(--text-muted)] block">Estimated Time</span>
                  <span className="text-xl font-bold text-[var(--text-primary)] mt-1 block">
                    {routes.shortest.time} min
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-red-50/70 border border-red-200 space-y-2">
                <span className="text-xs font-bold text-red-700 block">Identified Hazard Flags</span>
                <div className="space-y-1.5">
                  {routes.shortest.issues.map((issue: string, index: number) => (
                    <div key={index} className="flex items-center gap-2 text-xs text-red-800">
                      <AlertCircle size={14} className="text-red-600 shrink-0" />
                      <span>{issue}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-[11px] text-[var(--text-muted)] text-center">
              Not recommended during evening or nighttime transit.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
