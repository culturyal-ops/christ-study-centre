import type { ReactNode } from 'react'

interface PageSectionProps {
  id?: string
  index?: string
  category?: string
  title?: string
  lede?: string
  description?: string
  alt?: boolean
  children: ReactNode
}

export default function PageSection({
  id,
  index,
  category,
  title,
  lede,
  description,
  alt = false,
  children,
}: PageSectionProps) {
  const hasHead = category || title || lede || description

  return (
    <section
      id={id}
      className={`csc-section ${alt ? 'csc-section--alt' : ''}`}
    >
      <div className="site-container">
        {hasHead && (
          <header className="csc-section__head">
            {category && index && (
              <p className="csc-section__label">
                <span>{category}</span>
                <span className="csc-section__label-sep" aria-hidden="true">
                  /
                </span>
                <span>{index}</span>
              </p>
            )}
            {category && !index && (
              <p className="csc-section__label">{category}</p>
            )}
            {title && <h2 className="csc-section__title">{title}</h2>}
            {lede && <p className="csc-section__lede">{lede}</p>}
            {description && (
              <p className="csc-section__desc">{description}</p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}
