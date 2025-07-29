import { NextRequest, NextResponse } from 'next/server'
import { Referral } from '@/types/referral'

const mockReferral: Referral = {
  id: 'ref_123',
  code: 'ECOCAT20',
  userId: 'user_456',
  totalEarned: 120.00,
  totalReferred: 6,
  referredUsers: [
    {
      id: 'ref_user_1',
      email: 'friend1@email.com',
      status: 'completed',
      reward: 20.00,
      joinedAt: '2024-01-15'
    },
    {
      id: 'ref_user_2',
      email: 'friend2@email.com',
      status: 'completed',
      reward: 20.00,
      joinedAt: '2024-01-20'
    },
    {
      id: 'ref_user_3',
      email: 'friend3@email.com',
      status: 'pending',
      reward: 0.00,
      joinedAt: '2024-02-01'
    }
  ]
}

export async function GET() {
  return NextResponse.json({ 
    data: mockReferral, 
    success: true 
  })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  
  if (body.action === 'generate_code') {
    const newCode = `ECO${Math.random().toString(36).substring(2, 8).toUpperCase()}`
    
    return NextResponse.json({ 
      data: { code: newCode }, 
      success: true,
      message: 'New referral code generated'
    })
  }

  return NextResponse.json({ 
    error: 'Invalid action' 
  }, { status: 400 })
}