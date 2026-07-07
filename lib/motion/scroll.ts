'use client'

import gsap from 'gsap'
import {
  registerGsap,
  createLenis,
  bindLenisScrollTrigger,
  unbindLenisScrollTrigger,
  type LenisInstance,
} from '@/lib/motion/engine'
import { prefersReducedMotion } from '@/lib/motion/reveal'

type ScrollListener = (scrollY: number) => void

let lenis: LenisInstance | null = null
let gsapRaf: gsap.TickerCallback | null = null
let nativeScrollHandler: (() => void) | null = null
let initCount = 0
const listeners = new Set<ScrollListener>()

function readScrollY() {
  if (lenis) return lenis.scroll
  if (typeof window === 'undefined') return 0
  return window.scrollY
}

function notifyScroll() {
  const y = readScrollY()
  listeners.forEach((listener) => listener(y))
}

/** Subscribe to scroll position updates (Lenis or native). Returns unsubscribe. */
export function subscribeScroll(listener: ScrollListener) {
  listeners.add(listener)
  listener(readScrollY())
  return () => listeners.delete(listener)
}

export function getScrollY() {
  return readScrollY()
}

function bindNativeScroll() {
  if (nativeScrollHandler) return

  nativeScrollHandler = () => notifyScroll()
  window.addEventListener('scroll', nativeScrollHandler, { passive: true })
  notifyScroll()
}

function unbindNativeScroll() {
  if (!nativeScrollHandler) return
  window.removeEventListener('scroll', nativeScrollHandler)
  nativeScrollHandler = null
}

function shouldUseLenis() {
  if (typeof window === 'undefined') return false
  if (prefersReducedMotion()) return false
  return !window.matchMedia('(max-width: 768px)').matches
}

/** One Lenis instance + GSAP ScrollTrigger proxy for the whole site. */
export async function initSmoothScroll(): Promise<() => void> {
  initCount += 1
  if (initCount > 1) {
    notifyScroll()
    return () => {
      initCount -= 1
    }
  }

  if (!shouldUseLenis()) {
    bindNativeScroll()
    return () => {
      initCount -= 1
      if (initCount === 0) unbindNativeScroll()
    }
  }

  registerGsap()
  const instance = await createLenis()

  if (!instance) {
    bindNativeScroll()
    return () => {
      initCount -= 1
      if (initCount === 0) unbindNativeScroll()
    }
  }

  lenis = instance
  gsapRaf = bindLenisScrollTrigger(lenis)

  const onLenisScroll = () => notifyScroll()
  lenis.on('scroll', onLenisScroll)
  notifyScroll()

  return () => {
    initCount -= 1
    if (initCount > 0) return

    lenis?.off('scroll', onLenisScroll)
    if (gsapRaf) unbindLenisScrollTrigger(gsapRaf)
    lenis?.destroy()
    lenis = null
    gsapRaf = null
  }
}
