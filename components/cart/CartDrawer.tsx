'use client'

import { useUIStore } from '@/store/uiStore'
import { useCartStore } from '@/store/cartStore'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function CartDrawer() {
  const isOpen = useUIStore((s) => s.isCartOpen)
  const closeCart = useUIStore((s) => s.closeCart)
  const items = useCartStore((s) => s.items)
  const removeItem = useCartStore((s) => s.removeItem)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const getTotal = useCartStore((s) => s.getTotal)
  const getCount = useCartStore((s) => s.getCount)

  const [total, setTotal] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    setTotal(getTotal())
    setCount(getCount())
  }, [items, getTotal, getCount])

  // Lock body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-0 h-full w-full max-w-[480px] flex flex-col bg-[#FDFCF0] text-black overflow-hidden shadow-2xl border-l border-black/5"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-10 py-10">
              <div className="flex flex-col gap-1">
                <h2 className="text-3xl font-light tracking-[0.2em] uppercase" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Your Bag
                </h2>
                <span className="text-[10px] tracking-[0.4em] uppercase text-black/30 font-mono">
                  {count} {count === 1 ? 'Silhouette' : 'Silhouettes'}
                </span>
              </div>
              <button
                onClick={closeCart}
                className="group relative w-12 h-12 flex items-center justify-center rounded-full border border-black/10 transition-all hover:bg-black hover:text-white"
                aria-label="Close cart"
              >
                <span className="relative z-10 text-xl font-light">×</span>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-10 py-4 custom-scrollbar">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
                  <div className="w-20 h-20 rounded-full border border-black/5 flex items-center justify-center opacity-10">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                    </svg>
                  </div>
                  <p className="text-sm tracking-[0.2em] uppercase text-black/20 font-mono italic">
                    The bag is currently empty
                  </p>
                  <button
                    onClick={closeCart}
                    className="px-10 py-4 rounded-full border border-black/10 text-[11px] uppercase tracking-[0.3em] font-mono hover:bg-black hover:text-white transition-all text-black"
                  >
                    Return to Shop
                  </button>
                </div>
              ) : (
                <div className="space-y-12">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-8 group">
                      {/* Image */}
                      <div className="relative w-32 h-40 bg-stone/20 rounded-2xl overflow-hidden shrink-0 border border-black/5 transition-transform group-hover:scale-[1.02]">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="128px"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-center gap-1.5">
                        <div className="flex justify-between items-start">
                          <h4 className="text-lg font-light tracking-wide text-black/90" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                            {item.name}
                          </h4>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 -mr-2 text-black/20 hover:text-black/60 transition-colors"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        <p className="text-[10px] tracking-widest text-black/30 uppercase font-mono mb-4">
                          {item.color} / {item.size}
                        </p>

                        <div className="flex items-center justify-between mt-auto">
                          {/* Quantity selector */}
                          <div className="flex items-center rounded-full border border-black/10 px-4 py-1.5">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center text-lg text-black/40 hover:text-black transition-colors"
                            >
                              −
                            </button>
                            <span className="w-10 text-center text-xs font-mono font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center text-lg text-black/40 hover:text-black transition-colors"
                            >
                              +
                            </button>
                          </div>

                          <span className="text-lg font-light tracking-wide text-black/80">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-10 pt-8 pb-12 bg-white/60 backdrop-blur-xl border-t border-black/5 space-y-8">
                <div className="flex justify-between items-end">
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] tracking-[0.4em] uppercase text-black/20 font-mono">
                      Subtotal
                    </span>
                    <span className="text-3xl font-light tracking-wide">
                      ₹{total.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-[10px] tracking-widest text-black/20 font-mono italic">
                    VAT Included
                  </p>
                </div>

                <button className="ios-liquid-btn w-full py-6 text-[11px] uppercase tracking-[0.4em] font-bold transition-all hover:brightness-110 active:scale-[0.98] bg-[#D97706] text-white rounded-full shadow-[0_20px_40px_rgba(217,119,6,0.15)]">
                  Checkout Silhouette
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
