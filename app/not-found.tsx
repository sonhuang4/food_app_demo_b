import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-brand-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-brand-secondary mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist.
        </p>
        <Link 
          href="/en"
          className="bg-brand-primary text-white px-6 py-3 rounded-lg hover:bg-brand-secondary transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}