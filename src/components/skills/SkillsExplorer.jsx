"use client";

import { useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { allSkills, skillGroups } from "@/data/skills";
import SkillIcon, { skillColor } from "@/components/ui/SkillIcon";
import FilterBar from "@/components/ui/FilterBar";

const slug = (value) => `skills-${value.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

export default function SkillsExplorer({ headingLevel = "h3" }) {
  const Heading = headingLevel;
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const options = [
    { id: "All", label: "All", count: allSkills.length },
    ...skillGroups.map((group) => ({ id: group.category, label: group.category, count: group.skills.length })),
  ];

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    return skillGroups
      .filter((group) => category === "All" || group.category === category)
      .map((group) => ({
        ...group,
        skills: q ? group.skills.filter((skill) => skill.name.toLowerCase().includes(q)) : group.skills,
      }))
      .filter((group) => group.skills.length);
  }, [category, query]);

  const total = groups.reduce((sum, group) => sum + group.skills.length, 0);

  return (
    <div>
      <div className="mb-10 space-y-5">
        <label className="relative block max-w-sm">
          <span className="sr-only">Search skills</span>
          <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search skills…"
            className="field pl-11"
          />
        </label>
        <FilterBar label="Filter skills by category" options={options} value={category} onChange={setCategory} />
        <p className="font-mono text-xs text-muted" aria-live="polite">
          {total} {total === 1 ? "skill" : "skills"}
        </p>
      </div>

      {groups.length === 0 ? (
        <p className="panel p-8 text-center text-muted">No skills match “{query}”.</p>
      ) : (
        <div className="space-y-12">
          {groups.map((group) => (
            <section key={group.category} aria-labelledby={slug(group.category)}>
              <Heading id={slug(group.category)} className="eyebrow mb-4 font-mono">
                {group.category}
              </Heading>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {group.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="panel flex items-center gap-3 px-4 py-3.5 text-sm text-ink transition-colors hover:border-accent/50"
                  >
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
          ))}
        </div>
      )}
    </div>
  );
}
