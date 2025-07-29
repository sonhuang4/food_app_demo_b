export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: 'food' | 'litter'
  petType: 'cat' | 'dog' | 'both'
  weight?: string
  brand: string
  inStock: boolean
  rating: number
  reviewCount: number
}

export interface ProductFilter {
  category?: 'food' | 'litter'
  petType?: 'cat' | 'dog' | 'both'
  priceRange?: [number, number]
}