import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { Pool, neonConfig } from '@neondatabase/serverless'

// For WebSocket support (needed in some environments)
if (typeof WebSocket === 'undefined') {
  const ws = require('ws')
  neonConfig.webSocketConstructor = ws
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const createPrismaClient = () => {
  // Prisma v7 requires adapter for proper functionality
  // If DATABASE_URL is not set, return a basic client (build time)
  if (!process.env.DATABASE_URL) {
    return null as any as PrismaClient
  }
  
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })
  const adapter = new PrismaNeon(pool as any)
  return new PrismaClient({ adapter })
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
