'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { forwardRef } from 'react'

type SectionRevealProps = {
  as?: 'section' | 'footer'
  disabled?: boolean
  glow?: boolean
  className?: string
  id?: string
  children: React.ReactNode
  'aria-labelledby'?: string
}

const DIM_SHADOW = 'inset 0 1px 0 rgba(51, 65, 85, 0.2)'
const ACTIVE_SHADOW =
  'inset 0 1px 0 rgba(96, 165, 250, 0.45), 0 -16px 48px rgba(61, 125, 255, 0.09)'

const SectionReveal = forwardRef<HTMLElement, SectionRevealProps>(function SectionReveal(
  { as = 'section', disabled = false, glow = true, children, className, id, 'aria-labelledby': ariaLabelledBy },
  ref
) {
  const reduced = useReducedMotion()
  const skip = disabled || reduced
  const useGlow = glow && !skip

  const mergedClass = [className, useGlow ? 'csc-section-glow' : undefined]
    .filter(Boolean)
    .join(' ')

  const motionProps = {
    ref: ref as React.Ref<HTMLElement>,
    className: mergedClass || undefined,
    initial: skip
      ? false
      : {
          opacity: 0,
          y: 20,
          ...(useGlow ? { boxShadow: DIM_SHADOW } : undefined),
        },
    whileInView: skip
      ? undefined
      : {
          opacity: 1,
          y: 0,
          ...(useGlow ? { boxShadow: ACTIVE_SHADOW } : undefined),
        },
    viewport: { once: true, amount: 0.2 as const },
    transition: { duration: 0.6, ease: 'easeOut' as const },
  }

  if (as === 'footer') {
    return <motion.footer {...motionProps}>{children}</motion.footer>
  }

  return (
    <motion.section {...motionProps} id={id} aria-labelledby={ariaLabelledBy}>
      {children}
    </motion.section>
  )
})

export default SectionReveal
