'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { submitPendingAdmission } from '@/lib/actions/register'
import { ALL_BATCH_NAMES } from '@/lib/register/constants'
import LandingNav from '@/components/landing/LandingNav'
import BrandName from '@/components/BrandName'

export default function AdmissionForm() {
  const [name, setName] = useState('')
  const [schoolName, setSchoolName] = useState('')
  const [subjects, setSubjects] = useState('')
  const [subjectCount, setSubjectCount] = useState('')
  const [contact, setContact] = useState('')
  const [batchName, setBatchName] = useState('12 CBSE')
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const [busy, start] = useTransition()

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    start(async () => {
      try {
        await submitPendingAdmission({
          name,
          schoolName,
          subjects,
          subjectCount: subjectCount ? Number(subjectCount) : undefined,
          contact,
          batchName,
        })
        setDone(true)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Submission failed')
      }
    })
  }

  return (
    <div className="csc-landing csc-site">
      <LandingNav />
      <div className="admission-page">
        <div className="admission-card">
          <div className="spread-label" style={{ marginBottom: 12 }}>
            <BrandName variant="compact" />
          </div>
          {done ? (
            <div className="admission-success">
              <h2>Application received</h2>
              <p>
                Thank you. Our team will review your admission request and contact
                you soon.
              </p>
              <Link href="/" className="register-btn register-btn--primary">
                Back to home
              </Link>
            </div>
          ) : (
            <>
              <h1>New admission</h1>
              <p>
                Submit your details for review. An admin will admit you into the
                correct batch after verification.
              </p>
              <form onSubmit={submit} className="register-form-grid">
                <label>
                  Full name
                  <input value={name} onChange={(e) => setName(e.target.value)} required />
                </label>
                <label>
                  Batch applying for
                  <select value={batchName} onChange={(e) => setBatchName(e.target.value)}>
                    {ALL_BATCH_NAMES.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  School
                  <input
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    required
                  />
                </label>
                <label>
                  Subjects
                  <input
                    value={subjects}
                    onChange={(e) => setSubjects(e.target.value)}
                    placeholder="Physics, Chemistry, Maths"
                  />
                </label>
                <label>
                  Number of subjects
                  <input
                    type="number"
                    value={subjectCount}
                    onChange={(e) => setSubjectCount(e.target.value)}
                  />
                </label>
                <label>
                  Contact (phone / WhatsApp)
                  <input
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    required
                  />
                </label>
                {error && <p className="register-error">{error}</p>}
                <button
                  type="submit"
                  className="register-btn register-btn--primary"
                  disabled={busy}
                  style={{ justifySelf: 'start' }}
                >
                  {busy ? 'Submitting…' : 'Submit application'}
                </button>
              </form>
              <p style={{ marginTop: 20, opacity: 0.55, fontSize: '0.88rem' }}>
                Already enrolled? <Link href="/login">Sign in to the portal</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
