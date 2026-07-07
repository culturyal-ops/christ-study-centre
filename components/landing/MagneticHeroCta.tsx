'use client'

import Link from 'next/link'
import { useCallback, useEffect, useRef, type ReactNode } from 'react'

type MagneticHeroCtaProps = {
  href: string
  children: ReactNode
}

const STRENGTH = 0.26
const HOVER_SCALE = 1.035

export default function MagneticHeroCta({ href, children }: MagneticHeroCtaProps) {
  const linkRef = useRef<HTMLAnchorElement>(null)
  const enabledRef = useRef(false)

  useEffect(() => {
    enabledRef.current =
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
      window.matchMedia('(pointer: fine)').matches
  }, [])

  const reset = useCallback(() => {
    const el = linkRef.current
    if (!el) return
    el.style.transform = ''
    el.style.boxShadow = ''
  }, [])

  const onMove = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!enabledRef.current) return

    const el = linkRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const offsetX = event.clientX - (rect.left + rect.width / 2)
    const offsetY = event.clientY - (rect.top + rect.height / 2)

    el.style.transform = `translate3d(${offsetX * STRENGTH}px, ${offsetY * STRENGTH}px, 0) scale(${HOVER_SCALE})`
    el.style.boxShadow = 'var(--lg-cta-glow-hover)'
  }, [])

  return (
    <Link
      ref={linkRef}
      href={href}
      className="csc-landing__hero-cta csc-landing__hero-cta--magnetic"
      onMouseMove={onMove}
      onMouseLeave={reset}
      onBlur={reset}
    >
      {children}
    </Link>
  )
}
