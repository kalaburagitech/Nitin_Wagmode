"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FilterBar from "@/components/ui/FilterBar";
import ProjectCard from "./ProjectCard";

export default function ProjectGallery({ projects, categories }) {
  const [filter, setFilter] = useState("all");
  const visible = filter === "all" ? projects : projects.filter((p) => p.category === filter);
  const options = categories.map((category) => ({
    id: category.id,
    label: category.name,
    count: category.id === "all" ? projects.length : projects.filter((p) => p.category === category.id).length,
  }));

  return (
    <>
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <FilterBar label="Filter projects by category" options={options} value={filter} onChange={setFilter} />
        <p className="font-mono text-xs text-muted" aria-live="polite">
          Showing {visible.length} of {projects.length}
        </p>
      </div>

      <motion.ul layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project) => (
            <motion.li
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25 }}
            >
              <ProjectCard project={project} index={projects.indexOf(project)} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </>
  );
}
