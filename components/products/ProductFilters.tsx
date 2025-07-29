'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useTranslation } from '@/lib/i18n/useTranslation'
import { ProductFilter } from '@/types/product'

interface ProductFiltersProps {
  filters: ProductFilter
  onFiltersChange: (filters: ProductFilter) => void
}

export function ProductFilters({ filters, onFiltersChange }: ProductFiltersProps) {
  const { t } = useTranslation()

  const handleCategoryChange = (category: 'food' | 'litter' | undefined) => {
    onFiltersChange({ ...filters, category })
  }

  const handlePetTypeChange = (petType: 'cat' | 'dog' | 'both' | undefined) => {
    onFiltersChange({ ...filters, petType })
  }

  const clearFilters = () => {
    onFiltersChange({})
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Category Filter */}
        <div>
          <h3 className="font-semibold mb-3">Category</h3>
          <div className="space-y-2">
            <button
              onClick={() => handleCategoryChange(undefined)}
              className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                !filters.category 
                  ? 'bg-brand-primary text-white' 
                  : 'hover:bg-gray-100'
              }`}
            >
              {t('products.filterAll')}
            </button>
            <button
              onClick={() => handleCategoryChange('food')}
              className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                filters.category === 'food' 
                  ? 'bg-brand-primary text-white' 
                  : 'hover:bg-gray-100'
              }`}
            >
              {t('products.filterFood')}
            </button>
            <button
              onClick={() => handleCategoryChange('litter')}
              className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                filters.category === 'litter' 
                  ? 'bg-brand-primary text-white' 
                  : 'hover:bg-gray-100'
              }`}
            >
              {t('products.filterLitter')}
            </button>
          </div>
        </div>

        {/* Pet Type Filter */}
        <div>
          <h3 className="font-semibold mb-3">Pet Type</h3>
          <div className="space-y-2">
            <button
              onClick={() => handlePetTypeChange(undefined)}
              className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                !filters.petType 
                  ? 'bg-brand-primary text-white' 
                  : 'hover:bg-gray-100'
              }`}
            >
              All Pets
            </button>
            <button
              onClick={() => handlePetTypeChange('cat')}
              className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                filters.petType === 'cat' 
                  ? 'bg-brand-primary text-white' 
                  : 'hover:bg-gray-100'
              }`}
            >
              {t('subscription.petTypes.cat')}
            </button>
            <button
              onClick={() => handlePetTypeChange('dog')}
              className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                filters.petType === 'dog' 
                  ? 'bg-brand-primary text-white' 
                  : 'hover:bg-gray-100'
              }`}
            >
              {t('subscription.petTypes.dog')}
            </button>
          </div>
        </div>

        {/* Clear Filters */}
        <Button 
          variant="outline" 
          onClick={clearFilters}
          className="w-full"
        >
          Clear Filters
        </Button>
      </CardContent>
    </Card>
  )
}