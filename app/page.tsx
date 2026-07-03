import Link from 'next/link'
import Navbar from '@/components/Navbar'
import HomeHero from '@/components/HomeHero'
import Footer from '@/components/Footer'
import { SpreadSection } from '@/components/SectionSpread'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1800&q=85&auto=format&fit=crop'

const systemProof = [
  { num: '01', label: 'Weekly Tests' },
  { num: '02', label: 'Chapter Tracking' },
  { num: '03', label: 'Parent Updates' },
  { num: '04', label: 'Board-Focused Revision' },
]

const progressCycle = [
  { num: '01', step: 'Teach' },
  { num: '02', step: 'Test' },
  { num: '03', step: 'Review' },
  { num: '04', step: 'Correct' },
  { num: '05', step: 'Revise' },
]

const courses = [
  {
    num: '01',
    title: 'Foundation',
    grades: 'Grades III – V',
    desc: 'Reading, reasoning, and number-sense fundamentals. CBSE, ICSE, and SCERT.',
  },
  {
    num: '02',
    title: 'High School',
    grades: 'Grades VIII – X',
    desc: 'Full subject coverage with board-pattern testing and weekly worksheets.',
  },
  {
    num: '03',
    title: 'Plus One',
    grades: 'Grade XI',
    desc: 'Science and commerce streams with structured chapter tracking.',
  },
  {
    num: '04',
    title: 'Plus Two',
    grades: 'Grade XII',
    desc: 'Board-intensive preparation with previous-year paper drills.',
  },
  {
    num: '05',
    title: 'One-on-One',
    grades: 'All grades',
    desc: 'Focused correction on specific chapters or subjects.',
  },
  {
    num: '06',
    title: 'Vacation Batches',
    grades: 'Seasonal',
    desc: 'Intensive revision cycles during school breaks.',
  },
]

const methodSteps = [
  {
    num: '01',
    title: 'Diagnose',
    desc: 'Weak chapters identified before the batch begins — not after the first test.',
  },
  {
    num: '02',
    title: 'Structure',
    desc: 'Fixed lessons, worksheets, tests, and revision slots every week.',
  },
  {
    num: '03',
    title: 'Measure',
    desc: 'Marks, attendance, and progress sheets — visible to parents monthly.',
  },
  {
    num: '04',
    title: 'Correct',
    desc: 'Weak areas revised before they become exam fear.',
  },
]

const progressReports = [
  {
    ref: 'Report · Class X',
    subject: 'Mathematics',
    before: '54%',
    final: '86%',
    gain: '+32%',
  },
  {
    ref: 'Report · Class X',
    subject: 'Science',
    before: '61%',
    final: '88%',
    gain: '+27%',
  },
  {
    ref: 'Report · Class XII',
    subject: 'Physics',
    before: '48%',
    final: '79%',
    gain: '+31%',
  },
]

const faculty = [
  {
    subject: 'Mathematics',
    name: 'Mr. Rajan',
    experience: '12 years',
    focus: 'Board exam numericals and structured problem-solving.',
  },
  {
    subject: 'Physics',
    name: 'Ms. Lakshmi',
    experience: '10 years',
    focus: 'Mechanics, numericals, and weekly test analysis.',
  },
  {
    subject: 'Chemistry',
    name: 'Mr. Thomas',
    experience: '11 years',
    focus: 'Concept-first teaching and previous-year paper drills.',
  },
  {
    subject: 'English',
    name: 'Ms. Mary',
    experience: '9 years',
    focus: 'Grammar, composition, and literature — same rigour as science.',
  },
  {
    subject: 'Biology',
    name: 'Ms. Sheela',
    experience: '8 years',
    focus: 'Diagram-based learning and NCERT-aligned revision.',
  },
  {
    subject: 'Computer Science',
    name: 'Mr. Anil',
    experience: '7 years',
    focus: 'Programming logic and board theory for Plus One & Two.',
  },
]

const batches = [
  {
    classLabel: '10',
    subject: 'Mathematics',
    days: 'Mon / Wed / Fri',
    time: '5:00 PM',
  },
  {
    classLabel: '10',
    subject: 'Science',
    days: 'Tue / Thu / Sat',
    time: '5:00 PM',
  },
  {
    classLabel: '12',
    subject: 'Physics',
    days: 'Mon / Wed / Fri',
    time: '6:30 PM',
  },
  {
    classLabel: '12',
    subject: 'Chemistry',
    days: 'Tue / Thu / Sat',
    time: '6:30 PM',
  },
  {
    classLabel: '8–10',
    subject: 'English',
    days: 'Mon – Sat',
    time: '4:00 PM',
  },
]

