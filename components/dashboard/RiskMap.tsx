'use client'

import { useState } from 'react'
import { Search, MapPin, AlertTriangle, ShieldCheck, TrendingUp, Clock, Info } from 'lucide-react'

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
  { icon: '🌑', label: 'Poor Street Lighting', impact: 'High' },
  { icon: '👮', label: 'Low Police Chowki Proximity', impact: 'Medium' },
  { icon: '🕐', label: 'Late Night Transit Void', impact: 'High' },
  { icon: '📍', label: 'Isolated Pedestrian Walkway', impact: 'High' },
  { icon: '⚠️', label: 'Historical Incident Clusters', impact: 'Moderate' },
]

const getRiskTheme = (risk: number) => {
  if (risk < 30) {
    return {
      label: 'LOW RISK',
      color: 'text-emerald-700',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      bar: 'bg-emerald-600',
    }
  }
  if (risk < 60) {
    return {
      label: 'MODERATE',
      color: 'text-amber-700',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      bar: 'bg-amber-500',
    }
  }
  return {
    label: 'HIGH RISK',
    color: 'text-red-700',
    bg: 'bg-red-50',
    border: 'border-red-200',
    bar: 'bg-red-600',
  }
}

export default function RiskMap() {
  const [selectedLocation, setSelectedLocation] = useState(locations[0])
  const [query, setQuery] = useState('')

  const filteredLocations = locations.filter((location) =>
    location.name.toLowerCase().includes(query.toLowerCase())
  )
  const theme = getRiskTheme(selectedLocation.risk)

  return (
    <div className="space-y-6 pb-16">
      {/* HEADER */}
      <div className="bg-white border border-[var(--border)] rounded-2xl p-6 sm:p-8 shadow-card flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
            Predictive Safety
          </span>
          <h1 className="text-3xl font-serif text-[var(--text-primary)] mt-1">
            Area Safety Intelligence
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1.5 max-w-xl">
            Real-time multi-factor risk scores, crime pattern analysis, and ambient safety scoring.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] text-left sm:text-right">
          <span className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider block">
            City Model
          </span>
          <span className="text-lg font-bold text-[var(--text-primary)] mt-0.5 block">
            Pune Metropole v3.2
          </span>
        </div>
      </div>

      {/* MAIN TWO COLUMN GRID */}
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        {/* LEFT COLUMN: SEARCH + LOCATION SELECTOR */}
        <div className="bg-white border border-[var(--border)] rounded-2xl p-6 shadow-card space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[var(--text-primary)]">Select Monitored Sector</h2>
            <span className="text-xs text-[var(--text-muted)]">{filteredLocations.length} locations found</span>
          </div>

          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by neighborhood, street, or landmark..."
              className="w-full bg-[var(--bg-base)] border border-[var(--border)] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)] transition-colors"
            />
          </div>

          <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
            {filteredLocations.map((location, index) => {
              const itemTheme = getRiskTheme(location.risk)
              const isSelected = location.name === selectedLocation.name
              return (
                <button
                  key={index}
                  onClick={() => setSelectedLocation(location)}
                  className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-[var(--accent-ghost)] border-[var(--primary)] shadow-xs'
                      : 'bg-white hover:bg-[var(--bg-elevated)] border-[var(--border)]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                        isSelected
                          ? 'bg-[var(--primary)] text-white'
                          : 'bg-[var(--bg-elevated)] text-[var(--text-muted)]'
                      }`}
                    >
                      <MapPin size={15} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[var(--text-primary)]">{location.name}</p>
                      <p className="text-xs text-[var(--text-muted)]">
                        {location.time} shift · Verified safe nodes
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`inline-block px-2 py-0.5 rounded-md text-[11px] font-bold border ${itemTheme.bg} ${itemTheme.color} ${itemTheme.border}`}>
                      Score {location.risk}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: SELECTED LOCATION DEEP DIVE */}
        <div className="bg-white border border-[var(--border)] rounded-2xl p-6 shadow-card space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                  Active Analysis
                </span>
                <h2 className="text-xl font-bold text-[var(--text-primary)] mt-1">
                  {selectedLocation.name}
                </h2>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${theme.bg} ${theme.color} ${theme.border}`}>
                {theme.label}
              </span>
            </div>

            {/* RISK GAUGE */}
            <div className="mt-6 p-4 rounded-xl bg-[var(--bg-base)] border border-[var(--border)] space-y-3">
              <div className="flex justify-between items-end">
                <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                  Calculated Risk Index
                </span>
                <span className="text-3xl font-bold font-mono text-[var(--text-primary)]">
                  {selectedLocation.risk} <span className="text-xs text-[var(--text-muted)] font-normal">/ 100</span>
                </span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-[var(--border)] overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${theme.bar}`}
                  style={{ width: `${selectedLocation.risk}%` }}
                />
              </div>
            </div>

            {/* ACTION GUIDANCE */}
            <div className="mt-4 p-4 rounded-xl bg-[var(--accent-ghost)] border border-[var(--accent-light)]">
              <span className="text-xs font-bold text-[var(--primary)] flex items-center gap-1.5 mb-1">
                <Info size={14} />
                Safety Directive
              </span>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {selectedLocation.risk > 70
                  ? 'High caution zone during night hours. Voice SOS standby and Safe Route redirection are recommended.'
                  : 'Area displays optimal lighting and pedestrian frequency. Normal monitoring active.'}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between text-xs text-[var(--text-muted)]">
            <span className="flex items-center gap-1">
              <Clock size={13} />
              Synced 2m ago
            </span>
            <span className="font-semibold text-[var(--primary)]">City AI Model Active</span>
          </div>
        </div>
      </div>

      {/* BOTTOM METRICS: RISK FACTORS & WEEKLY TRENDS */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white border border-[var(--border)] rounded-2xl p-6 shadow-card">
          <h3 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider mb-4">
            Evaluated Risk Factors
          </h3>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {riskFactors.map((factor, index) => (
              <div
                key={index}
                className="p-3 rounded-xl bg-[var(--bg-base)] border border-[var(--border)] flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">{factor.icon}</span>
                  <span className="text-xs font-medium text-[var(--text-primary)]">{factor.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-[var(--border)] rounded-2xl p-6 shadow-card flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider">
              7-Day Risk Trajectory
            </h3>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
              Trend Normal
            </span>
          </div>

          <div className="flex items-end gap-3 h-32 pt-4">
            {[25, 40, 52, 60, 72, 81, selectedLocation.risk].map((value, index) => {
              const barColor = value > 70 ? 'bg-red-500' : value > 40 ? 'bg-amber-500' : 'bg-emerald-500'
              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                  <div
                    className={`w-full rounded-t-md transition-all duration-300 ${barColor}`}
                    style={{ height: `${Math.max(15, (value / 100) * 100)}%` }}
                  />
                  <span className="text-[10px] font-semibold text-[var(--text-muted)] font-mono">
                    {trendLabels[index]}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
