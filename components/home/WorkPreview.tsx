'use client'

import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { projects } from '@/lib/data/projects'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { EASE_EXPO, DURATION } from '@/lib/motion'

export function WorkPreview() {
  const featured = projects.slice(0, 4)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' })

  return (
    <section className="section-padding border-t border-[var(--border)]">
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div ref={ref} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
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
              <span className="block w-8 h-[1px] bg-[var(--text-secondary)] group-hover:w-12 transition-all duration-300" />
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {featured.map((project, i) => (
            <WorkItem key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function WorkItem({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })

  const isWide = project.span === 'wide' && index % 2 === 0

  return (
    <motion.div
      ref={ref}
      className={isWide ? 'md:col-span-2' : ''}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: DURATION.slow, ease: EASE_EXPO, delay: index * 0.07 }}
    >
      <Link href={`/work/${project.id}`} className="block group relative overflow-hidden">
        {/* Image/gradient placeholder */}
        <div
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: isWide ? '16/7' : '4/3' }}
        >
          <div
            className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
            style={{ background: project.gradient }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
          {/* Hover arrow */}
          <div className="absolute top-5 right-5 w-10 h-10 border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="white"
              strokeWidth="1.5"
            >
              <path d="M2 12L12 2M12 2H5M12 2v7" />
            </svg>
          </div>
        </div>
        {/* Meta */}
        <div className="flex items-start justify-between pt-4 pb-2">
          <div>
            <p className="font-body text-[10px] uppercase tracking-[0.18em] text-[var(--accent)] mb-1.5">
              {project.categoryLabel}
            </p>
            <h3 className="font-display font-light text-[1.35rem] leading-tight tracking-tight text-[var(--text-primary)] group-hover:text-white transition-colors duration-300">
              {project.title}
            </h3>
          </div>
          <span className="font-body text-[11px] text-[var(--text-muted)] mt-1 flex-shrink-0">
            {project.year}
          </span>
        </div>
      </Link>
    </motion.div>
  )
}
