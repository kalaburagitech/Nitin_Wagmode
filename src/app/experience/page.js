import { generateMetadata, getBreadcrumbSchema } from "@/lib/seo-utils";
import { profile } from "@/data/profile";
import Experience from "@/mainPages/portfolioPages/Experience";

export const metadata = generateMetadata({
  title: "Experience",
  description: `Work experience of ${profile.fullName}: Freelance Frontend Developer at Kalaburagi Tech, Frontend Developer at Stalwart People Services India Ltd., and Frontend Developer at AU Technology Consulting.`,
  path: "/experience",
  keywords: ["Frontend Developer Experience", "React Native Developer Experience", "Kalaburagi Tech"],
  type: "profile",
});

const breadcrumbSchema = getBreadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Experience", path: "/experience" },
]);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <section className="sr-only">
        <h1>{`Work Experience — ${profile.fullName}`}</h1>
        <p>{`${profile.experienceYears}+ years of frontend development across React.js, Next.js, and React Native.`}</p>
      </section>
      <Experience />
    </>
  );
}
