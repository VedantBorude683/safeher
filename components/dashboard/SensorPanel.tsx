'use client'

import { Battery, Wifi, Mic, MapPin, Activity, Smartphone } from 'lucide-react'
import { TelemetryData } from '@/hooks/useSensorTelemetry'

interface SensorPanelProps {
  telemetryData?: TelemetryData
  permissionsGranted?: boolean
}

export default function SensorPanel({ telemetryData, permissionsGranted = false }: SensorPanelProps) {
  const latitude = telemetryData?.location?.coords.latitude ?? null
  const longitude = telemetryData?.location?.coords.longitude ?? null
  const speed = telemetryData?.location?.coords.speed ?? null
  const heading = telemetryData?.location?.coords.heading ?? null
  const lastUpdated = telemetryData?.location ? new Date(telemetryData.location.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : 'Waiting for fix'

  const sensors = [
    {
      icon: Activity,
      title: 'Accelerometer Sensor',
      status: telemetryData ? `${telemetryData.acceleration.toFixed(1)} g-force` : 'Waiting for motion data',
      color: telemetryData && telemetryData.acceleration > 8 ? 'text-amber-700' : 'text-emerald-700',
      bg: telemetryData && telemetryData.acceleration > 8 ? 'bg-amber-50' : 'bg-emerald-50',
    },
    {
      icon: MapPin,
      title: 'Live GPS Location',
      status: latitude !== null && longitude !== null
        ? `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`
        : 'Waiting for GPS fix',
      color: 'text-blue-700',
      bg: 'bg-blue-50',
    },
    {
      icon: Mic,
      title: 'Mic anomaly monitor',
      status: telemetryData?.audioSpike ? 'Spike detected' : 'Listening for spike/silence pattern',
      color: telemetryData?.audioSpike ? 'text-amber-700' : 'text-[var(--primary)]',
      bg: telemetryData?.audioSpike ? 'bg-amber-50' : 'bg-teal-50',
    },
    {
      icon: Wifi,
      title: 'Connectivity',
      status: telemetryData ? (telemetryData.isOnline ? 'Connected' : 'Signal loss') : 'Checking connection',
      color: telemetryData?.isOnline ? 'text-teal-700' : 'text-red-700',
      bg: telemetryData?.isOnline ? 'bg-teal-50' : 'bg-red-50',
    },
    {
      icon: Battery,
      title: 'Battery status',
      status: telemetryData?.batteryLevel ? `${telemetryData.batteryLevel}%` : 'Unavailable',
      color: 'text-emerald-700',
      bg: 'bg-emerald-50',
    },
    {
      icon: Smartphone,
      title: 'Monitoring state',
      status: telemetryData?.monitoringStatus || 'Waiting for activation',
      color: permissionsGranted ? 'text-purple-700' : 'text-gray-600',
      bg: permissionsGranted ? 'bg-purple-50' : 'bg-gray-100',
    },
  ]

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
        <span className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${
          permissionsGranted
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
            : 'bg-gray-100 text-gray-600 border-gray-200'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${permissionsGranted ? 'bg-emerald-600 animate-pulse' : 'bg-gray-400'}`}></span>
          {permissionsGranted ? 'Live Monitoring' : 'Awaiting Consent'}
        </span>
      </div>

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-base)] p-4">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <MapPin size={18} />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">Live Location</p>
              <p className="text-sm font-bold text-[var(--text-primary)]">{latitude !== null && longitude !== null ? 'GPS lock active' : 'Waiting for fix'}</p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-[var(--text-muted)]">{lastUpdated}</span>
        </div>

        <div className="grid sm:grid-cols-3 gap-3 text-xs">
          <div className="rounded-xl border border-[var(--border)] bg-white p-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">Coordinates</p>
            <p className="mt-1 font-bold text-[var(--text-primary)]">
              {latitude !== null && longitude !== null ? `${latitude.toFixed(5)}, ${longitude.toFixed(5)}` : '—'}
            </p>
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-white p-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">Speed</p>
            <p className="mt-1 font-bold text-[var(--text-primary)]">{speed !== null ? `${speed.toFixed(1)} m/s` : '—'}</p>
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-white p-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">Heading</p>
            <p className="mt-1 font-bold text-[var(--text-primary)]">{heading !== null ? `${Math.round(heading)}°` : '—'}</p>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {sensors.map((sensor, index) => {
          const Icon = sensor.icon
          return (
            <div
              key={index}
              className="p-4 rounded-xl bg-[var(--bg-base)] border border-[var(--border)] flex items-center justify-between"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-9 h-9 rounded-lg ${sensor.bg} flex items-center justify-center ${sensor.color}`}>
                  <Icon size={18} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs font-bold text-[var(--text-primary)]">{sensor.title}</h3>
                  <p className="text-[11px] text-[var(--text-muted)] mt-0.5 truncate">{sensor.status}</p>
                </div>
              </div>
              <span className={`w-2 h-2 rounded-full ${permissionsGranted ? 'bg-emerald-500' : 'bg-gray-300'}`}></span>
            </div>
          )
        })}
      </div>
    </div>
  )
}