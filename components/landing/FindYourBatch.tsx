'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  BATCH_BOARD_OPTIONS,
  BATCH_TIME_OPTIONS,
  DEFAULT_SUBJECTS,
  batchNameForBoardGrade,
  getGradesForBoard,
  type BatchBoard,
  type BatchTimeOption,
} from '@/lib/register/constants'
import { ownerWhatsAppUrl } from '@/lib/site-info'

type Step = 'board' | 'grade' | 'subjects' | 'time' | 'review'

const STEPS: Step[] = ['board', 'grade', 'subjects', 'time', 'review']

const stepTitles: Record<Step, string> = {
  board: 'Which board?',
  grade: 'Which class?',
  subjects: 'Which subjects?',
  time: 'Preferred batch time?',
  review: 'Review & send',
}

function buildWhatsAppMessage(input: {
  board: string
  batch: string
  subjects: string[]
  timeLabel: string
  notes: string
}) {
  const lines = [
    '*Find Your Batch — Christ Study Centre*',
    '',
    `Board: ${input.board}`,
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
  const [board, setBoard] = useState<BatchBoard | null>(null)
  const [grade, setGrade] = useState<string | null>(null)
  const [subjects, setSubjects] = useState<string[]>([])
  const [time, setTime] = useState<BatchTimeOption | null>(null)
  const [notes, setNotes] = useState('')

  const step = STEPS[stepIndex]
  const progress = ((stepIndex + 1) / STEPS.length) * 100

  const batch = useMemo(() => {
    if (!board || !grade) return null
    return batchNameForBoardGrade(board, grade)
  }, [board, grade])

  const grades = useMemo(() => (board ? getGradesForBoard(board) : []), [board])

  const boardLabel = useMemo(
    () => BATCH_BOARD_OPTIONS.find((b) => b.id === board)?.label ?? '',
    [board]
  )

  const timeLabel = useMemo(
    () => BATCH_TIME_OPTIONS.find((t) => t.id === time)?.label ?? '',
    [time]
  )

  const canContinue =
    (step === 'board' && board !== null) ||
    (step === 'grade' && grade !== null) ||
    (step === 'subjects' && subjects.length > 0) ||
    (step === 'time' && time !== null) ||
    step === 'review'

  const selectBoard = (next: BatchBoard) => {
    setBoard(next)
    setGrade(null)
  }

  const selectGrade = (next: string) => {
    setGrade(next)
  }

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
    if (!board || !batch || subjects.length === 0 || !time) return
    const message = buildWhatsAppMessage({
      board: boardLabel,
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

  const chipMotion = reduced
    ? {}
    : {
        whileHover: { y: -2, scale: 1.02 },
        whileTap: { scale: 0.97 },
        transition: { type: 'spring' as const, stiffness: 420, damping: 28 },
      }

  return (
    <div className="csc-landing__batch-quiz" data-hero-fade>
      <div className="csc-landing__batch-quiz-head">
        <span className="csc-landing__batch-quiz-badge">New here?</span>
        <p className="csc-landing__batch-quiz-title">Find your batch</p>
        <p className="csc-landing__batch-quiz-sub">
          Board, class, subjects — we&apos;ll open WhatsApp with everything filled in.
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
            {step === 'board' && (
              <div className="csc-landing__batch-quiz-boards">
                {BATCH_BOARD_OPTIONS.map((option) => (
                  <motion.button
                    key={option.id}
                    type="button"
                    className={`csc-landing__batch-quiz-board-card${
                      board === option.id ? ' is-selected' : ''
                    }`}
                    onClick={() => selectBoard(option.id)}
                    aria-pressed={board === option.id}
                    {...chipMotion}
                  >
                    <span className="csc-landing__batch-quiz-board-label">{option.label}</span>
                    <span className="csc-landing__batch-quiz-board-detail">{option.detail}</span>
                  </motion.button>
                ))}
              </div>
            )}

            {step === 'grade' && board && (
              <div className="csc-landing__batch-quiz-grades">
                {grades.map((g) => (
                  <motion.button
                    key={g}
                    type="button"
                    className={`csc-landing__batch-quiz-grade-chip${
                      grade === g ? ' is-selected' : ''
                    }`}
                    onClick={() => selectGrade(g)}
                    aria-pressed={grade === g}
                    {...chipMotion}
                  >
                    <span className="csc-landing__batch-quiz-grade-num">{g}</span>
                    <span className="csc-landing__batch-quiz-grade-label">Class</span>
                  </motion.button>
                ))}
              </div>
            )}

            {step === 'subjects' && (
              <div className="csc-landing__batch-quiz-options csc-landing__batch-quiz-options--wrap">
                {DEFAULT_SUBJECTS.map((subject) => (
                  <motion.button
                    key={subject}
                    type="button"
                    className={`csc-landing__batch-quiz-chip${
                      subjects.includes(subject) ? ' is-selected' : ''
                    }`}
                    onClick={() => toggleSubject(subject)}
                    aria-pressed={subjects.includes(subject)}
                    {...chipMotion}
                  >
                    {subject}
                  </motion.button>
                ))}
              </div>
            )}

            {step === 'time' && (
              <div className="csc-landing__batch-quiz-options csc-landing__batch-quiz-options--stack">
                {BATCH_TIME_OPTIONS.map((option) => (
                  <motion.button
                    key={option.id}
                    type="button"
                    className={`csc-landing__batch-quiz-time${time === option.id ? ' is-selected' : ''}`}
                    onClick={() => setTime(option.id)}
                    aria-pressed={time === option.id}
                    {...chipMotion}
                  >
                    <span className="csc-landing__batch-quiz-time-label">{option.label}</span>
                    <span className="csc-landing__batch-quiz-time-detail">{option.detail}</span>
                  </motion.button>
                ))}
              </div>
            )}

            {step === 'review' && (
              <div className="csc-landing__batch-quiz-review">
                <dl className="csc-landing__batch-quiz-summary">
                  <div>
                    <dt>Board</dt>
                    <dd>{boardLabel}</dd>
                  </div>
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
