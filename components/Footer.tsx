import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <div className="footer-masthead">
        <h2>Christ Study Centre</h2>
        <p className="masthead-sub">Tuition in Pala since 2013. CBSE, ICSE and SCERT.</p>
      </div>

      <div className="footer-grid">
        <div className="footer-brand">
          <div className="brand-text">Christ Study Centre</div>
          <p>
            CBSE, ICSE & SCERT coaching for grades III–XII.
            Twelve years of disciplined, structured tuition in Pala.
          </p>
        </div>

        <div className="footer-col">
          <h4>Navigate</h4>
          <Link href="/courses">Courses</Link>
          <Link href="/#results">Results</Link>
          <Link href="/#method">Method</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/login">Portal</Link>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <p>52A, RV Road, Njondimakkal<br />Pala 686575, Kerala</p>
          <a href="tel:+919747110790">+91 9747 110 790</a>
          <a href="mailto:christstudycentrepala@gmail.com">christstudycentrepala@gmail.com</a>
        </div>

        <div className="footer-col">
          <h4>Hours</h4>
          <p>Mon – Sat: 5:30 AM – 8:30 PM</p>
          <p>Sunday: Closed</p>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Christ Study Centre</span>
        <span>Pala, Kerala, India</span>
      </div>
    </footer>
  )
}
