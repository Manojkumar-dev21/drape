'use client'

import { useUIStore } from '@/store/uiStore'
import { useCartStore } from '@/store/cartStore'
import { useEffect, useState, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import gsap from 'gsap'
import { products, Product } from '@/lib/products'
import Image from 'next/image'
import ProductCard from '@/components/shop/ProductCard'

const categories = [
  { name: 'Tees', sub: ['Graphic Tees', 'Essential Tees', 'Oversized Tees', 'Premium Cotton'] },
  { name: 'Shirts', sub: ['Button-Up Shirts', 'Overshirts', 'Oxford Shirts', 'Linen Shirts'] },
  { name: 'Pants', sub: ['Cargo Shorts', 'Wide-Leg Pants', 'Chinos', 'Joggers'] },
  { name: 'Layers', sub: ['Jackets', 'Hoodies', 'Sweaters', 'Cardigans'] },
]

export default function Navbar() {
  const openCart = useUIStore((s) => s.openCart)
  const getCount = useCartStore((s) => s.getCount)
  const items = useCartStore((s) => s.items)

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [count, setCount] = useState(0)
  const [catOpen, setCatOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)

  const catTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  const catMenuRef = useRef<HTMLDivElement>(null)

  // Use state for count to avoid hydration mismatch
  useEffect(() => {
    setCount(getCount())
  }, [items, getCount])

  useEffect(() => {
    if (searchOpen || mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
      if (searchOpen) setTimeout(() => searchInputRef.current?.focus(), 100)
    } else {
      document.body.style.overflow = ''
      setSearchQuery('')
    }
  }, [searchOpen, mobileMenuOpen])

  useEffect(() => {
    if (mobileMenuOpen && overlayRef.current) {
      const q = gsap.utils.selector(overlayRef.current)
      gsap.fromTo(q('.mobile-link'),
        { opacity: 0, x: -20, filter: 'blur(10px)' },
        { opacity: 1, x: 0, filter: 'blur(0px)', stagger: 0.1, duration: 0.8, ease: 'power3.out', delay: 0.3 }
      )
    }
  }, [mobileMenuOpen])

  useEffect(() => {
    if (catOpen && catMenuRef.current) {
      const q = gsap.utils.selector(catMenuRef.current)
      // Storytelling entrance
      const items = q('.cat-link')
      const titles = q('.cat-title')

      if (items.length > 0) {
        gsap.fromTo(items,
          { opacity: 0, x: -15, filter: 'blur(8px)' },
          { opacity: 1, x: 0, filter: 'blur(0px)', stagger: 0.04, duration: 0.8, ease: 'power3.out', delay: 0.1 }
        )
      }
      if (titles.length > 0) {
        gsap.fromTo(titles,
          { opacity: 0, y: 10 },
          { opacity: 0.3, y: 0, stagger: 0.1, duration: 1, ease: 'power2.out' }
        )
      }
    }
  }, [catOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchOpen(false)
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return []
    const q = searchQuery.toLowerCase()
    return products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    ).slice(0, 4)
  }, [searchQuery])

  useEffect(() => {
    if (resultsRef.current && resultsRef.current.children.length > 0 && filteredProducts.length > 0) {
      gsap.fromTo(resultsRef.current.children,
        { opacity: 0, scale: 0.95, y: 40 },
        { opacity: 1, scale: 1, y: 0, stagger: 0.12, duration: 0.8, ease: 'elastic.out(1, 0.8)' }
      )
    }
  }, [filteredProducts])

  const handleCatEnter = () => {
    if (catTimeoutRef.current) clearTimeout(catTimeoutRef.current)
    setCatOpen(true)
  }

  const handleCatLeave = () => {
    catTimeoutRef.current = setTimeout(() => setCatOpen(false), 300)
  }

  // Liquid Gloss Styling
  const textColor = isScrolled ? '#1A1A18' : '#FFFFFF'
  const navTitleStyle = { fontFamily: "'Cormorant Garamond', serif", color: textColor, letterSpacing: '0.2em' }
  const navLinkStyle = { fontFamily: "var(--font-mono)", color: textColor }

  const isLoaded = useUIStore((s) => s.isLoaded)

  return (
    <>
      {/* Global Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <div className="fixed inset-0 z-[300] flex flex-col items-center pt-[12vh] px-6 overflow-y-auto pb-20 custom-scrollbar bg-white/95 backdrop-blur-3xl" ref={overlayRef}>
            <div className="absolute inset-0 pointer-events-auto" onClick={() => setSearchOpen(false)} />

            <motion.div
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="relative w-full max-w-6xl pointer-events-auto z-10"
            >
              <button
                onClick={() => setSearchOpen(false)}
                className="absolute -right-8 -top-8 p-4 hover:bg-black/5 rounded-full transition-all text-black/30 hover:text-black z-50"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              <div className="relative mb-20 max-w-3xl mx-auto mt-20">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Find your silhouette..."
                  className="w-full bg-transparent border-b border-black/20 py-8 text-2xl sm:text-5xl text-black font-bebas outline-none placeholder:text-black/20 tracking-tighter transition-all focus:border-black/60 text-center uppercase"
                />
              </div>

              <div className="w-full" ref={resultsRef}>
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                      {filteredProducts.map((p, idx) => (
                        <div key={p.id} onClick={() => setSearchOpen(false)} className="relative">
                          <ProductCard product={p} index={idx} />
                        </div>
                      ))}
                    </div>
                ) : searchQuery.trim() ? (
                  <div className="flex flex-col items-center justify-center py-32 text-black/10">
                    <p className="font-mono text-sm tracking-[0.5em] uppercase animate-pulse">No pieces found</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center max-w-2xl mx-auto">
                    <p className="text-[10px] uppercase tracking-[0.5em] text-black/20 mb-10 font-mono">Curated Collections</p>
                    <div className="flex flex-wrap justify-center gap-5">
                      {['Linen', 'Heavy Cotton', 'Denim', 'Oversized', 'Essentials'].map(tag => (
                        <button
                          key={tag}
                          onClick={() => setSearchQuery(tag)}
                          className="px-8 py-4 rounded-3xl bg-black/[0.03] border border-black/10 text-[11px] font-mono tracking-widest uppercase text-black/40 hover:bg-black hover:text-white transition-all text-center"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[250] bg-[#FDFCF0] lg:hidden flex flex-col p-10 pt-32"
            ref={overlayRef}
          >
             <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute right-10 top-10 p-4 rounded-full border border-black/5 text-black/40 hover:text-black transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              <div className="flex flex-col gap-10">
                <p className="text-[10px] uppercase tracking-[0.6em] text-[#D97706] font-mono mb-6">Navigation</p>
                {['Shop', 'Categories', 'Contact', 'My Account'].map((link) => (
                  <div key={link} className="mobile-link overflow-hidden">
                    <Link 
                      href={`#${link.toLowerCase()}`} 
                      className="text-3xl sm:text-5xl font-light text-black tracking-tighter block pb-2 border-b border-black/5"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link}
                    </Link>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-20 border-t border-black/5">
                 <p className="text-[10px] uppercase tracking-[0.4em] text-black/20 font-mono mb-8">Quick Access</p>
                 <div className="flex flex-wrap gap-4">
                    {['IG', 'TW', 'PI', 'TH'].map(s => (
                       <a key={s} href="#" className="w-12 h-12 rounded-full border border-black/5 flex items-center justify-center text-[10px] font-bold text-black/40">{s}</a>
                    ))}
                 </div>
              </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-[165] px-4 sm:px-6 lg:px-8 py-5 pointer-events-none"
      >
        <AnimatePresence>
          {catOpen && (
            <motion.div
              initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
              exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
              className="fixed inset-0 bg-white/40 z-[-1] pointer-events-none"
            />
          )}
        </AnimatePresence>

        <nav
          className={`mx-auto w-full max-w-7xl relative flex justify-between items-center pointer-events-auto rounded-full transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${isScrolled
              ? 'px-10 py-3 liquid-glass-ios shadow-[0_20px_50px_rgba(0,0,0,0.05)]'
              : 'px-4 py-6 bg-transparent border border-transparent'
            }`}
        >
          <div className="relative z-30 flex w-full items-center justify-between">
            <Link
              href="/"
              onClick={(e) => {
                if (window.location.pathname === '/') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className={`tracking-[0.3em] font-bold pointer-events-auto transition-all duration-700 hover:opacity-60 ${isScrolled ? 'text-xl' : 'text-3xl'}`}
              style={navTitleStyle}
            >
              DRAPE
            </Link>

            <div className="hidden lg:flex flex-col items-center pointer-events-auto">
              <div className={`flex items-center transition-all duration-700 ${isScrolled ? 'gap-12' : 'gap-16'}`}>
                <Link href="#shop" className="text-[13px] uppercase tracking-[0.15em] font-mono hover:opacity-50 transition-opacity" style={navLinkStyle}>
                  Shop
                </Link>

                <div
                  className="relative group h-[50px] flex items-center"
                  onMouseEnter={handleCatEnter}
                  onMouseLeave={handleCatLeave}
                >
                  <button
                    className="flex items-center gap-2.5 text-[13px] uppercase tracking-[0.15em] font-mono hover:opacity-50 transition-opacity py-4"
                    style={navLinkStyle}
                  >
                    Categories
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
                      className={`transition-transform duration-700 ${catOpen ? 'rotate-180' : ''}`}>
                      <polyline points="6,9 12,15 18,9" />
                    </svg>
                  </button>

                  <AnimatePresence>
                    {catOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[680px] pointer-events-auto"
                      >
                        <div className="absolute top-0 inset-x-0 h-4" />

                        <div
                          ref={catMenuRef}
                          className="liquid-glass-ios p-10 rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.2)] overflow-hidden border border-white/10"
                        >
                          <div className="relative z-10 grid grid-cols-4 gap-8">
                            {categories.map((cat) => (
                              <div key={cat.name} className="flex flex-col">
                                <h4 className="cat-title text-[9px] tracking-[0.5em] uppercase mb-8 pb-3 border-b border-white/10 font-mono text-white/20 opacity-0 whitespace-nowrap">
                                  {cat.name}
                                </h4>
                                <ul className="space-y-4">
                                  {cat.sub.map((s) => (
                                    <li key={s}>
                                        <Link
                                          href={`/category/${s.toLowerCase().replace(/ /g, '-')}`}
                                          className="cat-link inline-block text-[13px] font-medium text-black/50 transition-all hover:text-black hover:translate-x-1.5 opacity-0 whitespace-nowrap"
                                          onClick={() => setCatOpen(false)}
                                        >
                                        {s}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link href="#contact" className="text-[13px] uppercase tracking-[0.15em] font-mono hover:opacity-50 transition-opacity" style={navLinkStyle}>
                  Contact
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setSearchOpen(true)}
                className={`flex items-center justify-center w-11 h-11 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 transition-all duration-500 hover:bg-white hover:text-black ${isScrolled ? 'scale-95' : 'scale-100'}`}
                style={{ color: textColor }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                </svg>
              </button>

              <button
                onClick={openCart}
                className={`flex items-center justify-center w-11 h-11 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 transition-all duration-500 hover:bg-white hover:text-black ${isScrolled ? 'scale-95' : 'scale-100'}`}
                style={{ color: textColor }}
              >
                <div className="relative">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  {count > 0 && (
                    <span className="absolute -top-1.5 -right-2 min-w-[18px] h-4.5 flex items-center justify-center bg-[#D97706] text-white text-[9px] font-bold rounded-full px-1.5 border border-[#D97706]/20 shadow-[0_2px_80px_rgba(217,119,6,0.3)]" style={{ fontFamily: "var(--font-mono)" }}>
                      {count}
                    </span>
                  )}
                </div>
              </button>

              <button
                onClick={() => setMobileMenuOpen(true)}
                className={`lg:hidden flex items-center justify-center w-11 h-11 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 transition-all duration-500 hover:bg-white hover:text-black ${isScrolled ? 'scale-95' : 'scale-100'}`}
                style={{ color: textColor }}
              >
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a2 2 0 0 1 2 2c0 1.1-.9 2-2 2s-2-.9-2-2a2 2 0 0 1 2-2z" />
                    <path d="m2 13 8.35-4.45a3.5 3.5 0 0 1 3.3 0L22 13c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2z" />
                    <path d="M12 6v3" />
                 </svg>
              </button>
            </div>
          </div>
        </nav>
      </motion.div>
    </>
  )
}
