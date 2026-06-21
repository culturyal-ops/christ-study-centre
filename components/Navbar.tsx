'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/courses', label: 'Courses' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav>
      <div className="brand">
        <svg className="crest" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="22.5" stroke="#E8E2D0" strokeWidth="1" />
          <path d="M24 9L29 19H38L31 26L34 37L24 30L14 37L17 26L10 19H19L24 9Z" stroke="#C9A84C" strokeWidth="1" fill="none" />
          <circle cx="24" cy="24" r="3" fill="#C9A84C" />
        </svg>
        <Link href="/" className="brand-text">
          Christ Study Centre
          <small>Pala · Kerala</small>
        </Link>
      </div>

      <div className="nav-links">
        {navLinks.map((link) => {
          const active = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={active ? 'active' : ''}
            >
              {link.label}
            </Link>
          )
        })}
      </div>

      <div className="nav-cta">
        <Link href="/login" className="btn">Portal</Link>
        <a
          href="https://wa.me/919747110790"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-solid"
        >
          Enquire
        </a>
      </div>
    </nav>
  )
}
