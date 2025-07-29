# EcoCommerce - Premium Pet Care Subscription

A modern, bilingual e-commerce platform built with Next.js 14, offering premium pet food and eco-friendly cat litter through a subscription service.

## 🌟 Features

- **Bilingual Support**: Spanish and English with route-based localization (`/en`, `/es`)
- **Modern Design**: Clean, minimalistic design inspired by premium e-commerce sites
- **Subscription Service**: Multi-step subscription builder with pet selection, product customization, and frequency options
- **User Dashboard**: Comprehensive subscription management with order history
- **Referral System**: Built-in referral program with rewards and social sharing
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: Framer Motion animations throughout the application
- **Type Safety**: Full TypeScript implementation

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Forms**: React Hook Form + Zod validation
- **TypeScript**: Full type safety
- **Icons**: Lucide React

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── [locale]/          # Localized routes
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── home/             # Homepage components
│   ├── layout/           # Layout components
│   ├── products/         # Product-related components
│   ├── subscription/     # Subscription flow components
│   ├── dashboard/        # User dashboard components
│   ├── referrals/        # Referral system components
│   ├── shared/           # Shared/common components
│   └── ui/               # Base UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
│   └── i18n/            # Internationalization
├── store/                # Zustand stores
├── types/                # TypeScript type definitions
└── public/               # Static assets
```

## 🚀 Getting Started

1. **Clone the repository**
```bash
git clone <repository-url>
cd eco
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🌐 Routes

### English Routes (`/en`)
- `/en` - Homepage
- `/en/products` - Product catalog
- `/en/products/[id]` - Product details
- `/en/build-box` - Subscription builder
- `/en/dashboard` - User dashboard
- `/en/referrals` - Referral program
- `/en/about` - About page
- `/en/faq` - FAQ page

### Spanish Routes (`/es`)
Same structure with `/es` prefix for Spanish content.

## 🎨 Design System

### Colors
- **Primary**: Teal (#0D9488)
- **Secondary**: Deep Teal (#134E4A)
- **Accent**: Amber (#F59E0B)
- **Background**: Off-white (#FAFAF9)

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

## 📱 Key Components

### Subscription Flow
Multi-step wizard for creating custom pet subscription boxes:
1. Pet type selection (Cat, Dog, Both)
2. Product selection with filtering
3. Delivery frequency with pricing tiers

### Product Management
- Product catalog with filtering and search
- Detailed product pages with ratings and reviews
- Shopping cart functionality
- Subscription integration

### User Dashboard
- Subscription management (pause, resume, modify)
- Order history and tracking
- Account settings

### Referral System
- Unique referral codes
- Social media sharing integration
- Reward tracking and statistics
- Email invitation system

## 🌍 Internationalization

The application supports English and Spanish with:
- Route-based localization (`/en`, `/es`)
- Translation files in `lib/i18n/translations/`
- Custom `useTranslation` hook
- Language switcher in header

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript checks

### Mock Data
The application uses mock API routes for development:
- `/api/products` - Product catalog
- `/api/subscriptions` - Subscription management
- `/api/referrals` - Referral system

## 🎯 Key Features Implementation

### Animations
- Hero carousel with automatic progression
- Scroll-triggered animations for sections
- Page transitions and loading states
- Interactive hover effects and microinteractions

### State Management
- Zustand stores for subscription, cart, and referral state
- React Query for server state management
- Form state with React Hook Form

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Responsive navigation with mobile menu
- Touch-friendly interactions

## 🚀 Deployment

The application is ready for deployment on platforms like:
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Any Node.js hosting platform

## 📄 License

This project is created for demonstration purposes. Please ensure you have the proper licenses for any third-party assets used in production.