'use client'

import { useState } from 'react'
import { Phone, MapPin, Info, Search } from 'lucide-react'

const helplines = [
  { id: 112, name: 'National Emergency', icon: '🚔', label: 'Police & medical' },
  { id: 181, name: 'Women Helpline (Shakti)', icon: '👩', label: 'Counseling & support' },
  { id: 1091, name: 'Police Women Cell', icon: '👮', label: 'Immediate police response' },
  { id: 7827170170, name: 'Cyber Crime Helpline', icon: '💻', label: 'Online abuse reporting' },
  { id: 14567, name: 'Elder/Women Abuse', icon: '⚖️', label: 'Legal assistance' },
  { id: 1098, name: 'Child Helpline', icon: '👶', label: 'Child protection' },
]

const nearbyPlaces = [
  { type: 'Police Station', name: 'Koregaon Police Chowki', distance: '0.5 km', rating: 4.2 },
  { type: 'Hospital', name: 'Ruby Hall Clinic', distance: '1.2 km', rating: 4.7 },
  { type: 'One Stop Centre', name: 'Pune OSC', distance: '0.8 km', rating: 4.3 },
  { type: 'Police Station', name: 'Pune City Police HQ', distance: '2.1 km', rating: 4.5 },
  { type: 'Hospital', name: 'Apollo Hospitals', distance: '3.8 km', rating: 4.8 },
]

const schemes = [
  {
    name: 'Beti Bachao Beti Padhao',
    description: 'Initiative to improve gender ratio and education for girls',
  },
  {
    name: 'One Stop Centre Scheme',
    description: 'Integrated support for women affected by violence',
  },
  {
    name: 'PM Ujjwala Yojana',
    description: 'Cooking fuel access program to empower women',
  },
  {
    name: 'Nirbhaya Fund',
    description: 'Fund supporting women safety and security services',
  },
]

