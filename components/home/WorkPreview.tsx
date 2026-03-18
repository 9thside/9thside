'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { projects } from '@/lib/data/projects'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { EASE_EXPO, DURATION } from '@/lib/motion'

export function WorkPreview() {
  const featured = projects.filter((p) => p.featured).slice(0, 1)[0]
  const secondary = projects.filter((p) => !p.featured).slice(0, 2)

  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' })

  return (
    <section className="section-padding border-t border-[var(--border)]">
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">

        {/* Header */}
        <div ref={ref} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-14">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: DURATION.base, ease: EASE_EXPO }}
              className="mb-4"
            >
              <SectionLabel>Selected Work</SectionLabel>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: DURATION.slow, ease: EASE_EXPO, delay: 0.08 }}
              className="font-display font-light text-[clamp(2.25rem,4vw,4rem)] leading-[1.1] tracking-tight text-[var(--text-primary)]"
            >
              Work that holds attention.
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: DURATION.base, delay: 0.2 }}
          >
            <Link
              href="/work"
              className="font-body text-[11px] uppercase tracking-[0.18em] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300 flex items-center gap-3 group"
            >
              All Work
              <span className="block w-8 h-[1px] bg-current group-hover:w-12 transition-all duration-300" />
            </Link>
          </motion.div>
        </div>

        {/* Featured hero row */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DURATION.slow, ease: EASE_EXPO, delay: 0.1 }}
            className="mb-4 md:mb-5"
          >
            <WorkCard project={featured} aspectRatio="16/7" priority />
          </motion.div>
        )}

        {/* Two-column secondary row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {secondary.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: DURATION.slow, ease: EASE_EXPO, delay: 0.18 + i * 0.08 }}
            >
              <WorkCard project={project} aspectRatio="4/3" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

function WorkCard({
  project,
  aspectRatio,
  priority = false,
}: {
  project: typeof projects[0]
  aspectRatio: string
  priority?: boolean
}) {
  return (
    <Link href={`/work/${project.id}`} className="block group">
      {/* Image */}
      <div className="relative w-full overflow-hidden bg-[var(--surface-2)]" style={{ aspectRatio }}>
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1320px) 50vw, 660px"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
        {/* Subtle darkening scrim */}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500" />
        {/* Arrow icon */}
        <div className="absolute top-5 right-5 w-9 h-9 border border-white/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 bg-black/20 backdrop-blur-sm">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="1.5">
            <path d="M1 11L11 1M11 1H4M11 1v7" />
          </svg>
        </div>
      </div>

      {/* Meta */}
      <div className="flex items-center justify-between pt-4">
        <div className="flex items-center gap-4">
          <p className="font-body text-[9px] uppercase tracking-[0.2em] text-[var(--accent)]">
            {project.categoryLabel}
          </p>
          <h3 className="font-display font-light text-[1.15rem] leading-tight tracking-tight text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors duration-300">
            {project.title}
          </h3>
        </div>
        <span className="font-body text-[10px] text-[var(--text-muted)] flex-shrink-0 ml-4">
          {project.year}
        </span>
      </div>
    </Link>
  )
}
