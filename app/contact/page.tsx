'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import PageHero from '@/components/PageHero'
import Footer from '@/components/Footer'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1800&q=85&auto=format&fit=crop'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    parentName: '',
    phone: '',
    studentGrade: '',
    board: '',
    subjects: '',
    preferredTime: '',
    additionalDetails: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleWhatsAppEnquiry = () => {
    const message = `*Admission Enquiry - Christ Study Centre*

Parent Name: ${formData.parentName || '_____'}
Phone: ${formData.phone || '_____'}
Student Grade: ${formData.studentGrade || '_____'}
Board: ${formData.board || '_____'}
Subjects Needed: ${formData.subjects || '_____'}
Preferred Timing: ${formData.preferredTime || '_____'}

${formData.additionalDetails ? `Additional Details:\n${formData.additionalDetails}` : ''}`

    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/919747110790?text=${encodedMessage}`, '_blank')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className="shell">
      <header style={{ position: 'relative' }}>
        <Navbar />
        <PageHero
          size="short"
          eyebrow="Get in touch"
          title={<>Admission<br /><em>Enquiries</em></>}
          subtitle="Fill the form below and send directly to WhatsApp. We reply within minutes during centre hours."
          image={HERO_IMAGE}
          imageAlt="Contact Christ Study Centre"
        />
      </header>

      <div className="stat-strip">
        <div className="stat"><div className="num">&lt;5min</div><div className="lbl">WhatsApp reply<br />during hours</div></div>
        <div className="stat"><div className="num">Mon-Sat</div><div className="lbl">4:00 PM<br />to 8:00 PM</div></div>
        <div className="stat"><div className="num">12yrs</div><div className="lbl">Serving Pala<br />since 2013</div></div>
        <div className="stat"><div className="num">RV Road</div><div className="lbl">52A, Njondimakkal<br />Pala 686575</div></div>
      </div>

      {/* Admission Enquiry Form */}
      <section>
        <div className="section-head">
          <div>
            <div className="eyebrow">Admission enquiry</div>
            <h2 className="section-title">For new<br />admissions</h2>
          </div>
          <p>
            Fill in your details below. Click "Send to WhatsApp" and the form will open in WhatsApp with all your 
            information pre-filled. We'll guide you through available batches, timings, and fees.
          </p>
        </div>

        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div className="enquiry-form-card">
            <form style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Parent Details */}
              <div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  marginBottom: '20px',
                  paddingBottom: '12px',
                  borderBottom: '1px solid var(--line)',
                }}>
                  Parent / Guardian Details
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label className="form-label">Full Name *</label>
                    <input
                      name="parentName"
                      type="text"
                      value={formData.parentName}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="Enter parent/guardian name"
                    />
                  </div>
                  <div>
                    <label className="form-label">Phone Number *</label>
                    <input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="+91"
                    />
                  </div>
                </div>
              </div>

              {/* Student Details */}
              <div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  marginBottom: '20px',
                  paddingBottom: '12px',
                  borderBottom: '1px solid var(--line)',
                }}>
                  Student Details
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label className="form-label">Current Grade *</label>
                    <select
                      name="studentGrade"
                      value={formData.studentGrade}
                      onChange={handleChange}
                      required
                      className="form-input"
                      style={{ appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23C9A84C' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}
                    >
                      <option value="">Select grade</option>
                      <option value="Grade III">Grade III</option>
                      <option value="Grade IV">Grade IV</option>
                      <option value="Grade V">Grade V</option>
                      <option value="Grade VI">Grade VI</option>
                      <option value="Grade VII">Grade VII</option>
                      <option value="Grade VIII">Grade VIII</option>
                      <option value="Grade IX">Grade IX</option>
                      <option value="Grade X">Grade X</option>
                      <option value="Grade XI">Grade XI (Plus One)</option>
                      <option value="Grade XII">Grade XII (Plus Two)</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Board *</label>
                    <select
                      name="board"
                      value={formData.board}
                      onChange={handleChange}
                      required
                      className="form-input"
                      style={{ appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23C9A84C' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}
                    >
                      <option value="">Select board</option>
                      <option value="CBSE">CBSE</option>
                      <option value="ICSE">ICSE</option>
                      <option value="SCERT (State Board)">SCERT (State Board)</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label className="form-label">Subjects Needed *</label>
                  <input
                    name="subjects"
                    type="text"
                    value={formData.subjects}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="e.g., Mathematics, Physics, Chemistry"
                  />
                  <p style={{ fontSize: '12px', color: '#6b6b5f', marginTop: '6px', fontFamily: 'var(--font-mono)', letterSpacing: '0.02em' }}>
                    List all subjects your child needs coaching for
                  </p>
                </div>

                <div>
                  <label className="form-label">Preferred Timing</label>
                  <select
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleChange}
                    className="form-input"
                    style={{ appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23C9A84C' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center' }}
                  >
                    <option value="">Select preferred timing</option>
                    <option value="4:00 PM - 5:00 PM">4:00 PM - 5:00 PM</option>
                    <option value="5:00 PM - 6:00 PM">5:00 PM - 6:00 PM</option>
                    <option value="6:00 PM - 7:00 PM">6:00 PM - 7:00 PM</option>
                    <option value="7:00 PM - 8:00 PM">7:00 PM - 8:00 PM</option>
                    <option value="Flexible">Flexible / Any timing</option>
                  </select>
                </div>
              </div>

              {/* Additional Details */}
              <div>
                <label className="form-label">Additional Details (Optional)</label>
                <textarea
                  name="additionalDetails"
                  value={formData.additionalDetails}
                  onChange={handleChange}
                  rows={4}
                  className="form-input"
                  style={{ resize: 'vertical' }}
                  placeholder="Any specific requirements, questions, or concerns..."
                />
              </div>

              {/* WhatsApp Button */}
              <button
                type="button"
                onClick={handleWhatsAppEnquiry}
                disabled={!formData.parentName || !formData.phone || !formData.studentGrade || !formData.board || !formData.subjects}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  padding: '18px 32px',
                  background: !formData.parentName || !formData.phone || !formData.studentGrade || !formData.board || !formData.subjects 
                    ? '#ccc' 
                    : '#25D366',
                  color: 'white',
                  fontSize: '15px',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  border: 'none',
                  cursor: !formData.parentName || !formData.phone || !formData.studentGrade || !formData.board || !formData.subjects 
                    ? 'not-allowed' 
                    : 'pointer',
                  transition: 'all 0.3s',
                  width: '100%',
                }}
                onMouseOver={(e) => {
                  if (formData.parentName && formData.phone && formData.studentGrade && formData.board && formData.subjects) {
                    e.currentTarget.style.background = '#20BA5A'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.4)'
                  }
                }}
                onMouseOut={(e) => {
                  if (formData.parentName && formData.phone && formData.studentGrade && formData.board && formData.subjects) {
                    e.currentTarget.style.background = '#25D366'
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Send Enquiry to WhatsApp
              </button>

              <p style={{ textAlign: 'center', fontSize: '12px', color: '#6b6b5f', fontFamily: 'var(--font-mono)', letterSpacing: '0.02em' }}>
                Fill all required (*) fields to enable WhatsApp button
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Quick Contact */}
      <section style={{ padding: '80px 56px', background: 'var(--cream-deep)', borderBottom: '1px solid var(--line)' }}>
        <div className="section-head" style={{ marginBottom: '40px' }}>
          <div>
            <div className="eyebrow">Quick contact</div>
            <h2 className="section-title">Or reach us<br />directly</h2>
          </div>
          <p>Prefer to call or visit in person? We're open Mon-Sat, 4PM-8PM at our RV Road centre.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          <div className="contact-info-item" style={{ padding: '24px', background: 'white', border: '1px solid var(--line)' }}>
            <div className="contact-info-label">Phone</div>
            <a href="tel:+919747110790" style={{ display: 'block', fontSize: '15px', marginBottom: '6px' }}>+91 9747 110 790</a>
            <a href="tel:+919188650790" style={{ display: 'block', fontSize: '15px', marginBottom: '6px' }}>+91 9188 650 790</a>
            <a href="tel:+919847877507" style={{ display: 'block', fontSize: '15px' }}>+91 9847 877 507</a>
          </div>

          <div className="contact-info-item" style={{ padding: '24px', background: 'white', border: '1px solid var(--line)' }}>
            <div className="contact-info-label">Location</div>
            <p style={{ fontSize: '14px', lineHeight: '1.65', color: 'var(--navy)' }}>
              52A, RV Road, Njondimakkal<br />
              Pala 686575, Kerala, India
            </p>
          </div>

          <div className="contact-info-item" style={{ padding: '24px', background: 'white', border: '1px solid var(--line)' }}>
            <div className="contact-info-label">Hours</div>
            <p style={{ fontSize: '14px', lineHeight: '1.65', color: 'var(--navy)' }}>
              Mon – Sat: 4:00 PM – 8:00 PM<br />
              Sunday: Closed
            </p>
          </div>

          <div className="contact-info-item" style={{ padding: '24px', background: 'white', border: '1px solid var(--line)' }}>
            <div className="contact-info-label">Email</div>
            <a href="mailto:christstudycentrepala@gmail.com" style={{ fontSize: '13px', wordBreak: 'break-word' }}>
              christstudycentrepala@gmail.com
            </a>
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
