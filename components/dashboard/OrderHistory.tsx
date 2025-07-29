'use client'

import { useTranslation } from '@/lib/i18n/useTranslation'
import { SubscriptionOrder } from '@/types/subscription'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { SkeletonLoader } from '@/components/shared/SkeletonLoader'
import { formatPrice, formatDate } from '@/lib/utils'

interface OrderHistoryProps {
  orders: SubscriptionOrder[] | undefined
  isLoading: boolean
}

const statusStyles = {
  pending: 'bg-yellow-100 text-yellow-800',
  shipped: 'bg-blue-100 text-blue-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
}

export function OrderHistory({ orders, isLoading }: OrderHistoryProps) {
  const { t } = useTranslation()

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t('dashboard.orderHistory')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonLoader key={i} className="h-20" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('dashboard.orderHistory')}</CardTitle>
      </CardHeader>
      <CardContent>
        {orders && orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold">Order #{order.id}</h4>
                    <p className="text-sm text-gray-600">
                      Delivered on {formatDate(order.deliveryDate)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3 mt-2 md:mt-0">
                    <span className={`px-2 py-1 rounded-full text-sm ${statusStyles[order.status]}`}>
                      {order.status}
                    </span>
                    <span className="font-bold">{formatPrice(order.totalPrice)}</span>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div className="text-sm text-gray-600">
                    <p>{order.items.length} items</p>
                    {order.trackingNumber && (
                      <p>Tracking: {order.trackingNumber}</p>
                    )}
                  </div>
                  
                  <div className="flex space-x-2 mt-2 md:mt-0">
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                    {order.status === 'delivered' && (
                      <Button size="sm" variant="outline">
                        Reorder
                      </Button>
                    )}
                    {order.trackingNumber && order.status === 'shipped' && (
                      <Button size="sm" variant="outline">
                        Track Package
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No orders yet.</p>
            <p className="text-sm text-gray-500">
              Your order history will appear here once you start receiving deliveries.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}