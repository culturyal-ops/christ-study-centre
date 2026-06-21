export default function Crest({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Christ Study Centre Crest"
    >
      {/* Shield outline */}
      <path
        d="M60 5 L100 25 L100 75 Q100 105 60 135 Q20 105 20 75 L20 25 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      
      {/* Inner shield */}
      <path
        d="M60 12 L92 28 L92 72 Q92 98 60 125 Q28 98 28 72 L28 28 Z"
        stroke="currentColor"
        strokeWidth="0.5"
        fill="none"
        opacity="0.4"
      />
      
      {/* Cross */}
      <line x1="60" y1="35" x2="60" y2="75" stroke="currentColor" strokeWidth="2" />
      <line x1="45" y1="50" x2="75" y2="50" stroke="currentColor" strokeWidth="2" />
      
      {/* Open book */}
      <path
        d="M40 80 Q60 85 80 80 L80 100 Q60 105 40 100 Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
      <line x1="60" y1="80" x2="60" y2="100" stroke="currentColor" strokeWidth="0.5" />
      
      {/* Laurel left */}
      <path
        d="M35 55 Q30 60 30 70 Q30 75 32 78"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
      
      {/* Laurel right */}
      <path
        d="M85 55 Q90 60 90 70 Q90 75 88 78"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
      
      {/* Est. banner */}
      <rect
        x="45"
        y="108"
        width="30"
        height="10"
        stroke="currentColor"
        strokeWidth="0.5"
        fill="none"
      />
      <text
        x="60"
        y="115"
        textAnchor="middle"
        fontSize="6"
        fontFamily="monospace"
        fill="currentColor"
      >
        EST 2013
      </text>
    </svg>
  )
}
