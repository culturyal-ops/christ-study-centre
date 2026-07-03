import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import PageHero from '@/components/PageHero'
import Footer from '@/components/Footer'
import InstitutionalStrip from '@/components/InstitutionalStrip'
import { SpreadSection } from '@/components/SectionSpread'
import { delayAttr } from '@/lib/motion'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=1800&q=85&auto=format&fit=crop'
const STORY_IMAGE =
  'https://images.unsplash.com/photo-1503676260728-8c7632a8e2f7?w=1200&q=85&auto=format&fit=crop'

const facilities = [
  {
    idx: '01',
    title: 'Modern Classrooms',
    desc: 'Air-conditioned rooms designed for focused, distraction-free learning with comfortable seating and clear boards.',
  },
  {
    idx: '02',
    title: 'Expert Faculty',
    desc: 'Experienced subject specialists with a deep knowledge of board syllabi and a genuine commitment to student success.',
  },
  {
    idx: '03',
    title: 'Progress Tracking',
    desc: 'Digital attendance and marks system so teachers, students, and parents always know where things stand.',
  },
  {
    idx: '04',
    title: 'Online & Offline',
    desc: 'Flexible learning modes. Attend in person or join live sessions from home. Same teacher, same standard.',
  },
]

export default function AboutPage() {
  return (
    <div className="shell shell-grid">
      <header style={{ position: 'relative' }}>
        <Navbar />
        <PageHero
          size="mid"
          eyebrow="Est. 2013 · Pala, Kerala"
          title={
            <>
              About Christ
              <br />
              <em>Study Centre</em>
            </>
          }
          subtitle="Twelve years of structured coaching for CBSE, ICSE, and SCERT students — from foundation to board exams."
          image={HERO_IMAGE}
          imageAlt="Christ Study Centre, Pala"
        />
      </header>

      <InstitutionalStrip
        items={[
          { num: '01', label: 'Est. 2013' },
          { num: '02', label: 'CBSE / ICSE / SCERT' },
          { num: '03', label: 'Grades III – XII' },
          { num: '04', label: 'Pala, Kerala' },
        ]}
      />

      <SpreadSection
        index="01"
        category="Our Story"
        title="From a small centre to Pala's trusted name"
        description="Christ Study Centre was founded in 2013 with one mission — quality education for every student in Pala, regardless of school background."
      >
        <div className="split">
          <div className="story-photo" data-scroll-reveal {...delayAttr(0)}>
            <Image
              src={STORY_IMAGE}
              alt="Students at Christ Study Centre"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="story" data-scroll-reveal {...delayAttr(1)}>
            <p>
              Over twelve years we&apos;ve grown from a small tutoring room to a fully-equipped
              institution that families across Pala trust every year. We cover Grades III to XII
              across CBSE, ICSE, and SCERT boards.
            </p>
            <p>
              Our teachers know exactly what examiners look for and build students toward those
              outcomes systematically. Students don&apos;t just pass here — they understand.
            </p>
            <blockquote>
              &ldquo;They didn&apos;t just teach my daughter the syllabus. They taught her how to sit
              an exam without fear.&rdquo;
              <span>— Parent, Class X batch</span>
            </blockquote>
          </div>
        </div>
      </SpreadSection>

      <SpreadSection
        index="02"
        category="Purpose"
        title="Mission & Vision"
        lede="Two ideas that have guided every decision since day one."
        dark
      >
        <div className="check-grid">
          <div className="check-item fly-card" data-scroll-reveal {...delayAttr(0)}>
            <span className="mark">Mission</span>
            <p>
              To empower students with quality education, personal attention, and comprehensive
              support that enables them to excel academically and build strong foundations for
              their careers.
            </p>
          </div>
          <div className="check-item fly-card" data-scroll-reveal {...delayAttr(1)}>
            <span className="mark">Vision</span>
            <p>
              To be the most trusted educational institution in Pala, recognised for academic
              excellence, innovative teaching, and holistic student development.
            </p>
          </div>
        </div>
      </SpreadSection>

      <SpreadSection
        index="03"
        category="Infrastructure"
        title="Our facilities"
        description="Every room, every resource, every system at Christ Study Centre is built around one goal — your child's academic progress."
        alt
      >
        <div className="ledger">
          {facilities.map((item, i) => (
            <div
              key={item.idx}
              className="ledger-row fly-card"
              data-scroll-reveal
              {...delayAttr(i)}
            >
              <div className="idx">{item.idx}</div>
              <h3>{item.title}</h3>
              <div className="ledger-desc">{item.desc}</div>
            </div>
          ))}
        </div>
      </SpreadSection>

      <section className="cta">
        <div className="cta-inner" data-scroll-reveal>
          <div className="spread-label cta-label">Admissions / 2026–27</div>
          <h2>
            See which programme
            <br />
            <em>fits your child</em>
          </h2>
          <p>
            We&apos;ll walk you through grade levels, subjects, batch timings, and how our
            progress system works — before you decide anything.
          </p>
          <div className="cta-actions">
            <Link href="/courses" className="btn btn-solid btn-motion">
              View courses →
            </Link>
            <Link href="/contact" className="btn btn-motion">
              Contact us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
