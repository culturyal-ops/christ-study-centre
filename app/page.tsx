import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Phone, MessageCircle, BookOpen, Users, Award, Clock } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <span className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              12 Years of Excellence
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Christ Study Centre
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Empowering students in Pala, Kerala since 2013
          </p>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Quality tuition for CBSE, ICSE, and SCERT students from grades III to XII. 
            Expert teachers, proven results, personalized attention.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/courses">Explore Courses</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white" asChild>
              <a href="https://wa.me/919747110790" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp Us
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Christ Study Centre?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <BookOpen className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>Comprehensive Curriculum</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Supporting CBSE, ICSE, and SCERT boards with expert subject teachers for all core subjects including Mathematics, Science, Languages, and Commerce.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>Personalized Attention</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Small batch sizes ensure every student gets individual attention. We track attendance, marks, and progress to help students excel.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Clock className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle>Flexible Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Evening classes designed for school-going students. One-on-one sessions, vacation batches, and both online/offline options available.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Get Started Today</h2>
          <p className="text-lg text-gray-600 mb-8">
            Visit us at our center in Pala or reach out for admissions and inquiries
          </p>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Visit Us</CardTitle>
              </CardHeader>
              <CardContent className="text-left">
                <p className="text-gray-700">
                  52A, RV Road, Njondimakkal<br />
                  Pala 686575<br />
                  Kerala, India
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="text-left space-y-2">
                <a href="tel:+919747110790" className="flex items-center text-blue-600 hover:text-blue-800">
                  <Phone className="h-4 w-4 mr-2" />
                  +91 9747110790
                </a>
                <a href="tel:+919188650790" className="flex items-center text-blue-600 hover:text-blue-800">
                  <Phone className="h-4 w-4 mr-2" />
                  +91 9188650790
                </a>
                <a href="tel:+919847877507" className="flex items-center text-blue-600 hover:text-blue-800">
                  <Phone className="h-4 w-4 mr-2" />
                  +91 9847877507
                </a>
              </CardContent>
            </Card>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/about">Learn More About Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Christ Study Centre. All rights reserved.</p>
          <p className="text-sm mt-2">Empowering students in Pala, Kerala for 12 years</p>
        </div>
      </footer>
    </div>
  )
}
