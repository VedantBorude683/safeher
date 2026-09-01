'use client'

import { Activity, MapPin, ShieldAlert, Siren, CheckCircle2 } from 'lucide-react'

const events = [
  {
    time: '06:30 PM',
    title: 'Normal Transit Pattern',
    desc: 'Accelerometer detected steady walking pace along verified corridor.',
    icon: CheckCircle2,
    color: 'text-emerald-700',
    bg: 'bg-emerald-50 border-emerald-200',
  },
  {
    time: '06:32 PM',
    title: 'Entered Caution Sector',
    desc: 'AI geofencing identified transition into sector with reduced illumination.',
    icon: MapPin,
    color: 'text-amber-700',
    bg: 'bg-amber-50 border-amber-200',
  },
  {
    time: '06:33 PM',
    title: 'Motion Pause Detected',
    desc: 'Stationary pause of 45 seconds registered in caution corridor.',
    icon: Activity,
    color: 'text-amber-700',
    bg: 'bg-amber-50 border-amber-200',
  },
  {
    time: '06:34 PM',
    title: 'Silent Safety Query Sent',
    desc: 'Guardian AI pinged discreet prompt: "Confirm safety state".',
    icon: ShieldAlert,
    color: 'text-[var(--primary)]',
    bg: 'bg-teal-50 border-teal-200',
  },
  {
    time: '06:35 PM',
    title: 'Standby Status Verified',
    desc: 'User confirmed safe status. Normal tracking resumed.',
    icon: Siren,
    color: 'text-emerald-700',
    bg: 'bg-emerald-50 border-emerald-200',
  },
]

export default function GuardianTimeline() {
  return (
    <div className="bg-white border border-[var(--border)] rounded-2xl p-6 sm:p-8 shadow-card space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
            Event Log
          </span>
          <h2 className="text-xl font-bold text-[var(--text-primary)] mt-0.5">
            Guardian AI Activity Timeline
          </h2>
        </div>
        <span className="text-xs font-semibold text-[var(--text-muted)] font-mono">Live Telemetry</span>
      </div>

      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[var(--border)]">
        {events.map((event, index) => {
          const Icon = event.icon
          return (
            <div key={index} className="relative flex items-start gap-4">
              <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 -ml-5 z-10 bg-white ${event.color}`}>
                <Icon size={13} />
              </div>
              <div className="flex-1 p-3.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border)] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h4 className="text-xs font-bold text-[var(--text-primary)]">{event.title}</h4>
                  <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">{event.desc}</p>
                </div>
                <span className="text-[10px] font-mono text-[var(--text-muted)] shrink-0">{event.time}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}