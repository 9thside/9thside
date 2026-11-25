'use client'

import { motion } from 'framer-motion'

/** Page transition: each page settles in with a soft fade. */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: 'easeOut' }}>
      {children}
    </motion.div>
  )
}
