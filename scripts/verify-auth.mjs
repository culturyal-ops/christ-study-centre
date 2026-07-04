import 'dotenv/config'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'
import { neonConfig } from '@neondatabase/serverless'
import bcrypt from 'bcryptjs'

neonConfig.poolQueryViaFetch = true

async function main() {
  const url = process.env.DATABASE_URL
  if (!url) {
    console.error('DATABASE_URL missing')
    process.exit(1)
  }

  const prisma = new PrismaClient({
    adapter: new PrismaNeon({ connectionString: url }),
  })

  const users = await prisma.user.findMany({
    select: { username: true, role: true },
    orderBy: { username: 'asc' },
  })
  console.log('Users in Neon:', users)

  const owner = await prisma.user.findUnique({ where: { username: 'owner' } })
  if (owner) {
    const ok = await bcrypt.compare('4511', owner.passwordHash)
    console.log('Owner password 4511 valid:', ok)
  } else {
    console.log('Owner user MISSING — run: npx prisma db seed')
  }

  await prisma.$disconnect()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
