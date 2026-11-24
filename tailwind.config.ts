import type { Config } from 'tailwindcss'

// Dark, cinematic palette. "paper" is the page background and "ink" the text
// colour, so swapping these two values re-themes the whole site.
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#0b0b0c',
        'paper-deep': '#151516',
        ink: '#f2efe9',
        night: '#0b0b0c',
        cream: '#f2efe9',
        accent: '#ff4b1f',
      },
      fontFamily: {
        display: ['var(--font-serif)', 'Georgia', 'serif'],
        poster: ['var(--font-poster)', 'Impact', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}

export default config
