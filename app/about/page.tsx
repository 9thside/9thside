'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { FadeUp } from '@/components/shared/FadeUp'
import { EASE_EXPO, DURATION } from '@/lib/motion'

const capabilities = [
  'Website Design & Development',
  'Photography',
  'Videography & Film',
  'Creative Direction',
  'Brand Strategy',
  'Product & UX Thinking',
  'Visual Systems',
  'Content Strategy',
]

const experience = [
  {
    title: 'Founder & Creative Director',
    org: '9thside',
    period: '2016 — Present',
    description: 'Building digital and visual experiences across web, photography, film, and brand for clients across the GTA and beyond.',
  },
  {
    title: 'Product, Design & Growth',
    org: 'Zown',
    period: '2020 — 2024',
    description: 'Led product and design work at a proptech startup — from brand systems and UX to growth strategy and operator-level execution in a fast-moving environment.',
  },
]

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const heroInView = useInView(heroRef, { once: true })

  return (
    <div className="min-h-screen bg-bg">
      {/* Hero */}
      <div className="pt-36 pb-24 px-6 md:px-10 max-w-[1320px] mx-auto border-b border-[var(--border)]">
        <div ref={heroRef} className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DURATION.base, ease: EASE_EXPO }}
            className="mb-6"
          >
            <SectionLabel>About</SectionLabel>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DURATION.slow, ease: EASE_EXPO, delay: 0.08 }}
            className="font-display font-light text-[clamp(2.75rem,5.5vw,6.5rem)] leading-[0.95] tracking-tight text-[var(--text-primary)] mb-8"
          >
            Nabeel Rushdi
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: DURATION.base, ease: EASE_EXPO, delay: 0.18 }}
            className="font-display font-light italic text-[clamp(1.125rem,1.8vw,1.5rem)] text-[var(--text-secondary)] leading-relaxed"
          >
            Creative builder. Visual thinker. Founder with taste.
          </motion.p>
        </div>
      </div>

      {/* Story */}
      <div className="max-w-[1320px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24">
          {/* Sticky nav */}
          <div className="hidden lg:block">
            <div className="sticky top-32">
              <p className="font-body text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-6">
                On this page
              </p>
              <nav className="flex flex-col gap-4">
                {['The beginning', 'The expansion', 'The depth', 'Today', 'Capabilities'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    className="font-body text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors duration-300"
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Story content */}
          <div className="space-y-16 md:space-y-20">

            {/* Opening quote */}
            <FadeUp>
              <blockquote className="font-display font-light italic text-[clamp(1.5rem,2.5vw,2.5rem)] leading-[1.2] tracking-tight text-[var(--text-primary)] border-l-2 border-[var(--accent)] pl-8">
                "I started with a camera and a conviction: that the way something looks shapes how it lands."
              </blockquote>
            </FadeUp>

            {/* The beginning */}
            <div id="the-beginning">
              <FadeUp delay={0.05}>
                <p className="font-body text-[10px] uppercase tracking-[0.2em] text-[var(--accent)] mb-5">
                  The Beginning
                </p>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="font-body text-[1.0625rem] text-[var(--text-secondary)] leading-[1.8] mb-5">
                  9thside started in 2016 with photography. Not as a hustle. As a way of learning to see. Shooting portraits, events, and commercial work across the GTA — developing an eye through thousands of frames and the direct, unforgiving feedback of clients who either got what they envisioned or didn't.
                </p>
              </FadeUp>
              <FadeUp delay={0.15}>
                <p className="font-body text-[1.0625rem] text-[var(--text-secondary)] leading-[1.8]">
                  That discipline of real-world feedback shaped everything that followed. You can't fake a great photograph. The light is either right or it isn't. The moment is either there or it passed. Working in that medium first built a foundation that no design school curriculum could replicate.
                </p>
              </FadeUp>
            </div>

            {/* The expansion */}
            <div id="the-expansion">
              <FadeUp delay={0.05}>
                <p className="font-body text-[10px] uppercase tracking-[0.2em] text-[var(--accent)] mb-5">
                  The Expansion
                </p>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="font-body text-[1.0625rem] text-[var(--text-secondary)] leading-[1.8] mb-5">
                  Photography expanded into videography, then into web design, then into full-stack development. Each medium built on the last. The same instinct that makes a photograph hold attention — composition, contrast, hierarchy, timing — turned out to apply everywhere.
                </p>
              </FadeUp>
              <FadeUp delay={0.15}>
                <p className="font-body text-[1.0625rem] text-[var(--text-secondary)] leading-[1.8]">
                  What looked like a scattershot skill set from the outside was actually one coherent sensibility finding new surfaces to work on. A website is a photograph at a different timescale. A brand film is a portrait with motion. The tools change. The eye stays the same.
                </p>
              </FadeUp>
            </div>

            {/* The depth — Zown */}
            <div id="the-depth">
              <FadeUp delay={0.05}>
                <p className="font-body text-[10px] uppercase tracking-[0.2em] text-[var(--accent)] mb-5">
                  The Depth
                </p>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="font-body text-[1.0625rem] text-[var(--text-secondary)] leading-[1.8] mb-5">
                  The years building product and design at Zown changed how Nabeel thinks — not just about design, but about what design is for. Working inside a startup at the operator level, responsible for product decisions that touched real users and real outcomes, demanded a different standard.
                </p>
              </FadeUp>
              <FadeUp delay={0.15}>
                <p className="font-body text-[1.0625rem] text-[var(--text-secondary)] leading-[1.8] mb-5">
                  Things had to work. Not just look like they work. That experience built a layer of thinking — about systems, about user behaviour, about how brand decisions compound, about the relationship between visual quality and business credibility — that purely creative work doesn't give you.
                </p>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="font-body text-[1.0625rem] text-[var(--text-secondary)] leading-[1.8]">
                  It also made something clear: most creative work is weaker than it needs to be because it's made without this kind of thinking behind it. Beautiful and ineffective is a waste. The goal is always both.
                </p>
              </FadeUp>
            </div>

            {/* Today */}
            <div id="today">
              <FadeUp delay={0.05}>
                <p className="font-body text-[10px] uppercase tracking-[0.2em] text-[var(--accent)] mb-5">
                  Today
                </p>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="font-body text-[1.0625rem] text-[var(--text-secondary)] leading-[1.8] mb-5">
                  9thside now exists at the intersection of all of it. Web design and development. Photography. Film. Creative direction. Brand systems. These aren't separate services bundled together for convenience — they're one point of view expressed across different mediums.
                </p>
              </FadeUp>
              <FadeUp delay={0.15}>
                <p className="font-body text-[1.0625rem] text-[var(--text-secondary)] leading-[1.8]">
                  The clients who get the most value aren't looking for a photographer or a web designer in isolation. They're looking for a creative partner who can think at the level of the whole thing — what it looks like, how it functions, what it says, and whether it actually works.
                </p>
              </FadeUp>
            </div>

            {/* Capabilities */}
            <div id="capabilities">
              <FadeUp delay={0.05}>
                <p className="font-body text-[10px] uppercase tracking-[0.2em] text-[var(--accent)] mb-6">
                  Capabilities
                </p>
              </FadeUp>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {capabilities.map((cap, i) => (
                  <FadeUp key={cap} delay={0.05 + i * 0.04}>
                    <div className="flex items-center gap-3 py-3 border-b border-[var(--border)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] flex-shrink-0" />
                      <span className="font-body text-sm text-[var(--text-secondary)]">{cap}</span>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div>
              <FadeUp delay={0.05}>
                <p className="font-body text-[10px] uppercase tracking-[0.2em] text-[var(--accent)] mb-6">
                  Experience
                </p>
              </FadeUp>
              <div className="space-y-8">
                {experience.map((item, i) => (
                  <FadeUp key={item.org} delay={0.05 + i * 0.08}>
                    <div className="border-l-2 border-[var(--border)] pl-6">
                      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                        <h3 className="font-display font-light text-xl tracking-tight text-[var(--text-primary)]">
                          {item.title}
                        </h3>
                        <span className="font-body text-[10px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
                          {item.period}
                        </span>
                      </div>
                      <p className="font-body text-[10px] uppercase tracking-[0.14em] text-[var(--accent)] mb-3">
                        {item.org}
                      </p>
                      <p className="font-body text-sm text-[var(--text-secondary)] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="border-t border-[var(--border)] py-20 md:py-28 px-6 md:px-10">
        <div className="max-w-[1320px] mx-auto text-center">
          <FadeUp>
            <h2 className="font-display font-light text-[clamp(2rem,4vw,4.5rem)] leading-[1.1] tracking-tight text-[var(--text-primary)] mb-6">
              Let's make something worth remembering.
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="font-body text-base text-[var(--text-secondary)] mb-10 max-w-md mx-auto leading-relaxed">
              Whether it's a website, a shoot, or something bigger — reach out and we'll figure out the right approach together.
            </p>
          </FadeUp>
          <FadeUp delay={0.18}>
            <Link
              href="/contact"
              className="inline-flex items-center font-body text-[11px] uppercase tracking-[0.18em] bg-[var(--text-primary)] text-bg px-8 py-4 hover:bg-white transition-colors duration-300"
            >
              Start a Conversation
            </Link>
          </FadeUp>
        </div>
      </div>
    </div>
  )
}
