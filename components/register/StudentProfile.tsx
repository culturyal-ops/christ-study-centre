'use client'

import { useState, useTransition } from 'react'
import {
  addRegisterDocument,
  addRegisterMark,
  deleteRegisterDocument,
  deleteRegisterMark,
} from '@/lib/actions/register'
import type { RegisterStudent } from '@/components/register/types'

type Props = {
  student: RegisterStudent
  canEditMarks: boolean
  canUploadDocs: boolean
  compact?: boolean
}

export default function StudentProfile({
  student,
  canEditMarks,
  canUploadDocs,
  compact,
}: Props) {
  const [markExam, setMarkExam] = useState('')
  const [markSubject, setMarkSubject] = useState('')
  const [markScore, setMarkScore] = useState('')
  const [docTitle, setDocTitle] = useState('')
  const [busy, start] = useTransition()

  const refresh = () => window.location.reload()

  const addMark = () => {
    if (!markExam || !markSubject || !markScore) return
    start(async () => {
      await addRegisterMark(student.id, {
        exam: markExam,
        subject: markSubject,
        score: markScore,
      })
      refresh()
    })
  }

  const onFile = (file: File | null) => {
    if (!file || file.size > 2 * 1024 * 1024) return
    const reader = new FileReader()
    reader.onload = () => {
      start(async () => {
        await addRegisterDocument(student.id, {
          title: docTitle || file.name,
          dataUrl: reader.result as string,
        })
        refresh()
      })
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="register-expand" style={compact ? { marginTop: 8 } : undefined}>
      <h4>Marks</h4>
      {student.registerMarks.length === 0 ? (
        <p style={{ opacity: 0.5, margin: '0 0 12px' }}>No marks yet</p>
      ) : (
        <div className="register-chip-row">
          {student.registerMarks.map((m) => (
            <span key={m.id} className="register-chip">
              {m.exam} · {m.subject}: {m.score}
              {canEditMarks && (
                <button
                  type="button"
                  style={{
                    marginLeft: 6,
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                  }}
                  onClick={() =>
                    start(async () => {
                      await deleteRegisterMark(m.id)
                      refresh()
                    })
                  }
                >
                  ×
                </button>
              )}
            </span>
          ))}
        </div>
      )}
      {canEditMarks && (
        <div className="register-actions" style={{ marginBottom: 16 }}>
          <input
            placeholder="Exam"
            value={markExam}
            onChange={(e) => setMarkExam(e.target.value)}
            className="register-btn"
            style={{ borderRadius: 8 }}
          />
          <input
            placeholder="Subject"
            value={markSubject}
            onChange={(e) => setMarkSubject(e.target.value)}
            className="register-btn"
            style={{ borderRadius: 8 }}
          />
          <input
            placeholder="Score"
            value={markScore}
            onChange={(e) => setMarkScore(e.target.value)}
            className="register-btn"
            style={{ borderRadius: 8 }}
          />
          <button
            type="button"
            className="register-btn register-btn--primary"
            disabled={busy}
            onClick={addMark}
          >
            Add mark
          </button>
        </div>
      )}

      <h4>Documents</h4>
      {student.registerDocuments.length === 0 ? (
        <p style={{ opacity: 0.5, margin: '0 0 12px' }}>No documents</p>
      ) : (
        <ul style={{ margin: '0 0 12px', paddingLeft: 18 }}>
          {student.registerDocuments.map((d) => (
            <li key={d.id}>
              <a href={d.dataUrl} download={d.title} target="_blank" rel="noreferrer">
                {d.title}
              </a>
              {canEditMarks && (
                <button
                  type="button"
                  style={{
                    marginLeft: 8,
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    color: 'var(--deep-burgundy)',
                  }}
                  onClick={() =>
                    start(async () => {
                      await deleteRegisterDocument(d.id)
                      refresh()
                    })
                  }
                >
                  Remove
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
      {canUploadDocs && (
        <div className="register-actions">
          <input
            placeholder="Document title"
            value={docTitle}
            onChange={(e) => setDocTitle(e.target.value)}
            className="register-btn"
            style={{ borderRadius: 8 }}
          />
          <label className="register-btn" style={{ cursor: 'pointer' }}>
            Upload (max 2MB)
            <input
              type="file"
              hidden
              accept="image/*,.pdf"
              onChange={(e) => onFile(e.target.files?.[0] ?? null)}
            />
          </label>
        </div>
      )}
    </div>
  )
}
