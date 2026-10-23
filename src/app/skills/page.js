import { generateMetadata, getBreadcrumbSchema } from "@/lib/seo-utils";
import { profile } from "@/data/profile";
import SkillsHome from "@/mainPages/portfolioPages/SkillsHome";

export const metadata = generateMetadata({
  title: "Skills",
  description: `Technical skills of ${profile.fullName}: React.js, Next.js, React Native, TypeScript, Redux Toolkit, REST APIs, JWT, OAuth 2.0, performance optimization, accessibility, and testing.`,
  path: "/skills",
  keywords: ["React Skills", "Next.js Skills", "React Native Skills", "TypeScript"],
  type: "website",
});

const breadcrumbSchema = getBreadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Skills", path: "/skills" },
]);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <section className="sr-only">
        <h1>{`Technical Skills — ${profile.fullName}`}</h1>
        <p>{`Frontend, React ecosystem, Next.js rendering, API integration, authentication, performance, mobile, and tooling skills.`}</p>
      </section>
      <SkillsHome />
    </>
  );
}
