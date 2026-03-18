'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
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
      <div className="pt-36 pb-14 px-6 md:px-10 max-w-[1320px] mx-auto border-b border-[var(--border)]">
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
            className="font-display font-light text-[clamp(3rem,6vw,7rem)] leading-[0.95] tracking-tight text-[var(--text-primary)] mb-5"
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
      <div className="sticky top-[68px] z-30 bg-[var(--bg)] border-b border-[var(--border)]">
        <div className="px-6 md:px-10 max-w-[1320px] mx-auto py-4 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`font-body text-[10px] uppercase tracking-[0.18em] px-4 py-2 border transition-all duration-250 ${
                activeFilter === f.key
                  ? 'border-[var(--text-primary)] text-[var(--text-primary)]'
                  : 'border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:border-[var(--border-md)]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="px-6 md:px-10 max-w-[1320px] mx-auto py-12 md:py-16">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-12"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.4, ease: EASE_EXPO, delay: i * 0.04 }}
              >
                <WorkCard project={project} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

    </div>
  )
}

function WorkCard({ project, index }: { project: Project; index: number }) {
  return (
    <Link href={`/work/${project.id}`} className="block group">
      {/* Image */}
      <div className="relative w-full overflow-hidden bg-[var(--surface-2)]" style={{ aspectRatio: '4/3' }}>
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors duration-500" />
        <div className="absolute top-4 right-4 w-8 h-8 border border-white/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 bg-black/20 backdrop-blur-sm">
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="1.5">
            <path d="M1 11L11 1M11 1H4M11 1v7" />
          </svg>
        </div>
      </div>

      {/* Meta */}
      <div className="pt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-body text-[9px] uppercase tracking-[0.2em] text-[var(--accent)] mb-1.5">
            {project.categoryLabel}
          </p>
          <h3 className="font-display font-light text-[1.1rem] leading-tight tracking-tight text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors duration-300 truncate">
            {project.title}
          </h3>
        </div>
        <span className="font-body text-[10px] text-[var(--text-muted)] flex-shrink-0 mt-5">
          {project.year}
        </span>
      </div>
    </Link>
  )
}
