'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslation } from '@/lib/i18n/useTranslation'
import { LanguageSwitcher } from './LanguageSwitcher'
import { useCartStore } from '@/store/useCartStore'
import { cn } from '@/lib/utils'

export function Header() {
  const { t, locale } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const totalItems = useCartStore(state => state.getTotalItems())

  const navigation = [
    { name: t('nav.home'), href: `/${locale}` },
    { name: t('nav.products'), href: `/${locale}/products` },
    { name: t('nav.buildBox'), href: `/${locale}/build-box` },
    { name: t('nav.dashboard'), href: `/${locale}/dashboard` },
    { name: t('nav.referrals'), href: `/${locale}/referrals` },
    { name: t('nav.about'), href: `/${locale}/about` },
    { name: t('nav.faq'), href: `/${locale}/faq` },
  ]

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <span className="font-serif text-2xl font-bold text-brand-secondary">EcoCommerce</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-brand-primary transition-colors duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            
            {/* Cart */}
            <button className="relative p-2 text-gray-700 hover:text-brand-primary transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9M6 19a2 2 0 100 4 2 2 0 000-4zm12 0a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-brand-primary transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={cn(
          'lg:hidden overflow-hidden transition-all duration-300',
          isMenuOpen ? 'max-h-96 pb-4' : 'max-h-0'
        )}>
          <nav className="flex flex-col space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-3 py-2 text-gray-700 hover:text-brand-primary hover:bg-gray-50 rounded-lg transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}