'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'

interface LoadingScreenProps {
  progress: number
  onComplete: () => void
}

export default function LoadingScreen({ progress, onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    if (progress === 100) {
      setIsExiting(true)
      animateExit()
    }
  }, [progress])

  // Initial Entrance Animation
  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(textRef.current, 
        { opacity: 0, scale: 0.7, letterSpacing: '0.8em', y: 0 },
        { opacity: 1, scale: 1, letterSpacing: '0.4em', y: 0, duration: 1.0, ease: "expo.out" }
      )
    }
  }, [])

  const animateExit = () => {
    if (!textRef.current || !containerRef.current) return

    const tl = gsap.timeline()

    // Cinematic zoom in through letters - slightly faster for snappier feel
    tl.to(textRef.current, {
      scale: 120, 
      opacity: 0,
      filter: 'blur(30px)',
      duration: 0.7,
      ease: "expo.in"
    })

    // Reveal main site EARLIER in the timeline
    tl.add(() => onComplete(), "-=0.3")

    // Zoom the entire screen slightly for immersive expansion
    tl.to(containerRef.current, {
      scale: 1.1,
      duration: 1.3,
      ease: "power2.inOut"
    }, "-=0.7")

    // Reveal content through fading background
    tl.to(containerRef.current, {
      backgroundColor: 'transparent',
      duration: 0.6,
      ease: "power2.inOut"
    }, "-=0.6")

    // Final fade out - faster
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: "none"
    }, "-=0.4")
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[1000] flex flex-col items-center justify-center overflow-hidden pointer-events-none"
      style={{ background: '#FDFCF0' }}
    >
      <div className="flex flex-col items-center justify-center gap-16 md:gap-24 relative z-10">
        {/* Logo with cinematic scale entrance */}
        <h1
          ref={textRef}
          className="text-[#1A1A18] text-4xl sm:text-7xl md:text-[11rem] font-light tracking-[0.4em] select-none text-center leading-none opacity-0"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            willChange: 'transform, opacity, filter',
            transformOrigin: 'center center'
          }}
        >
          DRAPE
        </h1>

        {/* Progress System - Dynamically spaced to ensure perfect alignment */}
        <div className="h-20 flex flex-col items-center justify-start">
          <AnimatePresence>
            {!isExiting && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center"
              >
                <div className="w-48 md:w-64 h-[1px] bg-black/10 overflow-hidden mb-6">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "linear" }}
                    className="h-full bg-black/40"
                  />
                </div>
                <p className="text-[10px] uppercase tracking-[0.4em] text-black/30 font-mono">
                  {Math.round(progress)}%
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Background grain texture (Inline SVG) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      {/* Subtle depth vignette */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(255,255,255,0.4)]" />
    </div>
  )
}
