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
  className = '',
}: SectionSpreadProps) {
  return (
    <header className={`csc-section__head ${className}`}>
      <p className="csc-section__label">
        {category} / {index}
      </p>
      <h2 className="csc-section__title">{title}</h2>
      {lede && <p className="csc-section__lede">{lede}</p>}
      {description && <p className="csc-section__desc">{description}</p>}
    </header>
  )
}

export function SpreadSection({
  index,
  category,
  title,
  lede,
  description,
  id,
  children,
  alt = false,
  className = '',
}: SectionSpreadProps & { children: ReactNode; alt?: boolean; className?: string }) {
  return (
    <section
      id={id}
      className={`csc-section spread-section ${alt ? 'csc-section--alt spread-section-alt' : ''} ${className}`}
    >
      <div className="site-container">
        <SectionSpread
          index={index}
          category={category}
          title={title}
          lede={lede}
          description={description}
        />
        {children}
      </div>
    </section>
  )
}
