'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { GraduationCap, ArrowRight, Lock } from 'lucide-react'

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
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #060F1E 0%, #0C1E3C 50%, #132847 100%)' }}
    >
      {/* decorative orb */}
      <div
        className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.10) 0%, transparent 65%)' }}
      />
      <div
        className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(30,58,95,0.5) 0%, transparent 65%)' }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(201,168,76,0.05) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div
          className="rounded-3xl p-10"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,168,76,0.2)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5" style={{ background: 'linear-gradient(135deg, #C9A84C 0%, #E8C97A 100%)' }}>
              <GraduationCap className="w-8 h-8 text-[#0C1E3C]" />
            </div>
            <h1 className="text-2xl font-black text-white mb-1" style={{ letterSpacing: '-0.01em' }}>
              Christ Study Centre
            </h1>
            <p className="text-sm text-white/45">Student &amp; Staff Portal</p>
          </div>

          <div className="divider-gold mb-8" />

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-widest text-white/50">Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={isLoading}
                className="w-full px-4 py-3 rounded-xl text-sm text-white input-premium"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-widest text-white/50">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="w-full px-4 py-3 rounded-xl text-sm text-white input-premium"
              />
            </div>

            {error && (
              <div
                className="text-sm px-4 py-3 rounded-xl"
                style={{ background: 'rgba(239,68,68,0.12)', color: '#FCA5A5', border: '1px solid rgba(239,68,68,0.3)' }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-gold py-3.5 rounded-xl text-sm font-bold inline-flex items-center justify-center gap-2 disabled:opacity-60 mt-2"
            >
              {isLoading ? (
                'Signing in…'
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-white/30 mt-6">
            Not a student?{' '}
            <Link href="/" className="text-[#C9A84C] hover:text-[#E8C97A] transition-colors">
              Return to Home
            </Link>
          </p>
        </div>

        {/* Bottom note */}
        <p className="text-center text-xs text-white/25 mt-6">
          © {new Date().getFullYear()} Christ Study Centre, Pala
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
          className="min-h-screen flex items-center justify-center"
          style={{ background: 'linear-gradient(160deg, #060F1E 0%, #0C1E3C 50%, #132847 100%)' }}
        >
          <div className="text-white/40 text-sm">Loading…</div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  )
}
