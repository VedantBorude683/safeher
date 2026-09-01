'use client'

import { useState } from 'react'
import GuardianTimeline from './GuardianTimeline'
import SensorPanel from './SensorPanel'
import AIRecommendation from './AIRecommendation'
import CyberSafetyScanner from './CyberSafetyScanner'
import FakeLinkDetector from './FakeLinkDetector'
import {
  Shield, Activity, MapPin, Phone, AlertTriangle,
  Mic, CheckCircle2, Radio,
} from 'lucide-react'

export default function GuardianAI() {
  const [guardian, setGuardian] = useState(true)

  return (
    <div className="space-y-8 pb-16">
      {/* HEADER */}
      <div className="bg-white border border-[var(--border)] rounded-2xl p-6 sm:p-8 shadow-card flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
            Autonomous Protection Engine
          </span>
          <h1 className="text-3xl font-serif text-[var(--text-primary)] mt-1">
            Guardian AI Command Center
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1.5 max-w-xl">
            Continuously monitors sensor telemetry, route trajectory, and ambient risk triggers in the background.
          </p>
        </div>

        <button
          onClick={() => setGuardian(!guardian)}
          className={`px-5 py-3 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 ${
            guardian
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300'
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${guardian ? 'bg-white animate-ping' : 'bg-gray-400'}`}></span>
          <span>{guardian ? 'Guardian Armed' : 'Guardian Paused'}</span>
        </button>
      </div>

      {/* STATUS METRICS GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            icon: Shield,
            label: 'System Status',
            value: guardian ? 'ACTIVE' : 'PAUSED',
            badge: guardian ? 'Armed' : 'Standby',
            color: guardian ? 'text-emerald-700' : 'text-gray-500',
            bg: guardian ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-gray-100 text-gray-600 border-gray-200',
          },
          {
            icon: Activity,
            label: 'Motion Detection',
            value: 'Monitoring',
            badge: 'Normal',
            color: 'text-[var(--primary)]',
            bg: 'bg-teal-50 text-teal-700 border-teal-200',
          },
          {
            icon: MapPin,
            label: 'Geofence Tracker',
            value: 'Corridor Lock',
            badge: 'Live',
            color: 'text-blue-700',
            bg: 'bg-blue-50 text-blue-700 border-blue-200',
          },
          {
            icon: Phone,
            label: 'Auto Dispatch Relay',
            value: 'Standby',
            badge: 'Ready',
            color: 'text-purple-700',
            bg: 'bg-purple-50 text-purple-700 border-purple-200',
          },
        ].map((item) => {
          const Icon = item.icon
          return (
            <div key={item.label} className="bg-white border border-[var(--border)] rounded-2xl p-5 shadow-card">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-[var(--bg-base)] border border-[var(--border)] flex items-center justify-center text-[var(--primary)]">
                  <Icon size={18} />
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${item.bg}`}>
                  {item.badge}
                </span>
              </div>
              <span className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider block">
                {item.label}
              </span>
              <p className="text-lg font-bold text-[var(--text-primary)] mt-1">{item.value}</p>
            </div>
          )
        })}
      </div>

      {/* LIVE SENSORS & AI ANALYSIS */}
      <SensorPanel />
      <AIRecommendation />
      <GuardianTimeline />

      {/* CYBER & SCANNER INTEGRATIONS */}
      <div className="grid gap-6 lg:grid-cols-2">
        <CyberSafetyScanner />
        <FakeLinkDetector />
      </div>

      {/* EMERGENCY DISPATCH WORKFLOW EXPLAINER */}
      <div className="bg-white border border-[var(--border)] rounded-2xl p-6 sm:p-8 shadow-card space-y-6">
        <div>
          <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
            Automated Protocol
          </span>
          <h2 className="text-xl font-bold text-[var(--text-primary)] mt-1">
            Autonomous Emergency Escalation Workflow
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            Guardian AI handles escalation in sequenced tiers if user is incapacitated or in urgent distress.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-5">
          {[
            { step: '01', title: 'Telemetry Anomaly', desc: 'Sudden deceleration, fall or 3x shake detected.' },
            { step: '02', title: 'Silent Query', desc: 'Voice prompt checks if you are safe.' },
            { step: '03', title: '10s Timer', desc: 'Countdown starts for user override cancellation.' },
            { step: '04', title: 'Location Ping', desc: 'Live GPS lock sent to emergency contacts.' },
            { step: '05', title: 'Relay Dispatch', desc: 'Police 112 bridge & automated SMS executed.' },
          ].map((flow, i) => (
            <div key={flow.step} className="p-4 rounded-xl bg-[var(--bg-base)] border border-[var(--border)] flex flex-col justify-between space-y-3">
              <span className="w-7 h-7 rounded-lg bg-[var(--accent-ghost)] border border-[var(--accent-light)] text-[var(--primary)] text-xs font-bold flex items-center justify-center">
                {flow.step}
              </span>
              <div>
                <h4 className="text-xs font-bold text-[var(--text-primary)]">{flow.title}</h4>
                <p className="text-[11px] text-[var(--text-muted)] mt-1 leading-relaxed">{flow.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}