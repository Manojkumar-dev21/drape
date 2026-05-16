"use client";

import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue, useVelocity, useTransform } from 'framer-motion';

const CustomCursor = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // High-fidelity spring physics (liquid feel)
  const springConfig = { damping: 30, stiffness: 350, mass: 0.6 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Velocity-based distortion (the "moving" liquid effect)
  const xVelocity = useVelocity(mouseX);
  const yVelocity = useVelocity(mouseY);
  
  // Create a squash/stretch effect based on how fast the cursor is moving
  const scaleX = useTransform(xVelocity, [-3000, 0, 3000], [1.3, 1, 1.3]);
  const scaleY = useTransform(yVelocity, [-3000, 0, 3000], [0.7, 1, 0.7]);
  const rotate = useTransform(xVelocity, [-3000, 3000], [-15, 15]);

  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('[role="button"]')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block overflow-hidden">
      {/* 1. The Liquid Glass "Lens" (with distortion) */}
      <motion.div
        className="absolute top-0 left-0 w-12 h-12 rounded-full border border-white/30 flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorX,
          y: cursorY,
          scaleX,
          scaleY,
          rotate,
          scale: isHovered ? 2.2 : 1,
          backdropFilter: 'blur(8px) saturate(2.2) contrast(1.1)',
          WebkitBackdropFilter: 'blur(8px) saturate(2.2) contrast(1.1)',
          background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15), rgba(255,255,255,0.05) 60%, transparent)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2), inset 0 0 1px rgba(255,255,255,0.4)',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
      >
        {/* Subtle Lens crosshair (Camera aesthetic) */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-2 right-2 h-[0.5px] bg-white" />
          <div className="absolute left-1/2 top-2 bottom-2 w-[0.5px] bg-white" />
        </div>
      </motion.div>
      
      {/* 2. The Inner Luminous Precision Dot */}
      <motion.div
        className="absolute top-0 left-0 w-1.5 h-1.5 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorX,
          y: cursorY,
          scale: isHovered ? 0.4 : 1,
          boxShadow: '0 0 12px rgba(255,255,255,0.8)',
        }}
      />

      {/* 3. Outer "Aura" Glow (Follows with more weight) */}
      <motion.div
        className="absolute top-0 left-0 w-64 h-64 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none mix-blend-soft-light opacity-20"
        style={{
          x: cursorX,
          y: cursorY,
          background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 60%)',
        }}
      />
    </div>
  );
};

export default CustomCursor;
