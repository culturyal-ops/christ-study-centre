'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    try {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      })
      if (result?.error) {
        setError('Invalid username or password')
        setIsLoading(false)
        return
      }
      router.push(callbackUrl)
      router.refresh()
    } catch {
      setError('An error occurred. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <div className="login-shell">
      {/* Left: image panel */}
      <div className="login-photo">
        <Image
          src="/images/study centre.jpg"
          alt="Christ Study Centre"
          fill
          priority
          style={{ objectFit: 'cover' }}
        />
        <div className="login-photo-overlay">
          <div className="login-photo-content">
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
              <span style={{ display: 'inline-block', width: '24px', height: '1px', background: 'var(--gold)' }} />
              Est. 2013
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 3vw, 42px)',
              fontWeight: 400,
              lineHeight: 1.1,
              color: 'var(--bone)',
              marginBottom: '16px',
            }}>
              The student portal<br />for <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Christ Study Centre</em>
            </h2>
            <p style={{ fontSize: '14px', color: 'rgba(232,226,208,0.7)', lineHeight: 1.7, maxWidth: '320px' }}>
              Access your attendance, marks, and academic progress. Built for students and staff at 52A, RV Road, Pala.
            </p>
          </div>
        </div>
      </div>

      {/* Right: form panel */}
      <div className="login-form-panel">
        <div className="login-form-inner">
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '48px' }}>
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '28px', height: '28px' }}>
              <circle cx="24" cy="24" r="22.5" stroke="#0A1628" strokeWidth="1" />
              <path d="M24 9L29 19H38L31 26L34 37L24 30L14 37L17 26L10 19H19L24 9Z" stroke="#C9A84C" strokeWidth="1" fill="none" />
              <circle cx="24" cy="24" r="3" fill="#C9A84C" />
            </svg>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--navy)' }}>Christ Study Centre</div>
              <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', letterSpacing: '0.15em', color: 'var(--gold)', textTransform: 'uppercase' }}>Pala · Kerala</div>
            </div>
          </Link>

          <div style={{ marginBottom: '36px' }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
              <span style={{ display: 'inline-block', width: '24px', height: '1px', background: 'var(--gold)' }} />
              Portal access
            </div>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '32px',
              fontWeight: 400,
              lineHeight: 1.1,
              color: 'var(--navy)',
              marginBottom: '8px',
            }}>
              Sign in
            </h1>
            <p style={{ fontSize: '14px', color: '#6b6b5f' }}>Student & Staff Portal</p>
          </div>

          <div style={{ width: '100%', height: '1px', background: 'var(--line)', marginBottom: '36px' }} />

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label className="form-label">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={isLoading}
                className="form-input"
                autoComplete="username"
              />
            </div>

            <div>
              <label className="form-label">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="form-input"
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="form-error">{error}</div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary"
              style={{ justifyContent: 'center', padding: '15px', fontSize: '14px', marginTop: '4px' }}
            >
              {isLoading ? 'Signing in…' : 'Sign in →'}
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: '12px', color: '#6b6b5f', marginTop: '32px' }}>
            Not a student?{' '}
            <Link href="/" style={{ color: 'var(--gold)' }}>Return to home</Link>
          </p>

          <p style={{ textAlign: 'center', fontSize: '11px', color: '#aaa', marginTop: '48px' }}>
            © {new Date().getFullYear()} Christ Study Centre
          </p>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: '100vh', background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: '13px', color: 'var(--bone)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>
            Loading…
          </div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  )
}
