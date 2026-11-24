'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { site, verticals } from '@/lib/site'

const types = [...verticals.map((v) => v.title), 'Something else']
const field =
  'w-full border-0 border-b border-ink/25 bg-transparent px-0 py-3 font-display text-2xl font-light text-ink outline-none transition-colors placeholder:text-ink/25 focus:border-ink focus:ring-0'
const label = 'eyebrow block text-ink/45'

export function InquiryForm() {
  const requested = useSearchParams().get('type') ?? ''
  const initialType = (requested && types.find((t) => t.toLowerCase().startsWith(requested.toLowerCase()))) || types[0]
  const [sent, setSent] = useState(false)

  // The form has no server behind it yet: it composes an email in the visitor's
  // own mail app, addressed to the studio, so nothing is ever silently dropped.
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>
    const lines = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      data.phone ? `Phone: ${data.phone}` : null,
      `Looking for: ${data.type}`,
      data.date ? `Date: ${data.date}` : null,
      data.location ? `Location / venue: ${data.location}` : null,
      '',
      data.message,
    ].filter((l) => l !== null)
    const subject = `${data.type} inquiry — ${data.name}${data.date ? ` (${data.date})` : ''}`
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`
    setSent(true)
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
      <label className="block">
        <span className={label}>Your name(s) *</span>
        <input name="name" required autoComplete="name" placeholder="Sara & Omar" className={field} />
      </label>
      <label className="block">
        <span className={label}>Email *</span>
        <input name="email" type="email" required autoComplete="email" placeholder="you@email.com" className={field} />
      </label>
      <label className="block">
        <span className={label}>Phone</span>
        <input name="phone" type="tel" autoComplete="tel" placeholder="Optional" className={field} />
      </label>
      <label className="block">
        <span className={label}>What are you planning? *</span>
        <select name="type" required defaultValue={initialType} className={field}>
          {types.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className={label}>Date</span>
        <input name="date" type="date" className={field} />
      </label>
      <label className="block">
        <span className={label}>Location or venue</span>
        <input name="location" placeholder="City, venue" className={field} />
      </label>
      <label className="block sm:col-span-2">
        <span className={label}>Tell me about it *</span>
        <textarea
          name="message"
          required
          rows={4}
          placeholder="The plans so far, what matters most to you, how you found me…"
          className={`${field} resize-none`}
        />
      </label>

      <div className="sm:col-span-2">
        <button type="submit" className="btn-dark">
          Send inquiry
        </button>
        <p className="mt-6 max-w-md text-sm leading-relaxed text-ink/55" role="status">
          {sent ? (
            <>
              Your email app should have opened with your inquiry ready to send. If it did not, write to me directly at{' '}
              <a href={`mailto:${site.email}`} className="text-ink underline underline-offset-4">
                {site.email}
              </a>
              .
            </>
          ) : (
            'This opens a ready-to-send email in your mail app. I reply personally, usually within a day or two.'
          )}
        </p>
      </div>
    </form>
  )
}
