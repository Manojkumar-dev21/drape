'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      const words = headingRef.current?.innerText.split(' ')
      if (headingRef.current && words) {
        headingRef.current.innerHTML = words.map(w => `<span class="inline-block overflow-hidden"><span class="inline-block translate-y-full">${w}</span></span>`).join(' ')
        
        gsap.to(headingRef.current.querySelectorAll('span span'), {
          y: 0,
          stagger: 0.02,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
          }
        })
      }

      // Sidebar text and rail
      gsap.from('.about-rail', {
        height: 0,
        duration: 1.5,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      })

      // Grid items entrance
      gsap.from('.about-grid-item', {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-grid-container',
          start: 'top 80%',
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="relative border-b border-black/5 bg-[#F8F7F4] overflow-hidden">
      {/* subtle atmospheric wash */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(197,160,89,0.08),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(0,0,0,0.03),transparent_26%)]">
        </div>
      </div>

      <div className="relative max-w-[1380px] mx-auto grid lg:grid-cols-[0.34fr_1fr]">

        {/* Left Rail */}
        <div className="border-b lg:border-b-0 lg:border-r border-black/5 px-6 sm:px-8 lg:px-10 py-12 lg:py-16 relative">
          <div className="about-rail absolute right-0 top-0 w-[1px] bg-black/5 hidden lg:block" />
          
          <div className="lg:sticky lg:top-32">
            <div
              className="inline-flex items-center gap-3 text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-black/60 mb-8 font-mono"
            >
              <span className="inline-block h-[6px] w-[6px] rounded-full bg-wood"></span>
              Philosophy
            </div>

            <p className="max-w-[14rem] text-[13px] leading-7 text-black/50 font-light about-grid-item">
              A sartorial language shaped by drape, proportion, and textiles that soften beautifully over time.
            </p>
          </div>
        </div>

        {/* Right Content */}
        <div className="px-6 sm:px-8 lg:px-14 py-14 sm:py-16 lg:py-20">
          <div className="max-w-[980px]">
            <h2 
              ref={headingRef}
              className="text-black tracking-[-0.04em] leading-[1.04] text-[2.2rem] sm:text-[2.8rem] md:text-[3.4rem] lg:text-[4.2rem] font-bebas uppercase"
            >
              We believe in garments that breathe — silhouettes that remove the unnecessary and reveal the emotional clarity of the wearer.
            </h2>

            <div 
              className="mt-10 lg:mt-12 grid md:grid-cols-[1fr_0.9fr] gap-10 lg:gap-14 items-start pt-8 border-t border-stone/10 about-grid-container"
            >
              <div className="space-y-6 about-grid-item">
                <p className="text-[15px] sm:text-[16px] leading-8 text-black/70 font-light">
                  Every collection begins with a close reading of context — how fabric falls, where seams compress or open, and which textiles can bring elegance to everyday life. We design with restraint, allowing tone, texture, and proportion to create depth rather than ornament.
                </p>

                <p className="text-[15px] sm:text-[16px] leading-8 text-black/70 font-light">
                  The result is not minimalism for its own sake, but a quieter form of luxury: wardrobes that feel composed, deeply tactile, and enduringly personal.
                </p>

                <div className="pt-4 grid sm:grid-cols-3 gap-5">
                  <div className="border-t border-black/5 pt-4">
                    <p className="text-[10px] uppercase tracking-[0.14em] text-wood mb-2 font-mono">01</p>
                    <p className="text-[13px] leading-6 text-black">Form as structure</p>
                  </div>

                  <div className="border-t border-black/5 pt-4">
                    <p className="text-[10px] uppercase tracking-[0.14em] text-wood mb-2 font-mono">02</p>
                    <p className="text-[13px] leading-6 text-black">Textiles with memory</p>
                  </div>

                  <div className="border-t border-black/5 pt-4">
                    <p className="text-[10px] uppercase tracking-[0.14em] text-wood mb-2 font-mono">03</p>
                    <p className="text-[13px] leading-6 text-black">Restraint over excess</p>
                  </div>
                </div>
              </div>

              {/* Image Block */}
              <div className="group relative about-grid-item">
                <div className="relative overflow-hidden bg-[#ebe5dc] min-h-[420px] lg:min-h-[500px] rounded-2xl">
                  <img
                    src="/about_interior.png"
                    alt="Warm interior material palette"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                  />

                  <div
                    className="absolute inset-5 sm:inset-6 border border-white/30 transition-all duration-500 group-hover:border-white/50 z-10 rounded-xl" />

                  <div className="absolute left-5 right-5 bottom-5 sm:left-6 sm:right-6 sm:bottom-6 z-20">
                    <div
                      className="border border-white/20 bg-white/10 backdrop-blur-md px-5 py-5 transition-all duration-500 group-hover:bg-white/20 rounded-xl">
                      <p
                        className="text-[10px] uppercase tracking-[0.14em] text-white/50 mb-2 group-hover:text-white transition-colors duration-300 font-mono"
                      >
                        Material Study
                      </p>
                      <h3 className="text-xl leading-snug text-white font-bebas tracking-wide">
                        Raw silk, organic linen, and natural tones
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
