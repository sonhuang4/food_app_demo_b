'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from '@/lib/i18n/useTranslation'

const faqData = [
  {
    category: 'Subscription',
    questions: [
      {
        question: 'How does the subscription service work?',
        answer: 'Our subscription service delivers premium pet products to your door on your chosen schedule. You can select products based on your pet type, choose your delivery frequency, and customize your box anytime.'
      },
      {
        question: 'Can I modify my subscription?',
        answer: 'Yes! You can modify your subscription anytime through your dashboard. Change products, adjust quantities, update delivery frequency, or pause/resume your subscription with just a few clicks.'
      },
      {
        question: 'When will I be charged?',
        answer: 'You\'ll be charged when your subscription is created and then according to your chosen frequency (weekly, bi-weekly, or monthly) before each delivery.'
      },
      {
        question: 'Can I skip a delivery?',
        answer: 'Absolutely! You can skip upcoming deliveries or pause your subscription anytime through your account dashboard. There are no penalties for pausing or skipping.'
      }
    ]
  },
  {
    category: 'Products',
    questions: [
      {
        question: 'What types of products do you offer?',
        answer: 'We offer premium pet food, eco-friendly cat litter, treats, toys, and accessories. All products are carefully curated for quality and sustainability.'
      },
      {
        question: 'Are your products organic and natural?',
        answer: 'Yes! We prioritize organic, natural, and sustainably-sourced products. All our food products use high-quality ingredients without harmful additives.'
      },
      {
        question: 'Do you have products for specific dietary needs?',
        answer: 'Yes, we offer products for various dietary requirements including grain-free, limited ingredient, senior-specific, and weight management formulas.'
      },
      {
        question: 'How do you ensure product freshness?',
        answer: 'All products are stored in climate-controlled facilities and shipped with appropriate packaging to maintain freshness. We also rotate stock regularly to ensure you receive the freshest products.'
      }
    ]
  },
  {
    category: 'Shipping',
    questions: [
      {
        question: 'Where do you ship?',
        answer: 'We currently ship to all 50 US states. We\'re working on expanding to Canada and other international markets soon.'
      },
      {
        question: 'How much does shipping cost?',
        answer: 'Shipping is free on all subscription orders! For one-time purchases, we offer free shipping on orders over $50.'
      },
      {
        question: 'How long does delivery take?',
        answer: 'Most orders arrive within 3-5 business days. You\'ll receive tracking information once your order ships.'
      },
      {
        question: 'What if I\'m not home for delivery?',
        answer: 'Our packages are designed to be left safely at your door. For perishable items, we use insulated packaging that keeps products fresh for several hours.'
      }
    ]
  },
  {
    category: 'Returns & Support',
    questions: [
      {
        question: 'What is your return policy?',
        answer: 'We offer a 100% satisfaction guarantee. If you\'re not happy with any product, contact us within 30 days for a full refund or replacement.'
      },
      {
        question: 'How do I contact customer support?',
        answer: 'You can reach our customer support team via email, phone, or live chat. We\'re available Monday-Friday 9AM-7PM EST and Saturday 10AM-4PM EST.'
      },
      {
        question: 'Do you offer refunds for unused products?',
        answer: 'Yes, we accept returns of unused products in their original packaging within 30 days of delivery for a full refund.'
      }
    ]
  }
]

export function FAQSection() {
  const { t } = useTranslation()
  const [activeCategory, setActiveCategory] = useState('Subscription')
  const [openQuestions, setOpenQuestions] = useState<number[]>([])

  const toggleQuestion = (index: number) => {
    setOpenQuestions(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const activeQuestions = faqData.find(cat => cat.category === activeCategory)?.questions || []

  return (
    <div className="max-w-4xl mx-auto">
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {faqData.map((category) => (
          <button
            key={category.category}
            onClick={() => setActiveCategory(category.category)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeCategory === category.category
                ? 'bg-brand-primary text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {category.category}
          </button>
        ))}
      </div>

      {/* Questions */}
      <motion.div
        key={activeCategory}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-4"
      >
        {activeQuestions.map((faq, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <button
              onClick={() => toggleQuestion(index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium text-brand-secondary pr-4">
                {faq.question}
              </span>
              <motion.span
                animate={{ rotate: openQuestions.includes(index) ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-brand-primary"
              >
                ▼
              </motion.span>
            </button>
            
            <AnimatePresence>
              {openQuestions.includes(index) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-4 text-gray-700 leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </motion.div>

      {/* Contact CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mt-12 p-8 bg-brand-primary/10 rounded-xl"
      >
        <h3 className="text-xl font-semibold text-brand-secondary mb-3">
          Still have questions?
        </h3>
        <p className="text-gray-600 mb-4">
          Our friendly customer support team is here to help you.
        </p>
        <button className="bg-brand-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-brand-secondary transition-colors">
          Contact Support
        </button>
      </motion.div>
    </div>
  )
}