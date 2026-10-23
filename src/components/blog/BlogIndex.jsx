"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FiArrowUpRight,
  FiBookOpen,
  FiCalendar,
  FiClock,
  FiSearch,
  FiTag,
  FiX,
} from "react-icons/fi";

const INITIAL_VISIBLE_COUNT = 7;
const LOAD_MORE_COUNT = 6;

function matchesSearch(post, query) {
  if (!query) return true;

  const searchableText = [
    post.title,
    post.description,
    post.category,
    ...(post.tags || []),
  ]
    .join(" ")
    .toLowerCase();

  return searchableText.includes(query.toLowerCase());
}

function BlogMeta({ post, className = "" }) {
  return (
    <div
      className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm ${className}`}
      style={{ color: "var(--text-muted)" }}
    >
      <span className="inline-flex items-center gap-1.5">
        <FiCalendar className="h-4 w-4" aria-hidden="true" />
        {post.displayDate}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <FiClock className="h-4 w-4" aria-hidden="true" />
        {post.readingTime}
      </span>
    </div>
  );
}

function DraftPill() {
  return (
    <span className="inline-flex items-center rounded-full border border-amber-400/60 bg-amber-400/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-amber-500">
      Draft
    </span>
  );
}

function CategoryPill({ children }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white"
      style={{ background: "var(--primary)" }}
    >
      <FiTag className="h-3 w-3" aria-hidden="true" />
      {children}
    </span>
  );
}

function BlogCard({ post, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.25) }}
      className="group relative overflow-hidden rounded-lg border transition-all duration-300 hover:-translate-y-1"
      style={{
        background: "var(--bg-card)",
        borderColor: "var(--border)",
        boxShadow: "0 14px 40px rgba(15, 23, 42, 0.06)",
      }}
    >
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={post.image}
            alt={post.imageAlt || post.title}
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            <CategoryPill>{post.category}</CategoryPill>
            {post.draft ? <DraftPill /> : null}
          </div>
        </div>

        <div className="flex h-[270px] flex-col p-5 sm:p-6">
          <BlogMeta post={post} className="mb-4" />

          <h3
            className="line-clamp-2 text-xl font-bold leading-tight transition-colors group-hover:text-primary"
            style={{ color: "var(--text-heading)" }}
          >
            {post.title}
          </h3>

          <p
            className="mt-3 line-clamp-3 text-sm leading-6"
            style={{ color: "var(--text-muted)" }}
          >
            {post.description}
          </p>

          <div className="mt-auto flex items-center justify-between border-t pt-5" style={{ borderColor: "var(--border)" }}>
            <span className="text-sm font-semibold" style={{ color: "var(--primary)" }}>
              Read article
            </span>
            <span
              className="grid h-9 w-9 place-items-center rounded-full border transition-all group-hover:translate-x-1 group-hover:-translate-y-1"
              style={{ borderColor: "var(--border)", color: "var(--primary)" }}
              aria-hidden="true"
            >
              <FiArrowUpRight />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function BlogIndex({ posts, categories }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  }, [query, activeCategory]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const categoryMatches =
        activeCategory === "All" || post.category === activeCategory;

      return categoryMatches && matchesSearch(post, query.trim());
    });
  }, [activeCategory, posts, query]);

  const featuredPost = filteredPosts[0] || null;
  const remainingPosts = filteredPosts.slice(1);
  const visiblePosts = remainingPosts.slice(0, Math.max(0, visibleCount - 1));
  const hasMore = remainingPosts.length > visiblePosts.length;

  return (
    <section className="relative overflow-hidden bg-bg py-16 sm:py-20 lg:py-24">
      <div className="container-custom">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-label">Technical writing</span>
          <h1 className="section-title">Practical Notes From Real Builds</h1>
          <p className="section-desc mx-auto">
            Articles on React, Next.js, React Native, TypeScript, Redux
            Toolkit, API integration, and frontend performance.
          </p>
          <div className="section-divider section-divider-center mx-auto" />
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <label className="relative block">
            <span className="sr-only">Search blog posts</span>
            <FiSearch
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2"
              style={{ color: "var(--text-muted)" }}
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search articles, tags, or categories"
              className="h-12 w-full rounded-lg border bg-bg-card pl-12 pr-12 text-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-heading)",
              }}
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full transition hover:bg-primary/10"
                aria-label="Clear search"
                style={{ color: "var(--text-muted)" }}
              >
                <FiX />
              </button>
            ) : null}
          </label>

          <div className="flex gap-2 overflow-x-auto pb-2 lg:justify-end lg:pb-0">
            {categories.map((category) => {
              const active = activeCategory === category.name;

              return (
                <button
                  key={category.name}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setActiveCategory(category.name)}
                  className="shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-300"
                  style={{
                    background: active ? "var(--primary)" : "var(--bg-card)",
                    borderColor: active ? "var(--primary)" : "var(--border)",
                    color: active ? "#fff" : "var(--text-body)",
                  }}
                >
                  {category.name} ({category.count})
                </button>
              );
            })}
          </div>
        </div>

        {featuredPost ? (
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="group mt-10 overflow-hidden rounded-lg border"
            style={{
              background: "var(--bg-card)",
              borderColor: "var(--border)",
              boxShadow: "0 18px 55px rgba(15, 23, 42, 0.08)",
            }}
          >
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="grid min-h-[420px] lg:grid-cols-[1.12fr_0.88fr]"
            >
              <div className="relative min-h-[260px] overflow-hidden lg:min-h-full">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.imageAlt || featuredPost.title}
                  fill
                  unoptimized
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                  <CategoryPill>{featuredPost.category}</CategoryPill>
                  {featuredPost.draft ? <DraftPill /> : null}
                </div>
              </div>

              <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                <span
                  className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold"
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--primary)",
                  }}
                >
                  <FiBookOpen aria-hidden="true" />
                  Featured latest
                </span>

                <BlogMeta post={featuredPost} className="mb-4" />

                <h3
                  className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl"
                  style={{ color: "var(--text-heading)" }}
                >
                  {featuredPost.title}
                </h3>

                <p
                  className="mt-5 text-sm leading-7 sm:text-base"
                  style={{ color: "var(--text-muted)" }}
                >
                  {featuredPost.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {featuredPost.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border px-3 py-1 text-xs font-medium"
                      style={{
                        borderColor: "var(--border)",
                        color: "var(--text-body)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-8">
                  <span className="btn-primary">
                    Read featured post
                    <FiArrowUpRight aria-hidden="true" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.article>
        ) : (
          <div className="mt-12 rounded-lg border p-10 text-center" style={{ borderColor: "var(--border)" }}>
            <p className="font-semibold" style={{ color: "var(--text-heading)" }}>
              {posts.length ? "No articles found" : "Articles are on the way"}
            </p>
            <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
              {posts.length
                ? "Try a different search term or category."
                : "New write-ups on React, Next.js, and React Native are being prepared. Check back soon."}
            </p>
          </div>
        )}

        {visiblePosts.length ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {visiblePosts.map((post, index) => (
              <BlogCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        ) : null}

        {hasMore ? (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => setVisibleCount((count) => count + LOAD_MORE_COUNT)}
              className="btn-secondary"
            >
              Load more articles
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
