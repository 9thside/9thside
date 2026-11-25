'use client'

import { motion } from 'framer-motion'
import { useReady } from '@/components/shared/Intro'
import { EASE_EXPO } from '@/lib/motion'

/** Poster headline whose lines rise out of a mask, one after another. */
export function HeroTitle({ lines, className }: { lines: React.ReactNode[]; className?: string }) {
  const ready = useReady()
  return (
    <h1 className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] pt-[0.04em]">
          <motion.span
            className="block"
            initial={{ y: '110%' }}
            animate={ready ? { y: 0 } : undefined}
            transition={{ duration: 1.2, ease: EASE_EXPO, delay: 0.1 + i * 0.1 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </h1>
  )
}

interface HeroFadeProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

/** Fades a block in once the intro curtain has lifted. */
export function HeroFade({ children, delay = 0.6, className }: HeroFadeProps) {
  const ready = useReady()
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={ready ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 1, ease: EASE_EXPO, delay }}
    >
      {children}
    </motion.div>
  )
}
