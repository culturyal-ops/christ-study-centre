type ReviewCarouselArrowProps = {
  direction: 'prev' | 'next'
  label: string
  onClick: () => void
}

export default function ReviewCarouselArrow({
  direction,
  label,
  onClick,
}: ReviewCarouselArrowProps) {
  return (
    <button
      type="button"
      className="csc-hero-3d__nav"
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      onMouseDown={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
    >
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        {direction === 'prev' ? (
          <path
            d="M15 6l-6 6 6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M9 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </button>
  )
}
