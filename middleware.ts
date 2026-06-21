import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const { pathname } = req.nextUrl
  const session = req.auth

  // Public routes
  const publicRoutes = ['/', '/about', '/courses', '/contact', '/login']
  const isPublicRoute = publicRoutes.some((route) => pathname === route || pathname.startsWith('/api/auth'))

  if (isPublicRoute) {
    return NextResponse.next()
  }

  // Require authentication for protected routes
  if (!session) {
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Role-based access control
  const role = session.user.role

  if (pathname.startsWith('/admin')) {
    if (role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/student/dashboard', req.url))
    }
  }

  if (pathname.startsWith('/student')) {
    if (role !== 'STUDENT') {
      return NextResponse.redirect(new URL('/admin/dashboard', req.url))
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
