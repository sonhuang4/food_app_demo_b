'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from '@/lib/i18n/useTranslation'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const slides = [
  {
    id: 1,
    image: 'https://images.pexels.com/photos/5840080/pexels-photo-5840080.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop',
    titleKey: 'hero.title',
    subtitleKey: 'hero.subtitle',
  },
  {
    id: 2,
    image: 'https://images.pexels.com/photos/9986228/pexels-photo-9986228.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop',
    titleKey: 'Artisanal Mexican Salsas & Moles',
    subtitleKey: 'Handcrafted with traditional family recipes passed down through generations',
  },
  {
    id: 3,
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop',
    titleKey: 'From Mexico to Your Table',
    subtitleKey: 'Experience authentic flavors with premium ingredients sourced directly from Mexican farms',
  },
]

export function HeroCarousel() {
  const { t, locale } = useTranslation()
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="relative h-[600px] lg:h-[700px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[currentSlide].image}
            alt="Hero image"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="container-custom text-center text-white">
              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="heading-1 text-white mb-6"
              >
                {slides[currentSlide].titleKey.includes('.') 
                  ? t(slides[currentSlide].titleKey) 
                  : slides[currentSlide].titleKey}
              </motion.h1>
              
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl lg:text-2xl mb-8 text-white/90 max-w-2xl mx-auto"
              >
                {slides[currentSlide].subtitleKey.includes('.') 
                  ? t(slides[currentSlide].subtitleKey) 
                  : slides[currentSlide].subtitleKey}
              </motion.p>
              
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link href={`/${locale}/build-box`}>
                  <Button size="lg" className="bg-brand-primary hover:bg-brand-secondary">
                    {t('hero.cta')}
                  </Button>
                </Link>
                <Link href={`/${locale}/products`}>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-primary">
                    {t('hero.learnMore')}
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors backdrop-blur-sm"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors backdrop-blur-sm"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}