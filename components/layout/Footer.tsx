import Link from 'next/link'

const footerNav = {
  Work: [
    { label: 'Web Design', href: '/work?filter=web' },
    { label: 'Photography', href: '/work?filter=photo' },
    { label: 'Film', href: '/work?filter=film' },
    { label: 'Weddings', href: '/work?filter=wedding' },
    { label: 'Commercial', href: '/work?filter=commercial' },
  ],
  Services: [
    { label: 'Web Development', href: '/services' },
    { label: 'Photography', href: '/services' },
    { label: 'Videography', href: '/services' },
    { label: 'Creative Direction', href: '/services' },
    { label: 'Real Estate', href: '/services' },
  ],
  Studio: [
    { label: 'About Nabeel', href: '/about' },
    { label: 'Selected Work', href: '/work' },
    { label: 'Contact', href: '/contact' },
  ],
} as const

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-bg">
      <div className="max-w-[1320px] mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 pb-12 md:pb-16 border-b border-[var(--border)]">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="font-display italic text-[1.75rem] font-light text-[var(--text-primary)] tracking-tight leading-none block mb-4 hover:opacity-75 transition-opacity duration-300"
            >
              9thside
            </Link>
            <p className="font-body text-sm text-[var(--text-secondary)] leading-relaxed mb-8 max-w-[280px]">
              Digital and visual experiences built with taste. Web, photography, film, and brand.
            </p>
            <div className="flex items-center gap-3 mb-8">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-md)] transition-all duration-300"
                aria-label="Instagram"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-md)] transition-all duration-300"
                aria-label="LinkedIn"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
            <a
              href="mailto:hello@9thside.com"
              className="font-body text-[11px] uppercase tracking-[0.18em] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-300"
            >
              hello@9thside.com
            </a>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-3 gap-8">
            {(Object.entries(footerNav) as [string, readonly { label: string; href: string }[]][]).map(([group, links]) => (
              <div key={group}>
                <p className="font-body text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-5">
                  {group}
                </p>
                <ul className="flex flex-col gap-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="font-body text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8">
          <p className="font-body text-[11px] text-[var(--text-muted)] tracking-[0.06em]">
            © 2026 9thside. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="font-body text-[11px] text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors duration-300 tracking-[0.06em]"
            >
              Privacy Policy
            </Link>
            <span className="text-[var(--text-muted)] text-[10px]">·</span>
            <p className="font-body text-[11px] text-[var(--text-muted)] tracking-[0.06em]">
              Toronto, Canada
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
