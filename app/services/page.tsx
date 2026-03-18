'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { services } from '@/lib/data/services'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { FadeUp } from '@/components/shared/FadeUp'
import { EASE_EXPO, DURATION } from '@/lib/motion'

export default function ServicesPage() {
  const [openId, setOpenId] = useState<string | null>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true })

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <div className="pt-36 pb-20 px-6 md:px-10 max-w-[1320px] mx-auto border-b border-[var(--border)]">
        <div ref={headerRef} className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DURATION.base, ease: EASE_EXPO }}
            className="mb-5"
          >
            <SectionLabel>Services</SectionLabel>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DURATION.slow, ease: EASE_EXPO, delay: 0.08 }}
            className="font-display font-light text-[clamp(3rem,6vw,7rem)] leading-[0.95] tracking-tight text-[var(--text-primary)] mb-8"
          >
            What we build.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DURATION.base, ease: EASE_EXPO, delay: 0.16 }}
            className="font-body text-base text-[var(--text-secondary)] leading-relaxed"
          >
            Not a menu of offerings. One creative point of view — applied to the problem at hand. Whether that&apos;s a website, a photo shoot, or a brand film, the standard doesn&apos;t change.
          </motion.p>
        </div>
      </div>

      {/* Service Cards Grid */}
      <div className="max-w-[1320px] mx-auto px-6 md:px-10 py-16 md:py-20 border-b border-[var(--border)]">
        <FadeUp className="mb-10">
          <SectionLabel>Explore each service</SectionLabel>
        </FadeUp>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>

      {/* Services accordion */}
      <div className="max-w-[1320px] mx-auto px-6 md:px-10 py-16 md:py-20">
        <FadeUp className="mb-10">
          <SectionLabel>All services</SectionLabel>
        </FadeUp>
        <div className="divide-y divide-[var(--border)]">
          {services.map((service, i) => (
            <ServiceRow
              key={service.id}
              service={service}
              index={i}
              isOpen={openId === service.id}
              onToggle={() => setOpenId(openId === service.id ? null : service.id)}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 pt-16 border-t border-[var(--border)] text-center">
          <p className="font-body text-base text-[var(--text-secondary)] mb-8 max-w-md mx-auto leading-relaxed">
            Not sure which service fits? Reach out and we&apos;ll figure it out together.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center font-body text-[11px] uppercase tracking-[0.18em] bg-[var(--text-primary)] text-bg px-8 py-4 hover:bg-white transition-colors duration-300"
          >
            Start a Conversation
          </Link>
        </div>
      </div>
    </div>
  )
}

// ── Service Card ──────────────────────────────────────────────────
function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -32px 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: DURATION.base, ease: EASE_EXPO, delay: index * 0.06 }}
    >
      <Link
        href={`/services/${service.id}`}
        className="group relative flex flex-col p-6 md:p-7 border border-[var(--border)] bg-[var(--surface-1)] hover:border-[var(--border-md)] transition-all duration-500 overflow-hidden min-h-[220px]"
      >
        {/* Service-specific tint on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 20% 80%, ${service.accentColor} 0%, transparent 70%)`,
          }}
        />

        {/* Top row: number + arrow */}
        <div className="relative z-10 flex items-start justify-between mb-auto">
          <span className="font-body text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
            {service.index}
          </span>
          <motion.span
            className="text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors duration-300"
            animate={{ x: 0, y: 0 }}
            whileHover={{ x: 2, y: -2 }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2 12L12 2M12 2H5M12 2v7" />
            </svg>
          </motion.span>
        </div>

        {/* Service title + tagline */}
        <div className="relative z-10 mt-8">
          <h3 className="font-display font-light text-[1.35rem] md:text-[1.5rem] leading-snug tracking-tight text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors duration-300 mb-2">
            {service.title}
          </h3>
          <p className="font-body text-sm text-[var(--text-muted)] leading-relaxed line-clamp-2">
            {service.tagline}
          </p>
        </div>

        {/* Bottom: explore link */}
        <div className="relative z-10 mt-5 pt-4 border-t border-[var(--border)]">
          <span className="font-body text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors duration-300 inline-flex items-center gap-2">
            Explore
            <span className="block w-4 h-[1px] bg-current group-hover:w-8 transition-all duration-300" />
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

// ── Service Row (accordion) ───────────────────────────────────────
function ServiceRow({
  service,
  index,
  isOpen,
  onToggle,
}: {
  service: typeof services[0]
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -32px 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: DURATION.base, ease: EASE_EXPO, delay: index * 0.05 }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-7 text-left group"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-6 md:gap-10">
          <span className="font-body text-[10px] text-[var(--text-muted)] tracking-[0.12em] w-6 flex-shrink-0">
            {service.index}
          </span>
          <h2 className="font-display font-light text-[clamp(1.5rem,2.5vw,2.25rem)] leading-tight tracking-tight text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors duration-300">
            {service.title}
          </h2>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: EASE_EXPO }}
          className="w-8 h-8 flex-shrink-0 border border-[var(--border-md)] flex items-center justify-center ml-4"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--text-secondary)]">
            <path d="M6 1v10M1 6h10" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE_EXPO }}
            className="overflow-hidden"
          >
            <div className="pb-10 pl-12 md:pl-16 grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-8 md:gap-12">
              <div>
                <p className="font-body text-base text-[var(--text-secondary)] leading-relaxed mb-6">
                  {service.description}
                </p>
                <div>
                  <p className="font-body text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)] mb-3">
                    Includes
                  </p>
                  <ul className="space-y-2">
                    {service.areas.map((area) => (
                      <li key={area} className="flex items-center gap-3 font-body text-sm text-[var(--text-secondary)]">
                        <span className="w-1 h-1 rounded-full bg-[var(--accent)] flex-shrink-0" />
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <div className="mb-6">
                  <p className="font-body text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)] mb-2">
                    For Who
                  </p>
                  <p className="font-body text-sm text-[var(--text-secondary)] leading-relaxed">
                    {service.forWho}
                  </p>
                </div>
                <div>
                  <p className="font-body text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)] mb-2">
                    Outcome
                  </p>
                  <p className="font-body text-sm text-[var(--accent)] leading-relaxed font-medium">
                    {service.outcome}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-start md:items-end gap-3 justify-end">
                <Link
                  href={`/services/${service.id}`}
                  className="font-body text-[10px] uppercase tracking-[0.18em] border border-[var(--border-md)] text-[var(--text-secondary)] px-5 py-2.5 hover:text-[var(--text-primary)] hover:border-[var(--text-muted)] transition-all duration-300 whitespace-nowrap"
                >
                  Learn More
                </Link>
                <Link
                  href="/contact"
                  className="font-body text-[10px] uppercase tracking-[0.18em] border border-[var(--accent)] text-[var(--accent)] px-5 py-2.5 hover:bg-[var(--accent)] hover:text-bg transition-all duration-300 whitespace-nowrap"
                >
                  Inquire
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
