import { generateMetadata, getBreadcrumbSchema } from "@/lib/seo-utils";
import { profile } from "@/data/profile";
import Projects from "@/mainPages/portfolioPages/Projects";

export const metadata = generateMetadata({
  title: "Projects",
  description: `Projects by ${profile.fullName}: KLB Connect, Stalwart Recon, BOAS.CO, MORF, CLOSAL, and SunnyStateAgency — field operations platforms, e-commerce, and UI engineering with React, Next.js, and React Native.`,
  path: "/projects",
  keywords: ["React Projects", "Next.js Projects", "React Native Projects", "KLB Connect", "BOAS.CO"],
  type: "website",
});

const breadcrumbSchema = getBreadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
]);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <section className="sr-only">
        <h1>{`Projects by ${profile.fullName}`}</h1>
        <p>{`Field operations platforms, e-commerce products, and UI engineering work built with React.js, Next.js, React Native, and TypeScript.`}</p>
      </section>
      <Projects />
    </>
  );
}
