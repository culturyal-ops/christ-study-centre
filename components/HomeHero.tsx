import Link from 'next/link'
import Image from 'next/image'

interface HomeHeroProps {
  image: string
  imageAlt: string
}

export default function HomeHero({ image, imageAlt }: HomeHeroProps) {
  return (
    <section className="home-hero">
      {/* ── Left panel — dark, typographic ── */}
      <div className="home-hero-left">
        {/* Vertical rule + eyebrow */}
        <div className="home-hero-eyebrow">
          <span className="home-hero-rule" aria-hidden="true" />
          Grades III – XII &nbsp;·&nbsp; CBSE &nbsp;·&nbsp; ICSE &nbsp;·&nbsp; SCERT
        </div>

        <h1 className="home-hero-title">
          Where<br />
          Pala's<br />
          brightest<br />
          <em>prepare.</em>
        </h1>

        <p className="home-hero-sub">
          Twelve years of disciplined, personal coaching.
          Built for parents who want more than tuition.
        </p>

        <div className="home-hero-actions">
          <Link href="/contact" className="btn btn-solid">
            Enquire about admission →
          </Link>
          <Link href="/courses" className="home-hero-ghost">
            View courses
          </Link>
        </div>

        {/* Bottom meta row */}
        <div className="home-hero-meta">
          <div className="home-hero-meta-item">
            <span className="home-hero-meta-num">12+</span>
            <span className="home-hero-meta-lbl">years</span>
          </div>
          <div className="home-hero-meta-divider" aria-hidden="true" />
          <div className="home-hero-meta-item">
            <span className="home-hero-meta-num">500+</span>
            <span className="home-hero-meta-lbl">students</span>
          </div>
          <div className="home-hero-meta-divider" aria-hidden="true" />
          <div className="home-hero-meta-item">
            <span className="home-hero-meta-num">1:8</span>
            <span className="home-hero-meta-lbl">ratio</span>
          </div>
        </div>
      </div>

      {/* ── Right panel — photo ── */}
      <div className="home-hero-right">
        <div className="home-hero-photo">
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
          />
          {/* Subtle gold border inset */}
          <div className="home-hero-photo-frame" aria-hidden="true" />
        </div>

        {/* Floating badge */}
        <div className="home-hero-badge">
          <span className="home-hero-badge-year">Est.</span>
          <span className="home-hero-badge-num">2013</span>
          <span className="home-hero-badge-loc">Pala, Kerala</span>
        </div>
      </div>
    </section>
  )
}
