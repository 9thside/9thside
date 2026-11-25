'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { HighlightPhoto } from '@/lib/albums'
import { Photo } from '@/components/shared/Photo'

const INTERVAL = 5500

/** A single framed photograph that slowly cross-fades through the chosen hero images. */
export function HeroFrame({ slides }: { slides: HighlightPhoto[] }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (slides.length < 2) return
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), INTERVAL)
    return () => clearInterval(id)
  }, [slides.length])

  const slide = slides[index]
  if (!slide) return null

  return (
    <figure>
      <div className="relative aspect-[4/5] overflow-hidden bg-paper-deep">
        <AnimatePresence initial={false}>
          <motion.div
            key={slide.src}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
          >
            <Photo
              photo={slide}
              fill
              priority={index === 0}
              quality={85}
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="kenburns"
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <figcaption className="mt-4 flex items-center justify-between text-ink/55">
        <span className="eyebrow">{slide.albumTitle}</span>
        <span className="eyebrow tabular-nums">
          {String(index + 1).padStart(2, '0')} <span className="mx-1 text-accent">/</span>{' '}
          {String(slides.length).padStart(2, '0')}
        </span>
      </figcaption>
    </figure>
  )
}
