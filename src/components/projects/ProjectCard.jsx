import Image from "next/image";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";

// Case-study style card. Covers are SVG, so they skip the image optimizer.
// Links render only when a public URL exists in src/data/projects.js.
export default function ProjectCard({ project, index, priority = false }) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <article className="panel group flex h-full flex-col overflow-hidden transition-colors hover:border-accent/50">
      <div className="relative aspect-[16/10] overflow-hidden border-b hairline bg-sunken">
        <Image
          src={project.image}
          alt={`${project.title} — ${project.subcategory} illustration`}
          fill
          unoptimized
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <span className="absolute right-4 top-4 rounded-full bg-canvas/85 px-2.5 py-1 font-mono text-[11px] text-ink backdrop-blur">
          {number}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow text-[11px]">{project.subcategory}</p>
        <h3 className="mt-2 text-xl font-semibold">{project.title}</h3>
        <p className="mt-1 text-sm text-muted">
          {project.company} · {project.period}
        </p>
        <p className="mt-4 text-sm leading-6">{project.description}</p>

        {project.features?.length > 0 && (
          <ul className="mt-4 space-y-2 text-sm leading-6">
            {project.features.map((feature) => (
              <li key={feature} className="flex gap-2.5">
                <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.tech.map((tech) => (
            <li key={tech} className="chip">
              {tech}
            </li>
          ))}
        </ul>

        {(project.liveLink || project.githubLink) && (
          <div className="mt-auto flex flex-wrap gap-4 pt-6 text-sm font-medium">
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-accent hover:underline"
              >
                {project.liveLabel || "Live site"} <FiArrowUpRight aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-ink hover:text-accent"
              >
                <FiGithub aria-hidden="true" /> Source
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
