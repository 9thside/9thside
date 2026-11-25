import Link from 'next/link'
import { albums, findPhoto, getAlbum, highlights } from '@/lib/albums'
import { site, verticals } from '@/lib/site'
import picks from '@/content/highlights.json'
import { HeroBackdrop } from '@/components/home/HeroBackdrop'
import { HeroFade, HeroTitle } from '@/components/home/HeroTitle'
import { Photo } from '@/components/shared/Photo'
import { Reveal } from '@/components/shared/Reveal'
import { InquiryBand } from '@/components/shared/InquiryBand'

export default function HomePage() {
  // Wide photographs fill the screen on computers, tall ones on phones.
  const resolve = (refs: string[] = []) => refs.map(findPhoto).filter((p) => p !== undefined)
  const tall = highlights.hero.filter((p) => p.height > p.width)
  const wide = resolve(picks.heroWide)
  // Three albums chosen in content/highlights.json; falls back to the first three in portfolio order.
  const chosen = (picks.albums ?? []).map(getAlbum).filter((a) => a !== undefined)
  const featured = (chosen.length ? chosen : albums).slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-night text-cream">
        <HeroBackdrop wide={wide} tall={tall} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/25" />
        <div className="shell relative pb-10 pt-40 md:pb-16">
          <HeroFade delay={0.1}>
            <p className="eyebrow text-cream/85">{site.tagline}</p>
          </HeroFade>
          <HeroTitle
            className="display mt-4 text-[clamp(2.6rem,6.2vw,5.75rem)]"
            lines={[<>Once, <em>beautifully.</em></>]}
          />
          <HeroFade delay={0.5}>
            <p className="prose-body mt-4 hidden max-w-lg text-cream/85 md:block">
              Photography by {site.founder}. {site.location}, by appointment.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-4 md:mt-8">
              <Link href="/contact" className="btn-light">
                Enquire
              </Link>
              <Link href="/portfolio" className="link-line">
                View the portfolio
              </Link>
            </div>
          </HeroFade>
        </div>
      </section>

      {/* Statement */}
      <section className="shell py-24 text-center md:py-36">
        <Reveal>
          <p className="statement mx-auto max-w-3xl text-[clamp(1.6rem,3.2vw,2.75rem)]">
            A wedding happens once. I photograph it the way it felt — unhurried, true to colour, and with the
            discretion of someone who knows <em>when to step back.</em>
          </p>
          <Link href="/about" className="link-line mt-10">
            About the photographer
          </Link>
        </Reveal>
      </section>

      {/* Selected commissions */}
      <section className="shell pb-24 md:pb-36">
        <Reveal className="flex items-end justify-between border-b border-ink/15 pb-5">
          <h2 className="eyebrow text-accent">Selected commissions</h2>
          <Link href="/portfolio" className="eyebrow text-ink/60 transition-colors duration-500 hover:text-accent">
            View all
          </Link>
        </Reveal>
        <div className="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-3">
          {featured.map((album, i) => (
            <Reveal key={album.slug} delay={i * 0.1}>
              <Link href={`/portfolio/${album.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-paper-deep">
                  <Photo
                    photo={album.hero}
                    fill
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="transition-transform duration-[1600ms] ease-expo group-hover:scale-[1.04]"
                  />
                </div>
                <h3 className="mt-5 font-display text-2xl font-light uppercase tracking-[0.1em] transition-colors duration-500 group-hover:text-accent">
                  {album.title}
                </h3>
                <p className="eyebrow mt-2 text-ink/45">
                  {album.categoryLabel}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="shell pb-24 md:pb-36">
        <Reveal className="border-b border-ink/15 pb-5">
          <h2 className="eyebrow text-accent">Commissions</h2>
        </Reveal>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3">
          {verticals.map((v, i) => (
            <li key={v.id}>
              <Reveal delay={(i % 3) * 0.06}>
                <Link
                  href={v.href ?? `/services#${v.id}`}
                  className="group flex items-baseline justify-between gap-6 border-b border-ink/15 py-6 sm:mr-8"
                >
                  <span className="font-display text-2xl font-light transition-colors duration-500 group-hover:text-accent">
                    {v.title}
                  </span>
                  <span aria-hidden className="text-ink/35 transition-all duration-500 group-hover:translate-x-1 group-hover:text-accent">
                    →
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <InquiryBand />
    </>
  )
}
