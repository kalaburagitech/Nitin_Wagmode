"use client";

import { motion } from "framer-motion";

// Fades content up once as it scrolls into view. With reduced motion,
// MotionConfig (ThemeProvider) drops the transform and keeps a plain fade.
export default function Reveal({ as = "div", delay = 0, className, children }) {
  const Component = motion[as] ?? motion.div;
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}
