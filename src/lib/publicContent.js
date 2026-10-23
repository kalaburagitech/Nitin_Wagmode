// View models consumed by the page components. All personal content lives in
// src/data — this module only shapes it for each section.
import { profile, education } from "@/data/profile";
import { experiences } from "@/data/experience";
import { projectCategories, projects } from "@/data/projects";
import { coreSkills } from "@/data/skills";

export const fallbackHero = {
  badge: "REACT.JS | NEXT.JS | REACT NATIVE | TYPESCRIPT",
  name: profile.fullName,
  headline: "Hi, I'm",
  summary: profile.shortSummary,
  techStack: coreSkills,
  resumeUrl: profile.resumeUrl,
  profileImageUrl: profile.profileImageUrl,
  socials: {
    linkedin: profile.socials.linkedin,
    github: profile.socials.github,
    email: `mailto:${profile.email}`,
  },
};

export const fallbackPortfolio = {
  categories: projectCategories,
  projects,
};

export const fallbackResume = {
  experiences,
  education,
  certifications: [],
  achievements: [
    {
      title: "Launched BOAS.CO",
      desc: "Delivered the e-commerce launch within 6 months after a 3-year product delay, enabling 500+ users",
      icon: "🚀",
    },
    {
      title: "60% Faster Publishing",
      desc: "Reduced product publishing time on BOAS.CO through streamlined workflows and component reuse",
      icon: "⚡",
    },
    {
      title: "50% Less Admin Effort",
      desc: "JWT auth, protected routes, and role-based access for 3 user roles on Stalwart Recon",
      icon: "🔐",
    },
    {
      title: "30% Fewer State Defects",
      desc: "Redux Toolkit state management designed across 10+ business workflows",
      icon: "🧩",
    },
  ],
  resumeUrl: profile.resumeUrl,
};

export const fallbackSettings = {
  defaultTheme: "dark", // "dark" | "light"
  defaultPrimaryColor: "yellow",
};

export const fallbackServices = {
  title: "What I Build",
  subtitle: "What I Do",
  description:
    "Frontend engineering for web and mobile products — from component architecture to authentication, API integration, and performance.",
  services: [
    {
      num: "01",
      name: "Web Application Development",
      desc: "Responsive, SEO-friendly web applications with React.js and Next.js — SSR/SSG, dynamic routing, reusable components, and Tailwind CSS.",
      tags: ["React.js", "Next.js", "SSR / SSG", "Tailwind CSS"],
    },
    {
      num: "02",
      name: "Cross-Platform Mobile Apps",
      desc: "React Native apps for Android and iOS with React Navigation, push notifications via Firebase Cloud Messaging, AsyncStorage, and offline data sync.",
      tags: ["React Native", "Android", "iOS", "Offline Sync"],
    },
    {
      num: "03",
      name: "State, Auth & API Integration",
      desc: "Redux Toolkit state architecture, JWT and OAuth 2.0 authentication, role-based access control, and REST API integration with pagination, filtering, and error handling.",
      tags: ["Redux Toolkit", "JWT", "OAuth 2.0", "REST APIs"],
    },
    {
      num: "04",
      name: "Performance & Frontend Architecture",
      desc: "Rendering optimization with memoization, code splitting, and lazy loading, plus component libraries and design systems that keep large codebases consistent.",
      tags: ["Memoization", "Code Splitting", "Design Systems", "TypeScript"],
    },
  ],
};

export const fallbackAbout = {
  profile: {
    firstName: profile.firstName,
    lastName: profile.lastName,
    role: [profile.role, "React Native Developer", "Next.js Developer"],
    tagline: profile.tagline,
    description: profile.summary,
    available: profile.available,
    address: `${profile.city}, ${profile.region}`,
    experience: profile.experienceYears,
    nationality: profile.nationality,
    email: profile.email,
    phone: profile.phone,
    workPreference: "Relocation / Remote",
    currentCompany: profile.currentCompany,
    socialLinks: profile.socials,
  },
  education,
  experience: experiences,
  stats: [
    {
      value: `${profile.experienceYears}+`,
      label: "Years Experience",
      icon: "Work",
    },
    {
      value: `${projects.length}`,
      label: "Featured Projects",
      icon: "Projects",
    },
    {
      value: "500+",
      label: "Users on BOAS.CO Launch",
      icon: "Clients",
    },
    {
      value: "Open",
      label: "Availability",
      icon: "Status",
    },
  ],
};
