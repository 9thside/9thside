import Image from 'next/image'
import { cn } from '@/lib/utils'

interface LogoProps {
  width?: number
  className?: string
  variant?: 'full' | 'mark'
  color?: 'white' | 'black'
}

// Full logo (triangles + 9THSIDE wordmark) or mark only (triangles)
// white = for dark backgrounds, black = for light backgrounds
export function LogoImage({
  width = 96,
  className,
  variant = 'full',
  color = 'white',
}: LogoProps) {
  const src =
    variant === 'full'
      ? color === 'white'
        ? '/media/logo-white-full.png'
        : '/media/logo-black-full.png'
      : color === 'white'
        ? '/media/logo-white-mark.png'
        : '/media/logo-black-mark.png'

  // All images are square (1:1)
  return (
    <Image
      src={src}
      alt="9thside"
      width={width}
      height={width}
      className={cn('object-contain', className)}
      priority
    />
  )
}

// Lightweight SVG mark — kept as fallback for service pages / decorative use
interface LogoMarkProps {
  size?: number
  className?: string
}

export function LogoMark({ size = 32, className }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 200 156"
      width={size}
      height={Math.round(size * 0.78)}
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
