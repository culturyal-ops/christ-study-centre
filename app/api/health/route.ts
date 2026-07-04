import { NextResponse } from 'next/server'
import { envStatus } from '@/lib/env'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

/** GET /api/health — quick check for Vercel + Neon + auth env (no secrets exposed). */
export async function GET() {
  const status = envStatus()

  let db: { ok: boolean; userCount?: number; error?: string } = { ok: false }

  try {
    const userCount = await prisma.user.count()
    db = { ok: true, userCount }
  } catch (error) {
    db = {
      ok: false,
      error: error instanceof Error ? error.message : 'Database connection failed',
    }
  }

  const ready =
    status.hasDatabaseUrl && status.hasAuthSecret && db.ok && Boolean(status.authUrl)

  return NextResponse.json(
    {
      ready,
      env: status,
      db,
      hint: ready
        ? 'OK — try owner / 4511 or admin / admin123'
        : 'Set DATABASE_URL, AUTH_SECRET, AUTH_URL on Vercel and redeploy',
    },
    { status: ready ? 200 : 503 }
  )
}
