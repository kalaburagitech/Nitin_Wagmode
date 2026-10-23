"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { fallbackAbout, fallbackResume } from "@/lib/publicContent";

import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaEnvelope,
  FaRocket,
  FaCheckCircle,
  FaArrowRight,
  FaDownload,
  FaGithub,
  FaLinkedinIn,
  FaBolt,
  FaUser,
  FaPhone,
  FaUserTie,
  FaGraduationCap,
  FaPlaneDeparture,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import SkillIcon, { skillColor } from "@/components/SkillIcon";
import { allSkills, skillCategories } from "@/data/skills";
import { education } from "@/data/profile";

export default function AboutUs() {
  const { isDarkMode } = useTheme();
  const [activeCategory, setActiveCategory] = useState("All");

  const { profile, stats } = fallbackAbout;

  /* =========================================================
     TECHNICAL SKILLS (src/data/skills.js)
  ========================================================= */

  const categories = skillCategories;

  const filteredSkills =
    activeCategory === "All"
      ? allSkills
      : allSkills.filter((skill) => skill.category === activeCategory);

  const getStatIcon = (icon) => {
    if (icon === "Work") return <FaBriefcase />;
    if (icon === "Projects") return <FaRocket />;
    if (icon === "Clients") return <FaCheckCircle />;
    return <FaBolt />;
  };

  return (
    <section
      className="
        relative
        overflow-clip
        px-4
        sm:px-6
        lg:px-8
        py-12
        sm:py-16
        lg:py-20
      "
      style={{
        background: "var(--bg)",
        color: "var(--text-body)",
      }}
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -top-32
          -left-32
          w-72
          h-72
          sm:w-96
          sm:h-96
          rounded-full
          blur-[100px]
          opacity-[0.08]
        "
        style={{
          background: "var(--primary)",
        }}
      />

      <div
        className="
          pointer-events-none
          absolute
          top-[40%]
          -right-32
          w-72
          h-72
          sm:w-96
          sm:h-96
          rounded-full
          blur-[110px]
          opacity-[0.06]
        "
        style={{
          background: "var(--primary)",
        }}
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-0
          left-1/3
          w-64
          h-64
          rounded-full
          blur-[100px]
          opacity-[0.04]
        "
        style={{
          background: "var(--primary)",
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* =====================================================
            HEADER
        ===================================================== */}

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
          }}
          transition={{
            duration: 0.6,
          }}
          className="text-center mb-10 sm:mb-12 lg:mb-14"
        >
          <div
            className="
              inline-flex
              items-center
              gap-2
              px-4
              py-2
              rounded-full
              border
            "
            style={{
              background: isDarkMode
                ? "rgba(255,255,255,0.035)"
                : "rgba(0,0,0,0.025)",
              borderColor: isDarkMode
                ? "rgba(255,255,255,0.10)"
                : "rgba(0,0,0,0.08)",
            }}
          >
            <span
              className="
                w-2
                h-2
                rounded-full
                animate-pulse
              "
              style={{
                background: "var(--primary)",
              }}
            />

            <span
              className="
                text-[10px]
                sm:text-xs
                tracking-[0.18em]
                font-semibold
                uppercase
              "
            >
              About Me
            </span>
          </div>
        </motion.div>

        {/* =====================================================
            HERO ABOUT AREA
        ===================================================== */}

        <div
          className="
            grid
            grid-cols-1
            xl:grid-cols-[minmax(330px,0.78fr)_minmax(0,1.22fr)]
            gap-8
            lg:gap-10
            xl:gap-14
            items-start
          "
        >
          {/* =================================================
              IMAGE
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: -30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
            }}
            className="
              relative
              w-full
              flex
              justify-center
            "
          >
            {/* Glow */}

            <div
              className="
                absolute
                w-56
                h-56
                sm:w-72
                sm:h-72
                lg:w-80
                lg:h-80
                rounded-full
                blur-[90px]
                opacity-20
              "
              style={{
                background: "var(--primary)",
              }}
            />

            {/* Decorative shape */}

            <div
              className="
                absolute
                top-2
                right-[8%]
                sm:right-[12%]
                w-16
                h-16
                sm:w-20
                sm:h-20
                rounded-2xl
                border
              "
              style={{
                borderColor: "var(--primary)",
                background: "var(--primary)",
                opacity: 0.08,
              }}
            />

            <div
              className="
                absolute
                bottom-4
                left-[7%]
                sm:left-[10%]
                w-20
                h-20
                sm:w-24
                sm:h-24
                rounded-2xl
                border
              "
              style={{
                borderColor: "var(--primary)",
                background: "var(--primary)",
                opacity: 0.07,
              }}
            />

            {/* Image card */}

            <div
              className="
                relative
                z-10
                w-full
                max-w-[430px]
                sm:max-w-[470px]
              "
            >
              <motion.div
                whileHover={{
                  y: -6,
                }}
                transition={{
                  duration: 0.3,
                }}
                className="
                  relative
                  rounded-[1.75rem]
                  sm:rounded-[2rem]
                  p-2.5
                  sm:p-3
                  border
                  overflow-hidden
                  backdrop-blur-xl
                "
                style={{
                  background: isDarkMode
                    ? "rgba(255,255,255,0.035)"
                    : "rgba(0,0,0,0.025)",
                  borderColor: isDarkMode
                    ? "rgba(255,255,255,0.10)"
                    : "rgba(0,0,0,0.08)",
                  boxShadow: isDarkMode
                    ? "0 25px 70px rgba(0,0,0,0.25)"
                    : "0 25px 70px rgba(0,0,0,0.08)",
                }}
              >
                {/* Gradient */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    opacity-[0.04]
                  "
                  style={{
                    background:
                      "linear-gradient(135deg,var(--primary),transparent 45%,var(--primary))",
                  }}
                />

                {/* Responsive image area */}

                <div
                  className="
                    relative
                    w-full
                    h-[390px]
                    xs:h-[430px]
                    sm:h-[480px]
                    md:h-[520px]
                    lg:h-[540px]
                    xl:h-[560px]
                    flex
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-[1.35rem]
                    sm:rounded-[1.5rem]
                  "
                >
                  <Image
                    src="/assets/about-illustration.svg"
                    alt="Illustration of web and mobile interfaces built with React"
                    fill
                    priority
                    unoptimized
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 470px"
                    className="
      object-contain
      scale-[1.03]
      sm:scale-[1.06]
    "
                  />
                </div>

                {/* Status */}

                <div
                  className="
                    absolute
                    left-5
                    bottom-5
                    sm:left-7
                    sm:bottom-7
                    max-w-[calc(100%-2.5rem)]
                    px-3
                    sm:px-4
                    py-2.5
                    sm:py-3
                    rounded-xl
                    sm:rounded-2xl
                    backdrop-blur-xl
                    border
                  "
                  style={{
                    background: isDarkMode
                      ? "rgba(12,12,12,0.88)"
                      : "rgba(255,255,255,0.92)",
                    borderColor: isDarkMode
                      ? "rgba(255,255,255,0.10)"
                      : "rgba(0,0,0,0.08)",
                    boxShadow: "0 12px 30px rgba(0,0,0,0.16)",
                  }}
                >
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />

                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-green-500" />
                    </span>

                    <div className="min-w-0">
                      <p className="text-[8px] sm:text-[9px] uppercase tracking-widest opacity-45">
                        Status
                      </p>

                      <p className="text-[10px] sm:text-xs font-semibold truncate">
                        Available for opportunities
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* =================================================
              CONTENT
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              x: 30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
            }}
            className="
              w-full
              min-w-0
            "
          >
            <p
              className="
                text-[11px]
                sm:text-xs
                font-semibold
                tracking-[0.18em]
                uppercase
                mb-3
              "
              style={{
                color: "var(--primary)",
              }}
            >
              Who I Am
            </p>

            <h2
              className="
                text-2xl
                sm:text-3xl
                md:text-4xl
                xl:text-[2.75rem]
                font-bold
                leading-[1.15]
                tracking-tight
              "
            >
              {profile.tagline}
            </h2>

            <p
              className="
                mt-5
                sm:mt-6
                text-sm
                sm:text-base
                leading-7
                sm:leading-8
                opacity-65
                max-w-3xl
              "
            >
              {profile.description}
            </p>

            {/* =================================================
                PROFILE INFO
            ================================================= */}

            <div
              className="
                grid
                grid-cols-2
                gap-2.5
                sm:gap-3
                mt-7
                sm:mt-8
              "
            >
              {[
                {
                  icon: <FaUser />,
                  label: "Full Name",
                  value: `${profile.firstName} ${profile.lastName}`,
                },
                {
                  icon: <FaMapMarkerAlt />,
                  label: "Location",
                  value: profile.address,
                },
                {
                  icon: <FaBriefcase />,
                  label: "Experience",
                  value: `${profile.experience}+ Years`,
                },
                {
                  icon: <FaUserTie />,
                  label: "Currently",
                  value: `Freelance @ ${profile.currentCompany}`,
                },
                {
                  icon: <FaEnvelope />,
                  label: "Email",
                  value: profile.email,
                },
                {
                  icon: <FaPhone />,
                  label: "Phone",
                  value: profile.phone,
                },
                {
                  icon: <FaPlaneDeparture />,
                  label: "Work Preference",
                  value: profile.workPreference,
                },
                {
                  icon: <FaGraduationCap />,
                  label: "Education",
                  value: `BCA · ${education[0].place.split(",")[0]}`,
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{
                    y: -3,
                  }}
                  className="
                    flex
                    items-center
                    gap-2.5
                    sm:gap-3
                    p-3
                    sm:p-3.5
                    rounded-xl
                    sm:rounded-2xl
                    border
                    min-w-0
                    transition-all
                    duration-300
                  "
                  style={{
                    background: isDarkMode
                      ? "rgba(255,255,255,0.025)"
                      : "rgba(0,0,0,0.02)",
                    borderColor: isDarkMode
                      ? "rgba(255,255,255,0.08)"
                      : "rgba(0,0,0,0.08)",
                  }}
                >
                  <div
                    className="
                      w-8
                      h-8
                      sm:w-9
                      sm:h-9
                      rounded-lg
                      sm:rounded-xl
                      flex
                      items-center
                      justify-center
                      shrink-0
                    "
                    style={{
                      background:
                        "color-mix(in srgb, var(--primary) 12%, transparent)",
                      color: "var(--primary)",
                    }}
                  >
                    <span className="text-xs sm:text-sm">{item.icon}</span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[8px] sm:text-[9px] uppercase tracking-wider opacity-40">
                      {item.label}
                    </p>

                    <p
                      className="text-[10px] sm:text-xs font-semibold mt-0.5 truncate"
                      title={item.value}
                    >
                      {item.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* =================================================
                BUTTONS
            ================================================= */}

            <div
              className="
                flex
                flex-col
                sm:flex-row
                gap-2.5
                sm:gap-3
                mt-7
                sm:mt-8
              "
            >
              <a
                href={fallbackResume.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  px-5
                  py-3
                  rounded-xl
                  text-xs
                  sm:text-sm
                  font-semibold
                  text-white
                  transition-all
                  hover:-translate-y-1
                  w-full
                  sm:w-auto
                "
                style={{
                  background: "var(--primary)",
                  boxShadow:
                    "0 12px 30px color-mix(in srgb, var(--primary) 25%, transparent)",
                }}
              >
                <FaDownload />
                Download Resume
              </a>

              <Link
                href="/contact"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  px-5
                  py-3
                  rounded-xl
                  text-xs
                  sm:text-sm
                  font-semibold
                  border
                  transition-all
                  hover:-translate-y-1
                  w-full
                  sm:w-auto
                "
                style={{
                  borderColor: isDarkMode
                    ? "rgba(255,255,255,0.12)"
                    : "rgba(0,0,0,0.10)",
                }}
              >
                {"Let's Connect"}
                <FaArrowRight className="text-xs" />
              </Link>
            </div>

            {/* =================================================
                SOCIALS
            ================================================= */}

            <div
              className="
                flex
                items-center
                gap-3
                mt-2
                sm:mt-3
              "
            >
              <span className="text-[10px] sm:text-xs opacity-40">
                Find me on
              </span>

              {profile.socialLinks?.github && (
              <a
                href={profile.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="
                  w-8
                  h-8
                  sm:w-9
                  sm:h-9
                  rounded-full
                  border
                  flex
                  items-center
                  justify-center
                  transition-all
                  hover:-translate-y-1
                "
                style={{
                  borderColor: isDarkMode
                    ? "rgba(255,255,255,0.10)"
                    : "rgba(0,0,0,0.10)",
                }}
              >
                <FaGithub className="text-xs sm:text-sm" />
              </a>
              )}

              <a
                href={profile.socialLinks?.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="
                  w-8
                  h-8
                  sm:w-9
                  sm:h-9
                  rounded-full
                  border
                  flex
                  items-center
                  justify-center
                  transition-all
                  hover:-translate-y-1
                "
                style={{
                  borderColor: isDarkMode
                    ? "rgba(255,255,255,0.10)"
                    : "rgba(0,0,0,0.10)",
                }}
              >
                <FaLinkedinIn className="text-xs sm:text-sm" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* =====================================================
            STATS
        ===================================================== */}

        <div
          className="
            grid
            grid-cols-2
            lg:grid-cols-4
            gap-2.5
            sm:gap-4
            lg:gap-5
            mt-10
            sm:mt-14
            lg:mt-16
          "
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
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
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              whileHover={{
                y: -5,
              }}
              className="
                relative
                overflow-hidden
                p-1
                sm:p-2
                rounded-xl
                sm:rounded-2xl
                border
                text-center
              "
              style={{
                background: isDarkMode
                  ? "rgba(255,255,255,0.025)"
                  : "rgba(0,0,0,0.02)",
                borderColor: isDarkMode
                  ? "rgba(255,255,255,0.08)"
                  : "rgba(0,0,0,0.08)",
              }}
            >
              <div
                className="
                  absolute
                  top-0
                  left-0
                  right-0
                  h-[2px]
                  opacity-50
                "
                style={{
                  background: "var(--primary)",
                }}
              />

              <div
                className="
                  mx-auto
                  w-9
                  h-9
                  sm:w-11
                  sm:h-11
                  rounded-lg
                  sm:rounded-xl
                  flex
                  items-center
                  justify-center
                  mb-2.5
                  sm:mb-4
                "
                style={{
                  background:
                    "color-mix(in srgb, var(--primary) 10%, transparent)",
                  color: "var(--primary)",
                }}
              >
                {getStatIcon(stat.icon)}
              </div>

              <p
                className="
                  text-2xl
                  sm:text-3xl
                  lg:text-4xl
                  font-bold
                "
                style={{
                  color: "var(--primary)",
                }}
              >
                {stat.value}
              </p>

              <p className="text-[10px] sm:text-xs opacity-50 mt-1.5 sm:mt-2">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* =====================================================
            SKILLS
        ===================================================== */}

        <div className="mt-12 sm:mt-16">
          <SectionHeading
            eyebrow="MY TOOLKIT"
            title="Technical Expertise"
            description="The technologies, patterns, and practices I use to build web and mobile applications — grouped as on my resume."
          />

          {/* FILTERS */}

          <div
            className="
  mb-8
  sm:mb-10
  overflow-x-auto
  overflow-y-hidden
  pb-2
  [&::-webkit-scrollbar]:h-[3px]
  [&::-webkit-scrollbar-track]:bg-transparent
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-[var(--primary)]
"
          >
            <div
              className="
                flex
                justify-start
                sm:justify-center
                gap-2
                min-w-max
                px-1
              "
            >
              {categories.map((category) => {
                const active = activeCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setActiveCategory(category)}
                    className="
                      shrink-0
                      px-4
                      sm:px-5
                      py-2.5
                      rounded-full
                      text-[11px]
                      sm:text-xs
                      font-semibold
                      border
                      transition-all
                      duration-300
                    "
                    style={{
                      background: active ? "var(--primary)" : "transparent",
                      color: active ? "#fff" : "var(--text-body)",
                      borderColor: active
                        ? "var(--primary)"
                        : isDarkMode
                          ? "rgba(255,255,255,0.10)"
                          : "rgba(0,0,0,0.10)",
                    }}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          {/* SKILLS */}

          <motion.div
            layout
            className="
              grid
              grid-cols-3
              sm:grid-cols-3
              md:grid-cols-4
              lg:grid-cols-5
              xl:grid-cols-6
              gap-2.5
              sm:gap-3
              lg:gap-4
            "
          >
            {filteredSkills.map((skill, index) => (
              <motion.div
                layout
                key={`${skill.category}-${skill.name}`}
                initial={{
                  opacity: 0,
                  scale: 0.95,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 0.25,
                  delay: index * 0.02,
                }}
                whileHover={{
                  y: -5,
                }}
                className="
                  group
                  relative
                  p-3
                  sm:p-4
                  lg:p-5
                  rounded-xl
                  sm:rounded-2xl
                  border
                  flex
                  flex-col
                  items-center
                  justify-center
                  text-center
            min-h-[105px]
                  sm:min-h-[125px]
                  lg:min-h-[135px]
                  overflow-hidden
                "
                style={{
                  background: isDarkMode
                    ? "rgba(255,255,255,0.025)"
                    : "rgba(0,0,0,0.02)",
                  borderColor: isDarkMode
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(0,0,0,0.08)",
                }}
              >
                <div
                  className="
                    absolute
                    inset-0
                    opacity-0
                    group-hover:opacity-[0.05]
                    transition-opacity
                  "
                  style={{
                    background: skillColor(skill.color, isDarkMode),
                  }}
                />

                <div
                  className="
                    relative
                    text-xl
                    sm:text-3xl
                    lg:text-4xl
                    mb-2
                    sm:mb-3
                    transition-transform
                    duration-300
                    group-hover:scale-110
                  "
                  style={{
                    color: skillColor(skill.color, isDarkMode),
                  }}
                >
                  <SkillIcon name={skill.icon} />
                </div>

                <p
                  className="
                    relative
                    text-[10px]
                    sm:text-xs
                    lg:text-sm
                    font-semibold
                    leading-tight
                  "
                >
                  {skill.name}
                </p>

                <p className="relative text-[8px] sm:text-[10px] opacity-40 mt-1">
                  {skill.category}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SECTION HEADING
========================================================= */

function SectionHeading({ eyebrow, title, description }) {
  return (
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
      }}
      transition={{
        duration: 0.5,
      }}
      className="
        text-center
        mb-8
        sm:mb-10
        lg:mb-12
      "
    >
      <p
        className="
          text-[10px]
          sm:text-xs
          tracking-[0.22em]
          uppercase
          font-bold
          mb-2.5
          sm:mb-3
        "
        style={{
          color: "var(--primary)",
        }}
      >
        {eyebrow}
      </p>

      <h2
        className="
          text-2xl
          sm:text-3xl
          lg:text-4xl
          font-bold
          tracking-tight
        "
      >
        {title}
      </h2>

      <p
        className="
          max-w-2xl
          mx-auto
          mt-3
          sm:mt-4
          text-xs
          sm:text-sm
          lg:text-base
          leading-6
          sm:leading-7
          opacity-55
          px-2
        "
      >
        {description}
      </p>
    </motion.div>
  );
}
