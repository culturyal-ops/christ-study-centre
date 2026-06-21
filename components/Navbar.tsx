'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, GraduationCap } from 'lucide-react'

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
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        background: 'rgba(12, 30, 60, 0.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(201, 168, 76, 0.2)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #C9A84C 0%, #E8C97A 100%)' }}
            >
              <GraduationCap className="w-5 h-5 text-[#0C1E3C]" />
            </div>
            <div className="leading-tight">
              <div
                className="font-bold text-base tracking-wide"
                style={{ color: '#E8C97A', letterSpacing: '0.06em' }}
              >
                CHRIST
              </div>
              <div className="text-[10px] text-white/50 uppercase tracking-widest -mt-0.5">
                Study Centre
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    active
                      ? 'text-[#E8C97A] active'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="btn-outline-gold text-sm px-4 py-2 rounded-lg"
            >
              Portal Login
            </Link>
            <a
              href="https://wa.me/919747110790"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold text-sm px-5 py-2 rounded-lg"
            >
              Enquire Now
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-md text-white/70 hover:text-white"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          className="md:hidden px-4 pb-4 pt-2 space-y-1"
          style={{
            background: 'rgba(12, 30, 60, 0.98)',
            borderTop: '1px solid rgba(201, 168, 76, 0.15)',
          }}
        >
          {navLinks.map((link) => {
            const active = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium ${
                  active
                    ? 'text-[#E8C97A] bg-white/5'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
          <div className="pt-2 flex flex-col gap-2">
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="btn-outline-gold text-sm px-4 py-2.5 rounded-lg text-center"
            >
              Portal Login
            </Link>
            <a
              href="https://wa.me/919747110790"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold text-sm px-5 py-2.5 rounded-lg text-center"
            >
              Enquire Now
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
