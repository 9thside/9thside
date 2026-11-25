import type { Config } from 'tailwindcss'

// Quiet, dark palette. "paper" is the page background and "ink" the text
// colour, so swapping these two values re-themes the whole site.
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#0a0a0a',
        'paper-deep': '#111110',
        ink: '#ede8df',
        night: '#0a0a0a',
        cream: '#ede8df',
        accent: '#c2a878',
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
