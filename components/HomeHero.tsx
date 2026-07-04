import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { images } from '@/lib/images'

export default function HomeHero() {
  return (
    <section className="home-hero" id="hero">
      <Navbar />
      <div className="site-container home-hero__grid">
        <div className="home-hero__text">
          <p className="home-hero__kicker">Est. 2013, Pala, Kerala</p>
          <h1 className="home-hero__title">
            Board exam coaching for CBSE, ICSE and SCERT students
          </h1>
          <p className="home-hero__body">
            Weekly tests, chapter tracking and monthly progress reports. Small batches
            from Grade 3 through Grade 12.
          </p>
          <div className="home-hero__actions">
            <Link href="/contact" className="home-btn home-btn--fill">
              Enquire for admission
            </Link>
            <Link href="/courses" className="home-btn home-btn--line">
              View courses
            </Link>
          </div>
        </div>

        <div className="home-hero__visual">
          <div className="home-hero__photo-wrap">
            <div className="home-hero__photo-bg" aria-hidden="true" />
            <div className="home-hero__photo">
              <Image
                src={images.heroClassroom}
                alt="Students at Christ Study Centre"
                fill
                priority
                sizes="(max-width: 767px) 100vw, 46vw"
                className="home-hero__img"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
