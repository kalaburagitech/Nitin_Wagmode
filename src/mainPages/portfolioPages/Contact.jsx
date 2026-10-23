"use client";

import {
  resetFormStatus,
  submitContactForm,
} from "@/redux/contact/contactSlice";
import { profile } from "@/data/profile";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { motion, AnimatePresence } from "framer-motion";

import { useTheme } from "@/components/ThemeProvider";

import {
  FiArrowUpRight,
  FiCheck,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiPhone,
  FiSend,
  FiUser,
  FiX,
} from "react-icons/fi";

import { socialLinksArray, socialMediaLinks } from "@/global/SocialMediaLinks";

export default function Contact() {
  const { isDarkMode } = useTheme();

  const dispatch = useDispatch();

  const { formStatus, error, errorCode, fieldErrors, content } = useSelector(
    (state) => state.contact
  );

  /* =========================================================
     FORM STATE
  ========================================================= */

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    website: "", // honeypot, hidden from real visitors
  });

  const [focusedField, setFocusedField] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  /* =========================================================
     SERVER-SIDE FIELD ERRORS
  ========================================================= */

  useEffect(() => {
    if (fieldErrors) setValidationErrors(fieldErrors);
  }, [fieldErrors]);

  /* =========================================================
     RESET AFTER SUCCESS
  ========================================================= */

  useEffect(() => {
    if (formStatus === "succeeded") {
      const timer = setTimeout(() => {
        dispatch(resetFormStatus());

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          service: "",
          message: "",
          website: "",
        });

        setValidationErrors({});
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [formStatus, dispatch]);

  /* =========================================================
     VALIDATION
  ========================================================= */

  const validateName = (name, fieldName) => {
    if (!name || name.trim() === "") {
      return `${fieldName} is required`;
    }

    if (name.trim().length < 2) {
      return `${fieldName} must be at least 2 characters`;
    }

    if (!/^[\p{L}\s\-'.]+$/u.test(name)) {
      return `${fieldName} can only contain letters, spaces, hyphens, and apostrophes`;
    }

    return "";
  };

  const validateEmail = (email) => {
    if (!email || email.trim() === "") {
      return "Email is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }

    return "";
  };

  // Phone is optional; validate only when provided.
  const validatePhone = (phone) => {
    if (!phone || phone.trim() === "") {
      return "";
    }

    const cleaned = phone.replace(/\D/g, "");

    if (cleaned.length < 10) {
      return "Phone number must be at least 10 digits";
    }

    if (cleaned.length > 15) {
      return "Phone number must be less than 15 digits";
    }

    return "";
  };

  const validateMessage = (message) => {
    if (!message || message.trim().length < 10) {
      return "Please write a message of at least 10 characters";
    }

    if (message.length > 5000) {
      return "Message must be 5000 characters or fewer";
    }

    return "";
  };

  const validateField = (name, value) => {
    switch (name) {
      case "firstName":
        return validateName(value, "First name");

      case "lastName":
        return validateName(value, "Last name");

      case "email":
        return validateEmail(value);

      case "phone":
        return validatePhone(value);

      case "message":
        return validateMessage(value);

      default:
        return "";
    }
  };

  /* =========================================================
     CHANGE
  ========================================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Re-validate while typing only once a field already shows an error,
    // so messages don't appear mid-typing on a fresh field.
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value),
      }));
    }

    if (formStatus === "failed") {
      dispatch(resetFormStatus());
    }
  };

  /* =========================================================
     BLUR
  ========================================================= */

  const handleBlur = (e) => {
    const { name, value } = e.target;

    const fieldError = validateField(name, value);

    setValidationErrors((prev) => ({
      ...prev,
      [name]: fieldError,
    }));

    setFocusedField(null);
  };

  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    // Guard against double submission while a request is in flight.
    if (formStatus === "loading" || formStatus === "succeeded") return;

    const errors = {};
    let hasErrors = false;

    const firstNameError = validateName(
      formData.firstName,
      "First name"
    );

    if (firstNameError) {
      errors.firstName = firstNameError;
      hasErrors = true;
    }

    const lastNameError = validateName(
      formData.lastName,
      "Last name"
    );

    if (lastNameError) {
      errors.lastName = lastNameError;
      hasErrors = true;
    }

    const emailError = validateEmail(formData.email);

    if (emailError) {
      errors.email = emailError;
      hasErrors = true;
    }

    const phoneError = validatePhone(formData.phone);

    if (phoneError) {
      errors.phone = phoneError;
      hasErrors = true;
    }

    const messageError = validateMessage(formData.message);

    if (messageError) {
      errors.message = messageError;
      hasErrors = true;
    }

    if (hasErrors) {
      setValidationErrors(errors);

      const firstErrorField = Object.keys(errors)[0];

      const element = document.querySelector(
        `[name="${firstErrorField}"]`
      );

      if (element) {
        element.focus();
      }

      return;
    }

    setValidationErrors({});

    const submitData = {
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      phone: formData.phone,
      service: formData.service,
      message: formData.message,
      website: formData.website,
    };

    dispatch(submitContactForm(submitData));
  };

  /* =========================================================
     CONTACT INFORMATION
  ========================================================= */

  const contactInfo = [
    {
      label: "Phone",
      value: profile.phone,
      link: socialMediaLinks.phone.link,
      icon: FiPhone,
    },
    {
      label: "Email",
      value: profile.email,
      link: socialMediaLinks.email.link,
      icon: FiMail,
    },
    {
      label: "Location",
      value: `${profile.location} · Open to relocation & remote`,
      link: null,
      icon: FiMapPin,
    },
  ];

  /* =========================================================
     INPUT CLASS
  ========================================================= */

  const inputBase = `
    w-full
    rounded-xl
    border
    px-4
    py-3.5
    outline-none
    text-sm
    transition-all
    duration-300
    placeholder:text-gray-500
  `;

  return (
    <div
      className={`relative min-h-screen overflow-clip transition-colors duration-500 ${
        isDarkMode
          ? "bg-[#05060d] text-white"
          : "bg-[#f7f7fa] text-gray-900"
      }`}
    >
      {/* =====================================================
          BACKGROUND DECORATION
      ===================================================== */}

      <div
        className="pointer-events-none absolute -top-48 left-1/2 h-[550px] w-[550px] -translate-x-1/2 rounded-full blur-3xl opacity-[0.07]"
        style={{
          background: "var(--primary)",
        }}
      />

      <div
        className="pointer-events-none absolute top-[35%] -left-60 h-[400px] w-[400px] rounded-full blur-3xl opacity-[0.05]"
        style={{
          background: "var(--primary)",
        }}
      />

      <div
        className="pointer-events-none absolute bottom-0 -right-60 h-[450px] w-[450px] rounded-full blur-3xl opacity-[0.05]"
        style={{
          background: "var(--primary)",
        }}
      />

      {/* =====================================================
          PAGE
      ===================================================== */}

      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28">
        {/* ===================================================
            HEADER
        =================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.55,
          }}
          className="max-w-3xl mx-auto text-center mb-14 sm:mb-16"
        >
          {/* LABEL */}

          <div className="inline-flex items-center gap-2 mb-5">
            <span
              className="h-px w-8"
              style={{
                background: "var(--primary)",
              }}
            />

            <span
              className="text-xs sm:text-sm font-semibold uppercase tracking-[0.22em]"
              style={{
                color: "var(--primary)",
              }}
            >
              {content?.subtitle || "Get In Touch"}
            </span>

            <span
              className="h-px w-8"
              style={{
                background: "var(--primary)",
              }}
            />
          </div>

          {/* TITLE */}

          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight"
            style={{
              color: "var(--text-heading)",
            }}
          >
            Let&apos;s Work{" "}
            <span
              style={{
                color: "var(--primary)",
              }}
            >
              Together!
            </span>
          </h1>

          {/* DIVIDER */}

          <div
            className="w-20 h-1 mx-auto mt-5 rounded-full"
            style={{
              background:
                "linear-gradient(to right, var(--primary), var(--primary-2))",
            }}
          />

          {/* DESCRIPTION */}

          <p
            className={`mt-5 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {content?.description ||
              "Have a project, idea, or opportunity in mind? Tell me what you're building and let's create something meaningful together."}
          </p>
        </motion.div>

        {/* ===================================================
            MAIN CONTENT
        =================================================== */}

        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-8 lg:gap-10 xl:gap-14 items-start">
          {/* =================================================
              LEFT INFORMATION PANEL
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: -35,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.55,
            }}
            className="relative"
          >
            <div
              className={`relative overflow-hidden rounded-3xl border p-6 sm:p-8 lg:p-9 ${
                isDarkMode
                  ? "bg-white/[0.035] border-white/10"
                  : "bg-white border-gray-200 shadow-sm"
              }`}
            >
              {/* TOP ACCENT */}

              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background:
                    "linear-gradient(to right, transparent, var(--primary), transparent)",
                }}
              />

              {/* DECORATIVE NUMBER */}

              <div
                className="pointer-events-none absolute -right-2 -top-8 text-[120px] font-black leading-none opacity-[0.025]"
                style={{
                  color: "var(--primary)",
                }}
              >
                01
              </div>

              {/* HEADING */}

              <div className="relative">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl mb-5"
                  style={{
                    color: "var(--primary)",
                    background:
                      "color-mix(in srgb, var(--primary) 10%, transparent)",
                  }}
                >
                  <FiMessageCircle size={22} />
                </div>

                <h2
                  className="text-2xl sm:text-3xl font-bold"
                  style={{
                    color: "var(--text-heading)",
                  }}
                >
                  Let&apos;s connect
                </h2>

                <p
                  className={`mt-3 text-sm sm:text-base leading-relaxed ${
                    isDarkMode
                      ? "text-gray-400"
                      : "text-gray-600"
                  }`}
                >
                  I&apos;m open to frontend roles, freelance
                  projects, and conversations about React, Next.js,
                  and React Native work.
                </p>
              </div>

              {/* AVAILABILITY */}

              <div
                className={`mt-7 rounded-2xl border p-4 ${
                  isDarkMode
                    ? "bg-white/[0.025] border-white/10"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    <span
                      className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60"
                      style={{
                        background: "var(--primary)",
                      }}
                    />

                    <span
                      className="relative inline-flex h-3 w-3 rounded-full"
                      style={{
                        background: "var(--primary)",
                      }}
                    />
                  </span>

                  <div>
                    <p
                      className="text-sm font-semibold"
                      style={{
                        color: "var(--text-heading)",
                      }}
                    >
                      Available for opportunities
                    </p>

                    <p
                      className={`text-xs mt-0.5 ${
                        isDarkMode
                          ? "text-gray-500"
                          : "text-gray-500"
                      }`}
                    >
                      {profile.workPreference}
                    </p>
                  </div>
                </div>
              </div>

              {/* CONTACT DETAILS */}

              <div className="mt-7 space-y-3">
                {contactInfo.map((item, index) => {
                  const Icon = item.icon;

                  const content = (
                    <div
                      className={`group flex items-center gap-4 rounded-2xl border p-4 transition-all duration-300 ${
                        isDarkMode
                          ? "bg-white/[0.02] border-white/10 hover:bg-white/[0.05] hover:border-white/20"
                          : "bg-gray-50 border-gray-200 hover:bg-white hover:border-gray-300"
                      }`}
                    >
                      <span
                        className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
                        style={{
                          color: "var(--primary)",
                          background:
                            "color-mix(in srgb, var(--primary) 10%, transparent)",
                        }}
                      >
                        <Icon size={18} />
                      </span>

                      <div className="min-w-0 flex-1">
                        <p
                          className={`text-[11px] uppercase tracking-wider font-semibold ${
                            isDarkMode
                              ? "text-gray-500"
                              : "text-gray-400"
                          }`}
                        >
                          {item.label}
                        </p>

                        <p
                          className="mt-1 text-sm font-medium break-words"
                          style={{
                            color: "var(--text-heading)",
                          }}
                        >
                          {item.value}
                        </p>
                      </div>

                      {item.link && (
                        <FiArrowUpRight
                          size={16}
                          className="flex-shrink-0 opacity-40 transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          style={{
                            color: "var(--primary)",
                          }}
                        />
                      )}
                    </div>
                  );

                  return item.link ? (
                    <a
                      key={index}
                      href={item.link}
                      aria-label={`${item.label}: ${item.value}`}
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={index}>{content}</div>
                  );
                })}
              </div>

              {/* SOCIAL */}

              <div
                className={`mt-7 pt-6 border-t ${
                  isDarkMode
                    ? "border-white/10"
                    : "border-gray-200"
                }`}
              >
                <p
                  className={`text-[11px] uppercase tracking-[0.18em] font-semibold mb-4 ${
                    isDarkMode
                      ? "text-gray-500"
                      : "text-gray-400"
                  }`}
                >
                  Find me online
                </p>

                <div className="flex flex-wrap gap-2.5">
                  {socialLinksArray.map((social) => {
                    let Icon = null;

                    if (social.icon === "FaGithub") {
                      Icon = FiGithub;
                    }

                    if (social.icon === "FaLinkedin") {
                      Icon = FiLinkedin;
                    }

                    if (social.icon === "MdEmail") {
                      Icon = FiMail;
                    }

                    if (social.icon === "FaPhone") {
                      Icon = FiPhone;
                    }

                    if (!Icon) return null;

                    return (
                      <motion.a
                        key={social.name}
                        href={social.link}
                        target={social.link.startsWith("http") ? "_blank" : undefined}
                        rel={social.link.startsWith("http") ? "noopener noreferrer" : undefined}
                        whileHover={{
                          y: -3,
                        }}
                        whileTap={{
                          scale: 0.96,
                        }}
                        className={`flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-xs font-medium transition-all duration-300 ${
                          isDarkMode
                            ? "border-white/10 bg-white/[0.02] hover:bg-white/[0.06]"
                            : "border-gray-200 bg-gray-50 hover:bg-white"
                        }`}
                        style={{
                          color: "var(--text-body)",
                        }}
                      >
                        <Icon size={15} />

                        {social.name}
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          {/* =================================================
              FORM
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: 35,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.55,
              delay: 0.1,
            }}
          >
            <div
              className={`relative overflow-hidden rounded-3xl border p-6 sm:p-8 lg:p-9 ${
                isDarkMode
                  ? "bg-white/[0.045] border-white/10"
                  : "bg-white border-gray-200 shadow-sm"
              }`}
            >
              {/* TOP ACCENT */}

              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background:
                    "linear-gradient(to right, transparent, var(--primary), transparent)",
                }}
              />

              {/* HEADER */}

              <div className="relative flex items-start justify-between gap-5 mb-7">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="text-xs font-semibold uppercase tracking-[0.18em]"
                      style={{
                        color: "var(--primary)",
                      }}
                    >
                      Start a conversation
                    </span>
                  </div>

                  <h2
                    className="text-2xl sm:text-3xl font-bold"
                    style={{
                      color: "var(--text-heading)",
                    }}
                  >
                    Send me a message
                  </h2>

                  <p
                    className={`mt-2 text-sm ${
                      isDarkMode
                        ? "text-gray-500"
                        : "text-gray-500"
                    }`}
                  >
                    Tell me a little about what you need.
                  </p>
                </div>

                <div
                  className="hidden sm:flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
                  style={{
                    color: "var(--primary)",
                    background:
                      "color-mix(in srgb, var(--primary) 10%, transparent)",
                  }}
                >
                  <FiSend size={20} />
                </div>
              </div>

              {/* ERROR */}

              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -10,
                    }}
                    role="alert"
                    className="mb-5 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-500"
                  >
                    <FiX
                      size={17}
                      className="mt-0.5 flex-shrink-0"
                      aria-hidden="true"
                    />

                    <span className="break-words">
                      {error}{" "}
                      {errorCode !== null || !fieldErrors ? (
                        <a
                          href={`mailto:${profile.email}?subject=${encodeURIComponent(
                            "Portfolio enquiry"
                          )}&body=${encodeURIComponent(formData.message)}`}
                          className="font-semibold underline underline-offset-2"
                        >
                          Open your email app
                        </a>
                      ) : null}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* SUCCESS */}

              <AnimatePresence>
                {formStatus === "succeeded" && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.96,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.96,
                    }}
                    role="status"
                    className="mb-5 flex items-center gap-3 rounded-xl border border-green-500/20 bg-green-500/5 p-4"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white">
                      <FiCheck size={16} />
                    </span>

                    <div>
                      <p className="text-sm font-semibold text-green-500">
                        Message sent successfully
                      </p>

                      <p
                        className={`text-xs mt-0.5 ${
                          isDarkMode
                            ? "text-gray-500"
                            : "text-gray-500"
                        }`}
                      >
                        Thanks for reaching out. I&apos;ll get back
                        to you soon.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* FORM */}

              <form
                onSubmit={handleSubmit}
                noValidate
                className="relative space-y-5"
                aria-busy={formStatus === "loading"}
              >
                {/* Honeypot — hidden from people and assistive tech */}
                <div
                  aria-hidden="true"
                  className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
                >
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>
                {/* NAME */}

                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    placeholder="Your first name"
                    required
                    error={validationErrors.firstName}
                    focused={focusedField === "firstName"}
                    isDarkMode={isDarkMode}
                    inputBase={inputBase}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={() =>
                      setFocusedField("firstName")
                    }
                    icon={<FiUser size={15} />}
                  />

                  <FormField
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    placeholder="Your last name"
                    required
                    error={validationErrors.lastName}
                    focused={focusedField === "lastName"}
                    isDarkMode={isDarkMode}
                    inputBase={inputBase}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={() =>
                      setFocusedField("lastName")
                    }
                  />
                </div>

                {/* EMAIL + PHONE */}

                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    placeholder="you@example.com"
                    required
                    error={validationErrors.email}
                    focused={focusedField === "email"}
                    isDarkMode={isDarkMode}
                    inputBase={inputBase}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={() =>
                      setFocusedField("email")
                    }
                    icon={<FiMail size={15} />}
                  />

                  <FormField
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    placeholder="Optional"
                    error={validationErrors.phone}
                    focused={focusedField === "phone"}
                    isDarkMode={isDarkMode}
                    inputBase={inputBase}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onFocus={() =>
                      setFocusedField("phone")
                    }
                    icon={<FiPhone size={15} />}
                  />
                </div>

                {/* SERVICE */}

                <div>
                  <label
                    htmlFor="service"
                    className="mb-2 block text-xs font-semibold uppercase tracking-wider"
                    style={{
                      color: "var(--text-body)",
                    }}
                  >
                    What can I help you with?
                  </label>

                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className={`${inputBase} cursor-pointer appearance-none`}
                    style={{
                      backgroundColor: isDarkMode
                        ? "rgba(255,255,255,0.04)"
                        : "rgba(0,0,0,0.02)",
                      borderColor:
                        isDarkMode
                          ? "rgba(255,255,255,0.1)"
                          : "rgba(0,0,0,0.1)",
                      color: formData.service
                        ? "var(--text-heading)"
                        : isDarkMode
                        ? "#6b7280"
                        : "#9ca3af",
                    }}
                  >
                    <option value="">
                      Select a topic
                    </option>

                    {content.services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                {/* MESSAGE */}

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-xs font-semibold uppercase tracking-wider"
                    style={{
                      color: "var(--text-body)",
                    }}
                  >
                    Your Message
                    <span className="ml-1 text-red-500">*</span>
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    maxLength={5000}
                    required
                    aria-invalid={Boolean(validationErrors.message)}
                    aria-describedby={
                      validationErrors.message ? "message-error" : undefined
                    }
                    placeholder="Tell me about your project, goals, timeline, or anything else you'd like to discuss..."
                    className={`${inputBase} resize-none`}
                    style={{
                      backgroundColor: isDarkMode
                        ? "rgba(255,255,255,0.04)"
                        : "rgba(0,0,0,0.02)",
                      borderColor: validationErrors.message
                        ? "#ef4444"
                        : focusedField === "message"
                          ? "var(--primary)"
                          : isDarkMode
                          ? "rgba(255,255,255,0.1)"
                          : "rgba(0,0,0,0.1)",
                      color: "var(--text-heading)",
                      boxShadow:
                        focusedField === "message"
                          ? "0 0 0 4px color-mix(in srgb, var(--primary) 12%, transparent)"
                          : "none",
                    }}
                    onFocus={() =>
                      setFocusedField("message")
                    }
                    onBlur={handleBlur}
                  />

                  {validationErrors.message && (
                    <p
                      id="message-error"
                      className="mt-1.5 flex items-center gap-1 text-[11px] text-red-500"
                    >
                      <FiX size={12} aria-hidden="true" />
                      {validationErrors.message}
                    </p>
                  )}
                </div>

                {/* SUBMIT */}

                <motion.button
                  type="submit"
                  disabled={
                    formStatus === "loading" ||
                    formStatus === "succeeded"
                  }
                  whileHover={{
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.985,
                  }}
                  className="group relative w-full overflow-hidden rounded-xl py-4 px-6 font-semibold text-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60"
                  style={{
                    background:
                      formStatus === "succeeded"
                        ? "linear-gradient(135deg,#22c55e,#16a34a)"
                        : "linear-gradient(135deg,var(--primary),var(--primary-2))",
                    boxShadow:
                      formStatus === "succeeded"
                        ? "none"
                        : "0 12px 30px color-mix(in srgb, var(--primary) 20%, transparent)",
                  }}
                >
                  {/* SHINE */}

                  {formStatus === "idle" && (
                    <span className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-700 group-hover:translate-x-full" />
                  )}

                  <span className="relative flex items-center justify-center gap-2">
                    {formStatus === "idle" && (
                      <>
                        Send Message
                        <FiArrowUpRight
                          size={17}
                          className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </>
                    )}

                    {formStatus === "loading" && (
                      <>
                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Sending...
                      </>
                    )}

                    {formStatus === "succeeded" && (
                      <>
                        <FiCheck size={18} />
                        Message Sent
                      </>
                    )}

                    {formStatus === "failed" && (
                      <>
                        Try Again
                        <FiArrowUpRight size={17} />
                      </>
                    )}
                  </span>
                </motion.button>

                <p
                  className={`text-center text-[11px] ${
                    isDarkMode
                      ? "text-gray-600"
                      : "text-gray-400"
                  }`}
                >
                  Your information is only used to respond to
                  your enquiry.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

/* =============================================================
   FORM FIELD
============================================================= */

function FormField({
  label,
  name,
  type = "text",
  value,
  placeholder,
  required,
  error,
  focused,
  isDarkMode,
  inputBase,
  onChange,
  onBlur,
  onFocus,
  icon,
}) {
  return (
    <div className="min-w-0">
      <label
        htmlFor={name}
        className="mb-2 block text-xs font-semibold uppercase tracking-wider"
        style={{
          color: "var(--text-body)",
        }}
      >
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

      <div className="relative">
        {icon && (
          <span
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
            style={{
              color: focused
                ? "var(--primary)"
                : isDarkMode
                ? "#6b7280"
                : "#9ca3af",
            }}
          >
            {icon}
          </span>
        )}

        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          placeholder={placeholder}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${name}-error` : undefined}
          autoComplete={
            {
              firstName: "given-name",
              lastName: "family-name",
              email: "email",
              phone: "tel",
            }[name]
          }
          className={`${inputBase} ${
            icon ? "pl-11" : ""
          }`}
          style={{
            backgroundColor: isDarkMode
              ? "rgba(255,255,255,0.04)"
              : "rgba(0,0,0,0.02)",
            borderColor: error
              ? "#ef4444"
              : focused
              ? "var(--primary)"
              : isDarkMode
              ? "rgba(255,255,255,0.1)"
              : "rgba(0,0,0,0.1)",
            color: "var(--text-heading)",
            boxShadow: error
              ? "0 0 0 3px rgba(239,68,68,0.08)"
              : focused
              ? "0 0 0 4px color-mix(in srgb, var(--primary) 12%, transparent)"
              : "none",
          }}
        />
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            id={`${name}-error`}
            initial={{
              opacity: 0,
              height: 0,
              y: -5,
            }}
            animate={{
              opacity: 1,
              height: "auto",
              y: 0,
            }}
            exit={{
              opacity: 0,
              height: 0,
              y: -5,
            }}
            className="mt-1.5 flex items-center gap-1 text-[11px] text-red-500"
          >
            <FiX size={12} />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}