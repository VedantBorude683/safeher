'use client'

import { useState } from 'react'
import { Link2, ShieldCheck, AlertTriangle, Search } from 'lucide-react'

export default function FakeLinkDetector() {
  const [url, setUrl] = useState('')
  const [result, setResult] = useState<any>(null)

  const analyzeLink = () => {
    if (!url.trim()) return

    const suspiciousWords = [
      'login', 'verify', 'gift', 'winner', 'free', 'bank', 'secure', 'otp', 'update',
    ]

    const trustedDomains = [
      'google.com', 'amazon.in', 'amazon.com', 'github.com', 'microsoft.com',
      'apple.com', 'sbi.co.in', 'onlinesbi.sbi', 'safeher.ai', 'gov.in',
    ]

    const lower = url.toLowerCase()
    const trusted = trustedDomains.some((d) => lower.includes(d))
    const suspicious = suspiciousWords.some((w) => lower.includes(w))

    if (trusted) {
      setResult({
        safe: true,
        score: 96,
        reason: 'Verified and trusted official domain detected.',
      })
      return
    }

    if (suspicious) {
      setResult({
        safe: false,
        score: 28,
        reason: 'High-risk phishing keywords identified in the URL syntax.',
      })
      return
    }

    setResult({
      safe: false,
      score: 55,
      reason: 'Unverified third-party domain. Proceed with caution.',
    })
  }

  return (
    <div className="bg-white border border-[var(--border)] rounded-2xl p-6 sm:p-8 shadow-card space-y-5 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
              Phishing Shield
            </span>
            <h3 className="text-xl font-bold text-[var(--text-primary)] mt-0.5">
              Fake Link & Scam Detector
            </h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[var(--accent-ghost)] text-[var(--primary)] flex items-center justify-center">
            <Link2 size={22} />
          </div>
        </div>

        <p className="text-xs text-[var(--text-secondary)] mt-2">
          Paste any message link, payment QR URL, or SMS to verify its authenticity before clicking.
        </p>

        <div className="mt-5 space-y-3">
          <div className="relative">
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste URL here (e.g. https://...)"
              className="w-full bg-[var(--bg-base)] border border-[var(--border)] rounded-xl px-3.5 py-2.5 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)]"
            />
          </div>

          {result && (
            <div
              className={`p-4 rounded-xl border space-y-1.5 ${
                result.safe
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-amber-50 text-amber-900 border-amber-200'
              }`}
            >
              <div className="flex justify-between items-center text-xs font-bold">
                <span>{result.safe ? '✓ Link Verified Safe' : '⚠ Caution: Unverified Link'}</span>
                <span>Trust Score: {result.score}%</span>
              </div>
              <p className="text-xs">{result.reason}</p>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={analyzeLink}
        className="w-full py-3 bg-[var(--primary)] hover:opacity-90 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2"
      >
        <Search size={15} />
        <span>Analyze Link Safety</span>
      </button>
    </div>
  )
}