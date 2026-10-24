"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight, FiSearch, FiX } from "react-icons/fi";
import FilterBar from "@/components/ui/FilterBar";

const PAGE_SIZE = 6;

function matches(post, query) {
  if (!query) return true;
  return [post.title, post.description, post.category, ...(post.tags || [])]
    .join(" ")
    .toLowerCase()
    .includes(query.toLowerCase());
}

function PostCard({ post, featured = false }) {
  return (
    <article
      className={`panel group relative overflow-hidden transition-colors hover:border-accent/50 ${
        featured ? "grid md:grid-cols-[1.1fr_1fr]" : "flex flex-col"
      }`}
    >
      <div className={`relative overflow-hidden bg-sunken ${featured ? "aspect-[16/10] md:aspect-auto" : "aspect-[16/9]"}`}>
        <Image
          src={post.image}
          alt={post.imageAlt || ""}
          fill
          unoptimized
          sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className={`flex flex-1 flex-col ${featured ? "p-7 sm:p-10" : "p-6"}`}>
        <p className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
          <span className="text-accent">{post.category}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={post.date}>{post.displayDate}</time>
          <span aria-hidden="true">·</span>
          {post.readingTime}
          {post.draft && <span className="chip normal-case tracking-normal">Draft</span>}
        </p>
        <h3 className={`mt-3 font-semibold ${featured ? "text-2xl sm:text-3xl" : "text-lg"}`}>
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 group-hover:text-accent">
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 text-sm leading-6 text-muted">{post.description}</p>
        {featured && post.tags?.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tags">
            {post.tags.slice(0, 4).map((tag) => (
              <li key={tag} className="chip">
                {tag}
              </li>
            ))}
          </ul>
        )}
        <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-medium text-ink group-hover:text-accent">
          Read article <FiArrowUpRight aria-hidden="true" />
        </span>
      </div>
    </article>
  );
}

export default function BlogIndex({ posts, categories }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [limit, setLimit] = useState(PAGE_SIZE);

  const filtered = useMemo(
    () => posts.filter((post) => (category === "All" || post.category === category) && matches(post, query.trim())),
    [posts, category, query]
  );

  const [featured, ...rest] = filtered;
  const shown = rest.slice(0, limit);

  const updateQuery = (value) => {
    setQuery(value);
    setLimit(PAGE_SIZE);
  };
  const updateCategory = (value) => {
    setCategory(value);
    setLimit(PAGE_SIZE);
  };

  if (posts.length === 0) {
    return (
      <div className="panel p-10 text-center">
        <h2 className="text-xl font-semibold">Articles are on the way</h2>
        <p className="mt-2 text-muted">New writing on React, Next.js, and React Native will appear here soon.</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-10 space-y-5">
        <label className="relative block max-w-xl">
          <span className="sr-only">Search articles</span>
          <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => updateQuery(event.target.value)}
            placeholder="Search articles, tags, or categories"
            className="field pl-11 pr-11"
          />
          {query && (
            <button
              type="button"
              onClick={() => updateQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-muted hover:text-ink"
            >
              <FiX aria-hidden="true" />
            </button>
          )}
        </label>
        <FilterBar
          label="Filter articles by category"
          options={categories.map((c) => ({ id: c.name, label: c.name, count: c.count }))}
          value={category}
          onChange={updateCategory}
        />
        <p className="font-mono text-xs text-muted" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? "article" : "articles"}
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="panel p-10 text-center">
          <h2 className="text-xl font-semibold">No articles found</h2>
          <p className="mt-2 text-muted">Try a different search term or category.</p>
        </div>
      ) : (
        <>
          <h2 className="sr-only">Articles</h2>
          <PostCard post={featured} featured />
          {shown.length > 0 && (
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {shown.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
          {rest.length > shown.length && (
            <div className="mt-10 text-center">
              <button type="button" onClick={() => setLimit((n) => n + PAGE_SIZE)} className="btn-ghost">
                Load more articles
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}
