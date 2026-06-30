'use client'

import { Link } from 'react-router-dom'
import { Menu, X, Shield, Brain, Mic2, Map, ArrowRight, Check, AlertCircle } from 'lucide-react'
import { useState } from 'react'

export default function Landing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)]">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--bg-base)]/95 backdrop-blur h-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-[var(--primary)]" />
              <span className="text-sm font-semibold text-[var(--text-primary)]">SafeHer</span>
              <span className="text-sm text-[var(--accent)] font-medium">AI</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-150">
                Features
              </a>
              <a href="#stats" className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-150">
                Impact
              </a>
              <a href="#testimonials" className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-150">
                Stories
              </a>
            </div>

            <div className="hidden md:flex items-center gap-2">
              <Link
                to="/login"
                className="px-3 py-1.5 text-xs border border-[var(--border)] rounded-md hover:border-[var(--border-focus)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-150"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="px-3 py-1.5 text-xs bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white rounded-md font-medium transition-colors duration-150"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-14 left-0 right-0 bg-[var(--bg-surface)] border-b border-[var(--border)] p-3 space-y-2">
              <a href="#features" className="block px-3 py-2 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Features</a>
              <a href="#stats" className="block px-3 py-2 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Impact</a>
              <a href="#testimonials" className="block px-3 py-2 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Stories</a>
              <div className="border-t border-[var(--border)] pt-2 mt-2 space-y-2">
                <Link to="/login" className="block px-3 py-2 text-xs border border-[var(--border)] rounded-md text-center">Log in</Link>
                <Link to="/signup" className="block px-3 py-2 text-xs bg-[var(--primary)] text-white rounded-md font-medium text-center">Get Started</Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 md:py-32 px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-1 h-4 bg-[var(--primary)] rounded-full"></div>
            <span className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-medium">
              AI-POWERED SAFETY INTELLIGENCE
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight font-heading">
            Predict risk.{'\n'}Navigate safer.{'\n'}Never face danger alone.
          </h1>

          {/* Subheading */}
          <p className="text-[var(--text-secondary)] text-base leading-relaxed mb-8 max-w-md mx-auto">
            Real-time safety intelligence that keeps you protected. From risk prediction to emergency response.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center mb-8">
            <Link
              to="/signup"
              className="px-4 py-2.5 text-sm bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white rounded-md font-medium transition-colors duration-150 flex items-center gap-2"
            >
              Get Started Free <ArrowRight size={16} />
            </Link>
            <button className="px-4 py-2.5 text-sm border border-[var(--border)] rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-focus)] transition-colors duration-150">
              See a demo
            </button>
          </div>

          {/* Trust Row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-[var(--text-muted)] border-t border-[var(--border)] pt-8">
            <div className="flex items-center gap-1">
              <span>🔒</span>
              <span>End-to-end encrypted</span>
            </div>
            <div className="hidden sm:block text-[var(--border)]">·</div>
            <div className="flex items-center gap-1">
              <span>📵</span>
              <span>Works offline</span>
            </div>
            <div className="hidden sm:block text-[var(--border)]">·</div>
            <div className="flex items-center gap-1">
              <span>🏛️</span>
              <span>Govt. verified helplines</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 px-4 border-t border-[var(--border)] mt-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center font-heading">
            Core features for real safety
          </h2>

          <div className="grid md:grid-cols-3 gap-0 md:gap-0">
            {/* Feature 1 */}
            <div className="p-8 md:border-r md:border-[var(--border)]">
              <Brain className="w-5 h-5 text-[var(--accent)] mb-4" />
              <h3 className="text-sm font-semibold mb-2 text-[var(--text-primary)]">AI Risk Prediction</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">Know danger before you reach it. Real-time location analysis powered by machine learning.</p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 md:border-r md:border-[var(--border)]">
              <Mic2 className="w-5 h-5 text-[var(--accent)] mb-4" />
              <h3 className="text-sm font-semibold mb-2 text-[var(--text-primary)]">Voice SOS</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">Hands-free emergency. One command alerts your emergency contacts with your live location.</p>
            </div>

            {/* Feature 3 */}
            <div className="p-8">
              <Map className="w-5 h-5 text-[var(--accent)] mb-4" />
              <h3 className="text-sm font-semibold mb-2 text-[var(--text-primary)]">Safe Route Finder</h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">Not fastest. Safest. Navigate using verified safe corridors with real-time updates.</p>
            </div>
          </div>

          {/* Stats */}
          <div id="stats" className="mt-16 border-t border-[var(--border)] pt-12">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <p className="text-3xl md:text-4xl font-medium text-[var(--text-primary)] font-mono">50K+</p>
                <p className="text-xs text-[var(--text-muted)] mt-2">Women Protected</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-medium text-[var(--text-primary)] font-mono">120+</p>
                <p className="text-xs text-[var(--text-muted)] mt-2">Cities Active</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-medium text-[var(--text-primary)] font-mono">99.8%</p>
                <p className="text-xs text-[var(--text-muted)] mt-2">Uptime SLA</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 md:py-24 px-4 border-t border-[var(--border)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center font-heading">
            Trusted by women worldwide
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Priya', city: 'Mumbai, India', quote: 'SafeHer gave me confidence to travel at night. The alerts are spot on.' },
              { name: 'Aisha', city: 'Bangalore, India', quote: 'Voice SOS saved me once. Now I always keep it active.' },
              { name: 'Neha', city: 'Delhi, India', quote: 'Finally an app that understands real women safety concerns.' }
            ].map((testimonial, i) => (
              <div key={i} className="p-5 bg-[var(--bg-surface)] border border-[var(--border)] rounded-[10px] border-l-2 border-l-[var(--border-focus)]">
                <p className="text-sm text-[var(--text-secondary)] italic mb-4">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">{testimonial.name}</p>
                  <p className="text-xs text-[var(--text-muted)]">{testimonial.city}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 gap-8 mb-8 text-xs text-[var(--text-muted)]">
            <div>
              <p className="font-medium text-[var(--text-secondary)] mb-3">Product</p>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[var(--text-primary)] transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-[var(--text-primary)] transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-[var(--text-secondary)] mb-3">Legal</p>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[var(--text-primary)] transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-[var(--text-primary)] transition-colors">Terms</a></li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-[var(--text-secondary)] mb-3">Help</p>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-[var(--text-primary)] transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-[var(--text-primary)] transition-colors">Support</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[var(--border)] pt-6 text-xs text-[var(--text-muted)] text-center">
            <p>© 2025 SafeHer AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
