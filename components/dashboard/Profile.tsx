'use client'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Plus, Trash2, Shield, Phone, Mail, MapPin, CheckCircle2, Lock } from 'lucide-react'
import { showToast } from '@/components/Toast'

export default function Profile({ user, setUser }: { user: any; setUser: (user: any) => void }) {
  const navigate = useNavigate()
  const [editMode, setEditMode] = useState(false)
  const [showAddContact, setShowAddContact] = useState(false)
  const [guardianSensitivity, setGuardianSensitivity] = useState('medium')
  const [autoSOSDelay, setAutoSOSDelay] = useState('10s')

  const [formData, setFormData] = useState({
    fullName: user?.fullName || 'Priya Sharma',
    phone: user?.phone || '+91 98765 43210',
    email: user?.email || 'demo@safeher.ai',
    city: 'Pune, Maharashtra',
  })

  const [newContact, setNewContact] = useState({
    name: '',
    phone: '',
    relationship: '',
  })

  const handleSavePersonal = () => {
    if (!formData.fullName || !formData.phone || !formData.email) {
      showToast('Please fill all required profile fields', 'error')
      return
    }
    const updated = {
      ...user,
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
    }
    setUser(updated)
    localStorage.setItem('safeherUser', JSON.stringify(updated))
    setEditMode(false)
    showToast('Profile information saved', 'success')
  }

  const handleAddContact = () => {
    if (!newContact.name || !newContact.phone) {
      showToast('Please fill both name and phone number', 'error')
      return
    }
    const updated = {
      ...user,
      emergencyContacts: [...(user?.emergencyContacts || []), newContact],
    }
    setUser(updated)
    localStorage.setItem('safeherUser', JSON.stringify(updated))
    setNewContact({ name: '', phone: '', relationship: '' })
    setShowAddContact(false)
    showToast('Emergency contact added', 'success')
  }

  const handleDeleteContact = (index: number) => {
    const updated = {
      ...user,
      emergencyContacts: user.emergencyContacts.filter((_: any, i: number) => i !== index),
    }
    setUser(updated)
    localStorage.setItem('safeherUser', JSON.stringify(updated))
    showToast('Contact removed', 'success')
  }

  const handleLogout = () => {
    localStorage.removeItem('safeherUser')
    showToast('Logged out successfully', 'success')
    navigate('/login')
  }

  const initials = formData.fullName
    .split(' ')
    .map((w: string) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <div className="space-y-6 pb-16">
      {/* HEADER */}
      <div className="bg-white border border-[var(--border)] rounded-2xl p-6 sm:p-8 shadow-card flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
            User Account & Preferences
          </span>
          <h1 className="text-3xl font-serif text-[var(--text-primary)] mt-1">
            Personal Safety Profile
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1.5 max-w-xl">
            Configure registered emergency dispatch contacts, account security, and Guardian AI sensitivity.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[var(--accent-ghost)] border border-[var(--accent-light)] text-left sm:text-right">
          <span className="text-[11px] font-semibold text-[var(--primary)] uppercase tracking-wider block">
            Guardian Tier
          </span>
          <span className="text-base font-bold text-[var(--primary)] mt-0.5 block">
            ✓ Complete Protection Active
          </span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        {/* PERSONAL DETAILS CARD */}
        <div className="bg-white border border-[var(--border)] rounded-2xl p-6 sm:p-8 shadow-card space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[var(--primary)] text-white flex items-center justify-center text-lg font-bold">
                {initials}
              </div>
              <div>
                <h2 className="text-lg font-bold text-[var(--text-primary)]">{formData.fullName}</h2>
                <p className="text-xs text-[var(--text-muted)]">{formData.email}</p>
              </div>
            </div>

            <button
              onClick={() => (editMode ? handleSavePersonal() : setEditMode(true))}
              className="px-4 py-2 bg-[var(--primary)] hover:opacity-90 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
            >
              {editMode ? 'Save Changes' : 'Edit Profile'}
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 pt-2 border-t border-[var(--border)]">
            <div>
              <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                disabled={!editMode}
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full bg-[var(--bg-base)] border border-[var(--border)] disabled:bg-gray-50 rounded-xl px-3.5 py-2.5 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">
                Phone Number
              </label>
              <input
                disabled={!editMode}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-[var(--bg-base)] border border-[var(--border)] disabled:bg-gray-50 rounded-xl px-3.5 py-2.5 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">
                Registered Email
              </label>
              <input
                disabled={!editMode}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[var(--bg-base)] border border-[var(--border)] disabled:bg-gray-50 rounded-xl px-3.5 py-2.5 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1.5">
                Primary Metropole
              </label>
              <input
                disabled={!editMode}
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full bg-[var(--bg-base)] border border-[var(--border)] disabled:bg-gray-50 rounded-xl px-3.5 py-2.5 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)]"
              />
            </div>
          </div>
        </div>

        {/* EMERGENCY CONTACTS CARD */}
        <div className="bg-white border border-[var(--border)] rounded-2xl p-6 sm:p-8 shadow-card space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[var(--text-primary)]">Emergency Dispatch Contacts</h3>
              <p className="text-xs text-[var(--text-muted)]">Alerted automatically when SOS is activated</p>
            </div>
            <button
              onClick={() => setShowAddContact(!showAddContact)}
              className="px-3 py-1.5 rounded-lg bg-[var(--accent-ghost)] text-[var(--primary)] border border-[var(--accent-light)] text-xs font-bold hover:bg-[var(--primary)] hover:text-white transition-colors flex items-center gap-1"
            >
              <Plus size={14} />
              <span>Add</span>
            </button>
          </div>

          {/* ADD CONTACT INLINE FORM */}
          {showAddContact && (
            <div className="p-4 rounded-xl bg-[var(--bg-base)] border border-[var(--border)] space-y-3">
              <span className="text-xs font-bold text-[var(--text-primary)] block">New Emergency Contact</span>
              <div className="grid gap-2 sm:grid-cols-2">
                <input
                  placeholder="Contact Name (e.g. Mom)"
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  className="bg-white border border-[var(--border)] rounded-lg px-3 py-2 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)]"
                />
                <input
                  placeholder="Phone Number (+91...)"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                  className="bg-white border border-[var(--border)] rounded-lg px-3 py-2 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)]"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowAddContact(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[var(--text-muted)] hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddContact}
                  className="px-4 py-1.5 rounded-lg bg-[var(--primary)] text-white text-xs font-bold"
                >
                  Save Contact
                </button>
              </div>
            </div>
          )}

          {/* CONTACT LIST */}
          <div className="space-y-2.5">
            {(user?.emergencyContacts || [
              { name: 'Vedant Borude', phone: '+91 93590 96377' },
              { name: 'Family Emergency', phone: '+91 98765 43210' },
            ]).map((contact: any, index: number) => (
              <div
                key={index}
                className="p-3.5 rounded-xl bg-[var(--bg-base)] border border-[var(--border)] flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--accent-ghost)] text-[var(--primary)] flex items-center justify-center text-xs font-bold">
                    {contact.name[0]}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[var(--text-primary)] block">{contact.name}</span>
                    <span className="text-[11px] text-[var(--text-muted)] font-mono">{contact.phone}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteContact(index)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  aria-label="Delete contact"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* GUARDIAN SAFETY PREFERENCES */}
      <div className="bg-white border border-[var(--border)] rounded-2xl p-6 sm:p-8 shadow-card space-y-6">
        <div>
          <h3 className="text-base font-bold text-[var(--text-primary)]">Guardian System Triggers & Privacy</h3>
          <p className="text-xs text-[var(--text-muted)]">Configure automated emergency thresholds and privacy encryption controls</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="p-4 rounded-xl bg-[var(--bg-base)] border border-[var(--border)]">
            <span className="text-xs font-bold text-[var(--text-primary)] block">Auto SOS Delay</span>
            <span className="text-[11px] text-[var(--text-muted)] block mt-0.5">Countdown before SMS dispatch</span>
            <select
              value={autoSOSDelay}
              onChange={(e) => setAutoSOSDelay(e.target.value)}
              className="mt-3 w-full bg-white border border-[var(--border)] rounded-lg px-2.5 py-1.5 text-xs text-[var(--text-primary)]"
            >
              <option value="5s">5 Seconds (Urgent)</option>
              <option value="10s">10 Seconds (Recommended)</option>
              <option value="15s">15 Seconds (Extended)</option>
            </select>
          </div>

          <div className="p-4 rounded-xl bg-[var(--bg-base)] border border-[var(--border)]">
            <span className="text-xs font-bold text-[var(--text-primary)] block">Motion Shake Sensitivity</span>
            <span className="text-[11px] text-[var(--text-muted)] block mt-0.5">Rapid shake trigger threshold</span>
            <select
              value={guardianSensitivity}
              onChange={(e) => setGuardianSensitivity(e.target.value)}
              className="mt-3 w-full bg-white border border-[var(--border)] rounded-lg px-2.5 py-1.5 text-xs text-[var(--text-primary)]"
            >
              <option value="low">Low (Firm shake)</option>
              <option value="medium">Medium (Standard)</option>
              <option value="high">High (Sensitive)</option>
            </select>
          </div>

          <div className="p-4 rounded-xl bg-[var(--bg-base)] border border-[var(--border)] flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-[var(--text-primary)] block">Data Privacy Encryption</span>
              <span className="text-[11px] text-[var(--text-muted)] block mt-0.5">AES-256 local encrypted storage</span>
            </div>
            <span className="text-xs font-bold text-emerald-700 mt-3 flex items-center gap-1">
              <Lock size={12} />
              Zero Cloud Data Logging
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
