'use client'

import { useEffect } from 'react'
import { gsap, registerGsap, ScrollTrigger } from '@/lib/motion/engine'
import { prefersReducedMotion, setupScrollReveal } from '@/lib/motion/reveal'

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

const HERO_SHOT_TILT = {
  back: -10,
  main: 4,
  front: 9,
} as const

function animateHeroShots(tl: gsap.core.Timeline, landing: ParentNode, at = 0.18) {
  ;(
    [
      ['.csc-landing__hero-shot--back', HERO_SHOT_TILT.back],
      ['.csc-landing__hero-shot--main', HERO_SHOT_TILT.main],
      ['.csc-landing__hero-shot--front', HERO_SHOT_TILT.front],
    ] as const
  ).forEach(([selector, rotation], index) => {
    tl.fromTo(
      landing.querySelector(selector),
      {
        y: 52,
        opacity: 0,
        rotation: rotation * 0.35,
        scale: 0.9,
      },
      {
        rotation,
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.05,
        ease: 'power3.out',
        transformOrigin: '50% 50%',
      },
      at + index * 0.11
    )
  })
}

export default function LandingMotion() {
  useEffect(() => {
    const landing = document.querySelector('.csc-landing')
    if (!landing) return

    const root = document.documentElement
    root.classList.add('motion-on')

    const cleanups: Array<() => void> = []
    const revealCleanup = setupScrollReveal()

    if (!prefersReducedMotion()) {
      registerGsap()

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

        tl.from('.csc-split-line', {
          yPercent: 105,
          opacity: 0,
          duration: 1,
          ease: 'power4.out',
          stagger: 0.1,
        }, 0.1)

        tl.from('.csc-scribble-wrap', { y: 20, opacity: 0, duration: 0.8 }, 0.45)

        landing.querySelectorAll<SVGPathElement>('.csc-scribble-path').forEach((path, i) => {
          drawPath(path, 0.65 + i * 0.12)
        })

        tl.from(
          '[data-hero-fade]',
          { y: 28, opacity: 0, stagger: 0.09, duration: 0.9 },
          0.12
        )

        tl.from(
          '.csc-landing__hero-portal--highlight',
          { y: 18, opacity: 0, scale: 0.94, duration: 0.9, ease: 'back.out(1.35)' },
          0.34
        )

        animateHeroShots(tl, landing, 0.2)

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

        landing.querySelectorAll<HTMLElement>('.csc-landing__hero-shot-inner').forEach((el, i) => {
          gsap.to(el, {
            y: 9,
            duration: 2.6 + i * 0.35,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            delay: 1.4 + i * 0.18,
          })
        })

        ScrollTrigger.create({
          trigger: '.csc-landing__video-section',
          start: 'top 88%',
          once: true,
          onEnter: () => {
            gsap.from('.csc-landing__video-copy', {
              y: 40,
              opacity: 0,
              duration: 0.9,
              ease: 'power3.out',
            })
            gsap.from('.csc-landing__video-frame', {
              y: 48,
              opacity: 0,
              scale: 0.96,
              duration: 1.05,
              ease: 'power3.out',
              delay: 0.12,
            })
          },
        })

        ScrollTrigger.create({
          trigger: '.csc-landing__features',
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.from('.csc-landing__features .csc-landing__eyebrow', {
              y: 24,
              opacity: 0,
              duration: 0.7,
            })
            gsap.from('.csc-landing__features-title .csc-feature-line', {
              yPercent: 110,
              opacity: 0,
              stagger: 0.08,
              duration: 0.85,
              ease: 'power4.out',
              delay: 0.08,
            })
            gsap.from('.csc-landing__feature-row', {
              x: window.matchMedia('(max-width: 767px)').matches ? 0 : -24,
              opacity: 0,
              stagger: 0.05,
              duration: 0.75,
              ease: 'power3.out',
              delay: 0.2,
            })
          },
        })

        ScrollTrigger.create({
          trigger: '.csc-landing__footer',
          start: 'top 92%',
          once: true,
          onEnter: () => {
            gsap.from('.csc-landing__footer-grid > *, .csc-landing__footer-bottom-inner', {
              y: 28,
              opacity: 0,
              stagger: 0.08,
              duration: 0.8,
              ease: 'power3.out',
            })
          },
        })

        const floaters = [...landing.querySelectorAll<HTMLElement>('.csc-cursor-float')]
        if (floaters.length && window.matchMedia('(min-width: 769px)').matches) {
          const state = floaters.map((el, i) => ({
            el,
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            ease: 0.07 + i * 0.02,
          }))
          let mx = state[0].x
          let my = state[0].y

          const onMove = (e: MouseEvent) => {
            mx = e.clientX
            my = e.clientY
          }
          window.addEventListener('mousemove', onMove)

          let rafId = 0
          const tick = () => {
            state.forEach((s, i) => {
              s.x += (mx + (i - 1) * 40 - s.x) * s.ease
              s.y += (my + (i % 2 ? 28 : -28) - s.y) * s.ease
              gsap.set(s.el, { x: s.x, y: s.y, xPercent: -50, yPercent: -50 })
            })
            rafId = requestAnimationFrame(tick)
          }
          rafId = requestAnimationFrame(tick)
          cleanups.push(() => {
            window.removeEventListener('mousemove', onMove)
            cancelAnimationFrame(rafId)
          })
        }
      }, landing)

      cleanups.push(() => ctx.revert())
      cleanups.push(() => ScrollTrigger.getAll().forEach((t) => t.kill()))

      const safety = window.setTimeout(() => {
        landing
          .querySelectorAll(
            '[data-hero-fade], .csc-split-line, .csc-landing__hero-portal--highlight, .csc-landing__deck .csc-landing__ui, .csc-landing__hero-shot, .csc-landing__video-copy, .csc-landing__video-frame, .csc-landing__feature-row'
          )
          .forEach((el) => {
            gsap.set(el, { clearProps: 'opacity,transform,clipPath,scale' })
          })
        landing.querySelectorAll('.csc-landing__hero-shot-inner').forEach((el) => {
          gsap.set(el, { clearProps: 'clipPath,scale,transform' })
        })
      }, 2800)
      cleanups.push(() => window.clearTimeout(safety))
    } else {
      root.classList.add('motion-on')
    }

    cleanups.push(revealCleanup)
    cleanups.push(() => root.classList.remove('motion-on'))

    return () => {
      cleanups.forEach((fn) => fn())
    }
  }, [])

  return (
    <>
      <div className="csc-cursor-float csc-cursor-float--1" aria-hidden="true" />
      <div className="csc-cursor-float csc-cursor-float--2" aria-hidden="true" />
      <div className="csc-cursor-float csc-cursor-float--3" aria-hidden="true" />
    </>
  )
}
