'use client'

import { Link } from 'react-router-dom'
import {
  Shield,
  Menu,
  X,
  MapPin,
  Mic2,
  Brain,
  Map,
  Lock,
  Users,
  PhoneCall,
  Eye,
  CheckCircle2,
  Clock,
} from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

/* ============================================================
   SOS DEMO COMPONENT
   ============================================================ */

function SOSDemo() {
  const [phase, setPhase] = useState<0 | 1 | 2 | 3>(0)
  const [countdown, setCountdown] = useState(10)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const resetRef = useRef(0)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 800)
    const t2 = setTimeout(() => setPhase(2), 2800)
    const t3 = setTimeout(() => setPhase(3), 4600)
    const t4 = setTimeout(() => {
      setPhase(0)
      setCountdown(10)
      resetRef.current += 1
    }, 7400)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetRef.current])

  useEffect(() => {
    if (phase >= 1 && phase < 3) {
      timerRef.current = setInterval(() => {
        setCountdown(c => Math.max(0, c - 1))
      }, 1000)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
      if (phase === 0) setCountdown(10)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [phase])

  const circ = 283
  const offset = phase >= 1 ? circ - (circ * (10 - countdown)) / 10 : circ

  return (
    <div
      style={{
        background: '#FFFFFF',
        borderRadius: '24px',
        border: '1px solid #E8E6DF',
        boxShadow: '0 32px 80px rgba(15,118,110,0.08), 0 2px 8px rgba(0,0,0,0.06)',
        padding: '32px',
        width: '100%',
        maxWidth: '380px',
        minHeight: '460px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        position: 'relative',
        overflow: 'hidden',
      }}
      role="img"
      aria-label="SafeHer SOS activation demo"
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Shield size={16} color="#0F766E" />
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#1A1917', letterSpacing: '-0.01em' }}>
            SafeHer
          </span>
        </div>
        <span
          style={{
            fontSize: '11px',
            fontWeight: 500,
            padding: '3px 8px',
            borderRadius: '100px',
            background: phase >= 1 && phase < 3 ? '#FEF2F2' : phase >= 3 ? '#F0FDFA' : '#F0FDFA',
            color: phase >= 1 && phase < 3 ? '#DC2626' : '#0F766E',
            border: `1px solid ${phase >= 1 && phase < 3 ? '#FECACA' : '#CCFBF1'}`,
            transition: 'all 0.3s ease',
          }}
        >
          {phase === 0 ? 'Protected' : phase >= 3 ? '✓ Alert Sent' : 'SOS Active'}
        </span>
      </div>

      {/* SOS Ring */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <div style={{ position: 'relative', width: '120px', height: '120px' }}>
          {phase >= 1 && phase < 3 && (
            <>
              <span style={{
                position: 'absolute', inset: 0, borderRadius: '50%',
                background: 'rgba(220,38,38,0.10)',
                animation: 'lp-ping 1.6s ease-out infinite',
              }} />
              <span style={{
                position: 'absolute', inset: 0, borderRadius: '50%',
                background: 'rgba(220,38,38,0.05)',
                animation: 'lp-ping 1.6s ease-out infinite 0.5s',
              }} />
            </>
          )}

          <svg
            width="120"
            height="120"
            viewBox="0 0 100 100"
            style={{ position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)' }}
            aria-hidden="true"
          >
            <circle cx="50" cy="50" r="45" fill="none" stroke="#F2F1ED" strokeWidth="3" />
            <circle
              cx="50" cy="50" r="45" fill="none"
              stroke={phase >= 3 ? '#0F766E' : '#DC2626'}
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={circ}
              strokeDashoffset={phase >= 3 ? 0 : offset}
              style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.4s ease' }}
            />
          </svg>

          <div style={{
            position: 'absolute', inset: '8px',
            borderRadius: '50%',
            background: phase >= 3 ? '#F0FDFA' : phase >= 1 ? '#FEF2F2' : '#F2F1ED',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.4s ease',
          }}>
            {phase >= 3 ? (
              <CheckCircle2 size={28} color="#0F766E" />
            ) : phase >= 1 ? (
              <>
                <span style={{
                  fontSize: '26px', fontWeight: 700, color: '#DC2626', lineHeight: 1,
                  animation: 'lp-count-tick 1s ease infinite',
                  fontVariantNumeric: 'tabular-nums',
                }}>
                  {countdown}
                </span>
                <span style={{ fontSize: '10px', color: '#A8A49D', marginTop: '2px' }}>seconds</span>
              </>
            ) : (
              <span style={{ fontSize: '11px', fontWeight: 600, color: '#6B6860', letterSpacing: '0.05em' }}>
                HOLD SOS
              </span>
            )}
          </div>
        </div>

        <p style={{
          fontSize: '13px', color: '#6B6860', textAlign: 'center',
          minHeight: '18px',
          transition: 'opacity 0.3s ease',
        }}>
          {phase === 0 && 'Tap to activate emergency mode'}
          {phase === 1 && 'Getting your location…'}
          {phase === 2 && 'Alerting your emergency contacts…'}
          {phase === 3 && 'Contacts notified. Stay calm.'}
        </p>
      </div>

      {/* Location card */}
      {phase >= 2 && (
        <div style={{
          background: '#F0FDFA',
          border: '1px solid #CCFBF1',
          borderRadius: '12px',
          padding: '12px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          animation: 'lp-card-slide 0.4s ease',
        }}>
          <MapPin size={14} color="#0F766E" />
          <div>
            <p style={{ fontSize: '12px', fontWeight: 600, color: '#0F766E' }}>Live location shared</p>
            <p style={{ fontSize: '11px', color: '#6B6860', marginTop: '1px' }}>
              Bandra West, Mumbai · 3 contacts notified
            </p>
          </div>
        </div>
      )}

      {/* Alert cards */}
      {phase >= 3 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', animation: 'lp-card-slide 0.4s ease' }}>
          {[
            { name: 'Mom', status: 'Delivered' },
            { name: 'Riya (friend)', status: 'Delivered' },
          ].map(contact => (
            <div
              key={contact.name}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: '#FAFAF8', border: '1px solid #E8E6DF',
                borderRadius: '10px', padding: '10px 12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '28px', height: '28px', borderRadius: '50%',
                  background: '#F0FDFA',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Users size={12} color="#0F766E" />
                </div>
                <span style={{ fontSize: '12px', fontWeight: 500, color: '#1A1917' }}>{contact.name}</span>
              </div>
              <span style={{ fontSize: '11px', color: '#0F766E', fontWeight: 500 }}>
                ✓ {contact.status}
              </span>
            </div>
          ))}
        </div>
      )}

      <p style={{
        fontSize: '11px', color: '#A8A49D', textAlign: 'center',
        position: 'absolute', bottom: '14px', left: 0, right: 0,
        letterSpacing: '0.03em',
      }}>
        Live demo — loops automatically
      </p>
    </div>
  )
}

/* ============================================================
   DATA
   ============================================================ */

const features = [
  {
    icon: Mic2,
    title: 'Voice SOS',
    description:
      'Hands-free emergency activation. Say the trigger phrase and SafeHer alerts all your contacts with your live location — no screen tap needed.',
  },
  {
    icon: MapPin,
    title: 'Live Location Share',
    description:
      'Share a real-time tracking link with trusted contacts. They see your position update every 10 seconds until you mark yourself safe.',
  },
  {
    icon: Brain,
    title: 'AI Risk Prediction',
    description:
      'Machine learning models trained on crime data, lighting, crowd density, and time of day to surface risk before you reach it.',
  },
  {
    icon: Map,
    title: 'Safe Route Finder',
    description:
      'Not the fastest route. The safest one. Navigate using corridors with high crowd density, CCTV coverage, and police beat proximity.',
  },
  {
    icon: Eye,
    title: 'Crowd Safety Heatmap',
    description:
      'See which areas around you are currently well-populated. Crowded routes are safer routes — this makes that visible in real time.',
  },
  {
    icon: Lock,
    title: 'Legal & Cyber Shield',
    description:
      'Instant access to legal aid contacts, cyber-crime reporting portals, and a fake-link detector — the support layer beyond physical safety.',
  },
]

const trustStats = [
  { value: '< 8s', label: 'Average alert delivery time to emergency contacts' },
  { value: '50,000+', label: 'Women protected across India' },
  { value: '99.8%', label: 'Platform uptime — available when it counts most' },
]

const testimonials = [
  {
    quote:
      'Voice SOS activated while my hands were in my bag. My contacts knew my location before I could even unlock my phone.',
    name: 'Priya Sharma',
    role: 'College student, Mumbai',
    initial: 'P',
    featured: false,
  },
  {
    quote:
      'The risk map changed how I plan my evening routes. Not fear — just information. That feels very different.',
    name: 'Aisha Nair',
    role: 'UX designer, Bangalore',
    initial: 'A',
    featured: true,
  },
  {
    quote:
      'My daughter travels by metro late after work. Knowing she has this running gives us both something solid.',
    name: 'Meena Joshi',
    role: 'Parent, Delhi',
    initial: 'M',
    featured: false,
  },
]

/* ============================================================
   LANDING PAGE
   ============================================================ */

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="lp" style={{ minHeight: '100vh', fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ── NAV ─────────────────────────────────────────────── */}
      <nav
        style={{
          position: 'sticky', top: 0, zIndex: 50,
          backgroundColor: 'rgba(250,250,248,0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--lp-border)',
        }}
        aria-label="Main navigation"
      >
        <div style={{
          maxWidth: '1120px', margin: '0 auto', padding: '0 24px',
          height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }} aria-label="SafeHer home">
            <Shield size={18} color="var(--lp-teal)" strokeWidth={2.5} />
            <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--lp-ink)', letterSpacing: '-0.02em' }}>SafeHer</span>
          </a>

          {/* Desktop nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="lp-nav-links">
            {[
              { label: 'How it works', href: '#how-it-works' },
              { label: 'Features', href: '#features' },
              { label: 'Trust', href: '#trust' },
              { label: 'Stories', href: '#testimonials' },
            ].map(link => (
              <a
                key={link.href} href={link.href}
                style={{ fontSize: '14px', color: 'var(--lp-ink-muted)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--lp-ink)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--lp-ink-muted)')}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Link
              to="/login" id="nav-login"
              style={{ fontSize: '14px', fontWeight: 500, color: 'var(--lp-ink-muted)', textDecoration: 'none', padding: '8px 16px', border: '1px solid var(--lp-border)', borderRadius: '8px', transition: 'border-color 0.15s, color 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--lp-teal)'; e.currentTarget.style.color = 'var(--lp-teal)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--lp-border)'; e.currentTarget.style.color = 'var(--lp-ink-muted)' }}
            >
              Log in
            </Link>
            <Link
              to="/signup" id="nav-signup"
              style={{ fontSize: '14px', fontWeight: 600, color: '#fff', textDecoration: 'none', padding: '8px 18px', background: 'var(--lp-teal)', borderRadius: '8px', transition: 'opacity 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Get started free
            </Link>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: 'var(--lp-ink-muted)' }}
              className="lp-hamburger"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ borderTop: '1px solid var(--lp-border)', background: 'var(--lp-white)', padding: '16px 24px 20px' }}>
            {[
              { label: 'How it works', href: '#how-it-works' },
              { label: 'Features', href: '#features' },
              { label: 'Trust', href: '#trust' },
              { label: 'Stories', href: '#testimonials' },
            ].map(link => (
              <a
                key={link.href} href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{ display: 'block', padding: '10px 0', fontSize: '15px', color: 'var(--lp-ink)', textDecoration: 'none', fontWeight: 500, borderBottom: '1px solid var(--lp-stone)' }}
              >
                {link.label}
              </a>
            ))}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
              <Link to="/login" onClick={() => setMenuOpen(false)} style={{ textAlign: 'center', padding: '10px', border: '1px solid var(--lp-border)', borderRadius: '8px', fontSize: '14px', color: 'var(--lp-ink)', textDecoration: 'none' }}>Log in</Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)} style={{ textAlign: 'center', padding: '10px', background: 'var(--lp-teal)', borderRadius: '8px', fontSize: '14px', fontWeight: 600, color: '#fff', textDecoration: 'none' }}>Get started free</Link>
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section style={{ maxWidth: '1120px', margin: '0 auto', padding: '80px 24px 64px' }} aria-label="Hero">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }} className="lp-hero-grid">
          <div>
            {/* Badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--lp-teal-ghost)', border: '1px solid var(--lp-teal-light)', borderRadius: '100px', padding: '4px 12px', marginBottom: '32px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--lp-teal)', flexShrink: 0 }} />
              <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--lp-teal)', letterSpacing: '0.01em' }}>50,000 women protected across India</span>
            </div>

            <h1 style={{
              fontFamily: 'var(--lp-serif)',
              fontSize: 'clamp(44px, 5.5vw, 72px)',
              fontWeight: 400, lineHeight: 1.08, letterSpacing: '-0.02em',
              color: 'var(--lp-ink)', marginBottom: '24px', maxWidth: '560px',
            }}>
              Safety you can feel.<br />
              <em style={{ fontStyle: 'italic', color: 'var(--lp-teal)' }}>Presence</em>{' '}
              that never leaves your side.
            </h1>

            <p style={{ fontSize: '17px', lineHeight: 1.65, color: 'var(--lp-ink-muted)', maxWidth: '440px', marginBottom: '40px' }}>
              Real-time risk prediction, voice-activated SOS, and live location sharing — built for how women actually move through the world.
            </p>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '48px' }}>
              <Link
                to="/signup" id="hero-cta-primary"
                style={{ display: 'inline-flex', alignItems: 'center', padding: '14px 28px', background: 'var(--lp-teal)', color: '#fff', textDecoration: 'none', borderRadius: '10px', fontWeight: 600, fontSize: '15px', transition: 'opacity 0.15s, transform 0.15s', boxShadow: '0 4px 20px rgba(15,118,110,0.25)' }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                Get started free
              </Link>
              <a
                href="#how-it-works" id="hero-cta-secondary"
                style={{ display: 'inline-flex', alignItems: 'center', padding: '14px 24px', border: '1px solid var(--lp-border)', color: 'var(--lp-ink)', textDecoration: 'none', borderRadius: '10px', fontWeight: 500, fontSize: '15px', transition: 'border-color 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--lp-teal)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--lp-border)')}
              >
                See how it works
              </a>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', paddingTop: '24px', borderTop: '1px solid var(--lp-border)' }}>
              {[
                { icon: Lock, label: 'End-to-end encrypted' },
                { icon: PhoneCall, label: 'Govt. verified helplines' },
                { icon: Shield, label: 'No data sold, ever' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Icon size={13} color="var(--lp-ink-ghost)" />
                  <span style={{ fontSize: '12px', color: 'var(--lp-ink-ghost)', fontWeight: 500 }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <SOSDemo />
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section
        id="how-it-works"
        style={{ background: 'var(--lp-stone)', borderTop: '1px solid var(--lp-border)', borderBottom: '1px solid var(--lp-border)', padding: '96px 24px' }}
        aria-labelledby="how-heading"
      >
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <h2 id="how-heading" style={{ fontFamily: 'var(--lp-serif)', fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 400, color: 'var(--lp-ink)', marginBottom: '12px', letterSpacing: '-0.02em' }}>
            The SOS flow, step by step.
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--lp-ink-muted)', lineHeight: 1.6, maxWidth: '480px', marginBottom: '64px' }}>
            From the moment you feel unsafe to the moment your contacts are on the way — under 8 seconds.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {[
              { n: '01', title: 'Activate', body: 'Say the trigger phrase, hold the SOS button, or shake your phone three times. No screen unlock needed. Activation takes under one second.' },
              { n: '02', title: 'Location acquired', body: 'GPS locks to your position within 2–3 seconds using high-accuracy mode. A shareable live-tracking link is generated immediately.' },
              { n: '03', title: 'Contacts alerted', body: 'All your emergency contacts receive an SMS with your location link and a voice call via our automated relay — simultaneously.' },
              { n: '04', title: 'Stay tracked until you\'re safe', body: 'Location updates every 10 seconds. Contacts can see your movement live. You stay in active mode until you tap "I\'m safe" — or your contacts confirm.' },
            ].map((step, i, arr) => (
              <div key={step.n} style={{ display: 'grid', gridTemplateColumns: '56px 1fr', gap: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1.5px solid var(--lp-border)', background: 'var(--lp-white)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1 }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--lp-teal)', fontVariantNumeric: 'tabular-nums' }}>{step.n}</span>
                  </div>
                  {i < arr.length - 1 && (
                    <div style={{ width: '1px', flexGrow: 1, minHeight: '40px', background: 'var(--lp-border)', margin: '4px 0' }} />
                  )}
                </div>
                <div style={{ paddingBottom: i < arr.length - 1 ? '40px' : '0' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--lp-ink)', marginBottom: '8px', letterSpacing: '-0.01em', paddingTop: '8px' }}>{step.title}</h3>
                  <p style={{ fontSize: '15px', lineHeight: 1.65, color: 'var(--lp-ink-muted)', maxWidth: '520px' }}>{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────── */}
      <section id="features" style={{ padding: '96px 24px' }} aria-labelledby="features-heading">
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <h2 id="features-heading" style={{ fontFamily: 'var(--lp-serif)', fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 400, color: 'var(--lp-ink)', marginBottom: '12px', letterSpacing: '-0.02em' }}>
            Every layer of protection, together.
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--lp-ink-muted)', lineHeight: 1.6, maxWidth: '480px', marginBottom: '64px' }}>
            SafeHer isn't a panic button. It's an intelligence platform that anticipates risk and responds before you need to.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', border: '1px solid var(--lp-border)', borderRadius: '16px', overflow: 'hidden' }}>
            {features.map((f, i) => {
              const Icon = f.icon
              const isRightCol = i % 2 === 1
              const isLastRow = i >= features.length - 2
              return (
                <div
                  key={f.title}
                  id={`feature-${f.title.toLowerCase().replace(/\s+/g, '-')}`}
                  style={{ padding: '36px 32px', borderRight: isRightCol ? 'none' : '1px solid var(--lp-border)', borderBottom: isLastRow ? 'none' : '1px solid var(--lp-border)', transition: 'background 0.2s ease' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--lp-teal-ghost)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--lp-teal-ghost)', border: '1px solid var(--lp-teal-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                    <Icon size={16} color="var(--lp-teal)" />
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--lp-ink)', marginBottom: '10px', letterSpacing: '-0.01em' }}>{f.title}</h3>
                  <p style={{ fontSize: '14px', lineHeight: 1.65, color: 'var(--lp-ink-muted)', maxWidth: '340px' }}>{f.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── TRUST ────────────────────────────────────────────── */}
      <section id="trust" style={{ background: 'var(--lp-stone)', borderTop: '1px solid var(--lp-border)', borderBottom: '1px solid var(--lp-border)', padding: '96px 24px' }} aria-labelledby="trust-heading">
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <h2 id="trust-heading" style={{ fontFamily: 'var(--lp-serif)', fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 400, color: 'var(--lp-ink)', marginBottom: '64px', letterSpacing: '-0.02em', maxWidth: '600px' }}>
            Built to earn trust, not ask for it.
          </h2>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1px', background: 'var(--lp-border)', border: '1px solid var(--lp-border)', borderRadius: '16px', overflow: 'hidden', marginBottom: '64px' }}>
            {trustStats.map(stat => (
              <div key={stat.value} style={{ background: 'var(--lp-white)', padding: '36px 32px' }}>
                <p style={{ fontFamily: 'var(--lp-serif)', fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: 400, color: 'var(--lp-teal)', letterSpacing: '-0.02em', lineHeight: 1, marginBottom: '12px' }}>{stat.value}</p>
                <p style={{ fontSize: '14px', color: 'var(--lp-ink-muted)', lineHeight: 1.55, maxWidth: '220px' }}>{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Privacy + Partnerships */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }} className="lp-trust-grid">
            <div style={{ background: 'var(--lp-white)', border: '1px solid var(--lp-border)', borderRadius: '16px', padding: '40px' }}>
              <Lock size={18} color="var(--lp-teal)" style={{ marginBottom: '20px' }} />
              <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--lp-ink)', marginBottom: '16px', letterSpacing: '-0.01em' }}>Your data is yours. Full stop.</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  'Location data is never stored on our servers — it flows directly to your contacts.',
                  'We do not sell, rent, or share your personal data with advertisers or third parties.',
                  'All communication is end-to-end encrypted with AES-256.',
                  'You can export or delete all your data at any time, instantly.',
                ].map(point => (
                  <div key={point} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <CheckCircle2 size={15} color="var(--lp-teal)" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <p style={{ fontSize: '14px', color: 'var(--lp-ink-muted)', lineHeight: 1.6 }}>{point}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: 'var(--lp-white)', border: '1px solid var(--lp-border)', borderRadius: '16px', padding: '40px' }}>
              <Users size={18} color="var(--lp-teal)" style={{ marginBottom: '20px' }} />
              <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--lp-ink)', marginBottom: '8px', letterSpacing: '-0.01em' }}>Verified partners & integrations</h3>
              <p style={{ fontSize: '14px', color: 'var(--lp-ink-muted)', lineHeight: 1.6, marginBottom: '28px' }}>
                SafeHer works alongside institutions that already serve women's safety.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  { category: 'Government', detail: 'Direct integration with 112 emergency relay and Nirbhaya Fund helplines' },
                  { category: 'Campus safety', detail: 'Deployed across 14 university campuses in Maharashtra and Karnataka' },
                  { category: 'NGO network', detail: 'Referral partnerships with Shakti Foundation and iCall crisis support' },
                ].map(p => (
                  <div key={p.category} style={{ borderBottom: '1px solid var(--lp-stone)', paddingBottom: '14px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--lp-teal)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{p.category}</span>
                    <p style={{ fontSize: '13px', color: 'var(--lp-ink-muted)', marginTop: '4px', lineHeight: 1.55 }}>{p.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <section id="testimonials" style={{ padding: '96px 24px' }} aria-labelledby="stories-heading">
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <h2 id="stories-heading" style={{ fontFamily: 'var(--lp-serif)', fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 400, color: 'var(--lp-ink)', marginBottom: '64px', letterSpacing: '-0.02em' }}>
            From the people who use it.
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
            {testimonials.map((t, i) => (
              <figure
                key={t.name}
                id={`testimonial-${i + 1}`}
                style={{ background: t.featured ? 'var(--lp-teal)' : 'var(--lp-stone)', border: `1px solid ${t.featured ? 'transparent' : 'var(--lp-border)'}`, borderRadius: '16px', padding: '36px', margin: 0 }}
              >
                <blockquote style={{ marginBottom: '28px' }}>
                  <p style={{ fontSize: '16px', lineHeight: 1.7, color: t.featured ? 'rgba(255,255,255,0.92)' : 'var(--lp-ink)' }}>
                    "{t.quote}"
                  </p>
                </blockquote>
                <figcaption style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: t.featured ? 'rgba(255,255,255,0.2)' : 'var(--lp-teal-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 700, color: t.featured ? '#fff' : 'var(--lp-teal)', flexShrink: 0 }}>
                    {t.initial}
                  </div>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: 600, color: t.featured ? '#fff' : 'var(--lp-ink)' }}>{t.name}</p>
                    <p style={{ fontSize: '12px', color: t.featured ? 'rgba(255,255,255,0.65)' : 'var(--lp-ink-ghost)', marginTop: '2px' }}>{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────── */}
      <section style={{ background: 'var(--lp-stone)', borderTop: '1px solid var(--lp-border)', borderBottom: '1px solid var(--lp-border)', padding: '80px 24px', textAlign: 'center' }} aria-label="Final call to action">
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '56px', height: '56px', borderRadius: '16px', background: 'var(--lp-teal-ghost)', border: '1px solid var(--lp-teal-light)', marginBottom: '28px' }}>
            <Shield size={22} color="var(--lp-teal)" />
          </div>
          <h2 style={{ fontFamily: 'var(--lp-serif)', fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 400, color: 'var(--lp-ink)', letterSpacing: '-0.02em', marginBottom: '16px', lineHeight: 1.15 }}>
            Start protected today.
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--lp-ink-muted)', lineHeight: 1.6, marginBottom: '36px' }}>
            Free to use. No credit card. Available in your browser right now.
          </p>
          <Link
            to="/signup" id="cta-banner-signup"
            style={{ display: 'inline-flex', alignItems: 'center', padding: '15px 36px', background: 'var(--lp-teal)', color: '#fff', textDecoration: 'none', borderRadius: '10px', fontWeight: 600, fontSize: '16px', boxShadow: '0 4px 20px rgba(15,118,110,0.3)', transition: 'opacity 0.15s, transform 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            Create your account
          </Link>
          <p style={{ fontSize: '12px', color: 'var(--lp-ink-ghost)', marginTop: '16px' }}>
            End-to-end encrypted · No data sold · Delete anytime
          </p>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer style={{ padding: '48px 24px 32px', borderTop: '1px solid var(--lp-border)' }} aria-label="Footer">
        <div style={{ maxWidth: '1120px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '48px', marginBottom: '48px' }} className="lp-footer-grid">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <Shield size={16} color="var(--lp-teal)" strokeWidth={2.5} />
                <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--lp-ink)', letterSpacing: '-0.02em' }}>SafeHer</span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--lp-ink-ghost)', lineHeight: 1.65, maxWidth: '240px' }}>
                Women's safety intelligence platform. Real-time, AI-powered, built with care.
              </p>
            </div>

            {[
              { heading: 'Product', links: ['Features', 'How it works', 'Security', 'Pricing'] },
              { heading: 'Legal', links: ['Privacy policy', 'Terms of service', 'Data processing', 'Cookie policy'] },
              { heading: 'Support', links: ['Help centre', 'Contact us', 'Report abuse', 'Status page'] },
            ].map(col => (
              <div key={col.heading}>
                <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--lp-ink)', marginBottom: '16px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{col.heading}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {col.links.map(l => (
                    <a key={l} href="#" style={{ fontSize: '13px', color: 'var(--lp-ink-ghost)', textDecoration: 'none', transition: 'color 0.15s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--lp-ink)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'var(--lp-ink-ghost)')}
                    >{l}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid var(--lp-border)', paddingTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <p style={{ fontSize: '12px', color: 'var(--lp-ink-ghost)' }}>© 2025 SafeHer AI. All rights reserved.</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={11} color="var(--lp-ink-ghost)" />
              <p style={{ fontSize: '12px', color: 'var(--lp-ink-ghost)' }}>Emergency? Call 112 immediately.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* ── RESPONSIVE OVERRIDES ─────────────────────────────── */}
      <style>{`
        @media (max-width: 768px) {
          .lp-hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .lp-nav-links { display: none !important; }
          .lp-hamburger { display: flex !important; }
          .lp-trust-grid { grid-template-columns: 1fr !important; }
          .lp-footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
          #nav-login, #nav-signup { display: none; }
        }
        @media (max-width: 480px) {
          .lp-footer-grid { grid-template-columns: 1fr !important; }
        }
        .lp a:focus-visible, .lp button:focus-visible {
          outline: 2px solid var(--lp-teal);
          outline-offset: 3px;
          border-radius: 4px;
        }
      `}</style>
    </div>
  )
}
