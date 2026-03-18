'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { services } from '@/lib/data/services'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { EASE_EXPO, DURATION } from '@/lib/motion'

export function ServicesGlance() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '0px 0px -60px 0px' })

  return (
    <section className="section-padding border-t border-[var(--border)] bg-[var(--surface-1)]">
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 lg:gap-24">
          {/* Left: header */}
          <div ref={headerRef} className="lg:sticky lg:top-32 lg:self-start">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: DURATION.base, ease: EASE_EXPO }}
              className="mb-4"
            >
              <SectionLabel>What We Build</SectionLabel>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: DURATION.slow, ease: EASE_EXPO, delay: 0.08 }}
              className="font-display font-light text-[clamp(2.25rem,3.5vw,3.5rem)] leading-[1.1] tracking-tight text-[var(--text-primary)] mb-6"
            >
              One point of view. Many mediums.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: DURATION.base, ease: EASE_EXPO, delay: 0.16 }}
              className="font-body text-sm text-[var(--text-secondary)] leading-relaxed mb-8 max-w-xs"
            >
              Not a menu of offerings. One creative point of view, applied to whatever the work demands.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={headerInView ? { opacity: 1 } : {}}
              transition={{ duration: DURATION.base, delay: 0.24 }}
            >
              <Link
                href="/services"
                className="font-body text-[11px] uppercase tracking-[0.18em] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300 flex items-center gap-3 group"
              >
                All Services
                <span className="block w-8 h-[1px] bg-[var(--text-secondary)] group-hover:w-12 transition-all duration-300" />
              </Link>
            </motion.div>
          </div>

          {/* Right: service list */}
          <div className="divide-y divide-[var(--border)]">
            {services.map((service, i) => (
              <ServiceRow key={service.id} service={service} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ServiceRow({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -32px 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: DURATION.slow, ease: EASE_EXPO, delay: index * 0.05 }}
      className="group py-6 flex items-center gap-6 cursor-default"
    >
      <span className="font-body text-[10px] text-[var(--text-muted)] tracking-[0.12em] w-7 flex-shrink-0">
        {service.index}
      </span>
      <div className="flex-1">
        <h3 className="font-display font-light text-[1.35rem] leading-tight tracking-tight text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors duration-300">
          {service.title}
        </h3>
      </div>
      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-[var(--accent)]"
        >
          <path d="M2 14L14 2M14 2H6M14 2v8" />
        </svg>
      </span>
    </motion.div>
  )
}
