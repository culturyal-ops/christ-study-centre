import type { ReactNode } from 'react'
import LandingNav from '@/components/landing/LandingNav'
import LandingFooter from '@/components/landing/LandingFooter'

export default function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="csc-landing csc-site">
      <LandingNav />
      {children}
      <LandingFooter />
    </div>
  )
}
