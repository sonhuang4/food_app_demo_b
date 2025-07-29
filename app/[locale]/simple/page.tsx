export default function SimplePage() {
  return (
    <div className="min-h-screen bg-brand-background">
      <div className="container-custom py-12">
        <h1 className="heading-1 text-center">Welcome to EcoCommerce</h1>
        <p className="body-text text-center max-w-2xl mx-auto">
          This is a simple test page to verify that our CSS and styling are working correctly.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="heading-3 text-brand-primary">Premium Quality</h3>
            <p className="body-text">Only the finest ingredients for your pets.</p>
            <button className="btn-primary mt-4">Learn More</button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="heading-3 text-brand-secondary">Eco-Friendly</h3>
            <p className="body-text">Sustainable and environmentally conscious.</p>
            <button className="btn-secondary mt-4">Discover</button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="heading-3 text-brand-accent">Convenient</h3>
            <p className="body-text">Delivered right to your door on schedule.</p>
            <button className="btn-primary mt-4">Subscribe</button>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <h2 className="heading-2 mb-6">Ready to Get Started?</h2>
          <div className="space-x-4">
            <button className="btn-primary">Start Subscription</button>
            <button className="btn-secondary">View Products</button>
          </div>
        </div>
      </div>
    </div>
  )
}