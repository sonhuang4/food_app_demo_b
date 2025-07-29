'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useTranslation } from '@/lib/i18n/useTranslation'

export default function AboutPage() {
  const { t } = useTranslation()

  const values = [
    {
      icon: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
      title: 'Traditional Authenticity',
      description: 'We preserve centuries-old Mexican recipes, using only traditional methods and authentic ingredients.'
    },
    {
      icon: 'https://images.pexels.com/photos/1340116/pexels-photo-1340116.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
      title: 'Artisanal Quality',
      description: 'Every product is handcrafted by skilled Mexican artisans who have perfected their craft over generations.'
    },
    {
      icon: 'https://images.pexels.com/photos/5840080/pexels-photo-5840080.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
      title: 'Cultural Heritage',
      description: 'We celebrate and preserve Mexican culinary culture, sharing our rich food traditions with the world.'
    },
    {
      icon: 'https://images.pexels.com/photos/3850512/pexels-photo-3850512.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop',
      title: 'Family Recipes',
      description: 'Our products are based on treasured family recipes passed down through generations of Mexican cooks.'
    }
  ]

  const team = [
    {
      name: 'Rosa María Hernández',
      role: 'Founder & Master Chef',
      image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop&crop=face',
      bio: 'Third-generation Mexican chef from Puebla, dedicated to preserving authentic Mexican culinary traditions and sharing them with the world.'
    },
    {
      name: 'Carlos Ramirez',
      role: 'Head of Production',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop&crop=face',
      bio: 'Expert in traditional Mexican food preparation with 20+ years ensuring authentic flavors and quality in every product.'
    },
    {
      name: 'Luz Elena Morales',
      role: 'Cultural Heritage Director',
      image: 'https://images.pexels.com/photos/3992656/pexels-photo-3992656.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop&crop=face',
      bio: 'Food anthropologist specializing in Mexican culinary history, ensuring every recipe honors its cultural origins and traditional preparation methods.'
    }
  ]

  return (
    <div className="min-h-screen bg-brand-background">
      {/* Hero Section */}
      <section className="relative h-[500px] bg-brand-secondary">
        <Image
          src="https://images.pexels.com/photos/3361739/pexels-photo-3361739.jpeg?auto=compress&cs=tinysrgb&w=1920&h=500&fit=crop"
          alt="About us hero"
          fill
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container-custom text-center text-white">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="heading-1 text-white mb-6"
            >
              {t('about.title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl max-w-2xl mx-auto"
            >
              {t('about.subtitle')}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="heading-2 mb-8">Our Mission</h2>
            <p className="body-text text-lg mb-12">
              At Casa Tradicional, we believe that authentic Mexican cuisine is a treasure that deserves to be shared 
              with the world. That's why we've created an artisanal food company that brings the true flavors of Mexico 
              to your table. Every product is handcrafted using traditional methods, authentic ingredients, and 
              family recipes passed down through generations of Mexican cooks.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="mb-4">
                    <Image
                      src={value.icon}
                      alt={value.title}
                      width={64}
                      height={64}
                      className="mx-auto rounded-lg object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-brand-secondary mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="heading-2 mb-6">How We Started</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Casa Tradicional was born from a deep love for authentic Mexican cuisine. As Mexican immigrants 
                  living in the United States, we found ourselves homesick for the true flavors of our homeland. 
                  Store-bought "Mexican" products lacked the authenticity and quality we remembered from our 
                  grandmother's kitchen in Puebla.
                </p>
                <p>
                  That's when we decided to bring the real taste of Mexico to families everywhere. We returned 
                  to our roots, working with local Mexican artisans, traditional spice growers, and family 
                  recipe keepers to create a line of products that honor our culinary heritage.
                </p>
                <p>
                  Today, we're proud to serve thousands of families across the United States and Mexico, 
                  helping them experience the authentic flavors of traditional Mexican cuisine, no matter 
                  where they call home.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden"
            >
              <Image
                src="https://images.pexels.com/photos/3361739/pexels-photo-3361739.jpeg?auto=compress&cs=tinysrgb&w=600&h=450&fit=crop"
                alt="Our story"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="heading-2 mb-4">Meet Our Team</h2>
            <p className="body-text max-w-2xl mx-auto">
              We're a passionate group of pet lovers, sustainability advocates, and industry experts 
              working together to revolutionize pet care.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="relative aspect-square">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-brand-secondary mb-1">
                    {member.name}
                  </h3>
                  <p className="text-brand-primary font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand-primary text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="heading-2 text-white mb-6">Ready to Taste Authentic Mexico?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Experience the true flavors of Mexican culinary heritage with our handcrafted artisanal products.
            </p>
            <button className="bg-white text-brand-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              Shop Mexican Foods
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}