'use client'

import { motion } from 'framer-motion'
import { EASE_EXPO } from '@/lib/motion'

/** Page transition: a colour wipe lifts off each new page. */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[150] origin-top bg-accent"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.8, ease: EASE_EXPO }}
      />
      {children}
    </>
  )
}
