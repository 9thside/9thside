'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { HighlightPhoto } from '@/lib/albums'
import { Photo } from '@/components/shared/Photo'

/**
 * A pinned reel: the section sticks to the screen while vertical scrolling
 * drives the photographs sideways, like film running through a gate.
 */
export function FrameReel({ photos, children }: { photos: HighlightPhoto[]; children: React.ReactNode }) {
  const section = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance])

  useEffect(() => {
    const measure = () => track.current && setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth))
    measure()
    const observer = new ResizeObserver(measure)
    if (track.current) observer.observe(track.current)
    window.addEventListener('resize', measure)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  return (
    // Tall enough that one screen of scrolling moves roughly one screen of reel.
    <section ref={section} style={{ height: `calc(100svh + ${distance}px)` }} className="relative">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <motion.div ref={track} style={{ x }} className="flex w-max items-center gap-4 px-5 [--reel-h:46svh] sm:gap-8 sm:px-8 md:[--reel-h:66svh] lg:px-12">
          <div className="w-[78vw] shrink-0 pr-6 sm:w-[46vw] lg:w-[34vw]">{children}</div>
          {photos.map((photo, i) => (
            <Link
              key={photo.src}
              href={`/portfolio/${photo.album}`}
              data-cursor="View"
              className="group relative block shrink-0 overflow-hidden"
              style={{
                height: `calc(var(--reel-h) * ${i % 2 ? 0.8 : 1})`,
                aspectRatio: `${photo.width} / ${photo.height}`,
                marginTop: i % 2 ? '10svh' : 0,
              }}
            >
              <Photo
                photo={photo}
                fill
                sizes="(min-width: 1024px) 50vw, 90vw"
                className="transition-transform duration-[1400ms] ease-expo group-hover:scale-[1.05]"
              />
              <span className="eyebrow absolute left-4 top-4 text-cream mix-blend-difference">
                {String(i + 1).padStart(2, '0')}
              </span>
            </Link>
          ))}
          <Link
            href="/portfolio"
            data-cursor="Go"
            className="display shrink-0 px-10 text-[clamp(4rem,12vw,12rem)] transition-colors hover:text-accent lg:px-24"
          >
            See it <em>all</em> →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
