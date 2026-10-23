// components/CustomCursor.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useTheme } from "./ThemeProvider";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { isDarkMode } = useTheme();
  
  // Cursor position with spring physics for smooth following
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  // Spring configurations for different parts of the cursor
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  // Trail positions (multiple dots following the cursor)
  const trailCount = 12;
  const trailPositions = useRef(Array(trailCount).fill({ x: 0, y: 0 }));
  const [trail, setTrail] = useState(Array(trailCount).fill({ x: 0, y: 0 }));
  
  // State to track current primary color
const [primaryColor, setPrimaryColor] = useState('#eab308');
const [primaryRgb, setPrimaryRgb] = useState('234, 179, 8');
  
  // Listen for primary color changes from CSS variables
  useEffect(() => {
    const updateColors = () => {
      const root = document.documentElement;
      
      // Get primary color from CSS variable
      const primaryVar = getComputedStyle(root).getPropertyValue('--primary').trim();
      const primaryRgbVar = getComputedStyle(root).getPropertyValue('--primary-rgb').trim();
      
      if (primaryVar) {
        setPrimaryColor(primaryVar);
      }
      
      if (primaryRgbVar) {
        setPrimaryRgb(primaryRgbVar);
      } else {
        // Fallback: extract RGB from hex color
        const hex = primaryVar || '#eab308';
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        setPrimaryRgb(`${r}, ${g}, ${b}`);
      }
    };
    
    // Update initially
    updateColors();
    
    // Watch for attribute changes on html element (data-primary changes)
    const observer = new MutationObserver(() => {
      updateColors();
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-primary', 'class']
    });
    
    // Also listen for custom event from ColorPicker
    window.addEventListener('primaryColorChanged', updateColors);
    
    return () => {
      observer.disconnect();
      window.removeEventListener('primaryColorChanged', updateColors);
    };
  }, []);
  
  // Get theme-based colors using CSS variables
  const getCursorColor = () => {
    // Use the CSS variable with appropriate opacity
    if (primaryRgb) {
      return `rgba(${primaryRgb}, 1)`;
    }
   return isDarkMode
  ? 'rgba(234, 179, 8, 1)'
  : 'rgba(234, 179, 8, 0.9)';
  };
  
  const getTrailColor = (opacity) => {
    if (primaryRgb) {
      return `rgba(${primaryRgb}, ${isDarkMode ? opacity : opacity * 0.8})`;
    }
    return isDarkMode ? `rgba(135, 80, 247, ${opacity})` : `rgba(135, 80, 247, ${opacity * 0.8})`;
  };
  
  const getRingColor = () => {
    if (primaryRgb) {
      return `rgba(${primaryRgb}, ${isDarkMode ? 0.5 : 0.4})`;
    }
    return isDarkMode ? 'rgba(135, 80, 247, 0.5)' : 'rgba(135, 80, 247, 0.4)';
  };
  
  const getGlowColor = () => {
    if (primaryRgb) {
      return `0 0 ${isHovering ? '15px' : '8px'} rgba(${primaryRgb}, ${isHovering ? 0.8 : 0.5})`;
    }
    return `0 0 ${isHovering ? '15px' : '8px'} ${getCursorColor()}`;
  };
  
  useEffect(() => {
    setMounted(true);
    
    // Check if device is touch-enabled (mobile)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
      // Don't initialize custom cursor on mobile devices
      return;
    }
    
    // Add global styles for cursor hiding
    const style = document.createElement('style');
    style.id = 'custom-cursor-styles';
    style.textContent = `
      /* Hide default cursor on desktop */
      html, body, * {
        cursor: none !important;
      }
      
      /* Show default cursor only on select elements for better UX */
      input, textarea, select {
        cursor: text !important;
      }
      
      /* Make sure custom cursor container is visible */
      .custom-cursor-container {
        display: block !important;
      }
    `;
    document.head.appendChild(style);
    
    // Force cursor to be visible initially
    setIsVisible(true);
    
    // Update cursor position on mouse move
    const updateCursorPosition = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      // Update trail positions
      trailPositions.current.unshift({ x: e.clientX, y: e.clientY });
      trailPositions.current.pop();
      setTrail([...trailPositions.current]);
    };
    
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    
    // Check for hoverable elements
    const handleMouseOver = (e) => {
      const isHoverable = e.target.closest('a, button, [role="button"], input, textarea, .hoverable, .btn-primary, .btn-secondary, .social-link');
      setIsHovering(!!isHoverable);
    };
    
    window.addEventListener('mousemove', updateCursorPosition);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      const styleElement = document.getElementById('custom-cursor-styles');
      if (styleElement) {
        styleElement.remove();
      }
    };
  }, [cursorX, cursorY]);
  
  // Don't render on server or mobile devices
  if (!mounted) return null;
  
  // Check if device is touch-enabled
  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  if (isTouchDevice) return null;
  
  return (
    <>
      {/* Main Container */}
      <div 
        className="custom-cursor-container fixed inset-0 pointer-events-none z-[99999]"
        style={{ 
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.2s ease'
        }}
      >
        {/* Trail Effect - String of dots */}
        {trail.map((pos, index) => {
          const size = Math.max(3, 6 - (index * 0.3));
          const opacity = Math.max(0.1, 0.6 - (index * 0.05));
          
          if (!pos.x || !pos.y) return null;
          
          return (
            <div
              key={index}
              className="absolute rounded-full"
              style={{
                left: pos.x,
                top: pos.y,
                width: size,
                height: size,
                backgroundColor: getTrailColor(opacity),
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
              }}
            />
          );
        })}
        
        {/* Main Cursor Dot */}
        <motion.div
          className="absolute rounded-full"
          style={{
            left: cursorXSpring,
            top: cursorYSpring,
            x: '-50%',
            y: '-50%',
            width: isClicking ? 6 : (isHovering ? 10 : 8),
            height: isClicking ? 6 : (isHovering ? 10 : 8),
            backgroundColor: getCursorColor(),
            boxShadow: getGlowColor(),
          }}
          animate={{
            scale: isClicking ? 0.8 : (isHovering ? 1.3 : 1),
          }}
          transition={{ 
            type: "spring", 
            stiffness: 500, 
            damping: 30,
            duration: 0.1 
          }}
        />
        
        {/* Outer Ring */}
        <motion.div
          className="absolute rounded-full"
          style={{
            left: cursorXSpring,
            top: cursorYSpring,
            x: '-50%',
            y: '-50%',
            width: 24,
            height: 24,
            border: `2px solid ${getRingColor()}`,
          }}
          animate={{
            scale: isClicking ? 0.8 : (isHovering ? 1.5 : 1),
            opacity: isHovering ? 0.8 : 0.4,
          }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 25,
            duration: 0.1 
          }}
        />
        
        {/* Magnetic Particles around cursor on hover */}
        {isHovering && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  left: cursorXSpring,
                  top: cursorYSpring,
                  x: '-50%',
                  y: '-50%',
                  width: 3,
                  height: 3,
                  backgroundColor: getCursorColor(),
                }}
                animate={{
                  x: [
                    '-50%',
                    `calc(-50% + ${Math.cos(i * 45 * Math.PI / 180) * 15}px)`,
                    '-50%',
                  ],
                  y: [
                    '-50%',
                    `calc(-50% + ${Math.sin(i * 45 * Math.PI / 180) * 15}px)`,
                    '-50%',
                  ],
                  scale: [0, 1, 0],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.1,
                  ease: "easeInOut"
                }}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
}