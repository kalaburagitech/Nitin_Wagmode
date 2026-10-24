"use client";

import { useMemo, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { allSkills, skillGroups } from "@/data/skills";
import SkillIcon, { skillColor } from "@/components/ui/SkillIcon";
import FilterBar from "@/components/ui/FilterBar";
import Reveal from "@/components/motion/Reveal";

// Skills grouped into category cards, with a category filter and search.
// Rendered on the server too, so every skill is in the initial HTML.
export default function SkillsExplorer({ headingLevel = "h3" }) {
  const Heading = headingLevel;
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");

  const options = [
    { id: "all", label: "All", count: allSkills.length },
    ...skillGroups.map((group) => ({ id: group.id, label: group.short, count: group.skills.length })),
  ];

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    return skillGroups
      .map((group, index) => ({ ...group, index }))
      .filter((group) => category === "all" || group.id === category)
      .map((group) => ({
        ...group,
        skills: q ? group.skills.filter((skill) => skill.name.toLowerCase().includes(q)) : group.skills,
      }))
      .filter((group) => group.skills.length);
  }, [category, query]);

  const total = groups.reduce((sum, group) => sum + group.skills.length, 0);

  return (
    <div>
      <div className="mb-10 flex flex-col gap-5">
        <label className="relative block max-w-sm">
          <span className="sr-only">Search skills</span>
          <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search skills…"
            className="field pl-11 pr-11"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-muted hover:text-ink"
            >
              <FiX aria-hidden="true" />
            </button>
          )}
        </label>
        <FilterBar label="Filter skills by category" options={options} value={category} onChange={setCategory} />
        <p className="font-mono text-xs text-muted" aria-live="polite">
          {total} {total === 1 ? "skill" : "skills"}
          {groups.length > 0 && ` across ${groups.length} ${groups.length === 1 ? "area" : "areas"}`}
        </p>
      </div>

      {groups.length === 0 ? (
        <p className="panel p-8 text-center text-muted">No skills match “{query}”.</p>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {groups.map((group) => {
            const headingId = `skills-${group.id}`;
            return (
              <Reveal key={group.id} delay={Math.min(group.index, 3) * 0.04} className="h-full">
                <section aria-labelledby={headingId} className="panel flex h-full flex-col p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="font-mono text-xs text-accent">{String(group.index + 1).padStart(2, "0")}</span>
                      <Heading id={headingId} className="mt-2 text-xl font-semibold">
                        {group.category}
                      </Heading>
                    </div>
                    <span className="chip shrink-0">{group.skills.length}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted">{group.summary}</p>

                  <ul className="mt-6 grid gap-x-6 gap-y-1 border-t hairline pt-5 sm:grid-cols-2">
                    {group.skills.map((skill) => (
                      <li key={skill.name} className="flex items-center gap-3 py-1.5 text-[15px] text-ink">
                        <span
                          className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-sunken text-base"
                          style={{ color: skillColor(skill.color) }}
                        >
                          <SkillIcon name={skill.icon} />
                        </span>
                        {skill.name}
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>
            );
          })}
        </div>
      )}
    </div>
  );
}
