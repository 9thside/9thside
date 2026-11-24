import { HeroFade, HeroTitle } from '@/components/home/HeroTitle'

interface PageHeaderProps {
  eyebrow: string
  title: React.ReactNode
  intro?: React.ReactNode
}

export function PageHeader({ eyebrow, title, intro }: PageHeaderProps) {
  return (
    <header className="shell pb-16 pt-36 md:pb-24 md:pt-48">
      <HeroFade delay={0}>
        <p className="eyebrow text-accent">{eyebrow}</p>
      </HeroFade>
      <HeroTitle lines={[title]} className="display mt-6 text-[clamp(4.5rem,17vw,17rem)]" />
      {intro && (
        <HeroFade delay={0.5}>
          <p className="prose-body mt-8 max-w-xl text-ink/65">{intro}</p>
        </HeroFade>
      )}
    </header>
  )
}
