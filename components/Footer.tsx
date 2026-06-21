import Link from 'next/link'
import { Phone, MapPin, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-forest text-bone border-t border-brass/20">
      <div className="container section-spacing">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="h3 mb-4">Christ Study Centre</h3>
            <p className="text-sm text-bone/60 leading-relaxed mb-4">
              CBSE, ICSE & SCERT coaching.<br />
              Grades III–XII. Est. 2013.
            </p>
            <div className="rule-oxblood"></div>
          </div>

          {/* Links */}
          <div>
            <h4 className="eyebrow mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About' },
                { href: '/courses', label: 'Courses' },
                { href: '/contact', label: 'Contact' },
                { href: '/login', label: 'Portal' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-bone/60 hover:text-brass transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="eyebrow mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-bone/60">
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5 text-brass" />
                <span>52A, RV Road, Njondimakkal<br />Pala 686575, Kerala</span>
              </li>
              <li>
                <a href="tel:+919747110790" className="flex gap-3 hover:text-brass transition-colors">
                  <Phone className="w-4 h-4 flex-shrink-0 text-brass" />
                  +91 9747 110 790
                </a>
              </li>
              <li>
                <a href="mailto:christstudycentrepala@gmail.com" className="flex gap-3 hover:text-brass transition-colors">
                  <Mail className="w-4 h-4 flex-shrink-0 text-brass" />
                  christstudycentrepala@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="gilt-rule mb-8"></div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-bone/40 font-mono">
          <p>© {new Date().getFullYear()} Christ Study Centre</p>
          <p>www.christstudycentre.in</p>
        </div>
      </div>
    </footer>
  )
}
