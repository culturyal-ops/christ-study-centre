import Image from 'next/image'
import Link from 'next/link'

interface PageHeroProps {
  eyebrow: string
  title: React.ReactNode
  subtitle?: string
  image: string
  imageAlt: string
  size?: 'full' | 'mid' | 'short'
  cta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
}

const sizeMap = {
  full: { height: '88vh', minHeight: '560px', maxHeight: '860px' },
  mid: { height: '68vh', minHeight: '480px', maxHeight: '680px' },
  short: { height: '58vh', minHeight: '400px', maxHeight: '560px' },
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
      className="hero hero-page"
      style={{ height: dim.height, minHeight: dim.minHeight, maxHeight: dim.maxHeight }}
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        className="hero-image"
        style={{ objectFit: 'cover', objectPosition: 'center 35%' }}
      />
      <div className="hero-inner">
        <div className="hero-eyebrow" data-scroll-reveal>
          {eyebrow}
        </div>
        <h1 className="hero-title" data-scroll-reveal data-delay="0.08">
          {title}
        </h1>
        {subtitle && (
          <p className="hero-sub" data-scroll-reveal data-delay="0.16">
            {subtitle}
          </p>
        )}
        {(cta || secondaryCta) && (
          <div className="hero-actions" data-scroll-reveal data-delay="0.24">
            {cta && (
              <Link href={cta.href} className="btn btn-solid btn-motion">
                {cta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link href={secondaryCta.href} className="btn btn-secondary btn-motion">
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
        <path d="M0,90 L0,40 Q720,-30 1440,40 L1440,90 Z" fill="var(--paper)" />
      </svg>
    </section>
  )
}
