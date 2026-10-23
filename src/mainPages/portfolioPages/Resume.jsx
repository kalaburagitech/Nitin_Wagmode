"use client";

import { motion } from "framer-motion";
import {
  FiBriefcase,
  FiCalendar,
  FiCheckCircle,
  FiDownload,
  FiExternalLink,
  FiAward,
  FiBookOpen,
  FiCode,
  FiMapPin,
} from "react-icons/fi";
import { useTheme } from "@/components/ThemeProvider";
import { fallbackResume } from "@/lib/publicContent";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

export default function Resume() {
  const { isDarkMode } = useTheme();

  const {
    experiences = [],
    education = [],
    certifications = [],
    achievements = [],
    resumeUrl,
  } = fallbackResume;

  return (
    <div
      className={`relative min-h-screen overflow-clip transition-colors duration-500 ${
        isDarkMode
          ? "bg-[#05060d] text-white"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* =========================================================
          BACKGROUND
      ========================================================= */}

      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full blur-3xl opacity-[0.08]"
        style={{
          background: "var(--primary)",
        }}
      />

      <div
        className="pointer-events-none absolute top-[40%] -left-48 h-96 w-96 rounded-full blur-3xl opacity-[0.05]"
        style={{
          background: "var(--primary)",
        }}
      />

      <div
        className="pointer-events-none absolute bottom-0 -right-48 h-96 w-96 rounded-full blur-3xl opacity-[0.05]"
        style={{
          background: "var(--primary)",
        }}
      />

      {/* =========================================================
          MAIN CONTAINER
      ========================================================= */}

      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28">
        {/* =======================================================
            HEADER
        ======================================================= */}

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
          className="max-w-3xl mx-auto text-center mb-16 sm:mb-20"
        >
          {/* LABEL */}

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

          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight"
            style={{
              color: "var(--text-heading)",
            }}
          >
            Experience{" "}
            <span
              style={{
                color: "var(--primary)",
              }}
            >
              & Education
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
            className={`mt-5 text-sm sm:text-base leading-relaxed ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            A quick overview of my professional experience, education, and
            key results as a frontend developer.
          </p>
        </motion.div>

        {/* =======================================================
            TOP SUMMARY
        ======================================================= */}

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
            amount: 0.2,
          }}
          transition={{
            duration: 0.5,
          }}
          className={`mb-14 sm:mb-16 rounded-2xl border p-5 sm:p-6 lg:p-7 ${
            isDarkMode
              ? "bg-white/[0.035] border-white/10"
              : "bg-white border-gray-200 shadow-sm"
          }`}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-0">
            <ResumeStat
              value={`${profile.experienceYears}+`}
              label="Years Experience"
              isDarkMode={isDarkMode}
            />

            <ResumeStat
              value={`${experiences.length}`}
              label="Professional Roles"
              isDarkMode={isDarkMode}
              border
            />

            <ResumeStat
              value={`${projects.length}`}
              label="Featured Projects"
              isDarkMode={isDarkMode}
              border
            />

            <ResumeStat
              value="8.5"
              label="BCA CGPA"
              isDarkMode={isDarkMode}
              border
            />
          </div>
        </motion.div>

        {/* =======================================================
            EXPERIENCE + EDUCATION
        ======================================================= */}

        <div className="grid lg:grid-cols-[1.25fr_0.75fr] gap-10 lg:gap-14">
          {/* =====================================================
              EXPERIENCE
          ===================================================== */}

          <div>
            <SectionHeading
              icon={<FiBriefcase size={19} />}
              title="Work Experience"
              isDarkMode={isDarkMode}
            />

            <div className="relative mt-8 pl-7 sm:pl-9">
              {/* TIMELINE */}

              <div
                className="absolute left-[6px] sm:left-[8px] top-2 bottom-2 w-px"
                style={{
                  background: `linear-gradient(
                    to bottom,
                    var(--primary),
                    color-mix(in srgb, var(--primary) 15%, transparent)
                  )`,
                }}
              />

              <div className="space-y-7">
                {experiences.map((experience, index) => (
                  <motion.article
                    key={`${experience.role}-${index}`}
                    initial={{
                      opacity: 0,
                      x: -25,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.15,
                    }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.08,
                    }}
                    className="relative"
                  >
                    {/* TIMELINE DOT */}

                    <div
                      className="absolute -left-[27px] sm:-left-[31px] top-7 z-10 flex h-4 w-4 items-center justify-center rounded-full border-2"
                      style={{
                        background: isDarkMode
                          ? "#05060d"
                          : "#f9fafb",
                        borderColor: "var(--primary)",
                      }}
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{
                          background: "var(--primary)",
                          boxShadow:
                            "0 0 10px var(--primary)",
                        }}
                      />
                    </div>

                    <ExperienceCard
                      experience={experience}
                      index={index}
                      isDarkMode={isDarkMode}
                    />
                  </motion.article>
                ))}
              </div>
            </div>
          </div>

          {/* =====================================================
              RIGHT SIDE
          ===================================================== */}

          <div className="space-y-10">
            {/* ===================================================
                EDUCATION
            =================================================== */}

            <div>
              <SectionHeading
                icon={<FiBookOpen size={19} />}
                title="Education"
                isDarkMode={isDarkMode}
              />

              <div className="mt-8 space-y-4">
                {education.map((edu, index) => (
                  <motion.article
                    key={`${edu.title}-${index}`}
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
                      duration: 0.45,
                      delay: index * 0.1,
                    }}
                    className={`group relative overflow-hidden rounded-2xl border p-5 sm:p-6 transition-all duration-300 ${
                      isDarkMode
                        ? "bg-white/[0.035] border-white/10 hover:border-white/20"
                        : "bg-white border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-lg"
                    }`}
                  >
                    {/* ACCENT */}

                    <div
                      className="absolute top-0 left-0 w-full h-px opacity-60"
                      style={{
                        background:
                          "linear-gradient(to right, transparent, var(--primary), transparent)",
                      }}
                    />

                    {/* DATE */}

                    <div
                      className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold mb-4"
                      style={{
                        color: "var(--primary)",
                        background:
                          "color-mix(in srgb, var(--primary) 10%, transparent)",
                      }}
                    >
                      <FiCalendar size={12} />
                      {edu.time}
                    </div>

                    {/* DEGREE */}

                    <h3
                      className="text-lg font-bold leading-snug"
                      style={{
                        color: "var(--text-heading)",
                      }}
                    >
                      {edu.title}
                    </h3>

                    {/* COLLEGE */}

                    <p
                      className={`mt-2 text-sm leading-relaxed ${
                        isDarkMode
                          ? "text-gray-400"
                          : "text-gray-600"
                      }`}
                    >
                      {edu.place}
                    </p>

                    {/* CGPA */}

                    {edu.cgpa && (
                      <div className="mt-4 inline-flex items-center gap-2">
                        <span
                          className="flex h-7 w-7 items-center justify-center rounded-lg"
                          style={{
                            color: "var(--primary)",
                            background:
                              "color-mix(in srgb, var(--primary) 10%, transparent)",
                          }}
                        >
                          <FiCheckCircle size={14} />
                        </span>

                        <span
                          className="text-xs font-semibold"
                          style={{
                            color: "var(--primary)",
                          }}
                        >
                          {edu.cgpa}
                        </span>
                      </div>
                    )}
                  </motion.article>
                ))}
              </div>
            </div>

            {/* ===================================================
                CERTIFICATIONS (shown only when listed in the data)
            =================================================== */}

            {certifications.length > 0 && (
            <div>
              <SectionHeading
                icon={<FiAward size={19} />}
                title="Certifications"
                isDarkMode={isDarkMode}
              />

              <div className="mt-8 space-y-4">
                {certifications.map((cert, index) => (
                  <motion.article
                    key={`${cert.title}-${index}`}
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
                      duration: 0.45,
                      delay: index * 0.1,
                    }}
                    className={`group flex items-start gap-4 rounded-2xl border p-5 transition-all duration-300 ${
                      isDarkMode
                        ? "bg-white/[0.035] border-white/10 hover:border-white/20"
                        : "bg-white border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-lg"
                    }`}
                  >
                    {/* ICON */}

                    <div
                      className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl text-lg"
                      style={{
                        color: "var(--primary)",
                        background:
                          "color-mix(in srgb, var(--primary) 10%, transparent)",
                      }}
                    >
                      {cert.icon || "☕"}
                    </div>

                    {/* CONTENT */}

                    <div className="min-w-0">
                      <h3
                        className="font-semibold leading-snug"
                        style={{
                          color: "var(--text-heading)",
                        }}
                      >
                        {cert.title}
                      </h3>

                      <p
                        className={`mt-1 text-xs ${
                          isDarkMode
                            ? "text-gray-500"
                            : "text-gray-500"
                        }`}
                      >
                        {cert.issuer}
                      </p>

                      <span
                        className="inline-block mt-2 text-xs font-semibold"
                        style={{
                          color: "var(--primary)",
                        }}
                      >
                        {cert.year}
                      </span>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
            )}
          </div>
        </div>

        {/* =======================================================
            ACHIEVEMENTS
        ======================================================= */}

        {achievements.length > 0 && (
          <div className="mt-16 sm:mt-20">
            <SectionHeading
              icon={<FiAward size={19} />}
              title="Achievements"
              isDarkMode={isDarkMode}
              centered
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={`${achievement.title}-${index}`}
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
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.08,
                  }}
                  whileHover={{
                    y: -5,
                  }}
                  className={`group relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 ${
                    isDarkMode
                      ? "bg-white/[0.035] border-white/10 hover:border-white/20"
                      : "bg-white border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-lg"
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

                  {/* ICON */}

                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl text-xl mb-5"
                    style={{
                      color: "var(--primary)",
                      background:
                        "color-mix(in srgb, var(--primary) 10%, transparent)",
                    }}
                  >
                    {achievement.icon}
                  </div>

                  {/* TITLE */}

                  <h3
                    className="text-lg font-bold"
                    style={{
                      color: "var(--text-heading)",
                    }}
                  >
                    {achievement.title}
                  </h3>

                  {/* DESCRIPTION */}

                  <p
                    className={`mt-2 text-sm leading-relaxed ${
                      isDarkMode
                        ? "text-gray-400"
                        : "text-gray-600"
                    }`}
                  >
                    {achievement.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* =======================================================
            DOWNLOAD RESUME
        ======================================================= */}

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
            className={`relative overflow-hidden rounded-2xl border px-6 py-7 sm:px-10 sm:py-8 text-center max-w-2xl w-full ${
              isDarkMode
                ? "bg-white/[0.035] border-white/10"
                : "bg-white border-gray-200 shadow-sm"
            }`}
          >
            {/* GLOW */}

            <div
              className="pointer-events-none absolute left-1/2 top-0 h-32 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-20"
              style={{
                background: "var(--primary)",
              }}
            />

            <div className="relative">
              <div
                className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl mb-4"
                style={{
                  color: "var(--primary)",
                  background:
                    "color-mix(in srgb, var(--primary) 10%, transparent)",
                }}
              >
                <FiDownload size={20} />
              </div>

              <h3
                className="text-xl sm:text-2xl font-bold"
                style={{
                  color: "var(--text-heading)",
                }}
              >
                Want to know more?
              </h3>

              <p
                className={`mt-2 mb-6 text-sm ${
                  isDarkMode
                    ? "text-gray-400"
                    : "text-gray-600"
                }`}
              >
                Download my complete resume for detailed experience,
                projects, and technical skills.
              </p>

              <a
                href={resumeUrl}
                download="Nitin_Wagmode_Resume.pdf"
                className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5"
                style={{
                  background: "var(--primary)",
                  boxShadow:
                    "0 10px 30px color-mix(in srgb, var(--primary) 25%, transparent)",
                }}
              >
                <FiDownload size={17} />
                Download Resume
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

/* =============================================================
   SECTION HEADING
============================================================= */

function SectionHeading({
  icon,
  title,
  isDarkMode,
  centered = false,
}) {
  return (
    <div
      className={`flex items-center gap-3 ${
        centered ? "justify-center" : ""
      }`}
    >
      <span
        className="flex h-10 w-10 items-center justify-center rounded-xl"
        style={{
          color: "var(--primary)",
          background:
            "color-mix(in srgb, var(--primary) 10%, transparent)",
        }}
      >
        {icon}
      </span>

      <h2
        className="text-2xl sm:text-3xl font-bold"
        style={{
          color: "var(--text-heading)",
        }}
      >
        {title}
      </h2>
    </div>
  );
}

/* =============================================================
   EXPERIENCE CARD
============================================================= */

function ExperienceCard({
  experience,
  index,
  isDarkMode,
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border p-5 sm:p-6 transition-all duration-300 ${
        isDarkMode
          ? "bg-white/[0.035] border-white/10 hover:border-white/20"
          : "bg-white border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-300"
      }`}
    >
      {/* TOP LINE */}

      <div
        className="absolute top-0 left-0 right-0 h-px opacity-70"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--primary), transparent)",
        }}
      />

      {/* BACKGROUND NUMBER */}

      <div
        className="pointer-events-none absolute right-3 top-0 text-[90px] font-black leading-none opacity-[0.025]"
        style={{
          color: "var(--primary)",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* DATE */}

      <div
        className="relative inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold mb-4"
        style={{
          color: "var(--primary)",
          background:
            "color-mix(in srgb, var(--primary) 10%, transparent)",
        }}
      >
        <FiCalendar size={12} />
        {experience.duration}
      </div>

      {/* ROLE */}

      <h3
        className="relative text-xl sm:text-2xl font-bold leading-tight"
        style={{
          color: "var(--text-heading)",
        }}
      >
        {experience.role}
      </h3>

      {/* COMPANY */}

      <div className="relative flex items-center gap-2 mt-2">
        <FiBriefcase
          size={14}
          style={{
            color: "var(--primary)",
          }}
        />

        <span
          className={`text-sm font-medium ${
            isDarkMode
              ? "text-gray-300"
              : "text-gray-700"
          }`}
        >
          {experience.company}
        </span>
      </div>

      {/* DIVIDER */}

      <div
        className={`h-px my-5 ${
          isDarkMode
            ? "bg-white/10"
            : "bg-gray-100"
        }`}
      />

      {/* POINTS */}

      <div className="space-y-3">
        {experience.points.map((point, pointIndex) => (
          <div
            key={pointIndex}
            className="flex items-start gap-2.5"
          >
            <FiCheckCircle
              size={14}
              className="mt-0.5 flex-shrink-0"
              style={{
                color: "var(--primary)",
              }}
            />

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

      {/* TECH */}

      {experience.tech?.length > 0 && (
        <div
          className={`mt-6 pt-5 border-t ${
            isDarkMode
              ? "border-white/10"
              : "border-gray-100"
          }`}
        >
          <div className="flex items-center gap-2 mb-3">
            <FiCode
              size={13}
              style={{
                color: "var(--primary)",
              }}
            />

            <span
              className={`text-[10px] uppercase tracking-[0.16em] font-semibold ${
                isDarkMode
                  ? "text-gray-500"
                  : "text-gray-400"
              }`}
            >
              Technologies
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {experience.tech.map((technology) => (
              <span
                key={technology}
                className={`rounded-lg border px-2.5 py-1.5 text-[11px] font-medium ${
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
    </div>
  );
}

/* =============================================================
   STAT
============================================================= */

function ResumeStat({
  value,
  label,
  isDarkMode,
  border = false,
}) {
  return (
    <div
      className={`text-center ${
        border
          ? isDarkMode
            ? "lg:border-l lg:border-white/10"
            : "lg:border-l lg:border-gray-200"
          : ""
      }`}
    >
      <p
        className="text-2xl sm:text-3xl font-bold"
        style={{
          color: "var(--primary)",
        }}
      >
        {value}
      </p>

      <p
        className={`mt-1 text-xs ${
          isDarkMode
            ? "text-gray-500"
            : "text-gray-500"
        }`}
      >
        {label}
      </p>
    </div>
  );
}