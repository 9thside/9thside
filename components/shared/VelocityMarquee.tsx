'use client'

import { useRef } from 'react'
import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion'

interface VelocityMarqueeProps {
  children: React.ReactNode
  /** Percent of one copy's width travelled per second at rest. Negative runs right. */
  speed?: number
  className?: string
}

/** An endless band of type that speeds up and flips direction with the scroll. */
export function VelocityMarquee({ children, speed = 4, className }: VelocityMarqueeProps) {
  const base = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 300 })
  const boost = useTransform(velocity, [-1500, 0, 1500], [-5, 0, 5], { clamp: false })
  const direction = useRef(1)
  // Four copies sit side by side; shifting by one copy (25%) loops seamlessly.
  const x = useTransform(base, (v) => `${-(((v % 25) + 25) % 25)}%`)

  useAnimationFrame((_, delta) => {
    const b = boost.get()
    if (b < 0) direction.current = -1
    else if (b > 0) direction.current = 1
    base.set(base.get() + direction.current * (speed + Math.abs(b) * speed) * (delta / 1000))
  })

  return (
    <div className="overflow-hidden whitespace-nowrap" aria-hidden>
      <motion.div className="inline-flex w-max" style={{ x }}>
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={className}>
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
