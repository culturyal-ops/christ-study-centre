'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Phone, MapPin, MessageCircle, Mail, ArrowRight, Clock } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
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

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      lines: ['52A, RV Road, Njondimakkal', 'Pala 686575, Kerala, India'],
      href: null,
    },
    {
      icon: Phone,
      title: 'Call Us',
      lines: ['+91 9747 110 790', '+91 9188 650 790', '+91 9847 877 507'],
      href: 'tel:+919747110790',
    },
    {
      icon: Mail,
      title: 'Email',
      lines: ['christstudycentrepala@gmail.com'],
      href: 'mailto:christstudycentrepala@gmail.com',
    },
    {
      icon: Clock,
      title: 'Hours',
      lines: ['Mon – Sat: 4:00 PM – 8:00 PM', 'Sunday: Closed'],
      href: null,
    },
  ]

  return (
    <div className="min-h-screen" style={{ background: '#FAF6EF' }}>
      <Navbar />

      {/* ── Hero ── */}
      <section
        className="relative py-28 px-4 overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #060F1E 0%, #0C1E3C 50%, #132847 100%)' }}
      >
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.09) 0%, transparent 65%)' }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(201,168,76,0.05) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#C9A84C' }}>
            We'd Love to Hear From You
          </p>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-5" style={{ letterSpacing: '-0.02em' }}>
            Get in{' '}
            <span className="gold-text">Touch</span>
          </h1>
          <p className="text-lg text-white/55 max-w-xl mx-auto">
            Questions about admissions, courses, or schedules — we're here to help.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none" style={{ background: 'linear-gradient(to top, #FAF6EF, transparent)' }} />
      </section>

      {/* ── Main Section ── */}
      <section className="py-24 px-4" style={{ background: '#FAF6EF' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12">

            {/* Contact Info — 2 cols */}
            <div className="lg:col-span-2 space-y-5">
              <div className="mb-8">
                <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#C9A84C' }}>Contact Info</p>
                <h2 className="text-3xl font-black" style={{ color: '#0C1E3C', letterSpacing: '-0.02em' }}>
                  Reach Out
                </h2>
              </div>

              {contactInfo.map(({ icon: Icon, title, lines, href }) => (
                <div
                  key={title}
                  className="rounded-2xl p-5 flex gap-4 items-start card-hover"
                  style={{ background: 'white', border: '1px solid rgba(201,168,76,0.15)', boxShadow: '0 2px 12px rgba(12,30,60,0.05)' }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(232,201,122,0.2))' }}
                  >
                    <Icon className="w-4.5 h-4.5" style={{ color: '#C9A84C' }} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-1.5" style={{ color: '#0C1E3C' }}>{title}</p>
                    {lines.map((line) => (
                      href ? (
                        <a key={line} href={href} className="block text-sm leading-relaxed hover:underline" style={{ color: '#4A5568' }}>
                          {line}
                        </a>
                      ) : (
                        <p key={line} className="text-sm leading-relaxed" style={{ color: '#4A5568' }}>{line}</p>
                      )
                    ))}
                  </div>
                </div>
              ))}

              <a
                href="https://wa.me/919747110790"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full rounded-2xl py-4 font-bold text-sm btn-gold"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </a>
            </div>

            {/* Form — 3 cols */}
            <div className="lg:col-span-3">
              <div
                className="rounded-3xl p-10"
                style={{
                  background: '#0C1E3C',
                  boxShadow: '0 32px 80px rgba(12,30,60,0.2)',
                }}
              >
                <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#C9A84C' }}>
                  Send a Message
                </p>
                <h3 className="text-2xl font-black text-white mb-8" style={{ letterSpacing: '-0.01em' }}>
                  We'll get back to you soon
                </h3>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-widest text-white/50">Full Name *</label>
                      <input
                        name="name"
                        type="text"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-xl text-sm text-white input-premium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase tracking-widest text-white/50">Phone *</label>
                      <input
                        name="phone"
                        type="tel"
                        placeholder="Your number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-xl text-sm text-white input-premium"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-widest text-white/50">Email</label>
                    <input
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 rounded-xl text-sm text-white input-premium"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-widest text-white/50">Message *</label>
                    <textarea
                      name="message"
                      placeholder="Tell us about your inquiry..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl text-sm text-white input-premium resize-none"
                    />
                  </div>

                  {submitMessage && (
                    <div className="text-sm px-4 py-3 rounded-xl" style={{ background: 'rgba(201,168,76,0.12)', color: '#E8C97A', border: '1px solid rgba(201,168,76,0.3)' }}>
                      {submitMessage}
                    </div>
                  )}
                  {submitError && (
                    <div className="text-sm px-4 py-3 rounded-xl" style={{ background: 'rgba(239,68,68,0.12)', color: '#FCA5A5', border: '1px solid rgba(239,68,68,0.3)' }}>
                      {submitError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-gold py-3.5 rounded-xl text-sm font-bold inline-flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {isSubmitting ? 'Sending…' : (
                      <>Send Message <ArrowRight className="w-4 h-4" /></>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Map ── */}
      <section className="px-4 pb-24" style={{ background: '#FAF6EF' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#C9A84C' }}>Location</p>
            <h2 className="text-3xl font-black" style={{ color: '#0C1E3C', letterSpacing: '-0.02em' }}>Find Us on the Map</h2>
          </div>
          <div
            className="rounded-3xl overflow-hidden"
            style={{ boxShadow: '0 16px 48px rgba(12,30,60,0.12)', border: '1px solid rgba(201,168,76,0.2)' }}
          >
            <div className="aspect-video w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3934.1!2d76.68!3d9.71!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwNDInMzYuMCJOIDc2wrA0MCc0OC4wIkU!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Christ Study Centre Location"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
