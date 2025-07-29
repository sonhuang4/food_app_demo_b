'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useTranslation } from '@/lib/i18n/useTranslation'
import { useReferralStore } from '@/store/useReferralStore'
import { Referral } from '@/types/referral'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Toast } from '@/components/shared/Toast'
import { Confetti } from '@/components/shared/Confetti'

interface ReferralInfoProps {
  referralData: Referral | undefined
}

export function ReferralInfo({ referralData }: ReferralInfoProps) {
  const { t } = useTranslation()
  const [showToast, setShowToast] = useState(false)
  const { showConfetti, triggerConfetti, hideConfetti } = useReferralStore()

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setShowToast(true)
      triggerConfetti()
      setTimeout(() => {
        setShowToast(false)
        hideConfetti()
      }, 3000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const shareUrl = `${window.location.origin}?ref=${referralData?.code}`

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{t('referrals.yourCode')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Referral Code */}
          <div>
            <label className="block text-sm font-medium mb-2">Referral Code</label>
            <div className="flex">
              <Input
                value={referralData?.code || ''}
                readOnly
                className="rounded-r-none"
              />
              <Button
                onClick={() => copyToClipboard(referralData?.code || '')}
                className="rounded-l-none"
              >
                {t('referrals.copy')}
              </Button>
            </div>
          </div>

          {/* Share Link */}
          <div>
            <label className="block text-sm font-medium mb-2">Share Link</label>
            <div className="flex">
              <Input
                value={shareUrl}
                readOnly
                className="rounded-r-none text-sm"
              />
              <Button
                onClick={() => copyToClipboard(shareUrl)}
                className="rounded-l-none"
              >
                {t('referrals.share')}
              </Button>
            </div>
          </div>

          {/* How it Works */}
          <div className="bg-brand-cream/50 rounded-lg p-4">
            <h4 className="font-semibold mb-2">How it Works</h4>
            <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
              <li>Share your referral code or link with friends</li>
              <li>They get $20 off their first order</li>
              <li>You earn $20 credit when they subscribe</li>
              <li>Both of you save money on premium pet care!</li>
            </ol>
          </div>

          {/* Social Share Buttons */}
          <div className="space-y-3">
            <h4 className="font-semibold">Share on Social Media</h4>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const text = `Check out EcoCommerce for premium pet care! Use my code ${referralData?.code} and get $20 off your first order.`
                  const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`
                  window.open(url, '_blank')
                }}
                className="flex items-center space-x-2"
              >
                <Image
                  src="https://images.pexels.com/photos/23610/pexels-photo-23610.jpg?auto=compress&cs=tinysrgb&w=20&h=20&fit=crop"
                  alt="Twitter"
                  width={20}
                  height={20}
                  className="rounded"
                />
                <span>Twitter</span>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
                  window.open(url, '_blank')
                }}
                className="flex items-center space-x-2"
              >
                <Image
                  src="https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=20&h=20&fit=crop"
                  alt="Facebook"
                  width={20}
                  height={20}
                  className="rounded"
                />
                <span>Facebook</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const text = `Check out EcoCommerce for premium pet care! Use my code ${referralData?.code} and get $20 off: ${shareUrl}`
                  const url = `https://wa.me/?text=${encodeURIComponent(text)}`
                  window.open(url, '_blank')
                }}
                className="flex items-center space-x-2"
              >
                <Image
                  src="https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=20&h=20&fit=crop"
                  alt="WhatsApp"
                  width={20}
                  height={20}
                  className="rounded"
                />
                <span>WhatsApp</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Toast
        show={showToast}
        message="Copied to clipboard!"
        type="success"
        onClose={() => setShowToast(false)}
      />

      <Confetti show={showConfetti} />
    </>
  )
}