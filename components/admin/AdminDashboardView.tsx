import Link from 'next/link'
import RegisterChart from '@/components/register/RegisterChart'
import { BATCH_GROUPS } from '@/lib/register/constants'
import { countStudentSubjects, feesStatusClass, formatFeesStatus } from '@/lib/register/utils'
import type { getAdminDashboardData } from '@/lib/actions/register'

type DashboardData = Awaited<ReturnType<typeof getAdminDashboardData>>

type Props = {
  data: DashboardData
}

function registerHref(view?: string, batch?: string) {
  const params = new URLSearchParams()
  if (batch) params.set('batch', batch)
  else if (view) params.set('view', view)
  const q = params.toString()
  return q ? `/admin/register?${q}` : '/admin/register'
}

export default function AdminDashboardView({ data }: Props) {
  const { stats, chartData, batchByGroup, pendingPreview, students, feesOverdueCount } =
    data

  const quickLinks = [
    { label: 'Full register', href: registerHref('home'), desc: 'Manage all students' },
    {
      label: 'Fees',
      href: registerHref('fees'),
      desc: `₹${stats.feesPending.toLocaleString()} pending`,
      highlight: stats.feesPending > 0,
    },
    {
      label: 'New admissions',
      href: registerHref('pending'),
      desc: stats.pendingCount ? `${stats.pendingCount} waiting` : 'None waiting',
      highlight: stats.pendingCount > 0,
    },
    {
      label: 'Recycle bin',
      href: registerHref('recycle'),
      desc: stats.recycleCount ? `${stats.recycleCount} deleted` : 'Empty',
    },
  ]

  return (
    <div className="portal-page dashboard-page">
      <div className="register-toolbar dashboard-toolbar">
        <div>
          <div className="spread-label">Admin / Dashboard</div>
          <h1>Overview</h1>
          <p className="register-toolbar-sub">
            {stats.totalStudents} students across {chartData.length} active batches
          </p>
        </div>
        <div className="register-actions">
          <Link href={registerHref('home')} className="register-btn">
            Open register
          </Link>
          <Link href={registerHref('home')} className="register-btn register-btn--primary">
            + Add student
          </Link>
        </div>
      </div>

      <div className="dashboard-quick-nav">
        {quickLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={`dashboard-quick-card${link.highlight ? ' dashboard-quick-card--alert' : ''}`}
          >
            <strong>{link.label}</strong>
            <span>{link.desc}</span>
          </Link>
        ))}
      </div>

      <div className="register-hero-stats dashboard-hero-stats">
        <div className="register-hero-stat">
          <strong>{stats.totalStudents}</strong>
          <span>Total students</span>
        </div>
        <div className="register-hero-stat">
          <strong>{stats.totalSubjects}</strong>
          <span>Total subjects</span>
        </div>
        <div className="register-hero-stat register-hero-stat--paid">
          <strong>₹{stats.feesReceived.toLocaleString()}</strong>
          <span>Fees received</span>
        </div>
        <div className="register-hero-stat register-hero-stat--pending">
          <strong>₹{stats.feesPending.toLocaleString()}</strong>
          <span>Fees pending</span>
        </div>
      </div>

      <div className="dashboard-grid">
        <section className="dashboard-panel">
          <div className="dashboard-panel-head">
            <h2>Students by batch</h2>
            <Link href={registerHref('home')}>View chart in register →</Link>
          </div>
          <RegisterChart data={chartData} />
        </section>

        <section className="dashboard-panel dashboard-panel--side">
          <div className="dashboard-panel-head">
            <h2>By board</h2>
          </div>
          <div className="dashboard-board-list">
            {batchByGroup.map((group) => (
              <div key={group.title} className="dashboard-board-group">
                <div className="dashboard-board-head">
                  <span>{group.title}</span>
                  <strong>{group.total}</strong>
                </div>
                <ul>
                  {group.batches.map((b) => (
                    <li key={b.name}>
                      <Link href={registerHref(undefined, b.name)}>{b.name}</Link>
                      <span>{b.count}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {feesOverdueCount > 0 && (
            <div className="dashboard-alert dashboard-alert--fees">
              <strong>{feesOverdueCount} students</strong> with outstanding fees
              <Link href={registerHref('fees')}>Review fees →</Link>
            </div>
          )}

          {stats.pendingCount > 0 && (
            <div className="dashboard-alert dashboard-alert--pending">
              <strong>{stats.pendingCount} applications</strong> awaiting review
              <Link href={registerHref('pending')}>Review now →</Link>
            </div>
          )}

          {pendingPreview.length > 0 && (
            <>
              <div className="dashboard-panel-head dashboard-panel-head--sub">
                <h3>Latest applications</h3>
              </div>
              <ul className="dashboard-pending-list">
                {pendingPreview.map((p) => (
                  <li key={p.id}>
                    <div>
                      <strong>{p.name}</strong>
                      <span>
                        {p.batchName} · {p.contact}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>
      </div>

      <section className="dashboard-panel dashboard-panel--table">
        <div className="dashboard-panel-head">
          <h2>All students</h2>
          <Link href={registerHref('home')}>Edit in register →</Link>
        </div>
        <div className="register-table-wrap">
          <table className="register-table">
            <thead>
              <tr>
                <th>Class</th>
                <th>No.</th>
                <th>Student name</th>
                <th>School</th>
                <th>Subjects</th>
                <th>Total subj.</th>
                <th>Fees</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id}>
                  <td>{s.batch?.name ?? '—'}</td>
                  <td>{s.rollNo}</td>
                  <td>
                    <Link href={registerHref(undefined, s.batch?.name ?? undefined)} className="dashboard-student-link">
                      {s.fullName}
                    </Link>
                  </td>
                  <td>{s.schoolName ?? '—'}</td>
                  <td>{s.subjectsText ?? '—'}</td>
                  <td>{countStudentSubjects(s)}</td>
                  <td className={feesStatusClass(s.feesStatus)}>
                    {formatFeesStatus(s.feesStatus)}
                    {s.feesRemaining != null && s.feesRemaining > 0 && (
                      <> · ₹{s.feesRemaining.toLocaleString()}</>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="dashboard-batch-pills">
        {BATCH_GROUPS.flatMap((g) => g.batches).map((name) => {
          const count = data.batches.find((b) => b.name === name)?.studentCount ?? 0
          if (count === 0) return null
          return (
            <Link key={name} href={registerHref(undefined, name)} className="dashboard-batch-pill">
              {name}
              <span>{count}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
