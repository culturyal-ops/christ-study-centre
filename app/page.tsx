import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ArrowRight, CheckCircle } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="shell">
      {/* Margin Column */}
      <div className="margin-col">
        <div className="margin-label">
          <span>Est. 2013 · Pala, Kerala</span>
        </div>
      </div>

      {/* Main Content */}
      <div>
        <Navbar />

        {/* Mobile nav links */}
        <div className="mobile-links">
          <Link href="#" className="active">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/courses">Courses</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/login">Portal</Link>
        </div>

        {/* Hero */}
        <section className="hero">
          <div className="eyebrow">Grades III – XII · CBSE · ICSE · SCERT</div>
          <h1 className="hero-title">
            Where Pala's brightest <em>prepare</em> to lead.
          </h1>
          <p className="hero-sub">
            Twelve years of disciplined, personal coaching — built for parents who want more than tuition. 
            We want a place at the top for every child who walks through our door.
          </p>
          <div className="hero-actions">
            <Link href="/contact" className="btn btn-solid">
              Enquire about admission &nbsp;→
            </Link>
            <Link href="/courses" style={{ fontSize: '13px', borderBottom: '1px solid var(--line)', paddingBottom: '2px' }}>
              View course structure
            </Link>
          </div>

          {/* Stats */}
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
        </section>

        {/* Why Parents Choose Us */}
        <section>
          <div className="section-head">
            <div>
              <div className="eyebrow">Why parents choose us</div>
              <h2 className="section-title">Not a coaching factory.<br />A second classroom.</h2>
            </div>
            <p>
              Every batch is kept small enough that no child is anonymous. We track each student's weak topics by name, 
              not by roll number — and we tell parents the truth about where their child stands, every month.
            </p>
          </div>

          <div className="ledger">
            <div className="ledger-row">
              <div className="idx">01</div>
              <h3>Small batches, by design</h3>
              <div className="ledger-desc">
                Capped class sizes so every student is seen, corrected, and pushed — not lost in a crowd of fifty.
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
                A decade-plus track record across hundreds of families in Pala — ask any parent on RV Road.
              </div>
            </div>
            <div className="ledger-row">
              <div className="idx">04</div>
              <h3>One-on-one when it matters</h3>
              <div className="ledger-desc">
                Dedicated doubt-clearing sessions, not a generic helpline — a teacher who knows the student's gaps.
              </div>
            </div>
          </div>
        </section>

        {/* Story Split */}
        <section>
          <div className="split">
            {/* Photo placeholder */}
            <div style={{
              aspectRatio: '4/5',
              background: 'repeating-linear-gradient(45deg, rgba(10,22,40,0.05) 0 2px, transparent 2px 14px), var(--navy)',
              border: '1px solid var(--line)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                textAlign: 'center',
                color: 'rgba(255,255,255,0.55)',
                padding: '0 30px'
              }}>
                Photo slot — centre building<br />or classroom in session<br />(4:5 portrait)
              </span>
              <span style={{ position: 'absolute', top: '14px', left: '14px', width: '18px', height: '18px', border: '1px solid var(--gold)', borderRight: 'none', borderBottom: 'none' }}></span>
              <span style={{ position: 'absolute', bottom: '14px', right: '14px', width: '18px', height: '18px', border: '1px solid var(--gold)', borderLeft: 'none', borderTop: 'none' }}></span>
            </div>

            <div>
              <div className="eyebrow">Our story</div>
              <h2 className="section-title">From one rented room<br />to Pala's trusted name</h2>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: 'rgba(10,22,40,0.75)', marginBottom: '16px', marginTop: '24px' }}>
                Christ Study Centre opened in 2013 with a single mission: give every student in Pala access to serious, 
                structured coaching — regardless of which school they came from.
              </p>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: 'rgba(10,22,40,0.75)', marginBottom: '16px' }}>
                Twelve years on, we've grown into a fully-equipped institution that hundreds of families trust every year — 
                but the mission hasn't changed. We still know our students by name.
              </p>
              <blockquote style={{
                marginTop: '28px',
                paddingLeft: '20px',
                borderLeft: '2px solid var(--gold)',
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: '17px',
                lineHeight: '1.6',
                color: 'var(--navy-mid)'
              }}>
                "They didn't just teach my daughter the syllabus. They taught her how to sit an exam without fear."
              </blockquote>
            </div>
          </div>
        </section>

        {/* Methodology Panel */}
        <section className="panel-dark">
          <div className="section-head">
            <div>
              <div className="eyebrow">Methodology</div>
              <h2 className="section-title">What makes us different</h2>
            </div>
            <p>
              Our teaching methodology is built around your child's success — from foundation concepts to board-exam execution.
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

        {/* Courses */}
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
              <Link href="/courses" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '20px', fontSize: '12.5px', borderBottom: '1px solid var(--line)', paddingBottom: '2px' }}>
                View structure →
              </Link>
            </div>
            <div className="course-card">
              <div className="grade">Grades VI – X</div>
              <h3>Core curriculum</h3>
              <p>Full CBSE / ICSE / SCERT subject coverage, with board-pattern testing from Class VIII onward.</p>
              <Link href="/courses" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '20px', fontSize: '12.5px', borderBottom: '1px solid var(--line)', paddingBottom: '2px' }}>
                View structure →
              </Link>
            </div>
            <div className="course-card">
              <div className="grade">Grades XI – XII</div>
              <h3>Board intensive</h3>
              <p>Exam-focused preparation, previous-year paper drills, and weekly performance tracking.</p>
              <Link href="/courses" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '20px', fontSize: '12.5px', borderBottom: '1px solid var(--line)', paddingBottom: '2px' }}>
                View structure →
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta">
          <div className="eyebrow">Limited seats this term</div>
          <h2>Ready to begin?</h2>
          <p>
            Visit us at 52A, RV Road, Njondimakkal, Pala — or reach out and we'll find the right programme for your child.
          </p>
          <div className="cta-actions">
            <Link href="/contact" className="btn btn-solid">Contact us &nbsp;→</Link>
            <a href="https://wa.me/919747110790" target="_blank" rel="noopener noreferrer" className="btn">
              WhatsApp
            </a>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  )
}
