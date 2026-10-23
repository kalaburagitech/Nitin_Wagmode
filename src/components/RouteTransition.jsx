"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";

const MIN_VISIBLE_MS = 300;
const WAVE_PX = 260;

export default function RouteTransition() {
  const pathname = usePathname();
  const { isDarkMode } = useTheme();

  const [visible, setVisible] = useState(false);
  const [token, setToken] = useState(0);

  const startedAtRef = useRef(Date.now());
  const lastPathRef = useRef(pathname);

  // Accent color for the wave stroke follows the user's chosen primary color.
  // Read after mount (not during render) so server and client markup match.
  const [primary, setPrimary] = useState("#eab308");

  useEffect(() => {
    const readPrimary = () =>
      getComputedStyle(document.documentElement).getPropertyValue("--primary").trim();
    const update = () => setPrimary(readPrimary() || "#eab308");
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-primary", "class"],
    });
    return () => observer.disconnect();
  }, []);

  const start = () => {
    startedAtRef.current = Date.now();
    setToken((t) => t + 1);
    setVisible(true);
  };

  const stop = () => {
    const elapsed = Date.now() - startedAtRef.current;
    const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed);
    setTimeout(() => setVisible(false), remaining);
  };

  // 🔥 FIRST LOAD (IMPORTANT)
  useEffect(() => {
    const timer = setTimeout(stop, 500);
    return () => clearTimeout(timer);
  }, []);

  // 🔥 ROUTE CHANGE
  useEffect(() => {
    if (lastPathRef.current !== pathname) {
      lastPathRef.current = pathname;
      start();
      setTimeout(stop, 300);
    }
  }, [pathname]);

  // 🔥 CLICK
  useEffect(() => {
    const handleClick = (e) => {
      const a = e.target.closest("a");
      if (!a) return;

      const href = a.getAttribute("href") || "";
      const url = a.href ? new URL(a.href, window.location.href) : null;
      const isSameOrigin = url?.origin === window.location.origin;
      const isDownload = a.hasAttribute("download");
      const isNewTab =
        a.getAttribute("target") === "_blank" ||
        e.ctrlKey ||
        e.metaKey ||
        e.shiftKey ||
        e.button === 1;
      const isSamePage =
        url &&
        url.origin === window.location.origin &&
        url.pathname === window.location.pathname &&
        url.search === window.location.search;

      if (!href || href.startsWith("#") || isDownload || isNewTab || !isSameOrigin || isSamePage) {
        return;
      }

      start();
    };

    window.addEventListener("click", handleClick);
    window.addEventListener("popstate", start);

    return () => {
      window.removeEventListener("click", handleClick);
      window.removeEventListener("popstate", start);
    };
  }, []);

  // Get theme-aware colors
  const getBackgroundColor = () => {
    return isDarkMode ? "#050709" : "#ffffff";
  };

  const getWaveColor = () => {
    return isDarkMode ? "#050709" : "#f5f5f5";
  };

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key={token}
          className="fixed inset-0 z-[99999] flex items-center justify-center"
          style={{ background: getBackgroundColor() }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ y: 0 }}
            exit={{
              y: "-130%",
              transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              },
            }}
            className="absolute inset-0"
          >
            <div
              style={{
                height: `calc(100% + ${WAVE_PX}px)`,
                display: "flex",
                flexDirection: "column",
                background: getBackgroundColor(),
              }}
            >
              <div style={{ flex: 1 }} />
              <svg viewBox="0 0 1000 200" width="100%" height={WAVE_PX}>
                <path
                  d="M0 0C220 150 780 150 1000 0V200H0Z"
                  fill={getWaveColor()}
                />
                <path
                  d="M0 0C220 150 780 150 1000 0"
                  stroke={primary}
                  strokeWidth="3"
                  fill="none"
                />
              </svg>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
