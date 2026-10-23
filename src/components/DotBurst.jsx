"use client";

import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";

function mulberry32(seed) {
  let t = seed >>> 0;
  return function rand() {
    t += 0x6d2b79f5;
    let x = Math.imul(t ^ (t >>> 15), 1 | t);
    x ^= x + Math.imul(x ^ (x >>> 7), 61 | x);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

export default function DotBurst({ seed = 1, onDone }) {
  const dots = useMemo(() => {
    const rand = mulberry32(Number(seed) || 1);
    const count = 10;
    return Array.from({ length: count }, () => {
      const angle = rand() * Math.PI * 2;
      const distance = 14 + rand() * 14;
      const size = 2 + rand() * 2.5;
      const delay = rand() * 0.05;
      return {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        size,
        delay,
      };
    });
  }, [seed]);

  useEffect(() => {
    if (!onDone) return undefined;
    const t = window.setTimeout(onDone, 520);
    return () => window.clearTimeout(t);
  }, [onDone]);

  return (
    <span className="absolute inset-0 pointer-events-none">
      {dots.map((d, i) => (
        <motion.span
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          className="absolute left-1/2 top-1/2 rounded-full"
          style={{
            width: `${d.size}px`,
            height: `${d.size}px`,
            backgroundColor: "rgba(var(--primary-rgb), 0.9)",
            boxShadow: "0 0 10px rgba(var(--primary-rgb), 0.45)",
            transform: "translate(-50%, -50%)",
          }}
          initial={{ x: 0, y: 0, opacity: 0, scale: 0.6 }}
          animate={{
            x: d.x,
            y: d.y,
            opacity: [0, 1, 0],
            scale: [0.6, 1, 0.9],
          }}
          transition={{
            delay: d.delay,
            duration: 0.48,
            ease: "easeOut",
          }}
        />
      ))}
    </span>
  );
}

