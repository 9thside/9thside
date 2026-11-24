// Turns a folder of full-size photos (e.g. a Pixieset "Download all" export)
// into a web-ready album.
//
//   npm run album -- "~/Downloads/Sara & Omar" --title "Sara & Omar" --category wedding --location "Toronto"
//
// Photos are resized to 2400px on the long edge and written to
// public/photos/<slug>/ alongside an album.json you can edit afterwards.
import { readdir, mkdir, writeFile, access } from 'node:fs/promises'
import path from 'node:path'
import os from 'node:os'
import { fileURLToPath } from 'node:url'
import { parseArgs } from 'node:util'
import sharp from 'sharp'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    title: { type: 'string' },
    category: { type: 'string', default: 'wedding' },
    location: { type: 'string', default: '' },
    date: { type: 'string', default: '' },
    slug: { type: 'string' },
    size: { type: 'string', default: '2400' },
  },
})

if (!positionals[0]) {
  console.error('Usage: npm run album -- <folder of photos> [--title "Name"] [--category wedding|couples|portrait|event|commercial|real-estate] [--location "City"] [--date YYYY-MM-DD]')
  process.exit(1)
}

const source = path.resolve(positionals[0].replace(/^~(?=$|\/)/, os.homedir()))
const title = values.title ?? path.basename(source)
const slug = values.slug ?? title.toLowerCase().normalize('NFKD').replace(/&/g, ' ').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
const dest = path.join(root, 'public', 'photos', slug)
const longEdge = Number(values.size)
const natural = new Intl.Collator('en', { numeric: true, sensitivity: 'base' })

async function walk(dir) {
  const out = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...(await walk(full)))
    else if (/\.(jpe?g|png|webp|tiff?|heic|avif)$/i.test(entry.name)) out.push(full)
  }
  return out
}

const files = (await walk(source)).sort(natural.compare)
if (!files.length) {
  console.error(`No photos found in ${source}`)
  process.exit(1)
}

const exists = await access(path.join(dest, 'album.json')).then(() => true, () => false)
await mkdir(dest, { recursive: true })
const pad = String(files.length).length < 2 ? 2 : String(files.length).length
let done = 0
for (const [i, file] of files.entries()) {
  const name = `${String(i + 1).padStart(pad, '0')}.jpg`
  await sharp(file)
    .rotate()
    .resize(longEdge, longEdge, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(path.join(dest, name))
  process.stdout.write(`\r${++done}/${files.length} photos`)
}

if (!exists) {
  const meta = { title, category: values.category, location: values.location, date: values.date, description: '', cover: '', hero: '', featured: [] }
  await writeFile(path.join(dest, 'album.json'), JSON.stringify(meta, null, 2) + '\n')
}
console.log(`\nAlbum ready: public/photos/${slug}/ -> /portfolio/${slug}`)
console.log('Edit album.json there to set the cover, hero and featured photos.')
