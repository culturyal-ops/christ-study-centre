'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { BATCH_GROUPS, ALL_BATCH_NAMES, DEFAULT_SUBJECTS } from '@/lib/register/constants'
import { MAX_DOCUMENT_BYTES, parseBatchName, countStudentSubjects } from '@/lib/register/utils'
import { PaymentStatus, Prisma } from '@prisma/client'

const ADMIN_PATHS = ['/admin/register', '/admin/dashboard']

async function requireAdmin() {
  const session = await auth()
  if (!session?.user || session.user.role !== 'ADMIN') {
    throw new Error('Unauthorized')
  }
  return session
}

async function requireStudent() {
  const session = await auth()
  if (!session?.user || session.user.role !== 'STUDENT' || !session.user.studentId) {
    throw new Error('Unauthorized')
  }
  return session
}

function revalidateRegister() {
  for (const path of ADMIN_PATHS) revalidatePath(path)
  revalidatePath('/student/register')
}

export async function ensureBatches() {
  const batchOps: Promise<unknown>[] = []
  let order = 0
  for (const group of BATCH_GROUPS) {
    for (const name of group.batches) {
      const sortOrder = order
      batchOps.push(
        prisma.batch.upsert({
          where: { name },
          update: { groupTitle: group.title, sortOrder },
          create: { name, groupTitle: group.title, sortOrder },
        })
      )
      order += 1
    }
  }
  await Promise.all(batchOps)

  await Promise.all(
    DEFAULT_SUBJECTS.map((name) =>
      prisma.subject.upsert({
        where: { name },
        update: {},
        create: { name },
      })
    )
  )
}

async function ensureSubjectsIfNeeded() {
  const existing = await prisma.subject.findMany({ select: { name: true } })
  const have = new Set(existing.map((s) => s.name))
  const missing = DEFAULT_SUBJECTS.filter((name) => !have.has(name))
  if (missing.length === 0) return

  await Promise.all(
    missing.map((name) =>
      prisma.subject.upsert({
        where: { name },
        update: {},
        create: { name },
      })
    )
  )
}

async function ensureBatchesIfNeeded() {
  const batchCount = await prisma.batch.count()
  if (batchCount >= ALL_BATCH_NAMES.length) {
    await ensureSubjectsIfNeeded()
    return
  }

  await ensureBatches()
}

const studentInclude = {
  batch: { select: { name: true } },
  registerMarks: { orderBy: { date: 'desc' as const } },
  registerDocuments: { orderBy: { uploadedAt: 'desc' as const } },
} satisfies Prisma.StudentInclude

export async function getAdminDashboardStats() {
  await requireAdmin()

  const [totalStudents, pendingCount, feesAgg] = await Promise.all([
    prisma.student.count({ where: { deletedAt: null } }),
    prisma.pendingAdmission.count(),
    prisma.student.aggregate({
      where: { deletedAt: null },
      _sum: { feesAmountPaid: true },
    }),
  ])

  return {
    totalStudents,
    pendingCount,
    feesReceived: feesAgg._sum.feesAmountPaid ?? 0,
  }
}

export async function getAdminDashboardData() {
  await requireAdmin()

  const bootstrap = await getRegisterBootstrap()

  const [pendingPreview, students, feesOverdueCount] = await Promise.all([
    prisma.pendingAdmission.findMany({
      take: 5,
      orderBy: { submittedAt: 'desc' },
    }),
    prisma.student.findMany({
      where: { deletedAt: null },
      include: { batch: { select: { name: true } } },
      orderBy: [{ batch: { name: 'asc' } }, { rollNo: 'asc' }],
    }),
    prisma.student.count({
      where: { deletedAt: null, feesRemaining: { gt: 0 } },
    }),
  ])

  const batchByGroup = BATCH_GROUPS.map((group) => {
    const batches = group.batches
      .map((name) => {
        const info = bootstrap.batches.find((b) => b.name === name)
        return { name, count: info?.studentCount ?? 0 }
      })
      .filter((b) => b.count > 0)

    return {
      title: group.title,
      total: batches.reduce((sum, b) => sum + b.count, 0),
      batches,
    }
  }).filter((g) => g.total > 0)

  return {
    ...bootstrap,
    batchByGroup,
    pendingPreview,
    students,
    feesOverdueCount,
  }
}

