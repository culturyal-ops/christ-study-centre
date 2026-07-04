'use client'

import { Suspense, useActionState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import LandingNav from '@/components/landing/LandingNav'
import BrandName from '@/components/BrandName'
import { loginAction, type LoginState } from '@/lib/actions/auth'

function LoginForm() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') ?? ''
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    loginAction,
    {}
  )

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

        <form className="login-glass-form" action={formAction} noValidate>
          <input type="hidden" name="callbackUrl" value={callbackUrl} />

          <div>
            <label className="form-label" htmlFor="login-username">
              Username
            </label>
            <input
              id="login-username"
              name="username"
              type="text"
              required
              disabled={pending}
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
              disabled={pending}
              className="form-input"
              placeholder="Password"
              autoComplete="current-password"
            />
          </div>

          {state.error && <div className="form-error">{state.error}</div>}

          <button
            type="submit"
            disabled={pending}
            className="login-glass-submit"
          >
            {pending ? 'Signing in…' : 'Sign in'}
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
          <LoginForm />
        </div>
      </div>
    </Suspense>
  )
}
