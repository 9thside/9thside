'use client'

import { useState } from 'react'
import type { Album } from '@/lib/albums'
import { AlbumCard } from './AlbumCard'
import { cn } from '@/lib/utils'

interface AlbumBrowserProps {
  albums: Album[]
  categories: { id: string; label: string }[]
}

export function AlbumBrowser({ albums, categories }: AlbumBrowserProps) {
  const [active, setActive] = useState('all')
  const visible = active === 'all' ? albums : albums.filter((a) => a.category === active)

  return (
    <>
      {categories.length > 1 && (
        <div className="no-scrollbar -mx-5 mb-14 flex gap-8 overflow-x-auto border-b border-ink/15 px-5 sm:mx-0 sm:px-0">
          {[{ id: 'all', label: 'All work' }, ...categories].map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActive(c.id)}
              aria-pressed={active === c.id}
              className={cn(
                'eyebrow -mb-px shrink-0 border-b pb-4 transition-colors duration-300',
                active === c.id ? 'border-ink text-ink' : 'border-transparent text-ink/45 hover:text-ink'
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:gap-x-12 lg:gap-y-24">
        {visible.map((album, i) => (
          <AlbumCard
            key={album.slug}
            album={album}
            sizes="(min-width: 768px) 48vw, 100vw"
            // Stagger the second column down for an editorial rhythm.
            className={cn(i % 2 === 1 && 'md:mt-24')}
          />
        ))}
      </div>
    </>
  )
}
