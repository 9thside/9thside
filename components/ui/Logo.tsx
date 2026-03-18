import Image from 'next/image'
import { cn } from '@/lib/utils'

interface LogoImageProps {
  width?: number
  className?: string
}

// Uses the actual 9thside logo image.
// mix-blend-mode: screen makes the black background disappear on dark surfaces,
// leaving only the white logo visible.
export function LogoImage({ width = 96, className }: LogoImageProps) {
  const height = Math.round(width * (816 / 1456))
  return (
    <Image
      src="/media/9thside-logo.JPG"
      alt="9thside"
      width={width}
      height={height}
      className={cn('object-contain', className)}
      style={{ mixBlendMode: 'screen' }}
      priority
    />
  )
}

// Keep LogoMark as a lightweight SVG fallback (used in service pages, etc.)
interface LogoMarkProps {
  size?: number
  className?: string
}

export function LogoMark({ size = 32, className }: LogoMarkProps) {
  const w = size
  const h = Math.round(size * 0.78)
  return (
    <svg
      viewBox="0 0 200 156"
      width={w}
      height={h}
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <polygon points="100,2 58,72 142,72" />
      <polygon points="62,80 20,150 104,150" />
      <polygon points="138,80 96,150 180,150" />
    </svg>
  )
}
