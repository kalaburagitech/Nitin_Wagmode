// Technical skills grouped as on the resume. `icon` is a key into
// src/components/SkillIcon.jsx; `color` is the brand/accent color.
// Set `color: "theme"` to use black or white depending on the active theme.

export const skillGroups = [
  {
    category: "Frontend",
    skills: [
      { name: "React.js", icon: "react", color: "#61dafb" },
      { name: "Next.js", icon: "next", color: "theme" },
      { name: "React Native", icon: "mobile", color: "#61dafb" },
      { name: "JavaScript (ES6+)", icon: "javascript", color: "#f7df1e" },
      { name: "TypeScript", icon: "typescript", color: "#3178c6" },
      { name: "HTML5", icon: "html", color: "#e34f26" },
      { name: "CSS3", icon: "css", color: "#264de4" },
      { name: "Tailwind CSS", icon: "tailwind", color: "#22d3ee" },
    ],
  },
  {
    category: "React Ecosystem",
    skills: [
      { name: "React Hooks", icon: "react", color: "#61dafb" },
      { name: "Context API", icon: "layers", color: "#8b5cf6" },
      { name: "Redux", icon: "redux", color: "#764abc" },
      { name: "Redux Toolkit", icon: "redux", color: "#764abc" },
      { name: "Custom Hooks", icon: "puzzle", color: "#14b8a6" },
      { name: "React Router", icon: "router", color: "#ca4245" },
      { name: "Reusable Components", icon: "cubes", color: "#f59e0b" },
      { name: "Component Architecture", icon: "sitemap", color: "#6366f1" },
      { name: "Responsive Design", icon: "columns", color: "#14b8a6" },
      { name: "Component Libraries", icon: "cubes", color: "#ec4899" },
      { name: "Design Systems", icon: "palette", color: "#f97316" },
    ],
  },
  {
    category: "JavaScript",
    skills: [
      { name: "Promises", icon: "hourglass", color: "#f7df1e" },
      { name: "Async/Await", icon: "sync", color: "#f7df1e" },
      { name: "Closures", icon: "code", color: "#f7df1e" },
      { name: "Array Methods", icon: "list", color: "#f7df1e" },
      { name: "Event Handling", icon: "pointer", color: "#f7df1e" },
      { name: "Debouncing", icon: "hourglass", color: "#f59e0b" },
      { name: "Throttling", icon: "gauge", color: "#f59e0b" },
      { name: "Error Handling", icon: "warning", color: "#ef4444" },
    ],
  },
  {
    category: "Next.js & Rendering",
    skills: [
      { name: "Server-Side Rendering (SSR)", icon: "server", color: "theme" },
      { name: "Static Site Generation (SSG)", icon: "file", color: "theme" },
      { name: "Client-Side Rendering (CSR)", icon: "globe", color: "theme" },
      { name: "Dynamic Routing", icon: "route", color: "#8b5cf6" },
      { name: "Code Splitting", icon: "branch", color: "#06b6d4" },
      { name: "Lazy Loading", icon: "stream", color: "#06b6d4" },
      { name: "Memoization", icon: "memory", color: "#22c55e" },
      { name: "SEO", icon: "search", color: "#22c55e" },
    ],
  },
  {
    category: "APIs & Integration",
    skills: [
      { name: "REST APIs", icon: "server", color: "#818cf8" },
      { name: "Axios", icon: "axios", color: "#5a29e4" },
      { name: "Fetch API", icon: "link", color: "#34d399" },
      { name: "JSON", icon: "json", color: "theme" },
      { name: "API Integration", icon: "diagram", color: "#34d399" },
      { name: "API Error Handling", icon: "warning", color: "#f97316" },
      { name: "Pagination", icon: "list", color: "#818cf8" },
      { name: "Filtering", icon: "filter", color: "#818cf8" },
    ],
  },
  {
    category: "Auth & Security",
    skills: [
      { name: "JWT Authentication", icon: "jwt", color: "#e879f9" },
      { name: "OAuth 2.0", icon: "key", color: "#f59e0b" },
      { name: "Role-Based Access Control", icon: "users", color: "#6366f1" },
      { name: "Protected Routes", icon: "shield", color: "#22c55e" },
      { name: "Token Management", icon: "lock", color: "#14b8a6" },
    ],
  },
  {
    category: "Performance & Quality",
    skills: [
      { name: "React Performance Optimization", icon: "rocket", color: "#ec4899" },
      { name: "Web Performance", icon: "gauge", color: "#22c55e" },
      { name: "Rendering Optimization", icon: "bolt", color: "#f59e0b" },
      { name: "Load Time Optimization", icon: "rocket", color: "#06b6d4" },
      { name: "Jest", icon: "jest", color: "#c21325" },
      { name: "Unit Testing", icon: "vial", color: "#22c55e" },
      { name: "Debugging", icon: "bug", color: "#f59e0b" },
      { name: "Code Reviews", icon: "check", color: "#14b8a6" },
    ],
  },
  {
    category: "React Native & Mobile",
    skills: [
      { name: "React Navigation", icon: "route", color: "#8b5cf6" },
      { name: "FlatList", icon: "list", color: "#61dafb" },
      { name: "AsyncStorage", icon: "database", color: "#61dafb" },
      { name: "Push Notifications", icon: "bell", color: "#f97316" },
      { name: "Firebase Cloud Messaging", icon: "firebase", color: "#ffca28" },
      { name: "Offline Data Sync", icon: "sync", color: "#22c55e" },
      { name: "Android", icon: "android", color: "#3ddc84" },
      { name: "iOS", icon: "apple", color: "theme" },
      { name: "Android Studio", icon: "androidstudio", color: "#3ddc84" },
      { name: "Xcode", icon: "xcode", color: "#147efb" },
    ],
  },
  {
    category: "Web Standards",
    skills: [
      { name: "Mobile-First Design", icon: "mobile", color: "#14b8a6" },
      { name: "Semantic HTML", icon: "html", color: "#e34f26" },
      { name: "Accessibility", icon: "a11y", color: "#3b82f6" },
      { name: "WCAG", icon: "a11y", color: "#3b82f6" },
      { name: "Cross-Browser Compatibility", icon: "chrome", color: "#4285f4" },
    ],
  },
  {
    category: "Tools & Practices",
    skills: [
      { name: "Git", icon: "git", color: "#f05032" },
      { name: "GitHub", icon: "github", color: "theme" },
      { name: "Chrome DevTools", icon: "chrome", color: "#4285f4" },
      { name: "Postman", icon: "postman", color: "#ff6c37" },
      { name: "Agile", icon: "tasks", color: "#ffb347" },
      { name: "CI/CD", icon: "infinity", color: "#2088ff" },
      { name: "SDLC", icon: "layers", color: "#8b5cf6" },
    ],
  },
];

export const skillCategories = ["All", ...skillGroups.map((group) => group.category)];

// Flat list for the "All" view. Skill names are unique across groups, so a
// skill the resume lists under several headings appears in just one group.
export const allSkills = skillGroups.flatMap((group) =>
  group.skills.map((skill) => ({ ...skill, category: group.category }))
);

export const coreSkills = [
  "React.js",
  "Next.js",
  "React Native",
  "TypeScript",
  "JavaScript (ES6+)",
  "Redux Toolkit",
  "REST APIs",
  "Tailwind CSS",
];
