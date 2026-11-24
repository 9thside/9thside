import type { Metadata } from 'next'
import Link from 'next/link'
import { albums } from '@/lib/albums'
import { verticals } from '@/lib/site'
import { Photo } from '@/components/shared/Photo'
import { PageHeader } from '@/components/shared/PageHeader'
import { Reveal } from '@/components/shared/Reveal'
import { InquiryBand } from '@/components/shared/InquiryBand'

export const metadata: Metadata = {
  title: 'Photography Services',
  description:
    'Wedding, engagement, portrait, event, commercial and real estate photography in Toronto and the GTA by 9thside.',
  alternates: { canonical: '/services' },
}

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title={
          <>
            One eye, <em>many rooms.</em>
          </>
        }
        intro="Weddings are the heart of the studio, but the approach travels: watch closely, light it well, and make people feel at ease."
      />

      <section className="shell pb-28 md:pb-40">
        {verticals.map((v, i) => {
          const album = albums.find((a) => a.category === v.category)
          return (
            <Reveal key={v.id}>
              <article
                id={v.id}
                className="grid scroll-mt-28 gap-10 border-t border-ink/15 py-16 md:py-24 lg:grid-cols-[5rem_1.1fr_1fr] lg:gap-14"
              >
                <p className="eyebrow text-ink/40">{String(i + 1).padStart(2, '0')}</p>
                <div>
                  <h2 className="display text-[clamp(2.75rem,5.5vw,5rem)]">{v.title}</h2>
                  <p className="mt-4 font-display text-2xl font-light italic text-ink/60">{v.line}</p>
                  <p className="prose-body mt-8 max-w-lg text-ink/65">{v.body}</p>
                  <div className="mt-10 flex flex-wrap gap-4">
                    <Link href={`/contact?type=${encodeURIComponent(v.title)}`} className="btn-dark">
                      Inquire
                    </Link>
                    {v.href && (
                      <Link href={v.href} className="btn-ghost-dark">
                        More on weddings
                      </Link>
                    )}
                  </div>
                </div>
                <div>
                  {album && (
                    <Link href={`/portfolio/${album.slug}`} className="group relative mb-10 block aspect-[3/2] overflow-hidden bg-paper-deep">
                      <Photo
                        photo={album.cover}
                        fill
                        sizes="(min-width: 1024px) 36vw, 100vw"
                        className="transition-transform duration-[1400ms] ease-expo group-hover:scale-[1.03]"
                      />
                    </Link>
                  )}
                  <ul>
                    {v.includes.map((item) => (
                      <li key={item} className="border-b border-ink/15 py-4 text-sm text-ink/75 first:border-t">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          )
        })}
      </section>

      <InquiryBand eyebrow="Not sure where you fit?" title="Just ask." />
    </>
  )
}
