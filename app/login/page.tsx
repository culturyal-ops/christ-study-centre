'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { signIn, getSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import LandingNav from '@/components/landing/LandingNav'
import BrandName from '@/components/BrandName'
import { images } from '@/lib/images'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (form: HTMLFormElement) => {
    if (isLoading) return

    const data = new FormData(form)
    const username = String(data.get('username') ?? '').trim()
    const password = String(data.get('password') ?? '')

    if (!username || !password) {
      setError('Please enter username and password')
      return
    }

    setError('')
    setIsLoading(true)

    try {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      })

      if (result?.error || !result?.ok) {
        setError('Invalid username or password')
        return
      }

      const session = await getSession()
      const role = session?.user?.role

      if (callbackUrl !== '/' && !callbackUrl.startsWith('/login')) {
        router.push(callbackUrl)
      } else if (role === 'ADMIN') {
        router.push('/admin/register')
      } else if (role === 'STUDENT') {
        router.push('/student/dashboard')
      } else {
        router.push('/')
      }

      router.refresh()
    } catch {
      setError('Could not sign in. Check your connection and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-glass-card csc-login-panel">
      <div className="login-glass-card__inner">
        <div className="login-glass-card__top">
          <span>
            <BrandName variant="compact" />
          </span>
          <span>Portal</span>
        </div>

        <h1 className="login-glass-card__title">Sign in</h1>
        <p className="login-glass-card__lede">
          Welcome back. Please log in to your student or staff account.
        </p>

        <form
          className="login-glass-form"
          noValidate
          onSubmit={(e) => {
            e.preventDefault()
            void handleLogin(e.currentTarget)
          }}
        >
          <div>
            <label className="form-label" htmlFor="login-username">
              Username
            </label>
            <input
              id="login-username"
              name="username"
              type="text"
              required
              disabled={isLoading}
              className="form-input"
              placeholder="Username"
              autoComplete="username"
            />
          </div>

          <div>
            <label className="form-label" htmlFor="login-password">
              Password
            </label>
            <input
              id="login-password"
              name="password"
              type="password"
              required
              disabled={isLoading}
              className="form-input"
              placeholder="Password"
              autoComplete="current-password"
            />
          </div>

          {error && <div className="form-error">{error}</div>}

          <button
            type="submit"
            disabled={isLoading}
            className="login-glass-submit"
          >
            {isLoading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="login-glass-foot">
          New student? <Link href="/admission">Apply for admission</Link>
          {' · '}
          <Link href="/">Return to home</Link>
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div
          className="csc-landing csc-site csc-site--login"
          style={{
            minHeight: '100vh',
            display: 'grid',
            placeItems: 'center',
            color: 'rgba(255,255,255,0.5)',
          }}
        >
          Loading…
        </div>
      }
    >
      <div className="csc-landing csc-site csc-site--login">
        <LandingNav />
        <div className="csc-site__login-wrap">
          <div className="login-glass-scene" aria-hidden="true">
            <Image src={images.login} alt="" fill priority sizes="100vw" />
          </div>
          <LoginForm />
        </div>
      </div>
    </Suspense>
  )
}
