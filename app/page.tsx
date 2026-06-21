import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { BookOpen, Users, Award, Clock, CheckCircle, ArrowRight } from 'lucide-react'

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="navy-bg text-white">
        <div className="container-narrow section-spacing text-center">
          <p className="text-sm uppercase tracking-widest text-gray-400 mb-6">Est. 2013 · 12 Years of Excellence</p>
          
          <h1 className="text-display mb-8">
            Where Students <span className="gold-text">Excel</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Premium coaching for CBSE, ICSE & SCERT · Grades III–XII<br />
            Pala, Kerala's most trusted tuition centre.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses" className="btn btn-primary">
              Explore Courses <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="https://wa.me/919747110790" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-spacing">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '12+', label: 'Years', icon: Award },
              { value: '500+', label: 'Students', icon: Users },
              { value: '3', label: 'Boards', icon: BookOpen },
              { value: '10+', label: 'Teachers', icon: Award },
            ].map(({ value, label, icon: Icon }) => (
              <div key={label}>
                <Icon className="w-8 h-8 mx-auto mb-4 text-[#D4AF37]" />
                <div className="serif text-4xl md:text-5xl font-semibold mb-2">{value}</div>
                <div className="text-sm text-gray-600 uppercase tracking-wider">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-spacing bg-gray-50">
        <div className="container-narrow">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-widest text-gray-600 mb-4">Why Parents Trust Us</p>
            <h2 className="text-h2">Built for Results</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: 'All Major Boards',
                desc: 'CBSE, ICSE & SCERT curricula—Grades III to XII with expert subject teachers.',
              },
              {
                icon: Users,
                title: 'Personal Attention',
                desc: 'Small batches ensure every student is seen, heard, and guided individually.',
              },
              {
                icon: Award,
                title: 'Proven Results',
                desc: '12 years, hundreds of students excelling in board exams and beyond.',
              },
              {
                icon: Clock,
                title: 'Flexible Modes',
                desc: 'Evening batches, one-on-one sessions, online & offline—your schedule, your way.',
              },
              {
                icon: CheckCircle,
                title: 'Exam-Focused',
                desc: 'Mock tests, previous year papers, and systematic weekly revision.',
              },
              {
                icon: BookOpen,
                title: 'Vacation Batches',
                desc: 'Intensive revision and advance-learning programmes during holidays.',
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-gray-200">
                  <Icon className="w-7 h-7 text-[#D4AF37]" />
                </div>
                <h3 className="serif text-xl font-semibold mb-3">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Preview */}
      <section className="section-spacing">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-widest text-gray-600 mb-4">What We Teach</p>
            <h2 className="text-h2 mb-6">Courses & Programmes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive coaching across all levels, subjects, and boards.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                grade: 'III–VII',
                label: 'Primary',
                subjects: ['Mathematics', 'Science', 'English', 'Malayalam'],
                boards: ['CBSE', 'ICSE', 'SCERT'],
              },
              {
                grade: 'VIII–X',
                label: 'High School',
                subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology'],
                boards: ['CBSE', 'ICSE', 'SCERT'],
              },
              {
                grade: 'XI',
                label: 'Plus One',
                subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology'],
                boards: ['CBSE', 'SCERT'],
              },
              {
                grade: 'XII',
                label: 'Plus Two',
                subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology'],
                boards: ['CBSE', 'SCERT'],
              },
            ].map((course) => (
              <div key={course.grade} className="card p-6">
                <div className="text-sm font-semibold text-[#D4AF37] mb-1 uppercase tracking-wider">
                  Grade {course.grade}
                </div>
                <h3 className="serif text-2xl font-semibold mb-4">{course.label}</h3>
                
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {course.boards.map((b) => (
                    <span key={b} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 font-medium">
                      {b}
                    </span>
                  ))}
                </div>

                <ul className="space-y-2 text-sm text-gray-600">
                  {course.subjects.map((s) => (
                    <li key={s} className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/courses" className="btn btn-primary">
              View All Courses <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="section-spacing bg-gray-50">
        <div className="container-narrow">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm uppercase tracking-widest text-gray-600 mb-4">Methodology</p>
              <h2 className="text-h3 mb-6">What Makes Us Different</h2>
              <p className="text-gray-600">
                Our teaching methodology is built around your child's success—from foundation to board exams.
              </p>
            </div>
            
            <ul className="space-y-3">
              {[
                'Focus on mastering concepts, not rote learning',
                'Worksheets and assignment sheets every week',
                'Mock tests with detailed analysis',
                'Systematic weekly and monthly tests',
                'Previous year question paper revision',
                'One-on-one doubt clearing sessions',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <CheckCircle className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing">
        <div className="container-narrow text-center">
          <p className="text-sm uppercase tracking-widest text-gray-600 mb-4">Limited Seats Available</p>
          <h2 className="text-h2 mb-6">Ready to Begin?</h2>
          <p className="text-gray-600 mb-10 max-w-xl mx-auto">
            Visit us at 52A, RV Road, Njondimakkal, Pala or reach out—we'll find the right programme for your child.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/contact" className="btn btn-primary">
              Contact Us <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="https://wa.me/919747110790" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              WhatsApp
            </a>
          </div>

          <div className="flex flex-wrap gap-3 justify-center text-sm text-gray-600">
            {['+91 9747 110 790', '+91 9188 650 790', '+91 9847 877 507'].map((ph) => (
              <a
                key={ph}
                href={`tel:${ph.replace(/\s/g, '')}`}
                className="hover:text-[#0A1628] transition-colors"
              >
                {ph}
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
