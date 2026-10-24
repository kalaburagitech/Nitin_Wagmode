import { FiArrowUpRight } from "react-icons/fi";
import Reveal from "@/components/motion/Reveal";

// Work history. `compact` shows role, company, and dates only (home page);
// the full version lists responsibilities and technologies.
export default function Timeline({ items, compact = false }) {
  return (
    <ol className="relative border-l hairline">
      {items.map((job, i) => (
        <li key={`${job.company}-${job.duration}`} className="relative pb-12 pl-8 last:pb-0 sm:pl-12">
          <span
            className={`absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full ring-4 ring-canvas ${
              i === 0 ? "bg-accent" : "bg-muted/60"
            }`}
            aria-hidden="true"
          />
          <Reveal>
            <div className="grid gap-x-10 gap-y-2 md:grid-cols-[12rem_1fr]">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted md:pt-1.5">{job.duration}</p>
              <div>
                <h3 className="text-xl font-semibold">{job.role}</h3>
                <p className="mt-1 text-sm text-muted">
                  {job.website ? (
                    <a
                      href={job.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-ink hover:text-accent"
                    >
                      {job.company} <FiArrowUpRight aria-hidden="true" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  ) : (
                    <span className="text-ink">{job.company}</span>
                  )}
                  {job.location && ` · ${job.location}`}
                </p>
                {job.project && (
                  <p className="mt-2 text-sm">
                    <span className="text-muted">Projects: </span>
                    {job.project}
                  </p>
                )}

                {!compact && (
                  <>
                    <ul className="mt-5 space-y-3 text-[15px] leading-7">
                      {job.points.map((point) => (
                        <li key={point} className="flex gap-3">
                          <span className="mt-3 h-px w-3 shrink-0 bg-accent" aria-hidden="true" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                    <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
                      {job.tech.map((tech) => (
                        <li key={tech} className="chip">
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
