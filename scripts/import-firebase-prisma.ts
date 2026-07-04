/**
 * Import scripts/firebase-export.json into Postgres via Prisma.
 * Run: node scripts/fetch-firebase-export.mjs && npx tsx scripts/import-firebase-prisma.ts
 */

import * as fs from 'fs'
import * as path from 'path'
import { neon } from '@neondatabase/serverless'
import { PaymentStatus, PrismaClient } from '@prisma/client'
import { PrismaNeonHttp } from '@prisma/adapter-neon'
import { parseBatchName } from '../lib/register/utils'

type FirebaseStudent = {
  id: string
  no?: number
  name: string
  schoolName?: string
  subjects?: string
  subjectCount?: number
  contact?: string
  fees?: string
  feesAmountPaid?: string | number
  feesRemaining?: string | number
  feesDatePaid?: string
  marks?: Array<{ id?: string; exam: string; subject: string; score: string; date?: string }>
  documents?: Array<{ id?: string; title: string; url: string; uploadedAt?: string }>
  deletedFrom?: string
  deletedAt?: string
  batchName?: string
  submittedAt?: string
}

type FirebaseExport = {
  studentsData?: Record<string, FirebaseStudent[]>
  recycleBin?: FirebaseStudent[]
  pendingAdmissions?: FirebaseStudent[]
  customSubjects?: string[]
}

function toArray<T>(value: T[] | Record<string, T> | null | undefined): T[] {
  if (value == null) return []
  if (Array.isArray(value)) return value
  if (typeof value === 'object') return Object.values(value)
  return []
}

function normalizeBatchName(name: string): string {
  const aliases: Record<string, string> = {
    '+2 Science': '12 CBSE',
    '+2 Commerce': '12 CBSE',
    '+1 Science': '11 CBSE',
  }
  return aliases[name] ?? name
}

function mapFeesStatus(fees?: string): PaymentStatus {
  const f = (fees ?? 'Pending').toLowerCase()
  if (f === 'paid') return PaymentStatus.PAID
  if (f === 'partial') return PaymentStatus.PARTIAL
  if (f === 'overdue') return PaymentStatus.OVERDUE
  return PaymentStatus.PENDING
}

function numOrNull(v: string | number | undefined | null): number | null {
  if (v === undefined || v === null || v === '') return null
  const n = typeof v === 'number' ? v : parseFloat(String(v).replace(/,/g, ''))
  return Number.isFinite(n) ? n : null
}

function dateOrNull(v?: string): Date | null {
  if (!v) return null
  const d = new Date(v)
  return Number.isNaN(d.getTime()) ? null : d
}

function parseSubjectCount(student: FirebaseStudent): number | null {
  if (student.subjectCount != null) return student.subjectCount
  const subj = (student.subjects ?? '').trim()
  const paren = subj.match(/^\((\d+)\)$/)
  if (paren) return Number(paren[1])
  if (!subj) return null
  return subj.split(',').map((s) => s.trim()).filter(Boolean).length || null
}

function cuidLike(prefix: string, seed: string): string {
  return `${prefix}_${seed.replace(/[^a-zA-Z0-9]/g, '').slice(0, 20)}`
}

async function clearRegisterData(url: string) {
  const sql = neon(url)
  await sql`DELETE FROM "RegisterDocument"`
  await sql`DELETE FROM "RegisterMark"`
  await sql`DELETE FROM "PendingAdmission"`
  await sql`DELETE FROM "_StudentSubjects"`
  await sql`DELETE FROM "AttendanceRecord" WHERE "studentId" IN (SELECT id FROM "Student")`
  await sql`DELETE FROM "MarkEntry" WHERE "studentId" IN (SELECT id FROM "Student")`
  await sql`DELETE FROM "Payment" WHERE "studentId" IN (SELECT id FROM "Student")`
  await sql`DELETE FROM "FeePlan" WHERE "studentId" IN (SELECT id FROM "Student")`
  await sql`DELETE FROM "Student"`
}

