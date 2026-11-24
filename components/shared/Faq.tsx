export interface FaqItem {
  q: string
  a: string
}

/** Accessible accordion built on native <details>. */
export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="border-t border-ink/15">
      {items.map((item) => (
        <details key={item.q} className="group border-b border-ink/15">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-8 py-7 [&::-webkit-details-marker]:hidden">
            <span className="font-display text-2xl font-light md:text-3xl">{item.q}</span>
            <span aria-hidden className="text-2xl font-light transition-transform duration-300 group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="prose-body max-w-2xl pb-8 text-ink/65">{item.a}</p>
        </details>
      ))}
    </div>
  )
}
