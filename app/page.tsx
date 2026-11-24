import Link from 'next/link'
import { albums, highlights, albumMeta } from '@/lib/albums'
import { site, verticals } from '@/lib/site'
import { HeroSlideshow } from '@/components/home/HeroSlideshow'
import { FrameStrip } from '@/components/home/FrameStrip'
import { AlbumCard } from '@/components/portfolio/AlbumCard'
import { Photo } from '@/components/shared/Photo'
import { Reveal } from '@/components/shared/Reveal'
import { InquiryBand } from '@/components/shared/InquiryBand'

const steps = [
  {
    n: '01',
    title: 'We talk',
    body: 'A call or a coffee. You tell me about the two of you, the day you are planning and the photographs you already love.',
  },
  {
    n: '02',
    title: 'We plan',
    body: 'Timelines, locations and light. I help shape the day so there is room for portraits without pulling you away from your guests.',
  },
  {
    n: '03',
    title: 'You live it',
    body: 'On the day I direct when it helps and disappear when it matters. Afterwards, a private gallery to keep, share and print.',
  },
]

export default function HomePage() {
  const [feature, ...rest] = albums
  const more = rest.slice(0, 4)

  return (
    <>
      {/* Hero */}
      <section className="relative flex flex-col overflow-hidden bg-night text-cream lg:block lg:min-h-[100svh]">
        <div className="relative h-[62svh] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[46vw]">
          <HeroSlideshow slides={highlights.hero} />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-night/60 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-night to-transparent lg:inset-y-0 lg:left-0 lg:right-auto lg:h-auto lg:w-1/3 lg:bg-gradient-to-r lg:from-night/60" />
        </div>

        <div className="shell relative -mt-10 flex flex-col pb-16 lg:mt-0 lg:min-h-[100svh] lg:justify-center lg:pb-0 lg:pt-24">
          <div className="lg:max-w-[50vw]">
            <p className="eyebrow leading-relaxed text-cream/70">
              {site.tagline} <span className="mx-2 text-accent">—</span> {site.location}
            </p>
            <h1 className="display mt-6 text-[clamp(3rem,8.2vw,8.75rem)] lg:mt-7">
              Photographs that feel like <em>the day did.</em>
            </h1>
            <p className="prose-body mt-7 max-w-md text-cream/65 lg:mt-8">
              Honest, cinematic photography for weddings, couples and the people who matter most to you.
            </p>
            <div className="mt-9 flex flex-wrap gap-4 lg:mt-10">
              <Link href="/contact" className="btn-light">
                Check your date
              </Link>
              <Link href="/portfolio" className="btn-ghost-light">
                View the portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="shell grid gap-12 py-28 md:py-44 lg:grid-cols-[1fr_2.2fr]">
        <Reveal>
          <p className="eyebrow text-accent">The studio</p>
        </Reveal>
        <div>
          <Reveal>
            <p className="display text-[clamp(2rem,4.4vw,4.25rem)] leading-[1.08]">
              9thside is the photography of {site.founder}. Since 2016 I have photographed weddings, couples and
              portraits across Toronto <em>the way they actually felt</em> — unhurried, true to colour, and full of
              the small things you would otherwise forget.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Link href="/about" className="link-line mt-12">
              About Nabeel
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Featured story */}
      {feature && (
        <section className="shell pb-28 md:pb-44">
          <Reveal className="flex items-end justify-between border-t border-ink/15 pt-6">
            <p className="eyebrow text-accent">Featured story</p>
            <Link href="/portfolio" className="link-line">
              All work
            </Link>
          </Reveal>

          <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
            <Reveal className="lg:col-span-7">
              <Link href={`/portfolio/${feature.slug}`} className="group relative block aspect-[3/2] overflow-hidden bg-paper-deep">
                <Photo
                  photo={feature.cover}
                  fill
                  quality={85}
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="transition-transform duration-[1400ms] ease-expo group-hover:scale-[1.03]"
                />
              </Link>
              <div className="mt-10 lg:mt-14 lg:max-w-lg">
                <p className="eyebrow text-ink/45">{albumMeta(feature)}</p>
                <h2 className="display mt-5 text-[clamp(2.75rem,6vw,5.5rem)] italic">{feature.title}</h2>
                <p className="prose-body mt-6 text-ink/65">{feature.description}</p>
                <Link href={`/portfolio/${feature.slug}`} className="btn-dark mt-10">
                  View the full story
                </Link>
              </div>
            </Reveal>

            <div className="grid grid-cols-2 gap-4 lg:col-span-5 lg:block lg:space-y-12 lg:pt-28">
              {feature.featured.slice(1, 3).map((photo, i) => (
                <Reveal key={photo.src} delay={0.1 + i * 0.1} className={i === 1 ? 'lg:ml-auto lg:w-3/4' : ''}>
                  <Link href={`/portfolio/${feature.slug}`} className="group block overflow-hidden bg-paper-deep">
                    <Photo
                      photo={photo}
                      sizes="(min-width: 1024px) 38vw, 50vw"
                      className="h-auto w-full transition-transform duration-[1400ms] ease-expo group-hover:scale-[1.03]"
                    />
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* More albums */}
      {more.length > 0 && (
        <section className="shell pb-28 md:pb-44">
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

      {/* Favourite frames */}
      {highlights.selected.length > 0 && (
        <section className="bg-night py-24 text-cream md:py-36">
          <div className="shell mb-12 flex items-end justify-between md:mb-16">
            <Reveal>
              <p className="eyebrow text-accent">Favourite frames</p>
              <h2 className="display mt-5 text-[clamp(2.5rem,5.5vw,5rem)]">
                The <em>in-between</em> moments.
              </h2>
            </Reveal>
            <p className="eyebrow hidden text-cream/40 md:block">Scroll →</p>
          </div>
          <FrameStrip photos={highlights.selected} />
        </section>
      )}

      {/* What I photograph */}
      <section className="shell py-28 md:py-44">
        <Reveal className="grid gap-8 lg:grid-cols-[1fr_2.2fr]">
          <p className="eyebrow text-accent">What I photograph</p>
          <p className="prose-body max-w-xl text-ink/65">
            Weddings are the heart of the studio. The same eye goes into everything else — the engagement, the family
            portrait, the launch party, the listing.
          </p>
        </Reveal>

        <ul className="mt-16 border-t border-ink/15">
          {verticals.map((v, i) => (
            <li key={v.id}>
              <Reveal delay={i * 0.04}>
                <Link
                  href={v.href ?? `/services#${v.id}`}
                  className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 border-b border-ink/15 py-7 md:grid-cols-[5rem_1.2fr_1fr_auto] md:py-10"
                >
                  <span className="eyebrow text-ink/40">{String(i + 1).padStart(2, '0')}</span>
                  <span className="display text-[clamp(2rem,5vw,4.5rem)] transition-all duration-500 ease-expo group-hover:translate-x-3 group-hover:italic">
                    {v.title}
                  </span>
                  <span className="hidden text-sm text-ink/55 md:block">{v.line}</span>
                  <span aria-hidden className="text-xl transition-transform duration-500 ease-expo group-hover:translate-x-2">
                    →
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* The experience */}
      <section className="bg-paper-deep">
        <div className="shell py-28 md:py-40">
          <Reveal>
            <p className="eyebrow text-accent">The experience</p>
            <h2 className="display mt-6 max-w-3xl text-[clamp(2.5rem,5.5vw,5rem)]">
              Calm on the day. <em>Careful</em> with everything after.
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-3 md:gap-10">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.1} className="border-t border-ink/20 pt-6">
                <p className="eyebrow text-ink/40">{s.n}</p>
                <h3 className="mt-8 font-display text-4xl font-light">{s.title}</h3>
                <p className="prose-body mt-4 text-ink/65">{s.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <InquiryBand />
    </>
  )
}
