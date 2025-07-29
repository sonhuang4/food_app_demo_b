'use client'

import { SubscriptionFlow } from '@/components/subscription/SubscriptionFlow'
import { useTranslation } from '@/lib/i18n/useTranslation'
import { motion } from 'framer-motion'

export default function BuildBoxPage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-brand-background">
      <div className="container-custom py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="heading-1 mb-4">{t('subscription.title')}</h1>
          <p className="body-text max-w-2xl mx-auto">
            Create a personalized subscription box tailored to your pet's needs. Choose your pet type, select premium products, and set your delivery frequency.
          </p>
        </motion.div>

        <SubscriptionFlow />
      </div>
    </div>
  )
}