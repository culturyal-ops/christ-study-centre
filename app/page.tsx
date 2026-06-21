import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Crest from '@/components/Crest'
import { BookOpen, Users, Award, Clock, CheckCircle, ArrowRight } from 'lucide-react'

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* Hero with Crest */}
      <section className="bg-forest text-bone relative overflow-hidden">
        <div className="container section-spacing">
          <div className="max-w-4xl mx-auto text-center">
            {/* Crest */}
            <Crest className="w-24 h-28 mx-auto mb-12 text-brass" />
            
            <h1 className="display mb-8">
              Where Students <span className="text-oxblood">Excel</span>
            </h1>

            <p className="eyebrow mb-6">Est. 2013 · Pala, Kerala</p>

            <p className="text-lg text-bone/70 mb-12 max-w-2xl mx-auto leading-relaxed">
              CBSE, ICSE & SCERT coaching for grades III–XII.<br />
              Twelve years of academic rigour, proven results, and personal attention.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/courses" className="btn btn-primary">
                Explore Courses <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="https://wa.me/919747110790" target="_blank" rel="noopener noreferrer" className="btn btn-light">
                Enquire Now
              </a>
            </div>
          </div>
        </div>

        {/* Gilt rule divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="gilt-rule"></div>
        </div>
      </section>

      {/* Stats - Editorial Grid */}
      <section className="section-spacing bg-parchment">
        <div className="container">
          <div className="editorial-grid relative">
            <div className="margin-rule hidden lg:block"></div>
            
            <aside className="margin-label">
              <span>Record</span>
            </aside>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: '12', label: 'Years', icon: Award },
                { value: '500+', label: 'Students', icon: Users },
                { value: '3', label: 'Boards', icon: BookOpen },
                { value: '10+', label: 'Teachers', icon: Clock },
              ].map(({ value, label, icon: Icon }) => (
                <div key={label} className="text-center">
                  <Icon className="w-6 h-6 mx-auto mb-4 text-brass" />
                  <div className="h2 mb-2">{value}</div>
                  <div className="eyebrow">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Parents Trust Us */}
      <section className="section-spacing bg-ivy text-bone">
        <div className="container">
          <div className="editorial-grid relative">
            <div className="margin-rule hidden lg:block"></div>
            
            <aside className="margin-label">
              <span>Trust</span>
            </aside>

            <div>
              <div className="max-w-3xl mb-16">
                <h2 className="h2 mb-6">Why Parents Trust Us</h2>
                <div className="rule-oxblood mb-6"></div>
                <p className="text-lg text-bone/70 leading-relaxed">
                  Twelve years ago, we started with a single promise: every student deserves expert guidance, 
                  systematic preparation, and a teacher who cares. That promise still guides everything we do.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: 'All Major Boards',
                    desc: 'CBSE, ICSE & SCERT curricula. Grades III to XII. Expert subject teachers for every discipline.',
                  },
                  {
                    title: 'Personal Attention',
                    desc: 'Small batches. Individual progress tracking. Weekly feedback to parents.',
                  },
                  {
                    title: 'Proven Results',
                    desc: 'Hundreds of students excelling in board exams. Systematic preparation, not shortcuts.',
                  },
                  {
                    title: 'Flexible Modes',
                    desc: 'Evening batches for school-going students. One-on-one sessions. Online and offline.',
                  },
                  {
                    title: 'Exam-Focused',
                    desc: 'Mock tests, previous year papers, weekly assessments. We prepare students for success.',
                  },
                  {
                    title: 'Vacation Batches',
                    desc: 'Intensive revision programmes during school holidays. Advance learning opportunities.',
                  },
                ].map(({ title, desc }) => (
                  <div key={title} className="card-dark p-6">
                    <h3 className="h3 mb-3 text-lg">{title}</h3>
                    <p className="text-sm text-bone/60 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="section-spacing bg-parchment">
        <div className="container">
          <div className="editorial-grid relative">
            <div className="margin-rule hidden lg:block"></div>
            
            <aside className="margin-label">
              <span>Method</span>
            </aside>

            <div className="grid md:grid-cols-2 gap-16 items-center max-w-5xl">
              <div>
                <h2 className="h2 mb-6">Our Methodology</h2>
                <div className="rule-oxblood mb-6"></div>
                <p className="text-forest/70 leading-relaxed mb-6">
                  We don't believe in rote learning. Our approach focuses on deep conceptual understanding, 
                  systematic practice, and continuous assessment.
                </p>
                <p className="text-forest/70 leading-relaxed">
                  Every week: concept mastery, problem solving, mock tests, and personalized feedback. 
                  Every month: comprehensive assessments and parent updates.
                </p>
              </div>

              <ul className="space-y-3">
                {[
                  'Conceptual clarity over memorization',
                  'Weekly worksheets and assignments',
                  'Mock tests with detailed analysis',
                  'Systematic monthly assessments',
                  'Previous year paper practice',
                  'One-on-one doubt clearing',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <CheckCircle className="w-5 h-5 text-brass flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing bg-forest text-bone">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <p className="eyebrow mb-6">Limited Seats Available</p>
            <h2 className="h2 mb-8">Begin Your Journey</h2>
            <p className="text-bone/70 mb-10 leading-relaxed">
              Visit us at 52A, RV Road, Njondimakkal, Pala — or reach out for admissions and inquiries.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/contact" className="btn btn-primary">
                Contact Us <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="https://wa.me/919747110790" target="_blank" rel="noopener noreferrer" className="btn btn-light">
                WhatsApp
              </a>
            </div>

            <div className="flex flex-wrap gap-4 justify-center text-sm text-bone/50 font-mono">
              {['+91 9747 110 790', '+91 9188 650 790', '+91 9847 877 507'].map((ph) => (
                <a
                  key={ph}
                  href={`tel:${ph.replace(/\s/g, '')}`}
                  className="hover:text-brass transition-colors"
                >
                  {ph}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
