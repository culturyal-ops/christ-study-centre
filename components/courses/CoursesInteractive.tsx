'use client'

import { useCallback, useMemo, useState } from 'react'
import PageSection from '@/components/PageSection'
import FeatureCard from '@/components/FeatureCard'
import ContactForm from '@/components/ContactForm'
import {
  courseProgrammes,
  specialProgrammes,
  type CourseProgramme,
} from '@/lib/courses-data'

const selectStyle = {
  appearance: 'none' as const,
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%2364748b' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 16px center',
}

export default function CoursesInteractive() {
  const [selectedCourse, setSelectedCourse] = useState<CourseProgramme | null>(null)
  const [selectedSpecial, setSelectedSpecial] = useState<string | null>(null)
  const [board, setBoard] = useState('')
  const [grade, setGrade] = useState('')

  const gradeOptions = useMemo(() => {
    if (!selectedCourse) return []
    return selectedCourse.gradeOptions
  }, [selectedCourse])

  const pickCourse = useCallback((course: CourseProgramme) => {
    setSelectedCourse(course)
    setSelectedSpecial(null)
    setBoard(course.boards[0] ?? '')
    setGrade(course.gradeOptions[0] ?? '')
  }, [])

  const pickSpecial = useCallback((title: string) => {
    setSelectedSpecial(title)
    setSelectedCourse(null)
    setBoard('')
    setGrade('')
  }, [])

  const scrollToEnquiry = useCallback(() => {
    document.getElementById('courses-enquiry')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const enquiryPreset = useMemo(
    () => ({
      studentGrade: grade,
      board: board === 'SCERT' ? 'SCERT (State Board)' : board,
      subjects: selectedCourse?.subjects.join(', ') ?? '',
      programme: selectedCourse?.title ?? selectedSpecial ?? '',
    }),
    [board, grade, selectedCourse, selectedSpecial]
  )

  return (
    <>
      <PageSection index="01" category="Programmes" title="All grade levels">
        <p className="csc-section__desc csc-section__desc--spaced">
          Tap a programme to select it — your choice carries into the enquiry form below.
        </p>
        {(selectedCourse || selectedSpecial) && (
          <div className="courses-selection-bar">
            <span>
              Selected: <strong>{selectedCourse?.title ?? selectedSpecial}</strong>
            </span>
            <button type="button" className="courses-selection-bar__link" onClick={scrollToEnquiry}>
              Go to enquiry form ↓
            </button>
          </div>
        )}
        <div className="courses-detail-grid">
          {courseProgrammes.map((course) => (
            <div
              key={course.id}
              role="button"
              tabIndex={0}
              className={`course-detail-card course-detail-card--selectable${selectedCourse?.id === course.id ? ' is-selected' : ''}`}
              onClick={() => pickCourse(course)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  pickCourse(course)
                }
              }}
            >
              <div className="course-detail-header">
                <div className="course-detail-grade-badge">{course.grades}</div>
                <div className="course-detail-boards">
                  {course.boards.map((b) => (
                    <span key={b} className="course-detail-board">
                      {b}
                    </span>
                  ))}
                </div>
              </div>
              <div className="course-detail-body">
                <div className="course-detail-label">Subjects</div>
                <div className="course-detail-tags">
                  {course.subjects.map((s) => (
                    <span key={s} className="course-detail-tag">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="course-detail-label">What you get</div>
                <ul className="course-detail-features">
                  {course.features.map((f, i) => (
                    <li key={f} className="course-detail-feature">
                      <span className="idx">{String(i + 1).padStart(2, '0')}</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="course-detail-footer">
                <span className="course-detail-programme">{course.title}</span>
                <span className="course-detail-select-hint">
                  {selectedCourse?.id === course.id ? 'Selected ✓' : 'Select programme →'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection index="02" category="Beyond Classes" title="Special programmes" alt>
        <p className="csc-section__desc csc-section__desc--spaced">
          Need something outside regular batches? Pick a special programme instead.
        </p>
        <div className="courses-special-grid">
          {specialProgrammes.map((prog, i) => (
            <div
              key={prog.id}
              role="button"
              tabIndex={0}
              className={`courses-special-pick${selectedSpecial === prog.title ? ' is-selected' : ''}`}
              onClick={() => pickSpecial(prog.title)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  pickSpecial(prog.title)
                }
              }}
            >
              <FeatureCard
                index={prog.idx}
                title={prog.title}
                description={prog.desc}
                delay={i}
              />
              <div className="course-detail-footer course-detail-footer--special">
                <span className="course-detail-programme">{prog.title}</span>
                <span className="course-detail-select-hint">
                  {selectedSpecial === prog.title ? 'Selected ✓' : 'Select →'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection
        index="03"
        category="Schedule"
        title="Class timings"
        description="Open Monday to Saturday, 5:30 AM to 8:30 PM. One-on-one slots available on request."
      >
        <div className="timing-list" data-scroll-reveal>
          {[
            { label: 'Monday – Saturday', value: '5:30 AM – 8:30 PM' },
            { label: 'Batch duration', value: '1 hour per subject' },
            { label: 'Sunday', value: 'Closed' },
            { label: 'One-on-one slots', value: 'Flexible — contact us' },
          ].map((t) => (
            <div key={t.label} className="timing-row">
              <span>{t.label}</span>
              <span>{t.value}</span>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection
        index="04"
        category="Enquiry"
        title="Find your batch & enquire"
        description="Choose your programme above, confirm board and grade, then send everything to WhatsApp in one tap."
        alt
      >
        <div id="courses-enquiry" className="courses-enquiry-wrap">
          <div className="courses-enquiry-picks" data-scroll-reveal>
            <div className="courses-enquiry-picks__head">
              <span className="form-section-title">Your selection</span>
              {(selectedCourse || selectedSpecial) && (
                <button
                  type="button"
                  className="courses-enquiry-clear"
                  onClick={() => {
                    setSelectedCourse(null)
                    setSelectedSpecial(null)
                    setBoard('')
                    setGrade('')
                  }}
                >
                  Clear
                </button>
              )}
            </div>

            {!selectedCourse && !selectedSpecial ? (
              <p className="courses-enquiry-empty">
                No programme selected yet — tap a card above, or fill the form manually.
              </p>
            ) : (
              <div className="courses-enquiry-summary">
                <span className="courses-enquiry-chip">
                  {selectedCourse?.title ?? selectedSpecial}
                </span>
                {selectedCourse && (
                  <>
                    <div className="form-grid-2">
                      <div>
                        <label className="form-label">Board</label>
                        <select
                          value={board}
                          onChange={(e) => setBoard(e.target.value)}
                          className="form-input"
                          style={selectStyle}
                        >
                          {selectedCourse.boards.map((b) => (
                            <option key={b} value={b}>
                              {b}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="form-label">Grade</label>
                        <select
                          value={grade}
                          onChange={(e) => setGrade(e.target.value)}
                          className="form-input"
                          style={selectStyle}
                        >
                          {gradeOptions.map((g) => (
                            <option key={g} value={g}>
                              {g}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          <ContactForm preset={enquiryPreset} />
        </div>
      </PageSection>
    </>
  )
}
