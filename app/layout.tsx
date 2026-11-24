import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './globals.css'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { SmoothScroll } from '@/components/shared/SmoothScroll'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { site } from '@/lib/site'
import { highlights } from '@/lib/albums'

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

const body = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
  display: 'swap',
})

const title = `${site.name} — Wedding & Portrait Photographer, Toronto`
const ogImage = highlights.hero[0]

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s — ${site.name}` },
  description: site.description,
  alternates: { canonical: '/' },
  openGraph: {
    title,
    description: site.description,
    type: 'website',
    siteName: site.name,
    locale: 'en_CA',
    images: ogImage ? [{ url: ogImage.src, width: ogImage.width, height: ogImage.height }] : undefined,
  },
  twitter: { card: 'summary_large_image', title, description: site.description },
}

export const viewport: Viewport = { themeColor: '#100f0d' }

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${site.url}/#studio`,
  name: site.name,
  description: site.description,
  url: site.url,
  email: site.email,
  image: ogImage ? `${site.url}${ogImage.src}` : undefined,
  founder: { '@type': 'Person', name: site.founder },
  address: { '@type': 'PostalAddress', addressLocality: 'Toronto', addressRegion: 'ON', addressCountry: 'CA' },
  areaServed: ['Toronto', 'Mississauga', 'Greater Toronto Area', 'Ontario'],
  knowsAbout: ['Wedding photography', 'Engagement photography', 'Portrait photography', 'Event photography'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <SmoothScroll>
          <Nav />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
