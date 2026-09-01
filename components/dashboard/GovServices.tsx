'use client'

import { useState } from 'react'
import { Phone, MapPin, Info, Search, Building2, Shield, HeartHandshake, ExternalLink } from 'lucide-react'

const helplines = [
  { id: '112', name: 'National Emergency Helpline', icon: '🚔', label: 'Unified Police, Fire & Medical dispatch' },
  { id: '181', name: 'Women Helpline (Shakti)', icon: '👩', label: '24/7 Crisis intervention & counseling' },
  { id: '1091', name: 'Police Women Cell', icon: '👮', label: 'Direct police women protection unit' },
  { id: '1930', name: 'Cyber Crime Reporting', icon: '💻', label: 'Immediate financial fraud & online harassment' },
  { id: '14567', name: 'Senior Citizen & Family Aid', icon: '⚖️', label: 'Legal counseling and domestic support' },
  { id: '1098', name: 'Childline Support', icon: '👶', label: 'Child safety & emergency response' },
]

const nearbyPlaces = [
  { type: 'Police Chowki', name: 'Koregaon Police Station', distance: '0.5 km', address: 'North Main Road, Pune', phone: '020-26123456' },
  { type: 'One Stop Centre', name: 'Pune Nirbhaya OSC', distance: '0.8 km', address: 'Sassoon Hospital Campus', phone: '020-26127890' },
  { type: 'Hospital', name: 'Ruby Hall Clinic (Emergency)', distance: '1.2 km', address: 'Dhole Patil Road', phone: '020-66455100' },
  { type: 'Police HQ', name: 'Pune City Police Commissionerate', distance: '2.1 km', address: 'Camp, Pune', phone: '020-26122880' },
  { type: 'Hospital', name: 'Jehangir Hospital Emergency', distance: '1.8 km', address: 'Near Pune Railway Station', phone: '020-66811000' },
]

const schemes = [
  {
    name: 'Beti Bachao Beti Padhao',
    ministry: 'Ministry of Women and Child Development',
    description: 'National initiative for girl child protection, education, and welfare incentive schemes.',
    link: '#',
  },
  {
    name: 'One Stop Centre (OSC / Sakhi)',
    ministry: 'Nirbhaya Fund Project',
    description: 'Single-window integrated support for women affected by violence, providing legal, medical, and psychological shelter.',
    link: '#',
  },
  {
    name: 'PM Matru Vandana Yojana',
    ministry: 'Central Government Scheme',
    description: 'Maternity benefit cash incentives for nutritional and health support.',
    link: '#',
  },
  {
    name: 'Emergency Response Support System (ERSS)',
    ministry: 'Ministry of Home Affairs',
    description: 'Pan-India single emergency number 112 with integrated GPS-based vehicle dispatching.',
    link: '#',
  },
]

export default function GovServices() {
  const [activeTab, setActiveTab] = useState<'helplines' | 'places' | 'schemes'>('helplines')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredHelplines = helplines.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.includes(searchQuery)
  )

  const filteredPlaces = nearbyPlaces.filter(
    (place) =>
      place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.address.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredSchemes = schemes.filter(
    (scheme) =>
      scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6 pb-16">
      {/* HEADER */}
      <div className="bg-white border border-[var(--border)] rounded-2xl p-6 sm:p-8 shadow-card flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
            Institutional Support
          </span>
          <h1 className="text-3xl font-serif text-[var(--text-primary)] mt-1">
            Government Helplines & Services
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1.5 max-w-xl">
            Verified official emergency hotlines, One-Stop Crisis Centers, and national women welfare schemes.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[var(--accent-ghost)] border border-[var(--accent-light)] text-left sm:text-right">
          <span className="text-[11px] font-semibold text-[var(--primary)] uppercase tracking-wider block">
            National Relay
          </span>
          <span className="text-base font-bold text-[var(--primary)] mt-0.5 block">
            ✓ 112 ERSS Integrated
          </span>
        </div>
      </div>

      {/* SEARCH AND TABS */}
      <div className="bg-white border border-[var(--border)] rounded-2xl p-6 shadow-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* TABS */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[var(--bg-base)] border border-[var(--border)] w-fit">
            {[
              { id: 'helplines', label: 'Emergency Helplines' },
              { id: 'places', label: 'Support Centers & Police' },
              { id: 'schemes', label: 'Welfare Schemes' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-[var(--primary)] shadow-xs border border-[var(--border)]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* SEARCH INPUT */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services, schemes..."
              className="w-full bg-[var(--bg-base)] border border-[var(--border)] rounded-xl pl-10 pr-4 py-2 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)]"
            />
          </div>
        </div>
      </div>

      {/* CONTENT BASED ON ACTIVE TAB */}
      {activeTab === 'helplines' && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredHelplines.map((helpline) => (
            <div
              key={helpline.id}
              className="bg-white border border-[var(--border)] hover:border-[var(--primary)] rounded-2xl p-5 shadow-card flex flex-col justify-between space-y-4 transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{helpline.icon}</span>
                  <div>
                    <h3 className="text-sm font-bold text-[var(--text-primary)]">{helpline.name}</h3>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">{helpline.label}</p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between">
                <span className="text-base font-bold font-mono text-[var(--primary)]">{helpline.id}</span>
                <a
                  href={`tel:${helpline.id}`}
                  className="px-3.5 py-1.5 rounded-lg bg-[var(--accent-ghost)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white border border-[var(--accent-light)] text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <Phone size={13} />
                  <span>Call Now</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'places' && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPlaces.map((place, i) => (
            <div
              key={i}
              className="bg-white border border-[var(--border)] rounded-2xl p-5 shadow-card flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[var(--accent-ghost)] text-[var(--primary)] border border-[var(--accent-light)]">
                    {place.type}
                  </span>
                  <span className="text-xs font-semibold text-[var(--text-muted)]">{place.distance}</span>
                </div>
                <h3 className="text-sm font-bold text-[var(--text-primary)]">{place.name}</h3>
                <p className="text-xs text-[var(--text-muted)] mt-1 flex items-center gap-1">
                  <MapPin size={12} />
                  {place.address}
                </p>
              </div>

              <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between">
                <span className="text-xs font-mono text-[var(--text-muted)]">{place.phone}</span>
                <a
                  href={`tel:${place.phone}`}
                  className="px-3 py-1.5 rounded-lg bg-gray-50 text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] border border-[var(--border)] text-xs font-semibold transition-colors flex items-center gap-1"
                >
                  <Phone size={12} />
                  <span>Contact</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'schemes' && (
        <div className="grid gap-4 sm:grid-cols-2">
          {filteredSchemes.map((scheme, i) => (
            <div
              key={i}
              className="bg-white border border-[var(--border)] rounded-2xl p-6 shadow-card flex flex-col justify-between space-y-4"
            >
              <div>
                <span className="text-[11px] font-semibold text-[var(--primary)] uppercase tracking-wider block mb-1">
                  {scheme.ministry}
                </span>
                <h3 className="text-base font-bold text-[var(--text-primary)]">{scheme.name}</h3>
                <p className="text-xs text-[var(--text-secondary)] mt-2 leading-relaxed">
                  {scheme.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[var(--border)] flex justify-end">
                <a
                  href="https://wcd.nic.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[var(--primary)] hover:underline flex items-center gap-1"
                >
                  <span>Official Portal Guidelines</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
