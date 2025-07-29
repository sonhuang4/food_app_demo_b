import { NextRequest, NextResponse } from 'next/server'
import { Subscription, SubscriptionOrder } from '@/types/subscription'

const mockSubscription: Subscription = {
  id: 'sub_123',
  userId: 'user_456',
  items: [
    { productId: '1', quantity: 2 },
    { productId: '2', quantity: 1 }
  ],
  frequency: 'monthly',
  petType: 'cat',
  status: 'active',
  nextDelivery: '2024-02-15',
  totalPrice: 68.97,
  createdAt: '2024-01-01'
}

const mockOrders: SubscriptionOrder[] = [
  {
    id: 'order_001',
    subscriptionId: 'sub_123',
    items: [
      { productId: '1', quantity: 2 },
      { productId: '2', quantity: 1 }
    ],
    status: 'delivered',
    deliveryDate: '2024-01-15',
    totalPrice: 68.97,
    trackingNumber: 'TRK123456789'
  },
  {
    id: 'order_002',
    subscriptionId: 'sub_123',
    items: [
      { productId: '1', quantity: 2 },
      { productId: '2', quantity: 1 }
    ],
    status: 'shipped',
    deliveryDate: '2024-02-15',
    totalPrice: 68.97,
    trackingNumber: 'TRK987654321'
  }
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')

  if (type === 'orders') {
    return NextResponse.json({ 
      data: mockOrders, 
      success: true 
    })
  }

  return NextResponse.json({ 
    data: mockSubscription, 
    success: true 
  })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  
  // Mock creating a subscription
  const newSubscription: Subscription = {
    id: `sub_${Date.now()}`,
    userId: 'user_456',
    items: body.items,
    frequency: body.frequency,
    petType: body.petType,
    status: 'active',
    nextDelivery: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    totalPrice: body.totalPrice,
    createdAt: new Date().toISOString().split('T')[0]
  }

  return NextResponse.json({ 
    data: newSubscription, 
    success: true,
    message: 'Subscription created successfully'
  })
}

export async function PATCH(request: NextRequest) {
  const body = await request.json()
  
  // Mock updating subscription
  const updatedSubscription = {
    ...mockSubscription,
    ...body
  }

  return NextResponse.json({ 
    data: updatedSubscription, 
    success: true,
    message: 'Subscription updated successfully'
  })
}