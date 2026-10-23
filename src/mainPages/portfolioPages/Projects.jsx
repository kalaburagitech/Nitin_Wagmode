"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  FiStar,
  FiGlobe,
  FiGithub,
  FiSmartphone,
  FiExternalLink,
  FiArrowUpRight,
} from "react-icons/fi";
import { useTheme } from "@/components/ThemeProvider";
import { fallbackPortfolio } from "@/lib/publicContent";

export default function Projects() {
  const { isDarkMode } = useTheme();
  const [filter, setFilter] = useState("all");

  const { categories, projects } = fallbackPortfolio;

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  return (
    <section
      className={`relative min-h-screen overflow-clip py-20 sm:py-24 lg:py-28 px-4 transition-colors duration-500 ${
        isDarkMode
          ? "bg-gradient-to-b from-[#050816] via-[#070912] to-[#02040b] text-white"
          : "bg-gradient-to-b from-gray-50 via-white to-gray-50 text-gray-900"
      }`}
    >
      {/* =========================================================
          BACKGROUND DECORATION
      ========================================================= */}

      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full blur-3xl opacity-10"
        style={{
          background: "var(--primary)",
        }}
      />

      <div
        className="pointer-events-none absolute top-[35%] -left-40 h-80 w-80 rounded-full blur-3xl opacity-[0.06]"
        style={{
          background: "var(--primary)",
        }}
      />

      <div
        className="pointer-events-none absolute bottom-0 -right-40 h-80 w-80 rounded-full blur-3xl opacity-[0.06]"
        style={{
          background: "var(--primary)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-0 sm:px-2">
        {/* =========================================================
            HEADER
        ========================================================= */}

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
            duration: 0.5,
          }}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 lg:mb-20"
        >
          {/* SMALL LABEL */}

          <div className="inline-flex items-center gap-2 mb-4">
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
              My Work
            </span>

            <span
              className="h-px w-8"
              style={{
                background: "var(--primary)",
              }}
            />
          </div>

          {/* TITLE */}

          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight"
            style={{
              color: "var(--text-heading)",
            }}
          >
            My{" "}
            <span
              style={{
                color: "var(--primary)",
              }}
            >
              Projects
            </span>
          </h2>

          {/* UNDERLINE */}

          <div
            className="w-20 h-1 mx-auto mt-5 rounded-full"
            style={{
              background:
                "linear-gradient(to right, var(--primary), var(--primary-2))",
            }}
          />

          {/* DESCRIPTION */}

          <p
            className={`mt-5 text-sm sm:text-base leading-relaxed ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Field operations platforms, e-commerce products, and UI
            engineering work I&apos;ve contributed to across React, Next.js,
            and React Native.
          </p>
        </motion.div>

        {/* =========================================================
            FILTER
        ========================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.5,
          }}
          className="flex justify-center flex-wrap gap-2.5 sm:gap-3 mb-12 sm:mb-16"
        >
          {categories.map((category) => {
            const isActive = filter === category.id;

            return (
              <button
                key={category.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setFilter(category.id)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "text-white shadow-lg scale-[1.03]"
                    : isDarkMode
                      ? "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white"
                      : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
                }`}
                style={
                  isActive
                    ? {
                        background: "var(--primary)",
                      }
                    : undefined
                }
              >
                {category.name}
              </button>
            );
          })}
        </motion.div>

        {/* =========================================================
            PROJECT GRID
        ========================================================= */}

        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProjects.map((project, index) => {
              const hasLiveLink =
                typeof project.liveLink === "string" &&
                project.liveLink.trim().length > 0;

              const hasGithubLink =
                typeof project.githubLink === "string" &&
                project.githubLink.trim().length > 0;

              const playstoreLinks = Array.isArray(project.playstoreLinks)
                ? project.playstoreLinks.filter(
                    (app) =>
                      app &&
                      typeof app.url === "string" &&
                      app.url.trim().length > 0
                  )
                : [];

              const hasPlayStoreLinks = playstoreLinks.length > 0;

              return (
                <motion.article
                  key={project.id}
                  /* =====================================================
                     EXPERIENCE STYLE SCROLL ANIMATION
                  ===================================================== */
                  initial={{
                    opacity: 0,
                    y: 40,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.15,
                  }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.1,
                  }}
                  /* =====================================================
                     EXPERIENCE STYLE HOVER
                  ===================================================== */
                  whileHover={{
                    y: -6,
                  }}
                  className={`group relative flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 ${
                    isDarkMode
                      ? "bg-white/[0.045] border-white/10 hover:border-white/20 hover:bg-white/[0.06]"
                      : "bg-white border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-xl"
                  }`}
                  style={{
                    boxShadow: isDarkMode
                      ? "0 18px 50px rgba(0,0,0,0.22)"
                      : undefined,
                  }}
                >
                  {/* =====================================================
                      TOP GLOW
                  ===================================================== */}

                  <div
                    className="absolute top-0 left-0 right-0 h-px opacity-60 z-20"
                    style={{
                      background:
                        "linear-gradient(to right, transparent, var(--primary), transparent)",
                    }}
                  />

                  {/* =====================================================
                      BACKGROUND PROJECT NUMBER
                  ===================================================== */}

                  <div
                    className="pointer-events-none absolute -right-3 -top-7 text-[100px] sm:text-[120px] font-black leading-none opacity-[0.025] z-0"
                    style={{
                      color: "var(--primary)",
                    }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>

                <div className="relative h-56 sm:h-70 overflow-hidden z-10">
                    <Image
                      src={project.image}
                      alt={`${project.title} — ${project.subcategory} illustration`}
                      fill
                      unoptimized={project.image.endsWith(".svg")}
                      priority={index < 3}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* IMAGE OVERLAY */}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                    {/* PROJECT NUMBER */}

                    <div className="absolute top-4 right-4">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs font-semibold">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* FEATURED */}

                    {project.id === 1 && (
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-400 text-black px-3 py-1.5 text-xs font-semibold shadow-lg">
                          <FiStar size={12} />
                          Featured
                        </span>
                      </div>
                    )}

                    {/* CATEGORY */}

                    <div className="absolute bottom-4 left-4">
                      <span className="rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white px-3 py-1.5 text-xs">
                        {project.subcategory}
                      </span>
                    </div>
                  </div>

                  {/* =====================================================
                      CONTENT
                  ===================================================== */}

                  <div className="relative flex flex-col flex-1 p-5 sm:p-6 lg:p-7 z-10">
                    {/* DATE */}

                    <div className="relative flex items-center gap-2 mb-4">
                      <span
                        className="flex h-7 w-7 items-center justify-center rounded-lg"
                        style={{
                          background:
                            "color-mix(in srgb, var(--primary) 12%, transparent)",
                          color: "var(--primary)",
                        }}
                      >
                        <FiSmartphone size={13} />
                      </span>

                      <span
                        className="text-[11px] sm:text-xs font-semibold tracking-wide"
                        style={{
                          color: "var(--primary)",
                        }}
                      >
                        {project.period}
                      </span>
                    </div>

                    {/* TITLE */}

                    <div className="mb-2">
                      <h3
                        className="text-xl sm:text-2xl font-bold tracking-tight"
                        style={{
                          color: "var(--text-heading)",
                        }}
                      >
                        {project.title}
                      </h3>
                    </div>

                    {/* COMPANY */}

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-2">
                      <span
                        className={`text-sm font-medium ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {project.company}
                      </span>
                    </div>

                    {/* DIVIDER */}

                    <div
                      className={`h-px mb-5 ${
                        isDarkMode ? "bg-white/10" : "bg-gray-100"
                      }`}
                    />

                    {/* DESCRIPTION */}

                    <p
                      className={`text-xs sm:text-sm leading-relaxed mb-2 ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {project.description}
                    </p>

                    {/* =================================================
                        FEATURES
                    ================================================= */}

                    {project.features?.length > 0 && (
                      <div className="mb-3">
                        <div className="space-y-2.5">
                          {project.features
                            .slice(0, 4)
                            .map((feature, featureIndex) => (
                              <div
                                key={featureIndex}
                                className="flex items-start gap-2.5"
                              >
                                <span
                                  className="mt-1 flex-shrink-0"
                                  style={{
                                    color: "var(--primary)",
                                  }}
                                >
                                  <span
                                    className="block h-1.5 w-1.5 rounded-full"
                                    style={{
                                      background: "var(--primary)",
                                    }}
                                  />
                                </span>

                                <p
                                  className={`text-xs sm:text-sm leading-relaxed ${
                                    isDarkMode
                                      ? "text-gray-400"
                                      : "text-gray-600"
                                  }`}
                                >
                                  {feature}
                                </p>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}

                    {/* =================================================
                        TECH STACK
                    ================================================= */}

                    {project.tech?.length > 0 && (
                      <div className="relative mt-1 mb-2 pt-5 border-t border-black/10 dark:border-white/10">
                        <p
                          className={`text-[10px] uppercase tracking-[0.18em] font-semibold mb-3 ${
                            isDarkMode ? "text-gray-500" : "text-gray-400"
                          }`}
                        >
                          Technologies
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((technology) => (
                            <span
                              key={technology}
                              className={`px-2.5 py-1.5 rounded-lg border text-[11px] sm:text-xs font-medium ${
                                isDarkMode
                                  ? "bg-white/[0.03] border-white/10"
                                  : "bg-gray-50 border-gray-200"
                              }`}
                              style={{
                                color: "var(--primary)",
                                borderColor:
                                  "color-mix(in srgb, var(--primary) 35%, transparent)",
                              }}
                            >
                              {technology}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* =================================================
                        LINKS
                    ================================================= */}

                    {(hasLiveLink ||
                      hasGithubLink ||
                      hasPlayStoreLinks) && (
                      <div className="mt-auto pt-5 border-t border-black/10 dark:border-white/10">
                        {/* WEBSITE + GITHUB */}

                        {(hasLiveLink || hasGithubLink) && (
                          <div
                            className={`grid gap-2.5 ${
                              hasLiveLink && hasGithubLink
                                ? "grid-cols-1 sm:grid-cols-2"
                                : "grid-cols-1"
                            }`}
                          >
                            {/* WEBSITE */}

                            {hasLiveLink && (
                              <a
                                href={project.liveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/link w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold text-white transition-all duration-300 hover:opacity-90"
                                style={{
                                  background: "var(--primary)",
                                }}
                              >
                                <FiGlobe size={16} />

                                <span>{project.liveLabel || "Website"}</span>

                                <FiArrowUpRight
                                  size={14}
                                  className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                                />
                              </a>
                            )}

                            {/* GITHUB */}

                            {hasGithubLink && (
                              <a
                                href={project.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`group/link w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold border transition-all duration-300 ${
                                  isDarkMode
                                    ? "border-white/15 bg-white/[0.02] hover:bg-white/10"
                                    : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                                }`}
                              >
                                <FiGithub size={16} />

                                <span>GitHub</span>

                                <FiArrowUpRight
                                  size={14}
                                  className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                                />
                              </a>
                            )}
                          </div>
                        )}

                {/* PLAY STORE APPS */}
{hasPlayStoreLinks && (
  <div className="mt-3">
    <div className="flex flex-wrap gap-2">
      {playstoreLinks.map((app, appIndex) => (
        <a
          key={`${app.url}-${appIndex}`}
          href={app.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`group/app inline-flex items-center gap-2 py-2 px-3 rounded-lg border transition-all duration-300 ${
            isDarkMode
              ? "border-white/10 bg-white/[0.03] hover:bg-white/[0.08]"
              : "border-gray-200 bg-gray-50 hover:bg-gray-100"
          }`}
        >
          <span
            className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md"
            style={{
              background:
                "color-mix(in srgb, var(--primary) 12%, transparent)",
              color: "var(--primary)",
            }}
          >
            <FiSmartphone size={12} />
          </span>

          <span className="text-xs font-medium max-w-[90px] truncate">
            {app.name || `App ${appIndex + 1}`}
          </span>

          <FiExternalLink
            size={12}
            className="flex-shrink-0 opacity-50 transition-all duration-200 group-hover/app:opacity-100"
          />
        </a>
      ))}
    </div>
  </div>
)}
                      </div>
                    )}
                  </div>

                  {/* =====================================================
                      BOTTOM HOVER ACCENT
                  ===================================================== */}

                  <div
                    className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 transition-all duration-500 group-hover:w-2/3 z-20"
                    style={{
                      background: "var(--primary)",
                    }}
                  />
                </motion.article>
              );
            })}
          </div>
        ) : (
          /* =========================================================
             EMPTY STATE
          ========================================================= */

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="py-20 text-center"
          >
            <div
              className={`inline-flex flex-col items-center justify-center rounded-2xl px-8 py-10 border ${
                isDarkMode
                  ? "bg-white/5 border-white/10"
                  : "bg-white border-gray-200"
              }`}
            >
              <p className="text-lg font-semibold mb-2">
                No projects found
              </p>

              <p className="text-sm opacity-60">
                Try selecting another category.
              </p>
            </div>
          </motion.div>
        )}

  
      </div>
    </section>
  );
}