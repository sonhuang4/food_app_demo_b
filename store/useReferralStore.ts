import { create } from 'zustand'

interface ReferralState {
  referralCode: string
  totalEarned: number
  totalReferred: number
  showConfetti: boolean
  
  setReferralCode: (code: string) => void
  updateStats: (earned: number, referred: number) => void
  triggerConfetti: () => void
  hideConfetti: () => void
}

export const useReferralStore = create<ReferralState>((set) => ({
  referralCode: 'ECOCAT20',
  totalEarned: 0,
  totalReferred: 0,
  showConfetti: false,
  
  setReferralCode: (code) => set({ referralCode: code }),
  
  updateStats: (earned, referred) => set({ 
    totalEarned: earned, 
    totalReferred: referred 
  }),
  
  triggerConfetti: () => set({ showConfetti: true }),
  
  hideConfetti: () => set({ showConfetti: false })
}))