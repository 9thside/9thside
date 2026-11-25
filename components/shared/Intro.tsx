'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { EASE_EXPO } from '@/lib/motion'

const ReadyContext = createContext(true)

/** True once the opening curtain has lifted — entrance animations wait for it. */
export const useReady = () => useContext(ReadyContext)

const SEEN_KEY = '9thside-intro'

/** Opening curtain: counts to 100 once per visit, then lifts to reveal the page. */
export function Intro({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<'loading' | 'done'>('loading')
  const count = useMotionValue(0)
  const label = useTransform(count, (v) => String(Math.round(v)).padStart(3, '0'))

  useEffect(() => {
    const skip =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches || sessionStorage.getItem(SEEN_KEY) === '1'
    if (skip) {
      setPhase('done')
      return
    }
    sessionStorage.setItem(SEEN_KEY, '1')
    const controls = animate(count, 100, { duration: 1.5, ease: [0.65, 0, 0.35, 1], onComplete: () => setPhase('done') })
    return () => controls.stop()
  }, [count])

  return (
    <ReadyContext.Provider value={phase === 'done'}>
      {children}
      <AnimatePresence>
        {phase === 'loading' && (
          <motion.div
            className="fixed inset-0 z-[200] flex flex-col justify-between bg-accent p-5 text-night sm:p-8 lg:p-12"
            exit={{ y: '-100%' }}
            transition={{ duration: 0.9, ease: EASE_EXPO }}
          >
            <div className="flex items-start justify-between">
              <span className="eyebrow">9thside</span>
              <span className="eyebrow">Photography — Toronto</span>
            </div>
            <div className="flex items-end justify-between">
              <span className="eyebrow pb-3">Loading the good stuff</span>
              <motion.span className="display text-[clamp(7rem,28vw,24rem)] tabular-nums">{label}</motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ReadyContext.Provider>
  )
}
