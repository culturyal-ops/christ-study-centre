import LandingNav from '@/components/landing/LandingNav'
import LandingHero from '@/components/landing/LandingHero'
import LandingClassroomVideo from '@/components/landing/LandingClassroomVideo'
import LandingFeatures from '@/components/landing/LandingFeatures'
import LandingFooter from '@/components/landing/LandingFooter'
import LandingMotion from '@/components/motion/LandingMotion'

export default function HomePage() {
  return (
    <div className="csc-landing">
      <LandingMotion />
      <LandingNav />
      <LandingHero />
      <LandingClassroomVideo />
      <LandingFeatures />
      <LandingFooter />
    </div>
  )
}
