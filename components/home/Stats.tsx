'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { EASE_EXPO, DURATION } from '@/lib/motion'

const stats = [
  { value: 150, suffix: '+', label: 'Projects Delivered' },
  { value: 80, suffix: '+', label: 'Clients Served' },
  { value: 9, suffix: '+', label: 'Years Building' },
  { value: 4, suffix: '', label: 'Creative Disciplines' },
]

function CountUp({
  target,
  suffix,
  active,
}: {
  target: number
  suffix: string
  active: boolean
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return
    const duration = 1600
    const start = performance.now()

    const ease = (t: number) => 1 - Math.pow(1 - t, 4)

    const frame = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      setCount(Math.round(ease(progress) * target))
      if (progress < 1) requestAnimationFrame(frame)
    }

    requestAnimationFrame(frame)
  }, [active, target])

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })

  return (
    <section ref={ref} className="border-t border-b border-[var(--border)] py-16 md:py-20">
      <div className="max-w-[1320px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[var(--border)]">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: DURATION.base, ease: EASE_EXPO, delay: i * 0.08 }}
              className="px-6 md:px-10 py-6 md:py-8 text-center first:pl-0 last:pr-0"
            >
              <div className="font-display font-light text-[clamp(2.5rem,4vw,4rem)] leading-none tracking-tight text-[var(--text-primary)] mb-2">
                <CountUp target={stat.value} suffix={stat.suffix} active={inView} />
              </div>
              <p className="font-body text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
