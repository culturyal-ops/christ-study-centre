'use client'



import { Suspense, useState } from 'react'

import Link from 'next/link'

import Image from 'next/image'

import { signIn } from 'next-auth/react'

import { getSession } from 'next-auth/react'

import { useRouter, useSearchParams } from 'next/navigation'

import LandingNav from '@/components/landing/LandingNav'
import BrandName from '@/components/BrandName'

import { images } from '@/lib/images'



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



      const session = await getSession()

      const role = session?.user?.role



      if (callbackUrl !== '/' && !callbackUrl.startsWith('/login')) {

        router.push(callbackUrl)

      } else if (role === 'ADMIN') {

        router.push('/admin/dashboard')

      } else if (role === 'STUDENT') {

        router.push('/student/dashboard')

      } else {

        router.push('/')

      }

      router.refresh()

    } catch {

      setError('An error occurred. Please try again.')

      setIsLoading(false)

    }

  }



  return (

    <>

      <div className="login-glass-scene" aria-hidden="true">

        <Image src={images.login} alt="" fill priority sizes="100vw" />

      </div>



      <div className="login-glass-card csc-login-panel">

        <div className="login-glass-card__inner">

          <div className="login-glass-card__top">

            <span><BrandName variant="compact" /></span>

            <span>Portal</span>

          </div>



          <h1 className="login-glass-card__title">Sign in</h1>

          <p className="login-glass-card__lede">

            Welcome back. Please log in to your student or staff account.

          </p>



          <form onSubmit={handleSubmit} className="login-glass-form">

            <div>

              <label className="form-label" htmlFor="login-username">

                Username

              </label>

              <input

                id="login-username"

                type="text"

                value={username}

                onChange={(e) => setUsername(e.target.value)}

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

                type="password"

                value={password}

                onChange={(e) => setPassword(e.target.value)}

                required

                disabled={isLoading}

                className="form-input"

                placeholder="Password"

                autoComplete="current-password"

              />

            </div>



            {error && <div className="form-error">{error}</div>}



            <button type="submit" disabled={isLoading} className="login-glass-submit">

              {isLoading ? 'Signing in…' : 'Sign in'}

            </button>

          </form>



          <p className="login-glass-foot">

            Not a student? <Link href="/">Return to home</Link>

          </p>

        </div>

      </div>

    </>

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