export async function getRegisterBootstrap() {
  await requireAdmin()

  const batches = await prisma.batch.findMany({
    orderBy: { sortOrder: 'asc' },
    include: {
      _count: {
        select: {
          students: { where: { deletedAt: null } },
        },
      },
    },
  })

  const [totalStudents, pendingCount, recycleCount, feesAgg, subjects, subjectRows] =
    await Promise.all([
      prisma.student.count({ where: { deletedAt: null } }),
      prisma.pendingAdmission.count(),
      prisma.student.count({ where: { deletedAt: { not: null } } }),
      prisma.student.aggregate({
        where: { deletedAt: null },
        _sum: { feesAmountPaid: true, feesRemaining: true },
      }),
      prisma.subject.findMany({ orderBy: { name: 'asc' } }),
      prisma.student.findMany({
        where: { deletedAt: null },
        select: { subjectCount: true, subjectsText: true },
      }),
    ])

  const totalSubjects = subjectRows.reduce(
    (sum, row) => sum + countStudentSubjects(row),
    0
  )

  const chartData = batches
    .filter((b) => b._count.students > 0)
    .map((b) => ({ name: b.name, count: b._count.students }))

  return {
    batches: batches.map((b) => ({
      id: b.id,
      name: b.name,
      groupTitle: b.groupTitle,
      studentCount: b._count.students,
    })),
    stats: {
      totalStudents,
      pendingCount,
      recycleCount,
      feesReceived: feesAgg._sum.feesAmountPaid ?? 0,
      feesPending: feesAgg._sum.feesRemaining ?? 0,
      totalSubjects,
    },
    chartData,
    subjects: subjects.map((s) => s.name),
  }
}

export async function getAllRegisterStudents() {
  await requireAdmin()
  return prisma.student.findMany({
    where: { deletedAt: null },
    include: {
      batch: { select: { name: true } },
      registerMarks: { orderBy: { date: 'desc' } },
      registerDocuments: { orderBy: { uploadedAt: 'desc' } },
    },
    orderBy: [{ rollNo: 'asc' }],
  })
}

export async function getBatchStudents(batchName: string) {
  await requireAdmin()
  const batch = await prisma.batch.findUnique({ where: { name: batchName } })
  if (!batch) return []

  return prisma.student.findMany({
    where: { batchId: batch.id, deletedAt: null },
    include: studentInclude,
    orderBy: { rollNo: 'asc' },
  })
}

export async function getFeesStudents() {
  await requireAdmin()
  return prisma.student.findMany({
    where: { deletedAt: null },
    include: studentInclude,
    orderBy: [{ rollNo: 'asc' }],
  })
}

export async function getPendingAdmissions() {
  await requireAdmin()
  return prisma.pendingAdmission.findMany({ orderBy: { submittedAt: 'desc' } })
}

export async function getRecycleStudents() {
  await requireAdmin()
  return prisma.student.findMany({
    where: { deletedAt: { not: null } },
    include: studentInclude,
    orderBy: { deletedAt: 'desc' },
  })
}

export async function getStudentForPortal(studentId: string) {
  const session = await auth()
  if (!session?.user) throw new Error('Unauthorized')

  if (session.user.role === 'STUDENT') {
    if (session.user.studentId !== studentId) throw new Error('Unauthorized')
  } else if (session.user.role !== 'ADMIN') {
    throw new Error('Unauthorized')
  }

  return prisma.student.findUnique({
    where: { id: studentId },
    include: studentInclude,
  })
}

type StudentInput = {
  batchName: string
  rollNo: number
  fullName: string
  schoolName?: string
  subjectsText?: string
  subjectCount?: number
  contact?: string
  feesStatus?: PaymentStatus
  feesAmountPaid?: number | null
  feesRemaining?: number | null
  feesDatePaid?: string | null
}

