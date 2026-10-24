import { generateMetadata, getBreadcrumbSchema } from "@/lib/seo-utils";
import { profile, education } from "@/data/profile";
import { experiences } from "@/data/experience";
import PageHeader from "@/components/ui/PageHeader";
import JsonLd from "@/components/ui/JsonLd";
import Timeline from "@/components/experience/Timeline";
import ContactBand from "@/components/home/ContactBand";

export const metadata = generateMetadata({
  title: "Experience",
  description: `Work experience of ${profile.fullName}: Freelance Frontend Developer at Kalaburagi Tech, Frontend Developer at Stalwart People Services India Ltd., and Frontend Developer at AU Technology Consulting.`,
  path: "/experience",
  keywords: ["Frontend Developer Experience", "React Native Developer Experience", "Kalaburagi Tech"],
  type: "profile",
});

export default function ExperiencePage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Experience", path: "/experience" },
        ])}
      />
      <PageHeader
        crumbs={[{ label: "Experience" }]}
        eyebrow="Career"
        title="Experience"
        intro={`${profile.experienceYears}+ years building React, Next.js, and React Native products — from contributing as a freelancer to owning frontend delivery as the sole engineer.`}
      />

      <section aria-labelledby="work-history" className="shell py-16">
        <h2 id="work-history" className="sr-only">
          Work history
        </h2>
        <Timeline items={experiences} />
      </section>

      <section aria-labelledby="education-title" className="shell">
        <h2 id="education-title" className="eyebrow mb-6 font-mono">
          Education
        </h2>
        {education.map((item) => (
          <div key={item.title} className="panel grid gap-2 p-6 sm:grid-cols-[12rem_1fr] sm:p-8">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">{item.time}</p>
            <div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm text-muted">
                {item.place} · {item.cgpa}
              </p>
            </div>
          </div>
        ))}
      </section>

      <ContactBand />
    </>
  );
}
