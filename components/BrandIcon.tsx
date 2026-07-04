interface BrandIconProps {
  className?: string
  /** Cap colour — defaults to brand blue */
  color?: string
}

export default function BrandIcon({
  className,
  color = '#4589F7',
}: BrandIconProps) {
  const shade = '#3678E3'
  const core = '#2D6BC7'

  return (
    <svg
      viewBox="0 0 36 32"
      width={36}
      height={32}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* Mortarboard top */}
      <path d="M18 2 33 11 18 20 3 11Z" fill={color} />
      {/* Board depth */}
      <path d="M18 20 33 11 33 13.2 18 22.2 3 13.2 3 11Z" fill={shade} />
      {/* Cap base */}
      <path
        d="M11.5 18.2c0-1.8 2.9-3.2 6.5-3.2s6.5 1.4 6.5 3.2v1.4c0 1.8-2.9 2.6-6.5 2.6s-6.5-.8-6.5-2.6v-1.4Z"
        fill={shade}
      />
      {/* Crown highlight */}
      <path
        d="M13 18.8c0-1.1 2.2-2 5-2s5 .9 5 2"
        stroke={color}
        strokeWidth="0.8"
        strokeLinecap="round"
        fill="none"
        opacity="0.45"
      />
      {/* Top button */}
      <circle cx="18" cy="11" r="1.35" fill={core} />
      {/* Tassel cord */}
      <path
        d="M33 11v6.8"
        stroke={color}
        strokeWidth="1.15"
        strokeLinecap="round"
      />
      {/* Tassel head */}
      <circle cx="33" cy="19.2" r="2.1" fill={color} />
      <path
        d="M31.2 20.6c.8.7 1.8 1 2.8.8"
        stroke={core}
        strokeWidth="0.6"
        strokeLinecap="round"
        opacity="0.35"
      />
    </svg>
  )
}
