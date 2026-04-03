import { products } from '@/lib/products'
import ProductCard from '@/components/shop/ProductCard'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import CartDrawer from '@/components/cart/CartDrawer'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const categoriesToPrebuild = [
    'tees', 'shirts', 'pants', 'layers',
    'graphic-tees', 'essential-tees', 'oversized-tees', 'premium-cotton',
    'button-up-shirts', 'overshirts', 'oxford-shirts', 'linen-shirts',
    'cargo-shorts', 'wide-leg-pants', 'chinos', 'joggers',
    'jackets', 'hoodies', 'sweaters', 'cardigans'
  ]
  return categoriesToPrebuild.map((c) => ({ slug: c }))
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  // Format slug to readable title
  const title = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

  // Simple filter logic: Check if category or tags match the slug
  let filteredProducts = products.filter(p => {
    const slugLower = slug.toLowerCase()
    // Match by exact category (e.g. 'tee' in 'graphic-tees')
    if (slugLower.includes(p.category.toLowerCase())) return true
    
    // Match by tags
    if (p.tags.some(t => slugLower.includes(t.toLowerCase()))) return true
    
    return false
  })

  // Fallback: If no products match perfectly (since we only have 8 hardcoded), 
  // just show some relevant products or all products so page isn't empty.
  if (filteredProducts.length === 0) {
    if (slug.includes('shirt')) {
      filteredProducts = products.filter(p => p.category === 'shirt')
    } else if (slug.includes('pant') || slug.includes('short')) {
      filteredProducts = products.filter(p => p.category === 'pants')
    } else {
      filteredProducts = products
    }
  }

  return (
    <main className="min-h-screen flex flex-col" style={{ background: '#C8C4BC' }}>
      <Navbar />

      <section className="flex-grow pt-32 pb-24 sm:py-40 px-5 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col items-center mb-16 sm:mb-20">
            <span
              className="inline-block text-[11px] tracking-[0.3em] uppercase mb-4 px-4 py-1.5 rounded-full"
              style={{
                fontFamily: "'DM Mono', monospace",
                color: 'rgba(26,26,24,0.45)',
                border: '1px solid rgba(26,26,24,0.1)',
                background: 'rgba(26,26,24,0.03)',
              }}
            >
              Category
            </span>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center"
              style={{ fontFamily: "'Bebas Neue', sans-serif", color: 'rgba(26,26,24,0.88)' }}
            >
              {title}
            </h1>
            <p
              className="mt-4 text-sm max-w-md text-center"
              style={{ color: 'rgba(26,26,24,0.6)' }}
            >
              Explore our collection of intentionally crafted {title.toLowerCase()}.
            </p>
            <div
              className="w-12 h-[1px] mt-6"
              style={{ background: 'rgba(26,26,24,0.15)' }}
            />
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 sm:gap-x-6 gap-y-10 sm:gap-y-12">
            {filteredProducts.map((product, index) => (
              <div key={product.id} style={{ animationDelay: `${index * 80}ms` }} className="animate-fade-in">
                <ProductCard product={product} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <CartDrawer />
    </main>
  )
}
