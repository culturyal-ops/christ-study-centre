import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

// For now, we'll store inquiries in a simple way
// In production, you might want to create a separate ContactInquiry model
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const validation = contactSchema.safeParse(body)
    
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.error.flatten() },
        { status: 400 }
      )
    }

    const { name, email, phone, message } = validation.data

    // Log the inquiry (in production, you'd save to database or send email)
    console.log('Contact form submission:', {
      name,
      email,
      phone,
      message,
      timestamp: new Date().toISOString(),
    })

    // In production, you could:
    // 1. Save to a ContactInquiry table
    // 2. Send an email to admin
    // 3. Send SMS notification
    // For now, we'll just return success

    return NextResponse.json(
      { 
        success: true,
        message: 'Thank you for your inquiry. We will contact you soon!' 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
