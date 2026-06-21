'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/courses', label: 'Courses' },
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

        {/* Hamburger button - mobile only */}
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

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <>
          <div className="mobile-menu-overlay" onClick={() => setIsMenuOpen(false)} />
          <div className="mobile-menu">
            <div className="mobile-menu-content">
              {navLinks.map((link) => {
                const active = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`mobile-menu-item ${active ? 'active' : ''}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              })}
              <Link
                href="/login"
                className="mobile-menu-item"
                onClick={() => setIsMenuOpen(false)}
              >
                Student Portal
              </Link>
              <div className="mobile-menu-divider" />
              <a
                href="https://wa.me/919747110790"
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-menu-cta"
                onClick={() => setIsMenuOpen(false)}
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </>
      )}
    </>
  )
}
