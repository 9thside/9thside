import { projects } from '@/lib/data/projects'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
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
  return { title: `${project.title} — 9thside` }
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params
  const project = projects.find((p) => p.id === id)
  if (!project) notFound()

  return (
    <div className="min-h-screen bg-bg">

      {/* Hero image */}
      <div className="pt-[68px]">
        <div className="relative w-full bg-[var(--surface-1)]" style={{ aspectRatio: '21/9' }}>
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent opacity-70" />
        </div>
      </div>

      {/* Title block */}
      <div className="max-w-[1320px] mx-auto px-6 md:px-10 pt-12 pb-16 md:pt-16 md:pb-20">
        <div className="max-w-3xl">
          <p className="font-body text-[10px] uppercase tracking-[0.2em] text-[var(--accent)] mb-4">
            {project.categoryLabel} · {project.year}
          </p>
          <h1 className="font-display font-light text-[clamp(2.5rem,5vw,5.5rem)] leading-[0.95] tracking-tight text-[var(--text-primary)] mb-6">
            {project.title}
          </h1>
          <p className="font-body text-[1.0625rem] text-[var(--text-secondary)] leading-[1.8] mb-8">
            {project.description}
          </p>

          {project.tags && (
            <div className="flex flex-wrap gap-2">
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
        </div>
      </div>

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <div className="max-w-[1320px] mx-auto px-6 md:px-10 pb-24">
          <div className="border-t border-[var(--border)] pt-12 md:pt-16 mb-10">
            <p className="font-body text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
              Gallery · {project.gallery.length} images
            </p>
          </div>

          {/* Editorial masonry-style grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-5 space-y-4 md:space-y-5">
            {project.gallery.map((src, i) => (
              <div key={i} className="break-inside-avoid">
                <div className="relative w-full overflow-hidden bg-[var(--surface-2)]">
                  <Image
                    src={src}
                    alt={`${project.title} — ${i + 1}`}
                    width={900}
                    height={0}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="w-full h-auto object-cover"
                    style={{ height: 'auto' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Back link */}
      <div className="max-w-[1320px] mx-auto px-6 md:px-10 pb-24 border-t border-[var(--border)] pt-10">
        <Link
          href="/work"
          className="font-body text-[11px] uppercase tracking-[0.18em] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300 flex items-center gap-3 group"
        >
          <span className="block w-6 h-[1px] bg-current group-hover:w-10 transition-all duration-300" />
          Back to Work
        </Link>
      </div>

    </div>
  )
}
