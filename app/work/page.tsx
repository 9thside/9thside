'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { projects, type Project } from '@/lib/data/projects'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { EASE_EXPO, DURATION } from '@/lib/motion'

type FilterKey = 'all' | Project['category']

const filters: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'web', label: 'Web' },
  { key: 'photo', label: 'Photo' },
  { key: 'film', label: 'Film' },
  { key: 'wedding', label: 'Wedding' },
  { key: 'commercial', label: 'Commercial' },
  { key: 'real-estate', label: 'Real Estate' },
  { key: 'brand', label: 'Brand' },
]

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all')
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true })

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter)

  return (
    <div className="min-h-screen bg-bg">
      {/* Page header */}
      <div className="pt-36 pb-16 px-6 md:px-10 max-w-[1320px] mx-auto border-b border-[var(--border)]">
        <div ref={headerRef}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DURATION.base, ease: EASE_EXPO }}
            className="mb-5"
          >
            <SectionLabel>Selected Work</SectionLabel>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DURATION.slow, ease: EASE_EXPO, delay: 0.08 }}
            className="font-display font-light text-[clamp(3rem,6vw,7rem)] leading-[0.95] tracking-tight text-[var(--text-primary)] mb-6"
          >
            Work
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DURATION.base, ease: EASE_EXPO, delay: 0.16 }}
            className="font-body text-base text-[var(--text-secondary)] max-w-md leading-relaxed"
          >
            Curated work across web, photography, film, and brand. Each project built with a clear point of view.
          </motion.p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="px-6 md:px-10 max-w-[1320px] mx-auto py-8 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={`font-body text-[10px] uppercase tracking-[0.18em] px-4 py-2 border transition-all duration-250 ${
              activeFilter === f.key
                ? 'border-[var(--text-primary)] text-[var(--text-primary)] bg-[var(--surface-2)]'
                : 'border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:border-[var(--border-md)]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="px-6 md:px-10 max-w-[1320px] mx-auto pb-24">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: EASE_EXPO, delay: i * 0.04 }}
                className={project.span === 'wide' ? 'md:col-span-2' : ''}
              >
                <Link href={`/work/${project.id}`} className="block group">
                  {/* Media */}
                  <div
                    className="relative w-full overflow-hidden mb-4"
                    style={{ aspectRatio: project.span === 'wide' ? '16/7' : '4/3' }}
                  >
                    <div
                      className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                      style={{ background: project.gradient }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-400" />
                    <div className="absolute top-4 right-4 w-9 h-9 border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="1.5">
                        <path d="M1 11L11 1M11 1H4M11 1v7" />
                      </svg>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-body text-[9px] uppercase tracking-[0.2em] text-[var(--accent)] mb-1.5">
                        {project.categoryLabel}
                      </p>
                      <h3 className="font-display font-light text-[1.2rem] tracking-tight text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors duration-300">
                        {project.title}
                      </h3>
                    </div>
                    <span className="font-body text-[10px] text-[var(--text-muted)] mt-0.5 flex-shrink-0">
                      {project.year}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
