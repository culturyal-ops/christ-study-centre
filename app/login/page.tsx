'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowRight } from 'lucide-react'

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
    <div className="min-h-screen navy-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white p-10">
          <div className="text-center mb-10">
            <h1 className="serif text-3xl font-semibold mb-2">Christ Study Centre</h1>
            <p className="text-sm text-gray-600">Student & Staff Portal</p>
          </div>

          <div className="divider mb-10"></div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-gray-700">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={isLoading}
                className="w-full px-4 py-3 border border-gray-300 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-2 text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="w-full px-4 py-3 border border-gray-300 text-sm"
              />
            </div>

            {error && (
              <div className="text-sm px-4 py-3 bg-red-50 text-red-800 border border-red-200">
                {error}
              </div>
            )}

            <button type="submit" disabled={isLoading} className="btn btn-primary w-full justify-center">
              {isLoading ? 'Signing in…' : (
                <>Sign In <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-gray-500 mt-8">
            Not a student?{' '}
            <Link href="/" className="text-[#D4AF37] hover:text-[#B8964D]">
              Return to Home
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">
          © {new Date().getFullYear()} Christ Study Centre
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen navy-bg flex items-center justify-center">
          <div className="text-white text-sm">Loading…</div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  )
}
