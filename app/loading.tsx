export default function Loading() {
  return (
    <div className="min-h-screen bg-brand-background flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-brand-secondary font-medium">Loading...</p>
      </div>
    </div>
  )
}