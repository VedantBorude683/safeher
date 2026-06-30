"use client";

import { useState } from "react";
import GuardianTimeline from "./GuardianTimeline"
import SensorPanel from "./SensorPanel";
import AIRecommendation from "./AIRecommendation";
import CyberSafetyScanner from "./CyberSafetyScanner";
import FakeLinkDetector from "./FakeLinkDetector";
import {
  Shield,
  Activity,
  MapPin,
  Phone,
  AlertTriangle,
  Mic,
  CheckCircle,
} from "lucide-react";

export default function GuardianAI() {
  const [guardian, setGuardian] = useState(true);

  return (
    <div className="p-8 bg-[#06060A] min-h-screen text-white">

      {/* Heading */}

      <div className="flex justify-between items-center mb-8">

        <div>
          <p className="uppercase tracking-[6px] text-xs text-gray-500">
            Guardian AI
          </p>

          <h1 className="text-5xl font-bold mt-2">
            Smart Protection Center
          </h1>

          <p className="text-gray-400 mt-3">
            AI continuously monitors your safety and automatically reacts during
            emergencies.
          </p>
        </div>

        <button
          onClick={() => setGuardian(!guardian)}
          className={`px-6 py-3 rounded-full font-semibold transition ${
            guardian
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {guardian ? "Guardian ON" : "Guardian OFF"}
        </button>
       
      </div>

      {/* Status Cards */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-[#11111A] border border-[#202030] rounded-2xl p-6">

          <Shield className="text-purple-400 mb-4" size={34} />

          <p className="text-gray-400">Guardian Status</p>

          <h2 className="text-3xl font-bold mt-2">
            {guardian ? "ACTIVE" : "OFF"}
          </h2>

        </div>

        <div className="bg-[#11111A] border border-[#202030] rounded-2xl p-6">

          <Activity className="text-green-400 mb-4" size={34} />

          <p className="text-gray-400">Motion Detection</p>

          <h2 className="text-3xl font-bold mt-2">
            Enabled
          </h2>

        </div>

        <div className="bg-[#11111A] border border-[#202030] rounded-2xl p-6">

          <MapPin className="text-orange-400 mb-4" size={34} />

          <p className="text-gray-400">Unsafe Zone Detection</p>

          <h2 className="text-3xl font-bold mt-2">
            Live
          </h2>

        </div>

        <div className="bg-[#11111A] border border-[#202030] rounded-2xl p-6">

          <Phone className="text-pink-500 mb-4" size={34} />

          <p className="text-gray-400">Emergency Contacts</p>

          <h2 className="text-3xl font-bold mt-2">
            3 Saved
          </h2>

        </div>

      </div>

      {/* AI Monitoring */}

      <div className="mt-10 bg-[#11111A] border border-[#202030] rounded-2xl p-8">

        <div className="flex items-center gap-3">

          <Activity className="text-green-400" />

          <h2 className="text-3xl font-bold">
            Live Guardian Monitoring
          </h2>

        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">

          <div className="bg-[#191925] rounded-xl p-6">

            <CheckCircle className="text-green-500 mb-3"/>

            <h3 className="text-xl font-semibold">
              Motion Detection
            </h3>

            <p className="text-gray-400 mt-2">
              User is moving normally.
            </p>

          </div>

          <div className="bg-[#191925] rounded-xl p-6">

            <MapPin className="text-yellow-400 mb-3"/>

            <h3 className="text-xl font-semibold">
              Current Area
            </h3>

            <p className="text-gray-400 mt-2">
              Koregaon Park • Medium Risk
            </p>

          </div>

          <div className="bg-[#191925] rounded-xl p-6">

            <Mic className="text-purple-400 mb-3"/>

            <h3 className="text-xl font-semibold">
              Voice Monitoring
            </h3>

            <p className="text-gray-400 mt-2">
              Listening for "Help Me"
            </p>

          </div>

          <div className="bg-[#191925] rounded-xl p-6">

            <AlertTriangle className="text-red-500 mb-3"/>

            <h3 className="text-xl font-semibold">
              Fall Detection
            </h3>

            <p className="text-gray-400 mt-2">
              No abnormal activity detected.
            </p>

          </div>

        </div>

      </div>
      {/* Guardian Timeline */}

<div className="mt-10">
  <GuardianTimeline />
</div>
<SensorPanel />
<AIRecommendation />
<CyberSafetyScanner />
<FakeLinkDetector />

      {/* Emergency Flow */}

      <div className="mt-10 bg-[#11111A] border border-[#202030] rounded-2xl p-8">

        <h2 className="text-3xl font-bold mb-6">
          AI Emergency Workflow
        </h2>

        <div className="space-y-5">

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
              1
            </div>

            <p>
              Detect unusual inactivity or sudden fall.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
              2
            </div>

            <p>
              AI asks: <b>"Are you safe?"</b>
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
              3
            </div>

            <p>
              Waits 10 seconds for response.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
              4
            </div>

            <p>
              Sends Live Location to Emergency Contacts.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center">
              5
            </div>

            <p>
              Automatically activates SOS and emergency SMS.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}