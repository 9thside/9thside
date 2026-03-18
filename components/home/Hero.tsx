'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Marquee } from '@/components/home/Marquee'
import { LogoImage } from '@/components/ui/Logo'
import { EASE_EXPO, DURATION } from '@/lib/motion'

const wordVariants = {
  hidden: { y: '115%', opacity: 0 },
  visible: (i: number) => ({
    y: '0%',
    opacity: 1,
    transition: { duration: 1.0, ease: EASE_EXPO, delay: 0.6 + i * 0.1 },
  }),
}

export function Hero() {
  const headline = 'Built to be seen.'
  const words = headline.split(' ')

  return (
    <section className="relative min-h-[100svh] flex flex-col overflow-hidden">

      {/* ── Video background ── */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/media/hero.mp4" type="video/mp4" />
        </video>

        {/* Scrim layers for readability */}
        {/* Dark overall base */}
        <div className="absolute inset-0 bg-black/55" />
        {/* Top gradient — keeps nav area clean */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(8,8,8,0.7) 0%, transparent 30%)' }}
        />
        {/* Bottom gradient — fades into page */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(8,8,8,1) 0%, rgba(8,8,8,0.3) 20%, transparent 45%)' }}
        />
        {/* Warm gold tint at center-bottom for depth */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70vw] h-[40vh]"
          style={{ background: 'radial-gradient(ellipse at center bottom, rgba(196,169,122,0.06) 0%, transparent 70%)' }}
        />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-10 max-w-[1320px] mx-auto w-full pt-32 pb-20">

        {/* Logo mark */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.base, ease: EASE_EXPO, delay: 0.1 }}
          className="mb-6 md:mb-8"
        >
          <LogoImage variant="mark" color="white" width={64} />
        </motion.div>

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.base, ease: EASE_EXPO, delay: 0.25 }}
          className="mb-7 md:mb-8"
        >
          <span className="font-body text-[10px] uppercase tracking-[0.28em] text-[var(--accent)]">
            Creative Studio · Est. 2016
          </span>
        </motion.div>

        {/* Headline — per-word reveal */}
        <h1
          className="font-display font-light text-[clamp(4rem,9vw,10.5rem)] leading-[0.92] tracking-[-0.03em] text-white mb-8 md:mb-10"
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
          transition={{ duration: DURATION.slow, ease: EASE_EXPO, delay: 1.0 }}
          className="font-body text-[clamp(0.9375rem,1.4vw,1.125rem)] text-white/70 leading-relaxed max-w-[480px] mb-10 md:mb-12"
        >
          9thside creates premium digital and visual experiences across web, photography, film, and brand.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.slow, ease: EASE_EXPO, delay: 1.15 }}
          className="flex flex-wrap items-center gap-4"
        >
          <Link
            href="/contact"
            className="font-body text-[11px] uppercase tracking-[0.18em] bg-white text-[#080808] px-7 py-3.5 hover:bg-[var(--accent)] hover:text-[#080808] transition-colors duration-300"
          >
            Start a Project
          </Link>
          <Link
            href="/work"
            className="font-body text-[11px] uppercase tracking-[0.18em] border border-white/30 text-white/80 px-7 py-3.5 hover:text-white hover:border-white/60 transition-all duration-300"
          >
            View Work
          </Link>
          <Link
            href="/services"
            className="font-body text-[11px] uppercase tracking-[0.18em] text-white/40 hover:text-white/70 transition-colors duration-300 ml-2 hidden md:block"
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
            className="font-body text-[9px] uppercase tracking-[0.22em] text-white/30"
            style={{ writingMode: 'vertical-rl' }}
          >
            Scroll
          </span>
          <motion.div
            className="w-[1px] h-10 origin-top"
            style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.25), transparent)' }}
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 2.2 }}
          />
        </motion.div>
      </div>

      {/* ── Discipline marquee ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="relative z-10 border-t border-white/10 py-4 bg-[rgba(8,8,8,0.6)] backdrop-blur-sm"
      >
        <Marquee speed={32} />
      </motion.div>
    </section>
  )
}
