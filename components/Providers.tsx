'use client'

import { usePathname } from 'next/navigation'
import { SessionProvider } from 'next-auth/react'
import SoftBackground from '@/components/SoftBackground'
import SiteMotion from '@/components/SiteMotion'
import WhatsAppFloat from '@/components/WhatsAppFloat'

const PORTAL_PREFIXES = ['/admin', '/student']

export default function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isPortal = PORTAL_PREFIXES.some((p) => pathname.startsWith(p))

  return (
    <SessionProvider basePath="/api/auth">
      {!isPortal && <SoftBackground />}
      <SiteMotion />
      {children}
      <WhatsAppFloat />
    </SessionProvider>
  )
}
