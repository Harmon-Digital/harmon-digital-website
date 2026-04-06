import { NextResponse } from 'next/server'

const SUPABASE_URL = process.env.SUPABASE_URL!

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const res = await fetch(`${SUPABASE_URL}/functions/v1/partner-inquiry-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      const err = await res.json()
      console.error('Edge function error:', err)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
