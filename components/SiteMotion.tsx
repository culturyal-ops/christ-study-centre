'use client'

import { useEffect } from 'react'

function throttle<T extends (...args: unknown[]) => void>(fn: T, limit: number) {
  let locked = false
  return (...args: Parameters<T>) => {
    if (locked) return
    locked = true
    fn(...args)
    setTimeout(() => {
      locked = false
    }, limit)
  }
}

export default function SiteMotion() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const revealAll = () => {
      document.querySelectorAll('[data-scroll-reveal], .hero-word').forEach((el) => {
        el.classList.add('revealed')
      })
    }

    if (reduced) {
      revealAll()
      return
    }

    const progress = document.getElementById('scrollProgress')
    const onScroll = throttle(() => {
      const height = document.documentElement.scrollHeight - window.innerHeight
      const pct = height > 0 ? (window.scrollY / height) * 100 : 0
      if (progress) progress.style.width = `${pct}%`

      const nav = document.getElementById('siteNav')
      nav?.classList.toggle('nav-scrolled', window.scrollY > 32)
    }, 16)

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    document.querySelectorAll('.hero-word').forEach((word, i) => {
      setTimeout(() => word.classList.add('revealed'), 80 + i * 140)
    })

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const el = entry.target
          const delay = parseFloat(el.getAttribute('data-delay') || '0')
          setTimeout(() => {
            el.classList.add('revealed')
          }, delay * 1000)
          revealObserver.unobserve(el)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )

    document.querySelectorAll('[data-scroll-reveal]').forEach((el) => {
      revealObserver.observe(el)
    })

    const finePointer = window.matchMedia('(pointer: fine)').matches
    const tiltCleanups: (() => void)[] = []

    if (finePointer) {
      document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => {
        const onMove = (e: MouseEvent) => {
          const rect = el.getBoundingClientRect()
          const x = e.clientX - rect.left
          const y = e.clientY - rect.top
          const cx = rect.width / 2
          const cy = rect.height / 2
          const rotateX = ((y - cy) / cy) * -4
          const rotateY = ((x - cx) / cx) * 4
          el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`
        }
        const onLeave = () => {
          el.style.transform = ''
        }
        el.addEventListener('mousemove', onMove)
        el.addEventListener('mouseleave', onLeave)
        tiltCleanups.push(() => {
          el.removeEventListener('mousemove', onMove)
          el.removeEventListener('mouseleave', onLeave)
        })
      })
    }

    return () => {
      window.removeEventListener('scroll', onScroll)
      revealObserver.disconnect()
      tiltCleanups.forEach((fn) => fn())
    }
  }, [])

  return <div className="scroll-progress" id="scrollProgress" aria-hidden="true" />
}
