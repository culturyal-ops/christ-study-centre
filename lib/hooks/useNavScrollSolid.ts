'use client'

import { useEffect, type RefObject } from 'react'
import { subscribeScroll } from '@/lib/motion/scroll'

/** Progressively solidify the glass nav as the user scrolls (0 → 1). */
export function useNavScrollSolid(shellRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const shell = shellRef.current
    if (!shell) return

    const update = (y: number) => {
      const linear = Math.min(1, Math.max(0, (y - 2) / 32))
      const progress = 1 - (1 - linear) ** 2
      shell.style.setProperty('--nav-scroll', progress.toFixed(3))
      shell.classList.toggle('is-scrolled', progress > 0.03)
      shell.classList.toggle('is-solid', progress > 0.72)
    }

    const unsubscribe = subscribeScroll(update)

    return () => {
      unsubscribe()
      shell.style.removeProperty('--nav-scroll')
      shell.classList.remove('is-scrolled', 'is-solid')
    }
  }, [shellRef])
}
