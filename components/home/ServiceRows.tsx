import Link from 'next/link'
import { verticals } from '@/lib/site'

/** Big rows of type. Hovering floods the row with colour and sets its tagline scrolling. */
export function ServiceRows() {
  return (
    <ul className="border-t border-ink/15">
      {verticals.map((v, i) => (
        <li key={v.id} className="border-b border-ink/15">
          <Link href={v.href ?? `/services#${v.id}`} className="group relative block overflow-hidden">
            <div className="shell flex items-baseline gap-5 py-5 md:gap-10 md:py-7">
              <span className="eyebrow w-8 shrink-0 text-ink/40">{String(i + 1).padStart(2, '0')}</span>
              <span className="display text-[clamp(2.75rem,9.5vw,9.5rem)]">{v.title}</span>
              <span className="ml-auto hidden shrink-0 text-sm text-ink/50 md:block">{v.line}</span>
            </div>

            <div
              aria-hidden
              className="absolute inset-0 flex translate-y-full items-center overflow-hidden bg-accent text-night transition-transform duration-500 ease-expo group-hover:translate-y-0"
            >
              <div className="marquee flex w-max whitespace-nowrap">
                {[0, 1, 2, 3].map((n) => (
                  <span key={n} className="display px-6 text-[clamp(2.75rem,9.5vw,9.5rem)]">
                    {v.title}{' '}
                    <span className="font-display font-normal normal-case italic tracking-tight">{v.line}</span> ✦
                  </span>
                ))}
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
