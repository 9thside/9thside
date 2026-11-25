import Link from 'next/link'
import { Reveal } from './Reveal'
import { site } from '@/lib/site'

interface InquiryBandProps {
  eyebrow?: string
  title?: React.ReactNode
  href?: string
}

export function InquiryBand({
  eyebrow = 'Enquiries',
  title = (
    <>
      Reserve <em>your date.</em>
    </>
  ),
  href = '/contact',
}: InquiryBandProps) {
  return (
    <section>
      <div className="rule" />
      <div className="shell py-24 text-center md:py-36">
        <Reveal>
          <p className="eyebrow text-accent">{eyebrow}</p>
          <h2 className="display mx-auto mt-7 max-w-3xl text-[clamp(2.5rem,6vw,5.25rem)]">{title}</h2>
          <p className="prose-body mx-auto mt-7 max-w-sm text-ink/60">
            A limited number of commissions are accepted each season. Every enquiry receives a personal reply.
          </p>
          <div className="mt-10 flex flex-col items-center gap-6">
            <Link href={href} className="btn-light">
              Enquire
            </Link>
            <a href={`mailto:${site.email}`} className="text-sm text-ink/55 transition-colors duration-500 hover:text-accent">
              {site.email}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
