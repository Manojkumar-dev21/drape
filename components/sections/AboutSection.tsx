'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const stampRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      const h2 = headingRef.current
      if (h2) {
        gsap.fromTo(h2,
          { opacity: 0, y: 40, filter: 'blur(10px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.5,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: h2,
              start: 'top 85%',
            }
          }
        )
      }

      // Parallax effect for images
      const images = gsap.utils.toArray('.parallax-img')
      images.forEach((img: any) => {
        gsap.to(img, {
          y: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        })
      })

      // Card reveals
      const cards = gsap.utils.toArray('.about-card')
      gsap.fromTo(cards,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.2,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.about-grid-container',
            start: 'top 75%',
          }
        }
      )
      // Stamp scroll rotation
      if (stampRef.current) {
        gsap.to(stampRef.current, {
          rotation: 720,
          scale: 1.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          }
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="relative bg-[var(--cement)] py-32 sm:py-48 px-6 sm:px-12 lg:px-24 overflow-hidden">
      {/* Decorative Brand Texture */}
      <div className="absolute top-10 left-10 text-[10rem] sm:text-[18rem] font-bold text-black/[0.02] select-none pointer-events-none font-bebas leading-none">
        EST. 2026
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Editorial Heading */}
        <div className="max-w-4xl mb-24 sm:mb-32">
          <p className="text-[10px] uppercase tracking-[0.5em] text-[#D97706] mb-8 font-mono font-bold">
            Our Philosophy
          </p>
          <h2
            ref={headingRef}
            className="text-3xl sm:text-7xl lg:text-8xl text-black font-bold leading-[1.1] sm:leading-[1.05] tracking-tighter"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Garments that breathe, <br />
            <span className="italic pl-6 sm:pl-24">silhouettes that endure.</span>
          </h2>
        </div>

        {/* Asymmetrical Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-end about-grid-container">
          {/* Main Content Block */}
          <div className="lg:col-span-7 space-y-20">
            <div className="about-card space-y-10">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] border border-black/10 shadow-sm group">
                <Image
                  src="/about_interior.png" // Reusing asset for consistency
                  alt="Material study"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="parallax-img object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-700" />

                {/* Drape Stamp */}
                <div
                  ref={stampRef}
                  className="absolute top-6 right-6 w-24 h-24 sm:w-36 sm:h-36 pointer-events-none z-20 overflow-visible"
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* Background circle with glass effect */}
                    <div className="absolute inset-0 rounded-full bg-[#D97706] shadow-2xl border border-white/20 opacity-90" />

                    <svg viewBox="0 0 100 100" className="w-full h-full relative z-10">
                      <defs>
                        <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                      </defs>
                      <text className="text-[10px] uppercase font-bold tracking-[0.2em] fill-white/90">
                        <textPath xlinkHref="#circlePath">
                          Premium Quality • Drape Studio • Est. 2026 •
                        </textPath>
                      </text>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <span className="text-xl sm:text-2xl font-bebas text-white">DRAPE</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="max-w-xl">
                <h3 className="text-2xl sm:text-3xl text-black font-bold mb-6">The quietude of essentialism.</h3>
                <p className="text-lg text-black leading-relaxed font-light">
                  Every collection begins with a close reading of context — how fabric falls, where seams compress or open, and which textiles can bring elegance to everyday life. We design with restraint, allowing tone, texture, and proportion to create depth rather than ornament.
                </p>
              </div>
            </div>

            {/* Values Triptych */}
            <div className="about-card grid grid-cols-2 sm:grid-cols-3 gap-8 pt-12 border-t border-black/20">
              {[
                { id: 'I', title: 'Form', desc: 'Sartorial structures that respect the natural line.' },
                { id: 'II', title: 'Texture', desc: 'Raw silks and organic linens with tactile memory.' },
                { id: 'III', title: 'Rhythm', desc: 'A cadence of slow fashion and enduring value.' }
              ].map(v => (
                <div key={v.id} className="space-y-4">
                  <span className="text-[9px] font-mono font-bold text-[#D97706] tracking-tighter">{v.id}</span>
                  <h4 className="text-sm uppercase tracking-widest font-bold text-black">{v.title}</h4>
                  <p className="text-xs text-black/80 leading-relaxed tracking-wide">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Secondary Floating Block */}
          <div className="lg:col-span-5 space-y-16">
            <div className="about-card bg-white p-8 sm:p-16 rounded-[2rem] sm:rounded-[3rem] shadow-[0_40px_80px_rgba(0,0,0,0.05)] border border-black/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 text-black/5 font-bebas text-6xl rotate-12 transition-transform group-hover:rotate-0 duration-700">DRAPE</div>
              <p className="text-[13px] font-mono text-[#D97706] mb-8 uppercase tracking-[0.3em]">The Process</p>
              <p className="text-xl sm:text-2xl text-black font-bold leading-relaxed italic" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                "We don't create garments to be noticed, but to be felt. To be lived in. To be a second skin for the quiet confident."
              </p>
              <div className="mt-12 h-[1px] w-full bg-black/5" />
              <div className="mt-8 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-[10px] uppercase font-bold tracking-widest text-black/30">
                  DF
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-black/80">Drape Foundry</p>
                  <p className="text-[10px] text-black/40 font-mono">Creative Direction</p>
                </div>
              </div>
            </div>

            <div className="about-card aspect-square relative rounded-[2rem] overflow-hidden group border border-black/5">
              <Image
                src="/about_interior.png" // Reusing asset for variety
                alt="Craftsmanship"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="parallax-img object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#D97706]/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-white text-[10px] uppercase tracking-[0.5em] font-mono font-bold drop-shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                  Tactile Memory
                </p>
              </div>

              {/* Minimal Stamp Detail */}
              <div className="absolute top-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center animate-spin-slow">
                  <span className="text-[6px] text-white/50 uppercase tracking-tighter">Certified Crafted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
