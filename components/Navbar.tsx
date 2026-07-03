'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navLinks = [
  { href: '/courses', label: 'Courses' },
  { href: '/#results', label: 'Results' },
  { href: '/#faculty', label: 'Faculty' },
  { href: '/#batches', label: 'Batches' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <nav>
        <div className="brand">
          <svg className="crest" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="46" height="46" stroke="rgba(17,17,17,0.2)" strokeWidth="1" />
            <path d="M24 12L28 20H36L30 26L32 35L24 30L16 35L18 26L12 20H20L24 12Z" stroke="#681B22" strokeWidth="1" fill="none" />
          </svg>
          <Link href="/" className="brand-text">
            Christ Study Centre
            <small>Pala · Kerala</small>
          </Link>
        </div>

        <div className="nav-links">
          {navLinks.map((link) => {
            const isHash = link.href.includes('#')
            const active = !isHash && pathname === link.href
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
          <a
            href="https://wa.me/919747110790"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-solid"
          >
            Enquire
          </a>
        </div>

        <button
          className="hamburger"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
        </button>
      </nav>

      {isMenuOpen && (
        <>
          <div className="mobile-menu-overlay" onClick={() => setIsMenuOpen(false)} />
          <div className="mobile-menu">
            <div className="mobile-menu-content">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="mobile-menu-item"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mobile-menu-divider" />
              <a
                href="https://wa.me/919747110790"
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-menu-cta"
                onClick={() => setIsMenuOpen(false)}
              >
                Enquire for Admission
              </a>
            </div>
          </div>
        </>
      )}
    </>
  )
}
