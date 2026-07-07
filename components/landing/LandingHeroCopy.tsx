import Link from 'next/link'
import FindYourBatch from '@/components/landing/FindYourBatch'
import HeroHeadline from '@/components/landing/HeroHeadline'
import MagneticHeroCta from '@/components/landing/MagneticHeroCta'
export default function LandingHeroCopy() {
  return (
    <div className="csc-landing__hero-copy">
      <p className="csc-landing__eyebrow" data-hero-fade>
        Admissions open 2026 to 2027
      </p>

      <HeroHeadline
        lines={[
          ['Save', 'time', 'and', 'stress'],
          ['on', 'every'],
        ]}
      />
      <p className="csc-landing__hero-lead" data-hero-fade>
        Weekly tests, chapter tracking and monthly reports for CBSE, ICSE and SCERT
        students in Pala. Grades 3 to 12.
      </p>

      <div className="csc-landing__hero-actions" data-hero-fade>
        <MagneticHeroCta href="/contact">
          Book a counselling call
          <span className="csc-landing__hero-cta-icon" aria-hidden="true">
            ↗
          </span>
        </MagneticHeroCta>
        <Link href="/login" className="csc-landing__hero-portal csc-landing__hero-portal--highlight">
          <span className="csc-landing__hero-portal-head">
            <span className="csc-landing__hero-portal-badge">Already enrolled?</span>
          </span>
          <span className="csc-landing__hero-portal-row">
            <span className="csc-landing__hero-portal-icon" aria-hidden="true">
              ◉
            </span>
            <span className="csc-landing__hero-portal-body">
              <span className="csc-landing__hero-portal-label">Student portal</span>
              <span className="csc-landing__hero-portal-meta">
                Marks, attendance &amp; fee status
              </span>
            </span>
            <span className="csc-landing__hero-portal-arrow" aria-hidden="true">
              →
            </span>
          </span>
        </Link>

        <FindYourBatch />
      </div>
    </div>
  )
}
