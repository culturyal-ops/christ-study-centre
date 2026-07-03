'use client'

import { SessionProvider } from 'next-auth/react'
import SiteMotion from '@/components/SiteMotion'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <SiteMotion />
      {children}
    </SessionProvider>
  )
}
