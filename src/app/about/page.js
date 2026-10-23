import { generateMetadata, getBreadcrumbSchema } from "@/lib/seo-utils";
import { profile } from "@/data/profile";
import AboutUs from "@/mainPages/AboutUs";

export const metadata = generateMetadata({
  title: "About Me",
  description: `About ${profile.fullName}: ${profile.role} in ${profile.city} with ${profile.experienceYears}+ years building web and mobile applications with React.js, Next.js, React Native, and TypeScript. Skills, background, and education.`,
  path: "/about",
  keywords: ["About Nitin Wagmode", "Frontend Developer Bengaluru", "React Developer Skills"],
  type: "profile",
});

const breadcrumbSchema = getBreadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
]);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <section className="sr-only">
        <h1>{`About ${profile.fullName} — ${profile.role}`}</h1>
        <p>{`${profile.summary}`}</p>
      </section>
      <AboutUs />
    </>
  );
}
