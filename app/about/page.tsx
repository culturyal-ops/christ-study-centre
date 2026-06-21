import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Award, Target, Eye, GraduationCap, CheckCircle, ArrowRight, Building2, BookOpenCheck, Wifi } from 'lucide-react'

export default function AboutPage() {
  const facilities = [
    {
      icon: Building2,
      title: 'Modern Classrooms',
      desc: 'Air-conditioned rooms, whiteboard-equipped, designed for focused, distraction-free learning.',
    },
    {
      icon: GraduationCap,
      title: 'Expert Faculty',
      desc: 'Experienced subject specialists with a passion for helping every student reach their potential.',
    },
    {
      icon: BookOpenCheck,
      title: 'Progress Tracking',
      desc: 'Digital attendance and marks system so parents and students always know where they stand.',
    },
    {
      icon: Wifi,
      title: 'Online & Offline',
      desc: 'Flexible learning modes — attend in person or join live from home without missing a beat.',
    },
  ]

  return (
    <div className="min-h-screen" style={{ background: '#FAF6EF' }}>
      <Navbar />

      {/* ── Hero ── */}
      <section
        className="relative py-28 px-4 overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #060F1E 0%, #0C1E3C 50%, #132847 100%)' }}
      >
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.09) 0%, transparent 65%)' }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(201,168,76,0.05) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative max-w-4xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest"
            style={{ background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.3)', color: '#C9A84C' }}
          >
            <Award className="w-3.5 h-3.5" />
            Est. 2013 · 12 Years of Excellence
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-5" style={{ letterSpacing: '-0.02em' }}>
            About{' '}
            <span className="gold-text">Christ Study Centre</span>
          </h1>
          <p className="text-lg text-white/55 max-w-2xl mx-auto">
            Transforming education in Pala, Kerala with personalized coaching and proven results since 2013.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none" style={{ background: 'linear-gradient(to top, #FAF6EF, transparent)' }} />
      </section>

      {/* ── Our Story ── */}
      <section className="py-24 px-4" style={{ background: '#FAF6EF' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* left text */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#C9A84C' }}>Our Story</p>
              <h2 className="text-4xl font-black mb-6" style={{ color: '#0C1E3C', letterSpacing: '-0.02em' }}>
                From a Small Centre<br />to a Trusted Name
              </h2>
              <div className="space-y-4 text-sm leading-relaxed" style={{ color: '#4A5568' }}>
                <p>
                  Christ Study Centre was founded in 2013 with a single mission — provide the same quality of
                  education to every student in Pala, regardless of their school background. Over 12 years we
                  have grown from a small tutoring room to a fully-equipped institution that hundreds of families
                  trust every year.
                </p>
                <p>
                  We cover Grades III to XII across CBSE, ICSE, and SCERT boards. Our team of experienced teachers
                  knows exactly what examiners look for and builds students toward those outcomes systematically.
                </p>
                <p>
                  Our air-conditioned classrooms, homely atmosphere, and digital progress tracking set us apart
                  from conventional tuition centres. Students don't just pass here — they understand.
                </p>
              </div>
            </div>

            {/* right stats card */}
            <div
              className="rounded-3xl p-10"
              style={{ background: '#0C1E3C', boxShadow: '0 32px 80px rgba(12,30,60,0.2)' }}
            >
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: '2013', label: 'Founded' },
                  { value: '12+', label: 'Years Active' },
                  { value: '500+', label: 'Students' },
                  { value: '3', label: 'Boards' },
                ].map((s) => (
                  <div key={s.label} className="text-center py-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
                    <div className="text-4xl font-black gold-text mb-1 stat-counter">{s.value}</div>
                    <div className="text-xs uppercase tracking-widest text-white/40">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="divider-gold my-6" />

              <ul className="space-y-3">
                {[
                  'CBSE · ICSE · SCERT',
                  'Grades III to XII',
                  'Air-conditioned classrooms',
                  'Online & offline modes',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-white/60">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: '#C9A84C' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section
        className="py-24 px-4"
        style={{ background: 'linear-gradient(160deg, #0C1E3C 0%, #132847 100%)' }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#C9A84C' }}>
              Purpose & Direction
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-white" style={{ letterSpacing: '-0.02em' }}>
              Mission &amp; Vision
            </h2>
            <div className="shimmer-line w-20 mx-auto mt-5" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div
              className="rounded-2xl p-8 card-hover"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,168,76,0.18)' }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.2), rgba(232,201,122,0.25))' }}
              >
                <Target className="w-7 h-7" style={{ color: '#C9A84C' }} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Our Mission</h3>
              <p className="text-white/55 text-sm leading-relaxed">
                To empower students with quality education, personal attention, and comprehensive support
                that enables them to excel academically and build strong foundations for their careers.
              </p>
            </div>

            <div
              className="rounded-2xl p-8 card-hover"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,168,76,0.18)' }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.2), rgba(232,201,122,0.25))' }}
              >
                <Eye className="w-7 h-7" style={{ color: '#C9A84C' }} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Our Vision</h3>
              <p className="text-white/55 text-sm leading-relaxed">
                To be the most trusted educational institution in Pala, recognised for academic excellence,
                innovative teaching methods, and holistic student development that creates future leaders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Facilities ── */}
      <section className="py-24 px-4 section-pattern" style={{ background: '#FAF6EF' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#C9A84C' }}>
              Infrastructure
            </p>
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: '#0C1E3C', letterSpacing: '-0.02em' }}>
              Our Facilities
            </h2>
            <div className="shimmer-line w-20 mx-auto mt-4" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {facilities.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="card-hover rounded-2xl p-7 text-center"
                style={{ background: 'white', border: '1px solid rgba(201,168,76,0.15)', boxShadow: '0 4px 24px rgba(12,30,60,0.06)' }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
                  style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(232,201,122,0.2))' }}
                >
                  <Icon className="w-6 h-6" style={{ color: '#C9A84C' }} />
                </div>
                <h3 className="font-bold text-base mb-2" style={{ color: '#0C1E3C' }}>{title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: '#6B7A8D' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-20 px-4"
        style={{ background: 'linear-gradient(135deg, #C9A84C 0%, #E8C97A 50%, #9A7830 100%)' }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-4" style={{ color: '#0C1E3C', letterSpacing: '-0.02em' }}>
            Ready to Start?
          </h2>
          <p className="mb-8 text-sm" style={{ color: 'rgba(12,30,60,0.7)' }}>
            Join hundreds of students who trust Christ Study Centre for their academic journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses">
              <button
                className="px-8 py-3.5 rounded-xl text-sm font-bold inline-flex items-center gap-2 transition-all"
                style={{ background: '#0C1E3C', color: '#E8C97A' }}
              >
                View Courses
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <Link href="/contact">
              <button
                className="px-8 py-3.5 rounded-xl text-sm font-bold inline-flex items-center gap-2 transition-all"
                style={{ background: 'rgba(12,30,60,0.12)', color: '#0C1E3C', border: '1.5px solid rgba(12,30,60,0.25)' }}
              >
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
