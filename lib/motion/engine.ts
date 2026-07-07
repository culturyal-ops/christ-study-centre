'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let registered = false

export function prefersReducedMotion() {
  if (typeof window === 'undefined') return true
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function registerGsap() {
  if (registered || typeof window === 'undefined') return
  gsap.registerPlugin(ScrollTrigger)
  registered = true
}

export { gsap, ScrollTrigger }

export type LenisInstance = {
  raf: (time: number) => void
  on: (event: string, cb: () => void) => void
  off: (event: string, cb: () => void) => void
  destroy: () => void
  scrollTo: (value: number, options?: { immediate?: boolean }) => void
  scroll: number
  resize?: () => void
}

export async function createLenis() {
  if (window.matchMedia('(max-width: 768px)').matches) return null

  const { default: Lenis } = await import('lenis')
  return new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  }) as LenisInstance
}

export function bindLenisScrollTrigger(lenis: LenisInstance) {
  ScrollTrigger.scrollerProxy(document.documentElement, {
    scrollTop(value?: number) {
      if (value !== undefined) {
        lenis.scrollTo(value, { immediate: true })
      }
      return lenis.scroll
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      }
    },
  })

  lenis.on('scroll', ScrollTrigger.update)

  const raf = (time: number) => {
    lenis.raf(time * 1000)
  }
  gsap.ticker.add(raf)
  gsap.ticker.lagSmoothing(0)

  ScrollTrigger.addEventListener('refresh', () => {
    lenis.resize?.()
  })
  ScrollTrigger.refresh()

  return raf
}

export function unbindLenisScrollTrigger(raf: gsap.TickerCallback) {
  gsap.ticker.remove(raf)
  ScrollTrigger.scrollerProxy(document.documentElement, {})
  ScrollTrigger.clearScrollMemory()
}

export function refreshScrollTriggers() {
  ScrollTrigger.refresh(true)
}

/** Play tweens immediately for elements already on screen */
export function revealVisibleTriggers() {
  ScrollTrigger.getAll().forEach((trigger) => {
    if (trigger.progress > 0) return
    const el = trigger.trigger as Element | undefined
    if (!el) return
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.96 && rect.bottom > 0) {
      const tween = trigger.animation as gsap.core.Animation | undefined
      tween?.progress(1)
    }
  })
}
