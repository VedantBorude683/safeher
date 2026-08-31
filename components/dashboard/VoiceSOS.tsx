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
          reject,
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
        'http://localhost:5000/api/sos',
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
        console.error(
          '❌ GPS Error:',
          error
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
    <div className="space-y-6 pb-24 md:pb-0">

      {/* HEADER */}

      <div className="rounded-[2rem] border border-[#1E1E35] bg-[#11121F] p-8 shadow-[0_35px_60px_-45px_rgba(16,24,40,0.8)]">

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>

            <p className="text-sm uppercase tracking-[0.3em] text-[#94A3B8]">
              Emergency SOS
            </p>

            <h1 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
              Voice-Activated Assistance
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-[#94A3B8]">
              Instantly alert your trusted contacts and responders using your voice or one tap.
            </p>

          </div>

          <div className="rounded-[2rem] bg-[#0E1020] p-5 text-center border border-[#2E2E48]">

            <p className="text-xs uppercase tracking-[0.3em] text-[#94A3B8]">
              Ready state
            </p>

            <p className="mt-3 text-2xl font-semibold text-white">

              {sosState === 'idle'
                ? 'Standby'
                : sosState === 'activated'
                ? 'SOS Active'
                : 'Alert Sent'}

            </p>

          </div>

        </div>

      </div>

      {/* ================================================= */}
      {/* IDLE */}
      {/* ================================================= */}

      {sosState === 'idle' && (

        <div className="grid gap-6 lg:grid-cols-[0.95fr_0.55fr]">

          {/* SOS BUTTON */}

          <div className="rounded-[2rem] border border-[#1E1E35] bg-[#11121F] p-8 shadow-[0_35px_60px_-45px_rgba(16,24,40,0.8)] text-center">

            <div className="mx-auto flex h-52 w-52 items-center justify-center rounded-full bg-gradient-to-br from-[#EF4444] to-[#DC2626] shadow-lg shadow-[#EF4444]/20">

              <Mic2 className="w-20 h-20 text-white" />

            </div>

            <h2 className="mt-8 text-3xl font-semibold text-white">
              Activate SOS
            </h2>

            <p className="mt-4 text-sm leading-6 text-[#94A3B8]">
              Press the button to capture your GPS location and alert your emergency contact.
            </p>

            <button
              onClick={handleActivate}
              disabled={isLoading}
              className="mt-10 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#EF4444] to-[#DC2626] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-[#EF4444]/20 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
            >

              {isLoading
                ? 'Getting Location...'
                : 'Activate SOS'}

            </button>

          </div>

          {/* CONTACTS */}

          <div className="space-y-4">

            <div className="rounded-[2rem] border border-[#1E1E35] bg-[#12121F] p-6">

              <p className="text-sm uppercase tracking-[0.3em] text-[#94A3B8]">
                Emergency Contacts
              </p>

              <div className="mt-5 space-y-3">

                {emergencyContacts.map(
                  (contact, index) => (

                    <div
                      key={index}
                      className="rounded-[1.5rem] bg-[#0D1020] p-4 flex items-center justify-between gap-3"
                    >

                      <div>

                        <p className="font-semibold text-white">
                          {contact.name}
                        </p>

                        <p className="text-sm text-[#94A3B8]">
                          {contact.phone}
                        </p>

                      </div>

                      <Phone className="w-5 h-5 text-[#7C3AED]" />

                    </div>

                  )
                )}

              </div>

            </div>

            <div className="rounded-[2rem] border border-[#1E1E35] bg-[#12121F] p-6">

              <p className="text-sm uppercase tracking-[0.3em] text-[#94A3B8]">
                Safety tip
              </p>

              <p className="mt-4 text-sm leading-6 text-[#94A3B8]">
                Keep your phone accessible and move toward a public or well-lit area while help is being contacted.
              </p>

            </div>

          </div>

        </div>

      )}

      {/* ================================================= */}
      {/* ACTIVATED */}
      {/* ================================================= */}

      {sosState === 'activated' && (

        <div className="rounded-[2rem] border border-[#1E1E35] bg-[#11121F] p-8 shadow-[0_35px_60px_-45px_rgba(16,24,40,0.8)] text-center">

          <p className="text-sm uppercase tracking-[0.3em] text-[#94A3B8]">
            SOS Active
          </p>

          <div className="mt-6 text-8xl font-bold text-[#EF4444]">
            {countdown}
          </div>

          <p className="mt-4 text-sm text-[#94A3B8]">
            Emergency SMS will be sent automatically when the countdown reaches zero.
          </p>

          {/* STATUS */}

          <div className="mt-8 space-y-3">

            {statusItems.map(
              (item, index) => (

                <div
                  key={index}
                  className="flex items-center gap-3 rounded-[1.5rem] bg-[#0D1020] p-4 text-left text-[#F1F5F9]"
                >

                  <CheckCircle2 className="w-5 h-5 text-[#10B981]" />

                  <span>
                    {item}
                  </span>

                </div>

              )
            )}

          </div>

          {/* LOCATION */}

          {location && (

            <div className="mt-6 rounded-[1.5rem] bg-[#0D1020] p-5 text-left">

              <div className="flex items-center gap-3">

                <MapPin className="w-5 h-5 text-[#7C3AED]" />

                <div>

                  <p className="font-semibold text-white">
                    GPS Location Captured
                  </p>

                  <p className="mt-1 text-xs text-[#94A3B8]">

                    {location.latitude.toFixed(6)}
                    {', '}
                    {location.longitude.toFixed(6)}

                  </p>

                </div>

              </div>

            </div>

          )}

          {/* CANCEL */}

          <button
            onClick={resetSOS}
            className="mt-8 rounded-full border border-[#EF4444] px-8 py-3 text-sm font-semibold text-[#EF4444] hover:bg-[#EF4444]/10 transition"
          >
            Cancel SOS
          </button>

        </div>

      )}

      {/* ================================================= */}
      {/* SENT */}
      {/* ================================================= */}

      {sosState === 'sent' && (

        <div className="rounded-[2rem] border border-[#1E1E35] bg-[#11121F] p-8 shadow-[0_35px_60px_-45px_rgba(16,24,40,0.8)] text-center">

          {/* SUCCESS */}

          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#10B981]/15 text-[#10B981]">

            <CheckCircle2 className="w-10 h-10" />

          </div>

          <h2 className="text-3xl font-semibold text-white">
            SOS Alert Sent
          </h2>

          <p className="mt-4 text-sm leading-6 text-[#94A3B8]">
            Your emergency SMS has been sent automatically with your current GPS location.
          </p>

          {/* DETAILS */}

          <div className="mt-8 space-y-4 text-left">

            {/* SMS */}

            <div className="flex items-center justify-between rounded-[1.5rem] bg-[#0D1020] p-4 text-sm text-[#F1F5F9]">

              <div className="flex items-center gap-3">

                <Phone className="w-5 h-5 text-[#7C3AED]" />

                <span>
                  Emergency SMS
                </span>

              </div>

              <span className="font-semibold text-[#10B981]">
                Sent
              </span>

            </div>

            {/* LOCATION */}

            <div className="flex items-center justify-between rounded-[1.5rem] bg-[#0D1020] p-4 text-sm text-[#F1F5F9]">

              <div className="flex items-center gap-3">

                <MapPin className="w-5 h-5 text-[#7C3AED]" />

                <span>
                  Location Shared
                </span>

              </div>

              <span className="font-semibold text-[#10B981]">
                GPS
              </span>

            </div>

            {/* AUDIO */}

            <div className="flex items-center justify-between rounded-[1.5rem] bg-[#0D1020] p-4 text-sm text-[#F1F5F9]">

              <div className="flex items-center gap-3">

                <Mic2 className="w-5 h-5 text-[#7C3AED]" />

                <span>
                  Audio Recording
                </span>

              </div>

              <span className="font-semibold text-white">
                Ready
              </span>

            </div>

          </div>

          {/* CALL 112 */}

          <button
            onClick={call112}
            className="mt-8 w-full flex items-center justify-center gap-2 rounded-full bg-[#EF4444] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >

            <Phone className="w-5 h-5" />

            Call 112

          </button>

          {/* SAFE */}

          <button
            onClick={resetSOS}
            className="mt-4 rounded-full bg-[#10B981] px-8 py-3 text-sm font-semibold text-white hover:bg-[#059669] transition"
          >

            I'm Safe Now

          </button>

        </div>

      )}

    </div>
  )
}