'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

declare global {
  interface Window {
    __lenis?: Lenis
  }
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, wheelMultiplier: 0.95 })
    window.__lenis = lenis
    let rafId = requestAnimationFrame(function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    })
    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      window.__lenis = undefined
    }
  }, [])

  return <>{children}</>
}

/** Locks page scrolling while an overlay (menu, lightbox) is open. */
export function lockScroll(locked: boolean) {
  document.body.style.overflow = locked ? 'hidden' : ''
  if (locked) window.__lenis?.stop()
  else window.__lenis?.start()
}
