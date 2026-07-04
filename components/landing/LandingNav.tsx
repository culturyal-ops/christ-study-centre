'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import ThemeToggle from '@/components/ThemeToggle'
import BrandName from '@/components/BrandName'
import BrandIcon from '@/components/BrandIcon'
import { useNavScrollSolid } from '@/lib/hooks/useNavScrollSolid'

const links = [
  { href: '/', label: 'Home' },
  { href: '/#features', label: 'Features' },
  { href: '/courses', label: 'Courses' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function LandingNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const shellRef = useRef<HTMLDivElement>(null)

  useNavScrollSolid(shellRef)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const mobileMenu =
    mounted &&
    createPortal(
      <div
        className={`csc-landing__mobile ${open ? 'is-open' : ''}`}
        aria-hidden={!open}
      >
        <div className="csc-landing__mobile-panel">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link href="/login" onClick={() => setOpen(false)}>
            Portal
          </Link>
          <a
            href="https://wa.me/919747110790"
            target="_blank"
            rel="noopener noreferrer"
            className="csc-landing__mobile-cta"
            onClick={() => setOpen(false)}
          >
            Enquire on WhatsApp
          </a>
        </div>
      </div>,
      document.body
    )

  return (
    <>
      <div
        ref={shellRef}
        className={`csc-landing__nav-shell ${open ? 'is-menu-open' : ''}`}
      >
        <header className={`csc-landing__header ${open ? 'is-menu-open' : ''}`}>
          <div className="csc-landing__wrap csc-landing__header-row">
            <Link href="/" className="csc-landing__brand" onClick={() => setOpen(false)}>
              <BrandIcon className="csc-landing__brand-mark" />
              <BrandName variant="nav" />
            </Link>

            <div className="csc-landing__nav" role="navigation" aria-label="Main">
              {links.map((link) => {
                const active = link.href === '/' ? pathname === '/' : pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={active ? 'is-active' : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>

            <div className="csc-landing__header-actions">
              <ThemeToggle variant="nav" />
              <Link href="/login" className="csc-landing__login" onClick={() => setOpen(false)}>
                Portal
              </Link>
              <a
                href="https://wa.me/919747110790"
                target="_blank"
                rel="noopener noreferrer"
                className="csc-landing__header-btn"
              >
                Enquire
              </a>
            </div>

            <ThemeToggle variant="nav" className="csc-theme-toggle--mobile-bar" />
            <button
              type="button"
              className={`csc-landing__menu-btn ${open ? 'is-open' : ''}`}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              <span />
              <span />
            </button>
          </div>
        </header>
      </div>
      {mobileMenu}
    </>
  )
}
