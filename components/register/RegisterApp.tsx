'use client'

import { useCallback, useState, useTransition } from 'react'
import type { PaymentStatus } from '@prisma/client'
import {
  admitPendingAdmission,
  createRegisterStudent,
  exportBatchCsv,
  getBatchStudents,
  getFeesStudents,
  getPendingAdmissions,
  getRecycleStudents,
  moveStudentsToBatch,
  permanentlyDeleteStudent,
  rejectPendingAdmission,
  restoreStudent,
  softDeleteStudent,
  updateRegisterStudent,
} from '@/lib/actions/register'
import { BATCH_GROUPS } from '@/lib/register/constants'
import type { RegisterView } from '@/lib/register/constants'
import { feesStatusClass, formatFeesStatus } from '@/lib/register/utils'
import StudentProfile from '@/components/register/StudentProfile'
import type {
  Bootstrap,
  PendingAdmissionRow,
  RegisterStudent,
  StudentForm,
} from '@/components/register/types'

const emptyForm = (batchName = '12 CBSE'): StudentForm => ({
  batchName,
  rollNo: 1,
  fullName: '',
  schoolName: '',
  subjectsText: '',
  subjectCount: '',
  contact: '',
  feesStatus: 'PENDING',
  feesAmountPaid: '',
  feesRemaining: '',
  feesDatePaid: '',
})

type Props = {
  bootstrap: Bootstrap
  mode: 'admin' | 'student'
  student?: RegisterStudent | null
}

