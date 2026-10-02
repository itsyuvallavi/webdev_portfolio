import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Contact form validation schema
const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(1, 'Message is required').max(2000, 'Message is too long'),
})

// Rate limiting: simple in-memory store (for production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW = 15 * 60 * 1000 // 15 minutes
const MAX_REQUESTS = 5 // Max 5 requests per window
const RESEND_API_URL = 'https://api.resend.com/emails'

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return true
  }

  if (record.count >= MAX_REQUESTS) {
    return false
  }

  record.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    
    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Parse and validate request body
    let body: unknown
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: 'Invalid JSON request body.' }, { status: 400 })
    }
    const validatedData = contactSchema.parse(body)

    const apiKey = process.env.RESEND_API_KEY?.trim()
    const toEmail = process.env.CONTACT_TO_EMAIL?.trim()
    const fromEmail = process.env.CONTACT_FROM_EMAIL?.trim()

    if (!apiKey || !toEmail || !fromEmail) {
      console.error('Contact form delivery is not configured')
      return NextResponse.json(
        { error: 'The contact form is temporarily unavailable. Please email info@yuvallavi.com directly.' },
        { status: 503 }
      )
    }

    let resendResponse: Response

    try {
      resendResponse = await fetch(RESEND_API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(10_000),
        body: JSON.stringify({
          from: fromEmail,
          to: [toEmail],
          reply_to: validatedData.email,
          subject: 'New portfolio contact submission',
          text: [
            'New portfolio contact submission',
            '',
            `Name: ${validatedData.name}`,
            `Email: ${validatedData.email}`,
            '',
            'Message:',
            validatedData.message,
          ].join('\n'),
        }),
      })
    } catch {
      console.error('Contact form delivery request failed')
      return NextResponse.json(
        { error: 'Your message could not be delivered. Please try again or email info@yuvallavi.com directly.' },
        { status: 502 }
      )
    }

    if (!resendResponse.ok) {
      console.error('Contact form delivery was rejected', { status: resendResponse.status })
      return NextResponse.json(
        { error: 'Your message could not be delivered. Please try again or email info@yuvallavi.com directly.' },
        { status: 502 }
      )
    }

    const resendResult: unknown = await resendResponse.json().catch(() => null)
    const providerId =
      typeof resendResult === 'object' &&
      resendResult !== null &&
      'id' in resendResult &&
      typeof resendResult.id === 'string'
        ? resendResult.id.trim()
        : ''

    if (!providerId) {
      console.error('Contact form delivery returned no provider id')
      return NextResponse.json(
        { error: 'Your message could not be confirmed as delivered. Please email info@yuvallavi.com directly.' },
        { status: 502 }
      )
    }

    return NextResponse.json(
      { success: true, message: 'Message sent successfully!' },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Contact form request failed')
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    )
  }
}
