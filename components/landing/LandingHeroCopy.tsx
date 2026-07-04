import Link from 'next/link'

export default function LandingHeroCopy() {
  return (
    <div className="csc-landing__hero-copy">
      <p className="csc-landing__eyebrow" data-hero-fade>
        Admissions open 2026 to 2027
      </p>

      <h1 className="csc-landing__hero-title">
        <span className="csc-split-line">
          <span className="csc-split-inner">Save time and stress</span>
        </span>
        <span className="csc-split-line">
          <span className="csc-split-inner">
            on every{' '}
            <span className="csc-scribble-wrap">
              board exam
              <svg
                className="csc-scribble"
                viewBox="0 0 180 32"
                fill="none"
                aria-hidden="true"
                preserveAspectRatio="none"
              >
                <path
                  className="csc-scribble-path"
                  d="M2 24 C40 30, 80 18, 120 26 C140 30, 160 22, 178 18"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </span>
        </span>
      </h1>

      <p className="csc-landing__hero-lead" data-hero-fade>
        Weekly tests, chapter tracking and monthly reports for CBSE, ICSE and SCERT
        students in Pala. Grades 3 to 12.
      </p>

      <div className="csc-landing__hero-actions" data-hero-fade>
        <Link href="/contact" className="csc-landing__hero-cta">
          Book a counselling call
          <span className="csc-landing__hero-cta-icon" aria-hidden="true">
            ↗
          </span>
        </Link>

        <Link href="/login" className="csc-landing__hero-portal csc-landing__hero-portal--highlight">
          <span className="csc-landing__hero-portal-badge">Already enrolled?</span>
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
        </Link>
      </div>
    </div>
  )
}
