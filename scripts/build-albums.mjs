// Scans public/photos/<album>/ and writes lib/data/albums.generated.json.
// Runs automatically before `npm run dev` and `npm run build`.
// Every folder in public/photos becomes an album page at /portfolio/<folder>.
import { readdir, readFile, writeFile, stat, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const photosDir = path.join(root, 'public', 'photos')
const outFile = path.join(root, 'lib', 'data', 'albums.generated.json')
const IMAGE = /\.(jpe?g|png|webp|avif)$/i
const CATEGORIES = {
  wedding: 'Weddings',
  couples: 'Couples & Engagements',
  portrait: 'Portraits',
  event: 'Events',
  commercial: 'Commercial & Brand',
  'real-estate': 'Real Estate',
}
const natural = new Intl.Collator('en', { numeric: true, sensitivity: 'base' })

const titleFromSlug = (slug) =>
  slug.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

async function readJson(file, fallback) {
  try {
    return JSON.parse(await readFile(file, 'utf8'))
  } catch (err) {
    if (err.code === 'ENOENT') return fallback
    throw new Error(`Could not parse ${path.relative(root, file)}: ${err.message}`)
  }
}

async function describePhoto(slug, file, title, index) {
  const abs = path.join(photosDir, slug, file)
  const image = sharp(abs)
  const meta = await image.metadata()
  // EXIF orientations 5-8 mean the stored pixels are rotated 90 degrees.
  const rotated = (meta.orientation ?? 1) >= 5
  const width = rotated ? meta.height : meta.width
  const height = rotated ? meta.width : meta.height
  const blur = await image.rotate().resize(16, 16, { fit: 'inside' }).webp({ quality: 40 }).toBuffer()
  return {
    file,
    src: `/photos/${slug}/${encodeURIComponent(file)}`,
    width,
    height,
    blur: `data:image/webp;base64,${blur.toString('base64')}`,
    alt: `${title} — photograph ${index + 1}`,
  }
}

async function buildAlbum(slug) {
  const dir = path.join(photosDir, slug)
  const meta = await readJson(path.join(dir, 'album.json'), {})
  const files = (await readdir(dir)).filter((f) => IMAGE.test(f)).sort(natural.compare)
  if (files.length === 0) return null

  const title = meta.title ?? titleFromSlug(slug)
  const category = meta.category in CATEGORIES ? meta.category : 'wedding'
  if (meta.category && !(meta.category in CATEGORIES)) {
    console.warn(`  ! ${slug}: unknown category "${meta.category}", using "wedding". Options: ${Object.keys(CATEGORIES).join(', ')}`)
  }
  const photos = await Promise.all(files.map((f, i) => describePhoto(slug, f, title, i)))
  const byFile = new Map(photos.map((p) => [p.file, p]))
  const pick = (name, fallback) => {
    if (name && !byFile.has(name)) console.warn(`  ! ${slug}: "${name}" not found in the album folder`)
    return byFile.get(name) ?? fallback
  }
  const cover = pick(meta.cover, photos.find((p) => p.width >= p.height) ?? photos[0])
  const hero = pick(meta.hero, cover)
  const featured = (meta.featured ?? []).map((f) => pick(f)).filter(Boolean)
  // "hide" keeps a file in the folder (e.g. a cover crop) out of the gallery grid.
  const hidden = new Set(meta.hide ?? [])

  return {
    slug,
    title,
    category,
    categoryLabel: CATEGORIES[category],
    location: meta.location ?? '',
    date: meta.date ?? '',
    description: meta.description ?? '',
    order: meta.order ?? 0,
    cover,
    hero,
    featured: featured.length ? featured : photos.slice(0, 8),
    photos: photos.filter((p) => !hidden.has(p.file)),
  }
}

async function main() {
  let slugs = []
  try {
    const entries = await readdir(photosDir)
    for (const e of entries) if ((await stat(path.join(photosDir, e))).isDirectory()) slugs.push(e)
  } catch (err) {
    if (err.code !== 'ENOENT') throw err
  }

  const albums = (await Promise.all(slugs.map(buildAlbum)))
    .filter(Boolean)
    .sort((a, b) => a.order - b.order || b.date.localeCompare(a.date) || a.title.localeCompare(b.title))

  const index = new Map()
  for (const a of albums) for (const p of [...a.photos, a.cover, a.hero]) index.set(`${a.slug}/${p.file}`, { ...p, album: a.slug, albumTitle: a.title })

  const highlights = await readJson(path.join(root, 'content', 'highlights.json'), {})
  const resolve = (list, label) =>
    (list ?? []).flatMap((ref) => {
      const found = index.get(ref)
      if (!found) console.warn(`  ! content/highlights.json (${label}): "${ref}" does not match any photo`)
      return found ? [found] : []
    })
  const tag = (a) => a.featured.map((p) => ({ ...p, album: a.slug, albumTitle: a.title }))
  let hero = resolve(highlights.hero, 'hero')
  let selected = resolve(highlights.selected, 'selected')
  if (!hero.length) hero = albums.map((a) => ({ ...a.hero, album: a.slug, albumTitle: a.title })).slice(0, 6)
  if (!selected.length) selected = albums.flatMap(tag).slice(0, 12)

  await mkdir(path.dirname(outFile), { recursive: true })
  await writeFile(outFile, JSON.stringify({ albums, highlights: { hero, selected } }, null, 1) + '\n')
  const count = albums.reduce((n, a) => n + a.photos.length, 0)
  console.log(`albums: ${albums.length} album(s), ${count} photo(s) -> ${path.relative(root, outFile)}`)
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
