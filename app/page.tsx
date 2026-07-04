import LandingNav from '@/components/landing/LandingNav'
import LandingHero from '@/components/landing/LandingHero'
import LandingClassroomVideo from '@/components/landing/LandingClassroomVideo'
import LandingFeatures from '@/components/landing/LandingFeatures'
import LandingFooter from '@/components/landing/LandingFooter'
import LandingMotion from '@/components/motion/LandingMotion'
import SectionDivider from '@/components/motion/SectionDivider'

export default function HomePage() {
  return (
    <div className="csc-landing">
      <LandingMotion />
      <LandingNav />
      <LandingHero />
      <SectionDivider />
      <LandingClassroomVideo />
      <SectionDivider />
      <LandingFeatures />
      <SectionDivider />
      <LandingFooter />
    </div>
  )
}
