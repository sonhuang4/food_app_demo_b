'use client'

import { motion } from 'framer-motion'
import { useSubscription, useSubscriptionOrders } from '@/hooks/useSubscriptions'
import { useTranslation } from '@/lib/i18n/useTranslation'
import { DashboardCard } from '@/components/dashboard/DashboardCard'
import { SubscriptionManager } from '@/components/dashboard/SubscriptionManager'
import { OrderHistory } from '@/components/dashboard/OrderHistory'
import { SkeletonLoader } from '@/components/shared/SkeletonLoader'

export default function DashboardPage() {
  const { t } = useTranslation()
  const { data: subscription, isLoading: subscriptionLoading } = useSubscription()
  const { data: orders, isLoading: ordersLoading } = useSubscriptionOrders()

  if (subscriptionLoading) {
    return (
      <div className="container-custom py-12">
        <div className="space-y-8">
          <div className="text-center">
            <SkeletonLoader className="h-8 w-48 mx-auto mb-4" />
            <SkeletonLoader className="h-4 w-64 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonLoader key={i} className="h-32" />
            ))}
          </div>
        </div>
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
          <h1 className="heading-1 mb-4">{t('dashboard.title')}</h1>
          <p className="body-text max-w-2xl mx-auto">
            Manage your subscription, view order history, and update your preferences.
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* Quick Stats */}
          {subscription && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <DashboardCard
                title={t('dashboard.nextDelivery')}
                value={new Date(subscription.nextDelivery).toLocaleDateString()}
                icon="https://images.pexels.com/photos/4246210/pexels-photo-4246210.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop"
                color="blue"
                iconIsUrl={true}
              />
              <DashboardCard
                title="Active Items"
                value={`${subscription.items.length} products`}
                icon="https://images.pexels.com/photos/4246208/pexels-photo-4246208.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop"
                color="green"
                iconIsUrl={true}
              />
              <DashboardCard
                title="Subscription Status"
                value={subscription.status}
                icon="https://images.pexels.com/photos/4246209/pexels-photo-4246209.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop"
                color="purple"
                iconIsUrl={true}
              />
            </motion.div>
          )}

          {/* Subscription Manager */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SubscriptionManager subscription={subscription} />
          </motion.div>

          {/* Order History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <OrderHistory orders={orders} isLoading={ordersLoading} />
          </motion.div>
        </div>
      </div>
    </div>
  )
}