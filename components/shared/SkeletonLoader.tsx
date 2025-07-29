'use client'

import { cn } from '@/lib/utils'

interface SkeletonLoaderProps {
  className?: string
}

export function SkeletonLoader({ className }: SkeletonLoaderProps) {
  return (
    <div className={cn('animate-pulse', className)}>
      <div className="bg-gray-200 rounded-lg w-full h-full"></div>
    </div>
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="aspect-square bg-gray-200 animate-pulse"></div>
      <div className="p-6 space-y-3">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4"></div>
        <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
        <div className="flex justify-between items-center pt-2">
          <div className="h-6 bg-gray-200 rounded animate-pulse w-1/4"></div>
          <div className="flex space-x-2">
            <div className="h-8 bg-gray-200 rounded animate-pulse w-20"></div>
            <div className="h-8 bg-gray-200 rounded animate-pulse w-16"></div>
          </div>
        </div>
      </div>
    </div>
  )
}