'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useSubscriptionStore } from '@/store/useSubscriptionStore'
import { useTranslation } from '@/lib/i18n/useTranslation'
import { formatPrice } from '@/lib/utils'

const frequencies = [
  {
    id: 'weekly' as const,
    icon: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
    discount: 0.15,
    description: 'Perfect for Mexican food enthusiasts who cook daily'
  },
  {
    id: 'biweekly' as const,
    icon: 'https://images.pexels.com/photos/273230/pexels-photo-273230.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
    discount: 0.10,
    description: 'Most popular choice for regular Mexican cooking'
  },
  {
    id: 'monthly' as const,
    icon: 'https://images.pexels.com/photos/273238/pexels-photo-273238.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
    discount: 0.05,
    description: 'Great for occasional Mexican food preparation'
  }
]

export function FrequencySelector() {
  const { t } = useTranslation()
  const { frequency, setFrequency, totalPrice, items } = useSubscriptionStore()

  const calculateDiscountedPrice = (freq: typeof frequency) => {
    const freqData = frequencies.find(f => f.id === freq)
    if (!freqData) return totalPrice
    return totalPrice * (1 - freqData.discount)
  }

  return (
    <div>
      <h2 className="heading-2 text-center mb-4">{t('subscription.step3')}</h2>
      <p className="text-center text-gray-600 mb-8">
        Choose how often you'd like to receive your Mexican food package. ¡Save more with frequent deliveries!
      </p>

      {/* Selected Products Summary */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h3 className="font-semibold text-brand-secondary mb-4">Your Package Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Selected products:</span>
            <span>{items.length} items</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Base price:</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {frequencies.map((freq, index) => {
          const discountedPrice = calculateDiscountedPrice(freq.id)
          const savings = totalPrice - discountedPrice
          
          return (
            <motion.button
              key={freq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setFrequency(freq.id)}
              className={`p-6 rounded-xl border-2 transition-all duration-200 hover:shadow-lg relative ${
                frequency === freq.id
                  ? 'border-brand-primary bg-brand-primary/5 shadow-lg scale-105'
                  : 'border-gray-200 hover:border-brand-primary/50'
              }`}
            >
              {freq.discount > 0.1 && (
                <div className="absolute -top-3 -right-3 bg-brand-accent text-white text-sm font-bold px-3 py-1 rounded-full">
                  POPULAR
                </div>
              )}
              
              <div className="mb-4">
                <Image
                  src={freq.icon}
                  alt={freq.id}
                  width={64}
                  height={64}
                  className="mx-auto rounded-lg object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-brand-secondary mb-2">
                {t(`subscription.frequency.${freq.id}`)}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{freq.description}</p>
              
              <div className="space-y-2">
                <div className="text-2xl font-bold text-brand-primary">
                  {formatPrice(discountedPrice)}
                </div>
                {savings > 0 && (
                  <div className="text-sm text-green-600 font-medium">
                    Save {formatPrice(savings)} ({Math.round(freq.discount * 100)}% off)
                  </div>
                )}
              </div>
            </motion.button>
          )
        })}
      </div>

      {frequency && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-8 p-6 bg-green-50 rounded-lg"
        >
          <h3 className="font-semibold text-green-800 mb-2">Perfect Choice!</h3>
          <p className="text-green-700">
            You'll receive your customized Mexican food package every {t(`subscription.frequency.${frequency}`).toLowerCase()}.
            <br />
            <strong>Total: {formatPrice(calculateDiscountedPrice(frequency))}</strong>
          </p>
        </motion.div>
      )}
    </div>
  )
}