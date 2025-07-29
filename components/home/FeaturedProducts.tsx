'use client'

import { motion } from 'framer-motion'
import { useProducts } from '@/hooks/useProducts'
import { useTranslation } from '@/lib/i18n/useTranslation'
import { ProductCard } from '@/components/products/ProductCard'
import { SkeletonLoader } from '@/components/shared/SkeletonLoader'

export function FeaturedProducts() {
  const { t } = useTranslation()
  const { data: products, isLoading, error } = useProducts()

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">{t('products.title')}</h2>
            <p className="body-text max-w-2xl mx-auto">{t('products.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonLoader key={index} className="h-96" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="container-custom text-center">
          <h2 className="heading-2 mb-4">{t('products.title')}</h2>
          <p className="text-red-600">{t('common.error')}</p>
        </div>
      </section>
    )
  }

  const featuredProducts = products?.slice(0, 6) || []

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="heading-2 mb-4">{t('products.title')}</h2>
          <p className="body-text max-w-2xl mx-auto">{t('products.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}