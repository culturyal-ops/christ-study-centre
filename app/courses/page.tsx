import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Users, Clock, CheckCircle } from 'lucide-react'

export default function CoursesPage() {
  const courses = [
    {
      title: 'Primary Level (III - VII)',
      grades: 'Grades 3 to 7',
      boards: ['CBSE', 'ICSE', 'SCERT'],
      subjects: ['Mathematics', 'English', 'Malayalam', 'Social Studies', 'Science'],
      features: [
        'Foundation building in core subjects',
        'Interactive learning methods',
        'Regular assessments',
        'Parent-teacher communication',
      ],
    },
    {
      title: 'High School (VIII - X)',
      grades: 'Grades 8, 9, 10',
      boards: ['CBSE', 'ICSE', 'SCERT'],
      subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Malayalam', 'Social Studies'],
      features: [
        'Board exam preparation',
        'Conceptual clarity focus',
        'Regular tests and mock exams',
        'Doubt clearing sessions',
      ],
    },
    {
      title: 'Plus One (XI)',
      grades: 'Grade 11',
      boards: ['CBSE', 'SCERT'],
      subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Accountancy'],
      features: [
        'Stream-specific coaching',
        'Competitive exam guidance',
        'Regular practice tests',
        'Career counseling',
      ],
    },
    {
      title: 'Plus Two (XII)',
      grades: 'Grade 12',
      boards: ['CBSE', 'SCERT'],
      subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Accountancy'],
      features: [
        'Board exam focused preparation',
        'Entrance exam coaching',
        'Intensive revision sessions',
        'Previous year papers practice',
      ],
    },
  ]

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
            <Link href="/about" className="hover:text-blue-600">About</Link>
            <Link href="/courses" className="text-blue-600 font-medium">Courses</Link>
            <Link href="/contact" className="hover:text-blue-600">Contact</Link>
            <Link href="/login" className="hover:text-blue-600">Login</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Courses</h1>
          <p className="text-xl text-blue-100">
            Comprehensive coaching for CBSE, ICSE, and SCERT students
          </p>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {courses.map((course) => (
              <Card key={course.title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <BookOpen className="h-10 w-10 text-blue-600" />
                    <div className="flex flex-wrap gap-2">
                      {course.boards.map((board) => (
                        <Badge key={board} variant="secondary">
                          {board}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <CardTitle className="text-2xl">{course.title}</CardTitle>
                  <CardDescription className="text-base">{course.grades}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-900">Subjects Offered:</h4>
                    <div className="flex flex-wrap gap-2">
                      {course.subjects.map((subject) => (
                        <Badge key={subject} variant="outline">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-900">Key Features:</h4>
                    <ul className="space-y-2">
                      {course.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-gray-600">
                          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Special Programs */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Special Programmes</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>One-on-One Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Personalized coaching for students who need extra attention or prefer individual learning.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Clock className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>Vacation Batches</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Intensive coaching during school holidays for revision, advance learning, and exam preparation.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <BookOpen className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>Online & Offline</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Flexible learning options - attend classes in person or join online from the comfort of your home.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Class Timings */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Class Timings</h2>
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <div className="space-y-4 text-left">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-semibold text-gray-900">Weekdays (Mon-Sat):</span>
                  <span className="text-gray-700">4:00 PM - 8:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-semibold text-gray-900">Batch Duration:</span>
                  <span className="text-gray-700">1 hour per subject</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-semibold text-gray-900">Sunday:</span>
                  <span className="text-gray-700">Closed</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                * Flexible timings available for one-on-one sessions. Contact us for personalized scheduling.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Enroll Today</h2>
          <p className="text-xl text-blue-100 mb-8">
            Limited seats available. Contact us now to secure your spot.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Get in Touch</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white" asChild>
              <a href="https://wa.me/919747110790" target="_blank" rel="noopener noreferrer">
                WhatsApp Us
              </a>
            </Button>
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
