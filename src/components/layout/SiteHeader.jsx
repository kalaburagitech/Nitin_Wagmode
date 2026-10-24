"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu } from "react-icons/fi";
import { navigationItems } from "@/data/navigation";
import Logo from "@/components/ui/Logo";
import ThemeToggle from "@/components/theme/ThemeToggle";
import AccentPicker from "@/components/theme/AccentPicker";
import MobileNav from "./MobileNav";
import HireDialog from "./HireDialog";
import { isActivePath } from "@/lib/navigation";

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hireOpen, setHireOpen] = useState(false);
  // Stable callbacks: MobileNav's focus/scroll-lock effect depends on them.
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const openHireFromMenu = useCallback(() => {
    setMenuOpen(false);
    setHireOpen(true);
  }, []);
  const closeHire = useCallback(() => setHireOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu after navigating.
  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 h-[var(--header-h)] border-b transition-colors duration-300 ${
          scrolled || menuOpen
            ? "border-[rgb(var(--line)/var(--line-alpha))] bg-canvas/85 backdrop-blur-lg"
            : "border-transparent"
        }`}
      >
        <div className="shell flex h-full items-center justify-between gap-6">
          <Logo />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navigationItems.map((item) => {
                const active = isActivePath(pathname, item.path);
                return (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      aria-current={active ? "page" : undefined}
                      className={`relative rounded-full px-3.5 py-2 text-sm transition-colors ${
                        active ? "bg-ink/5 text-ink" : "text-muted hover:text-ink"
                      }`}
                    >
                      {item.name}
                      {active && (
                        <span className="absolute inset-x-3.5 -bottom-px h-px bg-accent" aria-hidden="true" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <AccentPicker />
            <ThemeToggle />
            <button type="button" onClick={() => setHireOpen(true)} className="btn-primary hidden sm:inline-flex">
              Hire me
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="grid h-10 w-10 place-items-center rounded-full border hairline text-ink lg:hidden"
            >
              <FiMenu aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <MobileNav
        open={menuOpen}
        onClose={closeMenu}
        onHire={openHireFromMenu}
        pathname={pathname}
      />
      <HireDialog open={hireOpen} onClose={closeHire} />
    </>
  );
}
