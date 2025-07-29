'use client'

import { motion } from 'framer-motion'
import { useTranslation } from '@/lib/i18n/useTranslation'
import { FAQSection } from '@/components/shared/FAQSection'

export default function FAQPage() {
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
          <h1 className="heading-1 mb-4">{t('faq.title')}</h1>
          <p className="body-text max-w-2xl mx-auto">
            Find answers to the most common questions about our subscription service, 
            products, and policies.
          </p>
        </motion.div>

        <FAQSection />
      </div>
    </div>
  )
}