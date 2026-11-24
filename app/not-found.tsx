import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="shell flex min-h-screen flex-col items-start justify-center py-40">
      <p className="eyebrow text-accent">404</p>
      <h1 className="display mt-6 text-[clamp(4rem,13vw,12rem)]">
        This frame is <em>missing.</em>
      </h1>
      <Link href="/portfolio" className="btn-dark mt-12">
        Back to the portfolio
      </Link>
    </section>
  )
}
