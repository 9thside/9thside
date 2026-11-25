import Link from 'next/link'
import type { Album } from '@/lib/albums'
import { Photo } from '@/components/shared/Photo'
import { cn } from '@/lib/utils'

interface AlbumCardProps {
  album: Album
  sizes: string
  /** Use the portrait "hero" photo instead of the landscape cover. */
  tall?: boolean
  className?: string
}

export function AlbumCard({ album, sizes, tall, className }: AlbumCardProps) {
  return (
    <Link href={`/portfolio/${album.slug}`} className={cn('group block', className)}>
      <div className={cn('relative overflow-hidden bg-paper-deep', tall ? 'aspect-[4/5]' : 'aspect-[3/2]')}>
        <Photo
          photo={tall ? album.hero : album.cover}
          fill
          sizes={sizes}
          className="transition-transform duration-[1400ms] ease-expo group-hover:scale-[1.04]"
        />
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-6">
        <h3 className="font-display text-2xl font-light uppercase tracking-[0.1em] transition-colors duration-500 group-hover:text-accent md:text-[1.7rem]">{album.title}</h3>
      </div>
      <p className="eyebrow mt-2 text-ink/45">
        {[album.categoryLabel, album.location].filter(Boolean).join('  ·  ')}
      </p>
    </Link>
  )
}
