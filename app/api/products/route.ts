import { NextRequest, NextResponse } from 'next/server'
import { Product } from '@/types/product'

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Salsa Roja Tradicional de Abuela Rosa',
    description: 'Authentic red salsa made with fire-roasted tomatoes, dried chilies, and secret family spices. Handcrafted using a traditional molcajete, this medium-heat salsa brings the true taste of Mexico to your table.',
    price: 12.99,
    image: 'https://images.pexels.com/photos/9986228/pexels-photo-9986228.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    category: 'food',
    petType: 'cat',
    weight: '16 oz (454g)',
    brand: 'Casa Tradicional',
    inStock: true,
    rating: 4.9,
    reviewCount: 256
  },
  {
    id: '2',
    name: 'Mole Poblano Artesanal',
    description: 'Rich, complex mole with over 20 traditional ingredients including chocolate, chilies, and spices. This authentic Puebla-style mole is prepared following centuries-old family recipes passed down through generations.',
    price: 28.99,
    image: 'https://images.pexels.com/photos/7625058/pexels-photo-7625058.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    category: 'litter',
    petType: 'cat',
    weight: '8 oz (227g)',
    brand: 'Moles de Oaxaca',
    inStock: true,
    rating: 4.8,
    reviewCount: 189
  },
  {
    id: '3',
    name: 'Salsa Verde de Tomatillo Casera',
    description: 'Fresh green salsa made with roasted tomatillos, jalapeños, cilantro, and onions. This tangy, medium-spice salsa is perfect for tacos, enchiladas, or as a dip with tortilla chips.',
    price: 11.99,
    image: 'https://images.pexels.com/photos/7625055/pexels-photo-7625055.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    category: 'food',
    petType: 'dog',
    weight: '16 oz (454g)',
    brand: 'Casa Tradicional',
    inStock: true,
    rating: 4.7,
    reviewCount: 203
  },
  {
    id: '4',
    name: 'Chiles en Nogada Gourmet',
    description: 'Premium poblano peppers stuffed with traditional picadillo, topped with creamy walnut sauce and pomegranate seeds. A patriotic dish representing the Mexican flag colors, perfect for celebrations.',
    price: 24.99,
    image: 'https://images.pexels.com/photos/5840080/pexels-photo-5840080.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    category: 'food',
    petType: 'cat',
    weight: '2 servings',
    brand: 'Cocina Mexicana Premium',
    inStock: true,
    rating: 4.9,
    reviewCount: 124
  },
  {
    id: '5',
    name: 'Especias Mexicanas Mixtas',
    description: 'Authentic Mexican spice blend featuring cumin, oregano, paprika, and secret indigenous spices. Perfect for seasoning meats, vegetables, and traditional Mexican dishes.',
    price: 15.99,
    image: 'https://images.pexels.com/photos/1340116/pexels-photo-1340116.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    category: 'litter',
    petType: 'cat',
    weight: '4 oz (113g)',
    brand: 'Especias de México',
    inStock: true,
    rating: 4.6,
    reviewCount: 167
  },
  {
    id: '6',
    name: 'Chocolate Mexicano con Canela',
    description: 'Traditional Mexican hot chocolate tablets made with premium cacao, cinnamon, and a touch of vanilla. Prepare the authentic way with a molinillo for a frothy, rich beverage.',
    price: 18.99,
    image: 'https://images.pexels.com/photos/887853/pexels-photo-887853.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop',
    category: 'food',
    petType: 'dog',
    weight: '6 tablets (180g)',
    brand: 'Cacao Tradicional',
    inStock: false,
    rating: 4.8,
    reviewCount: 298
  }
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const petType = searchParams.get('petType')
  const id = searchParams.get('id')

  // Get single product by ID
  if (id) {
    const product = mockProducts.find(p => p.id === id)
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    return NextResponse.json({ data: product, success: true })
  }

  let filteredProducts = mockProducts

  // Filter by category
  if (category && category !== 'all') {
    filteredProducts = filteredProducts.filter(p => p.category === category)
  }

  // Filter by pet type
  if (petType && petType !== 'all') {
    filteredProducts = filteredProducts.filter(p => p.petType === petType || p.petType === 'both')
  }

  return NextResponse.json({ 
    data: filteredProducts, 
    success: true 
  })
}