'use client'

import { useState } from 'react'
import { Search, Cloud, AlertTriangle } from 'lucide-react'

const locations = [
  { name: 'Koregaon Park (Night)', time: 'Night', risk: 78, type: 'HIGH' },
  { name: 'FC Road (Evening)', time: 'Evening', risk: 35, type: 'MEDIUM' },
  { name: 'Hinjewadi IT Park (Day)', time: 'Day', risk: 15, type: 'LOW' },
  { name: 'Hadapsar (Night)', time: 'Night', risk: 82, type: 'HIGH' },
  { name: 'Kothrud (Evening)', time: 'Evening', risk: 28, type: 'LOW' },
  { name: 'Shivajinagar (Night)', time: 'Night', risk: 55, type: 'MEDIUM' },
  { name: 'Viman Nagar (Evening)', time: 'Evening', risk: 20, type: 'LOW' },
  { name: 'Katraj (Night)', time: 'Night', risk: 88, type: 'HIGH' },
]

const trendLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const riskFactors = [
  { icon: '🌑', label: 'Poor lighting' },
  { icon: '👮', label: 'Low police presence' },
  { icon: '🕐', label: 'Late night hours' },
  { icon: '📍', label: 'Isolated area' },
  { icon: '⚠️', label: 'Past incidents' },
]

const getRiskTheme = (risk: number) => {
  if (risk < 30) return { label: 'SAFE', color: 'text-[#10B981]', ring: 'border-[#10B981]/30' }
  if (risk < 60) return { label: 'MEDIUM', color: 'text-[#F59E0B]', ring: 'border-[#F59E0B]/30' }
  return { label: 'HIGH', color: 'text-[#EF4444]', ring: 'border-[#EF4444]/30' }
}

