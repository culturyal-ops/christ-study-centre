'use client'

import { useEffect, type RefObject } from 'react'

/** Progressively solidify the glass nav as the user scrolls (0 → 1). */
export function useNavScrollSolid(shellRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const shell = shellRef.current
    if (!shell) return

    let raf = 0

    const update = () => {
      const y = window.scrollY
      const progress = Math.min(1, Math.max(0, (y - 16) / 120))
      shell.style.setProperty('--nav-scroll', progress.toFixed(3))
      shell.classList.toggle('is-scrolled', progress > 0.06)
    }

    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
      shell.style.removeProperty('--nav-scroll')
      shell.classList.remove('is-scrolled')
    }
  }, [shellRef])
}
