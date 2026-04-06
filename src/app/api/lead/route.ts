import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

const SUPABASE_URL = process.env.SUPABASE_URL!
const EDGE_FUNCTION_SECRET = process.env.EDGE_FUNCTION_SECRET!

const lookingForLabels: Record<string, string> = {
  build: 'Build custom software or an app',
  ai: 'AI agents or AI consulting',
  automate: 'Automate existing processes',
  website: 'Website or web app',
  consulting: 'Not sure yet — just want to talk',
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      email,
      phone,
      name,
      lookingFor,
      needs,
      manualHours,
      monthlyRevenue,
      creditScore,
      status,
      lastCompletedStep,
    } = body

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Upsert to lp_submissions
    const { data, error } = await supabase
      .from('lp_submissions')
      .upsert(
        {
          email,
          phone: phone || null,
          name: name || null,
          looking_for: lookingFor || null,
          needs: needs || null,
          manual_hours: manualHours || null,
          monthly_revenue: monthlyRevenue || null,
          credit_score: creditScore || null,
          status: status || 'partial',
          last_completed_step: lastCompletedStep || 2,
        },
        { onConflict: 'email' },
      )
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 })
    }

    // On booking: send prep email + sync to CRM + trigger Retell call
    if (status === 'booked' && name && email) {
      sendPrepEmail(name, email)
      syncToCRM({ name, email, phone, lookingFor, needs, manualHours, monthlyRevenue, creditScore })
      if (phone) triggerRetellCall({ name, email, phone, lookingFor, needs, manualHours, monthlyRevenue })
    }

    // On submit (not booked yet): sync to CRM
    if (status === 'submitted' && name && email) {
      syncToCRM({ name, email, phone, lookingFor, needs, manualHours, monthlyRevenue, creditScore })
    }

    return NextResponse.json({ success: true, id: data.id })
  } catch (error) {
    console.error('Error saving lead:', error)
    return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 })
  }
}

async function triggerRetellCall(data: {
  name: string
  email: string
  phone: string
  lookingFor?: string
  needs?: string
  manualHours?: string
  monthlyRevenue?: string
}) {
  try {
    await fetch(`${SUPABASE_URL}/functions/v1/retell-call`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-edge-secret': EDGE_FUNCTION_SECRET,
      },
      body: JSON.stringify(data),
    })
  } catch (error) {
    console.error('Failed to trigger Retell call:', error)
  }
}

async function sendPrepEmail(name: string, email: string) {
  const firstName = name.split(' ')[0]

  try {
    await fetch(`${SUPABASE_URL}/functions/v1/lp-form-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-edge-secret': EDGE_FUNCTION_SECRET,
        'x-email-type': 'prep',
      },
      body: JSON.stringify({ name, email, emailType: 'prep' }),
    })
  } catch (error) {
    console.error('Failed to send prep email:', error)
  }
}

async function syncToCRM(data: {
  name: string
  email: string
  phone?: string
  lookingFor?: string
  needs?: string
  manualHours?: string
  monthlyRevenue?: string
  creditScore?: string
}) {
  const notesLines = [
    data.lookingFor ? `Looking for: ${lookingForLabels[data.lookingFor] || data.lookingFor}` : '',
    data.needs ? `Needs: ${data.needs}` : '',
    data.manualHours ? `Manual hours/week: ${data.manualHours}` : '',
    data.monthlyRevenue ? `Monthly revenue: ${data.monthlyRevenue}` : '',
    data.creditScore ? `Credit score: ${data.creditScore}` : '',
  ].filter(Boolean).join('\n')

  try {
    // Check if lead already exists in CRM by email
    const { data: existing } = await supabase
      .from('leads')
      .select('id')
      .eq('email', data.email)
      .maybeSingle()

    if (existing) {
      // Update existing lead
      await supabase
        .from('leads')
        .update({
          contact_name: data.name,
          phone: data.phone || null,
          notes: notesLines,
          status: 'new',
          last_contact: new Date().toISOString().split('T')[0],
        })
        .eq('id', existing.id)
    } else {
      // Create new lead
      await supabase.from('leads').insert({
        company_name: data.name, // Use name as company until we know better
        contact_name: data.name,
        email: data.email,
        phone: data.phone || null,
        source: 'website',
        status: 'new',
        notes: notesLines,
        next_action: 'Free AI Audit call',
        next_action_date: new Date().toISOString().split('T')[0],
        last_contact: new Date().toISOString().split('T')[0],
      })
    }
  } catch (error) {
    console.error('Failed to sync to CRM:', error)
  }
}
