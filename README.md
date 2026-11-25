# 9thside

The 9thside photography site — Next.js (App Router), Tailwind, deployed on Vercel.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Albums

Every folder in `public/photos/` is an album. It gets its own page at
`/portfolio/<folder-name>`, a card on the portfolio page, and shows up under its
category. There is nothing else to register.

### Add an album from a Pixieset export

1. In Pixieset, open the collection and use **Download → All photos** (originals or web size).
2. Unzip it, then run:

   ```bash
   npm run album -- "~/Downloads/Sara & Omar" --title "Sara & Omar" --category wedding --location "Toronto" --date 2025-08-16
   ```

   This resizes every photo to 2400px, writes them to `public/photos/sara-omar/`
   and creates an `album.json` there.
3. Commit and push. Vercel rebuilds and the album is live.

Categories: `wedding`, `couples`, `portrait`, `event`, `commercial`, `real-estate`.

### album.json

```json
{
  "title": "Sara & Omar",
  "category": "wedding",
  "location": "Toronto, Ontario",
  "date": "2025-08-16",
  "description": "A sentence or two shown at the top of the album.",
  "cover": "014.jpg",
  "hero": "032.jpg",
  "featured": ["032.jpg", "007.jpg", "051.jpg"],
  "hide": [],
  "order": 0
}
```

- `cover` — landscape photo used on cards and at the top of the album page.
- `hero` — portrait photo used where a tall crop is needed.
- `featured` — the album's best frames (used on the homepage feature).
- `hide` — files kept in the folder but left out of the gallery grid.
- `order` — lower numbers appear first; otherwise albums sort newest first.

All fields are optional; sensible defaults are used when they are missing.

### Choosing the homepage highlights

Edit `content/highlights.json`. Each entry is `"album-folder/filename"`:

- `hero` — the slideshow at the top of the homepage (portrait photos work best).
- `selected` — the "Favourite frames" strip.

The first album in the portfolio order is the homepage's "Featured story".

## Where things live

| What | Where |
| --- | --- |
| Email, Instagram handle, Pixieset link, service descriptions | `lib/site.ts` |
| Homepage highlight photos | `content/highlights.json` |
| Page copy | `app/**/page.tsx` |
| Colours and fonts | `tailwind.config.ts`, `app/globals.css`, `app/layout.tsx` |

`lib/data/albums.generated.json` is rebuilt automatically before `dev` and
`build` — do not edit it by hand.

## Contact form

The inquiry form currently opens a pre-filled email in the visitor's mail app
(there is no email service connected). To send inquiries straight to an inbox,
connect a form service such as Resend or Formspree in
`components/contact/InquiryForm.tsx`.
