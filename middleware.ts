import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Public routes that don't require authentication
  const publicRoutes = ['/', '/about', '/courses', '/contact', '/login']
  const isPublicRoute = publicRoutes.some(route => pathname === route) || 
                       pathname.startsWith('/api/auth') ||
                       pathname.startsWith('/_next') ||
                       pathname.startsWith('/favicon')

  if (isPublicRoute) {
    return NextResponse.next()
  }

  // Check for session token (NextAuth sets this cookie)
  const sessionToken = request.cookies.get('next-auth.session-token') || 
                      request.cookies.get('__Secure-next-auth.session-token')

  // Require authentication for protected routes
  if (!sessionToken) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // For role-based routing, we'll handle it in the pages themselves
  // since we can't decode JWT in edge middleware without adding bulk
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}
