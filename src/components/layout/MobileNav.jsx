"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowUpRight, FiX } from "react-icons/fi";
import { navigationItems } from "@/data/navigation";
import { profile } from "@/data/profile";
import SocialLinks from "@/components/ui/SocialLinks";
import { isActivePath } from "@/lib/navigation";

const extraLinks = [
  { name: "Skills", path: "/skills" },
  { name: "Services", path: "/services" },
];

export default function MobileNav({ open, onClose, onHire, pathname }) {
  const panelRef = useRef(null);

  // Lock page scroll, close on Escape, move focus into the panel, and hand
  // focus back to the menu button when it closes.
  useEffect(() => {
    if (!open) return undefined;
    const opener = document.activeElement;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    panelRef.current?.querySelector("a, button")?.focus();
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
      if (opener instanceof HTMLElement && opener.isConnected) opener.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-nav"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[60] flex flex-col bg-canvas lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="shell flex h-[var(--header-h)] items-center justify-between">
            <span className="eyebrow">Menu</span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="grid h-10 w-10 place-items-center rounded-full border hairline text-ink"
            >
              <FiX aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Mobile" className="shell flex-1 overflow-y-auto pb-8">
            <ul className="border-t hairline">
              {[...navigationItems, ...extraLinks].map((item, i) => {
                const active = isActivePath(pathname, item.path);
                return (
                  <motion.li
                    key={item.path}
                    className="border-b hairline"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.03 * i }}
                  >
                    <Link
                      href={item.path}
                      onClick={onClose}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center justify-between py-4 font-display text-2xl ${
                        active ? "text-accent" : "text-ink"
                      }`}
                    >
                      {item.name}
                      <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                    </Link>
                  </motion.li>
                );
              })}
            </ul>

            <button type="button" onClick={onHire} className="btn-primary mt-8 w-full">
              Hire me <FiArrowUpRight aria-hidden="true" />
            </button>
            <div className="mt-8 flex flex-col gap-4">
              <a href={`mailto:${profile.email}`} className="text-sm text-muted">
                {profile.email}
              </a>
              <SocialLinks />
            </div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
