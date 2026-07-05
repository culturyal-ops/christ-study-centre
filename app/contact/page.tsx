import Image from 'next/image'
import SiteShell from '@/components/SiteShell'
import PageHeader from '@/components/PageHeader'
import PageSection from '@/components/PageSection'
import ContactForm from '@/components/ContactForm'
import ChatMockup from '@/components/ChatMockup'
import InstitutionalStrip from '@/components/InstitutionalStrip'
import FeatureCard from '@/components/FeatureCard'
import CTABand from '@/components/CTABand'
import { delayAttr } from '@/lib/motion'
import { images } from '@/lib/images'
import { CENTRE_HOURS, CENTRE_HOURS_LINE } from '@/lib/site-info'

export default function ContactPage() {
  return (
    <SiteShell>
      <PageHeader
        category="Admissions / Enquiries"
        title="Get in touch"
        lede="Send an enquiry directly to WhatsApp."
        subtitle={`We reply during centre hours. ${CENTRE_HOURS_LINE}. 52A, RV Road, Njondimakkal, Pala.`}
        image={images.contactHero}
        imageAlt="Students collaborating at Christ Study Centre"
      />

      <InstitutionalStrip
        items={[
          { num: '01', label: 'WhatsApp Enquiries' },
          { num: '02', label: `Mon – Sat · 5:30 AM – 8:30 PM` },
          { num: '03', label: 'RV Road, Pala' },
          { num: '04', label: 'All Boards' },
        ]}
      />

      <PageSection index="01" category="Enquiry" title="New admission">
        <div className="contact-split">
          <div data-scroll-reveal {...delayAttr(0)}>
            <p className="csc-section__desc csc-section__desc--spaced">
              Fill in your details. The form opens in WhatsApp with everything pre-filled.
            </p>
            <ContactForm />
          </div>
          <div className="contact-chat-col" data-scroll-reveal {...delayAttr(1)}>
            <p className="csc-section__desc csc-section__desc--spaced">
              Most parents reach us this way. Replies within minutes during centre hours.
            </p>
            <ChatMockup />
          </div>
        </div>
      </PageSection>

      <PageSection index="02" category="Direct" title="Or reach us directly" alt>
        <div className="feature-card-grid feature-card-grid-4">
          <FeatureCard
            index="01"
            title="Phone"
            description="+91 9747 110 790 · +91 9188 650 790 · +91 9847 877 507"
            delay={0}
          />
          <FeatureCard
            index="02"
            title="Location"
            description="52A, RV Road, Njondimakkal, Pala 686575, Kerala, India"
            delay={1}
          />
          <FeatureCard
            index="03"
            title="Hours"
            description={`${CENTRE_HOURS.daysShort}: ${CENTRE_HOURS.range}. ${CENTRE_HOURS.closed}`}
            delay={2}
          />
          <FeatureCard
            index="04"
            title="Email"
            description="christstudycentrepala@gmail.com"
            delay={3}
          />
        </div>
      </PageSection>

      <PageSection index="03" category="Location" title="Find us on the map">
        <div className="csc-photo-band" data-scroll-reveal data-delay="0.05">
          <Image
            src={images.library}
            alt="Books and study materials at Christ Study Centre"
            fill
            sizes="(max-width: 900px) 100vw, 1200px"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="map-wrap" data-scroll-reveal data-delay="0.1">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3934.1!2d76.68!3d9.71!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwNDInMzYuMCJOIDc2wrA0MCc0OC4wIkU!5e0!3m2!1sen!2sin!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0, display: 'block', minHeight: 360 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Christ Study Centre Location"
          />
        </div>
      </PageSection>

      <CTABand
        title="Ready to enquire?"
        description="WhatsApp is fastest during centre hours. We'll respond with batch options and next steps."
        primaryLabel="Enquire on WhatsApp →"
        primaryHref="https://wa.me/919747110790"
        externalPrimary
        secondaryLabel="View courses"
        secondaryHref="/courses"
      />
    </SiteShell>
  )
}
