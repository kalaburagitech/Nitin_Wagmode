// Technical skills, grouped for the Skills page, résumé page, and structured
// data. `icon` is a key into src/components/ui/SkillIcon.jsx; `color` is the
// brand color ("theme" follows the text color). Only list tools Nitin has
// hands-on experience with — e.g. add Detox or Maestro here once confirmed.

export const skillGroups = [
  {
    id: "frontend",
    category: "Frontend Development",
    short: "Frontend",
    summary: "Component-driven web interfaces with typed, predictable state.",
    skills: [
      { name: "React.js", icon: "react", color: "#61dafb" },
      { name: "Next.js", icon: "next", color: "theme" },
      { name: "TypeScript", icon: "typescript", color: "#3178c6" },
      { name: "JavaScript (ES6+)", icon: "javascript", color: "#f7df1e" },
      { name: "Redux", icon: "redux", color: "#764abc" },
      { name: "Redux Toolkit", icon: "redux", color: "#764abc" },
      { name: "Context API", icon: "layers", color: "#8b5cf6" },
      { name: "HTML5", icon: "html", color: "#e34f26" },
      { name: "CSS3", icon: "css", color: "#264de4" },
      { name: "Tailwind CSS", icon: "tailwind", color: "#22d3ee" },
    ],
  },
  {
    id: "backend",
    category: "Backend Development & MERN Stack",
    short: "Backend & MERN",
    summary: "Server-side JavaScript for APIs that power full-stack features.",
    skills: [
      { name: "Node.js", icon: "node", color: "#5fa04e" },
      { name: "Express.js", icon: "express", color: "theme" },
      { name: "MERN Stack", icon: "layers", color: "#47a248" },
    ],
  },
  {
    id: "data",
    category: "Databases & Cloud",
    short: "Databases & Cloud",
    summary: "Relational, document, and on-device storage, plus Firebase services.",
    skills: [
      { name: "MongoDB", icon: "mongodb", color: "#47a248" },
      { name: "MySQL", icon: "mysql", color: "#4479a1" },
      { name: "SQL", icon: "database", color: "#64748b" },
      { name: "SQLite", icon: "sqlite", color: "#0f80cc" },
      { name: "Firebase", icon: "firebase", color: "#ffca28" },
    ],
  },
  {
    id: "api",
    category: "API Development & Testing",
    short: "APIs & Testing",
    summary: "Integrating and securing REST APIs, and testing the code that uses them.",
    skills: [
      { name: "REST APIs", icon: "server", color: "#818cf8" },
      { name: "Axios", icon: "axios", color: "#5a29e4" },
      { name: "Postman", icon: "postman", color: "#ff6c37" },
      { name: "JWT Authentication", icon: "jwt", color: "#e879f9" },
      { name: "OAuth 2.0", icon: "key", color: "#f59e0b" },
      { name: "Role-Based Access Control", icon: "shield", color: "#22c55e" },
      { name: "Jest", icon: "jest", color: "#c21325" },
      { name: "React Testing Library", icon: "testinglibrary", color: "#e33332" },
    ],
  },
  {
    id: "mobile",
    category: "Mobile Development & Native App Testing",
    short: "Mobile & Native Testing",
    summary: "Cross-platform apps built, run, and checked on emulators and devices.",
    skills: [
      { name: "React Native", icon: "react", color: "#61dafb" },
      { name: "Expo", icon: "expo", color: "theme" },
      { name: "Android Studio", icon: "androidstudio", color: "#3ddc84" },
      { name: "Android Emulator", icon: "mobile", color: "#3ddc84" },
      { name: "Xcode", icon: "xcode", color: "#147efb" },
      { name: "Push Notifications", icon: "bell", color: "#f97316" },
      { name: "Offline Data Sync", icon: "sync", color: "#22c55e" },
    ],
  },
  {
    id: "tools",
    category: "Development Tools",
    short: "Tools",
    summary: "Version control, collaboration, and debugging day to day.",
    skills: [
      { name: "Git", icon: "git", color: "#f05032" },
      { name: "GitHub", icon: "github", color: "theme" },
      { name: "Chrome DevTools", icon: "chrome", color: "#4285f4" },
    ],
  },
];

// Flat list for search and counts. Skill names are unique across groups.
export const allSkills = skillGroups.flatMap((group) =>
  group.skills.map((skill) => ({ ...skill, category: group.category }))
);

export const coreSkills = [
  "React.js",
  "React Native",
  "Next.js",
  "TypeScript",
  "JavaScript (ES6+)",
  "Redux Toolkit",
  "Node.js",
  "REST APIs",
];
