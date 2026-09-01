'use client'

import { useState } from 'react'
import {
  ShieldCheck, Wifi, MapPin, Mic, Bell, Battery,
  Loader2, CheckCircle2, AlertTriangle,
} from 'lucide-react'

type ScanResult = {
  https: boolean
  online: boolean
  location: string
  microphone: string
  notifications: string
  battery: string
}

export default function CyberSafetyScanner() {
  const [loading, setLoading] = useState(false)
  const [scan, setScan] = useState<ScanResult | null>(null)
  const [score, setScore] = useState(0)

  const startScan = async () => {
    setLoading(true)

    let battery = 'Available'
    try {
      if ('getBattery' in navigator) {
        const info = await (navigator as any).getBattery()
        battery = `${Math.round(info.level * 100)}%`
      }
    } catch {}

    let location = 'prompt'
    let microphone = 'prompt'

    try {
      const permission = await navigator.permissions.query({
        name: 'geolocation',
      })
      location = permission.state
    } catch {}

    try {
      const permission = await navigator.permissions.query({
        name: 'microphone' as PermissionName,
      })
      microphone = permission.state
    } catch {}

    const notifications = 'Notification' in window ? Notification.permission : 'unsupported'
    const https = window.location.protocol === 'https:' || window.location.hostname === 'localhost'
    const online = navigator.onLine

    let aiScore = 100
    if (!https) aiScore -= 15
    if (!online) aiScore -= 20
    if (location !== 'granted') aiScore -= 10
    if (microphone !== 'granted') aiScore -= 5
    if (notifications !== 'granted') aiScore -= 8

    setTimeout(() => {
      setLoading(false)
      setScore(aiScore)
      setScan({
        https,
        online,
        location,
        microphone,
        notifications,
        battery,
      })
    }, 1500)
  }

  return (
    <div className="bg-white border border-[var(--border)] rounded-2xl p-6 sm:p-8 shadow-card space-y-5 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
              Device Diagnostics
            </span>
            <h3 className="text-xl font-bold text-[var(--text-primary)] mt-0.5">
              Cyber & Sensor Scanner
            </h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[var(--accent-ghost)] text-[var(--primary)] flex items-center justify-center">
            <ShieldCheck size={22} />
          </div>
        </div>

        <p className="text-xs text-[var(--text-secondary)] mt-2">
          Verifies browser permissions, SSL security, network connectivity, and microphone access readiness.
        </p>

        {scan && (
          <div className="mt-5 p-4 rounded-xl bg-[var(--bg-base)] border border-[var(--border)] space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-[var(--text-primary)]">System Readiness Score</span>
              <span className="text-base font-bold text-[var(--primary)] font-mono">{score} / 100</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-[var(--text-secondary)]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-emerald-600" />
                <span>SSL Encrypted: {scan.https ? 'Yes' : 'No'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-emerald-600" />
                <span>Online Relay: {scan.online ? 'Active' : 'Offline'}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={startScan}
        disabled={loading}
        className="w-full py-3 bg-[var(--primary)] hover:opacity-90 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2"
      >
        {loading ? <Loader2 size={15} className="animate-spin" /> : <ShieldCheck size={15} />}
        <span>{loading ? 'Running Diagnostics...' : 'Run Device Health Scan'}</span>
      </button>
    </div>
  )
}