export default function RiskMap() {
  const [selectedLocation, setSelectedLocation] = useState(locations[0])
  const [query, setQuery] = useState('')

  const filteredLocations = locations.filter((location) =>
    location.name.toLowerCase().includes(query.toLowerCase()),
  )
  const theme = getRiskTheme(selectedLocation.risk)

  return (
    <div className="space-y-6 pb-24 md:pb-0">
      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.75fr]">
        <section className="rounded-[2rem] border border-[#1E1E35] bg-[#11121F] p-8 shadow-[0_35px_60px_-45px_rgba(16,24,40,0.8)]">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[#94A3B8]">Risk Map</p>
              <h1 className="mt-3 text-3xl font-semibold text-white md:text-4xl">Area Safety Intelligence</h1>
            </div>
            <div className="rounded-3xl border border-[#2E2E48] bg-[#0E1020]/80 px-5 py-3 text-sm text-[#94A3B8]">
              Real-time risk scoring for your route planning.
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_0.6fr]">
            <div className="space-y-4">
              <div className="relative rounded-[1.5rem] border border-[#1E1E35] bg-[#0D1020] px-4 py-3">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#94A3B8]" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search locations..."
                  className="w-full bg-transparent pl-12 pr-4 text-sm text-[#F1F5F9] placeholder:text-[#64748B] focus:outline-none"
                />
              </div>
              <div className="grid gap-3">
                {filteredLocations.map((location, index) => {
                  const locationTheme = getRiskTheme(location.risk)
                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedLocation(location)}
                      className={`w-full rounded-[1.5rem] border px-4 py-4 text-left transition ${
                        location.name === selectedLocation.name
                          ? 'border-[#7C3AED] bg-[#1E1E35] text-white shadow-[0_20px_50px_-40px_rgba(124,58,237,0.8)]'
                          : 'border-[#1E1E35] bg-[#0D1020] hover:border-[#7C3AED] hover:bg-[#161623]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="font-semibold text-white">{location.name}</p>
                          <p className="text-xs text-[#94A3B8]">{location.time} · {location.type}</p>
                        </div>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${locationTheme.color} bg-white/5`}>{location.risk}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
            <div className="rounded-[2rem] border border-[#1E1E35] bg-[#12121F] p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-[#94A3B8]">Selected area</p>
                  <h2 className="mt-3 text-xl font-semibold text-white">{selectedLocation.name}</h2>
                </div>
                <span className={`rounded-2xl border px-3 py-2 text-xs font-semibold ${theme.color} ${theme.ring}`}>{theme.label}</span>
              </div>

              <div className="mt-6 space-y-5">
                <div className="rounded-[1.75rem] bg-[#0D1020] p-5">
                  <p className="text-sm text-[#94A3B8]">Risk score</p>
                  <div className="mt-4 flex items-end justify-between gap-4">
                    <p className="text-5xl font-semibold text-white">{selectedLocation.risk}</p>
                    <div className="h-3 w-full rounded-full bg-[#1E1E35] overflow-hidden">
                      <div className={`h-full rounded-full ${theme.color}`} style={{ width: `${selectedLocation.risk}%` }} />
                    </div>
                  </div>
                </div>
                <div className="rounded-[1.75rem] bg-[#0D1020] p-5">
                  <p className="text-sm text-[#94A3B8]">Best action</p>
                  <p className="mt-3 text-sm leading-6 text-white">
                    {selectedLocation.risk > 70
                      ? 'Avoid this area during late hours. Choose a safer route with low-risk checkpoints.'
                      : 'This area is relatively safe. Continue using live monitoring while traveling.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-[2rem] border border-[#1E1E35] bg-[#11121F] p-6 shadow-[0_35px_60px_-45px_rgba(16,24,40,0.8)]">
            <p className="text-sm uppercase tracking-[0.3em] text-[#94A3B8]">Area Snapshot</p>
            <div className="mt-5 space-y-4">
              <div className="rounded-[1.75rem] bg-[#0D1020] p-5">
                <p className="text-sm text-[#94A3B8]">Live alert status</p>
                <p className="mt-3 text-lg font-semibold text-white">{selectedLocation.risk > 70 ? 'High alert' : 'Monitoring active'}</p>
              </div>
              <div className="rounded-[1.75rem] bg-[#0D1020] p-5">
                <p className="text-sm text-[#94A3B8]">Last update</p>
                <p className="mt-3 text-lg font-semibold text-white">2 minutes ago</p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#1E1E35] bg-[#12121F] p-6 h-full">
            <div className="flex items-center gap-3 text-[#94A3B8]">
              <Cloud className="w-6 h-6" />
              <p className="text-sm uppercase tracking-[0.3em]">Safety Map</p>
            </div>
            <div className="mt-6 h-72 rounded-[1.75rem] border border-[#1E1E35] bg-[#0D1020] flex items-center justify-center text-center text-[#94A3B8]">
              <div>
                <AlertTriangle className="mx-auto mb-3 h-10 w-10 text-[#7C3AED]" />
                <p>Interactive map loading here</p>
                <p className="text-sm text-[#6B7280]">Premium map visualization coming soon.</p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_0.9fr]">
        <div className="rounded-[2rem] border border-[#1E1E35] bg-[#11121F] p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-[#94A3B8]">Risk factors</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {riskFactors.map((factor, index) => (
              <div key={index} className="rounded-[1.5rem] bg-[#0D1020] p-4 text-sm text-[#F1F5F9]">
                <span className="text-xl mr-2">{factor.icon}</span>
                {factor.label}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#1E1E35] bg-[#11121F] p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-[#94A3B8]">Trend forecast</p>
          <div className="mt-5 flex items-end gap-3 h-36">
            {[25, 40, 52, 60, 72, 81, selectedLocation.risk].map((value, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className={`w-full rounded-t ${value > 70 ? 'bg-[#EF4444]' : value > 40 ? 'bg-[#F59E0B]' : 'bg-[#10B981]'}`} style={{ height: `${value / 1.5}%` }} />
                <span className="mt-3 text-[10px] text-[#94A3B8]">{trendLabels[index]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
