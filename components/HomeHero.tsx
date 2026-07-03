import Link from 'next/link'
import Image from 'next/image'

interface HomeHeroProps {
  image: string
  imageAlt: string
}

export default function HomeHero({ image, imageAlt }: HomeHeroProps) {
  return (
    <section className="home-hero">
      <div className="home-hero-left">
        <div className="home-hero-top" data-scroll-reveal>
          <span className="home-hero-eyebrow">Academic Year / 2026–27</span>
          <span className="home-hero-admissions">Admissions Open</span>
        </div>

        <h1 className="home-hero-title">
          <span className="hero-line">
            <span className="hero-word">Results are</span>
          </span>
          <span className="hero-line">
            <span className="hero-word">structured.</span>
          </span>
        </h1>

        <p className="home-hero-tagline" data-scroll-reveal data-delay="0.15">
          where discipline becomes measurable progress
        </p>

        <p className="home-hero-sub" data-scroll-reveal data-delay="0.25">
          Structured tuition for students who need clarity, revision, and
          exam-ready confidence — not another coaching factory.
        </p>

        <div className="home-hero-actions" data-scroll-reveal data-delay="0.35">
          <Link href="/courses" className="btn btn-secondary btn-motion">
            View Courses →
          </Link>
          <Link href="/contact" className="btn btn-solid btn-motion">
            Enquire →
          </Link>
        </div>
      </div>

      <div className="home-hero-right">
        <div className="home-hero-photo fly-card" data-tilt data-float>
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            style={{ objectFit: 'cover', objectPosition: 'center 35%' }}
          />
          <div className="home-hero-photo-caption">
            <span>Christ Study Centre</span>
            <span>Pala · Est. 2013</span>
          </div>
        </div>
      </div>
    </section>
  )
}
