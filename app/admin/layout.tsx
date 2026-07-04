import Link from 'next/link'
import { signOut } from '@/auth'
import { requireAuth } from '@/lib/auth-utils'
import BrandName from '@/components/BrandName'
import ThemeToggle from '@/components/ThemeToggle'
import '@/app/portal.css'
import '@/app/portal-register.css'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await requireAuth(['ADMIN'])

  return (
    <div className="csc-portal portal-shell">
      <header className="portal-header">
        <div className="portal-header-inner">
          <Link href="/admin/dashboard" className="portal-brand">
            <BrandName variant="compact" />
            <span>Admin</span>
          </Link>
          <nav className="portal-nav">
            <Link href="/admin/dashboard">Dashboard</Link>
            <Link href="/admin/register">Register</Link>
            <Link href="/">Public site</Link>
          </nav>
          <div className="portal-header-actions">
            <ThemeToggle variant="nav" />
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
        </div>
      </header>
      <main className="portal-main">{children}</main>
    </div>
  )
}
