'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'

const ReadyContext = createContext(true)

/** True once the opening veil has lifted — entrance animations wait for it. */
export const useReady = () => useContext(ReadyContext)

const SEEN_KEY = '9thside-intro'

/** A brief, quiet opening: the mark on black, then the page fades in. Once per visit. */
export function Intro({ children }: { children: React.ReactNode }) {
  const [done, setDone] = useState(false)

  useEffect(() => {
    const skip =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches || sessionStorage.getItem(SEEN_KEY) === '1'
    if (skip) {
      setDone(true)
      return
    }
    sessionStorage.setItem(SEEN_KEY, '1')
    const id = setTimeout(() => setDone(true), 1100)
    return () => clearTimeout(id)
  }, [])

  return (
    <ReadyContext.Provider value={done}>
      {children}
      <AnimatePresence>
        {!done && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-night"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
          >
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
              <Image src="/media/logo-white-full-trim.png" alt="9thside" width={900} height={683} priority className="h-16 w-auto" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ReadyContext.Provider>
  )
}
