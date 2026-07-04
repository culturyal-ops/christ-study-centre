import Image from 'next/image'
import { images } from '@/lib/images'

export default function LandingHeroVisual() {
  return (
    <div className="csc-landing__hero-visual">
      <figure className="csc-landing__hero-shot csc-landing__hero-shot--back">
        <div className="csc-landing__hero-shot-inner" data-shot="back">
          <Image
            src={images.heroVisualBack}
            alt="Science demonstration in class at Christ Study Centre"
            fill
            sizes="(max-width: 767px) 46vw, 260px"
            className="csc-landing__hero-shot-media"
          />
        </div>
      </figure>

      <figure className="csc-landing__hero-shot csc-landing__hero-shot--main">
        <div className="csc-landing__hero-shot-inner" data-shot="main">
          <Image
            src={images.heroVisualMain}
            alt="Teacher explaining board concepts at Christ Study Centre"
            fill
            priority
            sizes="(max-width: 767px) 58vw, 340px"
            className="csc-landing__hero-shot-media"
          />
        </div>
      </figure>

      <figure className="csc-landing__hero-shot csc-landing__hero-shot--front">
        <div className="csc-landing__hero-shot-inner" data-shot="front">
          <Image
            src={images.heroVisualFront}
            alt="Students studying together at Christ Study Centre"
            fill
            sizes="(max-width: 767px) 44vw, 220px"
            className="csc-landing__hero-shot-media"
          />
        </div>
      </figure>
    </div>
  )
}
