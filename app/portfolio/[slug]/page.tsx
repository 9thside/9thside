import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { albums, getAlbum, albumYear } from '@/lib/albums'
import { Gallery } from '@/components/gallery/Gallery'
import { Photo } from '@/components/shared/Photo'
import { Reveal } from '@/components/shared/Reveal'
import { InquiryBand } from '@/components/shared/InquiryBand'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false
export const generateStaticParams = () => albums.map((a) => ({ slug: a.slug }))

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const album = getAlbum((await params).slug)
  if (!album) return {}
  const description = album.description || `${album.title} — ${album.categoryLabel.toLowerCase()} photography by 9thside.`
  return {
    title: `${album.title} — ${album.categoryLabel}`,
    description,
    alternates: { canonical: `/portfolio/${album.slug}` },
    openGraph: {
      title: album.title,
      description,
      images: [{ url: album.cover.src, width: album.cover.width, height: album.cover.height }],
    },
  }
}

export default async function AlbumPage({ params }: Props) {
  const album = getAlbum((await params).slug)
  if (!album) notFound()

  const next = albums[(albums.indexOf(album) + 1) % albums.length]
  const facts = [
    ['Category', album.categoryLabel],
    ['Location', album.location],
    ['Year', albumYear(album)],
    ['Photographs', String(album.photos.length)],
  ].filter(([, value]) => value)

  return (
    <>
      <section className="relative flex min-h-[92svh] items-end overflow-hidden bg-night text-cream">
        <Photo photo={album.cover} fill priority quality={85} sizes="100vw" className="kenburns" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-black/35" />
        <div className="shell relative pb-14 pt-40 md:pb-20">
          <p className="eyebrow text-accent">{album.categoryLabel}</p>
          <h1 className="display mt-5 text-[clamp(2.25rem,6vw,5.5rem)] uppercase tracking-[0.06em]">{album.title}</h1>
        </div>
      </section>

      <section className="shell grid gap-12 py-20 md:py-28 lg:grid-cols-[1fr_1.6fr]">
        <Reveal>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-8">
            {facts.map(([label, value]) => (
              <div key={label}>
                <dt className="eyebrow text-ink/40">{label}</dt>
                <dd className="mt-2 font-display text-2xl font-light">{value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
        {album.description && (
          <Reveal delay={0.1}>
            <p className="statement text-[clamp(1.6rem,3vw,2.75rem)]">{album.description}</p>
          </Reveal>
        )}
      </section>

      <section className="px-2 pb-24 sm:px-3 md:pb-36">
        <Gallery photos={album.photos} />
      </section>

      {next && next.slug !== album.slug && (
        <Link href={`/portfolio/${next.slug}`} className="group relative block overflow-hidden bg-night text-cream">
          <Photo
            photo={next.cover}
            fill
            sizes="100vw"
            className="opacity-45 transition-all duration-[1400ms] ease-expo group-hover:scale-[1.03] group-hover:opacity-60"
          />
          <div className="shell relative py-32 text-center md:py-48">
            <p className="eyebrow text-cream/70">Next story</p>
            <p className="display mt-5 text-[clamp(2.75rem,7vw,6.5rem)]">{next.title}</p>
          </div>
        </Link>
      )}

      <InquiryBand eyebrow="Like what you see?" title={<>Let’s make <em>yours.</em></>} />
    </>
  )
}
