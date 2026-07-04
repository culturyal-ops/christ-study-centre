interface BrandIconProps {
  className?: string
}

export default function BrandIcon({ className }: BrandIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 640 512"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M622.34 153.2L343.4 67.5c-15.2-4.67-31.6-4.67-46.79 0L17.66 153.2c-8.5 2.62-8.5 14.33 0 16.96l55.25 17.01c4.67 1.44 9.62 2.16 14.57 2.16 4.95 0 9.9-.72 14.57-2.16L320 108.8l218.04 67.09c4.67 1.44 9.62 2.16 14.57 2.16 4.95 0 9.9-.72 14.57-2.16l55.25-17.01c8.49-2.63 8.49-14.34 0-16.96zM320 358.4l-224 68.89V372.7l224-68.89 224 68.89v54.59L320 358.4z" />
    </svg>
  )
}
