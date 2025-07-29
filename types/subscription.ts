export interface SubscriptionItem {
  productId: string
  quantity: number
}

export interface Subscription {
  id: string
  userId: string
  items: SubscriptionItem[]
  frequency: 'weekly' | 'biweekly' | 'monthly'
  petType: 'cat' | 'dog' | 'both'
  status: 'active' | 'paused' | 'cancelled'
  nextDelivery: string
  totalPrice: number
  createdAt: string
}

export interface SubscriptionOrder {
  id: string
  subscriptionId: string
  items: SubscriptionItem[]
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled'
  deliveryDate: string
  totalPrice: number
  trackingNumber?: string
}