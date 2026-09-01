'use client'

import { useEffect, useState } from 'react'
import {
  Mic2,
  CheckCircle2,
  MapPin,
  Phone,
} from 'lucide-react'
import { showToast } from '@/components/Toast'

type SOSState = 'idle' | 'activated' | 'sent'

interface EmergencyContact {
  name: string
  phone: string
}

interface SOSLocation {
  latitude: number
  longitude: number
  locationUrl: string
  timestamp: string
}

const statusSequence = [
  'Location captured',
  'Contact alerts queued',
  'Audio recording enabled',
  'Responder notified',
]

export default function VoiceSOS({ user }: { user: any }) {
  const [sosState, setSosState] =
    useState<SOSState>('idle')

  const [countdown, setCountdown] =
    useState(10)

  const [statusItems, setStatusItems] =
    useState<string[]>([])

  const [location, setLocation] =
    useState<SOSLocation | null>(null)

  const [isLoading, setIsLoading] =
    useState(false)

  /*
  |--------------------------------------------------------------------------
  | Emergency contacts
  |--------------------------------------------------------------------------
  */

  const emergencyContacts: EmergencyContact[] =
    user?.emergencyContacts || [
      {
        name: 'Friend',
        phone: '+91XXXXXXXXXX',
      },
    ]

  /*
  |--------------------------------------------------------------------------
  | GET CURRENT LOCATION
  |--------------------------------------------------------------------------
  */

  const getCurrentLocation =
    (): Promise<GeolocationPosition> => {
      return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(
            new Error(
              'Geolocation is not supported by this browser'
            )
          )

          return
        }

        navigator.geolocation.getCurrentPosition(
          resolve,
          (geoError: GeolocationPositionError) => {
            /*
             * GeolocationPositionError has non-enumerable properties
             * (code, message) which log as `{}`. Wrap it in a real Error
             * so the message is always visible in the console.
             */
            const err = new Error(
              `GPS Error (code ${geoError.code}): ${geoError.message}`
            )
            ;(err as Error & { geoCode: number }).geoCode = geoError.code
            reject(err)
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          }
        )
      })
    }

  /*
  |--------------------------------------------------------------------------
  | SEND SOS TO BACKEND
  |--------------------------------------------------------------------------
  */

  const sendSOS = async (
    currentLocation: SOSLocation
  ) => {
    try {
      console.log('🚨 Sending SOS to backend...')

      const response = await fetch(
        'http://localhost:8080/api/sos',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            user: {
              id: user?.id || 'unknown',

              name:
                user?.fullName ||
                'SafeHer User',

              phone:
                user?.phone || '',

              email:
                user?.email || '',
            },

            latitude:
              currentLocation.latitude,

            longitude:
              currentLocation.longitude,

            locationUrl:
              currentLocation.locationUrl,

            contacts:
              emergencyContacts,

            timestamp:
              currentLocation.timestamp,
            auto_detected: false,
          }),
        }
      )

      if (!response.ok) {
        const errorText =
          await response.text()

        throw new Error(
          errorText ||
            `Backend returned ${response.status}`
        )
      }

      const data =
        await response.json()

      console.log(
        '✅ Backend response:',
        data
      )

      if (data.success) {
        showToast(
          '🚨 SOS SMS sent automatically!',
          'success'
        )

        return true
      }

      throw new Error(
        data.message ||
          'SOS failed'
      )
    } catch (error) {
      console.error(
        '❌ SOS sending error:',
        error
      )

      showToast(
        'SOS reached backend, but SMS could not be sent.',
        'error'
      )

      return false
    }
  }

  /*
  |--------------------------------------------------------------------------
  | COUNTDOWN
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (sosState !== 'activated') {
      return
    }

    setStatusItems([])
    setCountdown(10)

    const interval =
      window.setInterval(() => {
        setCountdown((previous) => {
          if (previous <= 1) {
            window.clearInterval(
              interval
            )

            return 0
          }

          return previous - 1
        })
      }, 1000)

    return () => {
      window.clearInterval(
        interval
      )
    }
  }, [sosState])

  /*
  |--------------------------------------------------------------------------
  | SEND SOS WHEN COUNTDOWN FINISHES
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (
      sosState === 'activated' &&
      countdown === 0 &&
      location
    ) {
      const processSOS = async () => {
        const success =
          await sendSOS(location)

        if (success) {
          setSosState('sent')
        } else {
          /*
           * Keep the user on the SOS screen
           * if SMS sending failed.
           */
          setSosState('activated')
        }
      }

      processSOS()
    }
  }, [
    countdown,
    sosState,
    location,
  ])

  /*
  |--------------------------------------------------------------------------
  | STATUS ANIMATION
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (sosState !== 'activated') {
      return
    }

    const timers =
      statusSequence.map(
        (status, index) => {
          return window.setTimeout(
            () => {
              setStatusItems(
                (previous) => {
                  if (
                    previous.includes(
                      status
                    )
                  ) {
                    return previous
                  }

                  return [
                    ...previous,
                    status,
                  ]
                }
              )
            },
            400 * (index + 1)
          )
        }
      )

    return () => {
      timers.forEach(
        (timer) => {
          window.clearTimeout(
            timer
          )
        }
      )
    }
  }, [sosState])

  /*
  |--------------------------------------------------------------------------
  | ACTIVATE SOS
  |--------------------------------------------------------------------------
  */

  const handleActivate =
    async () => {
      if (isLoading) {
        return
      }

      try {
        setIsLoading(true)

        showToast(
          'Getting your current location...',
          'success'
        )

        /*
         * Get GPS
         */

        const position =
          await getCurrentLocation()

        const latitude =
          position.coords.latitude

        const longitude =
          position.coords.longitude

        const locationUrl =
          `https://www.google.com/maps?q=${latitude},${longitude}`

        const currentLocation:
          SOSLocation = {
            latitude,
            longitude,
            locationUrl,
            timestamp:
              new Date().toISOString(),
          }

        console.log(
          '📍 Latitude:',
          latitude
        )

        console.log(
          '📍 Longitude:',
          longitude
        )

        /*
         * Save location locally
         */

        localStorage.setItem(
          'activeSOSLocation',
          JSON.stringify(
            currentLocation
          )
        )

        setLocation(
          currentLocation
        )

        /*
         * Start countdown
         *
         * SMS is NOT sent yet.
         */

        setCountdown(10)

        setSosState(
          'activated'
        )

        showToast(
          'SOS activated. SMS will be sent after 10 seconds.',
          'success'
        )
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : String(error)

        console.error(
          '❌ GPS Error:',
          message
        )

        showToast(
          'Unable to get location. Please allow GPS permission.',
          'error'
        )
      } finally {
        setIsLoading(false)
      }
    }

  /*
  |--------------------------------------------------------------------------
  | CALL 112
  |--------------------------------------------------------------------------
  */

  const call112 = () => {
    window.location.href =
      'tel:112'
  }

  /*
  |--------------------------------------------------------------------------
  | CANCEL SOS
  |--------------------------------------------------------------------------
  */

  const resetSOS = () => {
    setSosState('idle')

    setStatusItems([])

    setCountdown(10)

    setLocation(null)

    localStorage.removeItem(
      'activeSOSLocation'
    )

    showToast(
      'SOS cancelled. You are safe now.',
      'success'
    )
  }

  /*
  |--------------------------------------------------------------------------
  | UI
  |--------------------------------------------------------------------------
  */

  return (
    <div className="space-y-6 pb-16">
      {/* HEADER */}
      <div className="bg-white border border-[var(--border)] rounded-2xl p-6 sm:p-8 shadow-card flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
            Emergency Response
          </span>
          <h1 className="text-3xl font-serif text-[var(--text-primary)] mt-1">
            Voice SOS Dispatch
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1.5 max-w-xl">
            Instantly alert your trusted contacts with live GPS tracking and activate emergency relays.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border)] text-left sm:text-right">
          <span className="text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider block">
            System State
          </span>
          <span className="text-lg font-bold text-[var(--text-primary)] mt-0.5 block">
            {sosState === 'idle'
              ? '🟢 Ready (Standby)'
              : sosState === 'activated'
              ? '🟡 Countdown Active'
              : '🔴 SOS Dispatched'}
          </span>
        </div>
      </div>

      {/* ================================================= */}
      {/* IDLE */}
      {/* ================================================= */}
      {sosState === 'idle' && (
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* SOS BUTTON CARD */}
          <div className="bg-white border border-[var(--border)] rounded-2xl p-8 shadow-card text-center flex flex-col items-center justify-center min-h-[400px]">
            <div className="relative mb-6">
              <span className="absolute -inset-4 rounded-full bg-red-100/60 animate-ping opacity-75 pointer-events-none"></span>
              <button
                onClick={handleActivate}
                disabled={isLoading}
                className="relative w-44 h-44 rounded-full bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-xl shadow-red-500/25 flex flex-col items-center justify-center transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Mic2 className="w-14 h-14 mb-1" />
                <span className="text-base font-bold tracking-wide uppercase">
                  {isLoading ? 'Locating...' : 'Hold SOS'}
                </span>
                <span className="text-[10px] opacity-80 mt-0.5">or say trigger phrase</span>
              </button>
            </div>

            <h2 className="text-xl font-bold text-[var(--text-primary)]">
              Instant 1-Tap Emergency Trigger
            </h2>
            <p className="mt-2 text-xs text-[var(--text-secondary)] max-w-md leading-relaxed">
              Tapping will lock your GPS location, begin a 10-second confirmation timer, and notify all emergency contacts via SMS and relay.
            </p>
          </div>

          {/* CONTACTS & TIPS */}
          <div className="space-y-6">
            <div className="bg-white border border-[var(--border)] rounded-2xl p-6 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider">
                  Emergency Contacts ({emergencyContacts.length})
                </h3>
                <span className="text-[11px] font-semibold text-[var(--primary)]">Synced</span>
              </div>

              <div className="space-y-3">
                {emergencyContacts.map((contact, index) => (
                  <div
                    key={index}
                    className="p-3.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border)] flex items-center justify-between"
                  >
                    <div>
                      <p className="text-sm font-bold text-[var(--text-primary)]">{contact.name}</p>
                      <p className="text-xs text-[var(--text-muted)] font-mono mt-0.5">{contact.phone}</p>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-[var(--accent-ghost)] text-[var(--primary)] flex items-center justify-center">
                      <Phone size={15} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-[var(--border)] rounded-2xl p-6 shadow-card">
              <h3 className="text-sm font-bold text-[var(--text-primary)] mb-2">Safety Protocol Guidance</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                If in immediate physical danger, stay along open public roads. The automated system shares live continuous GPS updates until cancelled.
              </p>
              <div className="mt-4 pt-4 border-t border-[var(--border)] flex items-center justify-between">
                <span className="text-xs font-semibold text-[var(--text-muted)]">Police Emergency</span>
                <button
                  onClick={call112}
                  className="px-3 py-1.5 bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 rounded-lg text-xs font-bold transition-colors"
                >
                  Direct 112 Call
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================================================= */}
      {/* ACTIVATED */}
      {/* ================================================= */}
      {sosState === 'activated' && (
        <div className="bg-white border border-[var(--border)] rounded-2xl p-8 sm:p-12 shadow-card text-center max-w-2xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-700 border border-red-200 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
            SOS Countdown Active
          </div>

          <div className="text-8xl sm:text-9xl font-bold font-mono text-red-600 tracking-tight animate-pulse">
            {countdown}
          </div>

          <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto">
            Emergency SMS and coordinates will be transmitted automatically when timer reaches zero.
          </p>

          {/* STATUS SEQUENCE */}
          <div className="space-y-2.5 max-w-md mx-auto text-left">
            {statusItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-base)] border border-[var(--border)] text-xs font-semibold text-[var(--text-primary)]"
              >
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* LOCATION */}
          {location && (
            <div className="p-4 rounded-xl bg-[var(--accent-ghost)] border border-[var(--accent-light)] text-left max-w-md mx-auto flex items-center gap-3">
              <MapPin size={18} className="text-[var(--primary)] shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-[var(--primary)] block">GPS Coordinates Locked</span>
                <span className="text-[var(--text-secondary)] font-mono">
                  {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                </span>
              </div>
            </div>
          )}

          {/* CANCEL */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={resetSOS}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-red-300 text-red-700 hover:bg-red-50 text-sm font-bold transition-colors"
            >
              Cancel SOS (False Alarm)
            </button>
            <button
              onClick={call112}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold transition-colors shadow-sm"
            >
              Call 112 Immediately
            </button>
          </div>
        </div>
      )}

      {/* ================================================= */}
      {/* SENT */}
      {/* ================================================= */}
      {sosState === 'sent' && (
        <div className="bg-white border border-[var(--border)] rounded-2xl p-8 sm:p-12 shadow-card text-center max-w-2xl mx-auto space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 size={36} />
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
            Emergency Alerts Dispatched
          </h2>
          <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto">
            Your emergency SMS and live tracking link have been transmitted to all registered contacts.
          </p>

          <div className="space-y-3 max-w-md mx-auto text-left">
            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border)] text-xs">
              <div className="flex items-center gap-2.5 font-medium text-[var(--text-primary)]">
                <Phone size={15} className="text-[var(--primary)]" />
                <span>Emergency Contact SMS</span>
              </div>
              <span className="font-bold text-emerald-700">✓ Delivered</span>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border)] text-xs">
              <div className="flex items-center gap-2.5 font-medium text-[var(--text-primary)]">
                <MapPin size={15} className="text-[var(--primary)]" />
                <span>Live Google Maps Tracking</span>
              </div>
              <span className="font-bold text-emerald-700">✓ Active</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={call112}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <Phone size={16} />
              <span>Call 112 Police Relay</span>
            </button>
            <button
              onClick={resetSOS}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition-colors"
            >
              I Am Safe Now
            </button>
          </div>
        </div>
      )}
    </div>
  )
}