"use client";

import {
  Battery,
  Wifi,
  Mic,
  MapPin,
  Activity,
  Smartphone,
} from "lucide-react";

const sensors = [
  {
    icon: Activity,
    title: "Accelerometer",
    status: "Active",
    color: "text-green-400",
  },
  {
    icon: MapPin,
    title: "GPS",
    status: "Tracking",
    color: "text-blue-400",
  },
  {
    icon: Mic,
    title: "Microphone",
    status: "Listening",
    color: "text-purple-400",
  },
  {
    icon: Wifi,
    title: "Internet",
    status: "Connected",
    color: "text-cyan-400",
  },
  {
    icon: Battery,
    title: "Battery",
    status: "82%",
    color: "text-yellow-400",
  },
  {
    icon: Smartphone,
    title: "Emergency Mode",
    status: "Standby",
    color: "text-pink-400",
  },
];

export default function SensorPanel() {
  return (
    <div className="mt-10 bg-[#11111A] border border-[#202030] rounded-2xl p-8">

      <div className="flex items-center justify-between mb-8">

        <div>
          <p className="uppercase tracking-[4px] text-xs text-gray-500">
            Live Sensors
          </p>

          <h2 className="text-3xl font-bold mt-2">
            Device Monitoring
          </h2>
        </div>

        <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-semibold">
          LIVE
        </span>

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {sensors.map((sensor, index) => {
          const Icon = sensor.icon;

          return (
            <div
              key={index}
              className="bg-[#191925] rounded-xl border border-[#2A2A3A] p-5 hover:border-purple-500 transition"
            >
              <div className="flex justify-between items-center">

                <Icon
                  size={30}
                  className={sensor.color}
                />

                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>

              </div>

              <h3 className="text-lg font-semibold mt-5">
                {sensor.title}
              </h3>

              <p className={`${sensor.color} mt-2 font-medium`}>
                {sensor.status}
              </p>

            </div>
          );
        })}
      </div>
    </div>
  );
}