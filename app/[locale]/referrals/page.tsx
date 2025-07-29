'use client'

import { motion } from 'framer-motion'
import { useReferral } from '@/hooks/useReferrals'
import { useTranslation } from '@/lib/i18n/useTranslation'
import { ReferralInfo } from '@/components/referrals/ReferralInfo'
import { ReferralStats } from '@/components/referrals/ReferralStats'
import { InviteForm } from '@/components/referrals/InviteForm'
import { SkeletonLoader } from '@/components/shared/SkeletonLoader'

export default function ReferralsPage() {
  const { t } = useTranslation()
  const { data: referralData, isLoading, error } = useReferral()

  if (isLoading) {
    return (
      <div className="container-custom py-12">
        <div className="space-y-8">
          <div className="text-center">
            <SkeletonLoader className="h-8 w-64 mx-auto mb-4" />
            <SkeletonLoader className="h-4 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <SkeletonLoader className="h-64" />
            <SkeletonLoader className="h-64" />
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container-custom py-20 text-center">
        <h1 className="heading-2 mb-4">{t('common.error')}</h1>
        <p className="body-text">{t('common.retry')}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-background">
      <div className="container-custom py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="heading-1 mb-4">{t('referrals.title')}</h1>
          <p className="body-text max-w-2xl mx-auto">{t('referrals.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Referral Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <ReferralInfo referralData={referralData} />
          </motion.div>

          {/* Referral Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ReferralStats referralData={referralData} />
          </motion.div>
        </div>

        {/* Invite Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <InviteForm referralCode={referralData?.code} />
        </motion.div>
      </div>
    </div>
  )
}