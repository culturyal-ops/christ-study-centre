import Link from 'next/link'
import BrandName from '@/components/BrandName'

export default function LandingFooter() {
  return (
    <footer className="csc-landing__footer">
      <div className="csc-landing__wrap csc-landing__footer-grid">
        <div data-reveal>
          <p className="csc-landing__footer-brand">
            <BrandName variant="footer" />
          </p>
          <p className="csc-landing__footer-text">
            52A, RV Road, Njondimakkal, Pala 686575
            <br />
            Mon to Sat, 4pm to 8pm
          </p>
        </div>
        <div className="csc-landing__footer-links" data-reveal>
          <Link href="/courses">Courses</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/login">Portal</Link>
        </div>
        <div className="csc-landing__footer-links" data-reveal>
          <a href="tel:+919747110790">+91 9747 110 790</a>
          <a href="mailto:christstudycentrepala@gmail.com">Email us</a>
          <a href="https://wa.me/919747110790" target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
        </div>
      </div>
      <div className="csc-landing__wrap csc-landing__footer-copy" data-reveal>
        © {new Date().getFullYear()} Christ Study Centre, Pala
      </div>
    </footer>
  )
}
