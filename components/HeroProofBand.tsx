'use client'

import { useEffect, useState, type CSSProperties } from 'react'

const items = [
  'Weekly Tests',
  'Chapter Tracking',
  'Parent Updates',
  'Board Revision',
]

export default function HeroProofBand() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <section
      className={`hero-proof-band ${ready ? 'hero-proof-band--ready' : ''}`}
      aria-label="What we track"
    >
      <div className="hero-proof-band__inner">
        {items.map((label, i) => (
          <span
            key={label}
            className="hero-proof-band__item"
            style={{ '--item-i': i } as CSSProperties}
          >
            {i > 0 && (
              <span className="hero-proof-band__sep" aria-hidden="true">
                /
              </span>
            )}
            {label}
          </span>
        ))}
      </div>
    </section>
  )
}
