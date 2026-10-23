import fs from "fs";
import path from "path";
import { profile, SITE_URL } from "@/data/profile";

export const BLOG_BASE_URL = SITE_URL;

// Posts with `draft: true` in frontmatter are visible in development, or in
// production only when SHOW_DRAFT_POSTS=true. Drafts are never indexed.
const SHOW_DRAFTS =
  process.env.SHOW_DRAFT_POSTS === "true" || process.env.NODE_ENV !== "production";

const BLOG_DIR = path.join(process.cwd(), "content", "blogs");
const FRONTMATTER_REGEX = /^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?/;

function stripQuotes(value) {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function parseFrontmatterValue(value) {
  const trimmed = value.trim();

  if (trimmed === "true") return true;
  if (trimmed === "false") return false;

  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    const inner = trimmed.slice(1, -1).trim();
    if (!inner) return [];

    return inner
      .split(",")
      .map((item) => stripQuotes(item.trim()))
      .filter(Boolean);
  }

  return stripQuotes(trimmed);
}

function parseFrontmatter(source) {
  const match = source.match(FRONTMATTER_REGEX);

  if (!match) {
    return {
      data: {},
      content: source.trim(),
    };
  }

  const data = match[1].split(/\r?\n/).reduce((acc, line) => {
    if (!line.trim() || line.trim().startsWith("#")) return acc;

    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) return acc;

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();
    acc[key] = parseFrontmatterValue(value);
    return acc;
  }, {});

  return {
    data,
    content: source.slice(match[0].length).trim(),
  };
}

function stripMarkdown(value) {
  return value
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[`*_#>]/g, "")
    .trim();
}

function slugify(value) {
  const slug = stripMarkdown(value)
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  return slug || "section";
}

function createHeadingSlugger() {
  const seen = new Map();

  return (value) => {
    const base = slugify(value);
    const count = seen.get(base) || 0;
    seen.set(base, count + 1);
    return count ? `${base}-${count}` : base;
  };
}

function estimateReadingTime(content) {
  const words = content.split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

function formatDate(date) {
  if (!date) return "";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

function uniqueItems(items) {
  return [...new Set(items.filter(Boolean))];
}

function getBlogPostFromFile(fileName) {
  const filePath = path.join(BLOG_DIR, fileName);
  const fileSlug = fileName.replace(/\.mdx?$/, "");
  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = parseFrontmatter(source);
  const slug = data.slug || fileSlug;
  const category = data.category || "Engineering";
  const tags = Array.isArray(data.tags) ? data.tags : [];
  const keywords =
    Array.isArray(data.keywords) && data.keywords.length
      ? data.keywords
      : [category, ...tags, `${profile.fullName} Blog`];
  const wordCount = content.split(/\s+/).filter(Boolean).length;

  return {
    slug,
    title: data.title || slug,
    description: data.description || "",
    date: data.date || "",
    dateModified: data.dateModified || data.updated || data.date || "",
    displayDate: formatDate(data.date),
    category,
    tags,
    keywords: uniqueItems(keywords),
    author: data.author || profile.fullName,
    readingTime: data.readingTime || estimateReadingTime(content),
    image: data.image || "/assets/blog/default.svg",
    imageAlt: data.imageAlt || data.imageAltText || data.title || slug,
    canonical: `${BLOG_BASE_URL}/blog/${slug}`,
    featured: Boolean(data.featured),
    draft: Boolean(data.draft),
    content,
    wordCount,
  };
}

export function getAllBlogPosts() {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((fileName) => /\.mdx?$/.test(fileName))
    .map(getBlogPostFromFile)
    .filter((post) => SHOW_DRAFTS || !post.draft)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getBlogPostBySlug(slug) {
  return getAllBlogPosts().find((post) => post.slug === slug) || null;
}

export function getFeaturedBlogPost() {
  const posts = getAllBlogPosts();
  return posts.find((post) => post.featured) || posts[0] || null;
}

export function getBlogCategories(posts = getAllBlogPosts()) {
  const counts = posts.reduce((acc, post) => {
    acc[post.category] = (acc[post.category] || 0) + 1;
    return acc;
  }, {});

  return [
    { name: "All", count: posts.length },
    ...Object.entries(counts)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([name, count]) => ({ name, count })),
  ];
}

export function getBlogPostSummaries(posts = getAllBlogPosts()) {
  return posts.map(({ content, wordCount, ...post }) => post);
}

export function getAllBlogPostSummaries() {
  return getBlogPostSummaries(getAllBlogPosts());
}

export function getTableOfContents(content) {
  const slugHeading = createHeadingSlugger();
  let insideCodeBlock = false;

  return content
    .split(/\r?\n/)
    .reduce((items, line) => {
      if (line.trim().startsWith("```")) {
        insideCodeBlock = !insideCodeBlock;
        return items;
      }

      if (insideCodeBlock) return items;

      const match = line.match(/^(#{2,3})\s+(.+)$/);
      if (!match) return items;

      const text = stripMarkdown(match[2]);
      items.push({
        id: slugHeading(text),
        level: match[1].length,
        text,
      });

      return items;
    }, []);
}

