import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Award, Target, Eye, GraduationCap, Building2, BookOpenCheck, Wifi, ArrowRight } from 'lucide-react'

export default function AboutPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="navy-bg text-white">
        <div className="container-narrow section-spacing text-center">
          <p className="text-sm uppercase tracking-widest text-gray-400 mb-6">Est. 2013 · 12 Years</p>
          <h1 className="text-display mb-6">About Christ Study Centre</h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Transforming education in Pala, Kerala with personalized coaching and proven results.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-spacing">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm uppercase tracking-widest text-gray-600 mb-4">Our Story</p>
              <h2 className="text-h2 mb-8">From a Small Centre to a Trusted Name</h2>
              
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Christ Study Centre was founded in 2013 with a single mission—provide quality
                  education to every student in Pala, regardless of their school background. Over 12 years
                  we have grown from a small tutoring room to a fully-equipped institution that hundreds
                  of families trust every year.
                </p>
                <p>
                  We cover Grades III to XII across CBSE, ICSE, and SCERT boards. Our team of experienced
                  teachers knows exactly what examiners look for and builds students toward those outcomes
                  systematically.
                </p>
                <p>
                  Students don't just pass here—they understand.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '2013', label: 'Founded' },
                { value: '12+', label: 'Years' },
                { value: '500+', label: 'Students' },
                { value: '3', label: 'Boards' },
              ].map((stat) => (
                <div key={stat.label} className="card p-6 text-center">
                  <div className="serif text-4xl font-semibold gold-text mb-2">{stat.value}</div>
                  <div className="text-sm uppercase tracking-wider text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-spacing bg-gray-50">
        <div className="container-narrow">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-widest text-gray-600 mb-4">Purpose & Direction</p>
            <h2 className="text-h2">Mission & Vision</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="card p-10">
              <Target className="w-10 h-10 text-[#D4AF37] mb-6" />
              <h3 className="serif text-2xl font-semibold mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To empower students with quality education, personal attention, and comprehensive support
                that enables them to excel academically and build strong foundations for their careers.
              </p>
            </div>

            <div className="card p-10">
              <Eye className="w-10 h-10 text-[#D4AF37] mb-6" />
              <h3 className="serif text-2xl font-semibold mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To be the most trusted educational institution in Pala, recognised for academic excellence,
                innovative teaching methods, and holistic student development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="section-spacing">
        <div className="container">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-widest text-gray-600 mb-4">Infrastructure</p>
            <h2 className="text-h2">Our Facilities</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Building2,
                title: 'Modern Classrooms',
                desc: 'Air-conditioned rooms designed for focused, distraction-free learning.',
              },
              {
                icon: GraduationCap,
                title: 'Expert Faculty',
                desc: 'Experienced subject specialists with a passion for helping students.',
              },
              {
                icon: BookOpenCheck,
                title: 'Progress Tracking',
                desc: 'Digital attendance and marks system to monitor student progress.',
              },
              {
                icon: Wifi,
                title: 'Online & Offline',
                desc: 'Flexible learning modes—attend in person or join live from home.',
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-gray-200">
                  <Icon className="w-7 h-7 text-[#D4AF37]" />
                </div>
                <h3 className="serif text-lg font-semibold mb-3">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing bg-gray-50">
        <div className="container-narrow text-center">
          <h2 className="text-h2 mb-6">Ready to Start?</h2>
          <p className="text-gray-600 mb-10">
            Join hundreds of students who trust Christ Study Centre for their academic journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses" className="btn btn-primary">
              View Courses <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="btn btn-secondary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
