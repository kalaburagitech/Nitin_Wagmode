"use client";

import { useTheme } from "@/components/ThemeProvider";
import { motion } from "framer-motion";
import { useState } from "react";
import SkillIcon, { skillColor } from "@/components/SkillIcon";
import { allSkills, skillCategories } from "@/data/skills";

const highlights = [
  { value: "500+", label: "Users at BOAS.CO Launch" },
  { value: "60%", label: "Faster Product Publishing" },
  { value: "50%", label: "Less Manual Admin Effort" },
  { value: "30%", label: "Fewer State-Related Defects" },
];

const SkillsHome = () => {
  const { isDarkMode } = useTheme();
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = skillCategories;

  const filteredSkills =
    activeCategory === "All"
      ? allSkills
      : allSkills.filter((s) => s.category === activeCategory);

  return (
    <section className="py-20 px-4 md:px-10 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="text-center mb-10">
        <p className="text-sm tracking-widest text-[var(--primary)] mb-2">
          TECHNICAL SKILLS
        </p>

        <h2 className="text-3xl md:text-5xl font-bold mb-3">My Tech Stack</h2>

        <p className="text-sm opacity-70 max-w-md mx-auto">
          Technologies I use to build web and mobile applications — from
          field operations platforms to e-commerce products.
        </p>
      </div>

      {/* FILTER */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            aria-pressed={activeCategory === cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 text-sm rounded-full border transition ${
              activeCategory === cat
                ? "bg-[var(--primary)] text-white"
                : "border-gray-400 text-gray-500 hover:border-[var(--primary)] hover:text-[var(--primary)]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
        {filteredSkills.map((skill, i) => (
          <motion.div
            key={`${skill.category}-${skill.name}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: Math.min(i * 0.02, 0.6) }}
            whileHover={{ scale: 1.08, y: -4 }}
            className="p-4 rounded-xl flex flex-col items-center gap-2 cursor-pointer border transition-all duration-300"
            style={{
              background: isDarkMode
                ? "rgba(255,255,255,0.03)"
                : "rgba(0,0,0,0.02)",
              borderColor: isDarkMode
                ? "rgba(255,255,255,0.08)"
                : "rgba(0,0,0,0.08)",
            }}
          >
            <div
              className="text-3xl"
              style={{ color: skillColor(skill.color, isDarkMode) }}
            >
              <SkillIcon name={skill.icon} />
            </div>

            <p className="text-xs text-center font-medium">{skill.name}</p>
            <span className="text-[10px] opacity-50">{skill.category}</span>
          </motion.div>
        ))}
      </div>

      {/* STATS - Matching resume achievements */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
        {highlights.map((item) => (
          <div
            key={item.label}
            className="text-center p-4 rounded-xl border"
            style={{
              background: isDarkMode
                ? "rgba(255,255,255,0.03)"
                : "rgba(0,0,0,0.02)",
              borderColor: isDarkMode
                ? "rgba(255,255,255,0.08)"
                : "rgba(0,0,0,0.08)",
            }}
          >
            <p className="text-3xl font-bold text-[var(--primary)]">
              {item.value}
            </p>
            <p className="text-xs opacity-70">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsHome;