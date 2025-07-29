'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useTranslation } from '@/lib/i18n/useTranslation'
import { locales } from '@/lib/i18n/config'

export function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()
  const { locale } = useTranslation()

  const switchLanguage = (newLocale: string) => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, '')
    const newPath = `/${newLocale}${pathWithoutLocale}`
    router.push(newPath)
  }

  return (
    <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLanguage(loc)}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
            locale === loc
              ? 'bg-white text-brand-primary shadow-sm'
              : 'text-gray-600 hover:text-brand-primary'
          }`}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  )
}