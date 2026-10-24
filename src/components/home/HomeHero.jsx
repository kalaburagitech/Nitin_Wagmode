import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiDownload, FiMapPin } from "react-icons/fi";
import { profile } from "@/data/profile";
import { experiences } from "@/data/experience";

export default function HomeHero() {
  const current = experiences[0];

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pt-[calc(var(--header-h)+2.5rem)] lg:pt-[calc(var(--header-h)+4rem)]">
      <div className="grid-backdrop pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="shell relative grid items-center gap-14 pb-16 lg:grid-cols-[1.15fr_0.85fr] lg:pb-24">
        <div>
          <div className="enter">
            <p className="inline-flex items-center gap-2.5 rounded-full border hairline bg-raised/70 px-3.5 py-1.5 text-xs text-muted backdrop-blur">
              {profile.available && (
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inset-0 animate-pulse-dot rounded-full bg-success" />
                </span>
              )}
              {profile.available ? "Available for new roles" : profile.role}
              <span className="text-line" aria-hidden="true">
                ·
              </span>
              <FiMapPin aria-hidden="true" /> {profile.city}, {profile.country}
            </p>
          </div>

          <div className="enter" style={{ "--enter-delay": "50ms" }}>
            <h1 id="hero-title" className="mt-7 text-5xl font-semibold leading-[1.02] sm:text-6xl lg:text-7xl">
              {profile.fullName}
              <span className="mt-3 block text-[0.5em] font-medium leading-tight text-muted">
                {profile.role} building <span className="text-accent">dependable</span> web &amp; mobile products.
              </span>
            </h1>
          </div>

          <div className="enter" style={{ "--enter-delay": "100ms" }}>
            <p className="mt-7 max-w-xl text-lg leading-8">{profile.shortSummary}</p>
          </div>

          <div className="enter" style={{ "--enter-delay": "150ms" }}>
            <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs text-muted" aria-label="Specializations">
              {profile.techLine.map((tech, i) => (
                <li key={tech} className="flex items-center gap-4">
                  {i > 0 && <span className="h-3 w-px bg-line/30" aria-hidden="true" />}
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          <div className="enter mt-9 flex flex-wrap items-center gap-3" style={{ "--enter-delay": "200ms" }}>
            <Link href="/projects" className="btn-primary">
              View selected work <FiArrowRight aria-hidden="true" />
            </Link>
            <a href={profile.resumeUrl} download={profile.resumeFileName} className="btn-ghost">
              <FiDownload aria-hidden="true" /> Download résumé
            </a>
          </div>
        </div>

        <div className="enter relative mx-auto w-full max-w-md lg:max-w-none" style={{ "--enter-delay": "100ms" }}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border hairline bg-gradient-to-b from-accent/25 via-accent/5 to-raised">
            <div className="grid-backdrop absolute inset-0 opacity-70" aria-hidden="true" />
            <div
              className="absolute left-1/2 top-[18%] h-2/3 w-2/3 -translate-x-1/2 rounded-full bg-accent/30 blur-3xl"
              aria-hidden="true"
            />
            <Image
              src={profile.profileImageUrl}
              alt={`Portrait of ${profile.fullName}`}
              fill
              priority
              sizes="(max-width: 1024px) 28rem, 34vw"
              className="object-contain object-bottom"
            />
          </div>

          <div className="panel absolute -bottom-6 left-4 right-4 p-4 shadow-xl shadow-black/10 sm:left-auto sm:right-[-1rem] sm:w-72">
            <p className="eyebrow text-[10px]">Currently</p>
            <p className="mt-1.5 text-sm font-medium text-ink">{current.role}</p>
            <p className="text-sm text-muted">
              {current.company}
              {current.project ? ` · ${current.project}` : ""}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
