import RegisterApp from '@/components/register/RegisterApp'
import { getStudentRegisterView } from '@/lib/actions/register'
import { requireAuth } from '@/lib/auth-utils'
import '@/app/portal-register.css'

export default async function StudentRegisterPage() {
  await requireAuth(['STUDENT'])
  const student = await getStudentRegisterView()

  if (!student) {
    return (
      <div className="portal-page">
        <p>No student profile linked to this account yet.</p>
      </div>
    )
  }

  return <RegisterApp bootstrap={{ batches: [], stats: { totalStudents: 0, pendingCount: 0, recycleCount: 0, feesReceived: 0, feesPending: 0 }, subjects: [] }} mode="student" student={student} />
}
