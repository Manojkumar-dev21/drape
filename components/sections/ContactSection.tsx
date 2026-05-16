'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text reveal for heading
      const h2 = headingRef.current
      if (h2) {
        const words = h2.innerText.split(' ')
        h2.innerHTML = words.map(w => `<span class="inline-block overflow-hidden"><span class="inline-block translate-y-full">${w}</span></span>`).join(' ')

        gsap.to(h2.querySelectorAll('span span'), {
          y: 0,
          stagger: 0.03,
          duration: 1.8,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: h2,
            start: 'top 90%',
          }
        })
      }

      // Staggered reveals for info and form
      const reveals = gsap.utils.toArray('.contact-reveal')
      gsap.fromTo(reveals,
        { opacity: 0, y: 40, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          stagger: 0.1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      )

      if (formRef.current) {
        gsap.fromTo(formRef.current.children,
          { opacity: 0, scale: 0.98, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            stagger: 0.1,
            duration: 1.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: formRef.current,
              start: 'top 85%',
            }
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setFormData({ name: '', email: '', message: '' })
  }

  const inputStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.4)',
    border: '1px solid rgba(0, 0, 0, 0.08)',
    color: 'black',
    fontFamily: "var(--font-dm)",
    fontSize: '14px',
    outline: 'none',
  }

  const DoodleIcon = ({ name, className }: { name: string, className?: string }) => {
    switch (name) {
      case 'dress':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
            <path d="M12 4L16 6L18 20H6L8 6L12 4Z" />
            <path d="M8 6C8 6 10 7 12 7C14 7 16 6 16 6" />
          </svg>
        )
      case 'backpack':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
            <rect x="6" y="8" width="12" height="12" rx="2" />
            <path d="M9 8V6C9 4.3 10.3 3 12 3C13.7 3 15 4.3 15 6V8" />
            <path d="M6 12H18" />
          </svg>
        )
      case 'sunglasses':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
            <circle cx="7" cy="12" r="3" />
            <circle cx="17" cy="12" r="3" />
            <path d="M10 12H14" />
            <path d="M4 12L3 10" />
            <path d="M20 12L21 10" />
          </svg>
        )
      case 'hat':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className={className}>
            <path d="M4 18H20" />
            <path d="M6 18V12C6 8.7 8.7 6 12 6C15.3 6 18 8.7 18 12V18" />
            <rect x="3" y="17" width="18" height="2" rx="1" />
          </svg>
        )
      default: return null
    }
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full py-24 sm:py-48 px-6 sm:px-12 lg:px-24 overflow-hidden"
      style={{ background: 'var(--cement)' }}
    >
      {/* Doodle Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] overflow-hidden -z-0">
        <div className="absolute top-[10%] left-[5%] rotate-12 animate-pulse"><DoodleIcon name="dress" className="w-32 h-32" /></div>
        <div className="absolute top-[15%] right-[10%] -rotate-12"><DoodleIcon name="backpack" className="w-40 h-40" /></div>
        <div className="absolute bottom-[20%] left-[15%] rotate-45 animate-pulse"><DoodleIcon name="sunglasses" className="w-24 h-24" /></div>
        <div className="absolute bottom-[10%] right-[20%] -rotate-6"><DoodleIcon name="hat" className="w-36 h-36" /></div>

        <div className="absolute top-[40%] left-[25%] -rotate-12 opacity-50"><DoodleIcon name="dress" className="w-16 h-16" /></div>
        <div className="absolute top-[60%] right-[30%] rotate-3 opacity-50"><DoodleIcon name="backpack" className="w-20 h-20" /></div>
        <div className="absolute top-[80%] left-[40%] -rotate-45 opacity-50"><DoodleIcon name="hat" className="w-14 h-14" /></div>
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">

          {/* Left — Editorial Info */}
          <div className="space-y-16">
            <div>
              <p className="contact-reveal text-[10px] uppercase tracking-[0.5em] text-[#D97706] mb-8 font-mono font-bold">
                Get in Touch
              </p>
              <h2
                ref={headingRef}
                className="text-4xl sm:text-7xl lg:text-8xl text-black font-light leading-[1.05] tracking-tight mb-12"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Let's start a <br />
                <span className="italic pl-12 sm:pl-20 text-[#D97706]">conversation.</span>
              </h2>
              <p className="contact-reveal text-lg text-black/80 leading-relaxed font-light max-w-md">
                Questions about our collections, bespoke inquiries, or a simple greeting — our doors are always open to the discerning.
              </p>
            </div>

            {/* Info Triptych (Styled like About) */}
            <div className="grid gap-12 pt-16 border-t border-black/10">
              {[
                {
                  id: 'E',
                  label: 'Email',
                  value: 'hello@drape.in',
                  href: 'mailto:hello@drape.in',
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  )
                },
                {
                  id: 'P',
                  label: 'Phone',
                  value: '+91 98765 43210',
                  href: 'tel:+919876543210',
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  )
                },
                {
                  id: 'S',
                  label: 'Studio',
                  value: 'Coimbatore, TN',
                  href: '#',
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
                    </svg>
                  )
                },
              ].map((item) => (
                <div key={item.label} className="contact-reveal flex items-start gap-12 group">
                  <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-[#D97706] bg-white/50 group-hover:bg-[#D97706] group-hover:text-white transition-all duration-500">
                    {item.icon}
                  </div>
                  <div>
                    <span className="block text-[9px] tracking-[0.4em] uppercase mb-2 font-mono font-bold text-black/30">
                      {item.label}
                    </span>
                    <a
                      href={item.href}
                      className="text-xl sm:text-2xl text-black font-medium transition-all hover:text-[#D97706] hover:translate-x-2 inline-block"
                    >
                      {item.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Refined Form */}
          <div className="relative">
            <div className="bg-white/40 backdrop-blur-3xl p-8 sm:p-16 rounded-[2.5rem] sm:rounded-[4rem] border border-black/5 shadow-[0_40px_100px_rgba(0,0,0,0.03)] group transition-all duration-1000 hover:bg-white/60">
              <form onSubmit={handleSubmit} ref={formRef} className="space-y-8">
                <div className="space-y-3">
                  <label className="block text-[10px] tracking-[0.3em] uppercase ml-1 font-bold font-mono text-black/40">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-8 py-5 rounded-[2rem] transition-all focus:ring-1 focus:ring-[#D97706]/30 hover:border-black/20"
                    style={inputStyle}
                    placeholder="Enter name"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-[10px] tracking-[0.3em] uppercase ml-1 font-bold font-mono text-black/40">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-8 py-5 rounded-[2rem] transition-all focus:ring-1 focus:ring-[#D97706]/30 hover:border-black/20"
                    style={inputStyle}
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-[10px] tracking-[0.3em] uppercase ml-1 font-bold font-mono text-black/40">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-8 py-5 rounded-[2rem] transition-all focus:ring-1 focus:ring-[#D97706]/30 hover:border-black/20 resize-none"
                    style={{ ...inputStyle, minHeight: '180px' }}
                    placeholder="Tell us what's on your mind..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="ios-liquid-btn w-full py-6 rounded-full text-[12px] tracking-[0.3em] font-bold uppercase transition-all hover:scale-[1.01] active:scale-[0.98] mt-4"
                  style={{
                    fontFamily: "var(--font-mono)",
                    background: '#D97706',
                    color: 'white',
                    boxShadow: '0 20px 40px rgba(217,119,6,0.15)'
                  }}
                >
                  {submitted ? '✓ Message Received' : 'Dispatch Message'}
                </button>
              </form>
            </div>

            {/* Decorative Element */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#D97706]/10 blur-[80px] rounded-full pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  )
}
