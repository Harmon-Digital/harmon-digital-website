import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Business stage labels
const businessStageLabels: Record<string, string> = {
  'growing': 'Growing / scaling',
  'acquired': 'Recently acquired',
  'exit-1-3': 'Planning to sell in 1-3 years',
  'exit-3-7': 'Planning to sell in 3-7 years',
  'long-term': 'Building for the long haul',
}

// Looking for labels
const lookingForLabels: Record<string, string> = {
  'build': 'Build internal software/tools',
  'automate': 'Automate existing processes',
  'both': 'Both - full systematization',
  'consulting': 'Just consulting/advice',
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, company, website, businessStage, lookingFor, needs } = body

    const firstName = name.split(' ')[0]
    const businessStageLabel = businessStageLabels[businessStage] || businessStage || 'Not specified'
    const lookingForLabel = lookingForLabels[lookingFor] || lookingFor

    // Email template wrapper
    const emailWrapper = (content: string) => `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">
                  <!-- Logo -->
                  <tr>
                    <td style="padding-bottom: 32px;">
                      <table cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="background: linear-gradient(135deg, #3959ff 0%, #1a3ad4 100%); width: 32px; height: 32px; border-radius: 6px; text-align: center; vertical-align: middle;">
                            <span style="color: white; font-size: 14px; font-weight: bold;">//</span>
                          </td>
                          <td style="padding-left: 10px; color: #ffffff; font-size: 16px; font-weight: 500;">
                            Harmon Digital
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <!-- Content -->
                  <tr>
                    <td style="background-color: #141414; border-radius: 12px; padding: 40px;">
                      ${content}
                    </td>
                  </tr>
                  <!-- Footer -->
                  <tr>
                    <td style="padding-top: 32px; text-align: center;">
                      <p style="color: #555; font-size: 12px; margin: 0;">
                        Harmon Digital, LLC
                      </p>
                      <p style="color: #555; font-size: 12px; margin: 8px 0 0 0;">
                        <a href="https://harmon-digital.com" style="color: #555; text-decoration: none;">harmon-digital.com</a>
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `

    // Internal notification email
    const internalEmailContent = `
      <h1 style="color: #ffffff; font-size: 24px; font-weight: 500; margin: 0 0 8px 0;">
        New Lead
      </h1>
      <p style="color: #888; font-size: 14px; margin: 0 0 32px 0;">
        Someone submitted the contact form on your website.
      </p>

      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding: 16px 0; border-bottom: 1px solid #222;">
            <p style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 4px 0;">Name</p>
            <p style="color: #fff; font-size: 16px; margin: 0;">${name}</p>
          </td>
        </tr>
        <tr>
          <td style="padding: 16px 0; border-bottom: 1px solid #222;">
            <p style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 4px 0;">Email</p>
            <p style="color: #fff; font-size: 16px; margin: 0;">
              <a href="mailto:${email}" style="color: #3959ff; text-decoration: none;">${email}</a>
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding: 16px 0; border-bottom: 1px solid #222;">
            <p style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 4px 0;">Company</p>
            <p style="color: #fff; font-size: 16px; margin: 0;">${company}</p>
          </td>
        </tr>
        ${website ? `
        <tr>
          <td style="padding: 16px 0; border-bottom: 1px solid #222;">
            <p style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 4px 0;">Website</p>
            <p style="color: #fff; font-size: 16px; margin: 0;">
              <a href="${website}" style="color: #3959ff; text-decoration: none;">${website}</a>
            </p>
          </td>
        </tr>
        ` : ''}
        <tr>
          <td style="padding: 16px 0; border-bottom: 1px solid #222;">
            <p style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 4px 0;">Business Stage</p>
            <p style="color: #fff; font-size: 16px; margin: 0;">${businessStageLabel}</p>
          </td>
        </tr>
        <tr>
          <td style="padding: 16px 0; border-bottom: 1px solid #222;">
            <p style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 4px 0;">Looking For</p>
            <p style="color: #fff; font-size: 16px; margin: 0;">${lookingForLabel}</p>
          </td>
        </tr>
        <tr>
          <td style="padding: 16px 0;">
            <p style="color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 4px 0;">What They Want to Build</p>
            <p style="color: #fff; font-size: 16px; margin: 0; line-height: 1.6;">${needs}</p>
          </td>
        </tr>
      </table>

      <div style="margin-top: 32px;">
        <a href="mailto:${email}" style="display: inline-block; background: #3959ff; color: #fff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-size: 14px; font-weight: 500;">
          Reply to ${firstName}
        </a>
      </div>
    `

    // User confirmation email
    const userEmailContent = `
      <h1 style="color: #ffffff; font-size: 24px; font-weight: 500; margin: 0 0 24px 0;">
        Thanks for reaching out, ${firstName}!
      </h1>

      <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">
        We received your message and we're excited to learn more about ${company}.
      </p>

      <p style="color: #ccc; font-size: 16px; line-height: 1.6; margin: 0 0 32px 0;">
        If you haven't already, book a time on our calendar so we can chat about what you're looking to build.
      </p>

      <div style="margin-bottom: 32px;">
        <a href="https://cal.com/harmon-digital/15min" style="display: inline-block; background: #3959ff; color: #fff; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-size: 14px; font-weight: 500;">
          Book a Call
        </a>
      </div>

      <div style="border-top: 1px solid #222; padding-top: 24px; margin-top: 24px;">
        <p style="color: #888; font-size: 14px; line-height: 1.6; margin: 0 0 8px 0;">
          Here's a summary of what you shared:
        </p>
        <div style="background: #0a0a0a; border-radius: 8px; padding: 16px; margin-top: 12px;">
          <p style="color: #888; font-size: 13px; margin: 0 0 8px 0;">
            <span style="color: #555;">Looking for:</span> <span style="color: #ccc;">${lookingForLabel}</span>
          </p>
          <p style="color: #888; font-size: 13px; margin: 0;">
            <span style="color: #555;">Project:</span> <span style="color: #ccc;">${needs}</span>
          </p>
        </div>
      </div>

      <p style="color: #888; font-size: 14px; line-height: 1.6; margin: 32px 0 0 0;">
        Talk soon,<br />
        <span style="color: #ccc;">The Harmon Digital Team</span>
      </p>
    `

    // Send notification email to Harmon Digital
    await resend.emails.send({
      from: 'Harmon Digital <notifications@notifications.harmon-digital.com>',
      to: ['info@harmon-digital.com'],
      subject: `New Lead: ${company} - ${name}`,
      html: emailWrapper(internalEmailContent),
    })

    // Send confirmation email to the user
    await resend.emails.send({
      from: 'Harmon Digital <hello@notifications.harmon-digital.com>',
      to: [email],
      replyTo: 'info@harmon-digital.com',
      subject: `Thanks for reaching out, ${firstName}!`,
      html: emailWrapper(userEmailContent),
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