async function upsertStudent(
  prisma: PrismaClient,
  batchMap: Map<string, string>,
  student: FirebaseStudent,
  batchName: string | null,
  recycled: boolean
) {
  if (!student.id || !student.name) return

  const { grade, board } = batchName
    ? parseBatchName(normalizeBatchName(batchName))
    : { grade: '1', board: 'CBSE' as const }

  const batchId =
    batchName && !recycled ? batchMap.get(normalizeBatchName(batchName)) ?? null : null

  await prisma.student.create({
    data: {
      id: student.id,
      batchId,
      rollNo: student.no ?? 0,
      fullName: student.name,
      schoolName: student.schoolName || null,
      subjectsText: student.subjects || null,
      subjectCount: parseSubjectCount(student),
      grade,
      board,
      contact: student.contact || null,
      feesStatus: mapFeesStatus(student.fees),
      feesAmountPaid: numOrNull(student.feesAmountPaid),
      feesRemaining: numOrNull(student.feesRemaining),
      feesDatePaid: dateOrNull(student.feesDatePaid),
      deletedAt: recycled ? dateOrNull(student.deletedAt) ?? new Date() : null,
      deletedFromBatch: recycled
        ? student.deletedFrom ?? batchName ?? null
        : null,
      guardianPhone: '',
    },
  })

  for (const mark of student.marks ?? []) {
    const markId = cuidLike('mark', mark.id ?? `${student.id}_${mark.exam}_${mark.subject}`)
    await prisma.registerMark.create({
      data: {
        id: markId,
        studentId: student.id,
        exam: mark.exam,
        subject: mark.subject,
        score: mark.score,
        date: dateOrNull(mark.date) ?? new Date(),
      },
    })
  }

  for (const doc of student.documents ?? []) {
    if (doc.url.length > 500_000) continue
    const docId = cuidLike('doc', doc.id ?? `${student.id}_${doc.title}`)
    await prisma.registerDocument.create({
      data: {
        id: docId,
        studentId: student.id,
        title: doc.title,
        dataUrl: doc.url,
        uploadedAt: dateOrNull(doc.uploadedAt) ?? new Date(),
      },
    })
  }
}

async function main() {
  const jsonPath = path.resolve('scripts/firebase-export.json')
  if (!fs.existsSync(jsonPath)) {
    console.error('Missing scripts/firebase-export.json — run: node scripts/fetch-firebase-export.mjs')
    process.exit(1)
  }

  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8')) as FirebaseExport
  const url = process.env.DATABASE_URL
  if (!url) {
    console.error('DATABASE_URL not set')
    process.exit(1)
  }

  const adapter = new PrismaNeonHttp(url, { arrayMode: false, fullResults: true })
  const prisma = new PrismaClient({ adapter })

  console.log('Clearing old register data…')
  await clearRegisterData(url)

  const batches = await prisma.batch.findMany()
  const batchMap = new Map(batches.map((b) => [b.name, b.id]))

  for (const subject of data.customSubjects ?? []) {
    if (!subject) continue
    await prisma.subject.create({ data: { name: subject } }).catch(() => {})
  }

  let imported = 0
  for (const [rawBatch, students] of Object.entries(data.studentsData ?? {})) {
    const batchName = normalizeBatchName(rawBatch)
    for (const student of toArray(students)) {
      await upsertStudent(prisma, batchMap, student, batchName, false)
      imported++
    }
  }

  for (const student of toArray(data.recycleBin)) {
    await upsertStudent(
      prisma,
      batchMap,
      student,
      student.deletedFrom ?? null,
      true
    )
    imported++
  }

  for (const pending of toArray(data.pendingAdmissions)) {
    if (!pending.id || !pending.name) continue
    await prisma.pendingAdmission.create({
      data: {
        id: pending.id,
        name: pending.name,
        schoolName: pending.schoolName ?? '',
        subjects: pending.subjects ?? '',
        subjectCount: pending.subjectCount ?? null,
        contact: pending.contact ?? '',
        batchName: normalizeBatchName(pending.batchName ?? '12 CBSE'),
        submittedAt: dateOrNull(pending.submittedAt) ?? new Date(),
      },
    }).catch(() => {})
  }

  const [active, recycle, pending] = await Promise.all([
    prisma.student.count({ where: { deletedAt: null } }),
    prisma.student.count({ where: { deletedAt: { not: null } } }),
    prisma.pendingAdmission.count(),
  ])

  console.log(`✅ Imported ${imported} records`)
  console.log(`Active students: ${active}, Recycle: ${recycle}, Pending: ${pending}`)

  await prisma.$disconnect()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
