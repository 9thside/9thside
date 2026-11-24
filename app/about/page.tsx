import type { Metadata } from 'next'
import Link from 'next/link'
import { highlights } from '@/lib/albums'
import { site } from '@/lib/site'
import { Photo } from '@/components/shared/Photo'
import { PageHeader } from '@/components/shared/PageHeader'
import { Reveal } from '@/components/shared/Reveal'
import { InquiryBand } from '@/components/shared/InquiryBand'

export const metadata: Metadata = {
  title: 'About',
  description: `${site.founder} is the photographer behind 9thside — photographing weddings, couples and portraits across Toronto since 2016.`,
  alternates: { canonical: '/about' },
}

const beliefs = [
  { title: 'Light first', body: 'The light is either right or it is not. I plan around it, chase it, and make it when it is missing.' },
  { title: 'People before poses', body: 'A little direction, then space. The photograph is in what happens after I stop talking.' },
  { title: 'Edits that age well', body: 'True skin tones, honest colour. Nothing trendy that will date your photographs in five years.' },
]

export default function AboutPage() {
  const [first, second] = highlights.selected

  return (
    <>
      <PageHeader
        eyebrow="About"
        title={
          <>
            Hello, I&rsquo;m <em>Nabeel.</em>
          </>
        }
      />

      <section className="shell grid gap-14 pb-28 md:pb-44 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
        <Reveal>{first && <Photo photo={first} sizes="(min-width: 1024px) 45vw, 100vw" className="h-auto w-full" />}</Reveal>
        <div className="self-center">
          <Reveal>
            <blockquote className="display text-[clamp(1.9rem,3.4vw,3.25rem)] italic leading-[1.12]">
              &ldquo;I started with a camera and a conviction: that the way something looks shapes how it is
              remembered.&rdquo;
            </blockquote>
          </Reveal>
          <Reveal delay={0.1} className="mt-12 space-y-6">
            <p className="prose-body text-ink/65">
              9thside began in 2016 with photography — not as a hustle, but as a way of learning to see. Portraits,
              events and weddings across the GTA, thousands of frames, and the honest feedback of people who either
              got the photographs they hoped for or did not.
            </p>
            <p className="prose-body text-ink/65">
              That taught me the thing I still work by: you cannot fake a great photograph. The moment is either there
              or it has passed. So I prepare carefully, stay close, and keep watching after everyone else has looked
              away.
            </p>
            <p className="prose-body text-ink/65">
              Today I photograph weddings and the people around them — couples, families, founders — from my base in
              Toronto. If you are reading this, I would love to hear what you are planning.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <Link href="/contact" className="btn-dark mt-12">
              Get in touch
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper-deep">
        <div className="shell grid gap-14 py-28 md:py-40 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
          <div>
            <Reveal>
              <p className="eyebrow text-accent">How I work</p>
              <h2 className="display mt-6 text-[clamp(2.5rem,5vw,4.5rem)]">
                Three things I <em>will not</em> compromise on.
              </h2>
            </Reveal>
            <div className="mt-14">
              {beliefs.map((b, i) => (
                <Reveal key={b.title} delay={i * 0.08} className="border-t border-ink/20 py-8">
                  <h3 className="font-display text-3xl font-light">{b.title}</h3>
                  <p className="prose-body mt-3 max-w-md text-ink/65">{b.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={0.1} className="self-end">
            {second && <Photo photo={second} sizes="(min-width: 1024px) 40vw, 100vw" className="h-auto w-full" />}
          </Reveal>
        </div>
      </section>

      <InquiryBand eyebrow="Say hello" title="Let’s meet." />
    </>
  )
}
