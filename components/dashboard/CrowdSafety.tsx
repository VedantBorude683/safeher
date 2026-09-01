'use client'

import { useState } from 'react'
import {
  Shield, MapPin, AlertTriangle, Lightbulb, ShieldCheck, Users,
  Plus, CheckCircle2, X, MessageSquare,
} from 'lucide-react'

export default function CrowdSafety() {
  const [reports, setReports] = useState([
    {
      icon: '🚨',
      title: 'Harassment Report',
      location: 'FC Road',
      time: '09:35 PM',
      badgeColor: 'bg-red-50 text-red-700 border-red-200',
    },
    {
      icon: '💡',
      title: 'Street Light Failure',
      location: 'JM Road',
      time: '09:28 PM',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      icon: '🚧',
      title: 'Road Blockage / Accident',
      location: 'MG Road',
      time: '09:16 PM',
      badgeColor: 'bg-orange-50 text-orange-700 border-orange-200',
    },
    {
      icon: '🚓',
      title: 'Active Police Patrol Beat',
      location: 'Shivajinagar',
      time: '09:05 PM',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
  ])

  const [score, setScore] = useState(74)
  const [showForm, setShowForm] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const [type, setType] = useState('Harassment')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')

  return (
    <div className="space-y-6 pb-16">
      {/* HEADER */}
      <div className="bg-white border border-[var(--border)] rounded-2xl p-6 sm:p-8 shadow-card flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
            Community Intelligence
          </span>
          <h1 className="text-3xl font-serif text-[var(--text-primary)] mt-1">
            Crowd Safety Intelligence
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1.5 max-w-xl">
            Real-time community crowd density monitoring and anonymous safety alerts.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="px-5 py-3 bg-[var(--primary)] hover:opacity-90 text-white rounded-xl text-xs font-semibold transition-all shadow-sm flex items-center justify-center gap-2"
        >
          <Plus size={16} />
          <span>Report Safety Incident</span>
        </button>
      </div>

      {/* SAFETY SCORE & AI SUMMARY */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="bg-white border border-[var(--border)] rounded-2xl p-8 shadow-card flex flex-col items-center justify-center text-center">
          <div className="w-36 h-36 rounded-full border-[10px] border-[var(--primary)] flex flex-col items-center justify-center bg-[var(--accent-ghost)]">
            <span className="text-4xl font-bold font-mono text-[var(--text-primary)]">{score}</span>
            <span className="text-xs text-[var(--text-muted)] font-medium">/ 100</span>
          </div>

          <span className="mt-5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            Moderate-High Safety Index
          </span>
          <p className="text-xs text-[var(--text-muted)] mt-2">Aggregated from 140+ real-time node pings.</p>
        </div>

        <div className="lg:col-span-2 bg-white border border-[var(--border)] rounded-2xl p-6 sm:p-8 shadow-card flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
              Environmental Telemetry
            </span>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mt-1">
              Live Area Safety Overview
            </h2>
            <p className="text-xs text-[var(--text-secondary)] mt-2 leading-relaxed">
              Synthesizes pedestrian volume, active storefronts, illumination metrics, and police vehicle locations to provide continuous ambient safety scoring.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="p-4 rounded-xl bg-[var(--bg-base)] border border-[var(--border)]">
                <Users className="text-emerald-600 mb-2" size={20} />
                <span className="text-xs font-bold text-[var(--text-primary)] block">Pedestrian Density</span>
                <span className="text-xs font-semibold text-emerald-700 mt-0.5 block">High (Active Street)</span>
              </div>

              <div className="p-4 rounded-xl bg-[var(--bg-base)] border border-[var(--border)]">
                <ShieldCheck className="text-[var(--primary)] mb-2" size={20} />
                <span className="text-xs font-bold text-[var(--text-primary)] block">Patrol Beat Frequency</span>
                <span className="text-xs font-semibold text-[var(--primary)] mt-0.5 block">Active Patrols Present</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI RECOMMENDATIONS */}
      <div className="bg-white border border-[var(--border)] rounded-2xl p-6 sm:p-8 shadow-card space-y-4">
        <h3 className="text-base font-bold text-[var(--text-primary)]">
          Safety Recommendations & Directives
        </h3>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-[var(--accent-ghost)] border border-[var(--accent-light)]">
            <span className="text-xs font-bold text-[var(--primary)] block mb-2">
              ✓ Recommended Actions
            </span>
            <ul className="space-y-1.5 text-xs text-[var(--text-secondary)]">
              <li>• Prefer main commercial boulevard over isolated transit connectors</li>
              <li>• Keep the Risk Engine monitoring armed while in transit</li>
              <li>• Share live transit link with contacts if moving after 10:00 PM</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
            <span className="text-xs font-bold text-amber-800 block mb-2">
              ⚠ Caution Notice
            </span>
            <p className="text-xs text-amber-900 leading-relaxed">
              Recent crowd reports note a streetlight outage on western connector junction. Redirection along JM Road recommended.
            </p>
          </div>
        </div>
      </div>

      {/* INCIDENT TIMELINE */}
      <div className="bg-white border border-[var(--border)] rounded-2xl p-6 sm:p-8 shadow-card space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[var(--text-primary)]">
            Recent Community Reports
          </h3>
          <span className="text-xs text-[var(--text-muted)] font-medium">Verified by community</span>
        </div>

        <div className="space-y-2.5">
          {reports.map((report, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-[var(--bg-base)] border border-[var(--border)] flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{report.icon}</span>
                <div>
                  <span className="text-xs font-bold text-[var(--text-primary)] block">{report.title}</span>
                  <span className="text-[11px] text-[var(--text-muted)] flex items-center gap-1 mt-0.5">
                    <MapPin size={11} />
                    {report.location}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[11px] text-[var(--text-muted)] font-mono">{report.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* REPORT MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-2xl border border-[var(--border)] p-6 sm:p-8 shadow-2xl space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[var(--text-primary)]">Report Community Incident</h2>
              <button
                onClick={() => setShowForm(false)}
                className="w-8 h-8 rounded-lg hover:bg-[var(--bg-elevated)] flex items-center justify-center text-[var(--text-muted)]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">
                  Incident Classification
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full bg-[var(--bg-base)] border border-[var(--border)] rounded-xl px-3.5 py-2.5 text-xs text-[var(--text-primary)] focus:border-[var(--primary)] focus:outline-none"
                >
                  <option>Harassment</option>
                  <option>Street Light Failure</option>
                  <option>Road Blockage / Accident</option>
                  <option>Suspicious Activity</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">
                  Location Landmark
                </label>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. FC Road near Goodluck Chowk"
                  className="w-full bg-[var(--bg-base)] border border-[var(--border)] rounded-xl px-3.5 py-2.5 text-xs text-[var(--text-primary)] focus:border-[var(--primary)] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">
                  Brief Context
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide context to help community safety scores..."
                  rows={3}
                  className="w-full bg-[var(--bg-base)] border border-[var(--border)] rounded-xl px-3.5 py-2.5 text-xs text-[var(--text-primary)] focus:border-[var(--primary)] focus:outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2.5 rounded-xl border border-[var(--border)] text-xs font-semibold text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (!location.trim()) return
                    setReports([
                      {
                        icon:
                          type === 'Harassment'
                            ? '🚨'
                            : type === 'Street Light Failure'
                            ? '💡'
                            : type === 'Road Blockage / Accident'
                            ? '🚧'
                            : '👤',
                        title: type,
                        location: location,
                        time: 'Just Now',
                        badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
                      },
                      ...reports,
                    ])
                    setScore((prev) => Math.max(prev - 2, 40))
                    setShowForm(false)
                    setShowSuccess(true)
                    setTimeout(() => setShowSuccess(false), 2500)
                    setLocation('')
                    setDescription('')
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[var(--primary)] hover:opacity-90 text-white text-xs font-bold shadow-xs"
                >
                  Submit Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS CONFIRMATION MODAL */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-emerald-200 rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 size={32} />
            </div>
            <h2 className="text-xl font-bold text-[var(--text-primary)]">Report Transmitted</h2>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Thank you for contributing. AI safety models have updated local crowd risk metrics.
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="w-full py-2.5 bg-[var(--primary)] text-white rounded-xl text-xs font-bold hover:opacity-90"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  )
}