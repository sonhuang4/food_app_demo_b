'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslation } from '@/lib/i18n/useTranslation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Toast } from '@/components/shared/Toast'

const inviteSchema = z.object({
  emails: z.string().min(1, 'Please enter at least one email address'),
  message: z.string().optional(),
})

type InviteFormData = z.infer<typeof inviteSchema>

interface InviteFormProps {
  referralCode: string | undefined
}

export function InviteForm({ referralCode }: InviteFormProps) {
  const { t } = useTranslation()
  const [showToast, setShowToast] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<InviteFormData>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      message: `Hey! I've been loving EcoCommerce for my pet's needs. They have amazing premium food and eco-friendly litter. Use my code ${referralCode} to get $20 off your first order!`
    }
  })

  const onSubmit = async (data: InviteFormData) => {
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setShowToast(true)
      reset()
      setTimeout(() => setShowToast(false), 3000)
    } catch (error) {
      console.error('Failed to send invites:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Invite Friends Directly</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Addresses */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Email Addresses
              </label>
              <Input
                {...register('emails')}
                placeholder="friend1@email.com, friend2@email.com"
                className={errors.emails ? 'border-red-500' : ''}
              />
              {errors.emails && (
                <p className="text-red-500 text-sm mt-1">{errors.emails.message}</p>
              )}
              <p className="text-gray-500 text-sm mt-1">
                Separate multiple email addresses with commas
              </p>
            </div>

            {/* Personal Message */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Personal Message (Optional)
              </label>
              <textarea
                {...register('message')}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary resize-none"
                placeholder="Add a personal touch to your invitation..."
              />
            </div>

            {/* Preview */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium mb-2">Preview</h4>
              <div className="text-sm text-gray-700 space-y-2">
                <p><strong>Subject:</strong> You're invited to try EcoCommerce!</p>
                <p><strong>Your referral code:</strong> {referralCode}</p>
                <p><strong>Their discount:</strong> $20 off first order</p>
                <p><strong>Your reward:</strong> $20 credit when they subscribe</p>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              loading={isSubmitting}
              disabled={!referralCode}
            >
              Send Invitations
            </Button>
          </form>
        </CardContent>
      </Card>

      <Toast
        show={showToast}
        message="Invitations sent successfully!"
        type="success"
        onClose={() => setShowToast(false)}
      />
    </>
  )
}