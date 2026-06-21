import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Award, Target, Eye, GraduationCap } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Christ Study Centre
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <Link href="/about" className="text-blue-600 font-medium">About</Link>
            <Link href="/courses" className="hover:text-blue-600">Courses</Link>
            <Link href="/contact" className="hover:text-blue-600">Contact</Link>
            <Link href="/login" className="hover:text-blue-600">Login</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Award className="h-5 w-5" />
            <span>12 Years of Excellence</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Christ Study Centre</h1>
          <p className="text-xl text-blue-100">
            Transforming education in Pala, Kerala since 2013
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              Christ Study Centre was established in 2013 with a simple yet powerful mission: to provide quality education 
              and personalized attention to students in Pala and surrounding areas. Over the past 12 years, we have grown 
              from a small tutoring center to a trusted educational institution serving hundreds of students across CBSE, 
              ICSE, and SCERT curricula.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our center specializes in providing coaching for students from grades III to XII, with a particular focus on 
              core subjects including Mathematics, Physics, Chemistry, Biology, Computer Science, Accountancy, English, 
              Malayalam, and Social Studies. We understand that every student learns differently, which is why we maintain 
              small batch sizes and offer both group classes and one-on-one sessions.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Located at 52A, RV Road, Njondimakkal, Pala, our well-equipped center provides a conducive learning 
              environment where students can thrive academically. Our team of experienced teachers is dedicated to helping 
              each student reach their full potential through innovative teaching methods and continuous progress tracking.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <Target className="h-12 w-12 text-blue-600 mb-2" />
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  To empower students with quality education, personalized attention, and comprehensive support that 
                  enables them to excel academically and build a strong foundation for their future careers.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Eye className="h-12 w-12 text-blue-600 mb-2" />
                <CardTitle className="text-2xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  To be the most trusted and sought-after educational institution in Pala, recognized for our commitment 
                  to academic excellence, innovative teaching methods, and holistic student development.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Facilities</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <GraduationCap className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>Expert Faculty</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Experienced teachers with deep subject knowledge and proven teaching expertise across all major boards.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <GraduationCap className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>Modern Classrooms</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Well-lit, comfortable classrooms equipped with teaching aids for effective learning.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <GraduationCap className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>Progress Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Digital attendance and marks tracking system to monitor student progress throughout the year.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <GraduationCap className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>Flexible Timings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Evening batches designed to fit school schedules, plus vacation batches during holidays.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Learning Journey?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join hundreds of students who trust Christ Study Centre for their education
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses">
              <Button size="lg" variant="secondary">View Courses</Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white">Contact Us</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Christ Study Centre. All rights reserved.</p>
          <p className="text-sm mt-2">52A, RV Road, Njondimakkal, Pala 686575</p>
        </div>
      </footer>
    </div>
  )
}
