import Image from "next/image";
import Link from "next/link";
import {
  FiArrowLeft,
  FiArrowRight,
  FiBookOpen,
  FiCalendar,
  FiClock,
  FiTag,
  FiUser,
} from "react-icons/fi";

function renderInline(text) {
  const nodes = [];
  const pattern = /(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+]\([^)]+\))/g;
  let lastIndex = 0;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];

    if (token.startsWith("`")) {
      nodes.push(
        <code key={`${token}-${match.index}`}>
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith("**")) {
      nodes.push(
        <strong key={`${token}-${match.index}`}>
          {token.slice(2, -2)}
        </strong>
      );
    } else {
      const linkMatch = token.match(/^\[([^\]]+)]\(([^)]+)\)$/);
      if (linkMatch) {
        const href = linkMatch[2];
        const isExternal = /^https?:\/\//.test(href);
        nodes.push(
          <a
            key={`${token}-${match.index}`}
            href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
          >
            {linkMatch[1]}
          </a>
        );
      }
    }

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

function ArticleMeta({ post }) {
  return (
    <div
      className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm"
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
      <span className="inline-flex items-center gap-1.5">
        <FiUser className="h-4 w-4" aria-hidden="true" />
        {post.author}
      </span>
    </div>
  );
}

function MarkdownBlocks({ blocks }) {
  return blocks.map((block, index) => {
    if (block.type === "heading") {
      const HeadingTag = `h${block.level}`;

      return (
        <HeadingTag
          key={`${block.type}-${index}`}
          id={block.id}
          className="blog-heading"
        >
          {renderInline(block.text)}
        </HeadingTag>
      );
    }

    if (block.type === "paragraph") {
      return <p key={`${block.type}-${index}`}>{renderInline(block.text)}</p>;
    }

    if (block.type === "list") {
      const ListTag = block.ordered ? "ol" : "ul";

      return (
        <ListTag key={`${block.type}-${index}`}>
          {block.items.map((item, itemIndex) => (
            <li key={`${item}-${itemIndex}`}>{renderInline(item)}</li>
          ))}
        </ListTag>
      );
    }

    if (block.type === "quote") {
      return (
        <blockquote key={`${block.type}-${index}`}>
          <p>{renderInline(block.text)}</p>
        </blockquote>
      );
    }

    if (block.type === "image") {
      return (
        <figure key={`${block.type}-${index}`}>
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg border" style={{ borderColor: "var(--border)" }}>
            <Image
              src={block.src}
              alt={block.alt}
              fill
              unoptimized
              sizes="(max-width: 1024px) 100vw, 820px"
              className="object-cover"
            />
          </div>
          {block.caption ? <figcaption>{block.caption}</figcaption> : null}
        </figure>
      );
    }

    if (block.type === "code") {
      return (
        <div className="blog-code-block" key={`${block.type}-${index}`}>
          <div className="blog-code-header">
            <span>{block.language}</span>
          </div>
          <pre>
            <code>{block.code}</code>
          </pre>
        </div>
      );
    }

    return null;
  });
}

function RelatedCard({ post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid gap-4 rounded-lg border p-4 transition-all duration-300 hover:-translate-y-1 sm:grid-cols-[120px_1fr]"
      style={{
        background: "var(--bg-card)",
        borderColor: "var(--border)",
      }}
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-md sm:aspect-square">
        <Image
          src={post.image}
          alt={post.imageAlt || post.title}
          fill
          unoptimized
          sizes="(max-width: 640px) 100vw, 160px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: "var(--primary)" }}>
          {post.category}
        </p>
        <h3 className="mt-2 line-clamp-2 font-bold leading-snug transition-colors group-hover:text-primary" style={{ color: "var(--text-heading)" }}>
          {post.title}
        </h3>
        <p className="mt-2 text-xs" style={{ color: "var(--text-muted)" }}>
          {post.displayDate} - {post.readingTime}
        </p>
      </div>
    </Link>
  );
}

