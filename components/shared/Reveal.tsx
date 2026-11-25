'use client'

import { motion } from 'framer-motion'
import { EASE_EXPO } from '@/lib/motion'

interface RevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
  y?: number
}

/** Fades content up the first time it scrolls into view. */
export function Reveal({ children, delay = 0, className, y = 28 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 1, ease: EASE_EXPO, delay }}
    >
      {children}
    </motion.div>
  )
}
