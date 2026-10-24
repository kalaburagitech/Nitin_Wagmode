"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label, summary";

// A soft ring that trails the pointer and grows over interactive elements.
// Only mounts for fine pointers with motion allowed; the native cursor is
// never hidden, so nothing depends on it.
export default function CursorRing() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 450, damping: 35, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 450, damping: 35, mass: 0.6 });

  useEffect(() => {
    const query = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    const update = () => setEnabled(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;
    const onMove = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
      setActive(Boolean(event.target.closest?.(INTERACTIVE)));
    };
    const onLeave = () => setVisible(false);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none fixed left-0 top-0 z-[80] rounded-full border border-accent/70 transition-colors ${
        active ? "bg-accent/10" : "bg-transparent"
      }`}
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      animate={{
        width: active ? 44 : 22,
        height: active ? 44 : 22,
        opacity: visible ? 1 : 0,
      }}
      transition={{ duration: 0.18 }}
    />
  );
}
