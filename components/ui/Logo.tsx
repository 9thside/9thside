import { cn } from '@/lib/utils'

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
      {/* Top center triangle */}
      <polygon points="100,2 58,72 142,72" />
      {/* Bottom-left triangle */}
      <polygon points="62,80 20,150 104,150" />
      {/* Bottom-right triangle */}
      <polygon points="138,80 96,150 180,150" />
    </svg>
  )
}

interface LogoFullProps {
  className?: string
  size?: number
  showText?: boolean
}

export function Logo({ className, size = 28, showText = true }: LogoFullProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <LogoMark size={size} className="text-[var(--text-primary)] flex-shrink-0" />
      {showText && (
        <span className="font-body font-semibold text-[0.95rem] tracking-[0.14em] uppercase text-[var(--text-primary)] leading-none">
          9thside
        </span>
      )}
    </div>
  )
}
