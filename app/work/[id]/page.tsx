import { projects } from '@/lib/data/projects'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const project = projects.find((p) => p.id === id)
  if (!project) return {}
  return { title: project.title }
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params
  const project = projects.find((p) => p.id === id)
  if (!project) notFound()

  return (
    <div className="min-h-screen bg-bg">
      {/* Hero */}
      <div className="pt-28">
        <div
          className="w-full"
          style={{
            aspectRatio: '21/9',
            background: project.gradient,
          }}
        />
      </div>

      <div className="max-w-[1320px] mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="max-w-3xl">
          <p className="font-body text-[10px] uppercase tracking-[0.2em] text-[var(--accent)] mb-4">
            {project.categoryLabel} · {project.year}
          </p>
          <h1 className="font-display font-light text-[clamp(2.5rem,5vw,5.5rem)] leading-[0.95] tracking-tight text-[var(--text-primary)] mb-8">
            {project.title}
          </h1>
          <p className="font-body text-[1.0625rem] text-[var(--text-secondary)] leading-[1.8] mb-12">
            {project.description}
          </p>

          {project.tags && (
            <div className="flex flex-wrap gap-2 mb-12">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-body text-[10px] uppercase tracking-[0.14em] border border-[var(--border)] text-[var(--text-muted)] px-3 py-1.5"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <Link
            href="/work"
            className="font-body text-[11px] uppercase tracking-[0.18em] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300 flex items-center gap-3 group"
          >
            <span className="block w-6 h-[1px] bg-[var(--text-secondary)] group-hover:w-10 transition-all duration-300" />
            Back to Work
          </Link>
        </div>
      </div>
    </div>
  )
}
