import SiteShell from '@/components/SiteShell'
import PageHeader from '@/components/PageHeader'
import PageSection from '@/components/PageSection'
import FeatureCard from '@/components/FeatureCard'
import InstitutionalStrip from '@/components/InstitutionalStrip'
import CTABand from '@/components/CTABand'
import { delayAttr } from '@/lib/motion'
import { images } from '@/lib/images'

const courses = [
  {
    title: 'Foundation',
    grades: 'Grades III to V',
    boards: ['CBSE', 'ICSE', 'SCERT'],
    subjects: ['Mathematics', 'English', 'Malayalam', 'Social Studies', 'Science'],
    features: [
      'Core reading and reasoning fundamentals',
      'Activity-based learning',
      'Regular assessments with feedback',
      'Monthly parent updates',
    ],
  },
  {
    title: 'High School',
    grades: 'Grades VIII to X',
    boards: ['CBSE', 'ICSE', 'SCERT'],
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Malayalam'],
    features: [
      'Board exam-focused preparation',
      'Conceptual clarity over rote learning',
      'Mock exams with performance analysis',
      'Weekly doubt clearing',
    ],
  },
  {
    title: 'Plus One',
    grades: 'Grade XI',
    boards: ['CBSE', 'SCERT'],
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Accountancy'],
    features: [
      'Stream-specific coaching',
      'Entrance exam orientation',
      'Regular practice tests',
      'Career counseling support',
    ],
  },
  {
    title: 'Plus Two',
    grades: 'Grade XII',
    boards: ['CBSE', 'SCERT'],
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Accountancy'],
    features: [
      'Board-exam intensive prep',
      'Previous year paper practice',
      'Intensive revision drills',
      'Entrance coaching integration',
    ],
  },
]

const specialProgrammes = [
  {
    idx: '01',
    title: 'One-on-One Tutoring',
    desc: 'Focused individual attention on specific subjects or chapters.',
  },
  {
    idx: '02',
    title: 'Vacation Batches',
    desc: 'Intensive revision during school holidays. Get ahead or catch up.',
  },
  {
    idx: '03',
    title: 'Online Sessions',
    desc: 'Live from home. Same teacher, same material, same rigour.',
  },
  {
    idx: '04',
    title: 'Doubt Clearing',
    desc: 'Dedicated sessions for specific problems or concepts in depth.',
  },
]

export default function CoursesPage() {
  return (
    <SiteShell>
      <PageHeader
        category="Programmes / All Grades"
        title="Courses & Programmes"
        lede="Structured coaching from foundation to board exams."
        subtitle="CBSE, ICSE, and SCERT. Grades III through XII. Each programme with its own pace, material, and testing cycle."
        image={images.coursesHero}
        imageAlt="Students studying at Christ Study Centre"
      />

      <InstitutionalStrip
        items={[
          { num: '01', label: '10 Grade Levels' },
          { num: '02', label: '3 Boards' },
          { num: '03', label: '15+ Subjects' },
          { num: '04', label: 'Mon – Sat Batches' },
        ]}
      />

      <PageSection index="01" category="Programmes" title="All grade levels">
        <div className="courses-detail-grid">
          {courses.map((course, idx) => (
            <div
              key={course.title}
              className="course-detail-card"
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
      </PageSection>

      <PageSection index="02" category="Beyond Classes" title="Special programmes" alt>
        <div className="feature-card-grid feature-card-grid-4">
          {specialProgrammes.map((prog, i) => (
            <FeatureCard
              key={prog.idx}
              index={prog.idx}
              title={prog.title}
              description={prog.desc}
              delay={i}
            />
          ))}
        </div>
      </PageSection>

      <PageSection
        index="03"
        category="Schedule"
        title="Class timings"
        description="Weekday evenings after school. One-on-one slots available on request."
      >
        <div className="timing-list" data-scroll-reveal>
          {[
            { label: 'Monday – Saturday', value: '4:00 PM – 8:00 PM' },
            { label: 'Batch duration', value: '1 hour per subject' },
            { label: 'Sunday', value: 'Closed' },
            { label: 'One-on-one slots', value: 'Flexible — contact us' },
          ].map((t) => (
            <div key={t.label} className="timing-row">
              <span>{t.label}</span>
              <span>{t.value}</span>
            </div>
          ))}
        </div>
      </PageSection>

      <CTABand
        title={
          <>
            Find the right
            <br />
            batch fit
          </>
        }
        description="Reach out and we'll match your child to the right programme and timing."
        primaryLabel="Get in touch →"
        primaryHref="/contact"
        secondaryLabel="WhatsApp →"
        secondaryHref="https://wa.me/919747110790"
        externalSecondary
      />
    </SiteShell>
  )
}
