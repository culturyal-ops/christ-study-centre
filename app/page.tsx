import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Phone, MessageCircle, BookOpen, Users, Award, Clock, CheckCircle, Star, ArrowRight, Shield, Zap, Target } from 'lucide-react'

export default function HomePage() {
  const stats = [
    { value: '12+', label: 'Years of Excellence', icon: Award },
    { value: '500+', label: 'Students Taught', icon: Users },
    { value: '3', label: 'Boards Covered', icon: BookOpen },
    { value: '10+', label: 'Expert Teachers', icon: Star },
  ]

  const features = [
    {
      icon: BookOpen,
      title: 'All Major Boards',
      desc: 'CBSE, ICSE & SCERT curricula — Grades III to XII with expert subject teachers.',
    },
    {
      icon: Users,
      title: 'Personal Attention',
      desc: 'Small batches ensure every student is seen, heard, and guided individually.',
    },
    {
      icon: Shield,
      title: 'Proven Track Record',
      desc: '12 years, hundreds of students excelling in board exams and beyond.',
    },
    {
      icon: Zap,
      title: 'Flexible Modes',
      desc: 'Evening batches, one-on-one sessions, online & offline — your schedule, your way.',
    },
    {
      icon: Target,
      title: 'Exam-Focused',
      desc: 'Mock tests, previous year papers, and systematic weekly revision keep you ahead.',
    },
    {
      icon: Clock,
      title: 'Vacation Batches',
      desc: 'Intensive revision and advance-learning programmes during school holidays.',
    },
  ]

  const courses = [
    {
      grade: 'III – VII',
      label: 'Primary Level',
      subjects: ['Mathematics', 'Science', 'English', 'Malayalam', 'Social Studies'],
      boards: ['CBSE', 'ICSE', 'SCERT'],
    },
    {
      grade: 'VIII – X',
      label: 'High School',
      subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English'],
      boards: ['CBSE', 'ICSE', 'SCERT'],
    },
    {
      grade: 'XI',
      label: 'Plus One',
      subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Accountancy'],
      boards: ['CBSE', 'SCERT'],
    },
    {
      grade: 'XII',
      label: 'Plus Two',
      subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Accountancy'],
      boards: ['CBSE', 'SCERT'],
    },
  ]

  return (
    <div className="min-h-screen" style={{ background: '#FAF6EF' }}>
      <Navbar />

      {/* ── Hero ── */}
      <section
        className="relative min-h-[92vh] flex items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #060F1E 0%, #0C1E3C 45%, #132847 100%)' }}
      >
        {/* decorative orbs */}
        <div
          className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(201,168,76,0.10) 0%, transparent 65%)',
          }}
        />
        <div
          className="absolute bottom-[-15%] left-[-10%] w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(30,58,95,0.6) 0%, transparent 65%)',
          }}
        />
        {/* dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(201,168,76,0.06) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
          {/* badge */}
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest" style={{ background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.3)', color: '#C9A84C' }}>
            <Award className="w-3.5 h-3.5" />
            12 Years of Academic Excellence · Est. 2013
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6 leading-[1.05] text-balance" style={{ color: 'white', letterSpacing: '-0.02em' }}>
            Where Students{' '}
            <span className="gold-text">Excel</span>
          </h1>

          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Premium coaching for CBSE, ICSE &amp; SCERT · Grades III – XII<br />
            Pala, Kerala's most trusted tuition centre since 2013.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/courses">
              <button className="btn-gold px-8 py-3.5 rounded-xl text-sm font-bold flex items-center gap-2 justify-center">
                Explore Courses
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <a
              href="https://wa.me/919747110790"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="btn-outline-gold px-8 py-3.5 rounded-xl text-sm font-bold flex items-center gap-2 justify-center">
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </button>
            </a>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map(({ value, label, icon: Icon }) => (
              <div
                key={label}
                className="glass-card rounded-2xl px-4 py-5"
              >
                <Icon className="w-5 h-5 mb-2 mx-auto" style={{ color: '#C9A84C' }} />
                <div className="text-3xl font-black stat-counter" style={{ color: '#E8C97A' }}>{value}</div>
                <div className="text-[11px] uppercase tracking-wider mt-1" style={{ color: 'rgba(255,255,255,0.45)' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background: 'linear-gradient(to top, #FAF6EF, transparent)' }} />
      </section>

      {/* ── Boards Banner ── */}
      <section className="py-8 px-4" style={{ background: '#FAF6EF' }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {['CBSE', 'ICSE', 'SCERT', 'Grades III – XII', 'Online & Offline'].map((tag) => (
              <span
                key={tag}
                className="px-5 py-2 rounded-full text-sm font-semibold"
                style={{
                  background: 'white',
                  color: '#0C1E3C',
                  border: '1.5px solid rgba(201,168,76,0.35)',
                  boxShadow: '0 2px 12px rgba(12,30,60,0.06)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-24 px-4 section-pattern" style={{ background: '#FAF6EF' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#C9A84C' }}>
              Why Parents & Students Trust Us
            </p>
            <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ color: '#0C1E3C', letterSpacing: '-0.02em' }}>
              Built for Results.
              <br />
              <span className="gold-text">Driven by Care.</span>
            </h2>
            <div className="shimmer-line w-24 mx-auto mt-6" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="card-hover rounded-2xl p-7"
                style={{
                  background: 'white',
                  border: '1px solid rgba(201,168,76,0.15)',
                  boxShadow: '0 4px 24px rgba(12,30,60,0.06)',
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(232,201,122,0.2))' }}
                >
                  <Icon className="w-5 h-5" style={{ color: '#C9A84C' }} />
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#0C1E3C' }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#6B7A8D' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Courses Preview ── */}
      <section
        className="py-24 px-4"
        style={{ background: 'linear-gradient(160deg, #0C1E3C 0%, #132847 100%)' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#C9A84C' }}>
              What We Teach
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
              Courses &amp; Programmes
            </h2>
            <p className="text-white/50 max-w-xl mx-auto text-base">
              Comprehensive coaching across all levels, subjects, and boards.
            </p>
            <div className="shimmer-line w-24 mx-auto mt-6" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {courses.map((course, i) => (
              <div
                key={course.grade}
                className="card-hover rounded-2xl p-6 relative overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(201,168,76,0.18)',
                }}
              >
                {/* grade pill */}
                <div
                  className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest"
                  style={{ background: 'linear-gradient(135deg, #C9A84C, #E8C97A)', color: '#0C1E3C' }}
                >
                  Grade {course.grade}
                </div>
                <h3 className="font-bold text-white text-lg mb-3">{course.label}</h3>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {course.boards.map((b) => (
                    <span
                      key={b}
                      className="text-[10px] px-2 py-0.5 rounded font-semibold uppercase tracking-wider"
                      style={{ background: 'rgba(201,168,76,0.15)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.3)' }}
                    >
                      {b}
                    </span>
                  ))}
                </div>

                <ul className="space-y-1.5">
                  {course.subjects.map((s) => (
                    <li key={s} className="flex items-center gap-2 text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>
                      <CheckCircle className="w-3 h-3 flex-shrink-0" style={{ color: '#C9A84C' }} />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/courses">
              <button className="btn-gold px-8 py-3.5 rounded-xl text-sm font-bold inline-flex items-center gap-2">
                View All Courses
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Key Features Strip ── */}
      <section className="py-20 px-4" style={{ background: '#FAF6EF' }}>
        <div className="max-w-5xl mx-auto">
          <div className="rounded-3xl p-10 md:p-14" style={{ background: '#0C1E3C', boxShadow: '0 32px 80px rgba(12,30,60,0.25)' }}>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#C9A84C' }}>Key Features</p>
                <h3 className="text-3xl md:text-4xl font-black text-white mb-5" style={{ letterSpacing: '-0.02em' }}>
                  What Makes Us Different
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  Our teaching methodology is built around your child's success — from foundation to board exams.
                </p>
              </div>
              <ul className="space-y-3">
                {[
                  'Focus on mastering concepts, not rote learning',
                  'Worksheets and assignment sheets every week',
                  'Mock tests with detailed analysis',
                  'Systematic weekly and monthly tests',
                  'Revision of previous year question papers',
                  'One-on-one doubt clearing sessions',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'linear-gradient(135deg, #C9A84C, #E8C97A)' }}>
                      <CheckCircle className="w-3 h-3 text-[#0C1E3C]" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-4 section-pattern" style={{ background: '#FAF6EF' }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#C9A84C' }}>
            Limited Seats Available
          </p>
          <h2 className="text-4xl md:text-5xl font-black mb-5" style={{ color: '#0C1E3C', letterSpacing: '-0.02em' }}>
            Ready to Begin?
          </h2>
          <p className="text-base mb-10" style={{ color: '#6B7A8D' }}>
            Visit us at 52A, RV Road, Njondimakkal, Pala or reach out — we'll find the right programme for your child.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Link href="/contact">
              <button className="btn-gold px-8 py-3.5 rounded-xl text-sm font-bold inline-flex items-center gap-2">
                Contact Us
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <a href="https://wa.me/919747110790" target="_blank" rel="noopener noreferrer">
              <button className="btn-outline-gold px-8 py-3.5 rounded-xl text-sm font-bold inline-flex items-center gap-2" style={{ borderColor: 'rgba(201,168,76,0.5)', color: '#0C1E3C' }}>
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </button>
            </a>
          </div>

          {/* Phone numbers */}
          <div className="flex flex-wrap gap-3 justify-center">
            {['+91 9747 110 790', '+91 9188 650 790', '+91 9847 877 507'].map((ph) => (
              <a
                key={ph}
                href={`tel:${ph.replace(/\s/g, '')}`}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
                style={{ background: 'white', color: '#0C1E3C', border: '1px solid rgba(201,168,76,0.25)', boxShadow: '0 2px 8px rgba(12,30,60,0.06)' }}
              >
                <Phone className="w-3.5 h-3.5" style={{ color: '#C9A84C' }} />
                {ph}
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
