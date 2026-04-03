'use client'

import { useEffect, useRef } from 'react'
import { products } from '@/lib/products'
import ProductCard from './ProductCard'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ProductGrid() {
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(headerRef.current?.children || [], 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          stagger: 0.15, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
          }
        }
      )

      // Grid items staggered entrance
      if (gridRef.current) {
        gsap.fromTo(gridRef.current.children,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
            }
          }
        )
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="shop"
      className="relative w-full py-24 sm:py-32 px-5 sm:px-8 lg:px-12"
      style={{ background: 'var(--cement)' }}
    >
      <div
        className="absolute inset-x-0 top-0 h-32"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), transparent)' }}
      />

      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-col items-center mb-16 sm:mb-20" ref={headerRef}>
          <span className="inline-block text-[11px] tracking-[0.4em] uppercase mb-4 px-4 py-1.5 rounded-full border border-white/10 text-white/50 font-mono">
            The Collection
          </span>
          <h2 className="text-5xl sm:text-7xl lg:text-8xl tracking-tight text-center text-white drop-shadow-sm font-bebas">
            Shop DRAPE
          </h2>
          <div className="w-16 h-[1px] mt-8 bg-white/20" />
        </div>

        <div 
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 sm:gap-x-6 gap-y-10 sm:gap-y-12"
        >
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>

      <div
        className="absolute inset-x-0 bottom-0 h-24"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.1))' }}
      />
    </section>
  )
}
