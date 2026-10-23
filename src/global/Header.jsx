"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import Link from "next/link";
import Image from "next/image";
import { profile } from "@/data/profile";
import { navigationItems } from "@/data/navigation";
import { motion, AnimatePresence } from "framer-motion";
import DotBurst from "@/components/DotBurst";
import {
  FiMail,
  FiSun,
  FiMoon,
  FiMenu,
  FiX,
  FiArrowRight,
  FiCode,
  FiBriefcase ,
  FiHome,
  FiUser,
  FiSettings,
  FiFolder,
  FiFileText,
  FiBookOpen,
  FiMail as FiMailIcon,
  FiGithub,
  FiLinkedin,
  FiChevronRight,
  FiSend,
  FiUser as FiUserIcon,
  FiPhone,
  FiMessageSquare,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

const navIcons = {
  "/": FiHome,
  "/about": FiUser,
  "/projects": FiFolder,
  "/experience": FiBriefcase,
  "/blog": FiBookOpen,
  "/contact": FiMail,
  "/resume": FiFileText,
};

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(pathname || "/");
  const [navBurst, setNavBurst] = useState({ path: "", id: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });
  const { isDarkMode, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keep the active item in sync with client-side navigation (incl. back/forward).
  useEffect(() => {
    setActiveItem(pathname || "/");
  }, [pathname]);

  // Close overlays with the Escape key.
  useEffect(() => {
    if (!mobileMenuOpen && !isModalOpen) return;
    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      setMobileMenuOpen(false);
      if (!isSubmitting) {
        setIsModalOpen(false);
        setSubmitStatus({ type: "", message: "" });
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen, isModalOpen, isSubmitting]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const navItems = navigationItems.map((item) => ({
    ...item,
    icon: navIcons[item.path] || FiCode,
  }));
  const socialLinks = [
    { icon: FiGithub, href: profile.socials.github, label: "GitHub" },
    { icon: FiLinkedin, href: profile.socials.linkedin, label: "LinkedIn" },
  ].filter((social) => Boolean(social.href));

  const handleNavClick = (path) => {
    setActiveItem(path);
    setMobileMenuOpen(false);
  };

  const isNavItemActive = (path) =>
    activeItem === path || (path !== "/" && activeItem.startsWith(`${path}/`));

  const triggerNavDots = (path) => {
    const id = Date.now();
    setNavBurst({ path, id });
    window.setTimeout(() => {
      setNavBurst((prev) => (prev.id === id ? { path: "", id: 0 } : prev));
    }, 600);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setSubmitStatus({ type: "error", message: "Please enter your name" });
      return false;
    }
    if (!formData.email.trim()) {
      setSubmitStatus({ type: "error", message: "Please enter your email" });
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus({
        type: "error",
        message: "Please enter a valid email address",
      });
      return false;
    }
    if (formData.message.trim().length < 10) {
      setSubmitStatus({
        type: "error",
        message: "Please write a message of at least 10 characters",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (!validateForm()) {
      setTimeout(() => {
        setSubmitStatus({ type: "", message: "" });
      }, 3000);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: "", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          phone: formData.phone?.trim() || "",
          service: "Hire Me",
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "✓ Message sent successfully! I'll get back to you soon.",
        });
        setFormData({ name: "", email: "", phone: "", message: "" });

        // Auto close modal after 2 seconds on success
        setTimeout(() => {
          setIsModalOpen(false);
          setSubmitStatus({ type: "", message: "" });
        }, 2000);
      } else {
        throw new Error(data.error || data.message || "Failed to send message");
      }
    } catch (error) {
      // Keep the error visible (with the email fallback) until the user acts.
      setSubmitStatus({
        type: "error",
        message:
          error.message && error.message !== "Failed to fetch"
            ? error.message
            : `Network error. Please try again or email ${profile.email} directly.`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    // Reset form when opening
    setFormData({ name: "", email: "", phone: "", message: "" });
    setSubmitStatus({ type: "", message: "" });
  };

  const closeModal = () => {
    if (!isSubmitting) {
      setIsModalOpen(false);
      setSubmitStatus({ type: "", message: "" });
      setFormData({ name: "", email: "", phone: "", message: "" });
    }
  };

  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  const navItemVariants = {
    closed: { opacity: 0, x: 50 },
    open: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05, duration: 0.3, ease: "easeOut" },
    }),
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        duration: 0.4,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -20,
      transition: { duration: 0.3 },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const getLogoPath = () => {
    if (!mounted) return "/assets/logo-on-dark.svg";
    return isDarkMode ? "/assets/logo-on-dark.svg" : "/assets/logo-on-light.svg";
  };

  return (
    <>
      <motion.header
        variants={headerVariants}
        initial="initial"
        animate="animate"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? isDarkMode
              ? "bg-gray-900/95 backdrop-blur-xl shadow-2xl border-b border-gray-800/50"
              : "bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200/50"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 lg:h-24">
            <Link
              href="/"
              className="group relative flex-shrink-0"
              onClick={() => handleNavClick("/")}
              aria-label={`${profile.fullName} — Home`}
            >
              <motion.div
                className="relative w-[90px] sm:w-[110px] lg:w-[130px] h-[40px] sm:h-[55px] lg:h-[65px] transition-all duration-300 group-hover:scale-105"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Image
                  src={getLogoPath()}
                  alt={`${profile.fullName} logo`}
                  fill
                  unoptimized
                  className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.18)]"
                  priority
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav
              className="hidden lg:flex items-center gap-1 xl:gap-2"
              aria-label="Primary"
            >
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  aria-current={isNavItemActive(item.path) ? "page" : undefined}
                  onClick={() => {
                    triggerNavDots(item.path);
                    handleNavClick(item.path);
                  }}
                  className={`relative px-3 xl:px-4 py-2 text-sm xl:text-base font-medium transition-all duration-300 group ${
                    isNavItemActive(item.path)
                      ? "text-primary"
                      : isDarkMode
                        ? "text-gray-300 hover:text-primary"
                        : "text-gray-700 hover:text-primary"
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>

                  {isNavItemActive(item.path) && (
                    <motion.span
                      layoutId="activeNav"
                      className={`absolute inset-0 rounded-lg ${
                        isDarkMode ? "bg-primary/20" : "bg-primary/10"
                      }`}
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}

                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-1/2" />
                </Link>
              ))}
            </nav>

            {/* Tablet Navigation */}
            <nav
              className="hidden md:flex lg:hidden items-center gap-1 overflow-x-auto no-scrollbar max-w-[56vw]"
              aria-label="Primary"
            >
              {navItems.slice(0, 5).map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  aria-current={isNavItemActive(item.path) ? "page" : undefined}
                  onClick={() => {
                    triggerNavDots(item.path);
                    handleNavClick(item.path);
                  }}
                  className={`relative px-2.5 py-2 text-xs font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                    isNavItemActive(item.path)
                      ? "text-primary"
                      : isDarkMode
                        ? "text-gray-300 hover:text-primary"
                        : "text-gray-700 hover:text-primary"
                  }`}
                >
                  {item.name}
                  {isNavItemActive(item.path) && (
                    <motion.span
                      layoutId="activeNavTablet"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </Link>
              ))}
              {navItems.length > 5 && (
                <button
                  type="button"
                  aria-haspopup="dialog"
                  onClick={() => setMobileMenuOpen(true)}
                  className={`px-2.5 py-2 text-xs font-medium transition-all hover:scale-105 whitespace-nowrap ${
                    isDarkMode
                      ? "text-gray-300 hover:text-primary"
                      : "text-gray-700 hover:text-primary"
                  }`}
                >
                  More...
                </button>
              )}
            </nav>

            {/* Right Section */}
            <div className="hidden md:flex items-center gap-2 lg:gap-3 xl:gap-4">
              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                className={`relative w-8 h-8 lg:w-9 lg:h-9 rounded-full flex items-center justify-center transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                  isDarkMode
                    ? "bg-gray-800 border border-gray-700"
                    : "bg-gray-100 border border-gray-200"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle theme"
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: isDarkMode ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-4 h-4 lg:w-5 lg:h-5"
                >
                  {!isDarkMode ? (
                    <FiSun className="w-full h-full text-yellow-500" />
                  ) : (
                    <FiMoon className="w-full h-full text-primary" />
                  )}
                </motion.div>
              </motion.button>

              {/* Hire Me Button */}
              <motion.button
                onClick={openModal}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden lg:inline-flex group relative items-center gap-2 bg-gradient-to-r from-primary to-primary/80 text-white font-semibold rounded-full py-2 px-4 lg:py-2.5 lg:px-6 xl:py-3 xl:px-7 overflow-hidden transition-all duration-300 hover:shadow-xl text-sm lg:text-base"
              >
                <span className="relative z-10">Hire Me!</span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex-shrink-0 w-4 h-4 lg:w-5 lg:h-5 bg-white rounded-full grid place-items-center">
                  <FiArrowRight className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-primary" />
                </span>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className={`md:hidden flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${
                isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <FiX
                  className={`w-5 h-5 sm:w-6 sm:h-6 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}
                />
              ) : (
                <FiMenu
                  className={`w-5 h-5 sm:w-6 sm:h-6 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}
                />
              )}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              className={`fixed right-0 top-0 bottom-0 w-full max-w-sm shadow-2xl z-50 md:hidden ${
                isDarkMode ? "bg-gray-900" : "bg-white"
              }`}
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div
                  className={`flex items-center justify-between p-5 sm:p-6 border-b ${
                    isDarkMode ? "border-gray-800" : "border-gray-200"
                  }`}
                >
                  <div className="relative w-24 h-12 sm:w-28 sm:h-14">
                    <Image
                      src={getLogoPath()}
                      alt={`${profile.fullName} logo`}
                      fill
                      unoptimized
                      className="object-contain"
                    />
                  </div>
                  <motion.button
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close menu"
                    className={`p-2 rounded-full transition-colors ${
                      isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                    }`}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FiX
                      className={`w-5 h-5 sm:w-6 sm:h-6 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}
                    />
                  </motion.button>
                </div>

                {/* Navigation Items with Icons */}
                <nav className="flex-1 overflow-y-auto py-6 px-5 sm:px-6">
                  {navItems.map((item, i) => {
                    const Icon = item.icon;
                    const isActive = isNavItemActive(item.path);
                    return (
                      <motion.div
                        key={item.name}
                        custom={i}
                        variants={navItemVariants}
                        initial="closed"
                        animate="open"
                      >
                        <Link
                          href={item.path}
                          aria-current={isActive ? "page" : undefined}
                          onClick={() => {
                            triggerNavDots(item.path);
                            // give a tiny time for dots animation before menu closes
                            setActiveItem(item.path);
                            window.setTimeout(
                              () => setMobileMenuOpen(false),
                              220,
                            );
                          }}
                          className={`flex items-center gap-3 sm:gap-4 py-3.5 sm:py-4 px-3 sm:px-4 rounded-xl transition-all duration-300 mb-2 group ${
                            isActive
                              ? isDarkMode
                                ? "bg-primary/20 text-primary"
                                : "bg-primary/10 text-primary"
                              : isDarkMode
                                ? "text-gray-300 hover:bg-gray-800"
                                : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          <span className="relative grid place-items-center w-6 h-6 sm:w-7 sm:h-7">
                            <Icon
                              className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors ${
                                isActive
                                  ? "text-primary"
                                  : isDarkMode
                                    ? "text-gray-400 group-hover:text-primary"
                                    : "text-gray-500 group-hover:text-primary"
                              }`}
                            />
                            {navBurst.path === item.path &&
                              navBurst.id !== 0 && (
                                <DotBurst seed={navBurst.id} />
                              )}
                          </span>
                          <span className="text-sm sm:text-base font-medium flex-1">
                            {item.name}
                          </span>
                          {isActive && (
                            <motion.div
                              layoutId="activeMobile"
                              className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full"
                              transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 30,
                              }}
                            />
                          )}
                          {!isActive && (
                            <FiChevronRight
                              className={`w-4 h-4 sm:w-5 sm:h-5 ${
                                isDarkMode ? "text-gray-600" : "text-gray-400"
                              } group-hover:translate-x-1 transition-transform`}
                            />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}

                  {/* Social Links in Mobile */}
                  <div
                    className={`mt-6 pt-4 border-t ${
                      isDarkMode ? "border-gray-800" : "border-gray-200"
                    }`}
                  >
                    <h3
                      className={`text-xs font-semibold uppercase tracking-wider mb-3 px-4 ${
                        isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Connect With Me
                    </h3>
                    <div className="flex gap-2 sm:gap-3 px-4">
                      {socialLinks.map((social, index) => (
                        <motion.a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.label}
                          className={`p-2.5 sm:p-3 rounded-xl transition-all ${
                            isDarkMode
                              ? "bg-gray-800 text-gray-400 hover:text-primary hover:bg-primary/20"
                              : "bg-gray-100 text-gray-600 hover:text-primary hover:bg-primary/10"
                          }`}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </nav>

                {/* Footer */}
                <div
                  className={`p-5 sm:p-6 border-t space-y-3 sm:space-y-4 ${
                    isDarkMode ? "border-gray-800" : "border-gray-200"
                  }`}
                >
                  {/* Email */}
                  <a
                    href={`mailto:${profile.email}`}
                    className={`flex items-center gap-3 p-3 sm:p-4 rounded-xl transition-all group ${
                      isDarkMode
                        ? "bg-gray-800/50 hover:bg-primary/10"
                        : "bg-gray-50 hover:bg-primary/5"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg shadow-sm ${
                        isDarkMode ? "bg-gray-700" : "bg-white"
                      }`}
                    >
                      <FiMail className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-xs ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Email Me
                      </p>
                      <p
                        className={`text-xs sm:text-sm font-medium truncate transition-colors ${
                          isDarkMode
                            ? "text-gray-300 group-hover:text-primary"
                            : "text-gray-700 group-hover:text-primary"
                        }`}
                      >
                        {profile.email}
                      </p>
                    </div>
                    <FiArrowRight
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-all ${
                        isDarkMode
                          ? "text-gray-500 group-hover:text-primary group-hover:translate-x-1"
                          : "text-gray-400 group-hover:text-primary group-hover:translate-x-1"
                      }`}
                    />
                  </a>

                  {/* Theme Toggle */}
                  <div
                    className={`flex items-center justify-between p-3 sm:p-4 rounded-xl transition-colors ${
                      isDarkMode ? "bg-gray-800/50" : "bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg shadow-sm ${
                          isDarkMode ? "bg-gray-700" : "bg-white"
                        }`}
                      >
                        {!isDarkMode ? (
                          <FiSun className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                        ) : (
                          <FiMoon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                        )}
                      </div>
                      <div>
                        <p
                          className={`text-xs ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          Theme
                        </p>
                        <p
                          className={`text-xs sm:text-sm font-medium ${
                            isDarkMode ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          {isDarkMode ? "Dark Mode" : "Light Mode"}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={toggleTheme}
                      className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors flex-shrink-0 ${
                        isDarkMode ? "bg-primary/30" : "bg-primary/20"
                      }`}
                      aria-label="Toggle theme"
                    >
                      <motion.span
                        animate={{ x: isDarkMode ? "20px" : "2px" }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                        className="h-5 w-5 bg-white rounded-full shadow-md absolute"
                      />
                    </button>
                  </div>

                  {/* Hire Me Button */}
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openModal();
                    }}
                    className="group block w-full py-3 sm:py-3.5 bg-gradient-to-r from-primary to-primary/90 text-white font-semibold rounded-xl text-center shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Hire Me!
                      <FiArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hire Me Modal - Mobile Responsive */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60]"
              onClick={closeModal}
            />

            {/* Modal */}
            <div
              className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-4"
              onClick={closeModal}
            >
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="hire-me-title"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={`w-full max-w-[95%] sm:max-w-md md:max-w-lg rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] sm:max-h-[85vh] flex flex-col ${
                  isDarkMode ? "bg-gray-900" : "bg-white"
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header - Sticky */}
                <div
                  className={`sticky top-0 z-10 px-4 sm:px-6 py-4 sm:py-5 border-b ${
                    isDarkMode
                      ? "border-gray-800 bg-gray-900"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3
                        id="hire-me-title"
                        className={`text-lg sm:text-xl font-bold ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        Hire Me
                      </h3>
                      <p
                        className={`text-xs sm:text-sm mt-0.5 sm:mt-1 ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        Tell me about the role or project and I&apos;ll get
                        back to you soon.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={closeModal}
                      disabled={isSubmitting}
                      aria-label="Close dialog"
                      className={`p-1.5 sm:p-2 rounded-lg transition-colors ${
                        isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                      } disabled:opacity-50`}
                    >
                      <FiX
                        className={`w-4 h-4 sm:w-5 sm:h-5 ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Form - Scrollable */}
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  aria-busy={isSubmitting}
                  className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6 space-y-3 sm:space-y-4"
                >
                  {/* Name Field */}
                  <div>
                    <label
                      htmlFor="hire-name"
                      className={`block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Full Name *
                    </label>
                    <div className="relative">
                      <FiUserIcon
                        className={`absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                          isDarkMode ? "text-gray-500" : "text-gray-400"
                        }`}
                      />
                      <input
                        id="hire-name"
                        type="text"
                        name="name"
                        autoComplete="name"
                        maxLength={100}
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 rounded-lg border transition-all focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm sm:text-base ${
                          isDarkMode
                            ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                        }`}
                        placeholder="Your name"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="hire-email"
                      className={`block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Email Address *
                    </label>
                    <div className="relative">
                      <FiMail
                        className={`absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                          isDarkMode ? "text-gray-500" : "text-gray-400"
                        }`}
                      />
                      <input
                        id="hire-email"
                        type="email"
                        name="email"
                        autoComplete="email"
                        maxLength={254}
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 rounded-lg border transition-all focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm sm:text-base ${
                          isDarkMode
                            ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                        }`}
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label
                      htmlFor="hire-phone"
                      className={`block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Phone Number (Optional)
                    </label>
                    <div className="relative">
                      <FiPhone
                        className={`absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                          isDarkMode ? "text-gray-500" : "text-gray-400"
                        }`}
                      />
                      <input
                        id="hire-phone"
                        type="tel"
                        name="phone"
                        autoComplete="tel"
                        maxLength={20}
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 rounded-lg border transition-all focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm sm:text-base ${
                          isDarkMode
                            ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                        }`}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label
                      htmlFor="hire-message"
                      className={`block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Message / Project Details *
                    </label>
                    <div className="relative">
                      <FiMessageSquare
                        className={`absolute left-3 top-3 w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                          isDarkMode ? "text-gray-500" : "text-gray-400"
                        }`}
                      />
                      <textarea
                        id="hire-message"
                        name="message"
                        maxLength={5000}
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 rounded-lg border transition-all focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none text-sm sm:text-base ${
                          isDarkMode
                            ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                        }`}
                        placeholder="Tell me about the role, project, or what you need help with..."
                      />
                    </div>
                  </div>

                  {/* Status Message */}
                  <AnimatePresence>
                    {submitStatus.message && (
                      <motion.div
                        role={submitStatus.type === "error" ? "alert" : "status"}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`p-2.5 sm:p-3 rounded-lg flex items-start gap-2 text-xs sm:text-sm ${
                          submitStatus.type === "success"
                            ? isDarkMode
                              ? "bg-green-900/20 text-green-400 border border-green-800"
                              : "bg-green-50 text-green-700 border border-green-200"
                            : isDarkMode
                              ? "bg-red-900/20 text-red-400 border border-red-800"
                              : "bg-red-50 text-red-700 border border-red-200"
                        }`}
                      >
                        {submitStatus.type === "success" ? (
                          <FiCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5" />
                        ) : (
                          <FiAlertCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5" />
                        )}
                        <span className="flex-1">
                          {submitStatus.message}
                          {submitStatus.type === "error" &&
                            formData.message.trim().length >= 10 && (
                              <>
                                {" "}
                                <a
                                  href={`mailto:${profile.email}?subject=${encodeURIComponent(
                                    "Hire Me enquiry"
                                  )}&body=${encodeURIComponent(formData.message)}`}
                                  className="font-semibold underline underline-offset-2"
                                >
                                  Email instead
                                </a>
                              </>
                            )}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative w-full py-2.5 sm:py-3 bg-gradient-to-r from-primary to-primary/90 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden text-sm sm:text-base"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span
                      className={`inline-flex items-center justify-center gap-2 transition-all ${isSubmitting ? "opacity-0" : "opacity-100"}`}
                    >
                      Send Message
                      <FiSend className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </span>
                    {isSubmitting && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                          className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      </div>
                    )}
                  </motion.button>
                </form>

                {/* Footer - Sticky */}
                <div
                  className={`sticky bottom-0 px-4 sm:px-6 py-3 sm:py-4 border-t ${
                    isDarkMode
                      ? "border-gray-800 bg-gray-800/30"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <p
                    className={`text-[10px] sm:text-xs text-center ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Your information is only used to respond to your
                    message.
                  </p>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
