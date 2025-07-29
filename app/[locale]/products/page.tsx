'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useProducts } from '@/hooks/useProducts'
import { useTranslation } from '@/lib/i18n/useTranslation'
import { ProductCard } from '@/components/products/ProductCard'
import { ProductFilters } from '@/components/products/ProductFilters'
import { ProductCardSkeleton } from '@/components/shared/SkeletonLoader'
import { ProductFilter } from '@/types/product'

export default function ProductsPage() {
  const { t } = useTranslation()
  const [filters, setFilters] = useState<ProductFilter>({})
  const { data: products, isLoading, error } = useProducts(filters)

  if (error) {
    return (
      <div className="container-custom py-20 text-center">
        <h1 className="heading-2 mb-4">{t('common.error')}</h1>
        <p className="body-text">{t('common.retry')}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-background">
      <div className="container-custom py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="heading-1 mb-4">{t('products.title')}</h1>
          <p className="body-text max-w-2xl mx-auto">{t('products.subtitle')}</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <ProductFilters filters={filters} onFiltersChange={setFilters} />
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 9 }).map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))}
              </div>
            ) : products && products.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-20">
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No products found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your filters to see more results.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}