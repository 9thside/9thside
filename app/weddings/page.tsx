import type { Metadata } from 'next'
import Link from 'next/link'
import { albums, highlights } from '@/lib/albums'
import { AlbumCard } from '@/components/portfolio/AlbumCard'
import { Photo } from '@/components/shared/Photo'
import { Reveal } from '@/components/shared/Reveal'
import { Faq, type FaqItem } from '@/components/shared/Faq'
import { InquiryBand } from '@/components/shared/InquiryBand'

export const metadata: Metadata = {
  title: 'Wedding Photography in Toronto & the GTA',
  description:
    'Wedding photography by 9thside — full-day coverage, pre-shoots and engagement sessions across Toronto, Mississauga and the GTA. Now taking inquiries.',
  alternates: { canonical: '/weddings' },
}

const included = [
  { title: 'Full-day coverage', body: 'From getting ready to the send-off, with a timeline built around the light and your guests.' },
  { title: 'Pre-shoot or engagement session', body: 'Time together before the day, so the camera already feels familiar when it counts.' },
  { title: 'Multi-day celebrations', body: 'Mehndi, nikkah, ceremony, reception — covered as one story with a consistent look.' },
  { title: 'Private online gallery', body: 'Every edited photograph in full resolution, easy to share with family and to print from.' },
  { title: 'Planning help', body: 'A second pair of eyes on your timeline, your portrait locations and your family photo list.' },
  { title: 'Wedding films', body: 'Add a highlight film shot alongside the photography, in the same style.' },
]

const faq: FaqItem[] = [
  {
    q: 'How far in advance should we book?',
    a: 'As early as you can once your date and venue are set. Popular weekend dates go first, and I only take one wedding per day so each couple gets my full attention.',
  },
  {
    q: 'Do you travel?',
    a: 'Yes. I am based in Toronto and photograph across the GTA and Ontario as standard. For weddings further afield, travel is quoted upfront so there are no surprises.',
  },
  {
    q: 'We are awkward in front of a camera. Is that a problem?',
    a: 'Almost everyone says this. I give light direction when you need it — where to stand, what to do with your hands — and then let things unfold. A pre-shoot before the wedding helps more than anything.',
  },
  {
    q: 'Do you photograph cultural and multi-day weddings?',
    a: 'Yes, and gladly. I have photographed South Asian and Muslim weddings with multiple events, and I take time beforehand to understand the traditions and the moments that matter most to your families.',
  },
  {
    q: 'How do we receive our photographs?',
    a: 'In a private online gallery you can share with family and friends, download from in full resolution, and order prints through.',
  },
  {
    q: 'What does it cost?',
    a: 'Every wedding is different, so collections are tailored to your day — hours of coverage, number of events and any add-ons. Send an inquiry with your date and I will reply with a full guide.',
  },
]

export default function WeddingsPage() {
  const weddings = albums.filter((a) => a.category === 'wedding').slice(0, 4)
  const [lead, ...restSelected] = highlights.selected
  const side = restSelected.slice(0, 2)

  return (
    <>
      <section className="relative min-h-[100svh] overflow-hidden bg-night text-cream">
        {lead && <Photo photo={lead} fill priority quality={85} sizes="100vw" className="kenburns object-[50%_35%]" />}
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-night/50" />
        <div className="shell relative flex min-h-[100svh] flex-col justify-end pb-16 pt-40 md:pb-24">
          <p className="eyebrow text-cream/70">Weddings</p>
          <h1 className="display mt-6 max-w-6xl text-[clamp(2.75rem,7vw,6.5rem)]">
            Your wedding, <em>beautifully kept.</em>
          </h1>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/contact?type=Wedding" className="btn-light">
              Check your date
            </Link>
          </div>
        </div>
      </section>

      <section className="shell grid gap-14 py-28 md:py-44 lg:grid-cols-2 lg:gap-24">
        <Reveal>
          <p className="eyebrow text-accent">The approach</p>
          <p className="statement mt-8 text-[clamp(2rem,3.8vw,3.75rem)]">
            The best wedding photographs are rarely the ones anyone posed for. They are the look across the room, the
            hand on a shoulder, <em>your father pretending not to cry.</em>
          </p>
        </Reveal>
        <Reveal delay={0.1} className="space-y-6 self-end">
          <p className="prose-body text-ink/65">
            I photograph weddings as a quiet observer with a director&rsquo;s eye — guiding the portraits so they
            flatter you, then stepping back so the day can be itself. The colour stays true, the edit stays timeless,
            and nothing is staged that did not need to be.
          </p>
          <p className="prose-body text-ink/65">
            You should be able to open your gallery in thirty years and remember exactly how it felt.
          </p>
        </Reveal>
      </section>

      {side.length === 2 && (
        <section className="shell grid grid-cols-2 gap-3 pb-28 md:gap-8 md:pb-44">
          {side.map((photo, i) => (
            <Reveal key={photo.src} delay={i * 0.1} className={i === 1 ? 'mt-16 md:mt-40' : ''}>
              <Photo photo={photo} sizes="50vw" className="h-auto w-full" />
            </Reveal>
          ))}
        </section>
      )}

      <section className="bg-paper-deep">
        <div className="shell py-28 md:py-40">
          <Reveal>
            <p className="eyebrow text-accent">What is included</p>
            <h2 className="display mt-6 max-w-3xl text-[clamp(2.25rem,4.8vw,4.5rem)]">
              Everything you need, <em>nothing you do not.</em>
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {included.map((item, i) => (
              <Reveal key={item.title} delay={(i % 3) * 0.08} className="border-t border-ink/20 pt-6">
                <h3 className="font-display text-3xl font-light">{item.title}</h3>
                <p className="prose-body mt-3 text-ink/65">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {weddings.length > 0 && (
        <section className="shell py-28 md:py-44">
          <Reveal className="flex items-end justify-between border-t border-ink/15 pt-6">
            <p className="eyebrow text-accent">Recent weddings</p>
            <Link href="/portfolio" className="link-line">
              Full portfolio
            </Link>
          </Reveal>
          <div className="mt-12 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:gap-x-12">
            {weddings.map((album, i) => (
              <Reveal key={album.slug} delay={(i % 2) * 0.1} className={i % 2 === 1 ? 'md:mt-24' : ''}>
                <AlbumCard album={album} sizes="(min-width: 768px) 48vw, 100vw" />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <section className="shell grid gap-12 pb-28 md:pb-44 lg:grid-cols-[1fr_2fr]">
        <Reveal>
          <p className="eyebrow text-accent">Good to know</p>
          <h2 className="display mt-6 text-[clamp(2.25rem,4.8vw,4.5rem)]">
            Questions, <em>answered.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <Faq items={faq} />
        </Reveal>
      </section>

      <InquiryBand eyebrow="Weddings" title={<>Is your date <em>free?</em></>} href="/contact?type=Wedding" />
    </>
  )
}
