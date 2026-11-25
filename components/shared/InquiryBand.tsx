import Link from 'next/link'
import { Reveal } from './Reveal'
import { Magnetic } from './Magnetic'
import { VelocityMarquee } from './VelocityMarquee'
import { site } from '@/lib/site'

interface InquiryBandProps {
  eyebrow?: string
  title?: React.ReactNode
  href?: string
}

export function InquiryBand({
  eyebrow = 'Inquiries open',
  title = (
    <>
      Got a <em>date?</em>
    </>
  ),
  href = '/contact',
}: InquiryBandProps) {
  return (
    <section className="relative overflow-hidden bg-accent text-night [&_em]:!text-night">
      <div className="border-b border-night/20 py-3">
        <VelocityMarquee speed={3} className="eyebrow px-6">
          Now booking ✦ Weddings ✦ Engagements ✦ Portraits ✦ Events ✦ {site.location} ✦
        </VelocityMarquee>
      </div>
      <div className="shell flex flex-col items-start gap-12 py-24 md:py-36 lg:flex-row lg:items-end lg:justify-between">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="display mt-6 text-[clamp(4.5rem,17vw,17rem)]">{title}</h2>
          <p className="prose-body mt-8 max-w-md text-night/75">
            Dates are limited each season. Send a few details and I&rsquo;ll reply personally, usually within a day or
            two.
          </p>
          <a href={`mailto:${site.email}`} className="link-line mt-8 normal-case tracking-[0.06em]">
            {site.email}
          </a>
        </Reveal>
        <Magnetic>
          <Link
            href={href}
            data-cursor="Go"
            className="display flex h-40 w-40 items-center justify-center rounded-full bg-night text-center text-3xl text-cream transition-transform duration-500 ease-expo hover:scale-110 md:h-56 md:w-56 md:text-5xl"
          >
            Let&rsquo;s
            <br />
            talk
          </Link>
        </Magnetic>
      </div>
    </section>
  )
}
