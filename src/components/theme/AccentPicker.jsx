"use client";

import { useEffect, useId, useRef, useState } from "react";
import { FiCheck } from "react-icons/fi";
import { accents } from "@/data/site";
import { useTheme } from "./ThemeProvider";

export default function AccentPicker() {
  const { accent, setAccent, isDark } = useTheme();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return undefined;
    const onPointer = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={menuId}
        aria-label="Choose accent color"
        title="Accent color"
        className="grid h-10 w-10 place-items-center rounded-full border hairline transition-colors hover:border-accent"
      >
        <span className="h-4 w-4 rounded-full bg-accent ring-2 ring-accent/30" aria-hidden="true" />
      </button>

      {open && (
        <div
          id={menuId}
          role="group"
          aria-label="Accent colors"
          className="panel absolute right-0 top-12 z-50 flex gap-2 p-2 shadow-xl shadow-black/10"
        >
          {accents.map((option) => {
            const selected = option.id === accent;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => {
                  setAccent(option.id);
                  setOpen(false);
                }}
                aria-pressed={selected}
                aria-label={option.label}
                title={option.label}
                className="grid h-8 w-8 place-items-center rounded-full transition-transform hover:scale-110"
                style={{ backgroundColor: isDark ? option.dark : option.light }}
              >
                {selected && (
                  <FiCheck className={isDark ? "text-black" : "text-white"} aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
