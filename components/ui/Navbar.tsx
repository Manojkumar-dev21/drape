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
  { name: 'Tees',   sub: ['Graphic Tees', 'Essential Tees', 'Oversized Tees', 'Premium Cotton'] },
  { name: 'Shirts', sub: ['Button-Up Shirts', 'Overshirts', 'Oxford Shirts', 'Linen Shirts'] },
  { name: 'Pants',  sub: ['Cargo Shorts', 'Wide-Leg Pants', 'Chinos', 'Joggers'] },
  { name: 'Layers', sub: ['Jackets', 'Hoodies', 'Sweaters', 'Cardigans'] },
]

export default function Navbar() {
  const openCart = useUIStore((s) => s.openCart)
  const getCount = useCartStore((s) => s.getCount)
  const items = useCartStore((s) => s.items)
  
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

  useEffect(() => {
    setCount(getCount())
  }, [items, getCount])

  useEffect(() => {
    if (searchOpen) {
      document.body.style.overflow = 'hidden'
      setTimeout(() => searchInputRef.current?.focus(), 100)
      gsap.fromTo(overlayRef.current, 
        { backdropFilter: 'blur(0px)', backgroundColor: 'rgba(26,26,24,0)' },
        { backdropFilter: 'blur(60px)', backgroundColor: 'rgba(26,26,24,0.92)', duration: 1, ease: 'expo.out' }
      )
    } else {
      document.body.style.overflow = ''
      setSearchQuery('')
    }
  }, [searchOpen])

  useEffect(() => {
    if (catOpen && catMenuRef.current) {
      const q = gsap.utils.selector(catMenuRef.current)
      // Storytelling entrance
      gsap.fromTo(q('.cat-link'), 
        { opacity: 0, x: -15, filter: 'blur(8px)' },
        { opacity: 1, x: 0, filter: 'blur(0px)', stagger: 0.04, duration: 0.8, ease: 'power3.out', delay: 0.1 }
      )
      gsap.fromTo(q('.cat-title'),
        { opacity: 0, y: 10 },
        { opacity: 0.3, y: 0, stagger: 0.1, duration: 1, ease: 'power2.out' }
      )
    }
  }, [catOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearchOpen(false)
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
    if (resultsRef.current && filteredProducts.length > 0) {
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
  const textColor = '#000000'
  const navTitleStyle = { fontFamily: "var(--font-bebas)", color: textColor }
  const navLinkStyle = { fontFamily: "var(--font-mono)", color: textColor }

  return (
    <>
    {/* Global Search Overlay */}
    <AnimatePresence>
      {searchOpen && (
        <div className="fixed inset-0 z-[200] flex flex-col items-center pt-[12vh] px-6 overflow-y-auto pb-20 custom-scrollbar" ref={overlayRef}>
          <div className="absolute inset-0 pointer-events-auto" onClick={() => setSearchOpen(false)} />
          
          <motion.div 
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="relative w-full max-w-6xl pointer-events-auto z-10"
          >
            <div className="relative mb-20 max-w-3xl mx-auto">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Find your silhouette..."
                className="w-full bg-transparent border-b border-white/10 py-6 text-4xl sm:text-7xl text-white font-bebas outline-none placeholder:text-white/5 tracking-tighter transition-all focus:border-white/40 text-center uppercase"
              />
              <button 
                onClick={() => setSearchOpen(false)}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-3 hover:bg-white/10 rounded-full transition-all text-white/20 hover:text-white"
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="w-full" ref={resultsRef}>
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                  {filteredProducts.map((p, idx) => (
                    <div key={p.id} onClick={() => setSearchOpen(false)} className="relative">
                      <div className="absolute -inset-4 bg-white/[0.01] rounded-[2rem] blur-xl pointer-events-none" />
                      <ProductCard product={p} index={idx} />
                    </div>
                  ))}
                </div>
              ) : searchQuery.trim() ? (
                <div className="flex flex-col items-center justify-center py-32 text-white/10">
                   <p className="font-mono text-sm tracking-[0.5em] uppercase animate-pulse">No pieces found</p>
                </div>
              ) : (
                <div className="flex flex-col items-center max-w-2xl mx-auto">
                  <p className="text-[10px] uppercase tracking-[0.5em] text-white/20 mb-10 font-mono">Curated Collections</p>
                  <div className="flex flex-wrap justify-center gap-5">
                    {['Linen', 'Heavy Cotton', 'Denim', 'Oversized', 'Essentials'].map(tag => (
                      <button 
                        key={tag}
                        onClick={() => setSearchQuery(tag)}
                        className="px-8 py-4 rounded-3xl bg-white/[0.03] border border-white/10 text-[11px] font-mono tracking-widest uppercase text-white/40 hover:bg-white hover:text-black hover:scale-105 active:scale-95 transition-all text-center"
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

    <div className="fixed inset-x-0 top-0 z-[150] px-4 sm:px-6 lg:px-8 py-5 pointer-events-none">
      <nav
        className={`mx-auto w-full max-w-7xl relative flex justify-between items-center pointer-events-auto rounded-full transition-all duration-1000 cubic-bezier(0.23,1,0.32,1) ${
          isScrolled
            ? 'px-10 py-3 bg-white/20 backdrop-blur-[50px] backdrop-saturate-[1.8] border border-white/40'
            : 'px-4 py-6 bg-transparent border border-transparent'
        }`}
      >
        {isScrolled && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden"
          >
            {/* Liquid shine effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-white/5 to-transparent opacity-60" />
            <div className="absolute -inset-[100%] bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.4),transparent_50%)] opacity-30 animate-pulse" />
          </div>
        )}
        
        <div className="relative z-30 flex w-full items-center justify-between">
          <Link 
            href="/"
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
                          className="bg-white/90 backdrop-blur-[60px] p-12 rounded-[3.5rem] border border-black/5 shadow-[0_40px_100px_rgba(0,0,0,0.1)] overflow-hidden"
                        >
                          <div className="relative z-10 grid grid-cols-2 gap-16">
                            {categories.map((cat) => (
                              <div key={cat.name}>
                                <h4 className="cat-title text-[10px] tracking-[0.5em] uppercase mb-8 pb-3 border-b border-black/5 font-mono text-black/30 opacity-0">
                                  {cat.name}
                                </h4>
                                <ul className="space-y-5">
                                  {cat.sub.map((s) => (
                                    <li key={s}>
                                      <Link 
                                        href={`/category/${s.toLowerCase().replace(/ /g, '-')}`}
                                        className="cat-link inline-block text-[15px] font-medium text-black/60 transition-all hover:text-black hover:translate-x-2 opacity-0"
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

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className={`flex items-center justify-center w-12 h-12 rounded-full bg-black/[0.04] backdrop-blur-3xl border border-black/5 transition-all duration-500 hover:bg-black hover:text-white ${isScrolled ? 'scale-95' : 'scale-100'}`}
              style={{ color: textColor }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
              </svg>
            </button>

            <button
              onClick={openCart}
              className={`flex items-center justify-center w-12 h-12 rounded-full bg-black/[0.04] backdrop-blur-3xl border border-black/5 transition-all duration-500 hover:bg-black hover:text-white ${isScrolled ? 'scale-95' : 'scale-100'}`}
              style={{ color: textColor }}
            >
              <div className="relative">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                {count > 0 && (
                  <span className="absolute -top-1 -right-2 min-w-[18px] h-4.5 flex items-center justify-center bg-black text-white text-[9px] font-bold rounded-full px-1.5 border border-white/20" style={{ fontFamily: "var(--font-mono)" }}>
                    {count}
                  </span>
                )}
              </div>
            </button>
          </div>
        </div>
      </nav>
    </div>
    </>
  )
}
