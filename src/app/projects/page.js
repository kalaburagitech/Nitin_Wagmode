import { generateMetadata, getBreadcrumbSchema } from "@/lib/seo-utils";
import { profile } from "@/data/profile";
import { projectCategories, projects } from "@/data/projects";
import PageHeader from "@/components/ui/PageHeader";
import JsonLd from "@/components/ui/JsonLd";
import ProjectGallery from "@/components/projects/ProjectGallery";

export const metadata = generateMetadata({
  title: "Projects",
  description: `Projects by ${profile.fullName}: KLB Connect, Stalwart Recon, BOAS.CO, MORF, CLOSAL, and SunnyStateAgency — field operations platforms, e-commerce, and UI engineering with React, Next.js, and React Native.`,
  path: "/projects",
  keywords: ["React Projects", "Next.js Projects", "React Native Projects", "KLB Connect", "BOAS.CO"],
});

export default function ProjectsPage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
        ])}
      />
      <PageHeader
        crumbs={[{ label: "Projects" }]}
        eyebrow="Selected work"
        title="Projects"
        intro="Products I've built or contributed to across field operations, e-commerce, and UI engineering. Most are client or internal products, so public links appear only where one exists."
      />
      <section aria-labelledby="project-list" className="shell py-16">
        <h2 id="project-list" className="sr-only">
          Project list
        </h2>
        <ProjectGallery projects={projects} categories={projectCategories} />
      </section>
    </>
  );
}
