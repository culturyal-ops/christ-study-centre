import Link from 'next/link'
import { requireAuth } from '@/lib/auth-utils'
import { prisma } from '@/lib/prisma'

export default async function AdminDashboardPage() {
  await requireAuth(['ADMIN'])

  const [studentCount, sessionCount, pendingPayments] = await Promise.all([
    prisma.student.count(),
    prisma.classSession.count(),
    prisma.feePlan.count({ where: { status: 'PENDING' } }),
  ])

  const modules = [
    {
      title: 'Students',
      desc: 'Manage enrolments, grades, and guardian contacts.',
      href: '/admin/dashboard',
      status: 'Coming soon',
    },
    {
      title: 'Attendance',
      desc: 'Mark and review session attendance by batch.',
      href: '/admin/dashboard',
      status: 'Coming soon',
    },
    {
      title: 'Marks',
      desc: 'Enter exam scores and track performance.',
      href: '/admin/dashboard',
      status: 'Coming soon',
    },
    {
      title: 'Fees',
      desc: 'Record payments and fee plan status.',
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
        <p>Manage students, attendance, marks, fees, and timetables.</p>
      </div>

      <div className="portal-stats">
        <div className="portal-stat">
          <span className="portal-stat-num">{studentCount}</span>
          <span className="portal-stat-lbl">Students</span>
        </div>
        <div className="portal-stat">
          <span className="portal-stat-num">{sessionCount}</span>
          <span className="portal-stat-lbl">Class sessions</span>
        </div>
        <div className="portal-stat">
          <span className="portal-stat-num">{pendingPayments}</span>
          <span className="portal-stat-lbl">Pending fees</span>
        </div>
      </div>

      <div className="portal-modules">
        {modules.map((mod) => (
          <div key={mod.title} className="portal-module">
            <div className="portal-module-head">
              <h2>{mod.title}</h2>
              <span className="portal-module-status">{mod.status}</span>
            </div>
            <p>{mod.desc}</p>
          </div>
        ))}
      </div>

      <p className="portal-note">
        Full admin tools are scaffolded in the database and auth layer. Module
        pages will be added next.{' '}
        <Link href="/">Return to public site →</Link>
      </p>
    </div>
  )
}
