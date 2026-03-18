import type { Variants, Transition } from 'framer-motion'

export const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1]
export const EASE_SMOOTH: [number, number, number, number] = [0.4, 0, 0.2, 1]
export const EASE_IN: [number, number, number, number] = [0.4, 0, 1, 1]

export const DURATION = {
  fast: 0.3,
  base: 0.55,
  slow: 0.8,
  xl: 1.1,
  xxl: 1.5,
}

export const transition = (duration = DURATION.slow, delay = 0): Transition => ({
  duration,
  ease: EASE_EXPO,
  delay,
})

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE_EXPO, delay },
  }),
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: DURATION.base, ease: EASE_SMOOTH, delay },
  }),
}

export const clipRevealUp: Variants = {
  hidden: { clipPath: 'inset(0 0 100% 0)' },
  visible: (delay = 0) => ({
    clipPath: 'inset(0 0 0% 0)',
    transition: { duration: DURATION.xl, ease: EASE_EXPO, delay },
  }),
}

export const scaleReveal: Variants = {
  hidden: { clipPath: 'inset(0 0 100% 0)', scale: 1.06 },
  visible: (delay = 0) => ({
    clipPath: 'inset(0 0 0% 0)',
    scale: 1,
    transition: { duration: DURATION.xxl, ease: EASE_EXPO, delay },
  }),
}

export const wordReveal: Variants = {
  hidden: { y: '108%', opacity: 0 },
  visible: (delay = 0) => ({
    y: '0%',
    opacity: 1,
    transition: { duration: DURATION.slow, ease: EASE_EXPO, delay },
  }),
}

export const staggerContainer = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren, delayChildren },
  },
})

export const slideInLeft: Variants = {
  hidden: { x: -48, opacity: 0 },
  visible: (delay = 0) => ({
    x: 0,
    opacity: 1,
    transition: { duration: DURATION.slow, ease: EASE_EXPO, delay },
  }),
}

export const navItem: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE_EXPO, delay: i * 0.06 },
  }),
}
