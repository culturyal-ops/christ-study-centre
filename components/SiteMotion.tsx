'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { initSmoothScroll, subscribeScroll } from '@/lib/motion/scroll'
import { setupScrollReveal } from '@/lib/motion/reveal'

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
    let scrollCleanup = () => {}
    let lenisCleanup = () => {}

    const onScroll = (y: number) => {
      const height = document.documentElement.scrollHeight - window.innerHeight
      const pct = height > 0 ? (y / height) * 100 : 0
      if (progress) progress.style.width = `${pct}%`
      document.getElementById('siteNav')?.classList.toggle('nav-scrolled', y > 32)
    }

    scrollCleanup = subscribeScroll(onScroll)

    const revealCleanup = setupScrollReveal()
    root.classList.add('motion-on')

    initSmoothScroll().then((cleanup) => {
      lenisCleanup = cleanup ?? (() => {})
    })

    return () => {
      root.classList.remove('motion-on')
      scrollCleanup()
      revealCleanup()
      lenisCleanup()
    }
  }, [pathname])

  if (pathname.startsWith('/login') || pathname.startsWith('/admin') || pathname.startsWith('/student')) {
    return null
  }

  return <div className="scroll-progress" id="scrollProgress" aria-hidden="true" />
}