function isBlockStart(line) {
  return (
    line.trim().startsWith("```") ||
    /^#{2,4}\s+/.test(line) ||
    /^!\[[^\]]*]\([^)]+\)/.test(line.trim()) ||
    /^\s*[-*]\s+/.test(line) ||
    /^\s*\d+\.\s+/.test(line) ||
    /^\s*>\s+/.test(line)
  );
}

function parseImage(line) {
  const match = line
    .trim()
    .match(/^!\[([^\]]*)]\((\S+?)(?:\s+"([^"]+)")?\)$/);

  if (!match) return null;

  return {
    type: "image",
    alt: match[1],
    src: match[2],
    caption: match[3] || "",
  };
}

export function parseMarkdownBlocks(content) {
  const lines = content.split(/\r?\n/);
  const blocks = [];
  const slugHeading = createHeadingSlugger();
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (!line.trim()) {
      index += 1;
      continue;
    }

    const codeFence = line.match(/^```([A-Za-z0-9_-]*)\s*$/);
    if (codeFence) {
      const language = codeFence[1] || "text";
      const codeLines = [];
      index += 1;

      while (index < lines.length && !lines[index].trim().startsWith("```")) {
        codeLines.push(lines[index]);
        index += 1;
      }

      index += 1;
      blocks.push({
        type: "code",
        language,
        code: codeLines.join("\n"),
      });
      continue;
    }

    const heading = line.match(/^(#{2,4})\s+(.+)$/);
    if (heading) {
      const text = heading[2].trim();
      blocks.push({
        type: "heading",
        level: heading[1].length,
        text,
        id: heading[1].length <= 3 ? slugHeading(stripMarkdown(text)) : undefined,
      });
      index += 1;
      continue;
    }

    const image = parseImage(line);
    if (image) {
      blocks.push(image);
      index += 1;
      continue;
    }

    if (/^\s*[-*]\s+/.test(line)) {
      const items = [];
      while (index < lines.length && /^\s*[-*]\s+/.test(lines[index])) {
        items.push(lines[index].replace(/^\s*[-*]\s+/, "").trim());
        index += 1;
      }
      blocks.push({ type: "list", ordered: false, items });
      continue;
    }

    if (/^\s*\d+\.\s+/.test(line)) {
      const items = [];
      while (index < lines.length && /^\s*\d+\.\s+/.test(lines[index])) {
        items.push(lines[index].replace(/^\s*\d+\.\s+/, "").trim());
        index += 1;
      }
      blocks.push({ type: "list", ordered: true, items });
      continue;
    }

    if (/^\s*>\s+/.test(line)) {
      const quoteLines = [];
      while (index < lines.length && /^\s*>\s+/.test(lines[index])) {
        quoteLines.push(lines[index].replace(/^\s*>\s+/, "").trim());
        index += 1;
      }
      blocks.push({ type: "quote", text: quoteLines.join(" ") });
      continue;
    }

    const paragraphLines = [];
    while (
      index < lines.length &&
      lines[index].trim() &&
      !isBlockStart(lines[index])
    ) {
      paragraphLines.push(lines[index].trim());
      index += 1;
    }

    blocks.push({
      type: "paragraph",
      text: paragraphLines.join(" "),
    });
  }

  return blocks;
}

export function getRelatedBlogPosts(currentPost, limit = 3) {
  const posts = getAllBlogPosts().filter((post) => post.slug !== currentPost.slug);
  const currentTags = new Set(currentPost.tags || []);

  return posts
    .map((post) => {
      const tagScore = (post.tags || []).filter((tag) => currentTags.has(tag)).length;
      const categoryScore = post.category === currentPost.category ? 2 : 0;

      return {
        post,
        score: tagScore + categoryScore,
      };
    })
    .sort((a, b) => b.score - a.score || new Date(b.post.date) - new Date(a.post.date))
    .slice(0, limit)
    .map(({ post }) => {
      const { content, wordCount, ...summary } = post;
      return summary;
    });
}

export function getPreviousAndNextBlogPosts(slug) {
  const posts = getAllBlogPosts();
  const index = posts.findIndex((post) => post.slug === slug);

  if (index === -1) {
    return {
      previous: null,
      next: null,
    };
  }

  const serialize = (post) => {
    if (!post) return null;
    const { content, wordCount, ...summary } = post;
    return summary;
  };

  return {
    previous: serialize(posts[index + 1]),
    next: serialize(posts[index - 1]),
  };
}

export function toAbsoluteBlogUrl(value) {
  if (!value) return BLOG_BASE_URL;
  if (/^https?:\/\//.test(value)) return value;
  return `${BLOG_BASE_URL}${value.startsWith("/") ? value : `/${value}`}`;
}
