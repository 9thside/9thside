import { HeroFade, HeroTitle } from '@/components/home/HeroTitle'

interface PageHeaderProps {
  eyebrow: string
  title: React.ReactNode
  intro?: React.ReactNode
}

export function PageHeader({ eyebrow, title, intro }: PageHeaderProps) {
  return (
    <header className="shell pb-14 pt-36 text-center md:pb-20 md:pt-48">
      <HeroFade delay={0}>
        <p className="eyebrow text-accent">{eyebrow}</p>
      </HeroFade>
      <HeroTitle lines={[title]} className="display mx-auto mt-6 max-w-4xl text-[clamp(2.5rem,6.5vw,5.75rem)]" />
      {intro && (
        <HeroFade delay={0.4}>
          <p className="prose-body mx-auto mt-7 max-w-md text-ink/60">{intro}</p>
        </HeroFade>
      )}
    </header>
  )
}