export async function createRegisterStudent(data: StudentInput) {
  await requireAdmin()
  const batch = await prisma.batch.findUnique({ where: { name: data.batchName } })
  if (!batch) throw new Error('Batch not found')

  const { grade, board } = parseBatchName(data.batchName)

  const student = await prisma.student.create({
    data: {
      batchId: batch.id,
      rollNo: data.rollNo,
      fullName: data.fullName.trim(),
      schoolName: data.schoolName?.trim() || null,
      subjectsText: data.subjectsText?.trim() || null,
      subjectCount: data.subjectCount ?? null,
      contact: data.contact?.trim() || null,
      grade,
      board,
      feesStatus: data.feesStatus ?? 'PENDING',
      feesAmountPaid: data.feesAmountPaid ?? null,
      feesRemaining: data.feesRemaining ?? null,
      feesDatePaid: data.feesDatePaid ? new Date(data.feesDatePaid) : null,
    },
    include: studentInclude,
  })

  revalidateRegister()
  return student
}

export async function updateRegisterStudent(id: string, data: StudentInput) {
  await requireAdmin()
  const batch = await prisma.batch.findUnique({ where: { name: data.batchName } })
  if (!batch) throw new Error('Batch not found')

  const { grade, board } = parseBatchName(data.batchName)

  const student = await prisma.student.update({
    where: { id },
    data: {
      batchId: batch.id,
      rollNo: data.rollNo,
      fullName: data.fullName.trim(),
      schoolName: data.schoolName?.trim() || null,
      subjectsText: data.subjectsText?.trim() || null,
      subjectCount: data.subjectCount ?? null,
      contact: data.contact?.trim() || null,
      grade,
      board,
      feesStatus: data.feesStatus ?? 'PENDING',
      feesAmountPaid: data.feesAmountPaid ?? null,
      feesRemaining: data.feesRemaining ?? null,
      feesDatePaid: data.feesDatePaid ? new Date(data.feesDatePaid) : null,
    },
    include: studentInclude,
  })

  revalidateRegister()
  return student
}

export async function softDeleteStudent(id: string) {
  await requireAdmin()
  const student = await prisma.student.findUnique({
    where: { id },
    include: { batch: true },
  })
  if (!student) throw new Error('Student not found')

  await prisma.student.update({
    where: { id },
    data: {
      deletedAt: new Date(),
      deletedFromBatch: student.batch?.name ?? null,
      batchId: null,
    },
  })

  revalidateRegister()
}

export async function restoreStudent(id: string, batchName: string) {
  await requireAdmin()
  const batch = await prisma.batch.findUnique({ where: { name: batchName } })
  if (!batch) throw new Error('Batch not found')

  await prisma.student.update({
    where: { id },
    data: {
      deletedAt: null,
      deletedFromBatch: null,
      batchId: batch.id,
    },
  })

  revalidateRegister()
}

export async function permanentlyDeleteStudent(id: string) {
  await requireAdmin()
  await prisma.student.delete({ where: { id } })
  revalidateRegister()
}

export async function moveStudentsToBatch(studentIds: string[], batchName: string) {
  await requireAdmin()
  const batch = await prisma.batch.findUnique({ where: { name: batchName } })
  if (!batch) throw new Error('Batch not found')

  const { grade, board } = parseBatchName(batchName)

  await prisma.student.updateMany({
    where: { id: { in: studentIds } },
    data: { batchId: batch.id, grade, board },
  })

  revalidateRegister()
}

export async function addRegisterMark(
  studentId: string,
  mark: { exam: string; subject: string; score: string }
) {
  await requireAdmin()
  await prisma.registerMark.create({
    data: {
      studentId,
      exam: mark.exam.trim(),
      subject: mark.subject.trim(),
      score: mark.score.trim(),
    },
  })
  revalidateRegister()
}