function ArticleNavLink({ post, label, align = "left" }) {
  if (!post) return <div />;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group rounded-lg border p-5 transition-all duration-300 hover:-translate-y-1 ${
        align === "right" ? "text-right" : "text-left"
      }`}
      style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
    >
      <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em]" style={{ color: "var(--primary)" }}>
        {align === "left" ? <FiArrowLeft aria-hidden="true" /> : null}
        {label}
        {align === "right" ? <FiArrowRight aria-hidden="true" /> : null}
      </span>
      <p className="mt-2 line-clamp-2 font-semibold leading-snug" style={{ color: "var(--text-heading)" }}>
        {post.title}
      </p>
    </Link>
  );
}

export default function BlogArticle({
  post,
  blocks,
  tableOfContents,
  relatedPosts,
  previousPost,
  nextPost,
}) {
  return (
    <>
      <section className="bg-bg px-4 pb-12 pt-28 sm:pt-32 lg:pt-36">
        <div className="container-custom">
          <Link href="/blog" className="btn-secondary mb-8">
            <FiArrowLeft aria-hidden="true" />
            Back to Blog
          </Link>

          <div className="mx-auto max-w-4xl">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white"
              style={{ background: "var(--primary)" }}
            >
              <FiTag className="h-3 w-3" aria-hidden="true" />
              {post.category}
            </span>

            {post.draft ? (
              <p
                role="note"
                className="mt-4 rounded-lg border border-amber-400/60 bg-amber-400/10 px-4 py-3 text-sm text-amber-600 dark:text-amber-400"
              >
                <strong>Draft — pending author review.</strong> This article is
                hidden from the published site until its frontmatter is set to{" "}
                <code>draft: false</code>.
              </p>
            ) : null}

            <h1
              className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl"
              style={{ color: "var(--text-heading)" }}
            >
              {post.title}
            </h1>

            <p
              className="mt-5 text-base leading-8 sm:text-lg"
              style={{ color: "var(--text-muted)" }}
            >
              {post.description}
            </p>

            <div className="mt-6">
              <ArticleMeta post={post} />
            </div>
          </div>

          <div className="relative mx-auto mt-10 aspect-[16/9] max-w-6xl overflow-hidden rounded-lg border" style={{ borderColor: "var(--border)" }}>
            <Image
              src={post.image}
              alt={post.imageAlt || post.title}
              fill
              unoptimized
              priority
              sizes="(max-width: 1280px) 100vw, 1180px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-bg pb-16 sm:pb-20 lg:pb-24">
        <div className="container-custom grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-lg border p-5" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}>
              <div className="flex items-center gap-2 font-bold" style={{ color: "var(--text-heading)" }}>
                <FiBookOpen aria-hidden="true" />
                Table of contents
              </div>

              {tableOfContents.length ? (
                <nav className="mt-4 space-y-2" aria-label="Table of contents">
                  {tableOfContents.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block rounded-md px-3 py-2 text-sm transition hover:bg-primary/10 hover:text-primary ${
                        item.level === 3 ? "pl-6" : ""
                      }`}
                      style={{ color: "var(--text-muted)" }}
                    >
                      {item.text}
                    </a>
                  ))}
                </nav>
              ) : (
                <p className="mt-4 text-sm" style={{ color: "var(--text-muted)" }}>
                  This article is short enough to read straight through.
                </p>
              )}
            </div>
          </aside>

          <article className="blog-prose min-w-0">
            <MarkdownBlocks blocks={blocks} />
          </article>
        </div>
      </section>

      <section className="bg-bg pb-20 lg:pb-28">
        <div className="container-custom">
          <div className="grid gap-4 md:grid-cols-2">
            <ArticleNavLink post={previousPost} label="Previous article" />
            <ArticleNavLink post={nextPost} label="Next article" align="right" />
          </div>

          {relatedPosts.length ? (
            <div className="mt-14">
              <div className="mb-6">
                <span className="section-label">Keep reading</span>
                <h2 className="text-2xl font-bold sm:text-3xl" style={{ color: "var(--text-heading)" }}>
                  Related Posts
                </h2>
              </div>
              <div className="grid gap-5 lg:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <RelatedCard key={relatedPost.slug} post={relatedPost} />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
