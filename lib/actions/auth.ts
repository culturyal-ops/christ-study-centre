'use server'

import { AuthError } from 'next-auth'
import { signIn } from '@/auth'
import { prisma } from '@/lib/prisma'
import bcryptjs from 'bcryptjs'

export type LoginState = {
  error?: string
}

export async function loginAction(
  _prev: LoginState,
  formData: FormData
): Promise<LoginState> {
  const username = String(formData.get('username') ?? '').trim()
  const password = String(formData.get('password') ?? '')
  const callbackUrl = String(formData.get('callbackUrl') ?? '').trim()

  if (!username || !password) {
    return { error: 'Please enter username and password' }
  }

  const publicPostLoginPaths = ['/', '/about', '/courses', '/contact', '/admission']
  const hasProtectedCallback =
    callbackUrl &&
    callbackUrl.startsWith('/') &&
    !callbackUrl.startsWith('/login') &&
    !publicPostLoginPaths.includes(callbackUrl)

  let redirectTo = '/student/dashboard'
  if (hasProtectedCallback) {
    redirectTo = callbackUrl
  } else {
    try {
      const user = await prisma.user.findUnique({ where: { username } })
      if (user && (await bcryptjs.compare(password, user.passwordHash))) {
        redirectTo =
          user.role === 'ADMIN' ? '/admin/register' : '/student/dashboard'
      }
    } catch (error) {
      console.error('Login redirect lookup failed:', error)
    }
  }

  try {
    await signIn('credentials', {
      username,
      password,
      redirectTo,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === 'CredentialsSignin') {
        return { error: 'Invalid username or password' }
      }
      console.error('AuthError:', error.type, error.message)
      return { error: 'Sign in failed. Check server configuration.' }
    }
    throw error
  }

  return {}
}
