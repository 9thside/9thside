'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'

type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'accent'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  children: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  external?: boolean
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

const variantStyles: Record<ButtonVariant, string> = {
  solid:
    'bg-[var(--text-primary)] text-bg hover:bg-white',
  outline:
    'border border-[var(--border-md)] text-[var(--text-primary)] hover:border-[rgba(240,237,232,0.35)] hover:bg-[var(--surface-2)]',
  ghost:
    'text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
  accent:
    'border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent-muted)]',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-[11px] tracking-[0.14em]',
  md: 'px-5 py-2.5 text-[11px] tracking-[0.14em]',
  lg: 'px-7 py-3.5 text-[12px] tracking-[0.14em]',
}

export function Button({
  children,
  variant = 'solid',
  size = 'md',
  href,
  external,
  className,
  onClick,
  type = 'button',
  disabled,
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 font-body font-medium uppercase transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer select-none whitespace-nowrap',
    variantStyles[variant],
    sizeStyles[size],
    disabled && 'opacity-40 pointer-events-none',
    className
  )

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  )
}
