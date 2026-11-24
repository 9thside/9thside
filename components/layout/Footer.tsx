import Link from 'next/link'
import { navLinks, site } from '@/lib/site'

export function Footer() {
  const year = new Date().getFullYear()
  const links = [
    ...navLinks,
    { href: '/contact', label: 'Inquire' },
    ...(site.instagram ? [{ href: `https://instagram.com/${site.instagram}`, label: 'Instagram' }] : []),
    ...(site.clientGalleries ? [{ href: site.clientGalleries, label: 'Client galleries' }] : []),
  ]

  return (
    <footer className="overflow-hidden bg-paper text-cream">
      <div className="shell flex flex-col gap-10 pb-6 pt-16 md:flex-row md:items-end md:justify-between">
        <p className="statement max-w-sm text-3xl italic text-cream/80">Photographs for the people and days that matter.</p>
        <ul className="flex flex-wrap gap-x-8 gap-y-3">
          {links.map((l) => (
            <li key={l.href}>
              {l.href.startsWith('http') ? (
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="eyebrow text-cream/60 transition-colors hover:text-accent">
                  {l.label}
                </a>
              ) : (
                <Link href={l.href} className="eyebrow text-cream/60 transition-colors hover:text-accent">
                  {l.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>

      <Link href="/" aria-label="9thside — home" className="display block select-none text-center text-[29.5vw] leading-[0.78] transition-colors duration-500 hover:text-accent">
        9thside
      </Link>

      <div className="shell flex flex-col gap-2 border-t border-cream/10 py-6 text-xs text-cream/40 sm:flex-row sm:justify-between">
        <p>
          © {year} {site.name}. All photographs by {site.founder}.
        </p>
        <a href={`mailto:${site.email}`} className="transition-colors hover:text-cream">
          {site.email}
        </a>
        <p>{site.location}</p>
      </div>
    </footer>
  )
}
