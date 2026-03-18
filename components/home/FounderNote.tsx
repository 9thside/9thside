'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { EASE_EXPO, DURATION } from '@/lib/motion'

export function FounderNote() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' })

  return (
    <section className="section-padding border-t border-[var(--border)]">
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: large statement */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: DURATION.base, ease: EASE_EXPO }}
              className="mb-6"
            >
              <SectionLabel>About the Studio</SectionLabel>
            </motion.div>

            {/* Big quote */}
            <div className="overflow-hidden mb-8">
              <motion.h2
                initial={{ y: '100%', opacity: 0 }}
                animate={inView ? { y: '0%', opacity: 1 } : {}}
                transition={{ duration: DURATION.xl, ease: EASE_EXPO, delay: 0.1 }}
                className="font-display font-light italic text-[clamp(2rem,3.5vw,3.75rem)] leading-[1.15] tracking-tight text-[var(--text-primary)]"
              >
                "I started by learning to see. That shaped everything that came after."
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={inView ? { opacity: 1, scaleX: 1 } : {}}
              transition={{ duration: DURATION.base, ease: EASE_EXPO, delay: 0.3 }}
              className="w-16 h-[1px] bg-[var(--accent)] origin-left mb-8"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: DURATION.base, delay: 0.35 }}
              className="font-body text-[11px] uppercase tracking-[0.18em] text-[var(--accent)]"
            >
              — Nabeel Rushdi, Founder
            </motion.p>
          </div>

          {/* Right: bio + CTA */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: DURATION.slow, ease: EASE_EXPO, delay: 0.15 }}
              className="font-body text-base md:text-[1.0625rem] text-[var(--text-secondary)] leading-relaxed mb-5"
            >
              9thside is Nabeel Rushdi — a multidisciplinary creative and founder based in Toronto. The work spans web design and development, photography, film, and brand. It started with a camera in 2016. It expanded into product and startup leadership. It now lives at the intersection of all of it.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: DURATION.slow, ease: EASE_EXPO, delay: 0.22 }}
              className="font-body text-base md:text-[1.0625rem] text-[var(--text-secondary)] leading-relaxed mb-10"
            >
              The through-line isn't a discipline — it's a standard. Every touchpoint should hold up.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: DURATION.base, delay: 0.3 }}
              className="flex flex-wrap items-center gap-5"
            >
              <Link
                href="/about"
                className="font-body text-[11px] uppercase tracking-[0.18em] border border-[var(--border-md)] text-[var(--text-primary)] px-6 py-3 hover:bg-[var(--surface-2)] transition-all duration-300"
              >
                Full Story
              </Link>
              <Link
                href="/contact"
                className="font-body text-[11px] uppercase tracking-[0.18em] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300 flex items-center gap-3 group"
              >
                Work Together
                <span className="block w-6 h-[1px] bg-[var(--text-secondary)] group-hover:w-10 transition-all duration-300" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
