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
        <Link href="/" className="brand-text" style={{ display: 'flex', flexDirection: 'column' }}>
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