export async function deleteRegisterMark(markId: string) {
  await requireAdmin()
  await prisma.registerMark.delete({ where: { id: markId } })
  revalidateRegister()
}

export async function addRegisterDocument(
  studentId: string,
  doc: { title: string; dataUrl: string }
) {
  const session = await auth()
  if (!session?.user) throw new Error('Unauthorized')

  if (session.user.role === 'STUDENT' && session.user.studentId !== studentId) {
    throw new Error('Unauthorized')
  }
  if (session.user.role !== 'ADMIN' && session.user.role !== 'STUDENT') {
    throw new Error('Unauthorized')
  }

  if (doc.dataUrl.length > MAX_DOCUMENT_BYTES * 1.4) {
    throw new Error('Document too large (max 2MB)')
  }

  await prisma.registerDocument.create({
    data: {
      studentId,
      title: doc.title.trim() || 'Document',
      dataUrl: doc.dataUrl,
    },
  })
  revalidateRegister()
}

export async function deleteRegisterDocument(docId: string) {
  await requireAdmin()
  await prisma.registerDocument.delete({ where: { id: docId } })
  revalidateRegister()
}

export async function submitPendingAdmission(data: {
  name: string
  schoolName: string
  subjects: string
  subjectCount?: number
  contact: string
  batchName: string
}) {
  if (!data.name.trim() || !data.contact.trim() || !data.batchName) {
    throw new Error('Please fill required fields')
  }

  await ensureBatchesIfNeeded()

  const admission = await prisma.pendingAdmission.create({
    data: {
      name: data.name.trim(),
      schoolName: data.schoolName.trim(),
      subjects: data.subjects.trim(),
      subjectCount: data.subjectCount ?? null,
      contact: data.contact.trim(),
      batchName: data.batchName,
    },
  })

  revalidatePath('/admission')
  return admission
}

export async function admitPendingAdmission(id: string, rollNo: number) {
  await requireAdmin()
  const pending = await prisma.pendingAdmission.findUnique({ where: { id } })
  if (!pending) throw new Error('Not found')

  const student = await createRegisterStudent({
    batchName: pending.batchName,
    rollNo,
    fullName: pending.name,
    schoolName: pending.schoolName,
    subjectsText: pending.subjects,
    subjectCount: pending.subjectCount ?? undefined,
    contact: pending.contact,
  })

  await prisma.pendingAdmission.delete({ where: { id } })
  revalidateRegister()
  return student
}

export async function rejectPendingAdmission(id: string) {
  await requireAdmin()
  await prisma.pendingAdmission.delete({ where: { id } })
  revalidateRegister()
}

export async function exportAllStudentsCsv() {
  await requireAdmin()
  const students = await getAllRegisterStudents()
  const header = [
    'Class',
    'No',
    'Name',
    'School',
    'Subjects',
    'Total Subj',
    'Contact',
    'Fees',
    'Paid',
    'Remaining',
  ]
  const rows = students.map((s) => [
    s.batch?.name ?? '',
    s.rollNo,
    s.fullName,
    s.schoolName ?? '',
    s.subjectsText ?? '',
    countStudentSubjects(s),
    s.contact ?? '',
    s.feesStatus,
    s.feesAmountPaid ?? '',
    s.feesRemaining ?? '',
  ])

  return [header, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n')
}

export async function exportBatchCsv(batchName: string) {
  await requireAdmin()
  const students = await getBatchStudents(batchName)
  const header = ['No', 'Name', 'School', 'Subjects', 'Contact', 'Fees', 'Paid', 'Remaining']
  const rows = students.map((s) => [
    s.rollNo,
    s.fullName,
    s.schoolName ?? '',
    s.subjectsText ?? '',
    s.contact ?? '',
    s.feesStatus,
    s.feesAmountPaid ?? '',
    s.feesRemaining ?? '',
  ])

  const csv = [header, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n')

  return csv
}

export async function getStudentRegisterView() {
  const session = await requireStudent()
  return getStudentForPortal(session.user.studentId!)
}
