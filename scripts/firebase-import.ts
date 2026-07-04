/**
 * Firebase (christ-register) → PostgreSQL import
 *
 * Usage A — from JSON export (easiest):
 *   1. Firebase Console → Realtime Database → ⋮ → Export JSON
 *   2. Save as firebase-export.json
 *   3. npx ts-node scripts/firebase-import.ts --json firebase-export.json --sql-out prisma/sql/firebase-import-generated.sql
 *   4. Run in Neon SQL editor: firebase-import-setup.sql then firebase-import-generated.sql
 *
 * Usage B — live Firebase (give us the connector):
 *   Set in .env:
 *     FIREBASE_DATABASE_URL=https://YOUR-PROJECT-default-rtdb.firebaseio.com
 *     FIREBASE_SERVICE_ACCOUNT_PATH=./firebase-service-account.json
 *   npm install firebase-admin
 *   npx ts-node scripts/firebase-import.ts --live --sql-out prisma/sql/firebase-import-generated.sql
 *
 * Usage C — insert directly via Prisma:
 *   npx ts-node scripts/firebase-import.ts --json firebase-export.json --prisma
 */

import * as fs from 'fs'
import * as path from 'path'

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
  marks?: Array<{
    id?: string
    exam: string
    subject: string
    score: string
    date?: string
  }>
  documents?: Array<{
    id?: string
    title: string
    url: string
    uploadedAt?: string
  }>
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

const BATCH_ID_MAP: Record<string, string> = {}
let batchOrder = 0
for (const group of [
  { title: 'CBSE', batches: ['12','11','10','9','8','7','6','5','4','3','2','1'].map(g => `${g} CBSE`) },
  { title: 'ICSE', batches: ['12','11','10','9','8','7','6','5','4','3','2','1'].map(g => `${g} ICSE`) },
  { title: 'STATE', batches: ['12','11','10','9','8','7','6','5','4','3','2','1'].map(g => `${g} State`) },
]) {
  for (const name of group.batches) {
    batchOrder++
    BATCH_ID_MAP[name] = `batch_${String(batchOrder).padStart(3, '0')}`
  }
}

