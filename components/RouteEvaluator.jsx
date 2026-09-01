'use client'

import { useState } from 'react'

const defaultForm = {
  origin: '',
  destination: '',
  timeOfDay: '21:00',
  activeIncident: '',
}

export default function RouteEvaluator() {
  const [form, setForm] = useState(defaultForm)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('http://localhost:8080/api/routes/evaluate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          origin: form.origin,
          destination: form.destination,
          timeOfDay: form.timeOfDay,
          activeIncident: form.activeIncident || undefined,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.message || 'Route evaluation failed')
      }

      setResult(data)
    } catch (err) {
      setError(err.message || 'Unable to compare routes right now.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
            Dynamic Route Risk Simulator
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Compare the fastest route against the safest corridor
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-700 bg-slate-900/80 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur-sm"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm font-medium text-slate-200">
              Origin
              <input
                type="text"
                name="origin"
                value={form.origin}
                onChange={handleChange}
                placeholder="e.g. Koregaon Park"
                className="mt-2 w-full rounded-xl border border-slate-600 bg-slate-950 px-3 py-2.5 text-sm text-white placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none"
                required
              />
            </label>

            <label className="block text-sm font-medium text-slate-200">
              Destination
              <input
                type="text"
                name="destination"
                value={form.destination}
                onChange={handleChange}
                placeholder="e.g. FC Road"
                className="mt-2 w-full rounded-xl border border-slate-600 bg-slate-950 px-3 py-2.5 text-sm text-white placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none"
                required
              />
            </label>

            <label className="block text-sm font-medium text-slate-200">
              Time of Day
              <input
                type="time"
                name="timeOfDay"
                value={form.timeOfDay}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-slate-600 bg-slate-950 px-3 py-2.5 text-sm text-white focus:border-emerald-400 focus:outline-none"
              />
            </label>

            <label className="block text-sm font-medium text-slate-200">
              Active Incident (optional)
              <input
                type="text"
                name="activeIncident"
                value={form.activeIncident}
                onChange={handleChange}
                placeholder="e.g. Reported harassment on 4th Ave"
                className="mt-2 w-full rounded-xl border border-slate-600 bg-slate-950 px-3 py-2.5 text-sm text-white placeholder:text-slate-400 focus:border-emerald-400 focus:outline-none"
              />
            </label>
          </div>

          <div className="mt-6 flex items-center justify-between gap-3">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Comparing Routes...' : 'Compare Routes'}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-6 rounded-2xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
            {error}
          </div>
        )}

        {result && (
          <>
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="rounded-3xl border border-slate-700 bg-slate-200 p-6 text-slate-800 shadow-lg shadow-slate-950/10">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Shortest Route
                    </p>
                    <h2 className="mt-2 text-2xl font-bold">{result.shortest_route.name}</h2>
                  </div>
                  <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs font-bold text-white">
                    {result.shortest_route.risk_score} risk
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-slate-100 p-3">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">ETA</p>
                    <p className="mt-2 text-2xl font-bold">{result.shortest_route.eta_minutes} min</p>
                  </div>
                  <div className="rounded-2xl bg-slate-100 p-3">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">Risk</p>
                    <p className="mt-2 text-2xl font-bold">{result.shortest_route.risk_score}</p>
                  </div>
                </div>

                <ul className="mt-5 space-y-2 text-sm text-slate-700">
                  {result.shortest_route.key_characteristics.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-slate-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-950 shadow-lg shadow-emerald-900/10">
                <div className="mb-5 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                      Safest Route
                    </p>
                    <h2 className="mt-2 text-2xl font-bold">{result.safest_route.name}</h2>
                  </div>
                  <span className="rounded-full bg-emerald-600 px-2.5 py-1 text-xs font-bold text-white">
                    {result.tradeoff_summary.risk_reduction_percentage}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-white p-3">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-emerald-700">ETA</p>
                    <p className="mt-2 text-2xl font-bold">{result.safest_route.eta_minutes} min</p>
                  </div>
                  <div className="rounded-2xl bg-white p-3">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-emerald-700">Risk</p>
                    <p className="mt-2 text-2xl font-bold">{result.safest_route.risk_score}</p>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-emerald-200 bg-white/70 p-3">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-emerald-700">Route tradeoff</p>
                  <div className="mt-2 flex items-center justify-between gap-4 text-sm text-emerald-900">
                    <span>Time delta</span>
                    <strong>{result.tradeoff_summary.time_delta}</strong>
                  </div>
                </div>

                <ul className="mt-5 space-y-2 text-sm text-emerald-900">
                  {result.safest_route.key_characteristics.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-emerald-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-900 p-5 text-sm leading-6 text-slate-200">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
                Why this route is safer
              </p>
              <p className="mt-3">{result.justification}</p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
