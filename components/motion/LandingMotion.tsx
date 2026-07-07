'use client'

import { useEffect } from 'react'
import { gsap, registerGsap, ScrollTrigger } from '@/lib/motion/engine'
import { prefersReducedMotion } from '@/lib/motion/reveal'

function drawPath(path: SVGPathElement, delay = 0) {
  const length = path.getTotalLength()
  gsap.set(path, { strokeDasharray: length, strokeDashoffset: length, opacity: 1 })
  gsap.to(path, {
    strokeDashoffset: 0,
    duration: 0.9,
    ease: 'power2.out',
    delay,
  })
}

function animateCount(el: Element, delay = 0) {
  const target = parseFloat(el.getAttribute('data-count') || '0')
  const prefix = el.getAttribute('data-count-prefix') || ''
  const suffix = el.getAttribute('data-count-suffix') || ''
  const obj = { n: 0 }
  gsap.to(obj, {
    n: target,
    duration: 1.45,
    delay,
    ease: 'power2.out',
    onUpdate: () => {
      el.textContent = `${prefix}${Math.round(obj.n)}${suffix}`
    },
  })
}

function animateHero3D(tl: gsap.core.Timeline, at = 0.2) {
  tl.from(
    '[data-hero-3d]',
    { y: 28, opacity: 0, duration: 0.9, ease: 'power3.out' },
    at
  )
}

export default function LandingMotion() {
  useEffect(() => {
    const landing = document.querySelector('.csc-landing')
    if (!landing) return

    const root = document.documentElement
    root.classList.add('motion-on')

    const cleanups: Array<() => void> = []

    if (!prefersReducedMotion()) {
      registerGsap()

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

        tl.from('.csc-split-word', {
          yPercent: 115,
          opacity: 0,
          duration: 0.82,
          ease: 'power4.out',
          stagger: { each: 0.045, from: 'start' },
        }, 0.08)

        tl.from('.csc-scribble-wrap', { y: 20, opacity: 0, duration: 0.8 }, 0.52)

        landing.querySelectorAll<SVGPathElement>('.csc-scribble-path').forEach((path, i) => {
          drawPath(path, 0.72 + i * 0.12)
        })

        tl.from(
          '[data-hero-fade]',
          { y: 28, opacity: 0, stagger: 0.09, duration: 0.9 },
          0.18
        )

        tl.from(
          '.csc-landing__hero-portal--highlight',
          { y: 18, opacity: 0, scale: 0.94, duration: 0.9, ease: 'back.out(1.35)' },
          0.34
        )

        animateHero3D(tl, 0.2)

        tl.from(
          '.csc-landing__deck .csc-landing__ui',
          {
            y: 56,
            opacity: 0,
            scale: 0.94,
            stagger: 0.13,
            duration: 1,
            ease: 'power3.out',
          },
          0.38
        )

        gsap.fromTo(
          '.csc-landing__ui-bar-fill',
          { width: '0%' },
          { width: '86%', duration: 1.25, ease: 'power3.out', delay: 0.75 }
        )

        const ring = landing.querySelector<SVGCircleElement>('.csc-landing__ring-fill')
        if (ring) {
          const circ = 2 * Math.PI * 36
          gsap.set(ring, { strokeDasharray: circ })
          gsap.fromTo(
            ring,
            { strokeDashoffset: circ },
            { strokeDashoffset: circ * 0.06, duration: 1.5, ease: 'power2.out', delay: 0.85 }
          )
        }

        landing.querySelectorAll('[data-count]').forEach((el, i) => {
          animateCount(el, 0.9 + i * 0.12)
        })

        const routePath = landing.querySelector<SVGPathElement>('.csc-landing__route-path')
        if (routePath) {
          drawPath(routePath, 1.05)
        }
      }, landing)

      cleanups.push(() => ctx.revert())
      cleanups.push(() => ScrollTrigger.getAll().forEach((t) => t.kill()))

      const safety = window.setTimeout(() => {
        landing
          .querySelectorAll(
            '[data-hero-fade], .csc-split-word, .csc-landing__hero-portal--highlight, .csc-landing__deck .csc-landing__ui'
          )
          .forEach((el) => {
            gsap.set(el, { clearProps: 'opacity,transform,clipPath,scale' })
          })
        landing.querySelectorAll('[data-hero-3d]').forEach((el) => {
          gsap.set(el, { clearProps: 'opacity,transform,y' })
        })
      }, 2800)
      cleanups.push(() => window.clearTimeout(safety))
    } else {
      root.classList.add('motion-on')
    }

    cleanups.push(() => root.classList.remove('motion-on'))

    return () => {
      cleanups.forEach((fn) => fn())
    }
  }, [])

  return null
}
