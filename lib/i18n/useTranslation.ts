'use client'

import { usePathname } from 'next/navigation'
import { Locale, defaultLocale, locales } from './config'
import enTranslations from './translations/en.json'
import esTranslations from './translations/es.json'

const translations = {
  en: enTranslations,
  es: esTranslations,
}

export function useTranslation() {
  const pathname = usePathname()
  const segments = pathname?.split('/') || []
  const potentialLocale = segments[1] as Locale
  const locale = locales.includes(potentialLocale) ? potentialLocale : defaultLocale
  
  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations[locale]
    
    for (const k of keys) {
      value = value?.[k]
    }
    
    return value || key
  }

  return { t, locale }
}