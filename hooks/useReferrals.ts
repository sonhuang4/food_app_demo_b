import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Referral } from '@/types/referral'
import { ApiResponse } from '@/types/api'

async function fetchReferral(): Promise<Referral> {
  const response = await fetch('/api/referrals')
  const data: ApiResponse<Referral> = await response.json()
  
  if (!data.success) {
    throw new Error(data.message || 'Failed to fetch referral data')
  }
  
  return data.data
}

async function generateReferralCode(): Promise<string> {
  const response = await fetch('/api/referrals', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'generate_code' }),
  })
  
  const data: ApiResponse<{ code: string }> = await response.json()
  
  if (!data.success) {
    throw new Error(data.message || 'Failed to generate referral code')
  }
  
  return data.data.code
}

export function useReferral() {
  return useQuery({
    queryKey: ['referral'],
    queryFn: fetchReferral,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export function useGenerateReferralCode() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: generateReferralCode,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['referral'] })
    },
  })
}