const words = ['Structured', 'coaching,', 'progress', 'you', 'can', 'see']

export default function LandingFeaturesTitle() {
  return (
    <h2 className="csc-landing__features-title">
      <span className="csc-feature-line">
        {words.slice(0, 2).map((word) => (
          <span key={word} className="csc-feature-word">
            {word}
          </span>
        ))}
      </span>
      <span className="csc-feature-line">
        {words.slice(2).map((word) => (
          <span key={word} className="csc-feature-word">
            {word}
          </span>
        ))}
      </span>
    </h2>
  )
}
