import type { Config } from 'tailwindcss'

// Light, gallery-white palette. "night" and "cream" are the fixed dark and light
// used on top of photographs. "paper" is the page background and "ink" the text
// colour, so swapping these two values re-themes the whole site.
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#fbfaf8',
        'paper-deep': '#f2efe9',
        ink: '#151515',
        night: '#101010',
        cream: '#fbfaf8',
        accent: '#8c7350',
      },
      fontFamily: {
        display: ['var(--font-serif)', 'Georgia', 'serif'],
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
