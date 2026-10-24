"use client";

import { FiArrowUp } from "react-icons/fi";

export default function BackToTop() {
  const scrollUp = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    document.getElementById("main-content")?.focus({ preventScroll: true });
  };

  return (
    <button
      type="button"
      onClick={scrollUp}
      className="group inline-flex items-center gap-2 font-mono uppercase tracking-[0.16em] hover:text-accent"
    >
      Back to top
      <FiArrowUp className="transition-transform group-hover:-translate-y-0.5" aria-hidden="true" />
    </button>
  );
}
