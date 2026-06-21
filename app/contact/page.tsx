'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

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
        <div className="mobile-links">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/courses">Courses</Link>
          <Link href="/contact" className="active">Contact</Link>
          <Link href="/login">Portal</Link>
        </div>
        <section className="hero" style={{ height: '60vh', minHeight: '420px', maxHeight: '560px' }}>
          <Image
            src="/images/hero.jpg"
            alt="Contact Christ Study Centre"
            fill
            priority
            className="hero-image"
            style={{ objectFit: 'cover' }}
          />
          <div className="hero-inner">
            <div className="hero-eyebrow">Get in touch</div>
            <h1 className="hero-title">
              Contact<br /><em>Us</em>
            </h1>
            <p className="hero-sub">
              Questions about admissions, courses, or schedules. We're here to help.
            </p>
          </div>
          <svg className="hero-curve" viewBox="0 0 1440 90" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,90 L0,40 Q720,-30 1440,40 L1440,90 Z" fill="#0A1628" />
          </svg>
        </section>
      </header>

      <div className="stat-strip">
        <div className="stat"><div className="num">3</div><div className="lbl">Phone numbers<br />always answered</div></div>
        <div className="stat"><div className="num">6</div><div className="lbl">Days a week<br />Mon – Sat</div></div>
        <div className="stat"><div className="num">4PM</div><div className="lbl">Centre opens<br />daily</div></div>
        <div className="stat"><div className="num">Pala</div><div className="lbl">52A, RV Road<br />Kerala 686575</div></div>
      </div>

      {/* Main contact section */}
      <section>
        <div className="section-head">
          <div>
            <div className="eyebrow">Reach out</div>
            <h2 className="section-title">We'd love to<br />hear from you</h2>
          </div>
          <p>
            Fill in the form and we'll get back to you within the day. Or call us directly during centre hours.
          </p>
        </div>

        <div className="contact-grid">
          {/* Contact info */}
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
            <div style={{ marginTop: '32px' }}>
              <a
                href="https://wa.me/919747110790"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-solid"
                style={{ width: '100%', justifyContent: 'center', padding: '14px 24px' }}
              >
                Message on WhatsApp &nbsp;→
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-card">
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '28px',
              fontWeight: 400,
              marginBottom: '6px',
            }}>Send a message</h2>
            <p style={{ fontSize: '13.5px', color: '#6b6b5f', marginBottom: '36px' }}>
              We'll get back to you within 24 hours.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label className="form-label">Full Name *</label>
                  <input
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label">Phone *</label>
                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="form-input"
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Email</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  rows={5}
                  className="form-input"
                  style={{ resize: 'none' }}
                />
              </div>

              {submitMessage && (
                <div className="form-success">{submitMessage}</div>
              )}
              {submitError && (
                <div className="form-error">{submitError}</div>
              )}

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
              <h2 className="section-title">Find us</h2>
            </div>
            <p>52A, RV Road, Njondimakkal, Pala 686575, Kerala. Near the town centre, easy to reach by road.</p>
          </div>
          <div style={{ width: '100%', aspectRatio: '16/7', border: '1px solid var(--line)', overflow: 'hidden' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3934.1!2d76.68!3d9.71!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwNDInMzYuMCJOIDc2wrA0MCc0OC4wIkU!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block', filter: 'grayscale(0.2) contrast(1.05)' }}
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
