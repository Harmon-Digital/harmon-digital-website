import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

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

    return NextResponse.json({ success: true, id: data.id })
  } catch (error) {
    console.error('Error saving lead:', error)
    return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 })
  }
}
