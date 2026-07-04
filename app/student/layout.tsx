import Link from 'next/link'
import { signOut } from '@/auth'
import { requireAuth } from '@/lib/auth-utils'
import BrandName from '@/components/BrandName'

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await requireAuth(['STUDENT'])

  return (
    <div className="portal-shell">
      <header className="portal-header">
        <div className="portal-header-inner">
          <Link href="/student/dashboard" className="portal-brand">
            <BrandName variant="compact" />
            <span>Student</span>
          </Link>
          <nav className="portal-nav">
            <Link href="/student/dashboard">Dashboard</Link>
            <Link href="/student/register">My profile</Link>
            <Link href="/">Public site</Link>
          </nav>
          <div className="portal-user">
            <span>{session.user.username}</span>
            <form
              action={async () => {
                'use server'
                await signOut({ redirectTo: '/login' })
              }}
            >
              <button type="submit" className="portal-signout">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="portal-main">{children}</main>
    </div>
  )
}
