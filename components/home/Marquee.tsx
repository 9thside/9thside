'use client'

import { cn } from '@/lib/utils'

const items = [
  'Web Design & Development',
  'Photography',
  'Videography',
  'Creative Direction',
  'Wedding Coverage',
  'Commercial Content',
  'Real Estate Media',
  'Brand Systems',
]

interface MarqueeProps {
  className?: string
  speed?: number
}

export function Marquee({ className, speed = 40 }: MarqueeProps) {
  const content = [...items, ...items]

  return (
    <div className={cn('overflow-hidden', className)}>
      <div
        className="flex whitespace-nowrap"
        style={{ animation: `marquee ${speed}s linear infinite` }}
      >
        {content.map((item, i) => (
          <span key={i} className="flex items-center gap-0">
            <span className="font-body text-[11px] uppercase tracking-[0.22em] text-[var(--text-secondary)] px-6">
              {item}
            </span>
            <span className="text-[var(--accent)] text-[8px] flex-shrink-0">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
