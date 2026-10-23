"use client";

import { useTheme } from "@/components/ThemeProvider";
import { fallbackResume } from "@/lib/publicContent";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { motion } from "framer-motion";
import {
  FiBriefcase,
  FiCalendar,
  FiCheckCircle,
  FiMapPin,
} from "react-icons/fi";

const Experience = () => {
  const { isDarkMode } = useTheme();
  const { experiences } = fallbackResume;

  return (
    <section
      className={`relative overflow-clip py-20 sm:py-24 lg:py-28 transition-colors duration-500 ${
        isDarkMode
          ? "bg-gradient-to-b from-[#050816] via-[#070912] to-[#02040b]"
          : "bg-gradient-to-b from-gray-50 via-white to-gray-50"
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

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* =========================================================
            HEADER
        ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16 sm:mb-20"
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
              My Journey
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
            Work{" "}
            <span
              style={{
                color: "var(--primary)",
              }}
            >
              Experience
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
            {profile.experienceYears}+ years building React, Next.js, and React
            Native applications — from e-commerce launches to field
            operations platforms.
          </p>
        </motion.div>

        {/* =========================================================
            EXPERIENCE TIMELINE
        ========================================================= */}
        <div className="relative">
          {/* DESKTOP CENTER LINE */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2">
            <div
              className="w-px h-full opacity-50"
              style={{
                background: `linear-gradient(
                  to bottom,
                  transparent,
                  var(--primary) 8%,
                  var(--primary) 92%,
                  transparent
                )`,
              }}
            />
          </div>

          {/* MOBILE LINE */}
          <div
            className="md:hidden absolute left-[15px] top-0 bottom-0 w-px"
            style={{
              background: `linear-gradient(
                to bottom,
                transparent,
                var(--primary) 8%,
                var(--primary) 92%,
                transparent
              )`,
              opacity: 0.45,
            }}
          />

          <div className="space-y-10 md:space-y-20">
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={`${exp.role}-${index}`}
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
                  className="relative"
                >
                  {/* =================================================
                      DESKTOP LAYOUT
                  ================================================= */}
                  <div className="hidden md:grid md:grid-cols-[1fr_80px_1fr] items-center gap-0">
                    {/* LEFT SIDE */}
                    <div className={isLeft ? "pr-8" : "pr-8"}>
                      {isLeft ? (
                        <ExperienceCard
                          exp={exp}
                          index={index}
                          isDarkMode={isDarkMode}
                        />
                      ) : (
                        <div className="flex justify-end">
                          <DateBadge
                            duration={exp.duration}
                            index={index}
                            isDarkMode={isDarkMode}
                          />
                        </div>
                      )}
                    </div>

                    {/* CENTER */}
                    <div className="relative flex justify-center h-full min-h-[320px]">
                      {/* TIMELINE DOT */}
                      <motion.div
                        initial={{
                          scale: 0.5,
                          opacity: 0,
                        }}
                        whileInView={{
                          scale: 1,
                          opacity: 1,
                        }}
                        viewport={{
                          once: true,
                        }}
                        transition={{
                          duration: 0.4,
                          delay: index * 0.1 + 0.15,
                        }}
                        className="relative z-20 flex items-center justify-center"
                      >
                        {/* OUTER RING */}
                        <div
                          className="absolute h-12 w-12 rounded-full border opacity-30"
                          style={{
                            borderColor: "var(--primary)",
                          }}
                        />

                        {/* GLOW */}
                        <div
                          className="absolute h-7 w-7 rounded-full blur-md opacity-60"
                          style={{
                            background: "var(--primary)",
                          }}
                        />

                        {/* DOT */}
                        <div
                          className="relative h-3.5 w-3.5 rounded-full border-2 border-white"
                          style={{
                            background: "var(--primary)",
                          }}
                        />
                      </motion.div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="pl-8">
                      {!isLeft ? (
                        <ExperienceCard
                          exp={exp}
                          index={index}
                          isDarkMode={isDarkMode}
                        />
                      ) : (
                        <div className="flex justify-start">
                          <DateBadge
                            duration={exp.duration}
                            index={index}
                            isDarkMode={isDarkMode}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* =================================================
                      MOBILE LAYOUT
                  ================================================= */}
                  <div className="md:hidden relative pl-10">
                    {/* MOBILE DOT */}
                    <div className="absolute left-0 top-8 z-20">
                      <div
                        className="relative flex h-8 w-8 items-center justify-center rounded-full border"
                        style={{
                          borderColor:
                            "color-mix(in srgb, var(--primary) 45%, transparent)",
                          background: isDarkMode
                            ? "#070912"
                            : "#ffffff",
                        }}
                      >
                        <div
                          className="h-2.5 w-2.5 rounded-full"
                          style={{
                            background: "var(--primary)",
                            boxShadow:
                              "0 0 12px var(--primary)",
                          }}
                        />
                      </div>
                    </div>

                    <ExperienceCard
                      exp={exp}
                      index={index}
                      isDarkMode={isDarkMode}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* =========================================================
            BOTTOM SUMMARY
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
          className="mt-16 sm:mt-20 flex justify-center"
        >
          <div
            className={`inline-flex flex-wrap justify-center items-center gap-x-6 gap-y-3 rounded-2xl border px-6 py-4 text-center ${
              isDarkMode
                ? "bg-white/[0.03] border-white/10"
                : "bg-white border-gray-200 shadow-sm"
            }`}
          >
            <div>
              <p
                className="text-xl sm:text-2xl font-bold"
                style={{
                  color: "var(--primary)",
                }}
              >
                {profile.experienceYears}+
              </p>
              <p
                className={`text-[11px] sm:text-xs ${
                  isDarkMode
                    ? "text-gray-500"
                    : "text-gray-500"
                }`}
              >
                Years Experience
              </p>
            </div>

            <div
              className={`h-8 w-px ${
                isDarkMode
                  ? "bg-white/10"
                  : "bg-gray-200"
              }`}
            />

            <div>
              <p
                className="text-xl sm:text-2xl font-bold"
                style={{
                  color: "var(--primary)",
                }}
              >
                {experiences.length}
              </p>
              <p
                className={`text-[11px] sm:text-xs ${
                  isDarkMode
                    ? "text-gray-500"
                    : "text-gray-500"
                }`}
              >
                Professional Roles
              </p>
            </div>

            <div
              className={`h-8 w-px ${
                isDarkMode
                  ? "bg-white/10"
                  : "bg-gray-200"
              }`}
            />

            <div>
              <p
                className="text-xl sm:text-2xl font-bold"
                style={{
                  color: "var(--primary)",
                }}
              >
                {projects.length}
              </p>
              <p
                className={`text-[11px] sm:text-xs ${
                  isDarkMode
                    ? "text-gray-500"
                    : "text-gray-500"
                }`}
              >
                Projects
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* =============================================================
   EXPERIENCE CARD
============================================================= */

function ExperienceCard({
  exp,
  index,
  isDarkMode,
}) {
  return (
    <motion.div
      whileHover={{
        y: -6,
      }}
      transition={{
        duration: 0.25,
      }}
      className={`group relative w-full rounded-2xl border p-5 sm:p-6 lg:p-7 overflow-hidden transition-all duration-300 ${
        isDarkMode
          ? "bg-white/[0.045] border-white/10 hover:border-white/20"
          : "bg-white border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-xl"
      }`}
      style={{
        boxShadow: isDarkMode
          ? "0 18px 50px rgba(0,0,0,0.22)"
          : undefined,
      }}
    >
      {/* BACKGROUND NUMBER */}
      <div
        className="pointer-events-none absolute -right-3 -top-7 text-[100px] sm:text-[120px] font-black leading-none opacity-[0.025]"
        style={{
          color: "var(--primary)",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* TOP GLOW */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-60"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--primary), transparent)",
        }}
      />

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
          <FiCalendar size={13} />
        </span>

        <span
          className="text-[11px] sm:text-xs font-semibold tracking-wide"
          style={{
            color: "var(--primary)",
          }}
        >
          {exp.duration}
        </span>
      </div>

      {/* ROLE */}
      <h3
        className="relative text-xl sm:text-2xl font-bold leading-tight mb-2"
        style={{
          color: "var(--text-heading)",
        }}
      >
        {exp.role}
      </h3>

      {/* COMPANY */}
      <div className="relative flex flex-wrap items-center gap-x-4 gap-y-1 mb-5">
        <span
          className={`inline-flex items-center gap-1.5 text-sm font-medium ${
            isDarkMode
              ? "text-gray-300"
              : "text-gray-700"
          }`}
        >
          <FiBriefcase
            size={14}
            style={{
              color: "var(--primary)",
            }}
          />

          {exp.company}
        </span>

        <span
          className={`hidden sm:block h-1 w-1 rounded-full ${
            isDarkMode
              ? "bg-gray-600"
              : "bg-gray-300"
          }`}
        />

        <span
          className={`inline-flex items-center gap-1.5 text-xs ${
            isDarkMode
              ? "text-gray-500"
              : "text-gray-500"
          }`}
        >
          <FiMapPin size={13} />

          {exp.location}
        </span>
      </div>

      {/* PROJECT */}
      {exp.project && (
        <p
          className={`relative -mt-2 mb-5 text-xs ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          <span className="font-semibold" style={{ color: "var(--primary)" }}>
            Project{exp.project.includes(",") ? "s" : ""}:
          </span>{" "}
          {exp.project}
          {exp.website && (
            <>
              {" · "}
              <a
                href={exp.website}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:opacity-80"
              >
                {exp.website.replace(/^https?:\/\//, "")}
              </a>
            </>
          )}
        </p>
      )}

      {/* DIVIDER */}
      <div
        className={`h-px mb-5 ${
          isDarkMode
            ? "bg-white/10"
            : "bg-gray-100"
        }`}
      />

      {/* ACHIEVEMENTS */}
      <div className="relative space-y-3">
        {exp.points.map((point, pointIndex) => (
          <div
            key={pointIndex}
            className="flex items-start gap-2.5"
          >
            <span
              className="mt-0.5 flex-shrink-0"
              style={{
                color: "var(--primary)",
              }}
            >
              <FiCheckCircle size={14} />
            </span>

            <p
              className={`text-xs sm:text-sm leading-relaxed ${
                isDarkMode
                  ? "text-gray-400"
                  : "text-gray-600"
              }`}
            >
              {point}
            </p>
          </div>
        ))}
      </div>

      {/* TECH STACK */}
      {exp.tech?.length > 0 && (
        <div className="relative mt-6 pt-5 border-t border-black/10 dark:border-white/10">
          <p
            className={`text-[10px] uppercase tracking-[0.18em] font-semibold mb-3 ${
              isDarkMode
                ? "text-gray-500"
                : "text-gray-400"
            }`}
          >
            Technologies
          </p>

          <div className="flex flex-wrap gap-2">
            {exp.tech.map((technology) => (
              <span
                key={technology}
                className={`px-2.5 py-1.5 rounded-lg border text-[11px] sm:text-xs font-medium ${
                  isDarkMode
                    ? "bg-white/[0.03] border-white/10"
                    : "bg-gray-50 border-gray-200"
                }`}
                style={{
                  color: "var(--primary)",
                }}
              >
                {technology}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* HOVER ACCENT */}
      <div
        className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 transition-all duration-500 group-hover:w-2/3"
        style={{
          background: "var(--primary)",
        }}
      />
    </motion.div>
  );
}

/* =============================================================
   DATE BADGE
============================================================= */

function DateBadge({
  duration,
  index,
  isDarkMode,
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-2xl border px-6 py-5 ${
        isDarkMode
          ? "bg-white/[0.025] border-white/10"
          : "bg-white border-gray-200"
      }`}
    >
      <span
        className="text-2xl font-black opacity-10"
        style={{
          color: "var(--primary)",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <FiCalendar
        size={16}
        className="mb-2"
        style={{
          color: "var(--primary)",
        }}
      />

      <span
        className={`text-xs font-semibold text-center ${
          isDarkMode
            ? "text-gray-400"
            : "text-gray-600"
        }`}
      >
        {duration}
      </span>
    </div>
  );
}

export default Experience;