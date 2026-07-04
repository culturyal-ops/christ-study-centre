import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/** Auth.js v5 cookie names (must stay edge-light — do not import @/auth here). */
function hasSessionCookie(request: NextRequest): boolean {
  const cookies = request.cookies

  const direct = [
    'authjs.session-token',
    '__Secure-authjs.session-token',
    'next-auth.session-token',
    '__Secure-next-auth.session-token',
  ]

  if (direct.some((name) => cookies.has(name))) {
    return true
  }

  // Chunked JWT cookies when the token is large
  return cookies.getAll().some(
    (cookie) =>
      cookie.name.startsWith('authjs.session-token.') ||
      cookie.name.startsWith('__Secure-authjs.session-token.') ||
      cookie.name.startsWith('next-auth.session-token.')
  )
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const publicRoutes = ['/', '/about', '/courses', '/contact', '/login', '/admission']
  const isPublicRoute =
    publicRoutes.some((route) => pathname === route) ||
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/api/contact') ||
    pathname === '/api/health' ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/videos/') ||
    pathname.startsWith('/images/')

  if (isPublicRoute) {
    return NextResponse.next()
  }

  if (!hasSessionCookie(request)) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4|webm|mov)$).*)',
  ],
}
