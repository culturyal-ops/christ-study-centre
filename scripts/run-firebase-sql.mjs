/** Run setup + generated SQL against Neon (no Prisma transactions). */

import * as fs from 'fs'
import * as path from 'path'
import { neon } from '@neondatabase/serverless'

const url = process.env.DATABASE_URL
if (!url) {
  console.error('DATABASE_URL not set')
  process.exit(1)
}

const sql = neon(url)

function splitStatements(source) {
  const withoutBlocks = source.replace(/\/\*[\s\S]*?\*\//g, '')
  return withoutBlocks
    .split('\n')
    .filter((line) => !line.trim().startsWith('--'))
    .join('\n')
    .replace(/\r/g, '')
    .split(';')
    .map((s) => s.trim())
    .filter((s) => s && s !== 'BEGIN' && s !== 'COMMIT')
}

async function runFile(filePath) {
  const full = path.resolve(filePath)
  if (!fs.existsSync(full)) {
    console.error(`Missing ${full}`)
    process.exit(1)
  }
  const statements = splitStatements(fs.readFileSync(full, 'utf8'))
  console.log(`Running ${statements.length} statements from ${filePath}…`)
  let i = 0
  for (const statement of statements) {
    i++
    try {
      await sql.query(statement)
    } catch (error) {
      console.error(`Failed on statement ${i}:`, statement.slice(0, 120))
      throw error
    }
  }
}

await runFile('prisma/sql/firebase-import-setup.sql')
await runFile('prisma/sql/firebase-import-generated.sql')

const counts = await sql`
  SELECT
    (SELECT COUNT(*)::int FROM "Student" WHERE "deletedAt" IS NULL) AS active,
    (SELECT COUNT(*)::int FROM "Student" WHERE "deletedAt" IS NOT NULL) AS recycle
`
console.log('✅ Import complete', counts[0])
