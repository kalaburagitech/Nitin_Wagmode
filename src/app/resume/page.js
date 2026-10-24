import { FiDownload, FiExternalLink, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { generateMetadata, getBreadcrumbSchema } from "@/lib/seo-utils";
import { profile, education } from "@/data/profile";
import { experiences } from "@/data/experience";
import { skillGroups } from "@/data/skills";
import { achievements } from "@/data/achievements";
import PageHeader from "@/components/ui/PageHeader";
import JsonLd from "@/components/ui/JsonLd";

export const metadata = generateMetadata({
  title: "Resume",
  description: `Resume of ${profile.fullName}, ${profile.role}: experience, education (BCA, Gulbarga University), key results, and a downloadable PDF.`,
  path: "/resume",
  keywords: ["Frontend Developer Resume", "React Developer CV", "Nitin Wagmode Resume"],
  type: "profile",
});

const DOWNLOAD_NAME = `${profile.fullName.replace(/\s+/g, "_")}_Resume.pdf`;

function Block({ title, children }) {
  const id = `resume-${title.toLowerCase().replace(/[^a-z]+/g, "-")}`;
  return (
    <section aria-labelledby={id} className="grid gap-6 border-t hairline py-10 md:grid-cols-[12rem_1fr]">
      <h2 id={id} className="eyebrow pt-1 font-mono">
        {title}
      </h2>
      <div>{children}</div>
    </section>
  );
}

export default function ResumePage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Resume", path: "/resume" },
        ])}
      />
      <PageHeader
        crumbs={[{ label: "Resume" }]}
        eyebrow="Résumé"
        title="Resume"
        intro="The one-page version of my experience. Download the PDF for applications, or read it here."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={profile.resumeUrl} download={DOWNLOAD_NAME} className="btn-primary">
            <FiDownload aria-hidden="true" /> Download PDF
          </a>
          <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            <FiExternalLink aria-hidden="true" /> Open in new tab
          </a>
        </div>
      </PageHeader>

      <article className="shell py-16">
        <div className="panel p-6 sm:p-12">
          <header className="flex flex-col gap-4 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-display text-3xl font-semibold text-ink">{profile.fullName}</p>
              <p className="mt-1 text-muted">{profile.headline}</p>
            </div>
            <ul className="space-y-1 text-sm text-muted sm:text-right">
              <li className="flex items-center gap-2 sm:justify-end">
                <FiMapPin aria-hidden="true" /> {profile.location}
              </li>
              <li>
                <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 hover:text-accent">
                  <FiMail aria-hidden="true" /> {profile.email}
                </a>
              </li>
              <li>
                <a href={profile.phoneHref} className="inline-flex items-center gap-2 hover:text-accent">
                  <FiPhone aria-hidden="true" /> {profile.phone}
                </a>
              </li>
            </ul>
          </header>

          <Block title="Profile">
            <p className="leading-7">{profile.summary}</p>
          </Block>

          <Block title="Experience">
            <div className="space-y-10">
              {experiences.map((job) => (
                <div key={job.company}>
                  <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                    <h3 className="text-lg font-semibold">
                      {job.role} · <span className="text-body">{job.company}</span>
                    </h3>
                    <p className="font-mono text-xs text-muted">{job.duration}</p>
                  </div>
                  {job.project && <p className="mt-1 text-sm text-muted">{job.project}</p>}
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[15px] leading-7 marker:text-accent">
                    {job.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Block>

          <Block title="Key results">
            <ul className="grid gap-4 sm:grid-cols-2">
              {achievements.map((item) => (
                <li key={item.label} className="flex gap-3">
                  <span className="font-display text-xl font-semibold text-accent">{item.value}</span>
                  <span className="text-sm leading-6">
                    {item.label}
                    <span className="block text-xs text-muted">{item.context}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Block>

          <Block title="Skills">
            <dl className="space-y-3 text-sm leading-6">
              {skillGroups.map((group) => (
                <div key={group.category} className="grid gap-1 sm:grid-cols-[11rem_1fr]">
                  <dt className="font-medium text-ink">{group.category}</dt>
                  <dd>{group.skills.map((skill) => skill.name).join(", ")}</dd>
                </div>
              ))}
            </dl>
          </Block>

          <Block title="Education">
            {education.map((item) => (
              <div key={item.title} className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted">
                    {item.place} · {item.cgpa}
                  </p>
                </div>
                <p className="font-mono text-xs text-muted">{item.time}</p>
              </div>
            ))}
          </Block>
        </div>
      </article>
    </>
  );
}
