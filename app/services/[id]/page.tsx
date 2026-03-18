import { services } from '@/lib/data/services'
import { projects } from '@/lib/data/projects'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ServiceLandingPage } from '@/components/services/ServiceLandingPage'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return services.map((s) => ({ id: s.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const service = services.find((s) => s.id === id)
  if (!service) return {}
  return {
    title: service.title,
    description: service.description,
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { id } = await params
  const service = services.find((s) => s.id === id)
  if (!service) notFound()

  const relatedWork = projects.filter((p) => p.category === service.workCategory).slice(0, 3)

  return <ServiceLandingPage service={service} relatedWork={relatedWork} />
}
