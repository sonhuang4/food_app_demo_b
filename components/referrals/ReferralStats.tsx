'use client'

import { useTranslation } from '@/lib/i18n/useTranslation'
import { Referral } from '@/types/referral'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { formatPrice, formatDate } from '@/lib/utils'

interface ReferralStatsProps {
  referralData: Referral | undefined
}

export function ReferralStats({ referralData }: ReferralStatsProps) {
  const { t } = useTranslation()

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('referrals.rewards')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-brand-primary/10 rounded-lg">
            <div className="text-2xl font-bold text-brand-primary">
              {formatPrice(referralData?.totalEarned || 0)}
            </div>
            <div className="text-sm text-gray-600">{t('referrals.totalEarned')}</div>
          </div>
          
          <div className="text-center p-4 bg-brand-secondary/10 rounded-lg">
            <div className="text-2xl font-bold text-brand-secondary">
              {referralData?.totalReferred || 0}
            </div>
            <div className="text-sm text-gray-600">Friends Referred</div>
          </div>
        </div>

        {/* Referred Users */}
        <div>
          <h4 className="font-semibold mb-4">Recent Referrals</h4>
          {referralData?.referredUsers && referralData.referredUsers.length > 0 ? (
            <div className="space-y-3">
              {referralData.referredUsers.slice(0, 5).map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-sm">{user.email}</div>
                    <div className="text-xs text-gray-600">
                      Joined {formatDate(user.joinedAt)}
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {user.status}
                    </span>
                    {user.reward > 0 && (
                      <span className="font-medium text-brand-primary">
                        {formatPrice(user.reward)}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-600 mb-2">No referrals yet</p>
              <p className="text-sm text-gray-500">
                Start sharing your code to earn rewards!
              </p>
            </div>
          )}
        </div>

        {/* Rewards Program Info */}
        <div className="bg-brand-cream/50 rounded-lg p-4">
          <h4 className="font-semibold mb-2">Rewards Program</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Earn $20 for each successful referral</li>
            <li>• Your friend gets $20 off their first order</li>
            <li>• Credits never expire</li>
            <li>• Use credits on any future orders</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}