export { auth as middleware } from '@/auth'

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|videos/|images/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4|webm|mov)$).*)',
  ],
}
