export const SITE_CONFIG = {
  name: 'EcoCommerce',
  description: 'Premium Pet Care Subscription - Artisanal food and eco-friendly litter delivered to your door',
  url: 'https://ecocommerce.com',
  ogImage: '/images/brand/og-image.jpg',
}

export const PRODUCT_CATEGORIES = {
  FOOD: 'food',
  LITTER: 'litter',
} as const

export const PET_TYPES = {
  CAT: 'cat',
  DOG: 'dog',
  BOTH: 'both',
} as const

export const SUBSCRIPTION_FREQUENCIES = {
  WEEKLY: 'weekly',
  BIWEEKLY: 'biweekly',
  MONTHLY: 'monthly',
} as const

export const ORDER_STATUSES = {
  PENDING: 'pending',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
} as const

export const SUBSCRIPTION_STATUSES = {
  ACTIVE: 'active',
  PAUSED: 'paused',
  CANCELLED: 'cancelled',
} as const

export const REFERRAL_REWARD = 20
export const REFERRAL_DISCOUNT = 20

export const CONTACT_INFO = {
  email: 'support@ecocommerce.com',
  phone: '1-800-ECO-PETS',
  address: '123 Green Street, Eco City, EC 12345',
}

export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/ecocommerce',
  facebook: 'https://facebook.com/ecocommerce',
  instagram: 'https://instagram.com/ecocommerce',
  pinterest: 'https://pinterest.com/ecocommerce',
}