'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import LandingFeaturesTitle from '@/components/landing/LandingFeaturesTitle'
import SectionReveal from '@/components/motion/SectionReveal'

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
    desc: 'Mon to Sat batches from 5:30 AM to 8:30 PM. One hour per subject. Sunday closed.',
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
  const reduced = useReducedMotion()

  return (
    <SectionReveal className="csc-landing__features" id="features">
      <div className="csc-landing__wrap">
        <p className="csc-landing__eyebrow">Why families choose us</p>
        <LandingFeaturesTitle />

        <div className="csc-landing__feature-grid">
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              className="csc-landing__feature-card-wrap"
              initial={reduced ? false : { opacity: 0, y: 20 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
                ease: 'easeOut',
              }}
            >
              <Link href={item.href} className="csc-landing__feature-card">
                <span className="csc-landing__feature-num">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="csc-landing__feature-body">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
                <span className="csc-landing__feature-arrow" aria-hidden="true">
                  ↗
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionReveal>
  )
}
