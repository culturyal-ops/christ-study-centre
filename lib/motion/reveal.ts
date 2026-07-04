'use client'

export function prefersReducedMotion() {
  if (typeof window === 'undefined') return true
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function delayOf(el: Element) {
  const raw = el.getAttribute('data-delay')
  return raw ? parseFloat(raw) * 1000 : 0
}

function isInView(el: Element) {
  const rect = el.getBoundingClientRect()
  return rect.top < window.innerHeight * 0.96 && rect.bottom > 0
}

export function setupScrollReveal(onMount?: () => void) {
  const reduced = prefersReducedMotion()
  const seen = new WeakSet<Element>()

  const reveal = (el: Element) => {
    if (el.classList.contains('revealed')) return
    const delay = delayOf(el)
    window.setTimeout(() => el.classList.add('revealed'), delay)
  }

  const revealAll = () => {
    document.querySelectorAll('[data-scroll-reveal], [data-reveal]').forEach((el) => {
      if (reduced) {
        el.classList.add('revealed')
        return
      }
      if (seen.has(el)) return
      seen.add(el)
      if (isInView(el)) reveal(el)
    })
  }

  if (reduced) {
    document.querySelectorAll('[data-scroll-reveal], [data-reveal]').forEach((el) => {
      el.classList.add('revealed')
    })
    onMount?.()
    return () => {}
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        reveal(entry.target)
        observer.unobserve(entry.target)
      })
    },
    { threshold: 0.06, rootMargin: '0px 0px -32px 0px' }
  )

  const bind = () => {
    document.querySelectorAll('[data-scroll-reveal], [data-reveal]').forEach((el) => {
      if (el.classList.contains('revealed') || seen.has(el)) return
      seen.add(el)
      if (isInView(el)) {
        reveal(el)
        return
      }
      observer.observe(el)
    })
  }

  bind()
  onMount?.()

  requestAnimationFrame(bind)
  window.setTimeout(bind, 120)
  window.setTimeout(bind, 600)

  const mo = new MutationObserver(bind)
  mo.observe(document.body, { childList: true, subtree: true })

  const safety = window.setTimeout(() => {
    document.querySelectorAll('[data-scroll-reveal], [data-reveal]').forEach((el) => {
      el.classList.add('revealed')
    })
  }, 2200)

  return () => {
    observer.disconnect()
    mo.disconnect()
    window.clearTimeout(safety)
  }
}

export async function setupSmoothScroll(onScroll: () => void) {
  if (prefersReducedMotion() || window.matchMedia('(max-width: 768px)').matches) {
    return () => {}
  }

  const { default: Lenis } = await import('lenis')
  const lenis = new Lenis({ duration: 1.15, smoothWheel: true })
  let rafId = 0

  const raf = (time: number) => {
    lenis.raf(time)
    rafId = requestAnimationFrame(raf)
  }
  rafId = requestAnimationFrame(raf)
  lenis.on('scroll', onScroll)

  return () => {
    cancelAnimationFrame(rafId)
    lenis.destroy()
  }
}
