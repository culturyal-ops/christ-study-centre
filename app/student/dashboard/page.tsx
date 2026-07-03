import Link from 'next/link'
import { requireAuth } from '@/lib/auth-utils'
import { prisma } from '@/lib/prisma'

export default async function StudentDashboardPage() {
  const session = await requireAuth(['STUDENT'])

  const student = session.user.studentId
    ? await prisma.student.findUnique({
        where: { id: session.user.studentId },
        include: {
          attendance: { take: 10, orderBy: { markedAt: 'desc' } },
          marks: { take: 5 },
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
            ? `Grade ${student.grade} · ${student.board}`
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
          <span className="portal-stat-num">{student?.marks.length ?? 0}</span>
          <span className="portal-stat-lbl">Recent marks</span>
        </div>
        <div className="portal-stat">
          <span className="portal-stat-num">{student?.feePlans.length ?? 0}</span>
          <span className="portal-stat-lbl">Fee records</span>
        </div>
      </div>

      <div className="portal-modules">
        <div className="portal-module">
          <div className="portal-module-head">
            <h2>Attendance</h2>
            <span className="portal-module-status">Coming soon</span>
          </div>
          <p>View session history and attendance percentage over time.</p>
        </div>
        <div className="portal-module">
          <div className="portal-module-head">
            <h2>Marks</h2>
            <span className="portal-module-status">Coming soon</span>
          </div>
          <p>Track test scores, exam results, and subject-wise trends.</p>
        </div>
        <div className="portal-module">
          <div className="portal-module-head">
            <h2>Fees</h2>
            <span className="portal-module-status">Coming soon</span>
          </div>
          <p>See payment status and fee plan details.</p>
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
