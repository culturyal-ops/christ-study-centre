import Image from 'next/image'
import type { ReactNode } from 'react'
import { delayAttr, revealAttr } from '@/lib/motion'

interface PageHeaderProps {
  category: string
  title: ReactNode
  lede?: string
  subtitle?: string
  image?: string
  imageAlt?: string
}

export default function PageHeader({
  category,
  title,
  lede,
  subtitle,
  image,
  imageAlt = '',
}: PageHeaderProps) {
  return (
    <section className="csc-site__hero">
      <div className={`site-container ${image ? 'csc-site__hero-grid' : ''}`}>
        <div className="csc-site__hero-copy">
          <p className="csc-site__hero-label" {...revealAttr('up', 0)}>
            {category}
          </p>
          <h1 className="csc-site__hero-title" {...revealAttr('up', 0.08)}>
            {title}
          </h1>
          {lede && (
            <p className="csc-site__hero-lede" {...revealAttr('up', 0.16)}>
              {lede}
            </p>
          )}
          {subtitle && (
            <p className="csc-site__hero-sub" {...revealAttr('up', 0.22)}>
              {subtitle}
            </p>
          )}
        </div>
        {image && (
          <div className="csc-site__hero-photo" data-scroll-reveal data-reveal="scale" {...delayAttr(1)}>
            <Image src={image} alt={imageAlt} fill sizes="(max-width: 900px) 100vw, 420px" priority />
          </div>
        )}
      </div>
    </section>
  )
}
