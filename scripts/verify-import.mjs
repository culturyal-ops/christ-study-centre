import { neon } from '@neondatabase/serverless'

const url = process.env.DATABASE_URL
if (!url) {
  console.error('DATABASE_URL not set')
  process.exit(1)
}

const sql = neon(url)

const summary = await sql`
  SELECT
    COUNT(*)::int AS students,
    COALESCE(SUM(COALESCE("feesAmountPaid", 0)), 0)::bigint AS fees_received,
    COALESCE(SUM(COALESCE("feesRemaining", 0)), 0)::bigint AS fees_pending
  FROM "Student"
  WHERE "deletedAt" IS NULL
`

const byClass = await sql`
  SELECT b.name AS class, COUNT(*)::int AS count
  FROM "Student" s
  JOIN "Batch" b ON b.id = s."batchId"
  WHERE s."deletedAt" IS NULL
  GROUP BY b.name
  ORDER BY b.name
`

console.log('Database totals:', summary[0])
console.log('By class:', byClass)
