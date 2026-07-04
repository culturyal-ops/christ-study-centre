export const delayAttr = (i: number) =>
  ({ 'data-delay': String(Math.min(i * 0.08, 0.32)) }) as const

export const heroRevealAttr = (delay = 0) =>
  ({
    'data-hero-reveal': true,
    'data-delay': String(delay),
    style: { animationDelay: `${delay}s` },
  }) as const

export const revealAttr = (
  variant: 'up' | 'left' | 'right' | 'scale' = 'up',
  delay = 0
) =>
  ({
    'data-scroll-reveal': true,
    'data-reveal': variant,
    'data-delay': String(delay),
  }) as const
