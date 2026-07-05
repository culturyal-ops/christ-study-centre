import Image from 'next/image'
import Link from 'next/link'
import BrandName from '@/components/BrandName'
import LandingHeroCopy from '@/components/landing/LandingHeroCopy'
import LandingHeroVisual from '@/components/landing/LandingHeroVisual'
import { images } from '@/lib/images'

export default function LandingHero() {
  return (
    <section className="csc-landing__hero" id="hero">
      <div className="csc-landing__hero-bg" aria-hidden="true" />

      <div className="csc-landing__wrap csc-landing__hero-shell">
        <LandingHeroCopy />
        <LandingHeroVisual />
      </div>

      <div className="csc-landing__wrap csc-landing__deck">
        <article className="csc-landing__ui csc-landing__ui--left">
          <div className="csc-landing__ui-top">
            <span className="csc-landing__ui-label">Monthly report</span>
            <span className="csc-landing__ui-tag csc-landing__ui-tag--green">Ready</span>
          </div>
          <p className="csc-landing__ui-big" data-count="86" data-count-suffix="%">
            86%
          </p>
          <p className="csc-landing__ui-meta">Mathematics, Class 10</p>
          <div className="csc-landing__ui-bar">
            <i className="csc-landing__ui-bar-fill" />
          </div>
          <p className="csc-landing__ui-foot">Up 32 points since term start</p>
        </article>

        <article className="csc-landing__ui csc-landing__ui--center">
          <div className="csc-landing__ui-top">
            <span className="csc-landing__ui-label">
              <BrandName variant="hero" />
            </span>
            <span className="csc-landing__ui-tag csc-landing__ui-tag--blue">Live</span>
          </div>
          <h3 className="csc-landing__ui-heading">Finding your batch</h3>
          <p className="csc-landing__ui-scan">Checking subjects and timings</p>
          <div className="csc-landing__ring">
            <svg viewBox="0 0 88 88">
              <circle cx="44" cy="44" r="36" className="csc-landing__ring-track" />
              <circle cx="44" cy="44" r="36" className="csc-landing__ring-fill" />
            </svg>
            <span data-count="94" data-count-suffix="%">
              94%
            </span>
          </div>
          <div className="csc-landing__ui-photo">
            <Image src={images.heroCard} alt="" fill sizes="260px" />
          </div>
        </article>

        <article className="csc-landing__ui csc-landing__ui--glass">
          <p className="csc-landing__ui-label">Best improvement</p>
          <p
            className="csc-landing__ui-big csc-landing__ui-big--glass"
            data-count="32"
            data-count-prefix="+"
            data-count-suffix="%"
          >
            +32%
          </p>
          <p className="csc-landing__ui-meta">Physics, Class 12</p>
          <div className="csc-landing__ui-route">
            <span>48%</span>
            <svg viewBox="0 0 120 40" className="csc-landing__route-svg">
              <path
                className="csc-landing__route-path"
                d="M4 32 C40 8, 80 8, 116 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="4 6"
              />
            </svg>
            <span className="csc-landing__ui-route-end">79%</span>
          </div>
        </article>
      </div>
    </section>
  )
}