export default function RegisterApp({ bootstrap, mode, student: studentProp }: Props) {
  const [view, setView] = useState<RegisterView>('home')
  const [students, setStudents] = useState<RegisterStudent[]>([])
  const [pendingAdmissions, setPendingAdmissions] = useState<PendingAdmissionRow[]>([])
  const [recycle, setRecycle] = useState<RegisterStudent[]>([])
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [expanded, setExpanded] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<RegisterStudent | null>(null)
  const [form, setForm] = useState<StudentForm>(emptyForm())
  const [error, setError] = useState('')
  const [isSaving, startSaving] = useTransition()

  const currentBatch = view.startsWith('batch:') ? view.replace('batch:', '') : null

  const loadView = useCallback(async (nextView: RegisterView) => {
    setView(nextView)
    setSelected(new Set())
    setExpanded(null)
    setError('')

    if (nextView.startsWith('batch:')) {
      const batchName = nextView.replace('batch:', '')
      const rows = await getBatchStudents(batchName)
      setStudents(rows as RegisterStudent[])
    } else if (nextView === 'fees') {
      const rows = await getFeesStudents()
      setStudents(rows as RegisterStudent[])
    } else if (nextView === 'pending') {
      const rows = await getPendingAdmissions()
      setPendingAdmissions(rows as PendingAdmissionRow[])
    } else if (nextView === 'recycle') {
      const rows = await getRecycleStudents()
      setRecycle(rows as RegisterStudent[])
    }
  }, [])

  const openCreate = () => {
    setEditing(null)
    setForm(emptyForm(currentBatch ?? '12 CBSE'))
    setModalOpen(true)
    setError('')
  }

  const openEdit = (s: RegisterStudent) => {
    setEditing(s)
    setForm({
      batchName: s.batch?.name ?? currentBatch ?? '12 CBSE',
      rollNo: s.rollNo,
      fullName: s.fullName,
      schoolName: s.schoolName ?? '',
      subjectsText: s.subjectsText ?? '',
      subjectCount: s.subjectCount?.toString() ?? '',
      contact: s.contact ?? '',
      feesStatus: s.feesStatus,
      feesAmountPaid: s.feesAmountPaid?.toString() ?? '',
      feesRemaining: s.feesRemaining?.toString() ?? '',
      feesDatePaid: s.feesDatePaid
        ? new Date(s.feesDatePaid).toISOString().slice(0, 10)
        : '',
    })
    setModalOpen(true)
    setError('')
  }

  const saveStudent = () => {
    startSaving(async () => {
      try {
        const payload = {
          batchName: form.batchName,
          rollNo: Number(form.rollNo),
          fullName: form.fullName,
          schoolName: form.schoolName,
          subjectsText: form.subjectsText,
          subjectCount: form.subjectCount ? Number(form.subjectCount) : undefined,
          contact: form.contact,
          feesStatus: form.feesStatus,
          feesAmountPaid: form.feesAmountPaid ? Number(form.feesAmountPaid) : null,
          feesRemaining: form.feesRemaining ? Number(form.feesRemaining) : null,
          feesDatePaid: form.feesDatePaid || null,
        }

        if (editing) await updateRegisterStudent(editing.id, payload)
        else await createRegisterStudent(payload)

        setModalOpen(false)
        if (view.startsWith('batch:') || view === 'fees') await loadView(view)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to save')
      }
    })
  }

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleExport = async () => {
    if (!currentBatch) return
    const csv = await exportBatchCsv(currentBatch)
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${currentBatch.replace(/\s+/g, '-')}-students.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (mode === 'student' && studentProp) {
    return (
      <div className="register-main">
        <div className="register-toolbar">
          <h1>{studentProp.fullName}</h1>
          <p style={{ opacity: 0.6, margin: 0 }}>
            {studentProp.batch?.name ?? 'Student'} · Roll {studentProp.rollNo}
          </p>
        </div>
        <StudentProfile student={studentProp} canEditMarks={false} canUploadDocs />
      </div>
    )
  }

  return (
    <div className="register-layout">
      <aside className="register-sidebar">
        <button
          type="button"
          className={`register-nav-btn ${view === 'home' ? 'is-active' : ''}`}
          onClick={() => loadView('home')}
        >
          <span>Overview</span>
        </button>
        <button
          type="button"
          className={`register-nav-btn ${view === 'fees' ? 'is-active' : ''}`}
          onClick={() => loadView('fees')}
        >
          <span>Fees</span>
        </button>
        <button
          type="button"
          className={`register-nav-btn ${view === 'pending' ? 'is-active' : ''}`}
          onClick={() => loadView('pending')}
        >
          <span>Pending admissions</span>
          <span>{bootstrap.stats.pendingCount}</span>
        </button>
        <button
          type="button"
          className={`register-nav-btn ${view === 'recycle' ? 'is-active' : ''}`}
          onClick={() => loadView('recycle')}
        >
          <span>Recycle bin</span>
          <span>{bootstrap.stats.recycleCount}</span>
        </button>

        {BATCH_GROUPS.map((group) => (
          <div key={group.title} className="register-group">
            <h2>{group.title}</h2>
            {group.batches.map((name) => {
              const info = bootstrap.batches.find((b) => b.name === name)
              return (
                <button
                  key={name}
                  type="button"
                  className={`register-nav-btn ${view === `batch:${name}` ? 'is-active' : ''}`}
                  onClick={() => loadView(`batch:${name}`)}
                >
                  <span>{name}</span>
                  <span>{info?.studentCount ?? 0}</span>
                </button>
              )
            })}
          </div>
        ))}
      </aside>

      <div className="register-main">
        {view === 'home' && (
          <>
            <div className="register-toolbar">
              <h1>Admission register</h1>
            </div>
            <div className="register-stats">
              <div className="register-stat">
                <strong>{bootstrap.stats.totalStudents}</strong>
                <span>Students</span>
              </div>
              <div className="register-stat">
                <strong>₹{bootstrap.stats.feesReceived.toLocaleString()}</strong>
                <span>Fees received</span>
              </div>
              <div className="register-stat">
                <strong>₹{bootstrap.stats.feesPending.toLocaleString()}</strong>
                <span>Fees pending</span>
              </div>
              <div className="register-stat">
                <strong>{bootstrap.stats.pendingCount}</strong>
                <span>Pending admissions</span>
              </div>
            </div>
            <p style={{ opacity: 0.6 }}>
              Select a batch from the sidebar to manage students, marks, fees, and
              documents.
            </p>
          </>
        )}

        {currentBatch && (
          <>
            <div className="register-toolbar">
              <h1>{currentBatch}</h1>
              <div className="register-actions">
                <button type="button" className="register-btn" onClick={handleExport}>
                  Export CSV
                </button>
                {selected.size > 0 && (
                  <button
                    type="button"
                    className="register-btn"
                    onClick={() => {
                      const target = prompt('Move selected students to batch name:')
                      if (!target) return
                      startSaving(async () => {
                        await moveStudentsToBatch([...selected], target)
                        await loadView(view)
                      })
                    }}
                  >
                    Move ({selected.size})
                  </button>
                )}
                <button
                  type="button"
                  className="register-btn register-btn--primary"
                  onClick={openCreate}
                >
                  Add student
                </button>
              </div>
            </div>
            <StudentTable
              students={students}
              selected={selected}
              expanded={expanded}
              onToggleSelect={toggleSelect}
              onToggleExpand={(id) => setExpanded((e) => (e === id ? null : id))}
              onEdit={openEdit}
              onDelete={(id) =>
                startSaving(async () => {
                  await softDeleteStudent(id)
                  await loadView(view)
                })
              }
              showBatch={false}
            />
          </>
        )}

        {view === 'fees' && (
          <>
            <div className="register-toolbar">
              <h1>All fees</h1>
            </div>
            <StudentTable
              students={students}
              selected={selected}
              expanded={expanded}
              onToggleSelect={toggleSelect}
              onToggleExpand={(id) => setExpanded((e) => (e === id ? null : id))}
              onEdit={openEdit}
              onDelete={(id) =>
                startSaving(async () => {
                  await softDeleteStudent(id)
                  await loadView(view)
                })
              }
              showBatch
            />
          </>
        )}

        {view === 'pending' && (
          <>
            <div className="register-toolbar">
              <h1>Pending admissions</h1>
            </div>
            {pendingAdmissions.length === 0 ? (
              <div className="register-empty">No pending applications</div>
            ) : (
              <div className="register-table-wrap">
                <table className="register-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Batch</th>
                      <th>School</th>
                      <th>Contact</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingAdmissions.map((p) => (
                      <tr key={p.id}>
                        <td>{p.name}</td>
                        <td>{p.batchName}</td>
                        <td>{p.schoolName}</td>
                        <td>{p.contact}</td>
                        <td>
                          <button
                            type="button"
                            className="register-btn register-btn--primary"
                            onClick={() => {
                              const roll = prompt('Roll number for this student:', '1')
                              if (!roll) return
                              startSaving(async () => {
                                await admitPendingAdmission(p.id, Number(roll))
                                await loadView('pending')
                              })
                            }}
                          >
                            Admit
                          </button>{' '}
                          <button
                            type="button"
                            className="register-btn register-btn--danger"
                            onClick={() =>
                              startSaving(async () => {
                                await rejectPendingAdmission(p.id)
                                await loadView('pending')
                              })
                            }
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {view === 'recycle' && (
          <>
            <div className="register-toolbar">
              <h1>Recycle bin</h1>
            </div>
            {recycle.length === 0 ? (
              <div className="register-empty">Recycle bin is empty</div>
            ) : (
              <div className="register-table-wrap">
                <table className="register-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>From batch</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recycle.map((s) => (
                      <tr key={s.id}>
                        <td>{s.fullName}</td>
                        <td>{s.deletedFromBatch ?? '—'}</td>
                        <td>
                          <button
                            type="button"
                            className="register-btn"
                            onClick={() => {
                              const batch = prompt(
                                'Restore to batch:',
                                s.deletedFromBatch ?? '12 CBSE'
                              )
                              if (!batch) return
                              startSaving(async () => {
                                await restoreStudent(s.id, batch)
                                await loadView('recycle')
                              })
                            }}
                          >
                            Restore
                          </button>{' '}
                          <button
                            type="button"
                            className="register-btn register-btn--danger"
                            onClick={() => {
                              if (!confirm('Permanently delete this student?')) return
                              startSaving(async () => {
                                await permanentlyDeleteStudent(s.id)
                                await loadView('recycle')
                              })
                            }}
                          >
                            Delete forever
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>

      {modalOpen && (
        <div
          className="register-modal-backdrop"
          onClick={() => setModalOpen(false)}
          role="presentation"
        >
          <div
            className="register-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <h2>{editing ? 'Edit student' : 'Add student'}</h2>
            <div className="register-form-grid">
              <label>
                Batch
                <select
                  value={form.batchName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, batchName: e.target.value }))
                  }
                >
                  {bootstrap.batches.map((b) => (
                    <option key={b.id} value={b.name}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Roll no.
                <input
                  type="number"
                  value={form.rollNo}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, rollNo: Number(e.target.value) }))
                  }
                />
              </label>
              <label>
                Full name
                <input
                  value={form.fullName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, fullName: e.target.value }))
                  }
                  required
                />
              </label>
              <label>
                School
                <input
                  value={form.schoolName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, schoolName: e.target.value }))
                  }
                />
              </label>
              <label>
                Subjects
                <input
                  value={form.subjectsText}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, subjectsText: e.target.value }))
                  }
                />
              </label>
              <label>
                Contact
                <input
                  value={form.contact}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, contact: e.target.value }))
                  }
                />
              </label>
              <label>
                Fees status
                <select
                  value={form.feesStatus}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      feesStatus: e.target.value as PaymentStatus,
                    }))
                  }
                >
                  <option value="PENDING">Pending</option>
                  <option value="PAID">Paid</option>
                  <option value="PARTIAL">Partial</option>
                  <option value="OVERDUE">Overdue</option>
                </select>
              </label>
              <label>
                Amount paid (₹)
                <input
                  type="number"
                  value={form.feesAmountPaid}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, feesAmountPaid: e.target.value }))
                  }
                />
              </label>
              <label>
                Remaining (₹)
                <input
                  type="number"
                  value={form.feesRemaining}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, feesRemaining: e.target.value }))
                  }
                />
              </label>
            </div>
            {error && <p className="register-error">{error}</p>}
            <div className="register-modal-actions">
              <button
                type="button"
                className="register-btn"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="register-btn register-btn--primary"
                disabled={isSaving}
                onClick={saveStudent}
              >
                {isSaving ? 'Saving…' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function StudentTable({
  students,
  selected,
  expanded,
  onToggleSelect,
  onToggleExpand,
  onEdit,
  onDelete,
  showBatch,
}: {
  students: RegisterStudent[]
  selected: Set<string>
  expanded: string | null
  onToggleSelect: (id: string) => void
  onToggleExpand: (id: string) => void
  onEdit: (s: RegisterStudent) => void
  onDelete: (id: string) => void
  showBatch: boolean
}) {
  if (students.length === 0) {
    return <div className="register-empty">No students in this view yet</div>
  }

  return (
    <div className="register-table-wrap">
      <table className="register-table">
        <thead>
          <tr>
            <th />
            <th>No</th>
            <th>Name</th>
            {showBatch && <th>Batch</th>}
            <th>School</th>
            <th>Subjects</th>
            <th>Contact</th>
            <th>Fees</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selected.has(s.id)}
                  onChange={() => onToggleSelect(s.id)}
                  aria-label={`Select ${s.fullName}`}
                />
              </td>
              <td>{s.rollNo}</td>
              <td>
                <button
                  type="button"
                  className="register-btn"
                  style={{ padding: '2px 0', border: 'none', background: 'none' }}
                  onClick={() => onToggleExpand(s.id)}
                >
                  {s.fullName} {expanded === s.id ? '▾' : '▸'}
                </button>
                {expanded === s.id && (
                  <StudentProfile
                    student={s}
                    canEditMarks
                    canUploadDocs
                    compact
                  />
                )}
              </td>
              {showBatch && <td>{s.batch?.name ?? '—'}</td>}
              <td>{s.schoolName ?? '—'}</td>
              <td>{s.subjectsText ?? '—'}</td>
              <td>{s.contact ?? '—'}</td>
              <td className={feesStatusClass(s.feesStatus)}>
                {formatFeesStatus(s.feesStatus)}
                {s.feesRemaining != null && s.feesRemaining > 0 && (
                  <> · ₹{s.feesRemaining}</>
                )}
              </td>
              <td>
                <button type="button" className="register-btn" onClick={() => onEdit(s)}>
                  Edit
                </button>{' '}
                <button
                  type="button"
                  className="register-btn register-btn--danger"
                  onClick={() => onDelete(s.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
