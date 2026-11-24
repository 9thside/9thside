import Link from 'next/link'
import { albums, highlights, albumMeta } from '@/lib/albums'
import { site } from '@/lib/site'
import { PhotoPile } from '@/components/home/PhotoPile'
import { HeroFade, HeroTitle } from '@/components/home/HeroTitle'
import { FrameReel } from '@/components/home/FrameReel'
import { ServiceRows } from '@/components/home/ServiceRows'
import { AlbumCard } from '@/components/portfolio/AlbumCard'
import { Photo } from '@/components/shared/Photo'
import { Parallax } from '@/components/shared/Parallax'
import { Reveal } from '@/components/shared/Reveal'
import { SpinBadge } from '@/components/shared/SpinBadge'
import { VelocityMarquee } from '@/components/shared/VelocityMarquee'
import { InquiryBand } from '@/components/shared/InquiryBand'

const steps = [
  {
    n: '01',
    title: 'We talk',
    body: 'A call or a coffee. Tell me about the two of you, the day you are planning and the photos you already love.',
  },
  {
    n: '02',
    title: 'We plan',
    body: 'Timelines, locations, light. I help shape the day so there is room for portraits without stealing you from your guests.',
  },
  {
    n: '03',
    title: 'You live it',
    body: 'I direct when it helps and vanish when it matters. Then a private gallery to keep, share and print.',
  },
]

