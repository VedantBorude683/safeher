"use client";

import { Brain, ArrowRight, ShieldAlert } from "lucide-react";

export default function AIRecommendation() {
  return (
    <div className="mt-10 bg-[#11111A] border border-[#202030] rounded-2xl p-8">

      <div className="flex items-center gap-3 mb-8">

        <Brain className="text-purple-400" size={32} />

        <div>
          <p className="uppercase tracking-[4px] text-xs text-gray-500">
            Artificial Intelligence
          </p>

          <h2 className="text-3xl font-bold">
            AI Recommendation
          </h2>
        </div>

      </div>

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Why Risk Increased */}

        <div className="bg-[#191925] rounded-xl p-6 border border-[#2A2A3A]">

          <h3 className="text-xl font-semibold mb-5">
            Why Risk Increased?
          </h3>

          <ul className="space-y-4 text-gray-300">

            <li>🌙 Night Time (10:45 PM)</li>

            <li>💡 Poor Street Lighting</li>

            <li>📉 Low Crowd Density</li>

            <li>🚨 3 Previous Incidents Nearby</li>

            <li>🚓 Police Patrol Frequency Low</li>

          </ul>

        </div>

        {/* AI Recommendation */}

        <div className="bg-gradient-to-br from-purple-900/40 to-pink-900/30 border border-purple-500 rounded-xl p-6">

          <div className="flex items-center gap-3 mb-5">

            <ShieldAlert
              className="text-yellow-400"
              size={30}
            />

            <h3 className="text-xl font-semibold">
              AI Recommendation
            </h3>

          </div>

          <div className="space-y-4">

            <div className="flex items-center gap-3">

              <ArrowRight className="text-green-400" />

              <span>
                Take FC Road instead of Lane 4
              </span>

            </div>

            <div className="flex items-center gap-3">

              <ArrowRight className="text-green-400" />

              <span>
                Enable Voice SOS
              </span>

            </div>

            <div className="flex items-center gap-3">

              <ArrowRight className="text-green-400" />

              <span>
                Share Live Location with trusted contact
              </span>

            </div>

            <div className="flex items-center gap-3">

              <ArrowRight className="text-green-400" />

              <span>
                Estimated Safety Improvement +43%
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}