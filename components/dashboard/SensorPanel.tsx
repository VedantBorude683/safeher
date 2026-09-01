'use client'

import { Battery, Wifi, Mic, MapPin, Activity, Smartphone } from 'lucide-react'

const sensors = [
  { icon: Activity, title: 'Accelerometer Sensor', status: 'Active (Normal)', color: 'text-emerald-700', bg: 'bg-emerald-50' },
  { icon: MapPin, title: 'GPS Location Lock', status: 'High Precision', color: 'text-blue-700', bg: 'bg-blue-50' },
  { icon: Mic, title: 'Voice Keyword Listener', status: 'Armed (Background)', color: 'text-[var(--primary)]', bg: 'bg-teal-50' },
  { icon: Wifi, title: 'Cloud Relay Connection', status: 'Connected (4G/5G)', color: 'text-teal-700', bg: 'bg-teal-50' },
  { icon: Battery, title: 'Device Battery Level', status: '82% Optimal', color: 'text-emerald-700', bg: 'bg-emerald-50' },
  { icon: Smartphone, title: 'Emergency Shake Mode', status: 'Active (3x Shake)', color: 'text-purple-700', bg: 'bg-purple-50' },
]

export default function SensorPanel() {
  return (
    <div className="bg-white border border-[var(--border)] rounded-2xl p-6 sm:p-8 shadow-card space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
            Hardware Telemetry
          </span>
          <h2 className="text-xl font-bold text-[var(--text-primary)] mt-0.5">
            Active Device Sensors
          </h2>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
          All Sensors Online
        </span>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {sensors.map((sensor, index) => {
          const Icon = sensor.icon
          return (
            <div
              key={index}
              className="p-4 rounded-xl bg-[var(--bg-base)] border border-[var(--border)] flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg ${sensor.bg} flex items-center justify-center ${sensor.color}`}>
                  <Icon size={18} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[var(--text-primary)]">{sensor.title}</h3>
                  <p className="text-[11px] text-[var(--text-muted)] mt-0.5">{sensor.status}</p>
                </div>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            </div>
          )
        })}
      </div>
    </div>
  )
}