import Link from 'next/link'
import Navbar from '@/components/Navbar'
import PageHero from '@/components/PageHero'
import Footer from '@/components/Footer'
import InstitutionalStrip from '@/components/InstitutionalStrip'
import { SpreadSection } from '@/components/SectionSpread'
import { delayAttr } from '@/lib/motion'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1800&q=85&auto=format&fit=crop'

const courses = [
  {
    title: 'Foundation',
    grades: 'Grades III – V',
    boards: ['CBSE', 'ICSE', 'SCERT'],
    subjects: ['Mathematics', 'English', 'Malayalam', 'Social Studies', 'Science'],
    features: [
      'Building core reading and reasoning fundamentals',
      'Activity-based interactive learning',
      'Regular assessments with detailed feedback',
      'Monthly parent progress updates',
    ],
  },
  {
    title: 'High School',
    grades: 'Grades VIII – X',
    boards: ['CBSE', 'ICSE', 'SCERT'],
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Malayalam'],
    features: [
      'Board exam-focused preparation',
      'Conceptual clarity over rote learning',
      'Mock exams with detailed performance analysis',
      'Weekly doubt clearing sessions',
    ],
  },
  {
    title: 'Plus One',
    grades: 'Grade XI',
    boards: ['CBSE', 'SCERT'],
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Accountancy'],
    features: [
      'Stream-specific expert coaching',
      'Entrance exam orientation from day one',
      'Regular practice tests and tracking',
      'Career counseling support',
    ],
  },
  {
    title: 'Plus Two',
    grades: 'Grade XII',
    boards: ['CBSE', 'SCERT'],
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Accountancy'],
    features: [
      'Board-exam intensive preparation',
      'Previous year paper practice sessions',
      'Intensive revision and topic drills',
      'Entrance coaching integration',
    ],
  },
]

const specialProgrammes = [
  {
    mark: 'I',
    title: 'One-on-One Tutoring',
    desc: 'Personalised coaching for students who need focused individual attention on specific subjects or topics.',
  },
  {
    mark: 'II',
    title: 'Vacation Batches',
    desc: 'Intensive revision and advance learning programmes during school holidays. Get ahead or catch up.',
  },
  {
    mark: 'III',
    title: 'Online Sessions',
    desc: 'Attend class live from home. Same teacher, same material, same rigour as in-person batches.',
  },
  {
    mark: 'IV',
    title: 'Doubt Clearing',
    desc: 'Dedicated sessions for students who need to go over specific problems or concepts in depth.',
  },
]

const timings = [
  { label: 'Monday – Saturday', value: '4:00 PM – 8:00 PM' },
  { label: 'Batch duration', value: '1 hour per subject' },
  { label: 'Sunday', value: 'Closed' },
  { label: 'One-on-one slots', value: 'Flexible, contact us' },
]

export default function CoursesPage() {
  return (
    <div className="shell shell-grid">
      <header style={{ position: 'relative' }}>
        <Navbar />
        <PageHero
          size="mid"
          eyebrow="Programmes / All Grades"
          title={
            <>
              Courses &
              <br />
              <em>Programmes</em>
            </>
          }
          subtitle="Comprehensive coaching for CBSE, ICSE, and SCERT students from Grade III through XII."
          image={HERO_IMAGE}
          imageAlt="Books and study materials"
        />
      </header>

      <InstitutionalStrip
        items={[
          { num: '01', label: '10 Grade Levels' },
          { num: '02', label: '3 Boards' },
          { num: '03', label: '15+ Subjects' },
          { num: '04', label: 'Mon – Sat Batches' },
        ]}
      />

      <SpreadSection
        index="01"
        category="Programmes"
        title="All grade levels"
        description="Each programme is built around the specific demands of its grade band. The syllabus, pacing, and exam strategy all shift as the student progresses."
      >
        <div className="courses-detail-grid">
          {courses.map((course, idx) => (
            <div
              key={course.title}
              className="course-detail-card fly-card"
              data-scroll-reveal
              {...delayAttr(idx)}
            >
              <div className="course-detail-header">
                <h3>{course.title}</h3>
                <div className="grade">{course.grades}</div>
                <div className="course-detail-boards">
                  {course.boards.map((b) => (
                    <span key={b} className="course-detail-board">
                      {b}
                    </span>
                  ))}
                </div>
              </div>
              <div className="course-detail-body">
                <div className="course-detail-label">Subjects</div>
                <div className="course-detail-tags">
                  {course.subjects.map((s) => (
                    <span key={s} className="course-detail-tag">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="course-detail-label">What you get</div>
                <ul className="course-detail-features">
                  {course.features.map((f, i) => (
                    <li key={f} className="course-detail-feature">
                      <span className="idx">{String(i + 1).padStart(2, '0')}</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </SpreadSection>

      <SpreadSection
        index="02"
        category="Beyond Classes"
        title="Special programmes"
        lede="For students who need a different pace or format."
        description="These run alongside or independent of the regular batch schedule."
        dark
      >
        <div className="check-grid">
          {specialProgrammes.map((prog, i) => (
            <div
              key={prog.title}
              className="check-item fly-card"
              data-scroll-reveal
              {...delayAttr(i)}
            >
              <span className="mark">{prog.mark}</span>
              <div>
                <p style={{ fontWeight: 500, marginBottom: '6px', fontSize: '16px' }}>
                  {prog.title}
                </p>
                <p>{prog.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </SpreadSection>

      <SpreadSection
        index="03"
        category="Schedule"
        title="Class timings"
        description="Batches run on weekday evenings so students can attend after school. Flexible one-on-one slots are available on request."
        alt
      >
        <div className="ledger" style={{ maxWidth: '640px' }}>
          {timings.map((t, i) => (
            <div
              key={t.label}
              className="ledger-row fly-card"
              data-scroll-reveal
              {...delayAttr(i)}
              style={{ gridTemplateColumns: '1fr auto' }}
            >
              <h3 style={{ fontSize: '17px', fontFamily: 'var(--font-body)', fontWeight: 500 }}>
                {t.label}
              </h3>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  color: 'var(--muted-gold)',
                  whiteSpace: 'nowrap',
                }}
              >
                {t.value}
              </div>
            </div>
          ))}
        </div>
      </SpreadSection>

      <section className="cta">
        <div className="cta-inner" data-scroll-reveal>
          <div className="spread-label cta-label">Admissions / 2026–27</div>
          <h2>
            Find the right
            <br />
            <em>batch fit</em>
          </h2>
          <p>
            Reach out now and we&apos;ll match your child to the right grade programme, subjects,
            and timing.
          </p>
          <div className="cta-actions">
            <Link href="/contact" className="btn btn-solid btn-motion">
              Get in touch →
            </Link>
            <a
              href="https://wa.me/919747110790"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-motion"
            >
              WhatsApp →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
