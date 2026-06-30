'use client'

import { useState, useEffect } from 'react'
import { Mic2, CheckCircle2, MapPin, Phone } from 'lucide-react'
import { showToast } from '@/components/Toast'

type SOSState = 'idle' | 'activated' | 'sent'

const statusSequence = [
  'Location captured',
  'Contact alerts queued',
  'Audio recording enabled',
  'Responder notified',
]

export default function VoiceSOS({ user }: { user: any }) {
  const [sosState, setSosState] = useState<SOSState>('idle')
  const [countdown, setCountdown] = useState(10)
  const [statusItems, setStatusItems] = useState<string[]>([])

  useEffect(() => {
    if (sosState !== 'activated') return

    setStatusItems([])
    setCountdown(10)

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          setSosState('sent')
          showToast('SOS sent successfully!', 'success')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [sosState])

  useEffect(() => {
    if (sosState !== 'activated') return

    statusSequence.forEach((status, index) => {
      setTimeout(() => {
        setStatusItems((prev) => (prev.includes(status) ? prev : [...prev, status]))
      }, 400 * (index + 1))
    })
  }, [sosState])

  const handleActivate = () => {
    setSosState('activated')
  }

  const resetSOS = () => {
    setSosState('idle')
    setStatusItems([])
    setCountdown(10)
  }

  const emergencyContacts = user?.emergencyContacts || [
    { name: 'Rahul Kumar', phone: '+91 98765 43210' },
    { name: 'Mom', phone: '+91 87654 32109' },
  ]

  return (
    <div className="space-y-6 pb-24 md:pb-0">
      <div className="rounded-[2rem] border border-[#1E1E35] bg-[#11121F] p-8 shadow-[0_35px_60px_-45px_rgba(16,24,40,0.8)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#94A3B8]">Emergency SOS</p>
            <h1 className="mt-3 text-3xl font-semibold text-white md:text-4xl">Voice-Activated Assistance</h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-[#94A3B8]">
              Instantly alert your trusted contacts and responders using your voice or one tap.
            </p>
          </div>
          <div className="rounded-[2rem] bg-[#0E1020] p-5 text-center border border-[#2E2E48]">
            <p className="text-xs uppercase tracking-[0.3em] text-[#94A3B8]">Ready state</p>
            <p className="mt-3 text-2xl font-semibold text-white">Standby</p>
          </div>
        </div>
      </div>

      {sosState === 'idle' && (
        <div className="grid gap-6 lg:grid-cols-[0.95fr_0.55fr]">
          <div className="rounded-[2rem] border border-[#1E1E35] bg-[#11121F] p-8 shadow-[0_35px_60px_-45px_rgba(16,24,40,0.8)] text-center">
            <div className="mx-auto flex h-52 w-52 items-center justify-center rounded-full bg-gradient-to-br from-[#EF4444] to-[#DC2626] shadow-lg shadow-[#EF4444]/20">
              <Mic2 className="w-20 h-20 text-white" />
            </div>
            <h2 className="mt-8 text-3xl font-semibold text-white">Activate SOS</h2>
            <p className="mt-4 text-sm leading-6 text-[#94A3B8]">
              Press the button or say “Help me” to immediately share your location and alert your emergency circle.
            </p>
            <button
              onClick={handleActivate}
              className="mt-10 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#EF4444] to-[#DC2626] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-[#EF4444]/20 transition hover:opacity-95"
            >
              Activate SOS
            </button>
          </div>

          <div className="space-y-4">
            <div className="rounded-[2rem] border border-[#1E1E35] bg-[#12121F] p-6 shadow-[0_35px_60px_-45px_rgba(16,24,40,0.8)]">
              <p className="text-sm uppercase tracking-[0.3em] text-[#94A3B8]">Emergency Contacts</p>
              <div className="mt-5 space-y-3">
                {emergencyContacts.map((contact: any, index: number) => (
                  <div key={index} className="rounded-[1.5rem] bg-[#0D1020] p-4 flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-white">{contact.name}</p>
                      <p className="text-sm text-[#94A3B8]">{contact.phone}</p>
                    </div>
                    <Phone className="w-5 h-5 text-[#7C3AED]" />
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[2rem] border border-[#1E1E35] bg-[#12121F] p-6 shadow-[0_35px_60px_-45px_rgba(16,24,40,0.8)]">
              <p className="text-sm uppercase tracking-[0.3em] text-[#94A3B8]">Safety tip</p>
              <p className="mt-4 text-sm leading-6 text-[#94A3B8]">
                Keep your phone accessible and maintain a short route to a public area until help arrives.
              </p>
            </div>
          </div>
        </div>
      )}

      {sosState === 'activated' && (
        <div className="rounded-[2rem] border border-[#1E1E35] bg-[#11121F] p-8 shadow-[0_35px_60px_-45px_rgba(16,24,40,0.8)] text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-[#94A3B8]">SOS Active</p>
          <div className="mt-6 text-8xl font-bold text-[#EF4444]">{countdown}</div>
          <p className="mt-4 text-sm text-[#94A3B8]">Sending emergency alerts and location in</p>
          <div className="mt-8 space-y-3">
            {statusItems.map((item, index) => (
              <div key={index} className="flex items-center gap-3 rounded-[1.5rem] bg-[#0D1020] p-4 text-left text-[#F1F5F9]">
                <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <button
            onClick={resetSOS}
            className="mt-8 rounded-full border border-[#EF4444] px-8 py-3 text-sm font-semibold text-[#EF4444] hover:bg-[#EF4444]/10 transition"
          >
            Cancel SOS
          </button>
        </div>
      )}

      {sosState === 'sent' && (
        <div className="rounded-[2rem] border border-[#1E1E35] bg-[#11121F] p-8 shadow-[0_35px_60px_-45px_rgba(16,24,40,0.8)] text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#10B981]/15 text-[#10B981]">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-semibold text-white">Help is on the way</h2>
          <p className="mt-4 text-sm leading-6 text-[#94A3B8]">
            Your emergency contacts have been notified and responders are being alerted to your location.
          </p>
          <div className="mt-8 space-y-4 text-left">
            {[
              { icon: Phone, label: 'Contacts Notified', value: `${emergencyContacts.length} people` },
              { icon: MapPin, label: 'Location Shared', value: 'Koregaon Park, Pune' },
              { icon: Mic2, label: 'Audio Recording', value: 'Enabled' },
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <div key={index} className="flex items-center justify-between rounded-[1.5rem] bg-[#0D1020] p-4 text-sm text-[#F1F5F9]">
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-[#7C3AED]" />
                    <span>{item.label}</span>
                  </div>
                  <span className="font-semibold text-white">{item.value}</span>
                </div>
              )
            })}
          </div>
          <button
            onClick={resetSOS}
            className="mt-8 rounded-full bg-[#10B981] px-8 py-3 text-sm font-semibold text-white hover:bg-[#059669] transition"
          >
            I&apos;m Safe Now
          </button>
        </div>
      )}
    </div>
  )
}
