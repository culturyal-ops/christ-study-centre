import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <div className="shell">
      <header style={{ position: 'relative' }}>
        <Navbar />
        
        <div className="mobile-links">
          <Link href="/" className="active">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/courses">Courses</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/login">Portal</Link>
        </div>

        <section className="hero">
          <Image
            src="/images/hero.jpg"
            alt="Christ Study Centre"
            fill
            priority
            className="hero-image"
            style={{ objectFit: 'cover' }}
          />
          <div className="hero-inner">
            <div className="hero-eyebrow">Grades III – XII · CBSE · ICSE · SCERT</div>
            <h1 className="hero-title">
              Where Pala's brightest <em>prepare</em> to lead.
            </h1>
            <p className="hero-sub">
              Twelve years of disciplined, personal coaching. Built for parents who want more than tuition.
            </p>
            <div className="hero-actions">
              <Link href="/contact" className="btn btn-solid">
                Enquire about admission &nbsp;→
              </Link>
              <Link href="/courses" className="hero-link">
                View course structure
              </Link>
            </div>
          </div>
          <svg className="hero-curve" viewBox="0 0 1440 90" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,90 L0,40 Q720,-30 1440,40 L1440,90 Z" fill="#0A1628" />
          </svg>
        </section>
      </header>

      <div className="stat-strip">
        <div className="stat">
          <div className="num">12+</div>
          <div className="lbl">Years educating<br />Pala's students</div>
        </div>
        <div className="stat">
          <div className="num">500+</div>
          <div className="lbl">Students guided<br />through board exams</div>
        </div>
        <div className="stat">
          <div className="num">3</div>
          <div className="lbl">Boards taught —<br />CBSE, ICSE, SCERT</div>
        </div>
        <div className="stat">
          <div className="num">1:8</div>
          <div className="lbl">Average teacher<br />to student ratio</div>
        </div>
      </div>

      <section>
        <div className="section-head">
          <div>
            <div className="eyebrow">Why parents choose us</div>
            <h2 className="section-title">Not a coaching factory.<br />A second classroom.</h2>
          </div>
          <p>
            Every batch is kept small enough that no child is anonymous. We track each student's weak topics by name, 
            not by roll number. And we tell parents the truth about where their child stands, every month.
          </p>
        </div>

        <div className="ledger">
          <div className="ledger-row">
            <div className="idx">01</div>
            <h3>Small batches, by design</h3>
            <div className="ledger-desc">
              Capped class sizes so every student is seen, corrected, and pushed. Not lost in a crowd of fifty.
            </div>
          </div>
          <div className="ledger-row">
            <div className="idx">02</div>
            <h3>Board-mapped curriculum</h3>
            <div className="ledger-desc">
              CBSE, ICSE and SCERT syllabi taught to the exam, with weekly worksheets and monthly mock tests.
            </div>
          </div>
          <div className="ledger-row">
            <div className="idx">03</div>
            <h3>Twelve years of results</h3>
            <div className="ledger-desc">
              A decade-plus track record across hundreds of families in Pala. Ask any parent on RV Road.
            </div>
          </div>
          <div className="ledger-row">
            <div className="idx">04</div>
            <h3>One-on-one when it matters</h3>
            <div className="ledger-desc">
              Dedicated doubt-clearing sessions, not a generic helpline. A teacher who knows the student's gaps.
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="split">
          <div className="photo-slot">
            <Image
              src="/images/study centre.jpg"
              alt="Christ Study Centre Building"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>

          <div className="story">
            <div className="eyebrow">Our story</div>
            <h2 className="section-title">From one rented room<br />to Pala's trusted name</h2>
            <p>
              Christ Study Centre opened in 2013 with a single mission: give every student in Pala access to serious, 
              structured coaching. Regardless of which school they came from.
            </p>
            <p>
              Twelve years on, we've grown into a fully-equipped institution that hundreds of families trust every year. 
              But the mission hasn't changed. We still know our students by name.
            </p>
            <blockquote>
              "They didn't just teach my daughter the syllabus. They taught her how to sit an exam without fear."
              <span>— Parent, Class X batch</span>
            </blockquote>
          </div>
        </div>
      </section>

      <section>
        <div className="section-head">
          <div>
            <div className="eyebrow">Campus</div>
            <h2 className="section-title">A space built<br />for focus</h2>
          </div>
          <p>
            Every room, from the reading hall to the classrooms, is designed around one goal. A child who can sit still and think clearly.
          </p>
        </div>

        <div className="photo-grid">
          <div className="photo-card">
            <div className="photo-frame">
              <Image
                src="/images/image.jpg"
                alt="Study Centre Classroom"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <h4>Modern Classrooms</h4>
            <span>Air-conditioned & spacious</span>
          </div>
          <div className="photo-card">
            <div className="photo-frame">
              <div className="ph-label">Classroom in session<br />4:5 portrait</div>
            </div>
            <h4>Small Batches</h4>
            <span>8-10 students per class</span>
          </div>
          <div className="photo-card">
            <div className="photo-frame">
              <div className="ph-label">Centre entrance<br />4:5 portrait</div>
            </div>
            <h4>Prime Location</h4>
            <span>52A, RV Road, Njondimakkal</span>
          </div>
        </div>
      </section>

      <section className="panel-dark">
        <div className="section-head">
          <div>
            <div className="eyebrow">Methodology</div>
            <h2 className="section-title">What makes us different</h2>
          </div>
          <p>
            Our teaching methodology is built around your child's success. From foundation concepts to board-exam execution.
          </p>
        </div>

        <div className="check-grid">
          <div className="check-item">
            <span className="mark">I</span>
            <p>Focus on mastering concepts, not rote memorisation</p>
          </div>
          <div className="check-item">
            <span className="mark">II</span>
            <p>Worksheets and assignment sheets, set every week</p>
          </div>
          <div className="check-item">
            <span className="mark">III</span>
            <p>Mock tests with detailed, student-by-student analysis</p>
          </div>
          <div className="check-item">
            <span className="mark">IV</span>
            <p>Systematic weekly tests and full monthly assessments</p>
          </div>
          <div className="check-item">
            <span className="mark">V</span>
            <p>Previous-year board question paper revision</p>
          </div>
          <div className="check-item">
            <span className="mark">VI</span>
            <p>One-on-one doubt-clearing sessions, on request</p>
          </div>
        </div>
      </section>

      <section>
        <div className="section-head">
          <div>
            <div className="eyebrow">Programmes</div>
            <h2 className="section-title">Courses by stage</h2>
          </div>
          <p>
            Structured progression from foundation years through board-exam preparation, each with its own pace and material.
          </p>
        </div>

        <div className="course-grid">
          <div className="course-card">
            <div className="grade">Grades III – V</div>
            <h3>Foundation</h3>
            <p>Building reading, reasoning and number-sense fundamentals before the syllabus gets demanding.</p>
            <Link href="/courses" className="more">
              View structure →
            </Link>
          </div>
          <div className="course-card">
            <div className="grade">Grades VI – X</div>
            <h3>Core curriculum</h3>
            <p>Full CBSE / ICSE / SCERT subject coverage, with board-pattern testing from Class VIII onward.</p>
            <Link href="/courses" className="more">
              View structure →
            </Link>
          </div>
          <div className="course-card">
            <div className="grade">Grades XI – XII</div>
            <h3>Board intensive</h3>
            <p>Exam-focused preparation, previous-year paper drills, and weekly performance tracking.</p>
            <Link href="/courses" className="more">
              View structure →
            </Link>
          </div>
        </div>
      </section>

      <section className="cta" style={{ borderBottom: '1px solid var(--line-dark)' }}>
        <div className="cta-inner">
          <div className="eyebrow">Limited seats this term</div>
          <h2>Ready to <em>begin</em>?</h2>
          <p>
            Visit us at 52A, RV Road, Njondimakkal, Pala. Or reach out and we'll find the right programme for your child.
          </p>
          <div className="cta-actions">
            <Link href="/contact" className="btn btn-solid">
              Contact us &nbsp;→
            </Link>
            <a href="https://wa.me/919747110790" target="_blank" rel="noopener noreferrer" className="btn">
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
