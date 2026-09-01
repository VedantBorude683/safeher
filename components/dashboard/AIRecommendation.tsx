'use client'

import { Brain, ArrowRight, ShieldAlert, CheckCircle2 } from 'lucide-react'

export default function AIRecommendation() {
  return (
    <div className="bg-white border border-[var(--border)] rounded-2xl p-6 sm:p-8 shadow-card space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
            Predictive Model Reasoning
          </span>
          <h2 className="text-xl font-bold text-[var(--text-primary)] mt-0.5">
            AI Safety Recommendations
          </h2>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-[var(--accent-ghost)] text-[var(--primary)] border border-[var(--accent-light)]">
          Real-time Engine
        </span>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* WHY RISK CHANGED */}
        <div className="p-5 rounded-xl bg-[var(--bg-base)] border border-[var(--border)] space-y-3">
          <h3 className="text-sm font-bold text-[var(--text-primary)]">
            Identified Environmental Factors
          </h3>
          <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
            <li className="flex items-center gap-2">
              <span>🌙</span> Night transit window (after 9:00 PM)
            </li>
            <li className="flex items-center gap-2">
              <span>💡</span> Reduced municipal streetlight intensity on cross-streets
            </li>
            <li className="flex items-center gap-2">
              <span>📉</span> Lower pedestrian frequency in secondary alleys
            </li>
            <li className="flex items-center gap-2">
              <span>👮</span> Nearest verified police post 650m away
            </li>
          </ul>
        </div>

        {/* RECOMMENDED ACTIONS */}
        <div className="p-5 rounded-xl bg-[var(--accent-ghost)] border border-[var(--accent-light)] space-y-3">
          <div className="flex items-center gap-2 text-[var(--primary)]">
            <ShieldAlert size={18} />
            <h3 className="text-sm font-bold">Suggested User Precautions</h3>
          </div>
          <div className="space-y-2 text-xs text-[var(--text-secondary)]">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-[var(--primary)] shrink-0" />
              <span>Prioritize FC Road main arterial avenue</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-[var(--primary)] shrink-0" />
              <span>Keep Voice SOS standby armed</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-[var(--primary)] shrink-0" />
              <span>Share live tracking token with trusted contacts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}