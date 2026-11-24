import Image from 'next/image'
import Link from 'next/link'
import { navLinks, site } from '@/lib/site'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-cream/10 bg-night text-cream">
      <div className="shell grid gap-14 py-20 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Image src="/media/logo-white-full-trim.png" alt="9thside" width={900} height={683} className="h-16 w-auto" />
          <p className="mt-8 max-w-xs font-display text-2xl font-light italic leading-snug text-cream/80">
            Photographs for the people and days that matter.
          </p>
        </div>

        <div>
          <p className="eyebrow text-cream/40">Explore</p>
          <ul className="mt-6 space-y-3 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-cream/75 transition-colors hover:text-cream">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className="text-cream/75 transition-colors hover:text-cream">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-cream/40">Inquiries</p>
          <ul className="mt-6 space-y-3 text-sm text-cream/75">
            <li>
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-cream">
                {site.email}
              </a>
            </li>
            {site.instagram && (
              <li>
                <a
                  href={`https://instagram.com/${site.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-cream"
                >
                  Instagram
                </a>
              </li>
            )}
            {site.clientGalleries && (
              <li>
                <a
                  href={site.clientGalleries}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-cream"
                >
                  Client galleries
                </a>
              </li>
            )}
          </ul>
        </div>

        <div>
          <p className="eyebrow text-cream/40">Based in</p>
          <p className="mt-6 text-sm leading-relaxed text-cream/75">
            {site.location}
            <br />
            Available for travel
          </p>
        </div>
      </div>

      <div className="shell flex flex-col gap-2 border-t border-cream/10 py-7 text-xs text-cream/40 sm:flex-row sm:justify-between">
        <p>
          © {year} {site.name}. All photographs by {site.founder}.
        </p>
        <p>Toronto, Canada</p>
      </div>
    </footer>
  )
}