export default function HomePage() {
  const [feature, ...rest] = albums
  const more = rest.slice(0, 4)
  // The hero pile leads with the chosen hero photos, topped up from the favourites.
  const pile = [...highlights.hero, ...highlights.selected].filter(
    (p, i, all) => all.findIndex((q) => q.src === p.src) === i
  )

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[100svh] flex-col overflow-hidden lg:block">
        <div className="relative mx-auto mt-20 h-[46svh] w-full max-w-xl px-3 lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:h-auto lg:w-[52vw] lg:max-w-none lg:px-0 lg:pb-10 lg:pt-28">
          <PhotoPile photos={pile} />
        </div>

        <div className="shell pointer-events-none relative z-10 flex flex-1 flex-col justify-end pb-10 pt-12 lg:min-h-[100svh] lg:pb-12 lg:pt-0">
          <HeroFade delay={0.2}>
            <p className="eyebrow text-ink/70">
              {site.tagline} <span className="mx-2 text-accent">/</span> {site.location}
            </p>
          </HeroFade>
          <HeroTitle
            className="display mt-4 text-[clamp(4.25rem,11.5vw,13rem)] lg:mt-5"
            lines={['Real', 'moments.', <>No stiff <em>poses.</em></>]}
          />
          <HeroFade className="pointer-events-auto mt-7 flex flex-wrap items-center gap-4 lg:mt-9">
            <Link href="/contact" className="btn-light">
              Check your date
            </Link>
            <Link href="/portfolio" className="btn-ghost-light">
              See the work
            </Link>
            <span className="eyebrow ml-2 hidden text-ink/45 lg:inline">← Go on, drag the prints</span>
            <span className="eyebrow w-full text-ink/45 lg:hidden">Tap the prints to shuffle</span>
          </HeroFade>
        </div>

      </section>

      {/* Marquee */}
      <div className="border-y border-ink/15 py-5 md:py-7">
        <VelocityMarquee className="display px-5 text-[clamp(2.5rem,7vw,7rem)]">
          Weddings <em>✦</em> Engagements <em>✦</em> Portraits <em>✦</em> Events <em>✦</em> Brands <em>✦</em>
        </VelocityMarquee>
      </div>

      {/* Introduction */}
      <section className="shell grid gap-10 py-24 md:py-40 lg:grid-cols-[1fr_2.4fr]">
        <Reveal className="flex flex-row items-start justify-between gap-6 lg:flex-col">
          <p className="eyebrow text-accent">Who&rsquo;s behind this</p>
          <Link href="/contact" aria-label="Inquire" className="block h-28 w-28 shrink-0 text-cream lg:h-36 lg:w-36">
            <SpinBadge text="Now booking ✦ Toronto & beyond ✦ " className="h-full w-full" />
          </Link>
        </Reveal>
        <div>
          <Reveal>
            <p className="statement text-[clamp(2rem,4.6vw,4.75rem)]">
              I&rsquo;m {site.founder.split(' ')[0]}. Since 2016 I&rsquo;ve photographed people on the days they will talk about for
              the rest of their lives — and I&rsquo;m far more interested in <em>how it felt</em> than how it was
              supposed to look.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Link href="/about" className="link-line mt-10">
              More about me
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Featured story */}
      {feature && (
        <section className="relative pb-24 md:pb-40">
          <div className="shell">
            <Reveal className="flex items-end justify-between border-t border-ink/15 pt-6">
              <p className="eyebrow text-accent">Featured story</p>
              <p className="eyebrow text-ink/45">{albumMeta(feature)}</p>
            </Reveal>
          </div>

          <Link href={`/portfolio/${feature.slug}`} data-cursor="View" className="group relative mt-10 block">
            <div className="shell grid grid-cols-12 items-center gap-3 md:gap-6">
              <Parallax amount={30} className="col-span-7 overflow-hidden md:col-span-6 md:col-start-2">
                <Photo
                  photo={feature.cover}
                  quality={85}
                  sizes="(min-width: 768px) 50vw, 60vw"
                  className="h-auto w-full transition-transform duration-[1400ms] ease-expo group-hover:scale-[1.04]"
                />
              </Parallax>
              {feature.featured[1] && (
                <Parallax amount={110} className="col-span-5 md:col-span-3 md:col-start-9">
                  <Photo photo={feature.featured[1]} sizes="(min-width: 768px) 25vw, 40vw" className="h-auto w-full" />
                </Parallax>
              )}
            </div>
            <h2 className="display pointer-events-none absolute inset-x-0 bottom-0 translate-y-[58%] text-center text-[clamp(3.75rem,15vw,16rem)]">
              {feature.title}
            </h2>
          </Link>

          <div className="shell mt-24 grid gap-8 md:mt-48 md:grid-cols-12">
            <Reveal className="md:col-span-5 md:col-start-2">
              <p className="prose-body text-ink/65">{feature.description}</p>
            </Reveal>
            <Reveal delay={0.1} className="md:col-span-4 md:col-start-8 md:text-right">
              <Link href={`/portfolio/${feature.slug}`} className="btn-ghost-light">
                Open the full story →
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* More albums */}
      {more.length > 0 && (
        <section className="shell pb-24 md:pb-40">
          <Reveal>
            <p className="eyebrow border-t border-ink/15 pt-6 text-accent">Recent work</p>
          </Reveal>
          <div className="mt-12 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:gap-x-12">
            {more.map((album, i) => (
              <Reveal key={album.slug} delay={(i % 2) * 0.1} className={i % 2 === 1 ? 'md:mt-24' : ''}>
                <AlbumCard album={album} sizes="(min-width: 768px) 48vw, 100vw" />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Pinned reel of favourite frames */}
      {highlights.selected.length > 0 && (
        <FrameReel photos={highlights.selected}>
          <p className="eyebrow text-accent">Favourite frames</p>
          <h2 className="display mt-5 text-[clamp(3.5rem,9vw,9rem)]">
            The bits <em>in between.</em>
          </h2>
          <p className="prose-body mt-6 max-w-sm text-ink/60">
            The glance, the fidget, the laugh nobody planned. Keep scrolling.
          </p>
        </FrameReel>
      )}

      {/* What I shoot */}
      <section className="py-24 md:py-40">
        <div className="shell mb-12 grid gap-6 md:mb-16 lg:grid-cols-[1fr_2.4fr]">
          <Reveal>
            <p className="eyebrow text-accent">What I shoot</p>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="statement max-w-3xl text-[clamp(1.6rem,3vw,2.75rem)]">
              Weddings first. But the same eye goes into the engagement, the family portrait, the launch party and
              the listing.
            </p>
          </Reveal>
        </div>
        <ServiceRows />
      </section>

      {/* How it works */}
      <section className="bg-paper-deep">
        <div className="shell py-24 md:py-40">
          <Reveal>
            <p className="eyebrow text-accent">How it works</p>
            <h2 className="display mt-5 text-[clamp(3.5rem,11vw,11rem)]">
              Easy. <em>Promise.</em>
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-3 md:gap-8">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.1} className="border-t border-ink/20 pt-5">
                <p className="display outline-text text-[7rem] md:text-[9rem]">{s.n}</p>
                <h3 className="display mt-4 text-5xl">{s.title}</h3>
                <p className="prose-body mt-4 max-w-sm text-ink/65">{s.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <InquiryBand />
    </>
  )
}
