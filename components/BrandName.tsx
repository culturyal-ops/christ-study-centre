type BrandNameVariant = 'nav' | 'footer' | 'hero' | 'inline' | 'compact'

interface BrandNameProps {
  variant?: BrandNameVariant
  className?: string
}

export default function BrandName({ variant = 'inline', className }: BrandNameProps) {
  const classes = ['csc-brand-name', `csc-brand-name--${variant}`, className]
    .filter(Boolean)
    .join(' ')

  return <span className={classes}>Christ Study Centre</span>
}
