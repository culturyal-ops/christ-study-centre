import Image from 'next/image'

interface BrandIconProps {
  className?: string
  size?: number
}

export default function BrandIcon({ className, size = 36 }: BrandIconProps) {
  return (
    <Image
      src="/images/csc-logo.png"
      alt=""
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      priority
      unoptimized
    />
  )
}
