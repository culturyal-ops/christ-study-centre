import NextAuth, { DefaultSession } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { prisma } from '@/lib/prisma'
import bcryptjs from 'bcryptjs'
import { Role } from '@prisma/client'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      username: string
      role: Role
      studentId?: string
    } & DefaultSession['user']
  }

  interface User {
    username: string
    role: Role
    studentId?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    username: string
    role: Role
    studentId?: string
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { username: credentials.username as string },
          include: { student: true },
        })

        if (!user) {
          return null
        }

        const isValidPassword = await bcryptjs.compare(
          credentials.password as string,
          user.passwordHash
        )

        if (!isValidPassword) {
          return null
        }

        return {
          id: user.id,
          username: user.username,
          role: user.role,
          studentId: user.student?.id,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.username = user.username
        token.role = user.role
        token.studentId = user.studentId
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id
      session.user.username = token.username
      session.user.role = token.role
      session.user.studentId = token.studentId
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
})
