'use client'

import { SessionProvider } from 'next-auth/react'
import SoftBackground from '@/components/SoftBackground'
import SiteMotion from '@/components/SiteMotion'
import WhatsAppFloat from '@/components/WhatsAppFloat'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <SoftBackground />
      <SiteMotion />
      {children}
      <WhatsAppFloat />
    </SessionProvider>
  )
}
