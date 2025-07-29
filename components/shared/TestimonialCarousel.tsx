'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useTranslation } from '@/lib/i18n/useTranslation'

const testimonials = [
  {
    id: 1,
    name: 'Maria González',
    location: 'Los Angeles, CA',
    petName: 'Food Lover',
    avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face',
    text: "¡Increíble! These authentic Mexican products taste exactly like my grandmother's cooking. The Salsa Roja brings back so many childhood memories from Guadalajara. The quality is exceptional and the delivery to LA is always fast and fresh.",
    rating: 5
  },
  {
    id: 2,
    name: 'David Thompson',
    location: 'Houston, TX',
    petName: 'Mexican Food Enthusiast',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face',
    text: "As someone who lived in Mexico City for 5 years, I can say these are the most authentic Mexican products I've found in the US. The Mole Poblano is restaurant-quality, and the spice blend makes my homemade tacos taste like they're from a street vendor in Mexico!",
    rating: 5
  },
  {
    id: 3,
    name: 'Carmen Rivera',
    location: 'Phoenix, AZ',
    petName: 'Traditional Cook',
    avatar: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face',
    text: "Finally, a company that respects traditional Mexican recipes! The ingredients are fresh, the flavors are authentic, and my family can't tell the difference from homemade. The monthly delivery keeps our pantry stocked with the real taste of México.",
    rating: 5
  }
]

export function TestimonialCarousel() {
  const { t } = useTranslation()
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [isPaused])

  return (
    <section className="py-20 bg-brand-cream/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="heading-2 mb-4">{t('testimonials.title')}</h2>
          <p className="body-text max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </motion.div>

        <div 
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-8 lg:p-12"
            >
              <div className="text-center">
                {/* Stars */}
                <div className="flex justify-center mb-6">
                  {Array.from({ length: testimonials[currentTestimonial].rating }).map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-lg lg:text-xl text-gray-700 mb-8 italic leading-relaxed">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center justify-center space-x-4">
                  <Image
                    src={testimonials[currentTestimonial].avatar}
                    alt={testimonials[currentTestimonial].name}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div className="text-left">
                    <div className="font-semibold text-brand-secondary">
                      {testimonials[currentTestimonial].name}
                    </div>
                    <div className="text-sm text-brand-primary font-medium">
                      Pet Parent to {testimonials[currentTestimonial].petName}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonials[currentTestimonial].location}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentTestimonial ? 'bg-brand-primary' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}