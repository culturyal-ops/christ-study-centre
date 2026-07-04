'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import ThemeToggle from '@/components/ThemeToggle'
import BrandName from '@/components/BrandName'
import BrandIcon from '@/components/BrandIcon'

type NavLink = { href: string; label: string }

type Props = {
  brandHref: string
  links: NavLink[]
  username: string
  signOutSlot: React.ReactNode
}

export default function PortalNav({ brandHref, links, username, signOutSlot }: Props) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(`${href}/`))

  const mobileMenu =
    mounted &&
    createPortal(
      <div className={`csc-landing__mobile ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <div className="csc-landing__mobile-panel">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          <div className="portal-mobile-user">{username}</div>
          <div onClick={() => setOpen(false)}>{signOutSlot}</div>
        </div>
      </div>,
      document.body
    )

  return (
    <>
      <div className={`csc-landing__nav-shell portal-nav-shell ${open ? 'is-menu-open' : ''}`}>
        <header className={`csc-landing__header portal-header ${open ? 'is-menu-open' : ''}`}>
          <div className="csc-landing__wrap csc-landing__header-row portal-header-inner">
            <Link href={brandHref} className="csc-landing__brand portal-brand" onClick={() => setOpen(false)}>
              <BrandIcon className="csc-landing__brand-mark" />
              <BrandName variant="nav" />
            </Link>

            <nav className="csc-landing__nav portal-nav" aria-label="Portal">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={isActive(link.href) ? 'is-active' : undefined}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="csc-landing__header-actions portal-header-actions">
              <ThemeToggle variant="nav" />
              <span className="portal-user">{username}</span>
              {signOutSlot}
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
