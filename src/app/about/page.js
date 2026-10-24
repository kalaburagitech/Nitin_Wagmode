import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiDownload } from "react-icons/fi";
import { generateMetadata, getBreadcrumbSchema } from "@/lib/seo-utils";
import { profile, education } from "@/data/profile";
import { coreSkills } from "@/data/skills";
import { achievements } from "@/data/achievements";
import PageHeader from "@/components/ui/PageHeader";
import JsonLd from "@/components/ui/JsonLd";
import SocialLinks from "@/components/ui/SocialLinks";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/motion/Reveal";
import ContactBand from "@/components/home/ContactBand";

export const metadata = generateMetadata({
  title: "About Me",
  description: `About ${profile.fullName}: ${profile.role} in ${profile.city} with ${profile.experienceYears}+ years building web and mobile applications with React.js, Next.js, React Native, and TypeScript. Skills, background, and education.`,
  path: "/about",
  keywords: ["About Nitin Wagmode", "Frontend Developer Bengaluru", "React Developer Skills"],
  type: "profile",
});

const facts = [
  { label: "Based in", value: profile.location },
  { label: "Experience", value: `${profile.experienceYears}+ years` },
  { label: "Currently", value: `Freelance at ${profile.currentCompany}` },
  { label: "Work preference", value: profile.workPreference },
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "Phone", value: profile.phone, href: profile.phoneHref },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <PageHeader crumbs={[{ label: "About" }]} eyebrow="About" title={`Hi, I'm ${profile.firstName}.`} intro={profile.tagline + "."} />

      <section aria-labelledby="bio-title" className="shell grid gap-14 py-16 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border hairline bg-gradient-to-b from-accent/20 to-raised">
            <div className="grid-backdrop absolute inset-0 opacity-60" aria-hidden="true" />
            <Image
              src={profile.profileImageUrl}
              alt={`Portrait of ${profile.fullName}`}
              fill
              sizes="(max-width: 1024px) 100vw, 30vw"
              className="object-contain object-bottom"
            />
          </div>
          <SocialLinks className="mt-6" />
        </Reveal>

        <div>
          <h2 id="bio-title" className="text-3xl font-semibold sm:text-4xl">
            {profile.role} — {profile.techLine.join(", ")}.
          </h2>
          <p className="mt-6 text-lg leading-8">{profile.summary}</p>
          <p className="mt-5 text-lg leading-8">
            Today I freelance with{" "}
            <a href={profile.freelance.url} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-4">
              {profile.freelance.name}
            </a>{" "}
            on KLB Connect, a field operations platform spanning a React Native app and a Next.js dashboard. Before that I was the
            sole frontend engineer on Stalwart Recon, and led the frontend and Next.js SSR migration that brought BOAS.CO to launch.
          </p>

          <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border hairline bg-[rgb(var(--line)/var(--line-alpha))] sm:grid-cols-2">
            {facts.map((fact) => (
              <div key={fact.label} className="bg-raised p-5">
                <dt className="eyebrow text-[10px]">{fact.label}</dt>
                <dd className="mt-1.5 text-sm text-ink">
                  {fact.href ? (
                    <a href={fact.href} className="hover:text-accent">
                      {fact.value}
                    </a>
                  ) : (
                    fact.value
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap gap-3">
            <a href={profile.resumeUrl} download className="btn-primary">
              <FiDownload aria-hidden="true" /> Download résumé
            </a>
            <Link href="/experience" className="btn-ghost">
              See my experience <FiArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="results-title" className="shell mt-12">
        <SectionHeading id="results-title" index="01" eyebrow="Results" title="A few outcomes I'm proud of" />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {achievements.map((item, i) => (
            <Reveal as="li" key={item.label} delay={i * 0.05} className="panel p-6">
              <p className="font-display text-4xl font-semibold text-accent">{item.value}</p>
              <p className="mt-3 text-sm font-medium text-ink">{item.label}</p>
              <p className="mt-2 text-xs leading-5 text-muted">{item.context}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section aria-labelledby="stack-title" className="shell mt-28 grid gap-10 lg:grid-cols-2">
        <div>
          <SectionHeading
            id="stack-title"
            index="02"
            eyebrow="Core stack"
            title="Tools I reach for first"
            link={{ href: "/skills", label: "All skills" }}
          />
          <ul className="flex flex-wrap gap-2">
            {coreSkills.map((skill) => (
              <li key={skill} className="rounded-full border hairline px-4 py-2 text-sm text-ink">
                {skill}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <SectionHeading index="03" eyebrow="Education" title="Background" />
          {education.map((item) => (
            <div key={item.title} className="panel p-6">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">{item.time}</p>
              <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm text-muted">
                {item.place} · {item.cgpa}
              </p>
            </div>
          ))}
        </div>
      </section>

      <ContactBand />
    </>
  );
}
