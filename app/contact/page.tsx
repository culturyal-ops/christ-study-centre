import Navbar from '@/components/Navbar'
import PageHero from '@/components/PageHero'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import InstitutionalStrip from '@/components/InstitutionalStrip'
import { SpreadSection } from '@/components/SectionSpread'
import { delayAttr } from '@/lib/motion'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1800&q=85&auto=format&fit=crop'

const contactCards = [
  {
    label: 'Phone',
    content: (
      <>
        <a href="tel:+919747110790">+91 9747 110 790</a>
        <a href="tel:+919188650790">+91 9188 650 790</a>
        <a href="tel:+919847877507">+91 9847 877 507</a>
      </>
    ),
  },
  {
    label: 'Location',
    content: (
      <p>
        52A, RV Road, Njondimakkal
        <br />
        Pala 686575, Kerala, India
      </p>
    ),
  },
  {
    label: 'Hours',
    content: (
      <p>
        Mon – Sat: 4:00 PM – 8:00 PM
        <br />
        Sunday: Closed
      </p>
    ),
  },
  {
    label: 'Email',
    content: (
      <a href="mailto:christstudycentrepala@gmail.com">christstudycentrepala@gmail.com</a>
    ),
  },
]

export default function ContactPage() {
  return (
    <div className="shell shell-grid">
      <header style={{ position: 'relative' }}>
        <Navbar />
        <PageHero
          size="short"
          eyebrow="Admissions / Enquiries"
          title={
            <>
              Get in
              <br />
              <em>touch</em>
            </>
          }
          subtitle="Fill the form below and send directly to WhatsApp. We reply during centre hours, Mon–Sat."
          image={HERO_IMAGE}
          imageAlt="Contact Christ Study Centre"
        />
      </header>

      <InstitutionalStrip
        items={[
          { num: '01', label: 'WhatsApp Enquiries' },
          { num: '02', label: 'Mon – Sat · 4–8 PM' },
          { num: '03', label: 'RV Road, Pala' },
          { num: '04', label: 'All Boards' },
        ]}
      />

      <SpreadSection
        index="01"
        category="Admissions"
        title="New admission enquiry"
        description="Fill in your details below. Click send and the form opens in WhatsApp with everything pre-filled. We'll guide you through batches, timings, and fees."
      >
        <div style={{ maxWidth: '720px' }}>
          <ContactForm />
        </div>
      </SpreadSection>

      <SpreadSection
        index="02"
        category="Direct"
        title="Or reach us directly"
        description="Prefer to call or visit in person? We're open Mon–Sat, 4 PM–8 PM at our RV Road centre."
        alt
      >
        <div className="contact-cards-grid">
          {contactCards.map((card, i) => (
            <div
              key={card.label}
              className="contact-card contact-info-item fly-card"
              data-scroll-reveal
              {...delayAttr(i)}
            >
              <div className="contact-info-label">{card.label}</div>
              {card.content}
            </div>
          ))}
        </div>
      </SpreadSection>

      <SpreadSection
        index="03"
        category="Location"
        title="Find us on the map"
        description="52A, RV Road, Njondimakkal, Pala 686575, Kerala. Near the town centre, easy to reach by road."
      >
        <div
          className="fly-card"
          data-scroll-reveal
          style={{
            width: '100%',
            aspectRatio: '16/7',
            border: '1px solid var(--line)',
            overflow: 'hidden',
          }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3934.1!2d76.68!3d9.71!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwNDInMzYuMCJOIDc2wrA0MCc0OC4wIkU!5e0!3m2!1sen!2sin!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0, display: 'block', filter: 'grayscale(0.15) contrast(1.05)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Christ Study Centre Location"
          />
        </div>
      </SpreadSection>

      <Footer />
    </div>
  )
}
