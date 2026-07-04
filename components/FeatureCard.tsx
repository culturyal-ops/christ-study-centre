import { delayAttr } from '@/lib/motion'

interface FeatureCardProps {
  index: string
  title: string
  description: string
  delay?: number
}

export default function FeatureCard({
  index,
  title,
  description,
  delay = 0,
}: FeatureCardProps) {
  return (
    <article className="csc-card" data-scroll-reveal {...delayAttr(delay)}>
      <span className="csc-card__num" aria-hidden="true">
        {index}
      </span>
      <h3 className="csc-card__title">{title}</h3>
      <p className="csc-card__desc">{description}</p>
    </article>
  )
}
