import { create } from 'zustand'
import { SubscriptionItem } from '@/types/subscription'

interface SubscriptionState {
  petType: 'cat' | 'dog' | 'both' | null
  frequency: 'weekly' | 'biweekly' | 'monthly'
  items: SubscriptionItem[]
  currentStep: number
  totalPrice: number
  
  setPetType: (petType: 'cat' | 'dog' | 'both') => void
  setFrequency: (frequency: 'weekly' | 'biweekly' | 'monthly') => void
  addItem: (productId: string, quantity: number) => void
  removeItem: (productId: string) => void
  updateItemQuantity: (productId: string, quantity: number) => void
  setCurrentStep: (step: number) => void
  calculateTotal: () => void
  reset: () => void
}

export const useSubscriptionStore = create<SubscriptionState>((set, get) => ({
  petType: null,
  frequency: 'monthly',
  items: [],
  currentStep: 1,
  totalPrice: 0,

  setPetType: (petType) => set({ petType }),
  
  setFrequency: (frequency) => set({ frequency }),
  
  addItem: (productId, quantity) => {
    const { items } = get()
    const existingItem = items.find(item => item.productId === productId)
    
    if (existingItem) {
      set({
        items: items.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      })
    } else {
      set({ items: [...items, { productId, quantity }] })
    }
    
    get().calculateTotal()
  },
  
  removeItem: (productId) => {
    set({
      items: get().items.filter(item => item.productId !== productId)
    })
    get().calculateTotal()
  },
  
  updateItemQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId)
      return
    }
    
    set({
      items: get().items.map(item =>
        item.productId === productId
          ? { ...item, quantity }
          : item
      )
    })
    get().calculateTotal()
  },
  
  setCurrentStep: (step) => set({ currentStep: step }),
  
  calculateTotal: () => {
    // This would normally fetch product prices from API
    // For now, using mock calculation
    const mockPrices: Record<string, number> = {
      '1': 24.99,
      '2': 18.99,
      '3': 32.99,
      '4': 28.99,
      '5': 22.99,
      '6': 35.99
    }
    
    const total = get().items.reduce((sum, item) => {
      const price = mockPrices[item.productId] || 0
      return sum + (price * item.quantity)
    }, 0)
    
    set({ totalPrice: total })
  },
  
  reset: () => set({
    petType: null,
    frequency: 'monthly',
    items: [],
    currentStep: 1,
    totalPrice: 0
  })
}))