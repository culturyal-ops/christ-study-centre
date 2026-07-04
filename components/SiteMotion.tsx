'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { prefersReducedMotion, setupScrollReveal, setupSmoothScroll } from '@/lib/motion/reveal'

export default function SiteMotion() {
  const pathname = usePathname()

  useEffect(() => {
    // Login / portal: skip Lenis/reveal — can interfere with forms and admin UI
    if (
      pathname.startsWith('/login') ||
      pathname.startsWith('/admin') ||
      pathname.startsWith('/student')
    ) {
      return
    }

    const root = document.documentElement
    const progress = document.getElementById('scrollProgress')
    let lenisCleanup = () => {}

    const onScroll = () => {
      const y = window.scrollY
      const height = document.documentElement.scrollHeight - window.innerHeight
      const pct = height > 0 ? (y / height) * 100 : 0
      if (progress) progress.style.width = `${pct}%`
      document.getElementById('siteNav')?.classList.toggle('nav-scrolled', y > 32)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    const revealCleanup = setupScrollReveal()
    root.classList.add('motion-on')

    setupSmoothScroll(onScroll).then((cleanup) => {
      lenisCleanup = cleanup ?? (() => {})
    })

    return () => {
      root.classList.remove('motion-on')
      window.removeEventListener('scroll', onScroll)
      revealCleanup()
      lenisCleanup()
    }
  }, [pathname])

  if (pathname.startsWith('/login') || pathname.startsWith('/admin') || pathname.startsWith('/student')) {
    return null
  }

  return <div className="scroll-progress" id="scrollProgress" aria-hidden="true" />
}
