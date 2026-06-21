import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div>
          <div className="brand-text" style={{ color: 'white' }}>Christ Study Centre</div>
          <p style={{ marginTop: '14px', fontSize: '13.5px', lineHeight: '1.7', color: 'rgba(255,255,255,0.6)', maxWidth: '260px' }}>
            Quality tuition for CBSE, ICSE & SCERT students. Grades III–XII. Twelve years of excellence in Pala.
          </p>
        </div>

        <div className="footer-col">
          <h4>Quick links</h4>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/courses">Courses</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <p>52A, RV Road, Njondimakkal<br />Pala 686575, Kerala</p>
          <a href="tel:+919747110790">+91 9747 110 790</a>
          <a href="mailto:christstudycentrepala@gmail.com">christstudycentrepala@gmail.com</a>
        </div>

        <div className="footer-col">
          <h4>Hours</h4>
          <p>Mon – Sat: 4:00 PM – 8:00 PM</p>
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
