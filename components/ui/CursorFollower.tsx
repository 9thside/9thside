'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CursorFollower() {
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [isMobile, setIsMobile] = useState(true)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const springCfg = { damping: 28, stiffness: 280, mass: 0.6 }
  const ringX = useSpring(mouseX, springCfg)
  const ringY = useSpring(mouseY, springCfg)

  useEffect(() => {
    // Only on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return
    setIsMobile(false)

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const onOver = (e: MouseEvent) => {
      const el = e.target as Element
      setHovering(!!el.closest('a, button, [data-cursor="hover"]'))
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver)
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
    }
  }, [mouseX, mouseY, visible])

  if (isMobile) return null

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-[var(--accent)]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          width: hovering ? 6 : 5,
          height: hovering ? 6 : 5,
          opacity: visible ? 1 : 0,
          transition: 'width 0.2s ease, height 0.2s ease, opacity 0.3s ease',
        }}
      />
      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: hovering ? 48 : 32,
          height: hovering ? 48 : 32,
          opacity: visible ? (hovering ? 0.5 : 0.25) : 0,
          border: '1px solid var(--accent)',
          backgroundColor: hovering ? 'rgba(196,169,122,0.05)' : 'transparent',
          transition:
            'width 0.3s cubic-bezier(0.16,1,0.3,1), height 0.3s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease, background-color 0.3s ease',
        }}
      />
    </>
  )
}