function sqlEscape(value: string): string {
  return value.replace(/'/g, "''")
}

function parseBatch(batchName: string): { grade: string; board: string } {
  const parts = batchName.trim().split(/\s+/)
  const grade = parts[0] ?? '1'
  const token = (parts[1] ?? 'CBSE').toUpperCase()
  if (token === 'ICSE') return { grade, board: 'ICSE' }
  if (token === 'STATE') return { grade, board: 'SCERT' }
  return { grade, board: 'CBSE' }
}

function mapFeesStatus(fees?: string): string {
  const f = (fees ?? 'Pending').toLowerCase()
  if (f === 'paid') return 'PAID'
  if (f === 'partial') return 'PARTIAL'
  if (f === 'overdue') return 'OVERDUE'
  return 'PENDING'
}

function numOrNull(v: string | number | undefined | null): string {
  if (v === undefined || v === null || v === '') return 'NULL'
  const n = typeof v === 'number' ? v : parseFloat(String(v).replace(/,/g, ''))
  return Number.isFinite(n) ? String(n) : 'NULL'
}

function dateOrNull(v?: string): string {
  if (!v) return 'NULL'
  const d = new Date(v)
  if (Number.isNaN(d.getTime())) return 'NULL'
  return `'${d.toISOString()}'`
}

function cuidLike(prefix: string, seed: string): string {
  return `${prefix}_${seed.replace(/[^a-zA-Z0-9]/g, '').slice(0, 20)}`
}

function normalizeBatchName(name: string): string {
  const aliases: Record<string, string> = {
    '+2 Science': '12 CBSE',
    '+2 Commerce': '12 CBSE',
    '+1 Science': '11 CBSE',
  }
  return aliases[name] ?? name
}

function buildStudentSql(
  student: FirebaseStudent,
  batchName: string | null,
  opts: { recycled: boolean }
): string[] {
  const lines: string[] = []
  const id = sqlEscape(student.id)
  const { grade, board } = batchName ? parseBatch(batchName) : { grade: '1', board: 'CBSE' }
  const batchIdSql = batchName
    ? `(SELECT "id" FROM "Batch" WHERE "name" = '${sqlEscape(normalizeBatchName(batchName))}')`
    : 'NULL'

  lines.push(`INSERT INTO "Student" (
  "id", "batchId", "rollNo", "fullName", "schoolName", "subjectsText", "subjectCount",
  "grade", "board", "contact", "feesStatus", "feesAmountPaid", "feesRemaining", "feesDatePaid",
  "deletedAt", "deletedFromBatch", "guardianPhone", "enrollmentDate"
) VALUES (
  '${id}',
  ${opts.recycled ? 'NULL' : batchIdSql},
  ${student.no ?? 0},
  '${sqlEscape(student.name)}',
  ${student.schoolName ? `'${sqlEscape(student.schoolName)}'` : 'NULL'},
  ${student.subjects ? `'${sqlEscape(student.subjects)}'` : 'NULL'},
  ${student.subjectCount ?? 'NULL'},
  '${grade}',
  '${board}',
  ${student.contact ? `'${sqlEscape(student.contact)}'` : 'NULL'},
  '${mapFeesStatus(student.fees)}',
  ${numOrNull(student.feesAmountPaid)},
  ${numOrNull(student.feesRemaining)},
  ${dateOrNull(student.feesDatePaid)},
  ${opts.recycled ? dateOrNull(student.deletedAt) ?? 'NOW()' : 'NULL'},
  ${opts.recycled ? `'${sqlEscape(student.deletedFrom ?? batchName ?? '')}'` : 'NULL'},
  '',
  NOW()
) ON CONFLICT ("id") DO UPDATE SET
  "batchId" = EXCLUDED."batchId",
  "rollNo" = EXCLUDED."rollNo",
  "fullName" = EXCLUDED."fullName",
  "schoolName" = EXCLUDED."schoolName",
  "subjectsText" = EXCLUDED."subjectsText",
  "subjectCount" = EXCLUDED."subjectCount",
  "contact" = EXCLUDED."contact",
  "feesStatus" = EXCLUDED."feesStatus",
  "feesAmountPaid" = EXCLUDED."feesAmountPaid",
  "feesRemaining" = EXCLUDED."feesRemaining",
  "feesDatePaid" = EXCLUDED."feesDatePaid",
  "deletedAt" = EXCLUDED."deletedAt",
  "deletedFromBatch" = EXCLUDED."deletedFromBatch";`)

  for (const mark of student.marks ?? []) {
    const markId = cuidLike('mark', mark.id ?? `${student.id}_${mark.exam}_${mark.subject}`)
    lines.push(`INSERT INTO "RegisterMark" ("id", "studentId", "exam", "subject", "score", "date")
VALUES ('${sqlEscape(markId)}', '${id}', '${sqlEscape(mark.exam)}', '${sqlEscape(mark.subject)}', '${sqlEscape(mark.score)}', ${dateOrNull(mark.date) ?? 'NOW()'})
ON CONFLICT ("id") DO NOTHING;`)
  }

  for (const doc of student.documents ?? []) {
    const docId = cuidLike('doc', doc.id ?? `${student.id}_${doc.title}`)
    // Documents can be huge — skip if over 500KB in SQL mode (use --prisma for full import)
    if (doc.url.length > 500_000) {
      lines.push(`-- SKIPPED large document "${sqlEscape(doc.title)}" for student ${id} (${doc.url.length} chars)`)
      continue
    }
    lines.push(`INSERT INTO "RegisterDocument" ("id", "studentId", "title", "dataUrl", "uploadedAt")
VALUES ('${sqlEscape(docId)}', '${id}', '${sqlEscape(doc.title)}', '${sqlEscape(doc.url)}', ${dateOrNull(doc.uploadedAt) ?? 'NOW()'})
ON CONFLICT ("id") DO NOTHING;`)
  }

  return lines
}

function generateSql(data: FirebaseExport): string {
  const out: string[] = [
    '-- Auto-generated by scripts/firebase-import.ts',
    `-- Generated: ${new Date().toISOString()}`,
    'BEGIN;',
    '',
  ]

  for (const subject of data.customSubjects ?? []) {
    const sid = cuidLike('sub', subject)
    out.push(`INSERT INTO "Subject" ("id", "name") VALUES ('${sqlEscape(sid)}', '${sqlEscape(subject)}') ON CONFLICT ("name") DO NOTHING;`)
  }
  out.push('')

  for (const [rawBatch, students] of Object.entries(data.studentsData ?? {})) {
    const batchName = normalizeBatchName(rawBatch)
    for (const student of students ?? []) {
      if (!student.id || !student.name) continue
      out.push(...buildStudentSql(student, batchName, { recycled: false }))
      out.push('')
    }
  }

  for (const student of data.recycleBin ?? []) {
    if (!student.id || !student.name) continue
    out.push(...buildStudentSql(student, student.deletedFrom ?? null, { recycled: true }))
    out.push('')
  }

  for (const pending of data.pendingAdmissions ?? []) {
    if (!pending.id || !pending.name) continue
    const pid = sqlEscape(pending.id)
    out.push(`INSERT INTO "PendingAdmission" ("id", "name", "schoolName", "subjects", "subjectCount", "contact", "batchName", "submittedAt")
VALUES (
  '${pid}',
  '${sqlEscape(pending.name)}',
  '${sqlEscape(pending.schoolName ?? '')}',
  '${sqlEscape(pending.subjects ?? '')}',
  ${pending.subjectCount ?? 'NULL'},
  '${sqlEscape(pending.contact ?? '')}',
  '${sqlEscape(normalizeBatchName(pending.batchName ?? '12 CBSE'))}',
  ${dateOrNull(pending.submittedAt) ?? 'NOW()'}
) ON CONFLICT ("id") DO NOTHING;`)
    out.push('')
  }

  out.push('COMMIT;')
  return out.join('\n')
}

async function loadFromFirebaseLive(): Promise<FirebaseExport> {
  const dbUrl = process.env.FIREBASE_DATABASE_URL
  const saPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH
  if (!dbUrl || !saPath) {
    throw new Error('Set FIREBASE_DATABASE_URL and FIREBASE_SERVICE_ACCOUNT_PATH in .env')
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const admin = require('firebase-admin')
  const serviceAccount = JSON.parse(fs.readFileSync(path.resolve(saPath), 'utf8'))

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: dbUrl,
    })
  }

  const db = admin.database()
  const [studentsSnap, recycleSnap, pendingSnap, subjectsSnap] = await Promise.all([
    db.ref('studentsData').once('value'),
    db.ref('recycleBin').once('value'),
    db.ref('pendingAdmissions').once('value'),
    db.ref('customSubjects').once('value'),
  ])

  return {
    studentsData: studentsSnap.val() ?? {},
    recycleBin: recycleSnap.val() ?? [],
    pendingAdmissions: pendingSnap.val() ?? [],
    customSubjects: subjectsSnap.val() ?? [],
  }
}

