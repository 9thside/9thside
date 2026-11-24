'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { HighlightPhoto } from '@/lib/albums'
import { Photo } from '@/components/shared/Photo'

const INTERVAL = 6000

export function HeroSlideshow({ slides }: { slides: HighlightPhoto[] }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (slides.length < 2) return
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), INTERVAL)
    return () => clearInterval(id)
  }, [slides.length])

  const slide = slides[index]
  if (!slide) return null

  return (
    <>
      <AnimatePresence initial={false}>
        <motion.div
          key={slide.src}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: 'easeInOut' }}
        >
          <Photo
            photo={slide}
            fill
            priority={index === 0}
            quality={85}
            sizes="(min-width: 1024px) 46vw, 100vw"
            className="kenburns"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-14 right-5 z-10 flex items-center gap-4 text-cream sm:right-8 lg:bottom-10 lg:right-14">
        <span className="eyebrow hidden text-cream/80 sm:block">{slide.albumTitle}</span>
        <span className="h-px w-8 bg-cream/50" />
        <span className="eyebrow tabular-nums">
          {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
        </span>
      </div>
    </>
  )
}
