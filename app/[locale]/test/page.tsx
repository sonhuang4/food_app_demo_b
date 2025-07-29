export default function TestPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#2563eb', marginBottom: '1rem' }}>
          CSS Test (Inline Styles)
        </h1>
        <p style={{ color: '#374151' }}>
          If you can see this styled, CSS is loading!
        </p>
        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#0D9488', color: 'white', borderRadius: '0.25rem' }}>
          Brand Primary Color Test
        </div>
        
        {/* Now test Tailwind classes */}
        <div className="mt-4 p-4 bg-blue-500 text-white rounded-lg">
          Tailwind Classes Test
        </div>
        
        <div className="heading-1 mt-4">
          Custom Heading Test
        </div>
        
        <button className="btn-primary mt-4">
          Custom Button Test
        </button>
      </div>
    </div>
  )
}