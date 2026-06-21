import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { BookOpen, Users, Clock, CheckCircle, ArrowRight } from 'lucide-react'

export default function CoursesPage() {
  const courses = [
    {
      title: 'Primary Level',
      grades: 'Grades III–VII',
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
      grades: 'Grades VIII–X',
      boards: ['CBSE', 'ICSE', 'SCERT'],
      subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Malayalam'],
      features: [
        'Board exam-focused preparation',
        'Conceptual clarity over rote learning',
        'Mock exams & detailed analysis',
        'Weekly doubt clearing sessions',
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

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="navy-bg text-white">
        <div className="container-narrow section-spacing text-center">
          <p className="text-sm uppercase tracking-widest text-gray-400 mb-6">What We Offer</p>
          <h1 className="text-display mb-6">Courses & Programmes</h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Comprehensive coaching for CBSE, ICSE & SCERT students from Grade III through XII.
          </p>
        </div>
      </section>

      {/* Courses */}
      <section className="section-spacing">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-widest text-gray-600 mb-4">Core Programmes</p>
            <h2 className="text-h2">All Grade Levels</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {courses.map((course) => (
              <div key={course.title} className="card">
                {/* Header */}
                <div className="navy-bg text-white px-8 py-6">
                  <h3 className="serif text-2xl font-semibold">{course.title}</h3>
                  <p className="text-sm gold-text mt-1">{course.grades}</p>
                  <div className="flex gap-2 mt-3">
                    {course.boards.map((b) => (
                      <span key={b} className="text-xs px-2 py-0.5 border border-gray-600 text-gray-300">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Body */}
                <div className="px-8 py-6 space-y-6">
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider mb-3">Subjects</h4>
                    <div className="flex flex-wrap gap-2">
                      {course.subjects.map((s) => (
                        <span key={s} className="text-xs px-3 py-1 bg-gray-100 text-gray-700">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider mb-3">Features</h4>
                    <ul className="space-y-2">
                      {course.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
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

      {/* Special Programmes */}
      <section className="section-spacing bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-widest text-gray-600 mb-4">Beyond Regular Classes</p>
            <h2 className="text-h2">Special Programmes</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: 'One-on-One Tutoring',
                desc: 'Personalised coaching for students who need focused individual attention.',
              },
              {
                icon: Clock,
                title: 'Vacation Batches',
                desc: 'Intensive revision and advance learning programmes during school holidays.',
              },
              {
                icon: BookOpen,
                title: 'Online & Offline',
                desc: 'Attend class in our AC rooms or join live sessions from home.',
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

      {/* Timings */}
      <section className="section-spacing">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-widest text-gray-600 mb-4">Schedule</p>
            <h2 className="text-h3">Class Timings</h2>
          </div>

          <div className="card divide-y divide-gray-200">
            {[
              { label: 'Monday – Saturday', value: '4:00 PM – 8:00 PM' },
              { label: 'Batch Duration', value: '1 hour per subject' },
              { label: 'Sunday', value: 'Closed' },
            ].map((t) => (
              <div key={t.label} className="flex justify-between items-center px-8 py-5">
                <span className="font-medium">{t.label}</span>
                <span className="text-sm gold-text">{t.value}</span>
              </div>
            ))}
          </div>

          <p className="text-sm text-gray-600 text-center mt-6">
            * Flexible timings available for one-on-one sessions. Contact us for personalised scheduling.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing bg-gray-50">
        <div className="container-narrow text-center">
          <h2 className="text-h2 mb-6">Enrol Today</h2>
          <p className="text-gray-600 mb-10">
            Limited seats available—reach out now to secure your child's spot.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn btn-primary">
              Get in Touch <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="https://wa.me/919747110790" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
