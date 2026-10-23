"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiArrowRight,
  FiDownload,
  FiCode,
  FiSmartphone,
} from "react-icons/fi";

import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

const content = {
  name: profile.fullName,

  role: profile.role,

  techLine: profile.techLine,

  summary: profile.shortSummary,

  image: profile.profileImageUrl,

  resume: profile.resumeUrl,

  stats: [
    {
      value: `${profile.experienceYears}+`,
      label: "Years Experience",
    },
    {
      value: "500+",
      label: "Users at Launch",
    },
    {
      value: `${projects.length}`,
      label: "Featured Projects",
    },
  ],

  socials: {
    github: profile.socials.github,
    linkedin: profile.socials.linkedin,
    email: `mailto:${profile.email}`,
  },
};

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 25,
  },

  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="
        relative
        flex
        min-h-screen
        items-center
        overflow-clip
      "
      style={{
        background: "var(--bg)",
        color: "var(--text-body)",
      }}
    >
      {/* =========================================================
          BACKGROUND
      ========================================================= */}

      {/* Top Right Purple Glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-32
          -top-32
          h-[280px]
          w-[280px]
          rounded-full
          blur-[100px]
          opacity-[0.10]
          sm:-right-40
          sm:-top-40
          sm:h-[380px]
          sm:w-[380px]
          sm:blur-[120px]
          sm:opacity-[0.15]
        "
        style={{
          background: "var(--primary)",
        }}
      />

      {/* Bottom Left Purple Glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-32
          -left-32
          h-[250px]
          w-[250px]
          rounded-full
          blur-[100px]
          opacity-[0.05]
          sm:-bottom-40
          sm:-left-40
          sm:h-[350px]
          sm:w-[350px]
          sm:blur-[130px]
          sm:opacity-[0.08]
        "
        style={{
          background: "var(--primary)",
        }}
      />

      {/* Subtle Grid */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.018]
          sm:opacity-[0.025]
        "
        style={{
          backgroundImage:
            "linear-gradient(var(--text-heading) 1px, transparent 1px), linear-gradient(90deg, var(--text-heading) 1px, transparent 1px)",
          backgroundSize: "65px 65px",
        }}
      />

      {/* =========================================================
          MAIN CONTAINER
      ========================================================= */}

      <div
        className="
          relative
          z-10
          mx-auto
          grid
          w-full
          max-w-7xl
          grid-cols-1
          items-center
          gap-12
          px-5
          py-24
          sm:gap-14
          sm:px-8
          sm:py-24
          md:px-12
          lg:grid-cols-[0.9fr_1.1fr]
          lg:gap-20
          lg:py-20
          xl:gap-24
        "
      >
        {/* =======================================================
            LEFT — PROFILE IMAGE
        ======================================================= */}

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
          className="
            relative
            flex
            justify-center
            lg:justify-start
          "
        >
          <div className="relative">
            {/* Image Glow */}
            <motion.div
              aria-hidden="true"
              className="
                absolute
                -inset-6
                rounded-[2rem]
                blur-3xl
                opacity-20
                sm:-inset-8
                sm:opacity-25
              "
              style={{
                background:
                  "radial-gradient(circle, var(--primary), transparent 70%)",
              }}
              animate={{
                scale: [1, 1.06, 1],
                opacity: [0.14, 0.22, 0.14],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Gradient Border */}
            <div
              className="
                relative
                rounded-[1.8rem]
                p-[1px]
                sm:rounded-[2rem]
              "
              style={{
                background:
                  "linear-gradient(135deg, var(--primary), var(--border), transparent)",
              }}
            >
              {/* Profile Image */}
              <motion.div
                whileHover={{
                  y: -6,
                }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 20,
                }}
                className="
                  relative
                  h-[340px]
                  w-[265px]
                  overflow-hidden
                  rounded-[1.8rem]
                  sm:h-[420px]
                  sm:w-[330px]
                  sm:rounded-[2rem]
                  md:h-[480px]
                  md:w-[385px]
                  lg:h-[500px]
                  lg:w-[400px]
                "
                style={{
                  background: "var(--card)",
                }}
              >
                <Image
                  src={content.image}
                  alt={`${content.name} — ${content.role}`}
                  fill
                  priority
                  unoptimized={content.image.endsWith(".svg")}
                  sizes="
                    (max-width: 640px) 265px,
                    (max-width: 768px) 330px,
                    (max-width: 1024px) 385px,
                    400px
                  "
                  className="
                    object-cover
                    object-[center_18%]
                    transition-transform
                    duration-700
                    hover:scale-[1.03]
                  "
                />

                {/* Bottom Image Gradient */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-x-0
                    bottom-0
                    h-28
                    sm:h-36
                  "
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0.08), transparent)",
                  }}
                />
              </motion.div>
            </div>

            {/* =================================================
                REACT BADGE
            ================================================= */}

            <motion.div
              className="
                absolute
                -left-4
                top-8
                hidden
                rounded-xl
                border
                px-3
                py-2.5
                shadow-xl
                backdrop-blur-xl
                sm:block
                sm:px-4
                sm:py-3
              "
              style={{
                background: "var(--card)",
                borderColor: "var(--border)",
              }}
              animate={{
                y: [0, -7, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-lg
                  "
                  style={{
                    background: "rgba(97,218,251,0.10)",
                  }}
                >
                  <FiCode className="h-4 w-4 text-[#61DAFB]" />
                </span>

                <div>
                  <p
                    className="
                      text-[9px]
                      uppercase
                      tracking-wider
                    "
                    style={{
                      color: "var(--text-muted)",
                    }}
                  >
                    Expertise
                  </p>

                  <p
                    className="text-xs font-semibold"
                    style={{
                      color: "var(--text-heading)",
                    }}
                  >
                    React.js
                  </p>
                </div>
              </div>
            </motion.div>

            {/* =================================================
                EXPERIENCE BADGE
            ================================================= */}

            <motion.div
              className="
                absolute
                -bottom-4
                right-0
                rounded-xl
                border
                px-4
                py-3
                shadow-2xl
                backdrop-blur-xl
                sm:-bottom-5
                sm:-right-5
                sm:rounded-2xl
                sm:px-5
                sm:py-4
              "
              style={{
                background: "var(--card)",
                borderColor: "var(--border)",
              }}
              animate={{
                y: [0, 6, 0],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <p
                className="
                  text-xl
                  font-bold
                  sm:text-2xl
                "
                style={{
                  color: "var(--primary)",
                }}
              >
                {content.stats[0].value}
              </p>

              <p
                className="
                  mt-0.1
                  whitespace-nowrap
                  text-[9px]
                  uppercase
                  tracking-[0.12em]
                  sm:text-[10px]
                  sm:tracking-[0.15em]
                "
                style={{
                  color: "var(--text-muted)",
                }}
              >
                Years Experience
              </p>
            </motion.div>

            {/* =================================================
                WEB & MOBILE BADGE
            ================================================= */}

            <motion.div
              className="
                absolute
                -bottom-5
                left-5
                hidden
                rounded-xl
                border
                px-3
                py-2
                backdrop-blur-xl
                md:flex
                md:items-center
                md:gap-2
              "
              style={{
                background: "var(--card)",
                borderColor: "var(--border)",
              }}
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                duration: 4.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <FiSmartphone
                className="h-4 w-4"
                style={{
                  color: "var(--primary)",
                }}
              />

              <span
                className="text-xs font-medium"
                style={{
                  color: "var(--text-body)",
                }}
              >
                Web & Mobile
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* =======================================================
            RIGHT — CONTENT
        ======================================================= */}

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{
            duration: 0.7,
            delay: 0.15,
            ease: "easeOut",
          }}
          className="
            text-center
            lg:text-left
          "
        >
          {/* =====================================================
              INTRO
          ===================================================== */}

          <div
            className="
              mb-4
              flex
              items-center
              justify-center
              gap-2.5
              sm:mb-5
              sm:gap-3
              lg:justify-start
            "
          >
            <span
              className="h-px w-7 sm:w-9"
              style={{
                background: "var(--primary)",
              }}
            />

            <span
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.2em]
                sm:text-xs
                sm:tracking-[0.25em]
              "
              style={{
                color: "var(--primary)",
              }}
            >
              Welcome to my portfolio
            </span>
          </div>

          {/* =====================================================
              MAIN HEADING
          ===================================================== */}

          <h1
            className="
              max-w-4xl
              text-[2.8rem]
              font-bold
              leading-[1.02]
              tracking-[-0.04em]
              sm:text-5xl
              md:text-6xl
              xl:text-[4.6rem]
            "
            style={{
              color: "var(--text-heading)",
            }}
          >
            Hi, I&apos;m{" "}
            <span className="gradient-text">
              {content.name}
            </span>
            <br />

            {/* <span className="mt-1 inline-block">
              I Build Web & Mobile
            </span>

            <br />

            <span className="gradient-text">
              Experiences.
            </span> */}
          </h1>

          {/* =====================================================
              ROLE
          ===================================================== */}

          <div className="mt-5 sm:mt-6">
            <h2
              className="
                text-xl
                font-semibold
                leading-snug
                sm:text-2xl
                md:text-3xl
              "
              style={{
                color: "var(--text-heading)",
              }}
            >
              {content.role}
            </h2>

            {/* Tech Stack */}
            <p
              className="
                mt-2
                text-xs
                font-semibold
                tracking-wide
                sm:text-base
              "
              style={{
                color: "var(--primary)",
              }}
            >
              {content.techLine.map((tech, index) => (
                <span key={tech}>
                  {index > 0 && (
                    <span
                      aria-hidden="true"
                      className="mx-2"
                      style={{
                        color: "var(--text-muted)",
                        opacity: 0.45,
                      }}
                    >
                      •
                    </span>
                  )}
                  {tech}
                </span>
              ))}
            </p>
          </div>

          {/* =====================================================
              SUMMARY
          ===================================================== */}

          <p
            className="
              mx-auto
              mt-5
              max-w-[360px]
              text-sm
              leading-6
              sm:mt-6
              sm:max-w-2xl
              sm:text-base
              sm:leading-7
              lg:mx-0
              lg:max-w-xl
            "
            style={{
              color: "var(--text-body)",
              opacity: 0.78,
            }}
          >
            {content.summary}
          </p>

          {/* =====================================================
              AVAILABILITY
          ===================================================== */}

          <div
            className="
              mt-5
              flex
              items-center
              justify-center
              gap-2
              lg:justify-start
            "
          >
            <span
              className="
                h-2
                w-2
                rounded-full
                bg-emerald-400
                shadow-[0_0_10px_rgba(52,211,153,0.6)]
                animate-pulse
              "
            />

            <span
              className="
                text-xs
                font-medium
                sm:text-sm
              "
              style={{
                color: "var(--text-muted)",
              }}
            >
              Available for opportunities
            </span>
          </div>

          {/* =====================================================
              CTA BUTTONS
          ===================================================== */}

          <div
            className="
              mt-5
              flex
              w-full
              flex-col
              gap-3
              sm:mt-8
              sm:w-auto
              sm:flex-row
              sm:justify-center
              lg:justify-start
            "
          >
            {/* Primary Button */}
            <Link
              href="/projects"
              className="
                group
                flex
                min-h-[50px]
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                px-6
                py-3
                text-sm
                font-semibold
                shadow-lg
                transition-all
                duration-300
                hover:-translate-y-1
                sm:w-auto
              "
              style={{
                background: "var(--primary)",
                color: "#FFFFFF",
                boxShadow:
                  "0 10px 30px color-mix(in srgb, var(--primary) 20%, transparent)",
              }}
            >
              View Projects

              <FiArrowRight
                className="
                  h-4
                  w-4
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </Link>

            {/* Resume Button */}
            <a
              href={content.resume}
              download="Nitin_Wagmode_Resume.pdf"
              className="
                group
                flex
                min-h-[50px]
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                px-6
                py-3
                text-sm
                font-semibold
                transition-all
                duration-300
                hover:-translate-y-1
                sm:w-auto
              "
              style={{
                borderColor: "var(--primary)",
                color: "var(--primary)",
                background: "var(--glass)",
              }}
            >
              Download Resume

              <FiDownload
                className="
                  h-4
                  w-4
                  transition-transform
                  duration-300
                  group-hover:translate-y-0.5
                "
              />
            </a>
          </div>

          {/* =====================================================
              SOCIAL LINKS
          ===================================================== */}

          <div
            className="
              mt-6
              flex
              items-center
              justify-center
              gap-2.5
              sm:mt-7
              sm:gap-3
              lg:justify-start
            "
          >
            <span
              className="mr-1 text-[10px] sm:text-xs"
              style={{
                color: "var(--text-muted)",
              }}
            >
              Connect
            </span>

            {/* GitHub (shown once a profile URL is configured) */}
            {content.socials.github && (
            <a
              href={content.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                border
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-[var(--primary)]
                hover:text-[var(--primary)]
                sm:h-10
                sm:w-10
              "
              style={{
                background: "var(--glass)",
                borderColor: "var(--border)",
                color: "var(--text-muted)",
              }}
            >
              <FiGithub className="h-4 w-4 sm:h-5 sm:w-5" />
            </a>
            )}

            {/* LinkedIn */}
            <a
              href={content.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                border
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-[var(--primary)]
                hover:text-[var(--primary)]
                sm:h-10
                sm:w-10
              "
              style={{
                background: "var(--glass)",
                borderColor: "var(--border)",
                color: "var(--text-muted)",
              }}
            >
              <FiLinkedin className="h-4 w-4 sm:h-5 sm:w-5" />
            </a>

            {/* Email */}
            <a
              href={content.socials.email}
              aria-label={`Email ${profile.email}`}
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                border
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-[var(--primary)]
                hover:text-[var(--primary)]
                sm:h-10
                sm:w-10
              "
              style={{
                background: "var(--glass)",
                borderColor: "var(--border)",
                color: "var(--text-muted)",
              }}
            >
              <FiMail className="h-4 w-4 sm:h-5 sm:w-5" />
            </a>
          </div>

          {/* =====================================================
              IMPACT STATS
          ===================================================== */}

          <div
            className="
              mt-8
              grid
              grid-cols-3
              divide-x
              overflow-hidden
              rounded-2xl
              border
              px-1
              py-4
              backdrop-blur-sm
              sm:mt-9
              sm:max-w-xl
              sm:px-3
              sm:py-5
              lg:max-w-2xl
            "
            style={{
              background: "var(--glass)",
              borderColor: "var(--border)",
            }}
          >
            {content.stats.map((stat) => (
              <div
                key={stat.label}
                className="
                  px-1.5
                  text-center
                  sm:px-3
                  lg:text-left
                "
              >
                <p
                  className="
                    text-lg
                    font-bold
                    sm:text-2xl
                  "
                  style={{
                    color: "var(--text-heading)",
                  }}
                >
                  {stat.value}
                </p>

                <p
                  className="
                    mt-1
                    text-[8px]
                    font-medium
                    uppercase
                    tracking-wide
                    sm:text-[10px]
                    sm:tracking-[0.12em]
                  "
                  style={{
                    color: "var(--text-muted)",
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

    </section>
  );
}