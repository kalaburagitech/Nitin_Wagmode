// Projects from the resume. Images are original illustrations (no real
// screenshots were supplied); replace `image` with a screenshot path when
// one is available. Links are only set where the resume provides one.

export const projectCategories = [
  { id: "all", name: "All Work" },
  { id: "field-ops", name: "Field Operations" },
  { id: "ecommerce", name: "E-commerce" },
  { id: "ui-engineering", name: "UI Engineering" },
];

export const projects = [
  {
    id: 1,
    title: "KLB Connect",
    category: "field-ops",
    subcategory: "Field Operations Platform",
    company: "Kalaburagi Tech",
    period: "Jan 2026 - Present",
    image: "/assets/projects/klb-connect.svg",
    description:
      "Field operations platform with a React Native mobile app and a React.js / Next.js web dashboard, where I contribute to frontend development as a freelancer.",
    features: [
      "Mobile workflows for attendance, patrols, inspections, and guest management",
      "Features supporting GPS, QR scanning, and offline synchronization",
      "Dashboard interfaces for operational monitoring, attendance review, issue tracking, and role-based workflows",
    ],
    tech: ["React Native", "React.js", "Next.js", "GPS", "QR Scanning", "Offline Sync"],
    liveLink: "https://kalaburagitech.com",
    liveLabel: "Company Website",
    githubLink: "",
    playstoreLinks: [],
  },
  {
    id: 2,
    title: "Stalwart Recon",
    category: "field-ops",
    subcategory: "Field Operations App & Admin Dashboard",
    company: "Stalwart People Services India Ltd.",
    period: "Oct 2024 - Jan 2026",
    image: "/assets/projects/stalwart-recon.svg",
    description:
      "React Native field operations app and React.js admin dashboard, built and released as the sole frontend engineer.",
    features: [
      "JWT authentication, protected routes, and role-based access for 3 user roles — reducing manual administrative effort by 50%",
      "Redux Toolkit state management across 10+ business workflows — reducing state-related defects by 30%",
      "REST APIs, push notifications, offline sync, and rendering optimization with memoization, lazy loading, and FlatList tuning",
    ],
    tech: ["React Native", "React.js", "Redux Toolkit", "REST APIs", "JWT", "Firebase Cloud Messaging"],
    liveLink: "",
    githubLink: "",
    playstoreLinks: [],
  },
  {
    id: 3,
    title: "BOAS.CO",
    category: "ecommerce",
    subcategory: "E-commerce Platform",
    company: "AU Technology Consulting",
    period: "2022 - 2024",
    image: "/assets/projects/boas-co.svg",
    description:
      "E-commerce platform where I led frontend development and a Next.js server-side rendering migration.",
    features: [
      "Delivered the e-commerce launch within 6 months after a 3-year product delay, enabling 500+ users",
      "Reduced product publishing time by 60% through streamlined frontend workflows and component reuse",
      "SEO-friendly SSR/SSG architecture, dynamic routing, OAuth 2.0 authentication, and REST API integrations",
    ],
    tech: ["Next.js", "React.js", "Redux Toolkit", "TypeScript", "OAuth 2.0", "REST APIs"],
    liveLink: "",
    githubLink: "",
    playstoreLinks: [],
  },
  {
    id: 4,
    title: "MORF",
    category: "ui-engineering",
    subcategory: "JSON-driven Rendering Engine",
    company: "AU Technology Consulting",
    period: "2022 - 2024",
    image: "/assets/projects/morf.svg",
    description:
      "A JSON-driven UI rendering engine in React and TypeScript that turns product configuration into interface — no manual UI redevelopment for new configurations.",
    features: [
      "Designed and developed the rendering engine end to end",
      "Eliminated manual UI redevelopment for new product configurations",
      "Built on reusable, strongly typed React components",
    ],
    tech: ["React.js", "TypeScript"],
    liveLink: "",
    githubLink: "",
    playstoreLinks: [],
  },
  {
    id: 5,
    title: "CLOSAL",
    category: "ecommerce",
    subcategory: "Web Application",
    company: "AU Technology Consulting",
    period: "2022 - 2024",
    image: "/assets/projects/closal.svg",
    description:
      "Responsive React / Next.js application built from reusable components, with Redux Toolkit state and REST API integration.",
    features: [
      "Responsive, reusable React components and pages",
      "API integration with pagination, filtering, and error handling",
      "Rendering and load-time optimization with code splitting, lazy loading, and memoization",
    ],
    tech: ["React.js", "Next.js", "Redux Toolkit", "REST APIs"],
    liveLink: "",
    githubLink: "",
    playstoreLinks: [],
  },
  {
    id: 6,
    title: "SunnyStateAgency",
    category: "ecommerce",
    subcategory: "Web Application",
    company: "AU Technology Consulting",
    period: "2022 - 2024",
    image: "/assets/projects/sunnystateagency.svg",
    description:
      "Scalable, SEO-optimized frontend features built with reusable component architecture and global state management.",
    features: [
      "SEO-optimized frontend features with reusable components",
      "API integration and global state management with Redux Toolkit",
      "Collaborated with backend, design, and QA teams in Agile sprints",
    ],
    tech: ["React.js", "Next.js", "Redux Toolkit", "REST APIs"],
    liveLink: "",
    githubLink: "",
    playstoreLinks: [],
  },
];
