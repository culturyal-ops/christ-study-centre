'use client'

import { useCallback, useEffect, useMemo, useState, useTransition } from 'react'
import {
  admitPendingAdmission,
  createRegisterStudent,
  exportAllStudentsCsv,
  exportBatchCsv,
  getAllRegisterStudents,
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
import { countStudentSubjects, feesStatusClass, formatFeesStatus, computeFeesRemaining, deriveFeesStatus } from '@/lib/register/utils'
import RegisterChart from '@/components/register/RegisterChart'
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
  username: '',
  password: '',
  feesTotal: '',
  feesAmountPaid: '',
  feesDatePaid: '',
})

type Props = {
  bootstrap: Bootstrap
  mode: 'admin' | 'student'
  student?: RegisterStudent | null
  initialView?: RegisterView
}

export default function RegisterApp({ bootstrap, mode, student: studentProp, initialView }: Props) {
  const [view, setView] = useState<RegisterView>(initialView ?? 'home')
  const [students, setStudents] = useState<RegisterStudent[]>([])
  const [pendingAdmissions, setPendingAdmissions] = useState<PendingAdmissionRow[]>([])
  const [recycle, setRecycle] = useState<RegisterStudent[]>([])
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [expanded, setExpanded] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<RegisterStudent | null>(null)
  const [form, setForm] = useState<StudentForm>(emptyForm())
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({
    CBSE: false,
    ICSE: true,
    STATE: true,
  })
  const [isSaving, startSaving] = useTransition()

  useEffect(() => {
    if (mode === 'student' && studentProp) return
    document.documentElement.classList.add('portal-register-active')
    return () => {
      document.documentElement.classList.remove('portal-register-active')
    }
  }, [mode, studentProp])

  const currentBatch = view.startsWith('batch:') ? view.replace('batch:', '') : null

  const filterStudents = useCallback(
    (list: RegisterStudent[]) => {
      const q = search.trim().toLowerCase()
      if (!q) return list
      return list.filter(
        (s) =>
          s.fullName.toLowerCase().includes(q) ||
          (s.batch?.name ?? '').toLowerCase().includes(q) ||
          (s.schoolName ?? '').toLowerCase().includes(q) ||
          (s.subjectsText ?? '').toLowerCase().includes(q) ||
          (s.contact ?? '').includes(q)
      )
    },
    [search]
  )

  const groupCount = (title: string) => {
    const group = BATCH_GROUPS.find((g) => g.title === title)
    if (!group) return 0
    return group.batches.reduce((sum, name) => {
      const info = bootstrap.batches.find((b) => b.name === name)
      return sum + (info?.studentCount ?? 0)
    }, 0)
  }

  const loadView = useCallback(async (nextView: RegisterView) => {
    setView(nextView)
    setSelected(new Set())
    setExpanded(null)
    setError('')

    if (nextView === 'home') {
      const rows = await getAllRegisterStudents()
      setStudents(rows as RegisterStudent[])
    } else if (nextView.startsWith('batch:')) {
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

  useEffect(() => {
    if (mode === 'admin') {
      void loadView(initialView ?? 'home')
    }
  }, [loadView, mode, initialView])

  const openCreate = () => {
    setEditing(null)
    setForm(emptyForm(currentBatch ?? '12 CBSE'))
    setModalOpen(true)
    setError('')
  }

  const openEdit = (s: RegisterStudent) => {
    const inferredTotal =
      s.feesTotal ??
      (s.feesAmountPaid != null && s.feesRemaining != null
        ? s.feesAmountPaid + s.feesRemaining
        : null)

    setEditing(s)
    setForm({
      batchName: s.batch?.name ?? currentBatch ?? '12 CBSE',
      rollNo: s.rollNo,
      fullName: s.fullName,
      schoolName: s.schoolName ?? '',
      subjectsText: s.subjectsText ?? '',
      subjectCount: s.subjectCount?.toString() ?? '',
      contact: s.contact ?? '',
      username: s.user?.username ?? '',
      password: '',
      feesTotal: inferredTotal?.toString() ?? '',
      feesAmountPaid: s.feesAmountPaid?.toString() ?? '',
      feesDatePaid: s.feesDatePaid
        ? new Date(s.feesDatePaid).toISOString().slice(0, 10)
        : '',
    })
    setModalOpen(true)
    setError('')
  }

  const computedFeesRemaining = useMemo(() => {
    const total = form.feesTotal ? Number(form.feesTotal) : null
    const paid = form.feesAmountPaid ? Number(form.feesAmountPaid) : 0
    const remaining = computeFeesRemaining(
      total != null && !Number.isNaN(total) ? total : null,
      Number.isNaN(paid) ? 0 : paid
    )
    return remaining != null ? String(remaining) : ''
  }, [form.feesTotal, form.feesAmountPaid])

  const computedFeesStatus = useMemo(() => {
    const total = form.feesTotal ? Number(form.feesTotal) : null
    const paid = form.feesAmountPaid ? Number(form.feesAmountPaid) : 0
    return deriveFeesStatus(
      total != null && !Number.isNaN(total) ? total : null,
      Number.isNaN(paid) ? 0 : paid
    )
  }, [form.feesTotal, form.feesAmountPaid])

  const saveStudent = () => {
    if (!form.fullName.trim()) {
      setError('Full name is required')
      return
    }

    if (!editing) {
      if (!form.username.trim()) {
        setError('Login ID is required')
        return
      }
      if (!form.password.trim()) {
        setError('Password is required')
        return
      }
    } else if (form.password.trim() && !form.username.trim()) {
      setError('Login ID is required when changing password')
      return
    }

    const feesTotal = form.feesTotal ? Number(form.feesTotal) : null
    const feesAmountPaid = form.feesAmountPaid ? Number(form.feesAmountPaid) : null

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
          username: form.username.trim() || undefined,
          password: form.password.trim() || undefined,
          feesStatus: computedFeesStatus,
          feesTotal: feesTotal != null && !Number.isNaN(feesTotal) ? feesTotal : null,
          feesAmountPaid:
            feesAmountPaid != null && !Number.isNaN(feesAmountPaid) ? feesAmountPaid : null,
          feesDatePaid: form.feesDatePaid || null,
        }

        if (editing) await updateRegisterStudent(editing.id, payload)
        else await createRegisterStudent(payload)

        setModalOpen(false)
        if (view === 'home' || view.startsWith('batch:') || view === 'fees') await loadView(view)
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

  const handleExportAll = async () => {
    const csv = await exportAllStudentsCsv()
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'christ-study-centre-students.csv'
    a.click()
    URL.revokeObjectURL(url)
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
      <div className="register-layout register-layout--solo">
        <div className="register-main">
          <div className="register-toolbar">
            <h1>{studentProp.fullName}</h1>
            <p style={{ opacity: 0.6, margin: 0 }}>
              {studentProp.batch?.name ?? 'Student'} · Roll {studentProp.rollNo}
            </p>
          </div>
          <StudentProfile student={studentProp} canEditMarks={false} canUploadDocs />
        </div>
      </div>
    )
  }

  return (
    <div className="register-layout">
      <aside className="register-sidebar" aria-label="Register navigation">
        <input
          type="search"
          className="register-search"
          placeholder="Search anything…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="button"
          className={`register-nav-btn ${view === 'home' ? 'is-active' : ''}`}
          onClick={() => loadView('home')}
        >
          <span>Home</span>
        </button>
        <button
          type="button"
          className={`register-nav-btn ${view === 'fees' ? 'is-active' : ''}`}
          onClick={() => loadView('fees')}
        >
          <span>Fees</span>
        </button>

        {BATCH_GROUPS.map((group) => (
          <div key={group.title} className="register-group">
            <button
              type="button"
              className="register-group-toggle"
              onClick={() =>
                setCollapsedGroups((prev) => ({
                  ...prev,
                  [group.title]: !prev[group.title],
                }))
              }
            >
              <span>{group.title}</span>
              <span>{groupCount(group.title)}</span>
            </button>
            {!collapsedGroups[group.title] &&
              group.batches.map((name) => {
                const info = bootstrap.batches.find((b) => b.name === name)
                return (
                  <button
                    key={name}
                    type="button"
                    className={`register-nav-btn register-nav-btn--batch ${view === `batch:${name}` ? 'is-active' : ''}`}
                    onClick={() => loadView(`batch:${name}`)}
                  >
                    <span>{name}</span>
                    <span>{info?.studentCount ?? 0}</span>
                  </button>
                )
              })}
          </div>
        ))}

        <button
          type="button"
          className={`register-nav-btn ${view === 'pending' ? 'is-active' : ''}`}
          onClick={() => loadView('pending')}
        >
          <span>New admissions</span>
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
      </aside>

      <div className="register-main register-print-area">
        {view === 'home' && (
          <>
            <div className="register-toolbar">
              <div>
                <h1>Home</h1>
                <p className="register-toolbar-sub">
                  {bootstrap.stats.totalStudents} students
                </p>
              </div>
              <div className="register-actions">
                <button type="button" className="register-btn" onClick={handleExportAll}>
                  Export CSV
                </button>
                <button
                  type="button"
                  className="register-btn"
                  onClick={() => window.print()}
                >
                  Print / PDF
                </button>
                <button
                  type="button"
                  className="register-btn register-btn--primary"
                  onClick={openCreate}
                >
                  + Add new student
                </button>
              </div>
            </div>

            <div className="register-hero-stats">
              <div className="register-hero-stat">
                <strong>{bootstrap.stats.totalStudents}</strong>
                <span>Total students</span>
              </div>
              <div className="register-hero-stat">
                <strong>{bootstrap.stats.totalSubjects}</strong>
                <span>Total subjects</span>
              </div>
            </div>

            <RegisterChart data={bootstrap.chartData} />

            <HomeStudentTable
              students={filterStudents(students)}
              selected={selected}
              expanded={expanded}
              onToggleSelect={toggleSelect}
              onToggleExpand={(id) => setExpanded((e) => (e === id ? null : id))}
              onEdit={openEdit}
              onDelete={(id) =>
                startSaving(async () => {
                  await softDeleteStudent(id)
                  await loadView('home')
                })
              }
            />
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
              <div>
                <h1>Fees collection</h1>
                <p className="register-toolbar-sub">
                  {bootstrap.stats.totalStudents} students
                </p>
              </div>
              <div className="register-actions">
                <button
                  type="button"
                  className="register-btn"
                  onClick={() => window.print()}
                >
                  Print / PDF
                </button>
              </div>
            </div>
            <div className="register-hero-stats register-hero-stats--fees">
              <div className="register-hero-stat register-hero-stat--paid">
                <strong>₹{bootstrap.stats.feesReceived.toLocaleString()}</strong>
                <span>Fees received</span>
              </div>
              <div className="register-hero-stat register-hero-stat--pending">
                <strong>₹{bootstrap.stats.feesPending.toLocaleString()}</strong>
                <span>Fees pending</span>
              </div>
            </div>
            <FeesTable
              students={filterStudents(students)}
              onEdit={openEdit}
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
                          <div className="register-row-actions">
                            <button
                              type="button"
                              className="register-row-btn register-row-btn--primary"
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
                            </button>
                            <button
                              type="button"
                              className="register-row-btn register-row-btn--danger"
                              onClick={() =>
                                startSaving(async () => {
                                  await rejectPendingAdmission(p.id)
                                  await loadView('pending')
                                })
                              }
                            >
                              Reject
                            </button>
                          </div>
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
                          <div className="register-row-actions">
                            <button
                              type="button"
                              className="register-row-btn"
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
                            </button>
                            <button
                              type="button"
                              className="register-row-btn register-row-btn--danger"
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
                          </div>
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
            <div className="register-form-grid register-form-grid--modal">
              <div className="register-form-field">
                <label className="register-form-label" htmlFor="reg-batch">
                  Batch
                </label>
                <select
                  id="reg-batch"
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
              </div>
              <div className="register-form-field">
                <label className="register-form-label" htmlFor="reg-roll">
                  Roll no.
                </label>
                <input
                  id="reg-roll"
                  type="number"
                  min={1}
                  value={form.rollNo}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, rollNo: Number(e.target.value) }))
                  }
                />
              </div>
              <div className="register-form-field register-form-field--full">
                <label className="register-form-label" htmlFor="reg-name">
                  Full name
                </label>
                <input
                  id="reg-name"
                  value={form.fullName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, fullName: e.target.value }))
                  }
                  placeholder="Student full name"
                  required
                />
              </div>
              <div className="register-form-field">
                <label className="register-form-label" htmlFor="reg-school">
                  School
                </label>
                <input
                  id="reg-school"
                  value={form.schoolName}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, schoolName: e.target.value }))
                  }
                  placeholder="School name"
                />
              </div>
              <div className="register-form-field">
                <label className="register-form-label" htmlFor="reg-contact">
                  Contact
                </label>
                <input
                  id="reg-contact"
                  value={form.contact}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, contact: e.target.value }))
                  }
                  placeholder="Phone or WhatsApp number"
                />
              </div>
              <div className="register-form-field register-form-field--full">
                <label className="register-form-label" htmlFor="reg-subjects">
                  Subjects
                </label>
                <input
                  id="reg-subjects"
                  value={form.subjectsText}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, subjectsText: e.target.value }))
                  }
                  placeholder="e.g. Physics, Chemistry, Maths"
                />
              </div>

              <div className="register-form-section register-form-field--full">
                <p className="register-form-section-title">Portal login</p>
                <p className="register-form-section-hint">
                  {editing
                    ? 'Leave password blank to keep the current one. Add login details if this student has no portal account yet.'
                    : 'Create the student’s portal username and password.'}
                </p>
              </div>
              <div className="register-form-field">
                <label className="register-form-label" htmlFor="reg-username">
                  Login ID
                </label>
                <input
                  id="reg-username"
                  value={form.username}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, username: e.target.value }))
                  }
                  placeholder="e.g. CSC2026-042"
                  autoComplete="off"
                  required={!editing}
                />
              </div>
              <div className="register-form-field">
                <label className="register-form-label" htmlFor="reg-password">
                  Password{editing ? ' (optional)' : ''}
                </label>
                <input
                  id="reg-password"
                  type="password"
                  value={form.password}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, password: e.target.value }))
                  }
                  placeholder={editing ? 'Leave blank to keep current' : 'Set password'}
                  autoComplete="new-password"
                  required={!editing}
                />
              </div>

              <div className="register-form-section register-form-field--full">
                <p className="register-form-section-title">Fees</p>
                <p className="register-form-section-hint">
                  Remaining is calculated automatically from total and paid.
                </p>
              </div>
              <div className="register-form-field">
                <label className="register-form-label" htmlFor="reg-fees-total">
                  Total fee (₹)
                </label>
                <input
                  id="reg-fees-total"
                  type="number"
                  min={0}
                  value={form.feesTotal}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, feesTotal: e.target.value }))
                  }
                  placeholder="0"
                />
              </div>
              <div className="register-form-field">
                <label className="register-form-label" htmlFor="reg-amount-paid">
                  Paid (₹)
                </label>
                <input
                  id="reg-amount-paid"
                  type="number"
                  min={0}
                  value={form.feesAmountPaid}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, feesAmountPaid: e.target.value }))
                  }
                  placeholder="0"
                />
              </div>
              <div className="register-form-field">
                <label className="register-form-label" htmlFor="reg-remaining">
                  Remaining (₹)
                </label>
                <input
                  id="reg-remaining"
                  type="text"
                  readOnly
                  className="register-form-readonly"
                  value={computedFeesRemaining}
                  placeholder="—"
                  aria-live="polite"
                />
              </div>
              <div className="register-form-field">
                <label className="register-form-label" htmlFor="reg-fees-status">
                  Fees status
                </label>
                <input
                  id="reg-fees-status"
                  type="text"
                  readOnly
                  className="register-form-readonly"
                  value={formatFeesStatus(computedFeesStatus)}
                  aria-live="polite"
                />
              </div>
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

