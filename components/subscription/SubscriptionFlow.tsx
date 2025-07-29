'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useSubscriptionStore } from '@/store/useSubscriptionStore'
import { useTranslation } from '@/lib/i18n/useTranslation'
import { PetSelector } from './PetSelector'
import { ProductSelector } from './ProductSelector'
import { FrequencySelector } from './FrequencySelector'
import { Button } from '@/components/ui/Button'
import { useRouter } from 'next/navigation'
import { useCreateSubscription } from '@/hooks/useSubscriptions'
import { formatPrice } from '@/lib/utils'

const steps = [
  { id: 1, titleKey: 'subscription.step1' },
  { id: 2, titleKey: 'subscription.step2' },
  { id: 3, titleKey: 'subscription.step3' },
]

export function SubscriptionFlow() {
  const { t, locale } = useTranslation()
  const router = useRouter()
  const createSubscription = useCreateSubscription()
  
  const {
    currentStep,
    petType,
    items,
    frequency,
    totalPrice,
    setCurrentStep,
    reset
  } = useSubscriptionStore()

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = async () => {
    if (!petType || items.length === 0) return

    try {
      await createSubscription.mutateAsync({
        petType,
        items,
        frequency,
        totalPrice
      })

      reset()
      router.push(`/${locale}/dashboard`)
    } catch (error) {
      console.error('Failed to create subscription:', error)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return petType !== null
      case 2:
        return items.length > 0
      case 3:
        return true
      default:
        return false
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step.id <= currentStep
                    ? 'bg-brand-primary text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step.id}
              </div>
              <span className={`ml-3 font-medium ${
                step.id <= currentStep ? 'text-brand-primary' : 'text-gray-600'
              }`}>
                {t(step.titleKey)}
              </span>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-6 ${
                  step.id < currentStep ? 'bg-brand-primary' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          {currentStep === 1 && <PetSelector />}
          {currentStep === 2 && <ProductSelector />}
          {currentStep === 3 && <FrequencySelector />}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 1}
        >
          {t('common.back')}
        </Button>

        <div className="text-center">
          {totalPrice > 0 && (
            <div className="text-lg font-semibold text-brand-secondary">
              Total: {formatPrice(totalPrice)}/{frequency}
            </div>
          )}
        </div>

        {currentStep < 3 ? (
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
          >
            {t('common.next')}
          </Button>
        ) : (
          <Button
            onClick={handleComplete}
            disabled={!canProceed() || createSubscription.isPending}
            loading={createSubscription.isPending}
          >
            Complete Subscription
          </Button>
        )}
      </div>
    </div>
  )
}