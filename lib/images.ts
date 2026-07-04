/** Curated Unsplash photos for Christ Study Centre */

function unsplash(id: string, width = 1200) {
  return `https://images.unsplash.com/${id}?w=${width}&q=85&auto=format&fit=crop`
}

export const images = {
  /** Students in a classroom */
  heroClassroom: unsplash('photo-1524178232363-1fb2b075b655'),
  /** Full-bleed hero background — campus / school mood */
  heroBleed: unsplash('photo-1580582936305-c7864c214266', 1920),
  /** Hero visual cluster — carousel photos */
  heroVisualMain: '/images/classroom-quadratic-lesson.png',
  heroVisualBack: '/images/hero-carousel-science-class.png',
  heroVisualFront: '/images/hero-carousel-study-group.png',
  /** Small card / UI photo — live batch widget */
  heroCard: '/images/classroom-quadratic-lesson.png',
  /** Campus / graduation mood for portal */
  login: unsplash('photo-1523050854058-8df90110c9f1', 1400),
  /** About story — Christ Tuition Centre building, Pala */
  aboutStory: '/images/christ-tuition-centre-building.png',
  /** Courses — students studying together */
  coursesHero: unsplash('photo-1509062528460-231596006791a'),
  /** Contact — collaborative study */
  contactHero: unsplash('photo-1522202176988-66273c2fd55f'),
  /** Facility / study environment — main classroom with smart board */
  studySpace: '/images/classroom-main.png',
  /** Real campus photos */
  classroomMain: '/images/classroom-main.png',
  classroomInterior: '/images/classroom-interior.png',
  classroomChairs: '/images/classroom-chairs.png',
  /** Teacher at whiteboard — quadratic equations lesson */
  classroomQuadraticLesson: '/images/classroom-quadratic-lesson.png',
  /** Books and learning */
  library: unsplash('photo-1481627834876-b7833e8f5570'),
} as const
