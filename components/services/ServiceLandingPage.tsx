'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import type { Service } from '@/lib/data/services'
import type { Project } from '@/lib/data/projects'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { FadeUp } from '@/components/shared/FadeUp'
import { EASE_EXPO, DURATION } from '@/lib/motion'

interface ServiceLandingPageProps {
  service: Service
  relatedWork: Project[]
}

export function ServiceLandingPage({ service, relatedWork }: ServiceLandingPageProps) {
  return (
    <div className="min-h-screen bg-bg">
      <ServiceHero service={service} />
      <ServiceIntro service={service} />
      <ServiceFeatures service={service} />
      <ServiceProcess service={service} />
      {relatedWork.length > 0 && <ServiceWork service={service} work={relatedWork} />}
      <ServiceFAQ service={service} />
      <ServiceCTA service={service} />
    </div>
  )
}

// ── Hero ──────────────────────────────────────────────────────────
function ServiceHero({ service }: { service: Service }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  return (
    <section
      className="relative min-h-[85vh] flex flex-col justify-end overflow-hidden"
      style={{ background: service.heroGradient }}
    >
      {/* Accent glow overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 30% 60%, ${service.accentColor} 0%, transparent 65%)`,
        }}
      />

      {/* Large ambient rotating triangle */}
      <div className="absolute top-0 right-0 opacity-[0.04] pointer-events-none overflow-hidden">
        <motion.svg
          viewBox="0 0 200 175"
          width="50vw"
          fill="none"
          stroke="rgba(240,237,232,0.8)"
          strokeWidth="0.5"
          animate={{ rotate: 360 }}
          transition={{ duration: 240, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '50% 50%' }}
        >
          <polygon points="100,8 20,167 180,167" />
        </motion.svg>
      </div>

      {/* Secondary ambient shape */}
      <div className="absolute bottom-1/3 left-[-5%] opacity-[0.025] pointer-events-none">
        <motion.svg
          viewBox="0 0 200 175"
          width="35vw"
          fill="none"
          stroke="rgba(240,237,232,0.9)"
          strokeWidth="0.4"
          animate={{ rotate: -360 }}
          transition={{ duration: 320, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '50% 50%' }}
        >
          <polygon points="100,8 20,167 180,167" />
        </motion.svg>
      </div>

      <div ref={ref} className="relative z-10 max-w-[1320px] mx-auto px-6 md:px-10 pb-16 md:pb-20 pt-40 w-full">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: DURATION.base, ease: EASE_EXPO }}
          className="mb-6"
        >
          <Link
            href="/services"
            className="font-body text-[10px] uppercase tracking-[0.2em] text-[var(--accent)] hover:opacity-75 transition-opacity duration-300 inline-flex items-center gap-2"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M10 6H2M2 6L5 3M2 6L5 9" />
            </svg>
            All Services
          </Link>
        </motion.div>

        {/* Index / short title */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: DURATION.base, ease: EASE_EXPO, delay: 0.08 }}
          className="font-body text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-5"
        >
          {service.index}&nbsp;&nbsp;/&nbsp;&nbsp;{service.shortTitle}
        </motion.p>

        {/* Large headline — line-by-line reveal */}
        <h1 className="font-display font-light text-[clamp(3.5rem,7vw,8.5rem)] leading-[0.92] tracking-tight text-[var(--text-primary)] mb-8 max-w-4xl">
          {service.title.split(' & ').join('\n& ').split('\n').map((line, i) => (
            <div key={i} style={{ overflow: 'hidden' }}>
              <motion.span
                style={{ display: 'block' }}
                initial={{ y: '110%', opacity: 0 }}
                animate={inView ? { y: '0%', opacity: 1 } : {}}
                transition={{ duration: DURATION.xl, ease: EASE_EXPO, delay: 0.12 + i * 0.08 }}
              >
                {line}
              </motion.span>
            </div>
          ))}
        </h1>

        {/* Tagline */}
        <div style={{ overflow: 'hidden' }}>
          <motion.p
            initial={{ y: '100%', opacity: 0 }}
            animate={inView ? { y: '0%', opacity: 1 } : {}}
            transition={{ duration: DURATION.slow, ease: EASE_EXPO, delay: 0.3 }}
            className="font-display font-light italic text-[clamp(1.1rem,1.6vw,1.5rem)] text-[var(--text-secondary)] max-w-xl leading-relaxed"
          >
            {service.tagline}
          </motion.p>
        </div>

        {/* Scroll nudge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: DURATION.base, ease: EASE_EXPO, delay: 0.55 }}
          className="mt-12 flex items-center gap-3"
        >
          <div className="w-[1px] h-8 bg-[var(--border-md)]" />
          <span className="font-body text-[9px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
            Scroll to explore
          </span>
        </motion.div>
      </div>

      {/* Bottom gradient fade to bg */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent pointer-events-none" />
    </section>
  )
}

