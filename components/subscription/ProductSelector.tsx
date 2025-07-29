'use client'

import { motion } from 'framer-motion'
import { useProducts } from '@/hooks/useProducts'
import { useSubscriptionStore } from '@/store/useSubscriptionStore'
import { useTranslation } from '@/lib/i18n/useTranslation'
import { ProductCard } from '@/components/products/ProductCard'
import { ProductCardSkeleton } from '@/components/shared/SkeletonLoader'

export function ProductSelector() {
  const { t } = useTranslation()
  const { petType, items } = useSubscriptionStore()
  
  const { data: products, isLoading, error } = useProducts({
    petType: petType || undefined
  })

  if (isLoading) {
    return (
      <div>
        <h2 className="heading-2 text-center mb-8">{t('subscription.step2')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center">
        <h2 className="heading-2 mb-4">{t('subscription.step2')}</h2>
        <p className="text-red-600">{t('common.error')}</p>
      </div>
    )
  }

  const availableProducts = products?.filter(p => p.inStock) || []

  return (
    <div>
      <h2 className="heading-2 text-center mb-4">{t('subscription.step2')}</h2>
      <p className="text-center text-gray-600 mb-8">
        Choose from our premium selection of products. You can always modify your selection later.
      </p>

      {items.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-brand-primary/10 rounded-lg p-4 mb-8"
        >
          <p className="text-brand-secondary font-medium text-center">
            {items.length} {items.length === 1 ? 'product' : 'products'} selected for your box
          </p>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ProductCard product={product} showAddToBox />
          </motion.div>
        ))}
      </div>

      {availableProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">
            No products available for the selected pet type. Please go back and select a different pet type.
          </p>
        </div>
      )}
    </div>
  )
}