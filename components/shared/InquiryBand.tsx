import Link from 'next/link'
import { Reveal } from './Reveal'
import { site } from '@/lib/site'

interface InquiryBandProps {
  eyebrow?: string
  title?: string
  href?: string
}

export function InquiryBand({
  eyebrow = 'Inquiries open',
  title = 'Tell me about your day.',
  href = '/contact',
}: InquiryBandProps) {
  return (
    <section className="bg-night text-cream">
      <div className="shell py-28 text-center md:py-44">
        <Reveal>
          <p className="eyebrow text-accent">{eyebrow}</p>
          <h2 className="display mx-auto mt-8 max-w-4xl text-[clamp(2.75rem,8vw,7.5rem)] italic">{title}</h2>
          <p className="prose-body mx-auto mt-8 max-w-md text-cream/60">
            Dates are limited each season. Share a few details and I&rsquo;ll reply personally, usually within a day
            or two.
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Link href={href} className="btn-light">
              Start an inquiry
            </Link>
            <a href={`mailto:${site.email}`} className="btn-ghost-light normal-case tracking-[0.08em]">
              {site.email}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
