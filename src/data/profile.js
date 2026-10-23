// Single source of truth for personal details. Every page, metadata block,
// and social link reads from here — edit this file to update the site.

// Production URL used for canonical links, sitemap, and Open Graph tags.
// Set NEXT_PUBLIC_SITE_URL in Vercel once the final domain is known.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://nitin-wagmode-portfolio.vercel.app"
).replace(/\/$/, "");

export const profile = {
  firstName: "Nitin",
  lastName: "Wagmode",
  fullName: "Nitin Wagmode",
  initials: "NW",
  role: "Frontend Developer",
  headline: "Frontend Developer | React.js | Next.js | React Native | TypeScript",
  techLine: ["React.js", "Next.js", "React Native", "TypeScript"],
  tagline: "Building reliable web and mobile products with React",
  shortSummary:
    "I build scalable web and mobile applications with React.js, Next.js, and React Native — focused on clean component architecture, dependable state management, and fast, accessible interfaces.",
  summary:
    "Frontend Developer with 4+ years of experience building scalable web and mobile applications using React.js, Next.js, React Native, TypeScript, and Redux Toolkit. I work across reusable component architecture, state management, REST API integration, responsive UI development, performance optimization, authentication, and role-based access control. I have contributed to field operations platforms and e-commerce products, with a focus on maintainable code, reliable interfaces, performance, and useful user experiences.",
  experienceYears: "4",
  location: "Bengaluru, Karnataka, India",
  city: "Bengaluru",
  region: "Karnataka",
  country: "India",
  nationality: "Indian",
  email: "wagmodenitin60@gmail.com",
  phone: "+91 6362050656",
  phoneHref: "tel:+916362050656",
  workPreference: "Open to relocation across India and remote work",
  available: true,
  currentCompany: "Kalaburagi Tech",
  resumeUrl: "/resume.pdf",
  // No professional photo supplied yet. Replace with e.g. "/assets/profile.jpg"
  // after adding the photo to public/assets.
  profileImageUrl: "/assets/profile-placeholder.svg",
  socials: {
    linkedin: "https://linkedin.com/in/nitin-wagmode-91410631b/",
    // GitHub profile not supplied. Add the URL here to show GitHub links
    // across the site; they stay hidden while this is empty.
    github: "",
  },
};

export const education = [
  {
    time: "2017 - 2020",
    title: "Bachelor of Computer Applications (BCA)",
    place: "Gulbarga University, Karnataka",
    cgpa: "CGPA: 8.5",
  },
];
