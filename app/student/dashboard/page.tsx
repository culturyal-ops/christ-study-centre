import Link from 'next/link'
import { requireAuth } from '@/lib/auth-utils'
import { prisma } from '@/lib/prisma'
import { formatFeesStatus, feesStatusClass } from '@/lib/register/utils'

export default async function StudentDashboardPage() {
  const session = await requireAuth(['STUDENT'])

  const student = session.user.studentId
    ? await prisma.student.findUnique({
        where: { id: session.user.studentId },
        include: {
          batch: { select: { name: true } },
          registerMarks: { take: 5, orderBy: { date: 'desc' } },
          attendance: { take: 10, orderBy: { markedAt: 'desc' } },
          feePlans: { take: 3, orderBy: { dueDate: 'desc' } },
        },
      })
    : null

  const presentCount = student
    ? student.attendance.filter((a) => a.status === 'PRESENT').length
    : 0
  const attendanceTotal = student?.attendance.length ?? 0
  const attendancePct =
    attendanceTotal > 0 ? Math.round((presentCount / attendanceTotal) * 100) : null

  return (
    <div className="portal-page">
      <div className="portal-page-head">
        <div className="spread-label">Student / Dashboard</div>
        <h1>{student?.fullName ?? session.user.username}</h1>
        <p>
          {student
            ? `${student.batch?.name ?? `Grade ${student.grade}`} · ${student.board}`
            : 'Your academic portal'}
        </p>
      </div>

      <div className="portal-stats">
        <div className="portal-stat">
          <span className="portal-stat-num">
            {attendancePct !== null ? `${attendancePct}%` : '—'}
          </span>
          <span className="portal-stat-lbl">Recent attendance</span>
        </div>
        <div className="portal-stat">
          <span className="portal-stat-num">{student?.registerMarks.length ?? 0}</span>
          <span className="portal-stat-lbl">Recent marks</span>
        </div>
        <div className="portal-stat">
          <span
            className={`portal-stat-num ${student ? feesStatusClass(student.feesStatus) : ''}`}
            style={{ fontSize: student ? '1.1rem' : undefined }}
          >
            {student ? formatFeesStatus(student.feesStatus) : '—'}
          </span>
          <span className="portal-stat-lbl">Fee status</span>
        </div>
      </div>

      <div className="portal-modules">
        <Link href="/student/register" className="portal-module" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
          <div className="portal-module-head">
            <h2>My register profile</h2>
            <span className="portal-module-status">Open</span>
          </div>
          <p>View your batch, subjects, marks, fees, and upload documents.</p>
        </Link>
        <div className="portal-module">
          <div className="portal-module-head">
            <h2>Attendance</h2>
            <span className="portal-module-status">Coming soon</span>
          </div>
          <p>View session history and attendance percentage over time.</p>
        </div>
        <div className="portal-module">
          <div className="portal-module-head">
            <h2>Timetable</h2>
            <span className="portal-module-status">Coming soon</span>
          </div>
          <p>Your weekly class schedule by subject.</p>
        </div>
      </div>

      <p className="portal-note">
        Need help? Contact the centre on WhatsApp or visit RV Road, Pala.{' '}
        <Link href="/contact">Contact →</Link>
      </p>
    </div>
  )
}
