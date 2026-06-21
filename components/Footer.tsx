import Link from 'next/link'
import { GraduationCap, Phone, MapPin, Mail, MessageCircle } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{ background: '#060F1E', borderTop: '1px solid rgba(201,168,76,0.15)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #C9A84C 0%, #E8C97A 100%)' }}
              >
                <GraduationCap className="w-5 h-5 text-[#0C1E3C]" />
              </div>
              <div>
                <div className="font-bold text-lg text-[#E8C97A] tracking-widest">CHRIST</div>
                <div className="text-xs text-white/40 uppercase tracking-widest -mt-1">Study Centre</div>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-5">
              Empowering students across Pala, Kerala with quality tuition for CBSE, ICSE &amp; SCERT boards since 2013.
            </p>
            <div className="divider-gold" />
            <p className="mt-4 text-[#C9A84C] text-xs uppercase tracking-widest font-semibold">
              12 Years of Excellence
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About Us' },
                { href: '/courses', label: 'Courses' },
                { href: '/contact', label: 'Contact' },
                { href: '/login', label: 'Student Portal' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-[#C9A84C] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-widest">Contact</h4>
            <ul className="space-y-4">
              <li className="flex gap-3 text-white/50 text-sm">
                <MapPin className="w-4 h-4 text-[#C9A84C] flex-shrink-0 mt-0.5" />
                <span>52A, RV Road, Njondimakkal<br />Pala 686575, Kerala, India</span>
              </li>
              <li>
                <a href="tel:+919747110790" className="flex gap-3 text-white/50 hover:text-[#C9A84C] text-sm transition-colors">
                  <Phone className="w-4 h-4 text-[#C9A84C] flex-shrink-0" />
                  +91 9747 110 790
                </a>
              </li>
              <li>
                <a href="tel:+919188650790" className="flex gap-3 text-white/50 hover:text-[#C9A84C] text-sm transition-colors">
                  <Phone className="w-4 h-4 text-[#C9A84C] flex-shrink-0" />
                  +91 9188 650 790
                </a>
              </li>
              <li>
                <a href="mailto:christstudycentrepala@gmail.com" className="flex gap-3 text-white/50 hover:text-[#C9A84C] text-sm transition-colors">
                  <Mail className="w-4 h-4 text-[#C9A84C] flex-shrink-0" />
                  christstudycentrepala@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919747110790"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 btn-gold text-xs px-4 py-2 rounded-lg mt-1"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="divider-gold mt-12" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mt-6 text-white/30 text-xs">
          <p>&copy; {new Date().getFullYear()} Christ Study Centre, Pala. All rights reserved.</p>
          <p>www.christstudycentre.in</p>
        </div>
      </div>
    </footer>
  )
}
