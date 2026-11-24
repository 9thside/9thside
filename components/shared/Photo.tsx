import Image from 'next/image'
import type { Photo as PhotoData } from '@/lib/albums'
import { cn } from '@/lib/utils'

interface PhotoProps {
  photo: PhotoData
  sizes: string
  className?: string
  priority?: boolean
  /** Fill the parent (which must be positioned) instead of using natural dimensions. */
  fill?: boolean
  quality?: number
}

export function Photo({ photo, sizes, className, priority, fill, quality }: PhotoProps) {
  return (
    <Image
      src={photo.src}
      alt={photo.alt}
      {...(fill ? { fill: true } : { width: photo.width, height: photo.height })}
      sizes={sizes}
      placeholder="blur"
      blurDataURL={photo.blur}
      priority={priority}
      quality={quality}
      className={cn(fill && 'object-cover', className)}
    />
  )
}
