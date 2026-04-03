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
    heading: 'DRAPE.',
    subtext: 'A narrative of form and fabric. Engineered for the modern silhouette.',
    position: 'center',
    rangeStart: 0,
    rangeEnd: 0.12,
  },
  {
    id: 'minimal',
    heading: 'Built for the minimal.',
    subtext: 'Every thread, intentional.',
    position: 'center',
    rangeStart: 0.22,
    rangeEnd: 0.35,
  },
  {
    id: 'craft',
    heading: 'See inside the craft.',
    subtext: 'Layered. Considered. Yours.',
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
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const nextBeat = beats.find(
      (b) => scrollProgress >= b.rangeStart && scrollProgress <= b.rangeEnd
    ) || null

    if (nextBeat?.id !== activeBeat?.id) {
      if (activeBeat && !nextBeat) {
        // Exit animation
        gsap.to(contentRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete: () => setActiveBeat(null)
        })
      } else if (!activeBeat && nextBeat) {
        // Enter animation
        setActiveBeat(nextBeat)
        gsap.fromTo(contentRef.current, 
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
        )
      } else if (activeBeat && nextBeat) {
        // Crossfade
        gsap.to(contentRef.current, {
          opacity: 0,
          y: -10,
          duration: 0.4,
          ease: 'power2.inOut',
          onComplete: () => {
            setActiveBeat(nextBeat)
            gsap.fromTo(contentRef.current,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
            )
          }
        })
      }
    }
  }, [scrollProgress, activeBeat])

  return (
    <div className="fixed inset-0 pointer-events-none z-10 flex flex-col" ref={containerRef}>
      {activeBeat && (
        <div 
          ref={contentRef}
          className={`flex flex-col w-full h-full ${getPositionClasses(activeBeat.position)} transition-colors duration-700`}
        >
          <h1 className="text-6xl lg:text-9xl tracking-tight leading-none mb-4 text-white drop-shadow-2xl font-bebas">
            {activeBeat.heading}
          </h1>
          <p className="text-[12px] sm:text-sm tracking-[0.3em] uppercase text-white/80 max-w-[300px] sm:max-w-none font-mono">
            {activeBeat.subtext}
          </p>
        </div>
      )}
    </div>
  )
}
