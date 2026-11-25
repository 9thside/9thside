'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion'
import type { HighlightPhoto } from '@/lib/albums'
import { Photo } from '@/components/shared/Photo'
import { useReady } from '@/components/shared/Intro'
import { EASE_EXPO } from '@/lib/motion'

// Where each print lands: position is a percentage of the pile's box,
// width is a percentage of its width, depth drives the mouse parallax.
const LAYOUT = [
  { left: 30, top: 12, width: 44, rotate: -4, depth: 26 },
  { left: 2, top: 34, width: 34, rotate: 7, depth: 46 },
  { left: 62, top: 4, width: 32, rotate: 9, depth: 60 },
  { left: 58, top: 50, width: 38, rotate: -7, depth: 38 },
  { left: 16, top: 2, width: 26, rotate: -10, depth: 72 },
  { left: 28, top: 60, width: 28, rotate: 5, depth: 54 },
]

/**
 * A loose pile of prints. With a mouse they drift with the cursor and can be
 * dragged around; on touch screens a tap shuffles the top print to the back.
 */
export function PhotoPile({ photos }: { photos: HighlightPhoto[] }) {
  const ready = useReady()
  const box = useRef<HTMLDivElement>(null)
  const [touch, setTouch] = useState(false)
  const cards = photos.slice(0, LAYOUT.length)
  // Stacking order: last entry is on top.
  const [order, setOrder] = useState(() => cards.map((_, i) => i).reverse())

  const mx = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 })
  const my = useSpring(useMotionValue(0), { stiffness: 60, damping: 18 })

  useEffect(() => {
    const coarse = window.matchMedia('(pointer: coarse)').matches
    setTouch(coarse)
    if (coarse) return
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5)
      my.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [mx, my])

  const toFront = (i: number) => setOrder((o) => [...o.filter((n) => n !== i), i])
  const shuffle = () => setOrder((o) => [o[o.length - 1], ...o.slice(0, -1)])

  return (
    <div ref={box} className="relative h-full w-full" data-cursor={touch ? undefined : 'Drag'}>
      {cards.map((photo, i) => {
        const spot = LAYOUT[i]
        return (
          <Drift
            key={photo.src}
            mx={mx}
            my={my}
            depth={spot.depth}
            style={{ left: `${spot.left}%`, top: `${spot.top}%`, width: `${spot.width}%`, zIndex: order.indexOf(i) + 1 }}
          >
            <motion.div
              drag={!touch}
              dragConstraints={box}
              dragElastic={0.25}
              dragTransition={{ power: 0.15, timeConstant: 220 }}
              whileDrag={{ scale: 1.06, rotate: 0 }}
              onPointerDown={() => (touch ? shuffle() : toFront(i))}
              initial={{ opacity: 0, y: 220, rotate: spot.rotate * 4, scale: 0.8 }}
              animate={ready ? { opacity: 1, y: 0, rotate: spot.rotate, scale: 1 } : undefined}
              transition={{ duration: 1.3, ease: EASE_EXPO, delay: 0.15 + i * 0.09 }}
              className="touch-pan-y select-none bg-cream p-1.5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] sm:p-2"
            >
              <Photo
                photo={photo}
                priority={i < 3}
                quality={85}
                sizes="(min-width: 1024px) 26vw, 46vw"
                className="pointer-events-none h-auto w-full"
              />
            </motion.div>
          </Drift>
        )
      })}
    </div>
  )
}

interface DriftProps {
  mx: MotionValue<number>
  my: MotionValue<number>
  depth: number
  style: React.CSSProperties
  children: React.ReactNode
}

function Drift({ mx, my, depth, style, children }: DriftProps) {
  const x = useTransform(mx, (v) => v * -depth)
  const y = useTransform(my, (v) => v * -depth)
  return (
    <motion.div className="absolute" style={{ ...style, x, y }}>
      {children}
    </motion.div>
  )
}
