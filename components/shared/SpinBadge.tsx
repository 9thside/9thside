/** Circular spinning text badge. */
export function SpinBadge({ text, className }: { text: string; className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      <defs>
        <path id="spin-badge-path" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
      </defs>
      <g className="spin-slow" style={{ transformOrigin: '100px 100px' }}>
        <text className="fill-current font-body text-[15px] font-medium uppercase" style={{ letterSpacing: '0.2em' }}>
          <textPath href="#spin-badge-path">{text}</textPath>
        </text>
      </g>
      <polygon points="100,78 80,112 120,112" className="fill-accent" />
    </svg>
  )
}
