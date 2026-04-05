'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Footer() {
  const drapeFooterRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (drapeFooterRef.current) {
      gsap.fromTo(drapeFooterRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: drapeFooterRef.current,
            start: 'top 95%',
            end: 'bottom top',
          }
        }
      )
    }
  }, [])

  return (
    <footer
      className="w-full py-12 sm:py-20 px-6 sm:px-12 lg:px-24"
      style={{
        background: 'var(--cement)',
      }}
    >
      <div className="max-w-[1800px] mx-auto overflow-hidden">
        {/* Massive Cinematic Logo with Fade & Loop */}
        <div className="w-full mb-16 sm:mb-24 relative">
          <h2
            ref={drapeFooterRef}
            className="text-[12vw] sm:text-[14vw] font-bold text-black leading-[0.8] tracking-[0.5em] select-none text-center transform scale-x-110 pl-[0.5em] opacity-0"
            style={{ 
              fontFamily: "var(--font-bebas)",
              maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)'
            }}
          >
            DRAPE
          </h2>
          
          <div className="mt-12 flex overflow-hidden whitespace-nowrap opacity-20 hover:opacity-50 transition-opacity duration-700">
             <div className="flex animate-marquee text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] sm:tracking-[0.6em] font-bold">
               {[1,2,3,4].map(i => (
                 <div key={i} className="flex items-center">
                    <span className="mx-8">High Fashion</span>
                    <span className="text-lg">✧</span>
                    <span className="mx-8">Elite Sanctuary</span>
                    <span className="text-lg">❈</span>
                    <span className="mx-8">Sartorial Restraint</span>
                    <span className="text-lg">✧</span>
                    <span className="mx-8">Timeless Silk</span>
                    <span className="text-lg">❈</span>
                 </div>
               ))}
             </div>
          </div>
        </div>

        {/* Separator Line */}
        <div className="w-full h-[1px] bg-black/10 mb-16 sm:mb-24" />

        {/* Info & Links Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

          {/* Brand Philosophy - Column 1-5 */}
          <div className="lg:col-span-5 space-y-10">
            <p className="text-xl sm:text-2xl lg:text-3xl font-light text-black/80 leading-relaxed max-w-xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Let's bring your silhouette into the future — whether you need breathable textures, seamless organic linens, or elite sartorial restraint, <span className="text-[#D97706] italic">we're ready.</span>
            </p>
            <div className="flex gap-4 pt-4">
              {['IG', 'TW', 'PI'].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="w-12 h-12 rounded-full flex items-center justify-center text-[10px] font-bold tracking-widest border border-black/10 hover:bg-[#D97706] hover:text-white hover:border-[#D97706] transition-all duration-500"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns - Column 6-12 */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-8">
            {/* Sitemap */}
            <div className="space-y-6">
              <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#D97706] font-mono">Sitemap</h4>
              <ul className="space-y-4">
                {['Home', 'About', 'Products', 'Collection', 'Contact'].map(item => (
                  <li key={item}>
                    <Link href={item === 'Home' ? '/' : `#${item.toLowerCase()}`} className="text-sm text-black/60 hover:text-black transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-6">
              <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#D97706] font-mono">Services</h4>
              <ul className="space-y-4">
                {['Custom Fit', 'Material Study', 'AI Styling', 'Global Logistics', 'Repair Lab'].map(item => (
                  <li key={item}>
                    <Link href="#" className="text-sm text-black/60 hover:text-black transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div className="space-y-6">
              <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#D97706] font-mono">Social</h4>
              <ul className="space-y-4">
                {['Instagram', 'Twitter', 'LinkedIn', 'Pinterest', 'Threads'].map(item => (
                  <li key={item}>
                    <Link href="#" className="text-sm text-black/60 hover:text-black transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div className="space-y-6">
              <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#D97706] font-mono">Resources</h4>
              <ul className="space-y-4">
                {['Size Guide', 'Fabric Care', 'Philosophy', 'Sustainability', 'FAQ'].map(item => (
                  <li key={item}>
                    <Link href="#" className="text-sm text-black/60 hover:text-black transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Metadata */}
        <div className="mt-32 pt-12 border-t border-black/5 flex flex-col items-center gap-10">
          {/* Payment Cluster - Same Brand Color (Amber) */}
          <div className="flex items-center gap-8 text-[#D97706] opacity-60 hover:opacity-100 transition-all duration-700">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.112 8.262L5.97 15.758H3.92L2.374 9.775c-.094-.368-.175-.503-.461-.658C1.447 8.864.677 8.627 0 8.479l.046-.217h3.3a.904.904 0 01.894.764l.817 4.338 2.018-5.102zm8.033 5.049c.008-1.979-2.736-2.088-2.717-2.972.006-.269.262-.555.822-.628a3.66 3.66 0 011.913.336l.34-1.59a5.207 5.207 0 00-1.814-.333c-1.917 0-3.266 1.02-3.278 2.479-.012 1.079.963 1.68 1.698 2.04.756.367 1.01.603 1.006.931-.005.504-.602.725-1.16.734-.975.015-1.54-.263-1.992-.473l-.351 1.642c.453.208 1.289.39 2.156.398 2.037 0 3.37-1.006 3.377-2.564m5.061 2.447H24l-1.565-7.496h-1.656a.883.883 0 00-.826.55l-2.909 6.946h2.036l.405-1.12h2.488zm-2.163-2.656l1.02-2.815.588 2.815zm-8.16-4.84l-1.603 7.496H8.34l1.605-7.496z" />
            </svg>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.343 18.031c.058.049.12.098.181.146-1.177.783-2.59 1.238-4.107 1.238C3.32 19.416 0 16.096 0 12c0-4.095 3.32-7.416 7.416-7.416 1.518 0 2.931.456 4.105 1.238-.06.051-.12.098-.165.15C9.6 7.489 8.595 9.688 8.595 12c0 2.311 1.001 4.51 2.748 6.031zm5.241-13.447c-1.52 0-2.931.456-4.105 1.238.06.051.12.098.165.15C14.4 7.489 15.405 9.688 15.405 12c0 2.31-1.001 4.507-2.748 6.031-.058.049-.12.098-.181.146 1.177.783 2.588 1.238 4.107 1.238C20.68 19.416 24 16.096 24 12c0-4.094-3.32-7.416-7.416-7.416zM12 6.174c-.096.075-.189.15-.28.231C10.156 7.764 9.169 9.765 9.169 12c0 2.236.987 4.236 2.551 5.595.09.08.185.158.28.232.096-.074.189-.152.28-.232 1.563-1.359 2.551-3.359 2.551-5.595 0-2.235-.987-4.236-2.551-5.595-.09-.08-.184-.156-.28-.231z" />
            </svg>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z" />
            </svg>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.436 0l-11.91 7.773-1.174 4.276 6.625-4.297L11.65 24h4.391l6.395-24zM14.26 10.098L3.389 17.166 1.564 24h9.008l3.688-13.902Z" />
            </svg>
          </div>

          {/* Centered Minimalist Copyright - Dark Text */}
          <div className="flex flex-col items-center gap-6">
            <p className="text-[10px] text-black font-bold tracking-[0.4em] font-mono uppercase">
              © 2026 DRAPE. ARCHITECTED FOR THE DISCERNING.
            </p>

            <div className="flex items-center gap-4 opacity-60 hover:opacity-100 transition-opacity duration-500">
              <span className="text-[8px] tracking-[0.5em] font-bold uppercase font-mono text-[#1A1A18]">DESIGNED BY XYBERFLOW</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
