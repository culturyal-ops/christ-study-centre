import Image from 'next/image'
import Link from 'next/link'

interface PageHeroProps {
  eyebrow: string
  title: React.ReactNode
  subtitle?: string
  image: string
  imageAlt: string
  /** 'full' = 92vh (homepage), 'mid' = 72vh (about/courses), 'short' = 62vh (contact) */
  size?: 'full' | 'mid' | 'short'
  cta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
}

const sizeMap = {
  full:  { height: '92vh', minHeight: '640px', maxHeight: '920px' },
  mid:   { height: '72vh', minHeight: '520px', maxHeight: '720px' },
  short: { height: '62vh', minHeight: '440px', maxHeight: '600px' },
}

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt,
  size = 'mid',
  cta,
  secondaryCta,
}: PageHeroProps) {
  const dim = sizeMap[size]

  return (
    <section
      className="hero"
      style={{ height: dim.height, minHeight: dim.minHeight, maxHeight: dim.maxHeight }}
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        className="hero-image"
        style={{ objectFit: 'cover', objectPosition: 'center' }}
      />
      <div className="hero-inner">
        <div className="hero-eyebrow">{eyebrow}</div>
        <h1 className="hero-title">{title}</h1>
        {subtitle && <p className="hero-sub">{subtitle}</p>}
        {(cta || secondaryCta) && (
          <div className="hero-actions">
            {cta && (
              <Link href={cta.href} className="btn btn-solid">
                {cta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link href={secondaryCta.href} className="hero-link">
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}
      </div>
      <svg
        className="hero-curve"
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M0,90 L0,40 Q720,-30 1440,40 L1440,90 Z" fill="#0A1628" />
      </svg>
    </section>
  )
}
