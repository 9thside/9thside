import { Hero } from '@/components/home/Hero'
import { WorkPreview } from '@/components/home/WorkPreview'
import { ServicesGlance } from '@/components/home/ServicesGlance'
import { FounderNote } from '@/components/home/FounderNote'
import { Stats } from '@/components/home/Stats'

export default function HomePage() {
  return (
    <>
      <Hero />
      <WorkPreview />
      <ServicesGlance />
      <FounderNote />
      <Stats />
    </>
  )
}
