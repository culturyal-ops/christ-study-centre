'use client'

import { useEffect, useState } from 'react'

export type ContactFormPreset = {
  studentGrade?: string
  board?: string
  subjects?: string
  programme?: string
}

type ContactFormProps = {
  preset?: ContactFormPreset
}

export default function ContactForm({ preset }: ContactFormProps = {}) {
  const [formData, setFormData] = useState({
    parentName: '',
    phone: '',
    studentGrade: '',
    board: '',
    subjects: '',
    preferredTime: '',
    additionalDetails: '',
    programme: '',
  })

  useEffect(() => {
    if (!preset) return
    setFormData((prev) => ({
      ...prev,
      ...(preset.studentGrade !== undefined ? { studentGrade: preset.studentGrade } : {}),
      ...(preset.board !== undefined ? { board: preset.board } : {}),
      ...(preset.subjects !== undefined ? { subjects: preset.subjects } : {}),
      ...(preset.programme !== undefined ? { programme: preset.programme } : {}),
    }))
  }, [preset?.studentGrade, preset?.board, preset?.subjects, preset?.programme])

  const isComplete =
    formData.parentName &&
    formData.phone &&
    formData.studentGrade &&
    formData.board &&
    formData.subjects

  const handleWhatsAppEnquiry = () => {
    const message = `*Admission Enquiry - Christ Study Centre*

Parent Name: ${formData.parentName || '_____'}
Phone: ${formData.phone || '_____'}
${formData.programme ? `Programme: ${formData.programme}\n` : ''}Student Grade: ${formData.studentGrade || '_____'}
Board: ${formData.board || '_____'}
Subjects Needed: ${formData.subjects || '_____'}
Preferred Timing: ${formData.preferredTime || '_____'}

${formData.additionalDetails ? `Additional Details:\n${formData.additionalDetails}` : ''}`

    window.open(
      `https://wa.me/919747110790?text=${encodeURIComponent(message)}`,
      '_blank'
    )
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const selectStyle = {
    appearance: 'none' as const,
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%2364748b' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 16px center',
  }

  return (
    <div className="enquiry-form-card fly-card" data-scroll-reveal data-delay="0.12">
      <form style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <div className="form-section-title">Parent / Guardian Details</div>
          <div className="form-grid-2">
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

        <div>
          <div className="form-section-title">Student Details</div>
          <div className="form-grid-2">
            <div>
              <label className="form-label">Current Grade *</label>
              <select
                name="studentGrade"
                value={formData.studentGrade}
                onChange={handleChange}
                required
                className="form-input"
                style={selectStyle}
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
                style={selectStyle}
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
            <p
              style={{
                fontSize: '12px',
                color: 'rgba(17,17,17,0.45)',
                marginTop: '6px',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.02em',
              }}
            >
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
              style={selectStyle}
            >
              <option value="">Select preferred timing</option>
              <option value="5:30 AM - 8:00 AM">5:30 AM - 8:00 AM (Morning)</option>
              <option value="8:00 AM - 12:00 PM">8:00 AM - 12:00 PM</option>
              <option value="12:00 PM - 4:00 PM">12:00 PM - 4:00 PM</option>
              <option value="4:00 PM - 8:30 PM">4:00 PM - 8:30 PM (Evening)</option>
              <option value="Flexible">Flexible / Any timing</option>
            </select>
          </div>
        </div>

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

        <button
          type="button"
          onClick={handleWhatsAppEnquiry}
          disabled={!isComplete}
          className="btn-whatsapp"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Send Enquiry to WhatsApp
        </button>

        <p className="form-hint">
          Fill all required (*) fields to enable WhatsApp button
        </p>
      </form>
    </div>
  )
}
