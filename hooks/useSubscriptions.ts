import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Subscription, SubscriptionOrder } from '@/types/subscription'
import { ApiResponse } from '@/types/api'

async function fetchSubscription(): Promise<Subscription> {
  const response = await fetch('/api/subscriptions')
  const data: ApiResponse<Subscription> = await response.json()
  
  if (!data.success) {
    throw new Error(data.message || 'Failed to fetch subscription')
  }
  
  return data.data
}

async function fetchSubscriptionOrders(): Promise<SubscriptionOrder[]> {
  const response = await fetch('/api/subscriptions?type=orders')
  const data: ApiResponse<SubscriptionOrder[]> = await response.json()
  
  if (!data.success) {
    throw new Error(data.message || 'Failed to fetch orders')
  }
  
  return data.data
}

async function createSubscription(subscriptionData: any): Promise<Subscription> {
  const response = await fetch('/api/subscriptions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(subscriptionData),
  })
  
  const data: ApiResponse<Subscription> = await response.json()
  
  if (!data.success) {
    throw new Error(data.message || 'Failed to create subscription')
  }
  
  return data.data
}

async function updateSubscription(updates: Partial<Subscription>): Promise<Subscription> {
  const response = await fetch('/api/subscriptions', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  })
  
  const data: ApiResponse<Subscription> = await response.json()
  
  if (!data.success) {
    throw new Error(data.message || 'Failed to update subscription')
  }
  
  return data.data
}

export function useSubscription() {
  return useQuery({
    queryKey: ['subscription'],
    queryFn: fetchSubscription,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export function useSubscriptionOrders() {
  return useQuery({
    queryKey: ['subscription-orders'],
    queryFn: fetchSubscriptionOrders,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export function useCreateSubscription() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: createSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscription'] })
    },
  })
}

export function useUpdateSubscription() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: updateSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subscription'] })
    },
  })
}