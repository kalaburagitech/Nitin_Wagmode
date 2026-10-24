import { profile } from "@/data/profile";

export default function manifest() {
  return {
    name: `${profile.fullName} — ${profile.role}`,
    short_name: profile.fullName,
    description: `Portfolio of ${profile.fullName}, ${profile.role} specializing in React.js, Next.js, React Native, and TypeScript.`,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0d14",
    theme_color: "#2dd4bf",
    lang: "en",
    scope: "/",
    categories: ["portfolio", "technology", "development"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
