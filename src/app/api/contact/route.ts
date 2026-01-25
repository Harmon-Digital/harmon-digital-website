import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, company, website, businessStage, lookingFor, needs } = body

    // Send notification email to Harmon Digital
    await resend.emails.send({
      from: 'Harmon Digital <notifications@notifications.harmon-digital.com>',
      to: ['info@harmon-digital.com'],
      subject: `New Lead: ${company} - ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Website:</strong> ${website || 'Not provided'}</p>
        <p><strong>Business Stage:</strong> ${businessStage || 'Not specified'}</p>
        <p><strong>Looking For:</strong> ${lookingFor}</p>
        <p><strong>What they want to build:</strong></p>
        <p>${needs}</p>
        <hr />
        <p style="color: #888; font-size: 12px;">This lead came from the Harmon Digital website contact form.</p>
      `,
    })

    // Send confirmation email to the lead
    await resend.emails.send({
      from: 'Harmon Digital <hello@notifications.harmon-digital.com>',
      to: [email],
      subject: `Thanks for reaching out, ${name.split(' ')[0]}!`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a1a;">Thanks for reaching out!</h2>
          <p style="color: #444; line-height: 1.6;">
            Hi ${name.split(' ')[0]},
          </p>
          <p style="color: #444; line-height: 1.6;">
            We received your message and we're excited to learn more about ${company}.
            If you haven't already, go ahead and book a time on our calendar so we can chat.
          </p>
          <p style="margin: 32px 0;">
            <a href="https://cal.com/harmon-digital/15min"
               style="background: #3959ff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Book a Call
            </a>
          </p>
          <p style="color: #444; line-height: 1.6;">
            Talk soon,<br />
            The Harmon Digital Team
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}