export default function GovServices() {
  const [activeTab, setActiveTab] = useState('helplines')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredHelplines = helplines.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.label.toLowerCase().includes(searchQuery.toLowerCase()),
  )
  const filteredPlaces = nearbyPlaces.filter((place) =>
    place.name.toLowerCase().includes(searchQuery.toLowerCase()) || place.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )
  const filteredSchemes = schemes.filter((scheme) =>
    scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) || scheme.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6 pb-24 md:pb-0">
      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-[2rem] border border-[#1E1E35] bg-[#11121F] p-8 shadow-[0_35px_60px_-45px_rgba(16,24,40,0.8)]">
          <p className="text-sm uppercase tracking-[0.3em] text-[#94A3B8]">Government Services</p>
          <h1 className="mt-4 text-3xl font-semibold text-white">Essential safety resources</h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-[#94A3B8]">
            Find helplines, nearby support centers, and government schemes designed to protect and empower women.
          </p>
          <div className="mt-8 rounded-[1.75rem] border border-[#1E1E35] bg-[#0E1020] p-4 flex items-center gap-4">
            <Search className="h-5 w-5 text-[#94A3B8]" />
            <input
              type="text"
              placeholder="Search helplines, places, schemes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-sm text-[#F1F5F9] placeholder:text-[#64748B] focus:outline-none"
            />
          </div>

          <div className="mt-8 flex flex-col gap-4">
            <div className="rounded-[2rem] border border-[#1E1E35] bg-[#12121F] p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-[#94A3B8]">Hotline</p>
                  <h2 className="mt-2 text-xl font-semibold text-white">Emergency help at a tap</h2>
                </div>
                <div className="rounded-full bg-[#0F172A] px-4 py-2 text-xs font-semibold text-[#94A3B8]">Always available</div>
              </div>
              <p className="mt-4 text-sm text-[#94A3B8]">
                Call the right support line instantly — police, women’s assistance, cybercrime, or child protection.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[2rem] border border-[#1E1E35] bg-[#12121F] p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-[#94A3B8]">Fast access</p>
                <p className="mt-3 text-3xl font-semibold text-white">{helplines.length} lines</p>
                <p className="mt-3 text-sm text-[#94A3B8]">Available for immediate support across emergency and mental health services.</p>
              </div>
              <div className="rounded-[2rem] border border-[#1E1E35] bg-[#12121F] p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-[#94A3B8]">Nearby support</p>
                <p className="mt-3 text-3xl font-semibold text-white">{nearbyPlaces.length}</p>
                <p className="mt-3 text-sm text-[#94A3B8]">Police, hospitals, and one-stop centers to keep you safe and supported.</p>
              </div>
            </div>
          </div>
        </div>

        <aside className="rounded-[2rem] border border-[#1E1E35] bg-[#12121F] p-6 shadow-[0_35px_60px_-45px_rgba(16,24,40,0.8)]">
          <p className="text-sm uppercase tracking-[0.3em] text-[#94A3B8]">How to use</p>
          <h2 className="mt-3 text-xl font-semibold text-white">Stay informed and prepared</h2>
          <p className="mt-4 text-sm leading-6 text-[#94A3B8]">
            Use these resources to reach help quickly, locate nearby safe facilities, and learn about the latest government assistance.
          </p>
          <div className="mt-6 space-y-3">
            <div className="rounded-[1.5rem] bg-[#0D1020] p-4">
              <p className="text-sm font-semibold text-white">Search across all services</p>
              <p className="mt-2 text-sm text-[#94A3B8]">Filter by helpline, facility, or scheme to find support instantly.</p>
            </div>
            <div className="rounded-[1.5rem] bg-[#0D1020] p-4">
              <p className="text-sm font-semibold text-white">Tap to call</p>
              <p className="mt-2 text-sm text-[#94A3B8]">Direct dial emergency and support hotlines with one click.</p>
            </div>
          </div>
        </aside>
      </div>

      <div className="rounded-[2rem] border border-[#1E1E35] bg-[#11121F] p-6 shadow-[0_35px_60px_-45px_rgba(16,24,40,0.8)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#94A3B8]">Quick access</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Top results</h2>
          </div>
          <div className="rounded-full bg-[#0F172A] px-4 py-2 text-sm text-[#94A3B8]">Real-time matching</div>
        </div>

        <div className="mt-6 grid gap-4">
          {activeTab === 'helplines' && filteredHelplines.map((helpline) => (
            <div key={helpline.id} className="rounded-[1.75rem] border border-[#1E1E35] bg-[#0D1020] p-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="rounded-2xl bg-[#1E1E35] p-3 text-xl">{helpline.icon}</span>
                <div>
                  <p className="font-semibold text-white">{helpline.name}</p>
                  <p className="text-sm text-[#94A3B8]">{helpline.label}</p>
                </div>
              </div>
              <button className="rounded-3xl bg-[#10B981] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#059669] flex items-center gap-2">
                <Phone size={16} /> Call
              </button>
            </div>
          ))}

          {activeTab === 'places' && filteredPlaces.map((place, index) => (
            <div key={index} className="rounded-[1.75rem] border border-[#1E1E35] bg-[#0D1020] p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-[#7C3AED]">{place.type}</p>
                  <p className="mt-2 text-lg font-semibold text-white">{place.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-[#94A3B8]">{place.distance}</p>
                  <p className="mt-1 text-sm font-semibold text-[#F59E0B]">★ {place.rating}</p>
                </div>
              </div>
              <div className="mt-5 flex gap-2">
                <button className="flex-1 rounded-3xl bg-[#1E1E35] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#7C3AED]">Call</button>
                <button className="flex-1 rounded-3xl bg-[#1E1E35] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#7C3AED]">Directions</button>
              </div>
            </div>
          ))}

          {activeTab === 'schemes' && filteredSchemes.map((scheme, index) => (
            <div key={index} className="rounded-[1.75rem] border border-[#1E1E35] bg-[#0D1020] p-5">
              <div className="flex items-center gap-3">
                <Info className="w-5 h-5 text-[#7C3AED]" />
                <h3 className="text-lg font-semibold text-white">{scheme.name}</h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-[#94A3B8]">{scheme.description}</p>
              <button className="mt-5 rounded-3xl bg-[#1E1E35] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#7C3AED]">
                Know More
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto rounded-[2rem] border border-[#1E1E35] bg-[#12121F] p-4">
        {[
          { id: 'helplines', label: 'Helplines' },
          { id: 'places', label: 'Nearby Places' },
          { id: 'schemes', label: 'Schemes' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-3xl px-4 py-3 text-sm font-semibold transition ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-[#7C3AED] to-[#9333EA] text-white'
                : 'text-[#94A3B8] bg-[#0D1020] hover:bg-[#1E1E35]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
