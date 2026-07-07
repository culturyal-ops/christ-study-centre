type HeroHeadlineProps = {
  lines: string[][]
}

export default function HeroHeadline({ lines }: HeroHeadlineProps) {
  return (
    <h1 className="csc-landing__hero-title">
      {lines.map((words, lineIndex) => (
        <span key={lineIndex} className="csc-split-line">
          <span className="csc-split-inner">
            {words.map((word, wordIndex) => (
              <span key={`${lineIndex}-${wordIndex}`} className="csc-split-word">
                {word}
                {wordIndex < words.length - 1 ? '\u00a0' : ''}
              </span>
            ))}
            {lineIndex === 1 && (
              <>
                {'\u00a0'}
                <span className="csc-scribble-wrap">
                  board exam
                  <svg
                    className="csc-scribble"
                    viewBox="0 0 180 32"
                    fill="none"
                    aria-hidden="true"
                    preserveAspectRatio="none"
                  >
                    <path
                      className="csc-scribble-path"
                      d="M2 24 C40 30, 80 18, 120 26 C140 30, 160 22, 178 18"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </>
            )}
          </span>
        </span>
      ))}
    </h1>
  )
}
