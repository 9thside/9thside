import type { Metadata } from 'next'
import { Suspense } from 'react'
import { site } from '@/lib/site'
import { InquiryForm } from '@/components/contact/InquiryForm'
import { PageHeader } from '@/components/shared/PageHeader'
import { Reveal } from '@/components/shared/Reveal'

export const metadata: Metadata = {
  title: 'Enquire',
  description: 'Check availability and inquire about wedding, portrait and event photography with 9thside in Toronto.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Enquire"
        title={
          <>
            Begin your <em>enquiry.</em>
          </>
        }
        intro="The more you share, the better I can help — your date, your venue, and the kind of photographs you are hoping for."
      />

      <section className="shell grid gap-16 pb-28 md:pb-44 lg:grid-cols-[2fr_1fr] lg:gap-24">
        <Reveal>
          <Suspense>
            <InquiryForm />
          </Suspense>
        </Reveal>

        <Reveal delay={0.1}>
          <aside className="space-y-10 border-t border-ink/15 pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            <div>
              <p className="eyebrow text-ink/45">Email</p>
              <a href={`mailto:${site.email}`} className="mt-3 block font-display text-3xl font-light hover:italic">
                {site.email}
              </a>
            </div>
            <div>
              <p className="eyebrow text-ink/45">Based in</p>
              <p className="mt-3 font-display text-3xl font-light">{site.location}</p>
              <p className="mt-2 text-sm text-ink/55">Available for travel across Ontario and beyond.</p>
            </div>
            {site.instagram && (
              <div>
                <p className="eyebrow text-ink/45">Instagram</p>
                <a
                  href={`https://instagram.com/${site.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 block font-display text-3xl font-light hover:italic"
                >
                  @{site.instagram}
                </a>
              </div>
            )}
            {site.clientGalleries && (
              <div>
                <p className="eyebrow text-ink/45">Existing clients</p>
                <a href={site.clientGalleries} target="_blank" rel="noopener noreferrer" className="link-line mt-4">
                  View your gallery
                </a>
              </div>
            )}
          </aside>
        </Reveal>
      </section>
    </>
  )
}
