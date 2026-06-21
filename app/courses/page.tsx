import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { BookOpen, Users, Clock, CheckCircle, ArrowRight, MessageCircle } from 'lucide-react'

export default function CoursesPage() {
  const courses = [
    {
      title: 'Primary Level',
      grades: 'Grades III – VII',
      boards: ['CBSE', 'ICSE', 'SCERT'],
      subjects: ['Mathematics', 'English', 'Malayalam', 'Social Studies', 'Science'],
      features: [
        'Foundation building in core subjects',
        'Interactive and activity-based learning',
        'Regular assessments with feedback',
        'Parent progress updates',
      ],
    },
    {
      title: 'High School',
      grades: 'Grades VIII – X',
      boards: ['CBSE', 'ICSE', 'SCERT'],
      subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Malayalam', 'Social Studies'],
      features: [
        'Board exam-focused preparation',
        'Conceptual clarity over rote learning',
        'Mock exams & detailed analysis',
        'Doubt clearing every week',
      ],
    },
    {
      title: 'Plus One',
      grades: 'Grade XI',
      boards: ['CBSE', 'SCERT'],
      subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Accountancy'],
      features: [
        'Stream-specific expert coaching',
        'Entrance exam orientation',
        'Regular practice tests',
        'Career counseling support',
      ],
    },
    {
      title: 'Plus Two',
      grades: 'Grade XII',
      boards: ['CBSE', 'SCERT'],
      subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Accountancy'],
      features: [
        'Board-exam intensive preparation',
        'Previous year paper practice',
        'Intensive revision sessions',
        'Entrance coaching integration',
      ],
    },
  ]

  const specials = [
    {
      icon: Users,
      title: 'One-on-One Tutoring',
      desc: 'Personalised coaching for students who need focused individual attention or a tailored learning pace.',
    },
    {
      icon: Clock,
      title: 'Vacation Batches',
      desc: 'Intensive revision and advance learning programmes during April–May and other school holidays.',
    },
    {
      icon: BookOpen,
      title: 'Online & Offline',
      desc: 'Attend class in our AC rooms or join live sessions from home — same quality either way.',
    },
  ]

  const timings = [
    { label: 'Monday – Saturday', value: '4:00 PM – 8:00 PM' },
    { label: 'Batch Duration', value: '1 hour per subject' },
    { label: 'Sunday', value: 'Closed' },
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
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: '#C9A84C' }}
          >
            What We Offer
          </p>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-5" style={{ letterSpacing: '-0.02em' }}>
            Courses &amp;{' '}
            <span className="gold-text">Programmes</span>
          </h1>
          <p className="text-lg text-white/55 max-w-2xl mx-auto">
            Comprehensive coaching for CBSE, ICSE &amp; SCERT students from Grade III through XII.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none" style={{ background: 'linear-gradient(to top, #FAF6EF, transparent)' }} />
      </section>

      {/* ── Courses Grid ── */}
      <section className="py-24 px-4" style={{ background: '#FAF6EF' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#C9A84C' }}>Core Programmes</p>
            <h2 className="text-4xl font-black" style={{ color: '#0C1E3C', letterSpacing: '-0.02em' }}>
              All Grade Levels
            </h2>
            <div className="shimmer-line w-20 mx-auto mt-5" />
          </div>

          <div className="grid md:grid-cols-2 gap-7">
            {courses.map((course) => (
              <div
                key={course.title}
                className="card-hover rounded-2xl overflow-hidden"
                style={{ background: 'white', border: '1px solid rgba(201,168,76,0.15)', boxShadow: '0 4px 24px rgba(12,30,60,0.07)' }}
              >
                {/* Card header */}
                <div
                  className="px-7 py-5 flex items-center justify-between"
                  style={{ background: 'linear-gradient(135deg, #0C1E3C 0%, #132847 100%)' }}
                >
                  <div>
                    <h3 className="text-xl font-black text-white">{course.title}</h3>
                    <p className="text-sm mt-0.5" style={{ color: '#C9A84C' }}>{course.grades}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 justify-end">
                    {course.boards.map((b) => (
                      <span
                        key={b}
                        className="text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider"
                        style={{ background: 'rgba(201,168,76,0.18)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.3)' }}
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card body */}
                <div className="px-7 py-6 space-y-5">
                  {/* Subjects */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#0C1E3C' }}>
                      Subjects Offered
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {course.subjects.map((s) => (
                        <span
                          key={s}
                          className="text-xs px-3 py-1 rounded-full font-medium"
                          style={{ background: 'rgba(201,168,76,0.08)', color: '#7A5C1E', border: '1px solid rgba(201,168,76,0.2)' }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#0C1E3C' }}>
                      Key Features
                    </h4>
                    <ul className="space-y-2">
                      {course.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: '#4A5568' }}>
                          <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#C9A84C' }} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Special Programmes ── */}
      <section
        className="py-24 px-4"
        style={{ background: 'linear-gradient(160deg, #0C1E3C 0%, #132847 100%)' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#C9A84C' }}>
              Beyond Regular Classes
            </p>
            <h2 className="text-4xl font-black text-white" style={{ letterSpacing: '-0.02em' }}>
              Special Programmes
            </h2>
            <div className="shimmer-line w-20 mx-auto mt-5" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {specials.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="card-hover rounded-2xl p-8"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(201,168,76,0.18)' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.2), rgba(232,201,122,0.25))' }}
                >
                  <Icon className="w-5 h-5" style={{ color: '#C9A84C' }} />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{title}</h3>
                <p className="text-sm leading-relaxed text-white/55">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timings ── */}
      <section className="py-20 px-4 section-pattern" style={{ background: '#FAF6EF' }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#C9A84C' }}>Schedule</p>
            <h2 className="text-3xl font-black" style={{ color: '#0C1E3C', letterSpacing: '-0.02em' }}>Class Timings</h2>
          </div>

          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: 'white', border: '1px solid rgba(201,168,76,0.2)', boxShadow: '0 8px 32px rgba(12,30,60,0.1)' }}
          >
            {timings.map((t, i) => (
              <div
                key={t.label}
                className={`flex justify-between items-center px-7 py-5 ${i < timings.length - 1 ? 'border-b' : ''}`}
                style={{ borderColor: 'rgba(201,168,76,0.1)' }}
              >
                <span className="font-semibold text-sm" style={{ color: '#0C1E3C' }}>{t.label}</span>
                <span className="text-sm font-medium" style={{ color: '#C9A84C' }}>{t.value}</span>
              </div>
            ))}
            <div className="px-7 py-4" style={{ background: 'rgba(201,168,76,0.05)' }}>
              <p className="text-xs" style={{ color: '#6B7A8D' }}>
                * Flexible timings available for one-on-one sessions. Contact us for personalised scheduling.
              </p>
            </div>
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
            Enrol Today
          </h2>
          <p className="mb-8 text-sm" style={{ color: 'rgba(12,30,60,0.7)' }}>
            Limited seats available — reach out now to secure your child's spot.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button
                className="px-8 py-3.5 rounded-xl text-sm font-bold inline-flex items-center gap-2"
                style={{ background: '#0C1E3C', color: '#E8C97A' }}
              >
                Get in Touch
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <a href="https://wa.me/919747110790" target="_blank" rel="noopener noreferrer">
              <button
                className="px-8 py-3.5 rounded-xl text-sm font-bold inline-flex items-center gap-2"
                style={{ background: 'rgba(12,30,60,0.12)', color: '#0C1E3C', border: '1.5px solid rgba(12,30,60,0.25)' }}
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
