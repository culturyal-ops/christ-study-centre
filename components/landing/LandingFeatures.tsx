import Link from 'next/link'
import LandingFeaturesTitle from '@/components/landing/LandingFeaturesTitle'

const items = [
  {
    title: 'Weekly tests',
    desc: 'Board pattern tests every week. Marks logged and weak chapters flagged the same day.',
    href: '/#method',
  },
  {
    title: 'Chapter tracking',
    desc: 'Full syllabus mapped unit by unit. Nothing skipped before the exam window.',
    href: '/courses',
  },
  {
    title: 'Parent reports',
    desc: 'Monthly sheets with scores, attendance and revision status. Sent directly to parents.',
    href: '/#results',
  },
  {
    title: 'Small batches',
    desc: 'Limited seats per batch so every student gets correction time with the teacher.',
    href: '/courses',
  },
  {
    title: 'Board specialists',
    desc: 'Teachers who know CBSE, ICSE and SCERT patterns and the mistakes students repeat.',
    href: '/about',
  },
  {
    title: 'Fixed timetable',
    desc: 'Mon to Sat evening batches. One hour per subject. Sunday closed.',
    href: '/contact',
  },
  {
    title: 'Grades 3 to 12',
    desc: 'Foundation through Plus Two on the same academic system at every level.',
    href: '/courses',
  },
  {
    title: 'Direct contact',
    desc: 'WhatsApp or walk in at 52A RV Road, Pala. No call centre in between.',
    href: '/contact',
  },
]

export default function LandingFeatures() {
  return (
    <section className="csc-landing__features" id="features">
      <div className="csc-landing__wrap">
        <p className="csc-landing__eyebrow">Why families choose us</p>
        <LandingFeaturesTitle />

        <div className="csc-landing__feature-list">
          {items.map((item, i) => (
            <Link key={item.title} href={item.href} className="csc-landing__feature-row">
              <span className="csc-landing__feature-num">{String(i + 1).padStart(2, '0')}</span>
              <div className="csc-landing__feature-body">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
              <span className="csc-landing__feature-arrow" aria-hidden="true">
                ↗
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
