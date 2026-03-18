'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Marquee } from '@/components/home/Marquee'
import { LogoMark } from '@/components/ui/Logo'
import { EASE_EXPO, DURATION } from '@/lib/motion'

const wordVariants = {
  hidden: { y: '115%', opacity: 0 },
  visible: (i: number) => ({
    y: '0%',
    opacity: 1,
    transition: { duration: 1.0, ease: EASE_EXPO, delay: 0.7 + i * 0.1 },
  }),
}

export function Hero() {
  const headline = 'Built to be seen.'
  const words = headline.split(' ')

  return (
    <section className="relative min-h-[100svh] flex flex-col overflow-hidden bg-bg">

      {/* ── Ambient background layer ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Warm center glow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[60vh]"
          style={{
            background: 'radial-gradient(ellipse at center bottom, rgba(196,169,122,0.07) 0%, transparent 70%)',
          }}
        />
        {/* Subtle top-right glow */}
        <div
          className="absolute top-0 right-0 w-[50vw] h-[50vh]"
          style={{
            background: 'radial-gradient(ellipse at top right, rgba(196,169,122,0.04) 0%, transparent 60%)',
          }}
        />

        {/* Ambient triangle 1 — large, top-right, very faint outline */}
        <motion.div
          className="absolute -top-[20vw] -right-[10vw] opacity-[0.025]"
          animate={{ rotate: 360 }}
          transition={{ duration: 200, repeat: Infinity, ease: 'linear' }}
        >
          <svg viewBox="0 0 200 175" width="55vw" fill="none" stroke="rgba(240,237,232,0.8)" strokeWidth="0.6">
            <polygon points="100,8 20,167 180,167" />
          </svg>
        </motion.div>

        {/* Ambient triangle 2 — bottom-left, very faint, accent color */}
        <motion.div
          className="absolute -bottom-[15vw] -left-[8vw] opacity-[0.03]"
          animate={{ rotate: -360 }}
          transition={{ duration: 280, repeat: Infinity, ease: 'linear' }}
        >
          <svg viewBox="0 0 200 175" width="45vw" fill="none" stroke="rgba(196,169,122,0.9)" strokeWidth="0.5">
            <polygon points="100,8 20,167 180,167" />
          </svg>
        </motion.div>

        {/* Small accent triangle — center-right */}
        <motion.div
          className="absolute top-[25%] right-[8%] opacity-[0.04]"
          animate={{ rotate: 180 }}
          transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
        >
          <svg viewBox="0 0 200 175" width="14vw" fill="none" stroke="rgba(196,169,122,1)" strokeWidth="1">
            <polygon points="100,8 20,167 180,167" />
          </svg>
        </motion.div>
      </div>

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-10 max-w-[1320px] mx-auto w-full pt-28 pb-20 relative">

        {/* Logo mark animates in first */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.base, ease: EASE_EXPO, delay: 0.1 }}
          className="mb-8 md:mb-10"
        >
          <LogoMark size={36} className="text-[var(--accent)]" />
        </motion.div>

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.base, ease: EASE_EXPO, delay: 0.3 }}
          className="mb-7 md:mb-8"
        >
          <span className="font-body text-[10px] uppercase tracking-[0.28em] text-[var(--accent)]">
            Creative Studio · Est. 2016
          </span>
        </motion.div>

        {/* Headline — per-word reveal */}
        <h1
          className="font-display font-light text-[clamp(4.5rem,9vw,10.5rem)] leading-[0.92] tracking-[-0.03em] text-[var(--text-primary)] mb-8 md:mb-10"
          aria-label={headline}
        >
          {words.map((word, i) => (
            <span
              key={i}
              style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', marginRight: '0.22em' }}
            >
              <motion.span
                style={{ display: 'inline-block' }}
                custom={i}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.slow, ease: EASE_EXPO, delay: 1.05 }}
          className="font-body text-[clamp(0.9375rem,1.4vw,1.125rem)] text-[var(--text-secondary)] leading-relaxed max-w-[480px] mb-10 md:mb-12"
        >
          9thside creates premium digital and visual experiences across web, photography, film, and brand.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.slow, ease: EASE_EXPO, delay: 1.2 }}
          className="flex flex-wrap items-center gap-4"
        >
          <Link
            href="/contact"
            className="font-body text-[11px] uppercase tracking-[0.18em] bg-[var(--text-primary)] text-bg px-7 py-3.5 hover:bg-white transition-colors duration-300"
          >
            Start a Project
          </Link>
          <Link
            href="/work"
            className="font-body text-[11px] uppercase tracking-[0.18em] border border-[var(--border-md)] text-[var(--text-secondary)] px-7 py-3.5 hover:text-[var(--text-primary)] hover:border-[rgba(240,237,232,0.28)] transition-all duration-300"
          >
            View Work
          </Link>
          <Link
            href="/services"
            className="font-body text-[11px] uppercase tracking-[0.18em] text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors duration-300 ml-2 hidden md:block"
          >
            Our Services →
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0, duration: 1 }}
          className="hidden md:flex flex-col items-center gap-3 absolute bottom-14 right-10"
        >
          <span
            className="font-body text-[9px] uppercase tracking-[0.22em] text-[var(--text-muted)]"
            style={{ writingMode: 'vertical-rl' }}
          >
            Scroll
          </span>
          <motion.div
            className="w-[1px] h-10 origin-top"
            style={{ background: 'linear-gradient(to bottom, var(--text-muted), transparent)' }}
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 2.2 }}
          />
        </motion.div>
      </div>

      {/* ── Discipline marquee ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="border-t border-[var(--border)] py-4"
      >
        <Marquee speed={32} />
      </motion.div>
    </section>
  )
}
