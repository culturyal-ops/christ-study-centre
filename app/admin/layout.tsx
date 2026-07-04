import { signOut } from '@/auth'
import { requireAuth } from '@/lib/auth-utils'
import PortalNav from '@/components/portal/PortalNav'
import '@/app/portal.css'
import '@/app/portal-register.css'

const adminLinks = [
  { href: '/admin/dashboard', label: 'Dashboard' },
  { href: '/admin/register', label: 'Register' },
  { href: '/', label: 'Public site' },
]

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await requireAuth(['ADMIN'])

  const signOutSlot = (
    <form
      action={async () => {
        'use server'
        await signOut({ redirectTo: '/login' })
      }}
    >
      <button type="submit" className="csc-landing__login portal-signout">
        Sign out
      </button>
    </form>
  )

  return (
    <div className="csc-portal portal-shell">
      <PortalNav
        brandHref="/admin/dashboard"
        links={adminLinks}
        username={session.user.username}
        signOutSlot={signOutSlot}
      />
      <main className="portal-main">{children}</main>
    </div>
  )
}
