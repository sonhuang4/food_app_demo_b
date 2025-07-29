'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useSubscriptionStore } from '@/store/useSubscriptionStore'
import { useTranslation } from '@/lib/i18n/useTranslation'

const petTypes = [
  {
    id: 'cat' as const,
    icon: 'https://images.pexels.com/photos/7625055/pexels-photo-7625055.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    name: 'Mild & Traditional',
    description: 'Perfect for those who enjoy classic Mexican flavors'
  },
  {
    id: 'dog' as const,
    icon: 'https://images.pexels.com/photos/9986228/pexels-photo-9986228.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    name: 'Spicy & Bold',
    description: 'Great for adventurous spice lovers'
  },
  {
    id: 'both' as const,
    icon: 'https://images.pexels.com/photos/5840080/pexels-photo-5840080.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    name: 'Variety Explorer',
    description: 'For those who want to try everything Mexican cuisine offers'
  }
]

export function PetSelector() {
  const { t } = useTranslation()
  const { petType, setPetType } = useSubscriptionStore()

  return (
    <div>
      <h2 className="heading-2 text-center mb-8">{t('subscription.step1')}</h2>
      <p className="text-center text-gray-600 mb-8">
        Tell us about your flavor preferences so we can customize the perfect Mexican food experience.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {petTypes.map((pet, index) => (
          <motion.button
            key={pet.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => setPetType(pet.id)}
            className={`p-8 rounded-xl border-2 transition-all duration-200 hover:shadow-lg ${
              petType === pet.id
                ? 'border-brand-primary bg-brand-primary/5 shadow-lg scale-105'
                : 'border-gray-200 hover:border-brand-primary/50'
            }`}
          >
            <div className="mb-4">
              <Image
                src={pet.icon}
                alt={pet.name}
                width={80}
                height={80}
                className="mx-auto rounded-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-brand-secondary mb-2">
              {t(`subscription.petTypes.${pet.id}`) || pet.name}
            </h3>
            <p className="text-gray-600">{pet.description}</p>
          </motion.button>
        ))}
      </div>

      {petType && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-8 p-4 bg-green-50 rounded-lg"
        >
          <p className="text-green-700 font-medium">
            ¡Excelente elección! We'll customize your package for {t(`subscription.petTypes.${petType}`).toLowerCase()} preferences.
          </p>
        </motion.div>
      )}
    </div>
  )
}