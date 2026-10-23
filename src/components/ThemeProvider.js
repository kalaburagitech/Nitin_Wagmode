"use client";

import { createContext, useContext, useEffect, useState } from "react";
import ColorPicker from "./ColorPicker";
import { fallbackSettings } from "@/lib/publicContent";

const ThemeContext = createContext();

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

const DEFAULT_DARK = fallbackSettings.defaultTheme !== "light";

export default function ThemeProvider({ children }) {
  // Server and first client render both use the site default so markup
  // hydrates cleanly; the inline script in layout.js has already applied a
  // saved preference to <html> before paint, and this effect syncs React state.
  const [isDarkMode, setIsDarkMode] = useState(DEFAULT_DARK);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    let savedTheme = null;
    try {
      savedTheme = localStorage.getItem("theme");
    } catch {
      // Storage can be unavailable (private mode, blocked cookies).
    }

    const dark = savedTheme ? savedTheme === "dark" : DEFAULT_DARK;
    setIsDarkMode(dark);
    document.documentElement.classList.toggle("dark", dark);

    if (!document.documentElement.getAttribute("data-primary")) {
      document.documentElement.setAttribute(
        "data-primary",
        fallbackSettings.defaultPrimaryColor
      );
    }
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    try {
      localStorage.setItem("theme", newDarkMode ? "dark" : "light");
    } catch {
      // Preference just won't persist.
    }
    document.documentElement.classList.toggle("dark", newDarkMode);
  };

  const value = {
    isDarkMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {/* Combined Theme Controls (client-only: reads saved color from storage) */}
      {mounted && (
        <div className="fixed top-24 right-6 z-50 flex flex-col gap-2">
          <ColorPicker />
        </div>
      )}
      {children}
    </ThemeContext.Provider>
  );
}
