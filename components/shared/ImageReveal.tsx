'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { EASE_EXPO, DURATION } from '@/lib/motion'
import { cn } from '@/lib/utils'

interface ImageRevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  scale?: boolean
}

export function ImageReveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  scale = true,
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' })

  const clipPathMap = {
    up: { hidden: 'inset(0 0 100% 0)', visible: 'inset(0 0 0% 0)' },
    down: { hidden: 'inset(100% 0 0 0)', visible: 'inset(0 0 0% 0)' },
    left: { hidden: 'inset(0 100% 0 0)', visible: 'inset(0 0 0% 0)' },
    right: { hidden: 'inset(0 0 0 100%)', visible: 'inset(0 0 0% 0)' },
  }

  return (
    <motion.div
      ref={ref}
      className={cn('', className)}
      initial={{
        clipPath: clipPathMap[direction].hidden,
        scale: scale ? 1.06 : 1,
      }}
      animate={
        inView
          ? { clipPath: clipPathMap[direction].visible, scale: 1 }
          : { clipPath: clipPathMap[direction].hidden, scale: scale ? 1.06 : 1 }
      }
      transition={{
        duration: DURATION.xxl,
        ease: EASE_EXPO,
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}
