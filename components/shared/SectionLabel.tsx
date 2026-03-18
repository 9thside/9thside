import { cn } from '@/lib/utils'

interface SectionLabelProps {
  children: string
  className?: string
  light?: boolean
}

export function SectionLabel({ children, className, light = false }: SectionLabelProps) {
  return (
    <span
      className={cn(
        'inline-block text-[11px] font-medium tracking-[0.2em] uppercase font-body',
        light ? 'text-[var(--accent)]' : 'text-[var(--accent)]',
        className
      )}
    >
      {children}
    </span>
  )
}