// ── Intro ─────────────────────────────────────────────────────────
function ServiceIntro({ service }: { service: Service }) {
  return (
    <section className="border-t border-[var(--border)] py-20 md:py-28">
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-24 items-start">
          <FadeUp>
            <SectionLabel className="mb-4 block">The approach</SectionLabel>
            <h2 className="font-display font-light text-[clamp(2rem,3.5vw,3.25rem)] leading-[1.1] tracking-tight text-[var(--text-primary)]">
              What this<br />actually means.
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="font-body text-[1.0625rem] text-[var(--text-secondary)] leading-[1.8] mb-6">
              {service.description}
            </p>
            <p className="font-body text-[1.0625rem] text-[var(--text-secondary)] leading-[1.8] mb-10">
              {service.heroDescription}
            </p>

            {/* Outcome callout */}
            <div className="border-l-2 border-[var(--accent)] pl-5 mb-10">
              <p className="font-body text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)] mb-1.5">
                The outcome
              </p>
              <p className="font-display font-light italic text-[1.125rem] text-[var(--accent)] leading-snug">
                {service.outcome}
              </p>
            </div>

            {/* Area tags */}
            <div className="flex flex-wrap items-center gap-2">
              {service.areas.map((area) => (
                <span
                  key={area}
                  className="font-body text-[10px] uppercase tracking-[0.14em] border border-[var(--border)] text-[var(--text-muted)] px-3 py-1.5"
                >
                  {area}
                </span>
              ))}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}

// ── Features ──────────────────────────────────────────────────────
function ServiceFeatures({ service }: { service: Service }) {
  return (
    <section className="border-t border-[var(--border)] py-20 md:py-28 bg-[var(--surface-1)]">
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">
        <FadeUp className="mb-14 md:mb-16">
          <SectionLabel className="mb-4 block">What&apos;s included</SectionLabel>
          <h2 className="font-display font-light text-[clamp(2rem,3.5vw,3.25rem)] leading-[1.1] tracking-tight text-[var(--text-primary)]">
            Everything in scope.
          </h2>
        </FadeUp>

        {/* Feature grid — separated by 1px border lines */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border)]">
          {service.features.map((feature, i) => (
            <FadeUp key={feature.title} delay={i * 0.06}>
              <div className="bg-[var(--surface-1)] p-7 md:p-8 h-full group hover:bg-[var(--surface-2)] transition-colors duration-400">
                {/* Triangle icon */}
                <div className="w-5 h-5 mb-5 opacity-50 group-hover:opacity-80 transition-opacity duration-300">
                  <svg viewBox="0 0 200 175" fill="currentColor" className="text-[var(--accent)] w-full h-full">
                    <polygon points="100,8 20,167 180,167" />
                  </svg>
                </div>
                <h3 className="font-display font-light text-[1.25rem] tracking-tight text-[var(--text-primary)] mb-3">
                  {feature.title}
                </h3>
                <p className="font-body text-sm text-[var(--text-secondary)] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Process ───────────────────────────────────────────────────────
function ServiceProcess({ service }: { service: Service }) {
  return (
    <section className="border-t border-[var(--border)] py-20 md:py-28">
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">
        <FadeUp className="mb-14 md:mb-16">
          <SectionLabel className="mb-4 block">How it works</SectionLabel>
          <h2 className="font-display font-light text-[clamp(2rem,3.5vw,3.25rem)] leading-[1.1] tracking-tight text-[var(--text-primary)]">
            The process.
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {service.process.map((step, i) => (
            <FadeUp key={step.number} delay={i * 0.08}>
              <div className="relative">
                {/* Step number + line */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-body text-[10px] uppercase tracking-[0.18em] text-[var(--accent)] flex-shrink-0">
                    {step.number}
                  </span>
                  <div className="flex-1 h-[1px] bg-[var(--border)]" />
                </div>
                <h3 className="font-display font-light text-[1.35rem] leading-snug tracking-tight text-[var(--text-primary)] mb-3">
                  {step.title}
                </h3>
                <p className="font-body text-sm text-[var(--text-secondary)] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* Connecting dots visual — desktop only */}
        <FadeUp delay={0.4} className="hidden lg:block mt-12 relative">
          <div className="flex items-center">
            {service.process.map((step, i) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="w-2 h-2 rounded-full bg-[var(--accent)] opacity-40 flex-shrink-0" />
                {i < service.process.length - 1 && (
                  <div className="flex-1 h-[1px] bg-[var(--border)]" />
                )}
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

// ── Related Work ──────────────────────────────────────────────────
function ServiceWork({ service, work }: { service: Service; work: Project[] }) {
  return (
    <section className="border-t border-[var(--border)] py-20 md:py-28 bg-[var(--surface-1)]">
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">
        <div className="flex items-end justify-between mb-12 md:mb-14">
          <FadeUp>
            <SectionLabel className="mb-4 block">Selected Work</SectionLabel>
            <h2 className="font-display font-light text-[clamp(2rem,3.5vw,3.25rem)] leading-[1.1] tracking-tight text-[var(--text-primary)]">
              Recent {service.shortTitle.toLowerCase()} projects.
            </h2>
          </FadeUp>
          <FadeUp delay={0.1} className="hidden md:block">
            <Link
              href={`/work?filter=${service.workCategory}`}
              className="font-body text-[11px] uppercase tracking-[0.18em] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300 flex items-center gap-3 group"
            >
              All Work
              <span className="block w-6 h-[1px] bg-current group-hover:w-10 transition-all duration-300" />
            </Link>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {work.map((project, i) => (
            <FadeUp key={project.id} delay={i * 0.07}>
              <Link href={`/work/${project.id}`} className="block group">
                <div className="relative overflow-hidden mb-4" style={{ aspectRatio: '4/3' }}>
                  <div
                    className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    style={{ background: project.gradient }}
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-500" />
                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="font-body text-[9px] uppercase tracking-[0.18em] text-[var(--text-primary)] bg-black/40 backdrop-blur-sm px-2.5 py-1.5">
                      {project.categoryLabel}
                    </span>
                  </div>
                </div>
                <p className="font-body text-[9px] uppercase tracking-[0.2em] text-[var(--accent)] mb-1.5">
                  {project.year}
                </p>
                <h3 className="font-display font-light text-[1.15rem] tracking-tight text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="font-body text-xs text-[var(--text-muted)] mt-1 leading-relaxed line-clamp-2">
                  {project.description}
                </p>
              </Link>
            </FadeUp>
          ))}
        </div>

        {/* Mobile all work link */}
        <FadeUp delay={0.2} className="md:hidden mt-8">
          <Link
            href={`/work?filter=${service.workCategory}`}
            className="font-body text-[11px] uppercase tracking-[0.18em] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300 flex items-center gap-3 group"
          >
            All Work
            <span className="block w-6 h-[1px] bg-current group-hover:w-10 transition-all duration-300" />
          </Link>
        </FadeUp>
      </div>
    </section>
  )
}

// ── FAQ ───────────────────────────────────────────────────────────
function ServiceFAQ({ service }: { service: Service }) {
  return (
    <section className="border-t border-[var(--border)] py-20 md:py-28">
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24">
          <FadeUp>
            <SectionLabel className="mb-4 block">FAQ</SectionLabel>
            <h2 className="font-display font-light text-[clamp(2rem,3vw,3rem)] leading-[1.1] tracking-tight text-[var(--text-primary)]">
              Common<br />questions.
            </h2>
            <p className="font-body text-sm text-[var(--text-muted)] mt-5 leading-relaxed">
              Something not covered here?{' '}
              <Link href="/contact" className="text-[var(--accent)] hover:opacity-75 transition-opacity duration-300">
                Ask directly.
              </Link>
            </p>
          </FadeUp>

          <div className="divide-y divide-[var(--border)]">
            {service.faq.map((item, i) => (
              <FAQItem key={i} question={item.question} answer={item.answer} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -32px 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: DURATION.base, ease: EASE_EXPO, delay: index * 0.05 }}
      className="py-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-6 py-6 text-left group"
        aria-expanded={open}
      >
        <p className="font-body text-[0.9375rem] font-medium text-[var(--text-primary)] group-hover:text-white transition-colors duration-300 leading-snug">
          {question}
        </p>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.28, ease: EASE_EXPO }}
          className="w-6 h-6 flex-shrink-0 mt-0.5 border border-[var(--border-md)] flex items-center justify-center"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--text-secondary)]">
            <path d="M5 1v8M1 5h8" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE_EXPO }}
            className="overflow-hidden"
          >
            <p className="font-body text-sm text-[var(--text-secondary)] leading-relaxed pb-6 max-w-2xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ── CTA ───────────────────────────────────────────────────────────
function ServiceCTA({ service }: { service: Service }) {
  return (
    <section
      className="relative border-t border-[var(--border)] py-24 md:py-36 overflow-hidden"
      style={{ background: service.heroGradient }}
    >
      {/* Radial accent glow from bottom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 100%, ${service.accentColor} 0%, transparent 65%)`,
        }}
      />

      {/* Subtle grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(240,237,232,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(240,237,232,0.5) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 max-w-[1320px] mx-auto px-6 md:px-10 text-center">
        <FadeUp>
          <p className="font-body text-[10px] uppercase tracking-[0.22em] text-[var(--accent)] mb-6">
            Ready to start?
          </p>
          <h2 className="font-display font-light text-[clamp(2.5rem,5vw,5.5rem)] leading-[0.95] tracking-tight text-[var(--text-primary)] mb-6 max-w-3xl mx-auto">
            Let&apos;s make something worth looking at.
          </h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p className="font-body text-base text-[var(--text-secondary)] mb-10 max-w-md mx-auto leading-relaxed">
            {service.forWho}
          </p>
        </FadeUp>
        <FadeUp delay={0.18}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="font-body text-[11px] uppercase tracking-[0.18em] bg-[var(--text-primary)] text-bg px-8 py-4 hover:bg-white transition-colors duration-300"
            >
              Start a Conversation
            </Link>
            <Link
              href="/work"
              className="font-body text-[11px] uppercase tracking-[0.18em] border border-[var(--border-md)] text-[var(--text-secondary)] px-8 py-4 hover:text-[var(--text-primary)] hover:border-[var(--text-muted)] transition-all duration-300"
            >
              View Portfolio
            </Link>
          </div>
        </FadeUp>

        {/* Service index tag */}
        <FadeUp delay={0.26} className="mt-16">
          <p className="font-body text-[9px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
            Service {service.index} — {service.shortTitle}
          </p>
        </FadeUp>
      </div>
    </section>
  )
}
