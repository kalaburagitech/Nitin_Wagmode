import { generateMetadata } from "@/lib/seo-utils";
import { profile } from "@/data/profile";
import Hero from "@/mainPages/portfolioPages/Hero";

export const metadata = {
  ...generateMetadata({
    description: `${profile.fullName} — ${profile.role} in ${profile.city} with ${profile.experienceYears}+ years building scalable web and mobile applications with React.js, Next.js, React Native, and TypeScript.`,
    path: "/",
    keywords: ["Nitin Wagmode Portfolio", "Frontend Developer Portfolio", "React Developer Bengaluru"],
  }),
  // Use the root layout's default title on the home page.
  title: { absolute: `${profile.fullName} | ${profile.role} — React.js, Next.js, React Native` },
};

export default function Home() {
  return <Hero />;
}
