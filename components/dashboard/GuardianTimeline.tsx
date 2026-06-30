'use client'

import {
  Activity,
  MapPin,
  ShieldAlert,
  Siren,
  CheckCircle2,
} from "lucide-react"

const events = [
  {
    time: "06:30 PM",
    title: "Walking Normally",
    desc: "Motion sensor detected normal movement.",
    color: "text-green-400",
    icon: CheckCircle2,
  },
  {
    time: "06:32 PM",
    title: "Entered Medium Risk Area",
    desc: "AI detected a higher-risk zone nearby.",
    color: "text-yellow-400",
    icon: MapPin,
  },
  {
    time: "06:33 PM",
    title: "Motion Stopped",
    desc: "No movement detected for 45 seconds.",
    color: "text-orange-400",
    icon: Activity,
  },
  {
    time: "06:34 PM",
    title: "Voice Check Triggered",
    desc: 'Guardian AI asked "Are you safe?"',
    color: "text-blue-400",
    icon: ShieldAlert,
  },
  {
    time: "06:35 PM",
    title: "Emergency SOS Ready",
    desc: "Emergency contacts prepared for alert.",
    color: "text-red-400",
    icon: Siren,
  },
]

export default function GuardianTimeline() {
  return (
    <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-3xl p-8">

      <div className="flex items-center gap-3 mb-8">

        <Activity className="text-green-400" size={30} />

        <div>
          <p className="uppercase tracking-[0.3em] text-xs text-gray-400">
            Guardian AI
          </p>

          <h2 className="text-3xl font-bold">
            Live Timeline
          </h2>
        </div>

      </div>

      <div className="relative ml-5">

        <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-purple-700"></div>

        <div className="space-y-10">

          {events.map((event, index) => {

            const Icon = event.icon

            return (

              <div
                key={index}
                className="relative flex gap-6"
              >

                <div className="relative z-10">

                  <div className="w-8 h-8 rounded-full bg-[var(--bg-base)] border-2 border-purple-600 flex items-center justify-center">

                    <Icon
                      size={16}
                      className={event.color}
                    />

                  </div>

                </div>

                <div className="flex-1">

                  <p className="text-xs text-gray-500 mb-1">
                    {event.time}
                  </p>

                  <h3 className={`font-bold text-lg ${event.color}`}>
                    {event.title}
                  </h3>

                  <p className="text-gray-400 mt-1">
                    {event.desc}
                  </p>

                </div>

              </div>

            )

          })}

        </div>

      </div>

    </div>
  )
}