async function main() {
  const args = process.argv.slice(2)
  const jsonPath = args.includes('--json') ? args[args.indexOf('--json') + 1] : null
  const sqlOut = args.includes('--sql-out') ? args[args.indexOf('--sql-out') + 1] : null
  const live = args.includes('--live')

  let data: FirebaseExport

  if (live) {
    console.log('📡 Fetching from Firebase…')
    data = await loadFromFirebaseLive()
  } else if (jsonPath) {
    const raw = fs.readFileSync(path.resolve(jsonPath), 'utf8')
    data = JSON.parse(raw) as FirebaseExport
    console.log(`📂 Loaded ${jsonPath}`)
  } else {
    console.error(`
Usage:
  npx ts-node scripts/firebase-import.ts --json firebase-export.json --sql-out prisma/sql/firebase-import-generated.sql
  npx ts-node scripts/firebase-import.ts --live --sql-out prisma/sql/firebase-import-generated.sql

Env for --live:
  FIREBASE_DATABASE_URL=https://YOUR-PROJECT-default-rtdb.firebaseio.com
  FIREBASE_SERVICE_ACCOUNT_PATH=./firebase-service-account.json
`)
    process.exit(1)
  }

  const studentCount = Object.values(data.studentsData ?? {}).reduce((n, arr) => n + (arr?.length ?? 0), 0)
  console.log(`Students: ${studentCount}, Recycle: ${data.recycleBin?.length ?? 0}, Pending: ${data.pendingAdmissions?.length ?? 0}`)

  const sql = generateSql(data)

  if (sqlOut) {
    fs.mkdirSync(path.dirname(path.resolve(sqlOut)), { recursive: true })
    fs.writeFileSync(path.resolve(sqlOut), sql, 'utf8')
    console.log(`✅ SQL written to ${sqlOut}`)
    console.log('Run in Neon: prisma/sql/firebase-import-setup.sql then your generated file')
  } else {
    console.log(sql)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
