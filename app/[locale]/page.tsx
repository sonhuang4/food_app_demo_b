import { HeroCarousel } from '@/components/home/HeroCarousel'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'
import { BrandOverview } from '@/components/home/BrandOverview'
import { TestimonialCarousel } from '@/components/shared/TestimonialCarousel'

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <FeaturedProducts />
      <BrandOverview />
      <TestimonialCarousel />
    </>
  )
}