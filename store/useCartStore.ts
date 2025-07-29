import { create } from 'zustand'

interface CartItem {
  productId: string
  quantity: number
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
  
  addItem: (productId: string, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  getTotalItems: () => number
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,
  
  addItem: (productId, quantity = 1) => {
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
  },
  
  removeItem: (productId) => {
    set({
      items: get().items.filter(item => item.productId !== productId)
    })
  },
  
  updateQuantity: (productId, quantity) => {
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
  },
  
  clearCart: () => set({ items: [] }),
  
  toggleCart: () => set(state => ({ isOpen: !state.isOpen })),
  
  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0)
  }
}))