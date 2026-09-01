'use client'

import { useState, useEffect } from 'react'
import { AlertTriangle, MapPin, X, Phone, Navigation, ShieldAlert } from 'lucide-react'
import { RiskState } from '@/hooks/useRiskEngine'
import { TelemetryData } from '@/hooks/useSensorTelemetry'
import { showToast } from '@/components/Toast'

interface RiskModalsProps {
  user: any
  riskState: RiskState
  telemetryData: TelemetryData
  onDismiss: () => void
  onEscalateToCritical: () => void
}

export default function RiskModals({
  user,
  riskState,
  telemetryData,
  onDismiss,
  onEscalateToCritical,
}: RiskModalsProps) {
  const [countdown, setCountdown] = useState(10)
  const [sosSent, setSosSent] = useState(false)

  // Critical countdown timer
  useEffect(() => {
    if (riskState.tier !== 'Critical' || sosSent) {
      setCountdown(10) // reset
      return
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          handleSilentSOS()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [riskState.tier, sosSent])

  const handleSilentSOS = async () => {
    if (sosSent) return
    try {
      const lat = telemetryData.location?.coords.latitude || 0
      const lng = telemetryData.location?.coords.longitude || 0
      
      const payload = {
        user: {
          id: user?.id || 'unknown',
          name: user?.fullName || 'SafeHer User',
          phone: user?.phone || '',
          email: user?.email || '',
        },
        latitude: lat,
        longitude: lng,
        locationUrl: `https://maps.google.com/?q=${lat},${lng}`,
        contacts: user?.emergencyContacts || [],
        timestamp: new Date().toISOString(),
        auto_detected: true, // Key addition for silent dispatch
      }

      const response = await fetch('http://localhost:8080/api/sos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        setSosSent(true)
        // We do not show a loud toast here because it's silent dispatch
        console.log('Silent SOS dispatched successfully.')
      }
    } catch (err) {
      console.error('Failed to send silent SOS:', err)
    }
  }

  // --- Render Modals based on Tier ---

  if (riskState.tier === 'High') {
    return (
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/20 p-4">
        <div className="bg-white border border-[var(--border)] rounded-2xl p-6 shadow-2xl w-full max-w-sm">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <AlertTriangle size={20} />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-bold text-[var(--text-primary)]">Safety Check-in</h3>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                We detected an unusual pattern ({riskState.triggerReason}). Are you safe?
              </p>
            </div>
            <button onClick={onDismiss} className="text-[var(--text-muted)] hover:text-gray-800">
              <X size={18} />
            </button>
          </div>

          <div className="mt-5 space-y-2">
            <button
              onClick={() => {
                showToast('Location shared with contacts', 'info')
                onDismiss()
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[var(--primary)] text-white text-xs font-semibold"
            >
              <MapPin size={16} />
              Share Live Location
            </button>
            <div className="grid grid-cols-2 gap-2">
              <a
                href="tel:112"
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-50 text-red-700 text-xs font-semibold border border-red-100"
              >
                <Phone size={14} />
                Call 112
              </a>
              <button
                onClick={onDismiss}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[var(--bg-base)] text-[var(--text-primary)] text-xs font-semibold border border-[var(--border)]"
              >
                I'm Safe
              </button>
            </div>
          </div>
          {/* Progress bar to escalate if ignored */}
          <div className="w-full h-1 bg-gray-100 rounded-full mt-4 overflow-hidden relative">
            <div 
              className="absolute top-0 left-0 h-full bg-amber-400" 
              style={{ 
                width: '100%', 
                animation: 'shrink 20s linear forwards' 
              }}
              onAnimationEnd={onEscalateToCritical}
            />
          </div>
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes shrink { from { width: 100%; } to { width: 0%; } }
          `}} />
        </div>
      </div>
    )
  }

  if (riskState.tier === 'Critical') {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        {/* SILENT, dark-themed critical modal */}
        <div className="bg-[#1C1A17] border border-[#2D2A26] rounded-2xl p-6 sm:p-8 shadow-2xl w-full max-w-sm text-center relative overflow-hidden">
          
          {sosSent ? (
            <div className="py-8 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center mb-4">
                <ShieldAlert size={32} />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Emergency Contacts Notified</h2>
              <p className="text-sm text-gray-400 mb-6">Live location tracking is active.</p>
              <button
                onClick={onDismiss}
                className="px-6 py-2 rounded-full bg-white/10 text-white text-sm font-semibold hover:bg-white/20 transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <div className="mb-2">
                <span className="text-xs font-bold text-red-500 uppercase tracking-widest">
                  Critical Alert
                </span>
              </div>
              <h2 className="text-2xl font-serif text-white mb-1">Silent SOS Dispatch</h2>
              <p className="text-sm text-gray-400 mb-6">
                Auto-dispatching in {countdown}s due to detected anomaly.
              </p>

              {/* Countdown circle */}
              <div className="relative w-32 h-32 mx-auto mb-8 flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="60"
                    fill="none"
                    stroke="#2D2A26"
                    strokeWidth="6"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="60"
                    fill="none"
                    stroke="#DC2626"
                    strokeWidth="6"
                    strokeDasharray="377"
                    strokeDashoffset={377 - (377 * countdown) / 10}
                    className=""
                  />
                </svg>
                <span className="text-4xl font-bold font-mono text-white tracking-tighter">
                  00:{countdown.toString().padStart(2, '0')}
                </span>
              </div>

              <button
                onClick={onDismiss}
                className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm font-bold border border-white/5 transition-colors"
              >
                Cancel SOS (I am Safe)
              </button>
            </>
          )}
        </div>
      </div>
    )
  }

  return null
}
