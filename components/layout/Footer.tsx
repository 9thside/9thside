import Image from 'next/image'
import Link from 'next/link'
import { navLinks, site } from '@/lib/site'

export function Footer() {
  const year = new Date().getFullYear()
  const links = [
    ...navLinks,
    { href: '/contact', label: 'Enquire' },
    ...(site.instagram ? [{ href: `https://instagram.com/${site.instagram}`, label: 'Instagram' }] : []),
    ...(site.clientGalleries ? [{ href: site.clientGalleries, label: 'Client galleries' }] : []),
  ]

  return (
    <footer>
      <div className="rule" />
      <div className="shell flex flex-col items-center gap-10 py-16 text-center">
        <Link href="/" aria-label="9thside — home">
          <Image src="/media/logo-black-full-trim.png" alt="9thside" width={900} height={683} className="h-14 w-auto" />
        </Link>
        <ul className="flex flex-wrap justify-center gap-x-9 gap-y-4">
          {links.map((l) => (
            <li key={l.href}>
              {l.href.startsWith('http') ? (
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="eyebrow text-ink/55 transition-colors duration-500 hover:text-accent">
                  {l.label}
                </a>
              ) : (
                <Link href={l.href} className="eyebrow text-ink/55 transition-colors duration-500 hover:text-accent">
                  {l.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
        <p className="text-xs leading-relaxed text-ink/35">
          © {year} {site.name} · Photography by {site.founder} · {site.location}
        </p>
      </div>
    </footer>
  )
}
