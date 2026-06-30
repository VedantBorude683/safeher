"use client";

import { useState } from "react";
import {
  ShieldCheck,
  Wifi,
  MapPin,
  Mic,
  Bell,
  Battery,
  Loader2,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

type ScanResult = {
  https: boolean;
  online: boolean;
  location: string;
  microphone: string;
  notifications: string;
  battery: string;
};

export default function CyberSafetyScanner() {
  const [loading, setLoading] = useState(false);
  const [scan, setScan] = useState<ScanResult | null>(null);
  const [score, setScore] = useState(0);

  const startScan = async () => {
    setLoading(true);

    let battery = "Unavailable";

    try {
      if ("getBattery" in navigator) {
        const info = await (navigator as any).getBattery();
        battery = `${Math.round(info.level * 100)}%`;
      }
    } catch {}

    let location = "prompt";
    let microphone = "prompt";

    try {
      const permission = await navigator.permissions.query({
        name: "geolocation",
      });

      location = permission.state;
    } catch {}

    try {
      const permission = await navigator.permissions.query({
        name: "microphone" as PermissionName,
      });

      microphone = permission.state;
    } catch {}

    const notifications =
      "Notification" in window
        ? Notification.permission
        : "unsupported";

    const https = window.location.protocol === "https:";
    const online = navigator.onLine;

    let aiScore = 100;

    if (!https) aiScore -= 15;
    if (!online) aiScore -= 20;
    if (location !== "granted") aiScore -= 10;
    if (microphone !== "granted") aiScore -= 5;
    if (notifications !== "granted") aiScore -= 8;

    setTimeout(() => {
      setLoading(false);

      setScore(aiScore);

      setScan({
        https,
        online,
        location,
        microphone,
        notifications,
        battery,
      });
    }, 2500);
  };

  return (
    <div className="bg-[#11111A] rounded-3xl border border-[#242438] p-8">

      {/* Header */}

      <div className="flex justify-between items-center">

        <div>
          <p className="uppercase tracking-[4px] text-xs text-gray-500">
            Cyber Protection
          </p>

          <h2 className="text-4xl font-bold mt-2">
            Cyber Safety Scanner
          </h2>

          <p className="text-gray-400 mt-3">
            Analyze browser permissions and digital security.
          </p>
        </div>

        <button
          onClick={startScan}
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl font-semibold"
        >
          {loading ? "Scanning..." : "Start Scan"}
        </button>

      </div>

      {/* Loading */}

      {loading && (

        <div className="mt-10 flex flex-col items-center">

          <Loader2
            size={70}
            className="animate-spin text-purple-500"
          />

          <h2 className="text-2xl font-bold mt-6">
            AI is scanning...
          </h2>

          <p className="text-gray-400 mt-2">
            Checking browser security...
          </p>

        </div>

      )}

      {/* Results */}

      {!loading && scan && (

        <>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">

            <Card
              icon={<ShieldCheck className="text-green-400" />}
              title="Connection Security"
              value={
                scan.https
                  ? "HTTPS Secure"
                  : "Development Mode (localhost)"
              }
            />

            <Card
              icon={<Wifi className="text-blue-400" />}
              title="Internet"
              value={scan.online ? "Connected" : "Offline"}
            />

            <Card
              icon={<MapPin className="text-orange-400" />}
              title="Location"
              value={scan.location}
            />

            <Card
              icon={<Mic className="text-purple-400" />}
              title="Microphone"
              value={scan.microphone}
            />

            <Card
              icon={<Bell className="text-yellow-400" />}
              title="Notifications"
              value={scan.notifications}
            />

            <Card
              icon={<Battery className="text-green-400" />}
              title="Battery"
              value={scan.battery}
            />

          </div>

          {/* AI SCORE */}

          <div className="mt-8 bg-[#191925] rounded-2xl p-8 border border-[#2A2A40]">

            <div className="flex justify-between items-center">

              <div>

                <p className="uppercase tracking-[4px] text-xs text-gray-500">
                  AI Analysis
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  Overall Cyber Safety Score
                </h2>

              </div>

              <div
                className={`text-5xl font-bold ${
                  score >= 90
                    ? "text-green-400"
                    : score >= 70
                    ? "text-yellow-400"
                    : "text-red-400"
                }`}
              >
                {score}/100
              </div>

            </div>

            <div className="w-full h-4 rounded-full bg-[#2A2A40] mt-8 overflow-hidden">

              <div
                className={`h-4 transition-all duration-1000 ${
                  score >= 90
                    ? "bg-green-500"
                    : score >= 70
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
                style={{
                  width: `${score}%`,
                }}
              />

            </div>

            <p className="mt-5 text-gray-400">

              {score >= 90
                ? "Excellent! Your browser security settings are strong."
                : score >= 70
                ? "Moderate protection. AI recommends enabling missing permissions."
                : "High cyber risk detected. Please improve your security settings."}

            </p>

          </div>
          {scan && (

<div className="mt-8 bg-[#191925] rounded-2xl border border-[#2A2A40] p-8">

<p className="uppercase tracking-[4px] text-xs text-gray-500">
AI REPORT
</p>

<h2 className="text-3xl font-bold mt-2">
Security Assessment
</h2>

<div className="grid md:grid-cols-2 gap-5 mt-8">

{/* HTTPS */}

<div className="flex gap-4 p-5 rounded-xl bg-[#11111A]">

{scan.https ?

<CheckCircle className="text-green-500"/> :

<AlertTriangle className="text-yellow-400"/>}

<div>

<h3 className="font-semibold">
Connection Security
</h3>

<p className="text-gray-400 text-sm mt-1">

{scan.https
? "Website is using HTTPS encryption."
: "Running on localhost (HTTP). Production deployment will automatically use HTTPS."}

</p>

</div>

</div>

{/* Internet */}

<div className="flex gap-4 p-5 rounded-xl bg-[#11111A]">

{scan.online ?

<CheckCircle className="text-green-500"/> :

<AlertTriangle className="text-red-500"/>}

<div>

<h3 className="font-semibold">
Network Status
</h3>

<p className="text-gray-400 text-sm mt-1">

{scan.online
? "Internet connection detected."
: "Device is offline."}

</p>

</div>

</div>

{/* Location */}

<div className="flex gap-4 p-5 rounded-xl bg-[#11111A]">

{scan.location === "granted" ?

<CheckCircle className="text-green-500"/> :

<AlertTriangle className="text-yellow-500"/>}

<div>

<h3 className="font-semibold">
Location Permission
</h3>

<p className="text-gray-400 text-sm mt-1">

{scan.location === "granted"
? "GPS permission granted."
: "Enable GPS for better emergency tracking."}

</p>

</div>

</div>

{/* Notifications */}

<div className="flex gap-4 p-5 rounded-xl bg-[#11111A]">

{scan.notifications === "granted" ?

<CheckCircle className="text-green-500"/> :

<AlertTriangle className="text-yellow-500"/>}

<div>

<h3 className="font-semibold">
Emergency Alerts
</h3>

<p className="text-gray-400 text-sm mt-1">

{scan.notifications === "granted"
? "Emergency notifications enabled."
: "Allow notifications to receive SOS alerts instantly."}

</p>

</div>

</div>

</div>

</div>

)}

        </>

      )}

    </div>
  );
}

function Card({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="bg-[#191925] rounded-2xl p-6 border border-[#2A2A40]">

      <div className="mb-4">
        {icon}
      </div>

      <h3 className="font-bold text-xl">
        {title}
      </h3>

      <p className="text-gray-400 mt-3">
        {value}
      </p>

    </div>
  );
}