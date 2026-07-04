import Image from 'next/image'
import { delayAttr } from '@/lib/motion'
import { images } from '@/lib/images'

const photos = [
  {
    src: images.classroomQuadraticLesson,
    alt: 'Teacher explaining quadratic equations on the whiteboard at Christ Study Centre',
    title: 'Board teaching',
    caption: 'Concept-first lessons with step-by-step whiteboard work.',
  },
  {
    src: images.classroomMain,
    alt: 'Air-conditioned classroom with interactive display and seated rows at Christ Study Centre',
    title: 'Smart classroom',
    caption: 'AC rooms with digital board and focused seating.',
  },
  {
    src: images.classroomInterior,
    alt: 'Bright study hall with writing desks, teacher desk and natural light',
    title: 'Study hall',
    caption: 'Quiet batches with desk space for every student.',
  },
  {
    src: images.classroomChairs,
    alt: 'Red study chairs with attached wooden writing tablets',
    title: 'Writing desks',
    caption: 'Comfortable seating built for long revision sessions.',
  },
] as const

export default function FacilityGallery() {
  return (
    <div className="csc-facility-gallery photo-grid">
      {photos.map((photo, i) => (
        <article
          key={photo.title}
          className="photo-card"
          data-scroll-reveal
          data-reveal="scale"
          {...delayAttr(i)}
        >
          <div className="photo-frame">
            <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 760px) 100vw, 33vw" />
          </div>
          <h4>{photo.title}</h4>
          <span>{photo.caption}</span>
        </article>
      ))}
    </div>
  )
}
