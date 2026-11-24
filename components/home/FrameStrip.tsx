import Link from 'next/link'
import type { HighlightPhoto } from '@/lib/albums'
import { Photo } from '@/components/shared/Photo'

/** Horizontally scrolling strip of favourite frames. */
export function FrameStrip({ photos }: { photos: HighlightPhoto[] }) {
  return (
    <div
      data-lenis-prevent-touch
      className="no-scrollbar flex snap-x gap-3 overflow-x-auto px-5 sm:gap-5 sm:px-8 lg:px-14"
    >
      {photos.map((photo) => (
        <Link
          key={photo.src}
          href={`/portfolio/${photo.album}`}
          className="group relative h-[52vh] max-h-[620px] min-h-[340px] shrink-0 snap-start overflow-hidden"
          style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
        >
          <Photo
            photo={photo}
            fill
            sizes="(min-width: 1024px) 45vw, 80vw"
            className="transition-transform duration-[1400ms] ease-expo group-hover:scale-[1.04]"
          />
          <span className="eyebrow absolute bottom-4 left-4 text-cream opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            {photo.albumTitle}
          </span>
        </Link>
      ))}
    </div>
  )
}
