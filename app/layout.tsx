import type { Metadata } from 'next'
import { Cormorant, Inter } from 'next/font/google'
import './globals.css'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { SmoothScroll } from '@/components/shared/SmoothScroll'
import { CursorFollower } from '@/components/ui/CursorFollower'
import { ScrollProgress } from '@/components/shared/ScrollProgress'

const cormorant = Cormorant({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: '9thside — Digital & Visual Experiences',
    template: '%s — 9thside',
  },
  description:
    'Premium digital and visual experiences across web design & development, photography, film, and brand. Founded by Nabeel Rushdi.',
  openGraph: {
    title: '9thside',
    description: 'Premium digital and visual experiences.',
    type: 'website',
    siteName: '9thside',
  },
  twitter: {
    card: 'summary_large_image',
    title: '9thside',
    description: 'Premium digital and visual experiences.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        <CursorFollower />
        <ScrollProgress />
        <SmoothScroll>
          <Nav />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  )
}
