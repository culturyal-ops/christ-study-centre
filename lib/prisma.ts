import { PrismaClient } from '@prisma/client'
import { PrismaNeonHttp } from '@prisma/adapter-neon'
import { getDatabaseUrl } from '@/lib/env'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const createPrismaClient = () => {
  const url = getDatabaseUrl()
  // HTTP driver — reliable on Vercel serverless (no WebSocket hangs)
  const adapter = new PrismaNeonHttp(url, {
    arrayMode: false,
    fullResults: true,
  })
  return new PrismaClient({ adapter })
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

// Reuse client across hot reloads and warm serverless invocations
globalForPrisma.prisma = prisma
