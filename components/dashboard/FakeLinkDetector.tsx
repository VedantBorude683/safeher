"use client";

import { useState } from "react";
import {
  Link2,
  ShieldCheck,
  AlertTriangle,
  Search,
} from "lucide-react";

export default function FakeLinkDetector() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<any>(null);

  const analyzeLink = () => {
    if (!url.trim()) return;

    const suspiciousWords = [
      "login",
      "verify",
      "gift",
      "winner",
      "free",
      "bank",
      "secure",
      "otp",
      "update",
    ];

    const trustedDomains = [
      "google.com",
      "amazon.in",
      "amazon.com",
      "github.com",
      "microsoft.com",
      "apple.com",
      "sbi.co.in",
      "onlinesbi.sbi",
    ];

    const lower = url.toLowerCase();

    const trusted = trustedDomains.some((d) =>
      lower.includes(d)
    );

    const suspicious = suspiciousWords.some((w) =>
      lower.includes(w)
    );

    if (trusted) {
      setResult({
        safe: true,
        score: 96,
        reason: "Trusted domain detected.",
      });

      return;
    }

    if (suspicious) {
      setResult({
        safe: false,
        score: 28,
        reason:
          "Suspicious keywords detected in the URL.",
      });

      return;
    }

    setResult({
      safe: false,
      score: 55,
      reason:
        "Unknown website. Verify before opening.",
    });
  };

  return (
    <div className="mt-10 bg-[#11111A] border border-[#2A2A40] rounded-3xl p-8">

      <div className="flex items-center gap-3">

        <Link2 className="text-purple-400" />

        <div>

          <p className="uppercase tracking-[4px] text-xs text-gray-500">
            Cyber AI
          </p>

          <h2 className="text-3xl font-bold">
            Fake Link Detector
          </h2>

        </div>

      </div>

      <div className="flex gap-3 mt-8">

        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste website URL..."
          className="flex-1 rounded-xl bg-[#191925] border border-[#2A2A40] p-4 outline-none"
        />

        <button
          onClick={analyzeLink}
          className="bg-purple-600 px-6 rounded-xl font-semibold hover:bg-purple-700"
        >
          <Search size={20}/>
        </button>

      </div>

      {result && (

        <div className="mt-8 rounded-xl bg-[#191925] p-6">

          <div className="flex items-center gap-3">

            {result.safe ? (
              <ShieldCheck className="text-green-500"/>
            ) : (
              <AlertTriangle className="text-red-500"/>
            )}

            <h3 className="text-2xl font-bold">

              {result.safe
                ? "SAFE WEBSITE"
                : "HIGH RISK"}

            </h3>

          </div>

          <p className="mt-4">

            AI Confidence

            <span className="font-bold ml-2">

              {result.score}%

            </span>

          </p>

          <p className="text-gray-400 mt-3">

            {result.reason}

          </p>

        </div>

      )}

    </div>
  );
}