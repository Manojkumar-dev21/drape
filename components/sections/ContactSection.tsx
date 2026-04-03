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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading entrance
      gsap.from('.contact-reveal', {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      })

      // Form inputs staggered entrance
      if (formRef.current) {
        gsap.from(formRef.current.children, {
          opacity: 0,
          y: 20,
          stagger: 0.08,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 85%',
          }
        })
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
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: 'var(--dark)',
    fontFamily: "var(--font-dm)",
    fontSize: '14px',
    outline: 'none',
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full py-24 sm:py-32 px-5 sm:px-8 lg:px-12 overflow-hidden"
      style={{ background: 'var(--cement)' }}
    >
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-wood/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left — Info */}
          <div>
            <span
              className="contact-reveal inline-block text-[11px] tracking-[0.3em] uppercase mb-5 px-5 py-2 rounded-full font-bold font-mono"
              style={{
                color: 'var(--wood)',
                border: '1px solid rgba(197,160,89,0.25)',
                background: 'rgba(197,160,89,0.08)',
              }}
            >
              Get in Touch
            </span>

            <h2 className="contact-reveal text-4xl sm:text-5xl lg:text-[4rem] leading-[1.05] mb-8 text-white font-bebas uppercase tracking-tight">
              Let's start a <span className="text-wood">conversation.</span>
            </h2>

            <p className="contact-reveal text-sm sm:text-base leading-relaxed mb-12 max-w-sm text-white/50 font-light">
              Questions about our collections, wholesale inquiries, or just want to say hello? We'd love to hear from you.
            </p>

            <div className="contact-reveal space-y-8">
              {[
                { label: 'Email', value: 'hello@drape.in', href: 'mailto:hello@drape.in' },
                { label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210' },
                { label: 'Studio', value: 'Coimbatore, Tamil Nadu', href: '#' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4 border-l border-white/5 pl-5">
                  <span
                    className="text-[9px] tracking-[0.2em] uppercase mt-1 w-12 shrink-0 font-mono text-white/30"
                  >
                    {item.label}
                  </span>
                  <a
                    href={item.href}
                    className="text-base text-white transition-opacity hover:opacity-100 opacity-70"
                  >
                    {item.value}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div className="relative">
            <form onSubmit={handleSubmit} ref={formRef} className="space-y-5">
              <div>
                <label
                  className="block text-[10px] tracking-[0.3em] uppercase mb-3 ml-1 font-mono text-wood/60"
                >
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-5 py-4 rounded-2xl transition-all focus:ring-1 focus:ring-wood/30"
                  style={inputStyle}
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label
                  className="block text-[10px] tracking-[0.3em] uppercase mb-3 ml-1 font-mono text-wood/60"
                >
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-5 py-4 rounded-2xl transition-all focus:ring-1 focus:ring-wood/30"
                  style={inputStyle}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label
                  className="block text-[10px] tracking-[0.3em] uppercase mb-3 ml-1 font-mono text-wood/60"
                >
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-5 py-4 rounded-2xl transition-all focus:ring-1 focus:ring-wood/30 resize-none"
                  style={{ ...inputStyle, minHeight: '160px' }}
                  placeholder="Tell us what's on your mind..."
                  required
                />
              </div>

              <button
                type="submit"
                className="ios-liquid-btn w-full py-5 rounded-full text-[13px] tracking-[0.25em] font-bold uppercase transition-all hover:scale-[1.01] active:scale-[0.98]"
                style={{
                  fontFamily: "var(--font-mono)",
                }}
              >
                {submitted ? '✓ Message Sent' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}


