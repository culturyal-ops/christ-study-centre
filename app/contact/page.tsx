'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Phone, MapPin, Mail, Clock, ArrowRight } from 'lucide-react'

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

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="navy-bg text-white">
        <div className="container-narrow section-spacing text-center">
          <p className="text-sm uppercase tracking-widest text-gray-400 mb-6">Get in Touch</p>
          <h1 className="text-display mb-6">Contact Us</h1>
          <p className="text-lg text-gray-400 max-w-xl mx-auto">
            Questions about admissions, courses, or schedules—we're here to help.
          </p>
        </div>
      </section>

      {/* Main */}
      <section className="section-spacing">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-12">
            
            {/* Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="card p-6">
                <MapPin className="w-5 h-5 text-[#D4AF37] mb-3" />
                <h3 className="text-xs font-semibold uppercase tracking-wider mb-2">Location</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  52A, RV Road, Njondimakkal<br />
                  Pala 686575, Kerala, India
                </p>
              </div>

              <div className="card p-6">
                <Phone className="w-5 h-5 text-[#D4AF37] mb-3" />
                <h3 className="text-xs font-semibold uppercase tracking-wider mb-2">Phone</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <a href="tel:+919747110790" className="block hover:text-[#D4AF37]">+91 9747 110 790</a>
                  <a href="tel:+919188650790" className="block hover:text-[#D4AF37]">+91 9188 650 790</a>
                  <a href="tel:+919847877507" className="block hover:text-[#D4AF37]">+91 9847 877 507</a>
                </div>
              </div>

              <div className="card p-6">
                <Mail className="w-5 h-5 text-[#D4AF37] mb-3" />
                <h3 className="text-xs font-semibold uppercase tracking-wider mb-2">Email</h3>
                <a href="mailto:christstudycentrepala@gmail.com" className="text-sm text-gray-600 hover:text-[#D4AF37]">
                  christstudycentrepala@gmail.com
                </a>
              </div>

              <div className="card p-6">
                <Clock className="w-5 h-5 text-[#D4AF37] mb-3" />
                <h3 className="text-xs font-semibold uppercase tracking-wider mb-2">Hours</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Mon – Sat: 4:00 PM – 8:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="card p-10">
                <h2 className="serif text-3xl font-semibold mb-2">Send a Message</h2>
                <p className="text-sm text-gray-600 mb-8">We'll get back to you soon</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-gray-700">
                        Full Name *
                      </label>
                      <input
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 border border-gray-300 text-sm focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-gray-700">
                        Phone *
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 border border-gray-300 text-sm focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-gray-700">
                      Email
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 text-sm focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-gray-700">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 text-sm resize-none focus:border-[#D4AF37] focus:outline-none"
                    />
                  </div>

                  {submitMessage && (
                    <div className="text-sm px-4 py-3 bg-green-50 text-green-800 border border-green-200">
                      {submitMessage}
                    </div>
                  )}
                  {submitError && (
                    <div className="text-sm px-4 py-3 bg-red-50 text-red-800 border border-red-200">
                      {submitError}
                    </div>
                  )}

                  <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full justify-center">
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

      {/* Map */}
      <section className="pb-24 px-4">
        <div className="container">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-widest text-gray-600 mb-4">Location</p>
            <h2 className="text-h3">Find Us on the Map</h2>
          </div>
          <div className="aspect-video w-full border border-gray-200">
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
      </section>

      <Footer />
    </>
  )
}
