'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import StoryOverlays from './StoryOverlays'

gsap.registerPlugin(ScrollTrigger)

const TOTAL_FRAMES = 192

function getFramePath(i: number) {
  return `/frames/${String(i + 1).padStart(5, '0')}.png`
}

export default function BoutiqueScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const [loaded, setLoaded] = useState(false)
  const [loadProgress, setLoadProgress] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Preload frames
  useEffect(() => {
    let count = 0
    const images: HTMLImageElement[] = []

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image()
      img.src = getFramePath(i)
      img.onload = () => {
        count++
        setLoadProgress(Math.round((count / TOTAL_FRAMES) * 100))
        if (count === TOTAL_FRAMES) setLoaded(true)
      }
      img.onerror = () => {
        count++
        if (count === TOTAL_FRAMES) setLoaded(true)
      }
      images[i] = img
    }

    imagesRef.current = images
  }, [])

  const drawFrame = useCallback((idx: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const img = imagesRef.current[idx]
    if (!ctx || !img || !img.complete) return

    const dpr = window.devicePixelRatio || 1
    const w = window.innerWidth
    const h = window.innerHeight

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr
      canvas.height = h * dpr
    }

    const coverScale = Math.max(
      canvas.width / img.naturalWidth,
      canvas.height / img.naturalHeight
    )

    const x = (canvas.width - img.naturalWidth * coverScale) / 2
    const y = (canvas.height - img.naturalHeight * coverScale) / 2

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, x, y, img.naturalWidth * coverScale, img.naturalHeight * coverScale)
  }, [])

  useEffect(() => {
    if (!loaded || !containerRef.current || !canvasRef.current) return

    const obj = { frame: 0 }
    
    // Initial draw
    drawFrame(0)

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        setScrollProgress(self.progress)
        const frame = Math.round(self.progress * (TOTAL_FRAMES - 1))
        if (frame !== obj.frame) {
          obj.frame = frame
          requestAnimationFrame(() => drawFrame(frame))
        }
      }
    })

    return () => st.kill()
  }, [loaded, drawFrame])


  return (
    <>
      {/* Loading Screen */}
      {!loaded && (
        <div className="fixed inset-0 flex flex-col items-center justify-center z-50 text-center"
          style={{ background: 'var(--cement)' }}>
          <div className="w-8 h-8 rounded-full border border-white/10 border-t-white/80 animate-spin mb-6 mx-auto" />
          <p className="tracking-[0.2em] uppercase"
            style={{ fontFamily: "var(--font-mono)", color: 'var(--dark)', opacity: 0.5, fontSize: '11px' }}>
            Loading DRAPE… {loadProgress}%
          </p>
        </div>
      )}

      {/* 400vh Scroll Container */}
      <div className="relative" ref={containerRef} style={{ height: '400vh' }}>

        {/* Sticky Canvas Wrapper */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <canvas
            ref={canvasRef}
            className="w-full h-full block"
            style={{ background: 'var(--cement)' }}
          />

          {/* Vignette Overlay (Requested previously: blends edges with cement bg) */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, transparent 40%, rgba(26, 26, 24, 0.4) 75%, var(--cement) 100%)',
            }}
          />

          {/* Story Text Overlays */}
          <StoryOverlays scrollProgress={scrollProgress} />
        </div>
      </div>
    </>
  )
}
