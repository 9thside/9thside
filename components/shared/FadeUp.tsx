'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { EASE_EXPO, DURATION } from '@/lib/motion'
import { cn } from '@/lib/utils'

interface FadeUpProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  once?: boolean
  as?: keyof React.JSX.IntrinsicElements
}

export function FadeUp({
  children,
  className,
  delay = 0,
  duration = DURATION.slow,
  once = true,
  as: Tag = 'div',
}: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref as React.RefObject<Element>, { once, margin: '0px 0px -48px 0px' })

  return (
    <motion.div
      ref={ref}
      className={cn('', className)}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration, ease: EASE_EXPO, delay }}
    >
      {children}
    </motion.div>
  )
}
