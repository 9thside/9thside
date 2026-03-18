'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { EASE_EXPO, DURATION } from '@/lib/motion'
import { cn } from '@/lib/utils'

interface TextRevealProps {
  children: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'
  className?: string
  delay?: number
  staggerDelay?: number
  once?: boolean
}

export function TextReveal({
  children,
  as: Tag = 'div',
  className,
  delay = 0,
  staggerDelay = 0.055,
  once = true,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once, margin: '0px 0px -60px 0px' })

  const words = children.split(' ')

  return (
    <Tag className={cn('', className)}>
      <span
        ref={ref as React.RefObject<HTMLSpanElement>}
        aria-label={children}
        style={{ display: 'inline' }}
      >
        {words.map((word, i) => (
          <span
            key={i}
            style={{
              display: 'inline-block',
              overflow: 'hidden',
              verticalAlign: 'bottom',
              lineHeight: 'inherit',
            }}
          >
            <motion.span
              style={{ display: 'inline-block' }}
              initial={{ y: '110%', opacity: 0 }}
              animate={
                inView
                  ? { y: '0%', opacity: 1 }
                  : { y: '110%', opacity: 0 }
              }
              transition={{
                duration: DURATION.slow,
                ease: EASE_EXPO,
                delay: delay + i * staggerDelay,
              }}
            >
              {word}
              {i < words.length - 1 ? '\u00A0' : ''}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  )
}
