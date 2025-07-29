'use client'

import { motion } from 'framer-motion'
import { Product } from '@/types/product'
import { ProductCard } from './ProductCard'

interface ProductGridProps {
  products: Product[]
  showAddToBox?: boolean
}

export function ProductGrid({ products, showAddToBox = false }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <ProductCard product={product} showAddToBox={showAddToBox} />
        </motion.div>
      ))}
    </div>
  )
}