import type { Metadata } from 'next'
import { albums, albumCategories } from '@/lib/albums'
import { AlbumBrowser } from '@/components/portfolio/AlbumBrowser'
import { PageHeader } from '@/components/shared/PageHeader'
import { InquiryBand } from '@/components/shared/InquiryBand'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Wedding, couples, portrait and event photography albums by 9thside — Toronto and the GTA.',
  alternates: { canonical: '/portfolio' },
}

export default function PortfolioPage() {
  // Weddings lead; everything else follows in its existing (newest-first) order.
  const ordered = [...albums.filter((a) => a.category === 'wedding'), ...albums.filter((a) => a.category !== 'wedding')]
  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title={
          <>
            Selected <em>commissions.</em>
          </>
        }
        intro="Complete albums rather than a highlight reel — because a day is more than its ten best frames."
      />
      <section className="shell pb-28 md:pb-44">
        <AlbumBrowser albums={ordered} categories={albumCategories()} />
      </section>
      <InquiryBand />
    </>
  )
}
