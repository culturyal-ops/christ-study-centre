/**
 * Central env access — used by auth, prisma, and health checks.
 * Vercel: set all of these in Project → Settings → Environment Variables.
 */
function required(name: string, value: string | undefined): string {
  if (!value?.trim()) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value.trim()
}

/** Prefer Neon pooler host on serverless (Vercel). */
export function getDatabaseUrl(): string {
  const url = process.env.DATABASE_URL?.trim()
  if (!url) {
    throw new Error('DATABASE_URL is not set')
  }

  // Use pooled connection when direct URL is provided (better on Vercel)
  if (url.includes('.neon.tech') && !url.includes('-pooler')) {
    return url.replace(
      /@ep-([^.]+)\./,
      '@ep-$1-pooler.'
    )
  }

  return url
}

export function getAuthSecret(): string {
  return required(
    'AUTH_SECRET or NEXTAUTH_SECRET',
    process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET
  )
}

export function getAuthUrl(): string | undefined {
  return (
    process.env.AUTH_URL ??
    process.env.NEXTAUTH_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined)
  )?.replace(/\/$/, '')
}

export function envStatus() {
  return {
    hasDatabaseUrl: Boolean(process.env.DATABASE_URL),
    hasAuthSecret: Boolean(process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET),
    authUrl: getAuthUrl() ?? null,
    nodeEnv: process.env.NODE_ENV ?? 'unknown',
    vercel: Boolean(process.env.VERCEL),
  }
}