function RegisterTableActions({
  onEdit,
  onDelete,
}: {
  onEdit: () => void
  onDelete: () => void
}) {
  return (
    <div className="register-row-actions">
      <button type="button" className="register-row-btn" onClick={onEdit}>
        Edit
      </button>
      <button
        type="button"
        className="register-row-btn register-row-btn--danger"
        onClick={onDelete}
      >
        Delete
      </button>
    </div>
  )
}

function HomeStudentTable({
  students,
  selected,
  expanded,
  onToggleSelect,
  onToggleExpand,
  onEdit,
  onDelete,
}: {
  students: RegisterStudent[]
  selected: Set<string>
  expanded: string | null
  onToggleSelect: (id: string) => void
  onToggleExpand: (id: string) => void
  onEdit: (s: RegisterStudent) => void
  onDelete: (id: string) => void
}) {
  if (students.length === 0) {
    return <div className="register-empty">No students match your search</div>
  }

  return (
    <div className="register-table-wrap">
      <table className="register-table">
        <thead>
          <tr>
            <th />
            <th>Class</th>
            <th>No.</th>
            <th>Student name</th>
            <th>School name</th>
            <th>Subjects</th>
            <th>Total subj.</th>
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
              <td>{s.batch?.name ?? '—'}</td>
              <td>{s.rollNo}</td>
              <td>
                <button
                  type="button"
                  className="register-link-btn"
                  onClick={() => onToggleExpand(s.id)}
                >
                  {s.fullName} {expanded === s.id ? '▾' : '▸'}
                </button>
                {expanded === s.id && (
                  <StudentProfile student={s} canEditMarks canUploadDocs compact />
                )}
              </td>
              <td>{s.schoolName ?? '—'}</td>
              <td>{s.subjectsText ?? '—'}</td>
              <td>{countStudentSubjects(s)}</td>
              <td>
                <RegisterTableActions
                  onEdit={() => onEdit(s)}
                  onDelete={() => onDelete(s.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function FeesTable({
  students,
  onEdit,
}: {
  students: RegisterStudent[]
  onEdit: (s: RegisterStudent) => void
}) {
  if (students.length === 0) {
    return <div className="register-empty">No students match your search</div>
  }

  return (
    <div className="register-table-wrap">
      <table className="register-table">
        <thead>
          <tr>
            <th>Class</th>
            <th>Student name</th>
            <th>Paid</th>
            <th>Pending</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.batch?.name ?? '—'}</td>
              <td>{s.fullName}</td>
              <td className="reg-fees--paid">
                {s.feesAmountPaid != null && s.feesAmountPaid > 0
                  ? `₹${s.feesAmountPaid.toLocaleString()}`
                  : '—'}
              </td>
              <td className="reg-fees--overdue">
                {s.feesRemaining != null && s.feesRemaining > 0
                  ? `₹${s.feesRemaining.toLocaleString()}`
                  : '—'}
              </td>
              <td>
                <button type="button" className="register-row-btn" onClick={() => onEdit(s)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
                <RegisterTableActions
                  onEdit={() => onEdit(s)}
                  onDelete={() => onDelete(s.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
