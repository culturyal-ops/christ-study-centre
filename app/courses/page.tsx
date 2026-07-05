import SiteShell from '@/components/SiteShell'
import PageHeader from '@/components/PageHeader'
import InstitutionalStrip from '@/components/InstitutionalStrip'
import CTABand from '@/components/CTABand'
import CoursesInteractive from '@/components/courses/CoursesInteractive'
import { images } from '@/lib/images'

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

      <CoursesInteractive />

      <CTABand
        title={
          <>
            Find the right
            <br />
            batch fit
          </>
        }
        description="Reach out and we'll match your child to the right programme and timing."
        primaryLabel="Enquire on courses page →"
        primaryHref="/courses#courses-enquiry"
        secondaryLabel="WhatsApp →"
        secondaryHref="https://wa.me/919747110790"
        externalSecondary
      />
    </SiteShell>
  )
}
