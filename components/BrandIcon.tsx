import Image from 'next/image'
import { images } from '@/lib/images'

interface BrandIconProps {
  className?: string
}

export default function BrandIcon({ className }: BrandIconProps) {
  return (
    <Image
      src={images.brandLogo}
      alt=""
      width={36}
      height={32}
      className={className}
      priority
    />
  )
}
