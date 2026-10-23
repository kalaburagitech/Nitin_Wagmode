// components/ScrollToTop.jsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";
import { useTheme } from "@/components/ThemeProvider";

export default function ScrollToTopFooter() {
  const { isDarkMode } = useTheme();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { scrollYProgress } = useScroll();

  // Smooth spring animation for the progress
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    // Update progress value
    const unsubscribe = scaleX.on("change", (v) => {
      setProgress(v);
    });

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      unsubscribe();
    };
  }, [scaleX]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Calculate the fill percentage for the water effect
  const fillPercentage = Math.round(progress * 100);

  // Determine if it's mostly filled for styling
  const isMostlyFilled = fillPercentage > 80;

  // Water wave animation variants
  const waveVariants = {
    animate: {
      x: ["0%", "-8%", "0%"],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const bubbleVariants = {
    animate: (i) => ({
      y: [0, -30, -60, -90, -120],
      opacity: [0, 0.8, 0.6, 0.3, 0],
      scale: [0.8, 1.2, 1, 0.6, 0],
      transition: {
        duration: 4 + i * 0.5,
        repeat: Infinity,
        delay: i * 0.8,
        ease: "easeOut",
      },
    }),
  };

  const waterFlowVariants = {
    animate: {
      x: ["-100%", "100%"],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  return (
    <AnimatePresence>
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 group cursor-pointer"
          aria-label="Scroll to top"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Outer Glow Effect */}
          <motion.div
            className={`absolute inset-0 rounded-full blur-xl transition-opacity duration-300 ${
              isMostlyFilled
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-50"
            }`}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              background: `radial-gradient(circle, ${isDarkMode ? "rgba(var(--primary-rgb), 0.6)" : "rgba(var(--primary-rgb), 0.4)"} 0%, transparent 70%)`,
            }}
          />

          {/* Main Button Container */}
          <div className="relative w-14 h-14">
            {/* SVG Circle Progress */}
            <svg
              className="absolute inset-0 w-full h-full transform -rotate-90"
              viewBox="0 0 100 100"
            >
              {/* Background Circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={
                  isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
                }
                strokeWidth="8"
                className="transition-colors duration-300"
              />
              {/* Progress Circle with Primary Color */}
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="var(--primary)"
                strokeWidth="8"
                strokeLinecap="round"
                style={{
                  pathLength: scrollYProgress,
                  strokeDasharray: "1 1",
                }}
                className="transition-all duration-300"
              />
            </svg>

            {/* Inner Button Background */}
            <div
              className={`absolute inset-[6px] rounded-full overflow-hidden transition-all duration-300 ${
                isDarkMode ? "bg-gray-900" : "bg-white"
              } shadow-lg`}
            >
              {/* Water Filling Animation with Wave Effect */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 overflow-hidden"
                style={{
                  height: `${fillPercentage}%`,
                }}
                initial={{ height: "0%" }}
                animate={{ height: `${fillPercentage}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {/* Water Background - Using primary color */}
                <motion.div
                  className="absolute inset-0 bg-primary"
                  style={{
                    opacity: 0.85,
                  }}
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Water Waves - Using primary-3 for wave highlights */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0"
                  variants={waveVariants}
                  animate="animate"
                >
                  {/* Main Wave */}
                  <motion.svg
                    className="w-full h-8"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                    variants={waveVariants}
                    animate="animate"
                  >
                    <path
                      d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,80C1120,85,1280,75,1360,69.3L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
                      fill="rgba(var(--primary-rgb), 0.6)"
                    />
                  </motion.svg>

                  {/* Secondary Wave - Using primary-3 */}
                  <motion.svg
                    className="w-full h-6 -mt-4 opacity-60"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                    animate={{
                      x: ["-6%", "4%", "-6%"],
                    }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.4,
                    }}
                  >
                    <path
                      d="M0,96L80,90.7C160,85,320,75,480,74.7C640,75,800,85,960,90.7C1120,96,1280,96,1360,96L1440,96L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
                      fill="rgba(var(--primary-rgb), 0.5)"
                    />
                  </motion.svg>
                </motion.div>

                {/* Floating Bubbles */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    custom={i}
                    variants={bubbleVariants}
                    animate="animate"
                    className="absolute rounded-full bg-white/60 dark:bg-white/80"
                    style={{
                      width: `${3 + Math.random() * 6}px`,
                      height: `${3 + Math.random() * 6}px`,
                      left: `${10 + Math.random() * 80}%`,
                      bottom: "0%",
                      filter: "blur(0.5px)",
                    }}
                  />
                ))}

                {/* Water Flow Effect */}
                <motion.div
                  className="absolute inset-0 overflow-hidden"
                  variants={waterFlowVariants}
                  animate="animate"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                </motion.div>

                {/* Water Surface Sparkle */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  animate={{
                    opacity: [0.3, 0.8, 0.3],
                    scaleX: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="h-full w-full bg-gradient-to-r from-transparent via-primary-3 to-transparent" />
                </motion.div>
              </motion.div>

              {/* Water Droplets Effect */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                  background: [
                    "radial-gradient(circle at 30% 40%, rgba(135,80,247,0) 0%, rgba(135,80,247,0) 100%)",
                    "radial-gradient(circle at 30% 40%, rgba(135,80,247,0.1) 20%, rgba(135,80,247,0) 70%)",
                    "radial-gradient(circle at 30% 40%, rgba(135,80,247,0) 0%, rgba(135,80,247,0) 100%)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Water Ripple Effect */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  boxShadow: [
                    "inset 0 0 0px rgba(135,80,247,0)",
                    "inset 0 0 20px rgba(135,80,247,0.3)",
                    "inset 0 0 0px rgba(135,80,247,0)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* Arrow Icon with Water Drop Effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{
                  y: [0, -3, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <FaArrowUp
                  className={`w-5 h-5 transition-all duration-300 ${
                    fillPercentage > 50
                      ? "text-white"
                      : isDarkMode
                        ? "text-gray-400"
                        : "text-gray-600"
                  }`}
                />
              </motion.div>

              {/* Water Drop on Arrow */}
              {fillPercentage > 30 && (
                <motion.div
                  className="absolute -top-1 left-1/2 transform -translate-x-1/2"
                  animate={{
                    y: [0, -8, 0],
                    scale: [0.5, 1, 0.5],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: 0.5,
                  }}
                >
                  <div className="w-1 h-1 bg-primary-3 rounded-full" />
                </motion.div>
              )}
            </div>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
