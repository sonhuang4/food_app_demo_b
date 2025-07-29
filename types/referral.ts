export interface Referral {
  id: string
  code: string
  userId: string
  totalEarned: number
  totalReferred: number
  referredUsers: ReferredUser[]
}

export interface ReferredUser {
  id: string
  email: string
  status: 'pending' | 'completed'
  reward: number
  joinedAt: string
}