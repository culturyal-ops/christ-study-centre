import Link from 'next/link'
import { requireAuth } from '@/lib/auth-utils'
import { getAdminDashboardStats } from '@/lib/actions/register'

export default async function AdminDashboardPage() {
  await requireAuth(['ADMIN'])

  const stats = await getAdminDashboardStats()

  const modules = [
    {
      title: 'Admission register',
      desc: 'Batches, students, fees, marks, documents, pending admissions, recycle bin.',
      href: '/admin/register',
      status: 'Open',
    },
    {
      title: 'Attendance',
      desc: 'Mark and review session attendance by batch.',
      href: '/admin/dashboard',
      status: 'Coming soon',
    },
    {
      title: 'Timetable',
      desc: 'Build weekly class schedules by subject.',
      href: '/admin/dashboard',
      status: 'Coming soon',
    },
  ]

  return (
    <div className="portal-page">
      <div className="portal-page-head">
        <div className="spread-label">Admin / Dashboard</div>
        <h1>Overview</h1>
        <p>Christ Study Centre admin portal — same register workflow, built into this site.</p>
      </div>

      <div className="portal-stats">
        <div className="portal-stat">
          <span className="portal-stat-num">{stats.totalStudents}</span>
          <span className="portal-stat-lbl">Students</span>
        </div>
        <div className="portal-stat">
          <span className="portal-stat-num">₹{stats.feesReceived.toLocaleString()}</span>
          <span className="portal-stat-lbl">Fees received</span>
        </div>
        <div className="portal-stat">
          <span className="portal-stat-num">{stats.pendingCount}</span>
          <span className="portal-stat-lbl">Pending admissions</span>
        </div>
      </div>

      <div className="portal-modules">
        {modules.map((mod) => (
          <Link key={mod.title} href={mod.href} className="portal-module" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
            <div className="portal-module-head">
              <h2>{mod.title}</h2>
              <span className="portal-module-status">{mod.status}</span>
            </div>
            <p>{mod.desc}</p>
          </Link>
        ))}
      </div>

      <p className="portal-note">
        <Link href="/admin/register">Open full register →</Link>
      </p>
    </div>
  )
}
