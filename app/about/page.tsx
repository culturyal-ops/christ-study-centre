import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import PageHero from '@/components/PageHero'
import Footer from '@/components/Footer'

// About page: Kerala-feel exterior, warm afternoon light, green foliage
const HERO_IMAGE = 'https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=1800&q=85&auto=format&fit=crop'

export default function AboutPage() {
  return (
    <div className="shell">
      <header style={{ position: 'relative' }}>
        <Navbar />
        <PageHero
          size="mid"
          eyebrow="Est. 2013 · 12 Years"
          title={<>About Christ <em>Study Centre</em></>}
          subtitle="Transforming education in Pala, Kerala with personal coaching and proven results."
          image={HERO_IMAGE}
          imageAlt="About Christ Study Centre"
        />
      </header>

      <div className="stat-strip">
        <div className="stat"><div className="num">2013</div><div className="lbl">Founded in<br />Pala, Kerala</div></div>
        <div className="stat"><div className="num">12+</div><div className="lbl">Years of<br />excellence</div></div>
        <div className="stat"><div className="num">500+</div><div className="lbl">Students<br />coached</div></div>
        <div className="stat"><div className="num">3</div><div className="lbl">Boards<br />covered</div></div>
      </div>

      <section>
        <div className="split">
          <div className="photo-slot">
            <Image src="/images/image.jpg" alt="Christ Study Centre" fill style={{ objectFit: 'cover' }} />
          </div>
          <div className="story">
            <div className="eyebrow">Our story</div>
            <h2 className="section-title">From a small centre<br />to Pala's trusted name</h2>
            <p>
              Christ Study Centre was founded in 2013 with a single mission. Provide quality education to every student
              in Pala, regardless of their school background.
            </p>
            <p>
              Over 12 years we've grown from a small tutoring room to a fully-equipped institution that hundreds of
              families trust every year. We cover Grades III to XII across CBSE, ICSE, and SCERT boards.
            </p>
            <p>
              Our teachers know exactly what examiners look for and build students toward those outcomes systematically.
              Students don't just pass here. They understand.
            </p>
            <blockquote>
              "They didn't just teach my daughter the syllabus. They taught her how to sit an exam without fear."
              <span>— Parent, Class X batch</span>
            </blockquote>
          </div>
        </div>
      </section>

      <section className="panel-dark">
        <div className="section-head">
          <div>
            <div className="eyebrow">Purpose</div>
            <h2 className="section-title">Mission<br />& Vision</h2>
          </div>
          <p>Two ideas that have guided every decision at Christ Study Centre since day one.</p>
        </div>
        <div className="check-grid">
          <div className="check-item" style={{ flexDirection: 'column', gap: '12px' }}>
            <span className="mark" style={{ fontSize: '13px', letterSpacing: '0.1em' }}>Mission</span>
            <p style={{ fontSize: '15px', lineHeight: '1.75' }}>
              To empower students with quality education, personal attention, and comprehensive support that enables
              them to excel academically and build strong foundations for their careers.
            </p>
          </div>
          <div className="check-item" style={{ flexDirection: 'column', gap: '12px' }}>
            <span className="mark" style={{ fontSize: '13px', letterSpacing: '0.1em' }}>Vision</span>
            <p style={{ fontSize: '15px', lineHeight: '1.75' }}>
              To be the most trusted educational institution in Pala, recognised for academic excellence,
              innovative teaching, and holistic student development.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="section-head">
          <div>
            <div className="eyebrow">Infrastructure</div>
            <h2 className="section-title">Our facilities</h2>
          </div>
          <p>Every room, every resource, every system at Christ Study Centre is built around one goal. Your child's academic success.</p>
        </div>
        <div className="ledger">
          <div className="ledger-row">
            <div className="idx">01</div>
            <h3>Modern Classrooms</h3>
            <div className="ledger-desc">Air-conditioned rooms designed for focused, distraction-free learning with comfortable seating and clear boards.</div>
          </div>
          <div className="ledger-row">
            <div className="idx">02</div>
            <h3>Expert Faculty</h3>
            <div className="ledger-desc">Experienced subject specialists with a deep knowledge of board syllabi and a genuine commitment to student success.</div>
          </div>
          <div className="ledger-row">
            <div className="idx">03</div>
            <h3>Progress Tracking</h3>
            <div className="ledger-desc">Digital attendance and marks system so teachers, students, and parents always know where things stand.</div>
          </div>
          <div className="ledger-row">
            <div className="idx">04</div>
            <h3>Online & Offline</h3>
            <div className="ledger-desc">Flexible learning modes. Attend in person or join live sessions from home. Same teacher, same standard.</div>
          </div>
        </div>
      </section>

      <section className="cta" style={{ borderBottom: '1px solid var(--line-dark)' }}>
        <div className="cta-inner">
          <div className="eyebrow">Ready to start</div>
          <h2>Join hundreds of<br /><em>families</em> who trust us</h2>
          <p>Find out which programme fits your child. We'll walk you through everything.</p>
          <div className="cta-actions">
            <Link href="/courses" className="btn btn-solid">View courses &nbsp;→</Link>
            <Link href="/contact" className="btn">Contact us</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
