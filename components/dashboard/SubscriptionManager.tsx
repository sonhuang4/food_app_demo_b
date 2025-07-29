'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from '@/lib/i18n/useTranslation'
import { useUpdateSubscription } from '@/hooks/useSubscriptions'
import { Subscription } from '@/types/subscription'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { formatPrice, formatDate } from '@/lib/utils'

interface SubscriptionManagerProps {
  subscription: Subscription | undefined
}

export function SubscriptionManager({ subscription }: SubscriptionManagerProps) {
  const { t } = useTranslation()
  const updateSubscription = useUpdateSubscription()
  const [isModifying, setIsModifying] = useState(false)

  if (!subscription) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t('dashboard.manageSubscription')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">You don't have an active subscription yet.</p>
            <Button>Start Your Subscription</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const handleStatusToggle = async () => {
    try {
      const newStatus = subscription.status === 'active' ? 'paused' : 'active'
      await updateSubscription.mutateAsync({ status: newStatus })
    } catch (error) {
      console.error('Failed to update subscription:', error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('dashboard.manageSubscription')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Subscription Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-medium">Pet Type:</span>
              <span className="capitalize">{subscription.petType}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Frequency:</span>
              <span className="capitalize">{subscription.frequency}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Status:</span>
              <span className={`px-2 py-1 rounded-full text-sm ${
                subscription.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {subscription.status}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Next Delivery:</span>
              <span>{formatDate(subscription.nextDelivery)}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-medium">Total Items:</span>
              <span>{subscription.items.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Total Price:</span>
              <span className="font-bold text-lg">{formatPrice(subscription.totalPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Member Since:</span>
              <span>{formatDate(subscription.createdAt)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 pt-4 border-t">
          <Button
            onClick={handleStatusToggle}
            variant={subscription.status === 'active' ? 'outline' : 'primary'}
            loading={updateSubscription.isPending}
          >
            {subscription.status === 'active' ? t('dashboard.pause') : t('dashboard.resume')}
          </Button>
          
          <Button variant="outline" onClick={() => setIsModifying(!isModifying)}>
            Modify Products
          </Button>
          
          <Button variant="outline">
            Change Frequency
          </Button>
          
          <Button variant="outline">
            Update Delivery Date
          </Button>
        </div>

        {/* Products List */}
        {isModifying && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t pt-6"
          >
            <h4 className="font-semibold mb-4">Current Products</h4>
            <div className="space-y-3">
              {subscription.items.map((item) => (
                <div key={item.productId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <span className="font-medium">Product ID: {item.productId}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span>Quantity: {item.quantity}</span>
                    <Button size="sm" variant="outline">
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button className="mt-4" variant="outline">
              Add More Products
            </Button>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}