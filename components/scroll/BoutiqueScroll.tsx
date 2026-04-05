'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { AnimatePresence, motion } from 'framer-motion'
import StoryOverlays from './StoryOverlays'
import LoadingScreen from '@/components/ui/LoadingScreen'
import { useUIStore } from '@/store/uiStore'

gsap.registerPlugin(ScrollTrigger)

const TOTAL_FRAMES = 192
const INITIAL_THRESHOLD = 48 // Progress enough for initial interaction (25%)

function getFramePath(i: number) {
  return `/frames/${String(i + 1).padStart(5, '0')}.png`
}

export default function BoutiqueScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const [isAssetsLoaded, setIsAssetsLoaded] = useState(false)
  const [isAnimationFinished, setIsAnimationFinished] = useState(false)
  const [loadProgress, setLoadProgress] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Advanced preloading with background continuation
  const loadingStarted = useRef(false)
  useEffect(() => {
    if (loadingStarted.current) return
    loadingStarted.current = true

    let loadedCount = 0
    const images: HTMLImageElement[] = []
    
    // Prioritize first batch for fast entry
    const loadBatch = (start: number, end: number) => {
      for (let i = start; i < end; i++) {
        const img = new Image()
        img.src = getFramePath(i)
        img.onload = () => {
          loadedCount++
          const realProgress = Math.round((loadedCount / TOTAL_FRAMES) * 100)
          
          // Adaptive loading: Finish transition when initial batch is ready
          if (loadedCount >= INITIAL_THRESHOLD && !isAssetsLoaded) {
             setIsAssetsLoaded(true)
          }
          
          setLoadProgress(realProgress)
        }
        img.onerror = () => {
          loadedCount++
        }
        images[i] = img
      }
    }

    // Load everything in one pass but track the threshold
    loadBatch(0, TOTAL_FRAMES)
    imagesRef.current = images
  }, [isAssetsLoaded])

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

  // Update drawFrame(0) as soon as assets are ready to prevent flash
  useEffect(() => {
    if (isAssetsLoaded && imagesRef.current.length > 0) {
      drawFrame(0)
    }
  }, [isAssetsLoaded, drawFrame])

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current || !imagesRef.current.length) return

    const obj = { frame: 0 }
    
    // Initial draw (redundant but safe)
    drawFrame(0)

    let st: ScrollTrigger | null = null

    const createST = () => {
      if (!containerRef.current) return
      st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5, // Smoother scrub for better perception
        onUpdate: (self) => {
          setScrollProgress(self.progress)
          const frame = Math.round(self.progress * (TOTAL_FRAMES - 1))
          if (frame !== obj.frame) {
            obj.frame = frame
            requestAnimationFrame(() => drawFrame(frame))
          }
        }
      })
    }

    createST()

    return () => {
      if (st) st.kill()
    }
  }, [isAnimationFinished, drawFrame])


  const setLoaded = useUIStore((s) => s.setLoaded)
  const isLoaded = useUIStore((s) => s.isLoaded)

  const handleLoadingComplete = () => {
    setIsAnimationFinished(true)
    setLoaded(true)
  }

  // Force finish if things take too long (UX failsafe)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isAssetsLoaded && loadProgress > 10) {
        setIsAssetsLoaded(true)
      }
    }, 6000) // 6s failsafe
    return () => clearTimeout(timer)
  }, [isAssetsLoaded, loadProgress])

  return (
    <>
      <AnimatePresence>
        {(!isAnimationFinished || !isAssetsLoaded) && (
          <LoadingScreen
            progress={isAssetsLoaded ? 100 : loadProgress}
            onComplete={handleLoadingComplete}
          />
        )}
      </AnimatePresence>

      <div
        className="relative"
        ref={containerRef}
        style={{
          height: '400vh',
        }}
      >
        <motion.div 
          className="sticky top-0 h-screen w-full overflow-hidden bg-[#F9F7F2]"
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ 
            scale: isAnimationFinished ? 1 : 1.05, 
            opacity: isAssetsLoaded ? 1 : 0 
          }}
          transition={{ 
            scale: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
            opacity: { duration: 0.8, ease: "easeInOut" }
          }}
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full block"
            style={{ background: 'var(--cement)' }}
          />

          {/* Story Text Overlays */}
          <StoryOverlays scrollProgress={scrollProgress} />
        </motion.div>
      </div>
    </>
  )
}
