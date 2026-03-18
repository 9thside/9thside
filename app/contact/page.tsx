'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { FadeUp } from '@/components/shared/FadeUp'
import { EASE_EXPO, DURATION } from '@/lib/motion'

const services = [
  'Website Design & Development',
  'Photography',
  'Videography & Film',
  'Creative Direction',
  'Wedding Coverage',
  'Real Estate Media',
  'Commercial Content',
  'Brand Systems',
  'Multiple / Not Sure',
]

const budgets = [
  'Under $2,500',
  '$2,500 – $5,000',
  '$5,000 – $10,000',
  '$10,000 – $25,000',
  '$25,000+',
  'Not sure yet',
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    service: '',
    budget: '',
    timeline: '',
    message: '',
  })

  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const inputClass =
    'w-full bg-[var(--surface-1)] border border-[var(--border)] text-[var(--text-primary)] font-body text-sm px-4 py-3.5 outline-none transition-all duration-200 placeholder:text-[var(--text-muted)] focus:border-[var(--border-md)] focus:bg-[var(--surface-2)]'

  const labelClass =
    'block font-body text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)] mb-2'

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <div className="pt-36 pb-16 px-6 md:px-10 max-w-[1320px] mx-auto border-b border-[var(--border)]">
        <div ref={headerRef} className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DURATION.base, ease: EASE_EXPO }}
            className="mb-5"
          >
            <SectionLabel>Get in Touch</SectionLabel>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DURATION.slow, ease: EASE_EXPO, delay: 0.08 }}
            className="font-display font-light text-[clamp(3rem,6vw,7rem)] leading-[0.95] tracking-tight text-[var(--text-primary)] mb-6"
          >
            Let's talk.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DURATION.base, ease: EASE_EXPO, delay: 0.18 }}
            className="font-body text-base text-[var(--text-secondary)] leading-relaxed"
          >
            Tell me what you're working on. I'll get back within 24 hours.
          </motion.p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1320px] mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-16 lg:gap-24">
          {/* Left: contact info */}
          <div>
            <FadeUp>
              <div className="space-y-8">
                <div>
                  <p className="font-body text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3">
                    Email
                  </p>
                  <a
                    href="mailto:hello@9thside.com"
                    className="font-body text-base text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300"
                  >
                    hello@9thside.com
                  </a>
                </div>
                <div>
                  <p className="font-body text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3">
                    Based in
                  </p>
                  <p className="font-body text-base text-[var(--text-secondary)]">
                    Toronto, Ontario<br />Available to travel
                  </p>
                </div>
                <div>
                  <p className="font-body text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3">
                    Response time
                  </p>
                  <p className="font-body text-base text-[var(--text-secondary)]">
                    Within 24 hours
                  </p>
                </div>
                <div className="pt-4">
                  <p className="font-body text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-4">
                    Follow
                  </p>
                  <div className="flex gap-4">
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-[11px] uppercase tracking-[0.14em] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-300"
                    >
                      Instagram
                    </a>
                    <span className="text-[var(--text-muted)]">·</span>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-[11px] uppercase tracking-[0.14em] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-300"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>

          {/* Right: form */}
          <FadeUp delay={0.1}>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: DURATION.slow, ease: EASE_EXPO }}
                className="text-center py-16"
              >
                <div className="w-12 h-12 border border-[var(--accent)] flex items-center justify-center mx-auto mb-8">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--accent)]">
                    <path d="M3 10l5 5L17 5" />
                  </svg>
                </div>
                <h2 className="font-display font-light text-3xl tracking-tight text-[var(--text-primary)] mb-4">
                  Message received.
                </h2>
                <p className="font-body text-base text-[var(--text-secondary)] leading-relaxed max-w-sm mx-auto">
                  I'll be in touch within 24 hours. Looking forward to hearing more about your project.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className={labelClass}>Your Name</label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Jane Smith"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>Email Address</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="jane@example.com"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className={labelClass}>Service Interest</label>
                  <select
                    id="service"
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className={`${inputClass} appearance-none cursor-pointer`}
                  >
                    <option value="" disabled>Select a service…</option>
                    {services.map((s) => (
                      <option key={s} value={s} style={{ background: '#0e0e0e' }}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="budget" className={labelClass}>Approximate Budget</label>
                    <select
                      id="budget"
                      value={form.budget}
                      onChange={(e) => setForm({ ...form, budget: e.target.value })}
                      className={`${inputClass} appearance-none cursor-pointer`}
                    >
                      <option value="" disabled>Select a range…</option>
                      {budgets.map((b) => (
                        <option key={b} value={b} style={{ background: '#0e0e0e' }}>{b}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="timeline" className={labelClass}>Timeline</label>
                    <input
                      id="timeline"
                      type="text"
                      placeholder="e.g. ASAP / 3 months"
                      value={form.timeline}
                      onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>Tell me about your project</label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="What are you building? What's the goal? Any context helps."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full font-body text-[11px] uppercase tracking-[0.18em] bg-[var(--text-primary)] text-bg py-4 hover:bg-white transition-colors duration-300"
                >
                  Send Message
                </button>
              </form>
            )}
          </FadeUp>
        </div>
      </div>
    </div>
  )
}