const parentPoints = [
  'Monthly progress reports — test scores, attendance, and weak chapters',
  'Weak areas flagged before they become a pattern',
  'Direct line to the academic coordinator, not a generic helpline',
  'Honest batch-fit assessment during the counselling call',
]

const delayClass = (i: number) =>
  ['', 'animate-delay-1', 'animate-delay-2', 'animate-delay-3', 'animate-delay-4'][
    Math.min(i + 1, 4)
  ]

export default function HomePage() {
  return (
    <div className="shell">
      <div className="hero-wrap">
        <Navbar />
        <HomeHero
          image={HERO_IMAGE}
          imageAlt="Notebook, pencil, and study materials"
        />
      </div>

      {/* Institutional proof — systems, not stats */}
      <div className="institutional-strip">
        {systemProof.map((item, i) => (
          <div
            key={item.num}
            className={`institutional-item animate-fade-in ${delayClass(i)}`}
          >
            <span className="institutional-num">{item.num}</span>
            <span className="institutional-label">{item.label}</span>
          </div>
        ))}
      </div>

      {/* 01 / Courses */}
      <SpreadSection
        id="courses"
        index="01"
        category="Programmes"
        title="Courses by stage"
        lede="Structured progression from foundation through board exams."
        description="CBSE, ICSE, and SCERT — each programme with its own pace, material, and testing cycle. Small batches by design."
      >
        <div className="course-index">
          {courses.map((course, i) => (
            <div
              key={course.num}
              className={`course-index-row animate-fade-in ${delayClass(i)}`}
            >
              <div className="course-index-num">{course.num}</div>
              <div>
                <div className="course-index-title">{course.title}</div>
                <div className="course-index-meta">{course.grades}</div>
                <div className="course-index-desc">{course.desc}</div>
              </div>
              <Link href="/courses" className="course-index-link">
                View batch →
              </Link>
            </div>
          ))}
        </div>
      </SpreadSection>

      {/* 02 / Method + progress cycle */}
      <SpreadSection
        index="02"
        category="Academic System"
        title="The method"
        lede="Teach. Test. Review. Correct. Repeat."
        description="Every batch follows the same academic cycle. Not random tuition — a system parents can see working."
        dark
      >
        <div className="progress-cycle animate-fade-in animate-delay-1">
          <div className="progress-cycle-header">
            <span className="progress-cycle-label">Student Progress Cycle</span>
          </div>
          <div className="progress-cycle-track">
            {progressCycle.map((item, i) => (
              <div key={item.num} className="progress-cycle-step">
                <span className="progress-cycle-num">{item.num}</span>
                <span className="progress-cycle-name">{item.step}</span>
                {i < progressCycle.length - 1 && (
                  <span className="progress-cycle-arrow" aria-hidden="true">
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="ledger ledger-spaced">
          {methodSteps.map((step, i) => (
            <div
              key={step.num}
              className={`ledger-row animate-fade-in ${delayClass(i)}`}
            >
              <div className="idx">{step.num}</div>
              <h3>{step.title}</h3>
              <div className="ledger-desc">{step.desc}</div>
            </div>
          ))}
        </div>
      </SpreadSection>

      {/* 03 / Results — improvement reports */}
      <SpreadSection
        id="results"
        index="03"
        category="Progress"
        title="Improvement, measured"
        lede="Results are built — not announced."
        description="Students who follow the revision cycle improve with every test. Progress reports track the journey, not just the final mark."
        alt
      >
        <p className="spread-disclaimer animate-fade-in animate-delay-1">
          Representative progress patterns · anonymised · Class X & XII batches
        </p>
        <div className="report-grid">
          {progressReports.map((report, i) => (
            <article
              key={`${report.ref}-${report.subject}`}
              className={`report-card animate-fade-in ${delayClass(i)}`}
            >
              <header className="report-header">
                <span className="report-ref">{report.ref}</span>
                <span className="report-subject">{report.subject}</span>
              </header>
              <div className="report-metrics">
                <div className="report-metric">
                  <span className="report-metric-label">Before</span>
                  <span className="report-metric-value">{report.before}</span>
                </div>
                <div className="report-metric">
                  <span className="report-metric-label">Final</span>
                  <span className="report-metric-value report-metric-final">
                    {report.final}
                  </span>
                </div>
                <div className="report-metric report-metric-gain">
                  <span className="report-metric-label">Improvement</span>
                  <span className="report-metric-value">{report.gain}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
        <blockquote className="report-quote animate-fade-in animate-delay-2">
          &ldquo;They didn&apos;t just teach my daughter the syllabus. They taught
          her how to sit an exam without fear.&rdquo;
          <span>— Parent, Class X batch</span>
        </blockquote>
      </SpreadSection>

      {/* 04 / Faculty — typographic authority */}
      <SpreadSection
        id="faculty"
        index="04"
        category="Faculty"
        title="Subject specialists"
        lede="Teachers who organise difficult chapters."
        description="Each subject is taught by someone who knows the board pattern, the common mistakes, and how to make a chapter feel structured."
      >
        <div className="faculty-type-grid">
          {faculty.map((member, i) => (
            <article
              key={member.subject}
              className={`faculty-type-card animate-fade-in ${delayClass(i)}`}
            >
              <div className="faculty-type-label">Faculty / {member.subject}</div>
              <h3 className="faculty-type-name">{member.name}</h3>
              <div className="faculty-type-exp">{member.experience} teaching</div>
              <p className="faculty-type-focus">{member.focus}</p>
            </article>
          ))}
        </div>
      </SpreadSection>

      {/* 05 / Batches */}
      <SpreadSection
        id="batches"
        index="05"
        category="Schedule"
        title="Batch timetable"
        lede="2026–27 academic year"
        description="Mon – Sat, 4:00 PM – 8:00 PM. One hour per subject. Sunday closed. Begin with a counselling call to confirm batch fit."
        alt
      >
        <div className="batch-table-wrap animate-fade-in animate-delay-1">
          <table className="batch-table batch-table-refined">
            <thead>
              <tr>
                <th>Class</th>
                <th>Subject</th>
                <th>Days</th>
                <th>Time</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {batches.map((batch) => (
                <tr key={`${batch.classLabel}-${batch.subject}`}>
                  <td>
                    <span className="batch-class">{batch.classLabel}</span>
                  </td>
                  <td className="batch-subject">{batch.subject}</td>
                  <td>
                    <span className="batch-days">{batch.days}</span>
                  </td>
                  <td className="batch-time">{batch.time}</td>
                  <td className="batch-action">
                    <a
                      href="https://wa.me/919747110790"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="batch-enquire"
                    >
                      Enquire →
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SpreadSection>

      {/* 06 / Parents — emotional trust */}
      <SpreadSection
        id="parents"
        index="06"
        category="For Parents"
        title="For parents who want clarity"
        lede="No guessing whether the student is improving."
        description="Attendance, test performance, weak chapters, and revision progress are communicated clearly — every month."
      >
        <div className="parent-spread">
          <div className="parent-emphasis animate-fade-in animate-delay-1">
            <p>
              You shouldn&apos;t have to wonder where your child stands. Our job
              is to make progress visible — not promise miracles.
            </p>
          </div>
          <div className="parent-list">
            {parentPoints.map((point, i) => (
              <div
                key={point}
                className={`parent-list-item animate-fade-in ${delayClass(i)}`}
              >
                <div className="num">{String(i + 1).padStart(2, '0')}</div>
                <p>{point}</p>
              </div>
            ))}
          </div>
        </div>
      </SpreadSection>

      {/* Admissions CTA */}
      <section className="cta">
        <div className="cta-inner animate-fade-in">
          <div className="spread-label cta-label">Admissions / 2026–27</div>
          <h2>
            Begin with a
            <br />
            <em>counselling call</em>
          </h2>
          <p>
            We&apos;ll understand the student&apos;s current level, subjects,
            goals, and batch fit. 52A, RV Road, Njondimakkal, Pala — or reach
            out directly.
          </p>
          <div className="cta-actions">
            <Link href="/contact" className="btn btn-solid">
              Enquire for admission →
            </Link>
            <a
              href="https://wa.me/919747110790"
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
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
