import { useQuery } from '@tanstack/react-query'
import { Product, ProductFilter } from '@/types/product'
import { ApiResponse } from '@/types/api'

async function fetchProducts(filters?: ProductFilter): Promise<Product[]> {
  const params = new URLSearchParams()
  
  if (filters?.category) params.append('category', filters.category)
  if (filters?.petType) params.append('petType', filters.petType)
  
  const response = await fetch(`/api/products?${params.toString()}`)
  const data: ApiResponse<Product[]> = await response.json()
  
  if (!data.success) {
    throw new Error(data.message || 'Failed to fetch products')
  }
  
  return data.data
}

async function fetchProduct(id: string): Promise<Product> {
  const response = await fetch(`/api/products?id=${id}`)
  const data: ApiResponse<Product> = await response.json()
  
  if (!data.success) {
    throw new Error(data.message || 'Failed to fetch product')
  }
  
  return data.data
}

export function useProducts(filters?: ProductFilter) {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => fetchProducts(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}