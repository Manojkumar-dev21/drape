'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

interface StoryOverlaysProps {
  scrollProgress: number
}

interface TextBeat {
  id: string
  heading: string
  subtext: string
  position: 'center' | 'left' | 'right' | 'center-bottom'
  rangeStart: number
  rangeEnd: number
}

const beats: TextBeat[] = [
  {
    id: 'hero',
    heading: 'THE AMBER ERA.',
    subtext: 'A new era of sartorial sanctuary. Engineered for the modern silhouette.',
    position: 'center',
    rangeStart: 0,
    rangeEnd: 0.12,
  },
  {
    id: 'minimal',
    heading: 'SILK & CLAY.',
    subtext: 'Raw silk and creamy ochre. Silhouettes that breathe with the light.',
    position: 'center',
    rangeStart: 0.22,
    rangeEnd: 0.35,
  },
  {
    id: 'craft',
    heading: 'TACTILE RESTRAINT.',
    subtext: 'From organic linen to scorched amber. Values in every thread.',
    position: 'center',
    rangeStart: 0.55,
    rangeEnd: 0.68,
  },
  {
    id: 'cta',
    heading: 'Shop the collection.',
    subtext: 'Scroll back to explore.',
    position: 'center',
    rangeStart: 0.85,
    rangeEnd: 0.98,
  },
]

function getPositionClasses(position: string): string {
  switch (position) {
    case 'left':
      return 'items-start text-left pl-8 md:pl-16 lg:pl-24 pt-[12vh]'
    case 'right':
      return 'items-end text-right pr-8 md:pr-16 lg:pr-24 pt-[12vh]'
    case 'center-bottom':
      return 'items-center text-center pt-[10vh]'
    case 'center':
    default:
      return 'items-center justify-center text-center h-full pb-[10vh]'
  }
}

export default function StoryOverlays({ scrollProgress }: StoryOverlaysProps) {
  const [activeBeat, setActiveBeat] = useState<TextBeat | null>(null)
  const [displayBeat, setDisplayBeat] = useState<TextBeat | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Track which beat should be active based on scroll
  useEffect(() => {
    const nextBeat = beats.find(
      (b) => scrollProgress >= b.rangeStart && scrollProgress <= b.rangeEnd
    ) || null

    if (nextBeat?.id !== activeBeat?.id) {
      setActiveBeat(nextBeat)
    }
  }, [scrollProgress, activeBeat])

  // Handle animations when activeBeat changes
  useEffect(() => {
    if (activeBeat?.id === displayBeat?.id) return

    if (displayBeat && !activeBeat) {
      // Exit animation
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete: () => setDisplayBeat(null)
        })
      } else {
        setDisplayBeat(null)
      }
    } else if (!displayBeat && activeBeat) {
      // Enter animation
      setDisplayBeat(activeBeat)
    } else if (displayBeat && activeBeat) {
      // Crossfade
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          opacity: 0,
          y: -10,
          duration: 0.4,
          ease: 'power2.inOut',
          onComplete: () => setDisplayBeat(activeBeat)
        })
      } else {
        setDisplayBeat(activeBeat)
      }
    }
  }, [activeBeat])

  // Entrance animation when displayBeat is newly set
  useEffect(() => {
    if (displayBeat && contentRef.current) {
      const isHero = displayBeat.id === 'hero'
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 20, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: isHero ? 0.3 : 0,
          ease: 'expo.out'
        }
      )
    }
  }, [displayBeat])

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col" ref={containerRef}>
      {displayBeat && (
        <div
          ref={contentRef}
          className={`flex flex-col w-full h-full ${getPositionClasses(displayBeat.position)} transition-colors duration-700`}
        >
          <h1 className="text-4xl sm:text-7xl lg:text-9xl tracking-tight leading-none mb-6 font-bebas px-4 transition-colors duration-1000 text-white drop-shadow-md">
            {displayBeat.heading}
          </h1>
          <p className="text-[10px] sm:text-xs md:text-sm tracking-[0.3em] uppercase max-w-[260px] sm:max-w-none font-mono px-6 transition-colors duration-1000 text-white/80 drop-shadow-sm">
            {displayBeat.subtext}
          </p>
        </div>
      )}
    </div>
  )
}
