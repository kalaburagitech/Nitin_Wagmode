'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiDroplet } from 'react-icons/fi';

const colors = [
  { id: 'purple', color: '#8750f7' },
  { id: 'blue', color: '#3b82f6' },
  { id: 'pink', color: '#ec489a' },
  { id: 'green', color: '#10b981' },
  { id: 'yellow', color: '#eab308' },
  { id: 'orange', color: '#f97316' },
  { id: 'cyan', color: '#06b6d4' },
  { id: 'red', color: '#ef4444' },
];

export default function PremiumColorPicker() {
  const containerRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('yellow');

useEffect(() => {
  const saved = localStorage.getItem('primary-color');
  const defaultColor = saved || 'yellow';

  setActive(defaultColor);
  document.documentElement.setAttribute('data-primary', defaultColor);
}, []);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e) => {
      const el = containerRef.current;
      if (!el) return;
      if (!el.contains(e.target)) setOpen(false);
    };

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  // 🔥 FIXED: This is the function that actually runs when you click a color
  const changeColor = (id) => {
    setActive(id);
    document.documentElement.setAttribute('data-primary', id);
    localStorage.setItem('primary-color', id);
    
    // 🔥 CRITICAL: Dispatch custom event so the script updates status bar
    window.dispatchEvent(new Event('primaryColorChanged'));
    
    setTimeout(() => setOpen(false), 180);
  };

  // (Rest of your component remains the same)
  return (
    <div ref={containerRef} className="relative">
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.12, rotate: 8 }}
        whileTap={{ scale: 0.92 }}
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        className="z-50 p-3.5 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-primary/60"
        style={{
          background: 'linear-gradient(135deg, var(--primary), var(--primary-2))',
          boxShadow: '0 10px 30px rgba(var(--primary-rgb),0.45)',
        }}
        aria-label="Open color picker"
        aria-expanded={open}
      >
        <FiDroplet className="w-5 h-5" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -8, scale: 0.98, filter: 'blur(6px)' }}
            transition={{ type: 'spring', stiffness: 360, damping: 26 }}
            className="absolute right-0 top-[calc(100%+12px)] z-50 p-5 rounded-3xl w-[300px] origin-top-right"
            style={{
              backgroundColor: 'var(--bg-card)',
              backdropFilter: 'blur(22px)',
              border: '1px solid var(--border-2)',
              boxShadow: '0 24px 80px rgba(0,0,0,0.35)',
            }}
            role="dialog"
            aria-modal="false"
            aria-label="Color picker"
          >
            <h3
              className="text-center mb-6 tracking-widest text-sm opacity-80 select-none"
              style={{ color: 'var(--text-heading)' }}
            >
              CHOOSE COLOR
            </h3>
            <motion.div
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
              }}
              className="grid grid-cols-4 gap-5 justify-items-center"
            >
              {colors.map((item) => (
                <motion.div
                  key={item.id}
                  onClick={() => changeColor(item.id)}
                  whileHover={{ scale: 1.18, y: -2 }}
                  whileTap={{ scale: 0.92 }}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8, y: 6 },
                    show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 420, damping: 24 } },
                  }}
                  className="relative cursor-pointer"
                  role="button"
                  aria-label={`Select ${item.id} theme`}
                >
                  {active === item.id && (
                    <motion.div
                      layoutId="activeRing"
                      className="absolute -inset-2 rounded-full"
                      style={{
                        background: `radial-gradient(circle, ${item.color}55, transparent)`,
                      }}
                      transition={{ type: 'spring', stiffness: 520, damping: 34 }}
                    />
                  )}
                  {active === item.id && (
                    <motion.div
                      layoutId="borderRing"
                      className="absolute -inset-1 rounded-full border-2 border-white"
                      transition={{ type: 'spring', stiffness: 520, damping: 34 }}
                    />
                  )}
                  <motion.div
                    className="w-10 h-10 rounded-full"
                    style={{
                      background: item.color,
                      boxShadow: active === item.id
                        ? `0 0 20px ${item.color}, 0 0 40px ${item.color}66`
                        : '0 5px 15px rgba(0,0,0,0.5)',
                    }}
                    animate={active === item.id ? { scale: [1, 1.06, 1] } : { scale: 1 }}
                    transition={{ duration: 0.28 }}
                  />
                  {active === item.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ type: 'spring', stiffness: 450, damping: 26 }}
                      className="absolute inset-0 flex items-center justify-center text-white"
                    >
                      <FiCheck className="w-4 h-4 drop-shadow" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </motion.div>
            <p className="text-center text-xs mt-6" style={{ color: 'var(--text-muted)' }}>
              Select a color to apply instantly
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}