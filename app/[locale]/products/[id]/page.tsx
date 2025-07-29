'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useProduct } from '@/hooks/useProducts'
import { useTranslation } from '@/lib/i18n/useTranslation'
import { useCartStore } from '@/store/useCartStore'
import { useSubscriptionStore } from '@/store/useSubscriptionStore'
import { Button } from '@/components/ui/Button'
import { SkeletonLoader } from '@/components/shared/SkeletonLoader'
import { formatPrice } from '@/lib/utils'

export default function ProductDetailPage() {
  const params = useParams()
  const { t } = useTranslation()
  const [quantity, setQuantity] = useState(1)
  
  const productId = params.id as string
  const { data: product, isLoading, error } = useProduct(productId)
  
  const addToCart = useCartStore(state => state.addItem)
  const addToSubscription = useSubscriptionStore(state => state.addItem)

  if (isLoading) {
    return (
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <SkeletonLoader className="aspect-square rounded-xl" />
          <div className="space-y-6">
            <SkeletonLoader className="h-8 w-3/4" />
            <SkeletonLoader className="h-6 w-1/2" />
            <SkeletonLoader className="h-24 w-full" />
            <SkeletonLoader className="h-12 w-full" />
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="container-custom py-20 text-center">
        <h1 className="heading-2 mb-4">{t('common.error')}</h1>
        <p className="body-text">Product not found</p>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(product.id, quantity)
  }

  const handleAddToSubscription = () => {
    addToSubscription(product.id, quantity)
  }

  return (
    <div className="container-custom py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12"
      >
        {/* Product Image */}
        <div className="relative aspect-square rounded-xl overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-medium text-lg">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <span className="text-brand-primary font-medium">{product.brand}</span>
            <h1 className="heading-2 mt-2">{product.name}</h1>
            <div className="flex items-center space-x-4 mt-3">
              <div className="flex items-center space-x-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-sm text-gray-600 ml-2">
                  ({product.reviewCount} reviews)
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-brand-secondary">
                {formatPrice(product.price)}
              </span>
              {product.weight && (
                <span className="text-gray-600">({product.weight})</span>
              )}
            </div>
            
            <div className={`inline-block px-3 py-1 rounded-full text-sm ${
              product.category === 'food' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-blue-100 text-blue-800'
            }`}>
              {product.category === 'food' ? t('products.filterFood') : t('products.filterLitter')}
            </div>
          </div>

          <p className="body-text">{product.description}</p>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4">
            <span className="font-medium">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 hover:bg-gray-100 transition-colors"
              >
                -
              </button>
              <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 hover:bg-gray-100 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="w-full"
              size="lg"
            >
              Add to Cart - {formatPrice(product.price * quantity)}
            </Button>
            
            <Button
              onClick={handleAddToSubscription}
              disabled={!product.inStock}
              variant="outline"
              className="w-full"
              size="lg"
            >
              {t('products.addToBox')}
            </Button>
          </div>

          {/* Product Features */}
          <div className="border-t pt-6">
            <h3 className="font-semibold mb-4">Product Features</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span className="text-gray-700">Premium quality ingredients</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span className="text-gray-700">Eco-friendly packaging</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span className="text-gray-700">Made with love and care</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span className="text-gray-700">Suitable for all life stages</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
}