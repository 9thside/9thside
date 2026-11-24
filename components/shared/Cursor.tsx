'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Custom cursor for mouse users. Any element with a `data-cursor="Label"`
 * attribute grows the dot into a labelled disc while hovered.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [label, setLabel] = useState('')
  const [hoverLink, setHoverLink] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 })

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    setEnabled(true)
    document.documentElement.classList.add('has-cursor')

    const read = (target: Element | null) => {
      setLabel(target?.closest<HTMLElement>('[data-cursor]')?.dataset.cursor ?? '')
      setHoverLink(Boolean(target?.closest('a, button, summary, select, input, textarea')))
    }
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      read(e.target instanceof Element ? e.target : null)
    }
    // The page can scroll underneath a stationary mouse, so re-check what is under it.
    const onScroll = () => read(document.elementFromPoint(x.get(), y.get()))
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('scroll', onScroll)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [x, y])

  if (!enabled) return null
  const size = label ? 92 : hoverLink ? 44 : 14

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[300] flex items-center justify-center rounded-full"
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
      animate={{
        width: size,
        height: size,
        backgroundColor: label ? '#ff4b1f' : hoverLink ? 'rgba(242,239,233,0)' : '#f2efe9',
        borderColor: hoverLink && !label ? 'rgba(242,239,233,0.9)' : 'rgba(242,239,233,0)',
      }}
      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
      initial={false}
    >
      <span className="eyebrow border-0 text-[10px] font-semibold text-night">{label}</span>
      <style>{`.has-cursor [aria-hidden].rounded-full{border-width:1px;border-style:solid}`}</style>
    </motion.div>
  )
}
