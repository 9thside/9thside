import { Reveal } from './Reveal'

interface PageHeaderProps {
  eyebrow: string
  title: React.ReactNode
  intro?: React.ReactNode
}

export function PageHeader({ eyebrow, title, intro }: PageHeaderProps) {
  return (
    <header className="shell pb-16 pt-40 md:pb-24 md:pt-56">
      <Reveal>
        <p className="eyebrow text-accent">{eyebrow}</p>
        <h1 className="display mt-7 max-w-5xl text-[clamp(3rem,9vw,8.5rem)]">{title}</h1>
        {intro && <p className="prose-body mt-10 max-w-xl text-ink/65">{intro}</p>}
      </Reveal>
    </header>
  )
}
