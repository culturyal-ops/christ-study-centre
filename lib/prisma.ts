import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { neonConfig } from '@neondatabase/serverless'

// Fetch mode works on Vercel serverless (WebSocket pool can hang)
neonConfig.poolQueryViaFetch = true

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const createPrismaClient = () => {
  const url = process.env.DATABASE_URL
  if (!url) {
    return null as unknown as PrismaClient
  }

  const adapter = new PrismaNeon({ connectionString: url })
  return new PrismaClient({ adapter })
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
