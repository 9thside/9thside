import data from './data/albums.generated.json'

export interface Photo {
  file: string
  src: string
  width: number
  height: number
  blur: string
  alt: string
}

export interface HighlightPhoto extends Photo {
  album: string
  albumTitle: string
}

export interface Album {
  slug: string
  title: string
  category: string
  categoryLabel: string
  location: string
  date: string
  description: string
  cover: Photo
  hero: Photo
  featured: Photo[]
  photos: Photo[]
}

export const albums = data.albums as Album[]
export const highlights = data.highlights as { hero: HighlightPhoto[]; selected: HighlightPhoto[] }

export const getAlbum = (slug: string) => albums.find((a) => a.slug === slug)

export const albumYear = (album: Album) => album.date.slice(0, 4)

export const albumMeta = (album: Album) =>
  [album.categoryLabel, album.location, albumYear(album)].filter(Boolean).join('  ·  ')

/** Categories that currently have at least one album, in display order. */
export const albumCategories = () => {
  const seen = new Map<string, string>()
  const weddingsFirst = [...albums].sort((a, b) => Number(b.category === 'wedding') - Number(a.category === 'wedding'))
  for (const a of weddingsFirst) seen.set(a.category, a.categoryLabel)
  return [...seen].map(([id, label]) => ({ id, label }))
}
