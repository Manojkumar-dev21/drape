'use client'

import { useUIStore } from '@/store/uiStore'
import { useCartStore } from '@/store/cartStore'
import { useEffect, useState } from 'react'
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

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-60">
      {/* Backdrop */}
      <div
        className="absolute inset-0 fade-in"
        style={{ background: 'rgba(26,26,24,0.4)', backdropFilter: 'blur(4px)' }}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className="absolute right-0 top-0 h-full w-full max-w-md flex flex-col slide-in-right"
        style={{ background: '#F0ECE4' }}
      >
        {/* Header */}
        <div
          className="flex justify-between items-center px-6 py-5"
          style={{ borderBottom: '1px solid rgba(26,26,24,0.08)' }}
        >
          <div className="flex items-center gap-3">
            <h2
              className="text-lg tracking-widest"
              style={{ fontFamily: "'Cormorant Garamond', sans-serif", color: '#1A1A18' }}
            >
              Cart
            </h2>
            <span
              className="text-[11px] tracking-wider"
              style={{ fontFamily: "'DM Mono', monospace", color: 'rgba(26,26,24,0.4)' }}
            >
              ({count} {count === 1 ? 'item' : 'items'})
            </span>
          </div>
          <button
            onClick={closeCart}
            className="w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-black/5"
            aria-label="Close cart"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A1A18" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(26,26,24,0.15)" strokeWidth="1">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              <p
                className="mt-4 text-sm"
                style={{ color: 'rgba(26,26,24,0.4)' }}
              >
                Your cart is empty
              </p>
              <button
                onClick={closeCart}
                className="ios-liquid-btn mt-4 text-xs tracking-[0.15em] uppercase px-6 py-2.5 rounded-md transition-opacity hover:opacity-80"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  color: '#1A1A18',
                }}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4"
                  style={{ borderBottom: '1px solid rgba(26,26,24,0.06)', paddingBottom: '1.5rem' }}
                >
                  {/* Image */}
                  <div
                    className="relative w-20 h-24 rounded-md overflow-hidden shrink-0"
                    style={{ background: '#C8C4BC' }}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h4
                      className="text-sm font-medium mb-1 truncate"
                      style={{ color: 'rgba(26,26,24,0.85)' }}
                    >
                      {item.name}
                    </h4>
                    <p
                      className="text-xs mb-3"
                      style={{ fontFamily: "'DM Mono', monospace", color: 'rgba(26,26,24,0.4)' }}
                    >
                      {item.color} / {item.size}
                    </p>

                    <div className="flex items-center justify-between">
                      {/* Quantity */}
                      <div
                        className="flex items-center rounded-md overflow-hidden"
                        style={{ border: '1px solid rgba(26,26,24,0.1)' }}
                      >
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-sm transition-colors hover:bg-black/5"
                          style={{ color: 'rgba(26,26,24,0.5)' }}
                        >
                          −
                        </button>
                        <span
                          className="w-8 h-7 flex items-center justify-center text-xs"
                          style={{ fontFamily: "'DM Mono', monospace", color: '#1A1A18' }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-sm transition-colors hover:bg-black/5"
                          style={{ color: 'rgba(26,26,24,0.5)' }}
                        >
                          +
                        </button>
                      </div>

                      {/* Price + Remove */}
                      <div className="flex items-center gap-3">
                        <span
                          className="text-sm font-medium"
                          style={{ color: 'rgba(26,26,24,0.75)' }}
                        >
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-xs transition-opacity hover:opacity-60"
                          style={{ color: 'rgba(26,26,24,0.3)' }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <polyline points="3,6 5,6 21,6" />
                            <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2v2" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div
            className="px-6 py-5"
            style={{ borderTop: '1px solid rgba(26,26,24,0.08)' }}
          >
            <div className="flex justify-between items-center mb-4">
              <span
                className="text-xs tracking-[0.15em] uppercase"
                style={{ fontFamily: "'DM Mono', monospace", color: 'rgba(26,26,24,0.4)' }}
              >
                Subtotal
              </span>
              <span
                className="text-lg font-medium"
                style={{ color: '#1A1A18' }}
              >
                ₹{total.toLocaleString()}
              </span>
            </div>
            <p
              className="text-[11px] mb-4 text-center"
              style={{ fontFamily: "'DM Mono', monospace", color: 'rgba(26,26,24,0.3)' }}
            >
              Shipping calculated at checkout
            </p>
            <button
              className="ios-liquid-btn w-full py-3.5 rounded-md text-xs tracking-[0.2em] uppercase font-medium transition-all hover:opacity-90 active:scale-[0.98]"
              style={{
                fontFamily: "'DM Mono', monospace",
                color: '#1A1A18',
              }}
            >
              Checkout — ₹{total.toLocaleString()}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
