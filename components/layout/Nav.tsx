'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { navLinks, site } from '@/lib/site'
import { EASE_EXPO } from '@/lib/motion'
import { lockScroll } from '@/components/shared/SmoothScroll'
import { cn } from '@/lib/utils'

export function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Pages that open on a full-bleed photograph get a white nav until you scroll.
  const overPhoto = pathname === '/' || pathname === '/weddings' || pathname.startsWith('/portfolio/')
  const solid = scrolled && !open
  const light = overPhoto && !scrolled && !open

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    lockScroll(open)
    return () => lockScroll(false)
  }, [open])

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,color] duration-500',
          light ? 'text-cream' : 'text-ink',
          solid ? 'border-ink/10 bg-paper/90 backdrop-blur-md' : 'border-transparent'
        )}
      >
        <div className={cn('shell flex items-center justify-between transition-[height] duration-500', solid ? 'h-16 md:h-20' : 'h-20 md:h-24')}>
          <Link href="/" aria-label="9thside — home" className="block">
            <Image
              src={light ? '/media/logo-white-full-trim.png' : '/media/logo-black-full-trim.png'}
              alt="9thside"
              width={900}
              height={683}
              priority
              className="h-10 w-auto md:h-12"
            />
          </Link>

          <nav className="hidden items-center gap-10 md:flex" aria-label="Main">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'eyebrow relative py-2 transition-opacity duration-300 hover:opacity-100',
                  pathname.startsWith(link.href) ? 'opacity-100' : 'opacity-70'
                )}
              >
                {link.label}
                {pathname.startsWith(link.href) && (
                  <span className="absolute -bottom-0.5 left-0 h-px w-full bg-current" />
                )}
              </Link>
            ))}
            <Link
              href="/contact"
              className={cn(
                'eyebrow border px-5 py-3 transition-colors duration-500',
                light ? 'border-cream/60 hover:bg-cream hover:text-night' : 'border-ink/30 hover:bg-ink hover:text-paper'
              )}
            >
              Enquire
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="eyebrow -mr-2 p-2 md:hidden"
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-between bg-paper px-6 pb-10 pt-28 text-ink md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {[...navLinks, { href: '/contact', label: 'Enquire' }].map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: EASE_EXPO, delay: 0.05 + i * 0.06 }}
                >
                  <Link href={link.href} className="display block py-2 text-[2.75rem]">
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="space-y-2 text-sm text-ink/55">
              <a href={`mailto:${site.email}`} className="block text-ink">
                {site.email}
              </a>
              <p>{site.location}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
