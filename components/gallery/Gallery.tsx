'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import type { Photo as PhotoData } from '@/lib/albums'
import { Photo } from '@/components/shared/Photo'
import { lockScroll } from '@/components/shared/SmoothScroll'

/**
 * Justified photo grid: every row is the same height and photos keep their
 * natural proportions. Clicking a photo opens a full-screen lightbox.
 */
export function Gallery({ photos }: { photos: PhotoData[] }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <>
      <div className="gallery flex flex-wrap gap-2 sm:gap-3">
        {photos.map((photo, i) => {
          const ratio = photo.width / photo.height
          return (
            <button
              key={photo.src}
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`Open photograph ${i + 1} of ${photos.length}`}
              className="group relative cursor-zoom-in overflow-hidden bg-paper-deep"
              style={{ flexGrow: ratio, flexBasis: `calc(var(--row-h) * ${ratio})`, aspectRatio: ratio }}
            >
              <Photo
                photo={photo}
                fill
                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
                className="transition-transform duration-[1400ms] ease-expo group-hover:scale-[1.03]"
              />
            </button>
          )
        })}
        {/* Soaks up leftover space so the last row is not stretched. */}
        <span aria-hidden className="grow-[1000]" />
      </div>

      <AnimatePresence>
        {open !== null && <Lightbox photos={photos} index={open} onChange={setOpen} />}
      </AnimatePresence>
    </>
  )
}

interface LightboxProps {
  photos: PhotoData[]
  index: number
  onChange: (index: number | null) => void
}

function Lightbox({ photos, index, onChange }: LightboxProps) {
  const touchX = useRef<number | null>(null)
  const step = useCallback(
    (dir: number) => onChange((index + dir + photos.length) % photos.length),
    [index, photos.length, onChange]
  )

  useEffect(() => {
    lockScroll(true)
    return () => lockScroll(false)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onChange(null)
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onChange, step])

  const photo = photos[index]
  const next = photos[(index + 1) % photos.length]

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Photograph viewer"
      data-lenis-prevent
      className="fixed inset-0 z-[100] bg-night text-cream"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={() => onChange(null)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1)
        touchX.current = null
      }}
    >
      <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 py-5 sm:px-8">
        <span className="eyebrow tabular-nums text-cream/70">
          {String(index + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
        </span>
        <button type="button" onClick={() => onChange(null)} className="eyebrow p-2 text-cream/70 hover:text-cream">
          Close
        </button>
      </div>

      <motion.div
        key={photo.src}
        className="absolute inset-x-3 bottom-16 top-16 sm:inset-x-24 sm:bottom-10 sm:top-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="100vw"
          quality={85}
          placeholder="blur"
          blurDataURL={photo.blur}
          className="object-contain"
          onClick={(e) => e.stopPropagation()}
        />
      </motion.div>
      {/* Warm the cache for the next frame. */}
      <Image src={next.src} alt="" width={next.width} height={next.height} sizes="100vw" quality={85} className="hidden" priority />

      {photos.length > 1 && (
        <div className="absolute inset-x-0 bottom-3 z-10 flex justify-center gap-10 sm:inset-y-0 sm:bottom-0 sm:items-center sm:justify-between sm:px-6">
          {[
            { dir: -1, label: 'Previous' },
            { dir: 1, label: 'Next' },
          ].map(({ dir, label }) => (
            <button
              key={label}
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                step(dir)
              }}
              className="eyebrow p-3 text-cream/70 transition-colors hover:text-cream"
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  )
}
