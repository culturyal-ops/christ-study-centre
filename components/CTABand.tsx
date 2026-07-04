import Link from 'next/link'
import type { ReactNode } from 'react'

interface CTABandProps {
  label?: string
  title: ReactNode
  description?: string
  primaryLabel: string
  primaryHref: string
  externalPrimary?: boolean
  secondaryLabel?: string
  secondaryHref?: string
  externalSecondary?: boolean
}

export default function CTABand({
  label = 'Admissions open 2026 to 2027',
  title,
  description,
  primaryLabel,
  primaryHref,
  externalPrimary,
  secondaryLabel,
  secondaryHref,
  externalSecondary,
}: CTABandProps) {
  return (
    <section className="csc-cta">
      <div className="site-container csc-cta__inner">
        {label && <p className="csc-section__label">{label}</p>}
        <h2 className="csc-cta__title">{title}</h2>
        {description && <p className="csc-cta__desc">{description}</p>}
        <div className="csc-cta__actions">
          {externalPrimary ? (
            <a
              href={primaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="csc-btn csc-btn--primary"
            >
              {primaryLabel}
            </a>
          ) : (
            <Link href={primaryHref} className="csc-btn csc-btn--primary">
              {primaryLabel}
            </Link>
          )}
          {secondaryHref && secondaryLabel &&
            (externalSecondary ? (
              <a
                href={secondaryHref}
                target="_blank"
                rel="noopener noreferrer"
                className="csc-btn csc-btn--text"
              >
                {secondaryLabel}
              </a>
            ) : (
              <Link href={secondaryHref} className="csc-btn csc-btn--text">
                {secondaryLabel}
              </Link>
            ))}
        </div>
      </div>
    </section>
  )
}
