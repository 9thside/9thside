'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { HighlightPhoto } from '@/lib/albums'
import { Photo } from '@/components/shared/Photo'

const INTERVAL = 6000

interface HeroBackdropProps {
  /** Wide photographs, shown on tablets and computers. */
  wide: HighlightPhoto[]
  /** Tall photographs, shown on phones. */
  tall: HighlightPhoto[]
}

/** Full-screen slideshow behind the homepage headline, slowly cross-fading. */
export function HeroBackdrop({ wide, tall }: HeroBackdropProps) {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), INTERVAL)
    return () => clearInterval(id)
  }, [])

  return (
    <>
      <Slides photos={tall} tick={tick} sizes="100vw" className="md:hidden" />
      <Slides photos={wide} tick={tick} sizes="100vw" className="hidden md:block" />
    </>
  )
}

interface SlidesProps {
  photos: HighlightPhoto[]
  tick: number
  sizes: string
  className: string
}

function Slides({ photos, tick, sizes, className }: SlidesProps) {
  if (!photos.length) return null
  const index = tick % photos.length
  const photo = photos[index]

  return (
    <div className={`absolute inset-0 ${className}`}>
      <AnimatePresence initial={false}>
        <motion.div
          key={photo.src}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        >
          <Photo photo={photo} fill priority={index === 0} quality={85} sizes={sizes} className="kenburns" />
        </motion.div>
      </AnimatePresence>
      <p className="eyebrow absolute bottom-7 right-6 z-10 hidden text-cream/80 sm:right-10 md:block lg:right-16">
        {photo.albumTitle} <span className="mx-2">—</span> {String(index + 1).padStart(2, '0')} /{' '}
        {String(photos.length).padStart(2, '0')}
      </p>
    </div>
  )
}
