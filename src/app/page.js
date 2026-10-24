import { generateMetadata } from "@/lib/seo-utils";
import { getAllBlogPostSummaries } from "@/lib/blogs";
import { profile } from "@/data/profile";
import { experiences } from "@/data/experience";
import { projects } from "@/data/projects";
import HomeHero from "@/components/home/HomeHero";
import Highlights from "@/components/home/Highlights";
import ServicesGrid from "@/components/home/ServicesGrid";
import ContactBand from "@/components/home/ContactBand";
import ProjectCard from "@/components/projects/ProjectCard";
import Timeline from "@/components/experience/Timeline";
import PostList from "@/components/blog/PostList";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/motion/Reveal";

export const metadata = {
  ...generateMetadata({
    description: `${profile.fullName} — ${profile.role} in ${profile.city} with ${profile.experienceYears}+ years building scalable web and mobile applications with React.js, Next.js, React Native, and TypeScript.`,
    path: "/",
    keywords: ["Nitin Wagmode Portfolio", "Frontend Developer Portfolio", "React Developer Bengaluru"],
  }),
  // The home page uses the root layout's full title, not the page template.
  title: { absolute: `${profile.fullName} | ${profile.role} — React.js, Next.js, React Native` },
};

export default function Home() {
  const featured = projects.slice(0, 3);
  const posts = getAllBlogPostSummaries().slice(0, 3);
  let index = 0;
  const next = () => String(++index).padStart(2, "0");

  return (
    <>
      <HomeHero />
      <Highlights />

      <section aria-labelledby="work-title" className="shell mt-28">
        <SectionHeading
          id="work-title"
          index={next()}
          eyebrow="Selected work"
          title="Products I've helped ship"
          intro="Field operations platforms, e-commerce, and UI engineering — from sole-frontend ownership to leading a launch."
          link={{ href: "/projects", label: "All projects" }}
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.05}>
              <ProjectCard project={project} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      <section aria-labelledby="experience-title" className="shell mt-28">
        <SectionHeading
          id="experience-title"
          index={next()}
          eyebrow="Experience"
          title={`${profile.experienceYears}+ years of frontend delivery`}
          link={{ href: "/experience", label: "Full experience" }}
        />
        <Timeline items={experiences} compact />
      </section>

      <section aria-labelledby="services-title" className="shell mt-28">
        <SectionHeading
          id="services-title"
          index={next()}
          eyebrow="What I do"
          title="Where I can help"
          link={{ href: "/services", label: "Services" }}
        />
        <ServicesGrid />
      </section>

      {posts.length > 0 && (
        <section aria-labelledby="writing-title" className="shell mt-28">
          <SectionHeading
            id="writing-title"
            index={next()}
            eyebrow="Writing"
            title="Notes from the codebase"
            link={{ href: "/blog", label: "All articles" }}
          />
          <PostList posts={posts} />
        </section>
      )}

      <ContactBand />
    </>
  );
}
