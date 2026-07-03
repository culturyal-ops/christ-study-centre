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
  { href: '/login', label: 'Portal' },
]

const mobilePrimary = navLinks.filter((l) => l.href !== '/login')

export default function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <nav id="siteNav">
        <div className="brand">
          <svg className="crest" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M16 4L19.2 11.6H27.2L21 16.4L23.2 24.8L16 20L8.8 24.8L11 16.4L4.8 11.6H12.8L16 4Z" stroke="#681B22" strokeWidth="0.85" fill="none" />
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
                <span className="nav-link-text">{link.label}</span>
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
          className={`hamburger ${isMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </nav>

      <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-overlay" onClick={() => setIsMenuOpen(false)} aria-hidden="true" />
        <div className="mobile-menu-panel">
          <div className="mobile-menu-content">
            {mobilePrimary.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className="mobile-menu-item"
                onClick={() => setIsMenuOpen(false)}
                style={{ animationDelay: `${0.08 + i * 0.06}s` }}
              >
                <span className="mobile-menu-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="mobile-menu-label">{link.label}</span>
              </Link>
            ))}
            <Link
              href="/login"
              className="mobile-menu-item mobile-menu-portal"
              onClick={() => setIsMenuOpen(false)}
              style={{ animationDelay: '0.44s' }}
            >
              <span className="mobile-menu-num">—</span>
              <span className="mobile-menu-label">Portal</span>
            </Link>
            <a
              href="https://wa.me/919747110790"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-menu-cta"
              onClick={() => setIsMenuOpen(false)}
            >
              Enquire for admission →
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
