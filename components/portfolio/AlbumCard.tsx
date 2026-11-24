import Link from 'next/link'
import { type Album, albumYear } from '@/lib/albums'
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
        <h3 className="font-display text-[1.75rem] font-light leading-tight md:text-[2rem]">{album.title}</h3>
        <span className="eyebrow shrink-0 text-ink/45">{albumYear(album)}</span>
      </div>
      <p className="eyebrow mt-2 text-ink/45">
        {[album.categoryLabel, album.location].filter(Boolean).join('  ·  ')}
      </p>
    </Link>
  )
}
