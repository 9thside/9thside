import type { MetadataRoute } from 'next'
import { albums } from '@/lib/albums'
import { site } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ['', '/portfolio', '/weddings', '/services', '/about', '/contact']
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, priority: p === '' ? 1 : 0.8 })),
    ...albums.map((a) => ({ url: `${site.url}/portfolio/${a.slug}`, priority: 0.7 })),
  ]
}
