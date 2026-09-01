'use client'

import { useState } from 'react'
import { Navigation, MapPin, Clock3, ShieldCheck, AlertTriangle, LocateFixed, ArrowRight } from 'lucide-react'
import { showToast } from '@/components/Toast'

const defaultForm = {
  origin: '',
  destination: '',
  timeOfDay: '21:00',
  activeIncident: '',
}

export default function SafeRoute({ user }: { user: any }) {
  const [form, setForm] = useState(defaultForm)
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleFindRoute = async () => {
    if (!form.origin || !form.destination) {
      showToast('Please select both starting point and destination', 'error')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('http://localhost:8080/api/routes/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          origin: form.origin,
          destination: form.destination,
          timeOfDay: form.timeOfDay,
          activeIncident: form.activeIncident || undefined,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.message || 'Unable to evaluate route risk')
      }

      setResult(data)
    } catch (err: any) {
      console.error(err)
      setError(err.message || 'Unable to compare routes right now.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 pb-16">
      <div className="bg-white border border-[var(--border)] rounded-2xl p-6 sm:p-8 shadow-card flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
            Route Risk Engine
          </span>
          <h1 className="text-3xl font-serif text-[var(--text-primary)] mt-1">
            Safe Route Finder
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1.5 max-w-xl">
            Dynamic route comparison using time of day, lighting, crowd density, and live incident context.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[var(--accent-ghost)] border border-[var(--accent-light)] text-left sm:text-right">
          <span className="text-[11px] font-semibold text-[var(--primary)] uppercase tracking-wider block">
            Live Geo Feed
          </span>
          <span className="text-base font-bold text-[var(--primary)] mt-0.5 block">
            ✓ Live route monitor
          </span>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="bg-white border border-[var(--border)] rounded-2xl p-6 shadow-card space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[var(--text-primary)]">Configure journey path</h2>
            <span className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">Optimized routing</span>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm font-medium text-[var(--text-primary)]">
              Origin
              <input
                type="text"
                name="origin"
                value={form.origin}
                onChange={handleChange}
                placeholder="e.g. Koregaon Park"
                className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--bg-base)] px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:outline-none"
              />
            </label>

            <label className="block text-sm font-medium text-[var(--text-primary)]">
              Destination
              <input
                type="text"
                name="destination"
                value={form.destination}
                onChange={handleChange}
                placeholder="e.g. FC Road"
                className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--bg-base)] px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:outline-none"
              />
            </label>

            <label className="block text-sm font-medium text-[var(--text-primary)]">
              Time of Day
              <input
                type="time"
                name="timeOfDay"
                value={form.timeOfDay}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--bg-base)] px-3 py-2.5 text-sm text-[var(--text-primary)] focus:border-[var(--primary)] focus:outline-none"
              />
            </label>

            <label className="block text-sm font-medium text-[var(--text-primary)]">
              Active Incident
              <input
                type="text"
                name="activeIncident"
                value={form.activeIncident}
                onChange={handleChange}
                placeholder="Optional"
                className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--bg-base)] px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:outline-none"
              />
            </label>
          </div>

          <button
            onClick={handleFindRoute}
            disabled={loading || !form.origin || !form.destination}
            className="w-full py-3.5 rounded-xl bg-[var(--primary)] text-white text-sm font-semibold transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Calculating route risk...' : 'Compare routes'}
          </button>
        </div>

        <div className="bg-white border border-[var(--border)] rounded-2xl p-6 shadow-card">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-[var(--text-primary)]">Live geo map</h2>
            <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2 py-1 text-[10px] font-bold text-emerald-700">
              online
            </span>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-base)] p-4 h-[260px]">
            <div className="absolute inset-0 opacity-40" style={{
              backgroundImage: 'linear-gradient(rgba(148,163,184,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.18) 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }} />

            <div className="absolute left-[18%] top-[28%] h-3.5 w-3.5 rounded-full bg-[var(--primary)] shadow-[0_0_0_8px_rgba(0,120,120,0.12)]" />
            <div className="absolute right-[22%] bottom-[26%] h-3.5 w-3.5 rounded-full bg-emerald-500 shadow-[0_0_0_8px_rgba(16,185,129,0.12)]" />
            <div className="absolute left-[22%] top-[30%] right-[28%] bottom-[28%] rounded-[30%] border-2 border-dashed border-[var(--primary)] opacity-60" />
            <svg viewBox="0 0 400 260" className="absolute inset-0 h-full w-full">
              <path d="M 60 70 C 120 55, 150 80, 180 105 S 260 90, 290 130 S 330 175, 350 180" fill="none" stroke="#0f172a" strokeWidth="3" strokeDasharray="8 8" opacity="0.7" />
              <path d="M 60 70 C 120 120, 140 150, 170 170 S 240 200, 290 130 S 340 95, 350 180" fill="none" stroke="#10b981" strokeWidth="4" opacity="0.9" />
            </svg>

            <div className="absolute left-4 top-4 rounded-xl bg-white/90 px-2.5 py-1.5 text-[10px] font-semibold text-[var(--text-primary)] border border-[var(--border)]">
              Current location
            </div>
            <div className="absolute right-4 bottom-4 rounded-xl bg-white/90 px-2.5 py-1.5 text-[10px] font-semibold text-[var(--text-primary)] border border-[var(--border)]">
              Destination
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-[var(--bg-base)] border border-[var(--border)] p-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">Live tracker</p>
              <p className="mt-2 text-sm font-semibold text-[var(--text-primary)]">On-route monitoring</p>
            </div>
            <div className="rounded-xl bg-[var(--bg-base)] border border-[var(--border)] p-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">Optimized path</p>
              <p className="mt-2 text-sm font-semibold text-[var(--text-primary)]">Main corridors selected</p>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {result && (
        <>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="bg-white border border-[var(--border)] rounded-2xl p-6 shadow-card space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">Shortest route</span>
                  <h3 className="mt-1 text-xl font-bold text-[var(--text-primary)]">{result.shortest_route.name}</h3>
                </div>
                <span className="rounded-full bg-slate-800 px-2.5 py-1 text-[11px] font-bold text-white">
                  {result.shortest_route.risk_score} risk
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-[var(--bg-base)] border border-[var(--border)] p-3">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">ETA</span>
                  <p className="mt-2 text-2xl font-bold text-[var(--text-primary)]">{result.shortest_route.eta_minutes} min</p>
                </div>
                <div className="rounded-xl bg-[var(--bg-base)] border border-[var(--border)] p-3">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">Risk</span>
                  <p className="mt-2 text-2xl font-bold text-[var(--text-primary)]">{result.shortest_route.risk_score}</p>
                </div>
              </div>

              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                {result.shortest_route.key_characteristics.map((item: string) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-slate-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-6 shadow-card space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700">Safest route</span>
                  <h3 className="mt-1 text-xl font-bold text-emerald-900">{result.safest_route.name}</h3>
                </div>
                <span className="rounded-full bg-emerald-600 px-2.5 py-1 text-[11px] font-bold text-white">
                  {result.tradeoff_summary.risk_reduction_percentage}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white border border-emerald-200 p-3">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-700">ETA</span>
                  <p className="mt-2 text-2xl font-bold text-emerald-900">{result.safest_route.eta_minutes} min</p>
                </div>
                <div className="rounded-xl bg-white border border-emerald-200 p-3">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-700">Risk</span>
                  <p className="mt-2 text-2xl font-bold text-emerald-900">{result.safest_route.risk_score}</p>
                </div>
              </div>

              <div className="rounded-xl border border-emerald-200 bg-white/70 p-3">
                <div className="flex items-center justify-between text-sm text-emerald-900">
                  <span className="flex items-center gap-2"><Clock3 size={14} /> Time delta</span>
                  <strong>{result.tradeoff_summary.time_delta}</strong>
                </div>
              </div>

              <ul className="space-y-2 text-sm text-emerald-900">
                {result.safest_route.key_characteristics.map((item: string) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white border border-[var(--border)] rounded-2xl p-6 shadow-card">
            <div className="flex items-center gap-2 text-sm font-semibold text-[var(--text-primary)]">
              <ShieldCheck size={16} className="text-[var(--primary)]" />
              Why this path is safer
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{result.justification}</p>
          </div>
        </>
      )}
    </div>
  )
}
