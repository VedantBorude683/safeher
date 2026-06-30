'use client'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Plus, AlertTriangle, Trash2 } from 'lucide-react'
import { showToast } from '@/components/Toast'

export default function Profile({ user, setUser }: { user: any; setUser: (user: any) => void }) {
  const navigate = useNavigate()
  const [editMode, setEditMode] = useState(false)
  const [showAddContact, setShowAddContact] = useState(false)
  const [guardianSensitivity, setGuardianSensitivity] = useState('medium')
  const [autoSOSDelay, setAutoSOSDelay] = useState('10s')

  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    phone: user?.phone || '',
    email: user?.email || '',
    city: 'Pune',
  })

  const [newContact, setNewContact] = useState({
    name: '',
    phone: '',
    relationship: '',
  })

  const handleSavePersonal = () => {
    if (!formData.fullName || !formData.phone || !formData.email) {
      showToast('Please fill all fields', 'error')
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
    showToast('Profile updated successfully', 'success')
  }

  const handleAddContact = () => {
    if (!newContact.name || !newContact.phone) {
      showToast('Please fill all fields', 'error')
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

  return (
    <div className="space-y-6 pb-24 md:pb-0">
      <div className="rounded-[2rem] border border-[#1E1E35] bg-[#11121F] p-8 shadow-[0_35px_60px_-45px_rgba(16,24,40,0.8)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#94A3B8]">Profile</p>
            <h1 className="mt-3 text-3xl font-semibold text-white">Your account</h1>
            <p className="mt-4 text-sm leading-6 text-[#94A3B8]">
              Manage personal details, emergency contacts, and safety settings from one polished profile center.
            </p>
          </div>
          <div className="rounded-[2rem] bg-[#0E1020] p-5 text-center border border-[#2E2E48]">
            <p className="text-xs uppercase tracking-[0.3em] text-[#94A3B8]">Guardian tier</p>
            <p className="mt-3 text-2xl font-semibold text-white">Premium</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_0.7fr]">
        <section className="space-y-6">
          <div className="rounded-[2rem] border border-[#1E1E35] bg-[#12121F] p-6 shadow-[0_35px_60px_-45px_rgba(16,24,40,0.8)]">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white">
                  <User className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-[#94A3B8]">Account holder</p>
                  <h2 className="text-2xl font-semibold text-white">{user?.fullName}</h2>
                </div>
              </div>
              <button
                onClick={() => setEditMode(!editMode)}
                className="rounded-full bg-[#0D1020] px-4 py-2 text-sm font-semibold text-[#94A3B8] hover:bg-[#1E1E35] transition"
              >
                {editMode ? 'Cancel' : 'Edit'}
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-xs font-semibold text-[#94A3B8] mb-2 block">Full Name</label>
                <input
                  type="text"
                  disabled={!editMode}
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full rounded-3xl border border-[#1E1E35] bg-[#0D1020] px-4 py-3 text-white focus:border-[#7C3AED] focus:outline-none disabled:cursor-not-allowed"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#94A3B8] mb-2 block">Phone</label>
                <input
                  type="tel"
                  disabled={!editMode}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full rounded-3xl border border-[#1E1E35] bg-[#0D1020] px-4 py-3 text-white focus:border-[#7C3AED] focus:outline-none disabled:cursor-not-allowed"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#94A3B8] mb-2 block">Email</label>
                <input
                  type="email"
                  disabled={!editMode}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-3xl border border-[#1E1E35] bg-[#0D1020] px-4 py-3 text-white focus:border-[#7C3AED] focus:outline-none disabled:cursor-not-allowed"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#94A3B8] mb-2 block">City</label>
                <input
                  type="text"
                  disabled={!editMode}
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full rounded-3xl border border-[#1E1E35] bg-[#0D1020] px-4 py-3 text-white focus:border-[#7C3AED] focus:outline-none disabled:cursor-not-allowed"
                />
              </div>
            </div>
            {editMode && (
              <button
                onClick={handleSavePersonal}
                className="mt-6 rounded-3xl bg-gradient-to-r from-[#7C3AED] to-[#9333EA] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95"
              >
                Save Changes
              </button>
            )}
          </div>

          <div className="rounded-[2rem] border border-[#1E1E35] bg-[#12121F] p-6 shadow-[0_35px_60px_-45px_rgba(16,24,40,0.8)]">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-white">Emergency Contacts</h3>
              <button
                onClick={() => setShowAddContact(!showAddContact)}
                className="inline-flex items-center gap-2 rounded-full bg-[#0D1020] px-4 py-2 text-sm font-semibold text-[#94A3B8] hover:bg-[#1E1E35] transition"
              >
                <Plus size={16} /> Add
              </button>
            </div>
            {showAddContact && (
              <div className="mb-5 rounded-[1.75rem] bg-[#0D1020] p-4 space-y-3">
                <input
                  type="text"
                  placeholder="Contact name"
                  value={newContact.name}
                  onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                  className="w-full rounded-3xl border border-[#1E1E35] bg-[#12121F] px-4 py-3 text-white focus:border-[#7C3AED] focus:outline-none"
                />
                <input
                  type="tel"
                  placeholder="Phone number"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                  className="w-full rounded-3xl border border-[#1E1E35] bg-[#12121F] px-4 py-3 text-white focus:border-[#7C3AED] focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Relationship (optional)"
                  value={newContact.relationship}
                  onChange={(e) => setNewContact({ ...newContact, relationship: e.target.value })}
                  className="w-full rounded-3xl border border-[#1E1E35] bg-[#12121F] px-4 py-3 text-white focus:border-[#7C3AED] focus:outline-none"
                />
                <div className="flex gap-3">
                  <button
                    onClick={handleAddContact}
                    className="flex-1 rounded-3xl bg-[#7C3AED] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-95"
                  >
                    Add Contact
                  </button>
                  <button
                    onClick={() => setShowAddContact(false)}
                    className="flex-1 rounded-3xl bg-[#0D1020] px-4 py-3 text-sm font-semibold text-[#94A3B8] transition hover:bg-[#1E1E35]"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
            <div className="space-y-3">
              {user?.emergencyContacts?.map((contact: any, index: number) => (
                <div key={index} className="rounded-[1.75rem] bg-[#0D1020] p-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-white">{contact.name}</p>
                    <p className="text-sm text-[#94A3B8]">{contact.phone}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteContact(index)}
                    className="rounded-full p-2 text-[#EF4444] hover:bg-[#1E1E35] transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-[2rem] border border-[#1E1E35] bg-[#12121F] p-6 shadow-[0_35px_60px_-45px_rgba(16,24,40,0.8)]">
            <h3 className="text-lg font-semibold text-white">Guardian AI Settings</h3>
            <p className="mt-3 text-sm text-[#94A3B8]">Fine-tune notifications and auto-SOS behavior for your peace of mind.</p>
            <div className="mt-6 space-y-4">
              <div>
                <label className="text-sm font-semibold text-[#94A3B8] block mb-2">Detection Sensitivity</label>
                <select
                  value={guardianSensitivity}
                  onChange={(e) => setGuardianSensitivity(e.target.value)}
                  className="w-full rounded-3xl border border-[#1E1E35] bg-[#0D1020] px-4 py-3 text-white focus:border-[#7C3AED] focus:outline-none"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold text-[#94A3B8] block mb-2">Auto-SOS Trigger Delay</label>
                <select
                  value={autoSOSDelay}
                  onChange={(e) => setAutoSOSDelay(e.target.value)}
                  className="w-full rounded-3xl border border-[#1E1E35] bg-[#0D1020] px-4 py-3 text-white focus:border-[#7C3AED] focus:outline-none"
                >
                  <option value="5s">5 seconds</option>
                  <option value="10s">10 seconds</option>
                  <option value="30s">30 seconds</option>
                </select>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#1E1E35] bg-[#12121F] p-6 shadow-[0_35px_60px_-45px_rgba(16,24,40,0.8)]">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-[#EF4444]" />
              <div>
                <h3 className="text-lg font-semibold text-[#EF4444]">Danger Zone</h3>
                <p className="mt-2 text-sm text-[#94A3B8]">Log out if you are on a shared device or need to end your session immediately.</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="mt-6 w-full rounded-3xl border border-[#EF4444] px-4 py-3 text-sm font-semibold text-[#EF4444] transition hover:bg-[#EF4444]/10"
            >
              Logout
            </button>
          </div>
        </aside>
      </div>
    </div>
  )
}
