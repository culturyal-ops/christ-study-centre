'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/courses', label: 'Courses' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-parchment border-b border-forest/10">
      <div className="container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-10 border border-forest/20 flex items-center justify-center">
              <span className="text-brass text-xs font-mono">CSC</span>
            </div>
            <div>
              <div className="text-sm font-semibold tracking-tight">Christ Study Centre</div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-brass">Pala</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link text-sm font-medium ${
                    active ? 'active text-forest' : 'text-forest/60 hover:text-forest'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-forest/60 hover:text-forest">
              Portal
            </Link>
            <a
              href="https://wa.me/919747110790"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary text-sm"
            >
              Enquire
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-forest/10 bg-parchment">
          <div className="container py-4 space-y-3">
            {navLinks.map((link) => {
              const active = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block py-2 text-sm font-medium ${
                    active ? 'text-forest' : 'text-forest/60'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
            <div className="pt-3 flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="btn btn-secondary w-full justify-center text-sm"
              >
                Portal
              </Link>
              <a
                href="https://wa.me/919747110790"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-full justify-center text-sm"
              >
                Enquire
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
