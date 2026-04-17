'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { Product } from '@/lib/products'
import { useCartStore } from '@/store/cartStore'
import { useUIStore } from '@/store/uiStore'
import BlurText from '@/components/ui/BlurText'

interface ProductCardProps {
  product: Product
  index: number
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const addItem = useCartStore((s) => s.addItem)
  const openCart = useUIStore((s) => s.openCart)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    cardRef.current.style.transform =
      `perspective(800px) rotateX(${y * -8}deg) rotateY(${x * 8}deg) translateZ(4px)`
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    cardRef.current.style.transform =
      'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
  }

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      color: product.colors[0].name,
      size: 'M',
      quantity: 1,
      image: product.images[0],
    })
    openCart()
  }

  return (
    <div
      ref={cardRef}
      className="group cursor-pointer transition-transform duration-300 ease-out"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        animationDelay: `${index * 80}ms`,
      }}
    >
      {/* Image */}
      <div
        className="relative aspect-4/5 overflow-hidden rounded-2xl bg-stone/20"
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-500" />

        {/* Sale badge */}
        {product.comparePrice && (
          <span
            className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] tracking-widest uppercase"
            style={{
              fontFamily: "'DM Mono', monospace",
              background: '#D97706',
              color: '#FDFCF0',
            }}
          >
            Sale
          </span>
        )}

        {/* Shine effect overlay */}
        <div className="absolute inset-0 card-shine opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>

      {/* Info */}
      <div className="mt-5 px-1 flex flex-col flex-grow">
        <div className="flex items-center gap-1.5 mb-2.5">
          {product.colors.map((c) => (
            <span
              key={c.name}
              className="w-3.5 h-3.5 rounded-full border border-black/5 shadow-sm"
              style={{ background: c.hex }}
              title={c.name}
            />
          ))}
        </div>
        <BlurText
          text={product.name}
          className="text-base font-medium mb-1.5 tracking-tight text-[#1A1A18]"
          delay={50}
          animateBy="words"
          direction="bottom"
        />
        <div className="flex items-center gap-2.5 mb-6">
          <span
            className="text-sm font-semibold tracking-wide"
            style={{ color: '#D97706' }}
          >
            ₹{product.price.toLocaleString()}
          </span>
          {product.comparePrice && (
            <span
              className="text-xs line-through opacity-40 font-normal text-[#1A1A18]"
            >
              ₹{product.comparePrice.toLocaleString()}
            </span>
          )}
        </div>
 
        {/* Quick Add Button - Now at bottom */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleAddToCart()
          }}
          className="btn-minimal-amber w-full py-4 rounded-xl text-[11px] tracking-[0.2em] font-bold uppercase transition-all duration-300"
          style={{
            fontFamily: "var(--font-mono)",
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}
