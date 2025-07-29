'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useTranslation } from '@/lib/i18n/useTranslation'
import { Button } from '@/components/ui/Button'

export function BrandOverview() {
  const { t, locale } = useTranslation()

  const features = [
    {
      icon: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
      title: 'Authentic Recipes',
      description: 'Every product follows traditional Mexican family recipes passed down through generations'
    },
    {
      icon: 'https://images.pexels.com/photos/1340116/pexels-photo-1340116.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
      title: 'Handcrafted Quality',
      description: 'Artisanal production methods ensure authentic flavors and premium quality'
    },
    {
      icon: 'https://images.pexels.com/photos/5840080/pexels-photo-5840080.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
      title: 'Fresh Ingredients',
      description: 'Sourced directly from Mexican farms and traditional spice growers'
    },
    {
      icon: 'https://images.pexels.com/photos/3850512/pexels-photo-3850512.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
      title: 'Cultural Heritage',
      description: 'Trusted by over 10,000 families seeking authentic Mexican flavors'
    }
  ]

  return (
    <section className="py-20 bg-brand-background">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="heading-2 mb-6">Why Food Lovers Choose Casa Tradicional</h2>
            <p className="body-text mb-8">
              We're more than just a food company – we're Mexican culinary artisans who understand the deep connection between authentic flavors and cultural heritage.
            </p>
            <p className="body-text mb-8">
              Every product in our collection is handcrafted by our team of traditional Mexican chefs and artisans. We partner with local Mexican farms and traditional spice growers to ensure you experience the authentic taste of Mexico, no matter where you are in the world.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={48}
                    height={48}
                    className="rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-brand-secondary mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link href={`/${locale}/about`}>
              <Button variant="outline">
                Meet Our Culinary Artisans
              </Button>
            </Link>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="https://images.pexels.com/photos/5840080/pexels-photo-5840080.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Brand story"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Floating stats */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-6"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-primary">10K+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -top-6 -right-6 bg-brand-primary text-white rounded-xl shadow-lg p-6"
            >
              <div className="text-center">
                <div className="text-3xl font-bold">98%</div>
                <div className="text-sm opacity-90">Satisfaction</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}