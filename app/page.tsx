import BoutiqueScroll from '@/components/scroll/BoutiqueScroll'
import ProductGrid from '@/components/shop/ProductGrid'
import AboutSection from '@/components/sections/AboutSection'
import ContactSection from '@/components/sections/ContactSection'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import CartDrawer from '@/components/cart/CartDrawer'

export default function Home() {
  return (
    <main className="relative">
      <Navbar />

      {/* Core scrollytelling experience */}
      <div className="relative">
        <BoutiqueScroll />
        {/* Seamless Mesh Blur - Bottom of BoutiqueScroll */}
        <div className="absolute bottom-0 left-0 w-full h-[300px] overflow-hidden pointer-events-none z-20">
          <div className="mesh-blur absolute bottom-0 translate-y-1/2" />
          <div className="section-divider absolute bottom-0" />
        </div>
      </div>

      {/* About the brand */}
      <div className="relative">
        <AboutSection />
        {/* Seamless Mesh Blur - Bottom of About */}
        <div className="absolute bottom-0 left-0 w-full h-[200px] overflow-hidden pointer-events-none z-20">
          <div className="mesh-blur absolute bottom-0 translate-y-1/2 opacity-50" />
        </div>
      </div>

      {/* Product collection */}
      <ProductGrid />

      {/* Contact with integrated top glow */}
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-[200px] overflow-hidden pointer-events-none z-20">
          <div className="mesh-blur absolute top-0 -translate-y-1/2" />
        </div>
        <ContactSection />
      </div>

      {/* Footer */}
      <Footer />

      {/* Cart Drawer */}
      <CartDrawer />
    </main>
  )
}
