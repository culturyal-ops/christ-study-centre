'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  BATCH_GROUPS,
  BATCH_TIME_OPTIONS,
  DEFAULT_SUBJECTS,
  batchGroupLabel,
  type BatchTimeOption,
} from '@/lib/register/constants'
import { ownerWhatsAppUrl } from '@/lib/site-info'

type Step = 'batch' | 'subjects' | 'time' | 'review'

const STEPS: Step[] = ['batch', 'subjects', 'time', 'review']

const stepTitles: Record<Step, string> = {
  batch: 'Which class?',
  subjects: 'Which subjects?',
  time: 'Preferred batch time?',
  review: 'Review & send',
}

function buildWhatsAppMessage(input: {
  batch: string
  subjects: string[]
  timeLabel: string
  notes: string
}) {
  const lines = [
    '*Find Your Batch — Christ Study Centre*',
    '',
    `Class / Batch: ${input.batch}`,
    `Subjects: ${input.subjects.join(', ')}`,
    `Preferred time: ${input.timeLabel}`,
  ]
  if (input.notes.trim()) {
    lines.push('', `Notes: ${input.notes.trim()}`)
  }
  return lines.join('\n')
}

export default function FindYourBatch() {
  const reduced = useReducedMotion()
  const [stepIndex, setStepIndex] = useState(0)
  const [batch, setBatch] = useState<string | null>(null)
  const [subjects, setSubjects] = useState<string[]>([])
  const [time, setTime] = useState<BatchTimeOption | null>(null)
  const [notes, setNotes] = useState('')

  const step = STEPS[stepIndex]
  const progress = ((stepIndex + 1) / STEPS.length) * 100

  const timeLabel = useMemo(
    () => BATCH_TIME_OPTIONS.find((t) => t.id === time)?.label ?? '',
    [time]
  )

  const canContinue =
    (step === 'batch' && batch !== null) ||
    (step === 'subjects' && subjects.length > 0) ||
    (step === 'time' && time !== null) ||
    step === 'review'

  const toggleSubject = (subject: string) => {
    setSubjects((prev) => {
      if (subject === 'All Subjects') {
        return prev.includes('All Subjects') ? [] : ['All Subjects']
      }
      const withoutAll = prev.filter((s) => s !== 'All Subjects')
      return withoutAll.includes(subject)
        ? withoutAll.filter((s) => s !== subject)
        : [...withoutAll, subject]
    })
  }

  const goNext = () => {
    if (!canContinue || stepIndex >= STEPS.length - 1) return
    setStepIndex((i) => i + 1)
  }

  const goBack = () => {
    if (stepIndex === 0) return
    setStepIndex((i) => i - 1)
  }

  const sendWhatsApp = () => {
    if (!batch || subjects.length === 0 || !time) return
    const message = buildWhatsAppMessage({
      batch,
      subjects,
      timeLabel: `${timeLabel} (${BATCH_TIME_OPTIONS.find((t) => t.id === time)?.detail ?? ''})`,
      notes,
    })
    window.open(ownerWhatsAppUrl(message), '_blank', 'noopener,noreferrer')
  }

  const slide = reduced
    ? {}
    : {
        initial: { opacity: 0, x: 24 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -24 },
        transition: { duration: 0.35, ease: 'easeOut' as const },
      }

  return (
    <div className="csc-landing__batch-quiz" data-hero-fade>
      <div className="csc-landing__batch-quiz-head">
        <span className="csc-landing__batch-quiz-badge">New here?</span>
        <p className="csc-landing__batch-quiz-title">Find your batch</p>
        <p className="csc-landing__batch-quiz-sub">
          Tap through — we&apos;ll open WhatsApp with everything filled in.
        </p>
      </div>

      <div
        className="csc-landing__batch-quiz-progress"
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Step ${stepIndex + 1} of ${STEPS.length}`}
      >
        <span className="csc-landing__batch-quiz-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <p className="csc-landing__batch-quiz-step-label">
        Step {stepIndex + 1} of {STEPS.length} · {stepTitles[step]}
      </p>

      <div className="csc-landing__batch-quiz-body">
        <AnimatePresence mode="wait">
          <motion.div key={step} className="csc-landing__batch-quiz-panel" {...slide}>
            {step === 'batch' && (
              <div className="csc-landing__batch-quiz-groups">
                {BATCH_GROUPS.map((group) => (
                  <div key={group.title} className="csc-landing__batch-quiz-group">
                    <p className="csc-landing__batch-quiz-group-label">
                      {batchGroupLabel(group.title)}
                    </p>
                    <div className="csc-landing__batch-quiz-options">
                      {group.batches.map((name) => (
                        <button
                          key={name}
                          type="button"
                          className={`csc-landing__batch-quiz-chip${batch === name ? ' is-selected' : ''}`}
                          onClick={() => setBatch(name)}
                          aria-pressed={batch === name}
                        >
                          {name}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {step === 'subjects' && (
              <div className="csc-landing__batch-quiz-options csc-landing__batch-quiz-options--wrap">
                {DEFAULT_SUBJECTS.map((subject) => (
                  <button
                    key={subject}
                    type="button"
                    className={`csc-landing__batch-quiz-chip${subjects.includes(subject) ? ' is-selected' : ''}`}
                    onClick={() => toggleSubject(subject)}
                    aria-pressed={subjects.includes(subject)}
                  >
                    {subject}
                  </button>
                ))}
              </div>
            )}

            {step === 'time' && (
              <div className="csc-landing__batch-quiz-options csc-landing__batch-quiz-options--stack">
                {BATCH_TIME_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    className={`csc-landing__batch-quiz-time${time === option.id ? ' is-selected' : ''}`}
                    onClick={() => setTime(option.id)}
                    aria-pressed={time === option.id}
                  >
                    <span className="csc-landing__batch-quiz-time-label">{option.label}</span>
                    <span className="csc-landing__batch-quiz-time-detail">{option.detail}</span>
                  </button>
                ))}
              </div>
            )}

            {step === 'review' && (
              <div className="csc-landing__batch-quiz-review">
                <dl className="csc-landing__batch-quiz-summary">
                  <div>
                    <dt>Class / batch</dt>
                    <dd>{batch}</dd>
                  </div>
                  <div>
                    <dt>Subjects</dt>
                    <dd>{subjects.join(', ')}</dd>
                  </div>
                  <div>
                    <dt>Preferred time</dt>
                    <dd>
                      {timeLabel}
                      {time
                        ? ` · ${BATCH_TIME_OPTIONS.find((t) => t.id === time)?.detail}`
                        : ''}
                    </dd>
                  </div>
                </dl>
                <label className="csc-landing__batch-quiz-notes-label">
                  Anything else? <span className="csc-landing__batch-quiz-optional">(optional)</span>
                  <textarea
                    className="csc-landing__batch-quiz-notes"
                    rows={2}
                    placeholder="e.g. need weekend slot, sibling in same batch…"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </label>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="csc-landing__batch-quiz-actions">
        {stepIndex > 0 && (
          <button type="button" className="csc-landing__batch-quiz-back" onClick={goBack}>
            Back
          </button>
        )}
        {step !== 'review' ? (
          <button
            type="button"
            className="csc-landing__batch-quiz-next"
            disabled={!canContinue}
            onClick={goNext}
          >
            Continue
          </button>
        ) : (
          <button
            type="button"
            className="csc-landing__batch-quiz-wa"
            disabled={!batch || subjects.length === 0 || !time}
            onClick={sendWhatsApp}
          >
            Send enquiry on WhatsApp
          </button>
        )}
      </div>
    </div>
  )
}
