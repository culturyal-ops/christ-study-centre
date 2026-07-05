import Link from 'next/link'
import BrandName from '@/components/BrandName'
import SectionReveal from '@/components/motion/SectionReveal'
import { CENTRE_HOURS_FOOTER } from '@/lib/site-info'

const programmes = [
  'CBSE & ICSE coaching',
  'Weekly board-pattern tests',
  'Chapter-wise tracking',
  'Monthly parent reports',
  'Grades 3 to Plus Two',
  'Small batch coaching',
]

export default function LandingFooter() {
  const year = new Date().getFullYear()

  return (
    <SectionReveal as="footer" className="csc-landing__footer" disabled glow={false}>
      <div className="csc-landing__footer-watermark" aria-hidden="true">
        CSC
      </div>

      <div className="csc-landing__footer-main">
        <div className="csc-landing__wrap csc-landing__footer-grid">
          <div className="csc-landing__footer-col csc-landing__footer-col--brand">
            <p className="csc-landing__footer-brand">
              <BrandName variant="footer" />
            </p>
            <p className="csc-landing__footer-tagline">
              Structured coaching with progress families can see every week.
            </p>
            <p className="csc-landing__footer-meta">{CENTRE_HOURS_FOOTER}</p>
          </div>

          <div className="csc-landing__footer-col">
            <p className="csc-landing__footer-col-title">Navigate</p>
            <nav className="csc-landing__footer-links" aria-label="Footer">
              <Link href="/courses">Courses</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/login">Portal</Link>
            </nav>
          </div>

          <div className="csc-landing__footer-col">
            <p className="csc-landing__footer-col-title">Programmes</p>
            <ul className="csc-landing__footer-list">
              {programmes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="csc-landing__footer-col">
            <p className="csc-landing__footer-col-title">Contact</p>
            <div className="csc-landing__footer-links">
              <a href="tel:+919747110790">+91 9747 110 790</a>
              <a href="mailto:christstudycentrepala@gmail.com">christstudycentrepala@gmail.com</a>
              <p className="csc-landing__footer-address">
                52A, RV Road, Njondimakkal
                <br />
                Pala 686575
              </p>
              <a
                href="https://wa.me/919747110790"
                target="_blank"
                rel="noopener noreferrer"
                className="csc-landing__footer-wa"
              >
                WhatsApp us →
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="csc-landing__footer-bottom">
        <div className="csc-landing__wrap csc-landing__footer-bottom-inner">
          <p className="csc-landing__footer-bottom-copy">
            <span>© {year} Christ Study Centre. All rights reserved.</span>
            <span className="csc-landing__footer-credit">
              Made by{' '}
              <a href="https://revol-q.vercel.app" target="_blank" rel="noopener noreferrer">
                revolq
              </a>
            </span>
          </p>
        </div>
      </div>
    </SectionReveal>
  )
}
