'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import PageHero from '@/components/PageHero'
import Footer from '@/components/Footer'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1800&q=85&auto=format&fit=crop'

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [submitError, setSubmitError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')
    setSubmitError('')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await response.json()
      if (response.ok) {
        setSubmitMessage(data.message)
        setFormData({ name: '', email: '', phone: '', message: '' })
      } else {
        setSubmitError(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setSubmitError('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className="shell">
      <header style={{ position: 'relative' }}>
        <Navbar />
        <PageHero
          size="short"
          eyebrow="Get in touch"
          title={<>Admissions &<br /><em>Enquiries</em></>}
          subtitle="Most families reach us on WhatsApp for fastest response. We reply within minutes during centre hours."
          image={HERO_IMAGE}
          imageAlt="Contact Christ Study Centre"
        />
      </header>

      <div className="stat-strip">
        <div className="stat"><div className="num">&lt;5min</div><div className="lbl">Average WhatsApp<br />response time</div></div>
        <div className="stat"><div className="num">3</div><div className="lbl">Phone numbers<br />always answered</div></div>
        <div className="stat"><div className="num">Mon-Sat</div><div className="lbl">4PM – 8PM<br />Centre hours</div></div>
        <div className="stat"><div className="num">Pala</div><div className="lbl">52A, RV Road<br />Kerala 686575</div></div>
      </div>

      {/* Primary WhatsApp CTA */}
      <section style={{ padding: '80px 56px', background: 'var(--navy)', borderBottom: '1px solid var(--line-dark)' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
          <div className="eyebrow" style={{ justifyContent: 'center', color: 'var(--gold)' }}>
            <span style={{ width: '28px', height: '1px', background: 'var(--gold)' }}></span>
            Fastest way to reach us
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(32px, 5vw, 52px)',
            fontWeight: 400,
            lineHeight: 1.08,
            color: 'var(--bone)',
            marginBottom: '16px',
          }}>
            Enquire about <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>admissions</em>
          </h2>
          <p style={{
            fontSize: '15px',
            lineHeight: 1.75,
            color: 'rgba(232,226,208,0.75)',
            marginBottom: '48px',
            maxWidth: '560px',
            margin: '0 auto 48px',
          }}>
            Message us on WhatsApp with your child's current grade, board (CBSE/ICSE/SCERT), and subjects needed. 
            We'll guide you through available batches, timings, and fees.
          </p>

          <a
            href="https://wa.me/919747110790?text=Hi%2C%20I%27d%20like%20to%20enquire%20about%20admissions%20at%20Christ%20Study%20Centre.%0A%0AStudent%20Grade%3A%20%0ABoard%3A%20%0ASubjects%3A%20"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '14px',
              padding: '20px 48px',
              background: '#25D366',
              color: 'white',
              fontSize: '16px',
              fontWeight: 600,
              letterSpacing: '0.02em',
              borderRadius: '4px',
              transition: 'all 0.3s',
              boxShadow: '0 4px 14px rgba(37, 211, 102, 0.4)',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#20BA5A'
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.5)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = '#25D366'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 14px rgba(37, 211, 102, 0.4)'
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Start WhatsApp Chat
          </a>

          <p style={{
            marginTop: '24px',
            fontSize: '13px',
            color: 'rgba(232,226,208,0.5)',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.04em',
          }}>
            +91 9747 110 790 • Available Mon-Sat, 4PM-8PM
          </p>
        </div>
      </section>

      {/* Alternative contact methods */}
      <section>
        <div className="section-head">
          <div>
            <div className="eyebrow">Other ways to reach us</div>
            <h2 className="section-title">Phone, email<br />or visit in person</h2>
          </div>
          <p>
            Prefer to call or visit? We're located on RV Road in Pala. All contact methods go to the same team, 
            but WhatsApp gets the fastest response.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-info-item">
              <div className="contact-info-label">Location</div>
              <p>52A, RV Road, Njondimakkal<br />Pala 686575, Kerala, India</p>
            </div>
            <div className="contact-info-item">
              <div className="contact-info-label">Phone</div>
              <a href="tel:+919747110790">+91 9747 110 790</a>
              <a href="tel:+919188650790">+91 9188 650 790</a>
              <a href="tel:+919847877507">+91 9847 877 507</a>
            </div>
            <div className="contact-info-item">
              <div className="contact-info-label">Email</div>
              <a href="mailto:christstudycentrepala@gmail.com">christstudycentrepala@gmail.com</a>
            </div>
            <div className="contact-info-item">
              <div className="contact-info-label">Hours</div>
              <p>Mon – Sat: 4:00 PM – 8:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>

          <div className="contact-form-card">
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 400, marginBottom: '6px' }}>
              Send an email
            </h2>
            <p style={{ fontSize: '13.5px', color: '#6b6b5f', marginBottom: '36px' }}>
              We'll reply within 24 hours. For urgent enquiries, use WhatsApp above.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label className="form-label">Full Name *</label>
                  <input name="name" type="text" value={formData.name} onChange={handleChange} required disabled={isSubmitting} className="form-input" />
                </div>
                <div>
                  <label className="form-label">Phone *</label>
                  <input name="phone" type="tel" value={formData.phone} onChange={handleChange} required disabled={isSubmitting} className="form-input" />
                </div>
              </div>
              <div>
                <label className="form-label">Email</label>
                <input name="email" type="email" value={formData.email} onChange={handleChange} disabled={isSubmitting} className="form-input" />
              </div>
              <div>
                <label className="form-label">Message *</label>
                <textarea name="message" value={formData.message} onChange={handleChange} required disabled={isSubmitting} rows={5} className="form-input" style={{ resize: 'none' }} />
              </div>

              {submitMessage && <div className="form-success">{submitMessage}</div>}
              {submitError && <div className="form-error">{submitError}</div>}

              <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ justifyContent: 'center', padding: '15px', fontSize: '14px' }}>
                {isSubmitting ? 'Sending…' : 'Send message →'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Map */}
      <section style={{ padding: '0 56px 96px', borderBottom: '1px solid var(--line)' }}>
        <div style={{ borderTop: '1px solid var(--line)', paddingTop: '64px' }}>
          <div className="section-head">
            <div>
              <div className="eyebrow">Location</div>
              <h2 className="section-title">Find us<br />on the map</h2>
            </div>
            <p>52A, RV Road, Njondimakkal, Pala 686575, Kerala. Near the town centre, easy to reach by road.</p>
          </div>
          <div style={{ width: '100%', aspectRatio: '16/7', border: '1px solid var(--line)', overflow: 'hidden' }}>
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
        </div>
      </section>

      <Footer />
    </div>
  )
}
