import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

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

export default function CoursesPage() {
  return (
    <div className="shell">
      <header style={{ position: 'relative' }}>
        <Navbar />
        <div className="mobile-links">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/courses" className="active">Courses</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/login">Portal</Link>
        </div>
        <section className="hero" style={{ height: '70vh', minHeight: '480px', maxHeight: '640px' }}>
          <Image
            src="/images/hero.jpg"
            alt="Christ Study Centre Courses"
            fill
            priority
            className="hero-image"
            style={{ objectFit: 'cover' }}
          />
          <div className="hero-inner">
            <div className="hero-eyebrow">What we offer</div>
            <h1 className="hero-title">
              Courses &<br /><em>Programmes</em>
            </h1>
            <p className="hero-sub">
              Comprehensive coaching for CBSE, ICSE & SCERT students from Grade III through XII.
            </p>
          </div>
          <svg className="hero-curve" viewBox="0 0 1440 90" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,90 L0,40 Q720,-30 1440,40 L1440,90 Z" fill="#0A1628" />
          </svg>
        </section>
      </header>

      <div className="stat-strip">
        <div className="stat"><div className="num">10</div><div className="lbl">Grade levels<br />covered</div></div>
        <div className="stat"><div className="num">3</div><div className="lbl">Boards<br />CBSE, ICSE, SCERT</div></div>
        <div className="stat"><div className="num">15+</div><div className="lbl">Subjects<br />taught</div></div>
        <div className="stat"><div className="num">1:8</div><div className="lbl">Teacher to<br />student ratio</div></div>
      </div>

      {/* Core Programmes */}
      <section>
        <div className="section-head">
          <div>
            <div className="eyebrow">Core programmes</div>
            <h2 className="section-title">All grade levels</h2>
          </div>
          <p>
            Each programme is built around the specific demands of its grade band. The syllabus, pacing, 
            and exam strategy all shift as the student progresses.
          </p>
        </div>

        <div className="courses-detail-grid">
          {courses.map((course) => (
            <div key={course.title} className="course-detail-card">
              <div className="course-detail-header">
                <h3>{course.title}</h3>
                <div className="grade">{course.grades}</div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
                  {course.boards.map((b) => (
                    <span key={b} style={{
                      fontSize: '11px',
                      padding: '3px 10px',
                      border: '1px solid rgba(232,226,208,0.3)',
                      color: 'rgba(232,226,208,0.7)',
                      fontFamily: 'var(--font-mono)',
                      letterSpacing: '0.08em',
                    }}>{b}</span>
                  ))}
                </div>
              </div>
              <div className="course-detail-body">
                <div style={{ marginBottom: '24px' }}>
                  <div style={{
                    fontSize: '10px',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: 'var(--gold)',
                    marginBottom: '12px',
                  }}>Subjects</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {course.subjects.map((s) => (
                      <span key={s} style={{
                        fontSize: '12.5px',
                        padding: '4px 12px',
                        background: 'rgba(201,168,76,0.08)',
                        border: '1px solid var(--line)',
                        color: 'var(--navy)',
                      }}>{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <div style={{
                    fontSize: '10px',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: 'var(--gold)',
                    marginBottom: '12px',
                  }}>What you get</div>
                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {course.features.map((f, i) => (
                      <li key={f} style={{ display: 'flex', gap: '14px', fontSize: '14px', lineHeight: '1.65', color: '#4a4a3e' }}>
                        <span style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '11px',
                          color: 'var(--gold)',
                          flexShrink: 0,
                          paddingTop: '2px',
                        }}>{String(i + 1).padStart(2, '0')}</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Special Programmes */}
      <section className="panel-dark">
        <div className="section-head">
          <div>
            <div className="eyebrow">Beyond regular classes</div>
            <h2 className="section-title">Special<br />programmes</h2>
          </div>
          <p>
            For students who need a different pace or format. These programmes run alongside or independent 
            of the regular batch schedule.
          </p>
        </div>
        <div className="check-grid">
          <div className="check-item">
            <span className="mark">I</span>
            <div>
              <p style={{ fontWeight: 500, marginBottom: '6px', fontSize: '16px' }}>One-on-One Tutoring</p>
              <p>Personalised coaching for students who need focused individual attention on specific subjects or topics.</p>
            </div>
          </div>
          <div className="check-item">
            <span className="mark">II</span>
            <div>
              <p style={{ fontWeight: 500, marginBottom: '6px', fontSize: '16px' }}>Vacation Batches</p>
              <p>Intensive revision and advance learning programmes during school holidays. Get ahead or catch up.</p>
            </div>
          </div>
          <div className="check-item">
            <span className="mark">III</span>
            <div>
              <p style={{ fontWeight: 500, marginBottom: '6px', fontSize: '16px' }}>Online Sessions</p>
              <p>Attend class live from home. Same teacher, same material, same rigour as in-person batches.</p>
            </div>
          </div>
          <div className="check-item">
            <span className="mark">IV</span>
            <div>
              <p style={{ fontWeight: 500, marginBottom: '6px', fontSize: '16px' }}>Doubt Clearing</p>
              <p>Dedicated sessions for students who need to go over specific problems or concepts in depth.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timings */}
      <section>
        <div className="section-head">
          <div>
            <div className="eyebrow">Schedule</div>
            <h2 className="section-title">Class timings</h2>
          </div>
          <p>
            Batches run on weekday evenings so students can attend after school. Flexible one-on-one 
            slots are available on request.
          </p>
        </div>
        <div className="ledger" style={{ maxWidth: '640px' }}>
          {[
            { label: 'Monday – Saturday', value: '4:00 PM – 8:00 PM' },
            { label: 'Batch duration', value: '1 hour per subject' },
            { label: 'Sunday', value: 'Closed' },
            { label: 'One-on-one slots', value: 'Flexible, contact us' },
          ].map((t) => (
            <div key={t.label} className="ledger-row" style={{ gridTemplateColumns: '1fr auto' }}>
              <h3 style={{ fontSize: '17px', fontFamily: 'var(--font-body)', fontWeight: 500 }}>{t.label}</h3>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--gold)' }}>{t.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta" style={{ borderBottom: '1px solid var(--line-dark)' }}>
        <div className="cta-inner">
          <div className="eyebrow">Limited seats this term</div>
          <h2>Enrol<br /><em>today</em></h2>
          <p>
            Seats fill quickly each term. Reach out now to find the right batch for your child.
          </p>
          <div className="cta-actions">
            <Link href="/contact" className="btn btn-solid">Get in touch &nbsp;→</Link>
            <a href="https://wa.me/919747110790" target="_blank" rel="noopener noreferrer" className="btn">
              WhatsApp us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
