import { generateMetadata, getBreadcrumbSchema } from "@/lib/seo-utils";
import { profile } from "@/data/profile";
import PageHeader from "@/components/ui/PageHeader";
import JsonLd from "@/components/ui/JsonLd";
import SkillsExplorer from "@/components/skills/SkillsExplorer";

export const metadata = generateMetadata({
  title: "Skills",
  description: `Technical skills of ${profile.fullName}: React.js, Next.js, React Native, TypeScript, Redux, Node.js, Express.js, MongoDB, MySQL, Firebase, REST APIs, Jest, and React Testing Library.`,
  path: "/skills",
  keywords: ["React Skills", "Next.js Skills", "React Native Skills", "TypeScript", "MERN Stack", "Node.js", "MongoDB"],
});

export default function SkillsPage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Skills", path: "/skills" },
        ])}
      />
      <PageHeader
        crumbs={[{ label: "Skills" }]}
        eyebrow="Toolkit"
        title="Skills"
        intro="The languages, frameworks, and tools I work with across web, mobile, and APIs. Filter by area or search for something specific."
      />
      <section aria-label="Skills" className="shell py-16">
        <SkillsExplorer headingLevel="h2" />
      </section>
    </>
  );
}
