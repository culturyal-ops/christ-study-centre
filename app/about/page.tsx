import Image from 'next/image'
import SiteShell from '@/components/SiteShell'
import PageHeader from '@/components/PageHeader'
import PageSection from '@/components/PageSection'
import FeatureCard from '@/components/FeatureCard'
import InstitutionalStrip from '@/components/InstitutionalStrip'
import CTABand from '@/components/CTABand'
import BrandName from '@/components/BrandName'
import FacilityGallery from '@/components/FacilityGallery'
import { delayAttr } from '@/lib/motion'
import { images } from '@/lib/images'

const facilities = [
  {
    idx: '01',
    title: 'Modern Classrooms',
    desc: 'Air-conditioned rooms for focused, distraction-free learning.',
  },
  {
    idx: '02',
    title: 'Expert Faculty',
    desc: 'Subject specialists with deep board syllabus knowledge.',
  },
  {
    idx: '03',
    title: 'Progress Tracking',
    desc: 'Digital attendance and marks, visible to parents monthly.',
  },
  {
    idx: '04',
    title: 'Online & Offline',
    desc: 'Attend in person or join live from home. Same standard.',
  },
]

export default function AboutPage() {
  return (
    <SiteShell>
      <PageHeader
        category="About / Est. 2013"
        title={<BrandName variant="footer" />}
        lede="Twelve years of structured coaching in Pala."
        subtitle="CBSE, ICSE, and SCERT. Grades III through XII. A system built on weekly tests, chapter tracking, and honest progress reports."
        image={images.classroomMain}
        imageAlt="Air-conditioned classroom at Christ Study Centre, Pala"
      />

      <InstitutionalStrip
        items={[
          { num: '01', label: 'Est. 2013' },
          { num: '02', label: 'CBSE / ICSE / SCERT' },
          { num: '03', label: 'Grades III – XII' },
          { num: '04', label: 'Pala, Kerala' },
        ]}
      />

      <PageSection index="01" category="Story" title="From a small centre to Pala&apos;s trusted name">
        <div className="split">
          <div className="story-photo" data-scroll-reveal data-reveal="scale" {...delayAttr(0)}>
            <Image
              src={images.aboutStory}
              alt="Christ Tuition Centre building in Pala with centre signage"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="story" data-scroll-reveal {...delayAttr(1)}>
            <p>
              Founded in 2013 with one mission: quality education for every student in Pala,
              regardless of school background. We&apos;ve grown into a fully-equipped institution
              families trust every year.
            </p>
            <p>
              Our teachers know what examiners look for and build students toward those outcomes
              systematically. Students don&apos;t just pass here. They understand.
            </p>
            <blockquote className="csc-quote">
              &ldquo;They didn&apos;t just teach my daughter the syllabus. They taught her how to
              sit an exam without fear.&rdquo;
              <span>Parent, Class X batch</span>
            </blockquote>
          </div>
        </div>
      </PageSection>

      <PageSection
        index="02"
        category="Purpose"
        title="Mission & Vision"
        alt
      >
        <div className="feature-card-grid">
          <FeatureCard
            index="01"
            title="Mission"
            description="To empower students with quality education, personal attention, and comprehensive support that enables them to excel academically and build strong foundations."
            delay={0}
          />
          <FeatureCard
            index="02"
            title="Vision"
            description="To be the most trusted educational institution in Pala, recognised for academic excellence, innovative teaching, and holistic student development."
            delay={1}
          />
        </div>
      </PageSection>

      <PageSection
        index="03"
        category="Infrastructure"
        title="Our facilities"
        description="Every room and resource is built around one goal: measurable academic progress."
      >
        <div className="feature-card-grid feature-card-grid-4">
          {facilities.map((item, i) => (
            <FeatureCard
              key={item.idx}
              index={item.idx}
              title={item.title}
              description={item.desc}
              delay={i}
            />
          ))}
        </div>
        <FacilityGallery />
      </PageSection>

      <CTABand
        title={
          <>
            See which programme
            <br />
            fits your child
          </>
        }
        description="We'll walk you through grade levels, subjects, and batch timings before you decide."
        primaryLabel="View courses →"
        primaryHref="/courses"
        secondaryLabel="Contact us"
        secondaryHref="/contact"
      />
    </SiteShell>
  )
}
