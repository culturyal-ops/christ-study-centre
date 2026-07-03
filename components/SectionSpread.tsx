import type { ReactNode } from 'react'

interface SectionSpreadProps {
  index: string
  category: string
  title: string
  lede?: string
  description?: string
  dark?: boolean
  id?: string
  className?: string
}

export default function SectionSpread({
  index,
  category,
  title,
  lede,
  description,
  dark = false,
  className = '',
}: SectionSpreadProps) {
  return (
    <header
      className={`spread-header animate-fade-in ${dark ? 'spread-header-dark' : ''} ${className}`}
    >
      <div className="spread-rail">
        <span className="spread-index">{index}</span>
        <span className="spread-label">
          {category} / {index}
        </span>
      </div>
      <div className="spread-main">
        <h2 className="spread-title">{title}</h2>
        {lede && <p className="spread-lede">{lede}</p>}
      </div>
      {description && (
        <div className="spread-aside">
          <p>{description}</p>
        </div>
      )}
    </header>
  )
}

export function SpreadSection({
  index,
  category,
  title,
  lede,
  description,
  dark = false,
  id,
  children,
  alt = false,
}: SectionSpreadProps & { children: ReactNode; alt?: boolean }) {
  return (
    <section
      id={id}
      className={`spread-section ${dark ? 'panel-dark' : ''} ${alt && !dark ? 'spread-section-alt' : ''}`}
    >
      <SectionSpread
        index={index}
        category={category}
        title={title}
        lede={lede}
        description={description}
        dark={dark}
      />
      {children}
    </section>
  )
}
