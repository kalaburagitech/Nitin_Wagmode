"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import { ACCENT_IDS, DEFAULT_ACCENT, DEFAULT_THEME } from "@/data/site";
import { ACCENT_KEY, THEME_KEY } from "@/lib/theme";

const ThemeContext = createContext(null);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}

function save(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage blocked (private mode); the choice just won't persist.
  }
}

export default function ThemeProvider({ children }) {
  // Start from the defaults so server and client markup match; the inline
  // bootstrap script has already applied any saved choice to <html>.
  const [isDark, setIsDark] = useState(DEFAULT_THEME === "dark");
  const [accent, setAccentState] = useState(DEFAULT_ACCENT);

  useEffect(() => {
    const root = document.documentElement;
    setIsDark(root.classList.contains("dark"));
    const current = root.getAttribute("data-accent");
    setAccentState(ACCENT_IDS.includes(current) ? current : DEFAULT_ACCENT);
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDark((dark) => {
      const next = !dark;
      document.documentElement.classList.toggle("dark", next);
      save(THEME_KEY, next ? "dark" : "light");
      return next;
    });
  }, []);

  const setAccent = useCallback((id) => {
    if (!ACCENT_IDS.includes(id)) return;
    document.documentElement.setAttribute("data-accent", id);
    save(ACCENT_KEY, id);
    setAccentState(id);
  }, []);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, accent, setAccent }}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeContext.Provider>
  );
}
