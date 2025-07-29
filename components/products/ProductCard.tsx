'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Product } from '@/types/product'
import { useTranslation } from '@/lib/i18n/useTranslation'
import { useCartStore } from '@/store/useCartStore'
import { useSubscriptionStore } from '@/store/useSubscriptionStore'
import { Button } from '@/components/ui/Button'
import { formatPrice } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  showAddToBox?: boolean
}

export function ProductCard({ product, showAddToBox = false }: ProductCardProps) {
  const { t, locale } = useTranslation()
  const addToCart = useCartStore(state => state.addItem)
  const addToSubscription = useSubscriptionStore(state => state.addItem)

  const handleAddToCart = () => {
    addToCart(product.id)
  }

  const handleAddToBox = () => {
    addToSubscription(product.id, 1)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group"
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-medium">Out of Stock</span>
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-xs text-gray-500">({product.reviewCount})</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-2">
          <span className="text-sm text-brand-primary font-medium">{product.brand}</span>
          <div className="flex items-center space-x-2 mt-1">
            <span className={`text-xs px-2 py-1 rounded-full ${
              product.category === 'food' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-blue-100 text-blue-800'
            }`}>
              {product.category === 'food' ? t('products.filterFood') : t('products.filterLitter')}
            </span>
            <span className="text-xs text-gray-500">{product.weight}</span>
          </div>
        </div>

        <h3 className="font-serif text-lg font-semibold text-brand-secondary mb-2 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="font-bold text-xl text-brand-secondary">
            {formatPrice(product.price)}
          </span>
          
          <div className="flex space-x-2">
            <Link href={`/${locale}/products/${product.id}`}>
              <Button variant="outline" size="sm">
                {t('products.viewDetails')}
              </Button>
            </Link>
            
            {showAddToBox ? (
              <Button 
                size="sm" 
                onClick={handleAddToBox}
                disabled={!product.inStock}
              >
                {t('products.addToBox')}
              </Button>
            ) : (
              <Button 
                size="sm" 
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                Add to Cart
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}