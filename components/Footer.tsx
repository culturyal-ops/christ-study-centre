import Link from 'next/link'
import { Phone, MapPin, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="navy-bg text-white">
      <div className="container section-spacing">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="serif text-2xl font-semibold mb-4">Christ Study Centre</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Quality tuition for CBSE, ICSE & SCERT students.<br />
              Grades III–XII. 12 years of excellence.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About' },
                { href: '/courses', label: 'Courses' },
                { href: '/contact', label: 'Contact' },
                { href: '/login', label: 'Portal' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>52A, RV Road, Njondimakkal<br />Pala 686575, Kerala</span>
              </li>
              <li>
                <a href="tel:+919747110790" className="flex gap-3 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  +91 9747 110 790
                </a>
              </li>
              <li>
                <a href="mailto:christstudycentrepala@gmail.com" className="flex gap-3 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  christstudycentrepala@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="divider mb-8"></div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Christ Study Centre. All rights reserved.</p>
          <p>www.christstudycentre.in</p>
        </div>
      </div>
    </footer>
  )
}
