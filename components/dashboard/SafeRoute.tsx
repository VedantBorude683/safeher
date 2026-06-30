'use client'

import { useState } from 'react'
import { AlertCircle, CheckCircle2, Navigation, Share2 } from 'lucide-react'
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
      issues: ['Isolated lane', 'Poor lighting', 'No CCTV'],
    },
    safe: {
      distance: 3.4,
      time: 14,
      risk: 'LOW',
      icon: '🟢',
      features: ['Near Koregaon Police Chowki', 'Well-lit main road', 'CCTV coverage', 'Busy commercial area'],
    },
  },
  'FC Road (Evening)-Hadapsar (Night)': {
    shortest: {
      distance: 5.2,
      time: 18,
      risk: 'HIGH',
      icon: '🔴',
      issues: ['Industrial area', 'Sparse traffic', 'Limited police presence'],
    },
    safe: {
      distance: 7.1,
      time: 24,
      risk: 'MEDIUM',
      icon: '🟡',
      features: ['Main highway', 'Well-lit', 'Regular traffic', 'Police patrolling'],
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
      showToast('Please select both locations', 'error')
      return
    }

    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1200))

    const key = `${from}-${to}`
    const data = routeData[key] || {
      shortest: {
        distance: 2.1,
        time: 9,
        risk: 'HIGH',
        icon: '🔴',
        issues: ['Isolated lane', 'Poor lighting', 'No CCTV'],
      },
      safe: {
        distance: 3.4,
        time: 14,
        risk: 'LOW',
        icon: '🟢',
        features: ['Near Police Station', 'Well-lit road', 'CCTV coverage', 'Busy area'],
      },
    }

    setRoutes(data)
    setLoading(false)
  }

  const handleShare = () => {
    showToast('Route shared with Rahul Kumar', 'success')
  }

  return (
    <div className="space-y-6 pb-24 md:pb-0">
      <div className="rounded-[2rem] border border-[#1E1E35] bg-[#11121F] p-8 shadow-[0_35px_60px_-45px_rgba(16,24,40,0.8)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#94A3B8]">Safe Route</p>
            <h1 className="mt-3 text-3xl font-semibold text-white md:text-4xl">Route safety optimizer</h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-[#94A3B8]">
              Pick a route based on real-time safety indicators, not just distance.
            </p>
          </div>
          <div className="rounded-[2rem] bg-[#0E1020] p-5 text-center border border-[#2E2E48]">
            <p className="text-xs uppercase tracking-[0.3em] text-[#94A3B8]">Travel mode</p>
            <p className="mt-3 text-2xl font-semibold text-white">Protected</p>
          </div>
        </div>
      </div>

      <div className="rounded-[2rem] border border-[#1E1E35] bg-[#11121F] p-6 shadow-[0_35px_60px_-45px_rgba(16,24,40,0.8)]">
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
          <div>
            <label className="block text-sm font-semibold mb-2 text-[#94A3B8]">From</label>
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full rounded-3xl border border-[#1E1E35] bg-[#12121F] px-4 py-3 text-[#F1F5F9] focus:border-[#7C3AED] focus:outline-none"
            >
              <option value="">Select starting location</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-[#94A3B8]">To</label>
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full rounded-3xl border border-[#1E1E35] bg-[#12121F] px-4 py-3 text-[#F1F5F9] focus:border-[#7C3AED] focus:outline-none"
            >
              <option value="">Select destination</option>
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
          className="mt-6 w-full rounded-3xl bg-gradient-to-r from-[#7C3AED] to-[#9333EA] px-6 py-4 text-sm font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? 'Finding Safe Route...' : 'Find Safe Route'}
        </button>
      </div>

      {routes && (
        <div className="grid gap-6 xl:grid-cols-[0.95fr_0.95fr]">
          <div className="rounded-[2rem] border border-[#1E1E35] bg-[#11121F] p-6 shadow-[0_35px_60px_-45px_rgba(16,24,40,0.8)]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-[#94A3B8]">Shortest route</p>
                <h2 className="mt-2 text-xl font-semibold text-white">Quickest path</h2>
              </div>
              <span className="rounded-full bg-[#FEF2F2] px-3 py-1 text-sm font-semibold text-[#B91C1C]">Risk: {routes.shortest.risk}</span>
            </div>
            <div className="grid gap-4 md:grid-cols-2 mb-4">
              <div className="rounded-3xl bg-[#0D1020] p-4">
                <p className="text-xs text-[#94A3B8]">Distance</p>
                <p className="mt-2 text-2xl font-semibold text-white">{routes.shortest.distance} km</p>
              </div>
              <div className="rounded-3xl bg-[#0D1020] p-4">
                <p className="text-xs text-[#94A3B8]">Time</p>
                <p className="mt-2 text-2xl font-semibold text-white">{routes.shortest.time} min</p>
              </div>
            </div>
            <div className="rounded-[1.75rem] bg-[#0D1020] p-5 space-y-3">
              <p className="text-sm font-semibold text-white">Concerns</p>
              {routes.shortest.issues.map((issue: string, index: number) => (
                <p key={index} className="text-sm text-[#94A3B8]">• {issue}</p>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#1E1E35] bg-[#11121F] p-6 shadow-[0_35px_60px_-45px_rgba(16,24,40,0.8)] relative">
            <div className="absolute -top-3 right-6 rounded-full bg-[#7C3AED] px-3 py-1 text-xs font-semibold text-white">Recommended</div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-[#94A3B8]">Safe route</p>
                <h2 className="mt-2 text-xl font-semibold text-white">Preferred path</h2>
              </div>
              <span className="rounded-full bg-[#ECFDF5] px-3 py-1 text-sm font-semibold text-[#047857]">Risk: {routes.safe.risk}</span>
            </div>
            <div className="grid gap-4 md:grid-cols-2 mb-4">
              <div className="rounded-3xl bg-[#0D1020] p-4">
                <p className="text-xs text-[#94A3B8]">Distance</p>
                <p className="mt-2 text-2xl font-semibold text-white">{routes.safe.distance} km</p>
              </div>
              <div className="rounded-3xl bg-[#0D1020] p-4">
                <p className="text-xs text-[#94A3B8]">Time</p>
                <p className="mt-2 text-2xl font-semibold text-white">{routes.safe.time} min</p>
              </div>
            </div>
            <div className="rounded-[1.75rem] bg-[#0D1020] p-5">
              <p className="text-sm font-semibold text-white">Safety features</p>
              <div className="mt-3 space-y-2">
                {routes.safe.features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-[#10B981]">
                    <CheckCircle2 size={16} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <button className="mt-6 w-full rounded-3xl bg-gradient-to-r from-[#7C3AED] to-[#9333EA] py-4 text-sm font-semibold text-white transition hover:opacity-95 flex items-center justify-center gap-2">
              <Navigation size={18} />
              Start Safe Navigation
            </button>
          </div>

          <div className="rounded-[2rem] border border-[#1E1E35] bg-[#12121F] p-6 shadow-[0_35px_60px_-45px_rgba(16,24,40,0.8)]">
            <p className="text-sm uppercase tracking-[0.3em] text-[#94A3B8]">Share route</p>
            <p className="mt-4 text-sm leading-6 text-[#94A3B8]">
              Send your selected safe route to a trusted contact for additional protection.
            </p>
            <div className="mt-5 rounded-[1.75rem] bg-[#0D1020] p-4">
              <p className="text-sm text-[#94A3B8]">Shared with</p>
              <p className="mt-2 text-white font-semibold">Rahul Kumar</p>
            </div>
            <button
              onClick={handleShare}
              className="mt-6 w-full rounded-3xl bg-[#0F1020] border border-[#1E1E35] py-3 text-sm font-semibold text-white hover:border-[#7C3AED] transition"
            >
              <Share2 size={18} />
              Send Route
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
