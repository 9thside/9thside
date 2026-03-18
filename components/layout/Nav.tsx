'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { cn } from '@/lib/utils'
import { EASE_EXPO, EASE_IN, DURATION } from '@/lib/motion'
import { LogoMark } from '@/components/ui/Logo'

const navLinks = [
  { href: '/work', label: 'Work' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

const mobileMenuVariants: Variants = {
  hidden: { opacity: 0, clipPath: 'inset(0 0 100% 0)' },
  visible: {
    opacity: 1,
    clipPath: 'inset(0 0 0% 0)',
    transition: { duration: 0.55, ease: EASE_EXPO },
  },
  exit: {
    opacity: 0,
    clipPath: 'inset(0 0 100% 0)',
    transition: { duration: 0.45, ease: EASE_IN },
  },
}

const mobileLinkVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE_EXPO, delay: 0.1 + i * 0.07 },
  }),
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <>
      <motion.nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'border-b border-[var(--border)]'
            : 'border-b border-transparent'
        )}
        style={{
          backgroundColor: scrolled ? 'rgba(8,8,8,0.94)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        }}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DURATION.base, ease: EASE_EXPO, delay: 0.1 }}
      >
        <div className="max-w-[1320px] mx-auto px-6 md:px-10 h-[68px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity duration-300 flex-shrink-0 group">
            <LogoMark size={26} className="text-[var(--text-primary)] transition-colors duration-300" />
            <span className="font-display italic text-[1.25rem] font-light text-[var(--text-primary)] tracking-tight leading-none">
              9thside
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'font-body text-[11px] uppercase tracking-[0.18em] transition-colors duration-300',
                  pathname === link.href || pathname.startsWith(link.href + '/')
                    ? 'text-[var(--text-primary)]'
                    : 'text-[rgba(240,237,232,0.7)] hover:text-[var(--text-primary)]'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center font-body text-[11px] uppercase tracking-[0.18em] border border-[var(--accent)] text-[var(--accent)] px-4 py-2 transition-all duration-300 hover:bg-[var(--accent-muted)]"
            >
              Start a Project
            </Link>

            {/* Hamburger */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px]"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <motion.span
                className="block w-6 h-[1.5px] bg-[var(--text-primary)] origin-center"
                animate={menuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: EASE_EXPO }}
              />
              <motion.span
                className="block w-6 h-[1.5px] bg-[var(--text-primary)] origin-center"
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block w-6 h-[1.5px] bg-[var(--text-primary)] origin-center"
                animate={menuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: EASE_EXPO }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-between px-6 pt-24 pb-10"
            style={{ backgroundColor: 'var(--bg)' }}
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Mobile menu logo */}
            <div className="absolute top-5 left-6 flex items-center gap-2.5">
              <LogoMark size={22} className="text-[var(--text-primary)]" />
              <span className="font-display italic text-[1.1rem] font-light text-[var(--text-primary)] tracking-tight leading-none">
                9thside
              </span>
            </div>

            {/* Nav Links */}
            <div className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  custom={i}
                  variants={mobileLinkVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link
                    href={link.href}
                    className={cn(
                      'block font-display font-light text-[3rem] leading-[1.15] tracking-tight py-3 border-b border-[var(--border)] transition-colors duration-300',
                      pathname === link.href
                        ? 'text-[var(--text-primary)]'
                        : 'text-[rgba(240,237,232,0.5)] hover:text-[var(--text-primary)]'
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.base, ease: EASE_EXPO, delay: 0.4 }}
              className="flex flex-col gap-4"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center font-body text-[11px] uppercase tracking-[0.18em] border border-[var(--accent)] text-[var(--accent)] px-6 py-3.5 w-full transition-all duration-300 hover:bg-[var(--accent-muted)]"
              >
                Start a Project
              </Link>
              <p className="font-body text-[11px] tracking-[0.1em] text-center" style={{ color: 'var(--text-secondary)' }}>
                hello@9thside.com
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
