export const delayAttr = (i: number) =>
  ({ 'data-delay': String(Math.min(i * 0.08, 0.32)) }) as const
