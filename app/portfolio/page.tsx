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
  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title={
          <>
            Stories, told in <em>full.</em>
          </>
        }
        intro="Complete albums rather than a highlight reel — because a day is more than its ten best frames."
      />
      <section className="shell pb-28 md:pb-44">
        <AlbumBrowser albums={albums} categories={albumCategories()} />
      </section>
      <InquiryBand />
    </>
  )
}
