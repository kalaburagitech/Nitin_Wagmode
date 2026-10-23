"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";
import { motion } from "framer-motion";

const HeaderBanner = ({ title, subtitle, backgroundImage }) => {
  const { isDarkMode } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Wait for component to mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Dynamic styles based on theme with smooth transitions
  const overlayColor = isDarkMode
    ? "bg-gradient-to-r from-black/80 via-black/60 to-black/80"
    : "bg-gradient-to-r from-black/60 via-black/40 to-black/60";

  const linkColor = isDarkMode ? "text-gray-300" : "text-gray-200";
  const linkHoverColor = isDarkMode ? "hover:text-white" : "hover:text-primary";
  const arrowColor = isDarkMode ? "text-white" : "text-primary";
  const titleColor = isDarkMode ? "text-white" : "text-white";
  const subtitleColor = isDarkMode ? "text-gray-300" : "text-gray-200";

  const bgImage = backgroundImage || "/assets/breadcrumb-bg.jpg";

  // Function to scroll to next section
  const scrollToNextSection = () => {
    const nextSection = document.getElementById('about') || document.querySelector('section:not(.header-banner)');
    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const particleVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i) => ({
      opacity: [0, 0.5, 0],
      scale: [0, 1, 0],
      y: [0, -50, -100],
      x: [0, Math.sin(i) * 30, Math.cos(i) * 30],
      transition: {
        duration: 3 + i * 0.2,
        repeat: Infinity,
        delay: i * 0.3,
        ease: "easeOut",
      },
    }),
  };

  // Don't render animations until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <section
        className="relative bg-cover bg-center overflow-hidden header-banner pt-16 sm:pt-20 lg:pt-24 min-h-[240px] sm:min-h-[280px] lg:min-h-[320px]"
        style={{
          backgroundImage: `url('${bgImage}')`,
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className={`absolute inset-0 ${overlayColor}`} />
        <div className="container-custom relative z-10 w-full py-10 sm:py-12 lg:py-14">
          <div className="text-center">
            <h1 className={`text-3xl md:text-5xl lg:text-8xl xl:text-7xl font-bold ${titleColor} mb-4 select-none`}>
              {title}
            </h1>
            {subtitle && (
              <p className={`text-base md:text-lg lg:text-xl ${subtitleColor} mb-6 max-w-2xl mx-auto`}>
                {subtitle}
              </p>
            )}
            <div className="flex items-center justify-center gap-2 md:gap-3 text-base md:text-lg">
              <Link href="/" className={`${linkColor} ${linkHoverColor} transition-all duration-300 inline-flex items-center gap-1`}>
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Home</span>
              </Link>
              <span className={`${arrowColor} text-base md:text-lg font-light`}>
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
              <span className={`${titleColor} font-semibold relative inline-block`}>
                {title}
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      className="relative bg-cover bg-red-600 bg-center overflow-hidden header-banner pt-10 sm:pt-20 lg:pt-24 min-h-[240px] sm:min-h-[280px] lg:min-h-[320px]"
      style={{
        backgroundImage: `url('${bgImage}')`,
        display: "flex",
        alignItems: "center",
      }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Dynamic Overlay with Theme Transition */}
      <motion.div
        className={`absolute inset-0 ${overlayColor} transition-all duration-500`}
        animate={{
          background: isDarkMode
            ? "linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.6), rgba(0,0,0,0.8))"
            : "linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.4), rgba(0,0,0,0.6))"
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Animated Gradient Overlay */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(135,80,247,0.22) 0%, transparent 55%)",
            "radial-gradient(circle at 80% 50%, rgba(135,80,247,0.22) 0%, transparent 55%)",
            "radial-gradient(circle at 20% 50%, rgba(135,80,247,0.22) 0%, transparent 55%)",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating Particles with Theme Colors - Reduced count for performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={particleVariants}
            initial="hidden"
            animate="visible"
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 10 + 2}px`,
              height: `${Math.random() * 10 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: isDarkMode
                ? `rgba(135,80,247, ${0.08 + Math.random() * 0.12})`
                : `rgba(135,80,247, ${0.12 + Math.random() * 0.18})`,
              filter: "blur(1px)",
            }}
          />
        ))}
      </div>

      {/* Shimmer Effect - Only on larger screens for performance */}
      <motion.div
        className="absolute inset-0 hidden lg:block pointer-events-none"
        animate={{
          x: ["-100%", "100%"],
          opacity: [0, 0.15, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: 1,
          ease: "easeInOut",
        }}
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
          transform: "skewX(-20deg)",
        }}
      />

      <div className="container-custom relative z-10 w-full py-8 sm:py-10 lg:py-12">
        <div className="text-center">
          {/* Title with Theme Transition */}
          <motion.h1
            variants={itemVariants}
            className={`text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold ${titleColor} mb-4 select-none transition-colors duration-300`}
          >
            {title.split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: Math.min(index * 0.02, 0.5), // Cap the delay
                  duration: 0.3,
                  ease: "easeOut"
                }}
                className="inline-block hover:text-primary transition-colors duration-300"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.h1>

          {/* Optional Subtitle */}
          {subtitle && (
            <motion.p
              variants={itemVariants}
              className={`text-base md:text-lg lg:text-xl ${subtitleColor} mb-6 max-w-2xl mx-auto transition-colors duration-300`}
            >
              {subtitle}
            </motion.p>
          )}

          {/* Breadcrumb Navigation */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-2 md:gap-3 text-base md:text-lg flex-wrap"
          >
            <Link
              href="/"
              className={`${linkColor} ${linkHoverColor} transition-all duration-300 hover:scale-105 inline-flex items-center gap-1 group`}
            >
              <motion.svg
                className="w-4 h-4 md:w-5 md:h-5 transition-all duration-300 group-hover:-translate-y-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                whileHover={{ rotate: -5 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </motion.svg>
              <span>Home</span>
            </Link>

            <motion.span
              className={`${arrowColor} text-base md:text-lg font-light`}
              animate={{
                x: [0, 3, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.span>

            <motion.span
              className={`${titleColor} font-semibold relative inline-block transition-colors duration-300`}
              whileHover={{ scale: 1.05 }}
            >
              {title}
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary origin-left"
                style={{
                  boxShadow: "0 0 8px rgba(135,80,247,0.6)",
                }}
              />
            </motion.span>
          </motion.div>

          {/* Decorative Elements with Theme Colors */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center mt-6 sm:mt-8"
          >
            <div className="relative">
              <motion.div
                className="w-12 h-0.5 bg-primary rounded-full"
                animate={{
                  scaleX: [1, 1.2, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-0.5 rounded-full"
                style={{
                  background: isDarkMode ? "rgba(135,80,247,0.8)" : "rgba(135,80,247,1)",
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default HeaderBanner;