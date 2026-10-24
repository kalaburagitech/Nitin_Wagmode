import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { profile } from "@/data/profile";
import PostList from "./PostList";

// Inline Markdown: `code`, **bold**, and [links](url).
function renderInline(text) {
  const nodes = [];
  const pattern = /(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+]\([^)]+\))/g;
  let lastIndex = 0;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    const token = match[0];
    const key = `${match.index}-${token}`;

    if (token.startsWith("`")) {
      nodes.push(<code key={key}>{token.slice(1, -1)}</code>);
    } else if (token.startsWith("**")) {
      nodes.push(<strong key={key}>{token.slice(2, -2)}</strong>);
    } else {
      const [, label, href] = token.match(/^\[([^\]]+)]\(([^)]+)\)$/) || [];
      if (href) {
        const external = /^https?:\/\//.test(href);
        nodes.push(
          <a key={key} href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
            {label}
          </a>
        );
      }
    }
    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

function MarkdownBlocks({ blocks }) {
  return blocks.map((block, index) => {
    const key = `${block.type}-${index}`;
    switch (block.type) {
      case "heading": {
        const Heading = `h${block.level}`;
        return (
          <Heading key={key} id={block.id}>
            {renderInline(block.text)}
          </Heading>
        );
      }
      case "paragraph":
        return <p key={key}>{renderInline(block.text)}</p>;
      case "list": {
        const List = block.ordered ? "ol" : "ul";
        return (
          <List key={key}>
            {block.items.map((item, i) => (
              <li key={`${i}-${item}`}>{renderInline(item)}</li>
            ))}
          </List>
        );
      }
      case "quote":
        return (
          <blockquote key={key}>
            <p>{renderInline(block.text)}</p>
          </blockquote>
        );
      case "image":
        return (
          <figure key={key}>
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl border hairline">
              <Image src={block.src} alt={block.alt} fill unoptimized sizes="(max-width: 1024px) 100vw, 720px" className="object-cover" />
            </div>
            {block.caption && <figcaption>{block.caption}</figcaption>}
          </figure>
        );
      case "code":
        return (
          <div key={key} className="overflow-hidden rounded-xl border hairline bg-sunken">
            {block.language && (
              <div className="border-b hairline px-5 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                {block.language}
              </div>
            )}
            <pre>
              <code>{block.code}</code>
            </pre>
          </div>
        );
      default:
        return null;
    }
  });
}

function NavLink({ post, direction }) {
  if (!post) return <div />;
  const next = direction === "next";
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`panel group flex flex-col gap-2 p-5 transition-colors hover:border-accent/50 ${next ? "text-right" : ""}`}
    >
      <span className={`inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted ${next ? "justify-end" : ""}`}>
        {!next && <FiArrowLeft aria-hidden="true" />}
        {next ? "Next" : "Previous"}
        {next && <FiArrowRight aria-hidden="true" />}
      </span>
      <span className="font-medium text-ink group-hover:text-accent">{post.title}</span>
    </Link>
  );
}

export default function BlogArticle({ post, blocks, tableOfContents, relatedPosts, previousPost, nextPost }) {
  return (
    <article>
      <header className="relative overflow-hidden border-b hairline pb-12 pt-[calc(var(--header-h)+3rem)]">
        <div className="grid-backdrop pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="shell relative max-w-4xl">
          <Link href="/blog" className="inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-accent">
            <FiArrowLeft aria-hidden="true" /> All articles
          </Link>
          <p className="mt-8 flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-muted">
            <span className="text-accent">{post.category}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.date}>{post.displayDate}</time>
            <span aria-hidden="true">·</span>
            {post.readingTime}
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">{post.title}</h1>
          <p className="mt-5 text-lg leading-8 text-muted">{post.description}</p>
          <p className="mt-6 text-sm text-muted">
            By <span className="text-ink">{post.author || profile.fullName}</span>
          </p>
          {post.draft && (
            <p role="note" className="mt-6 rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-ink">
              Draft preview — hidden from production until the post&apos;s frontmatter is set to <code className="font-mono">draft: false</code>.
            </p>
          )}
        </div>
      </header>

      <div className="shell grid max-w-6xl gap-12 py-14 lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="min-w-0">
          {post.image && (
            <div className="relative mb-12 aspect-[16/9] overflow-hidden rounded-2xl border hairline">
              <Image src={post.image} alt={post.imageAlt || ""} fill priority unoptimized sizes="(max-width: 1024px) 100vw, 760px" className="object-cover" />
            </div>
          )}
          <div className="prose-article">
            <MarkdownBlocks blocks={blocks} />
          </div>

          {post.tags?.length > 0 && (
            <ul className="mt-12 flex flex-wrap gap-2 border-t hairline pt-8" aria-label="Tags">
              {post.tags.map((tag) => (
                <li key={tag} className="chip">
                  #{tag}
                </li>
              ))}
            </ul>
          )}

          <nav aria-label="More articles" className="mt-10 grid gap-4 sm:grid-cols-2">
            <NavLink post={previousPost} direction="previous" />
            <NavLink post={nextPost} direction="next" />
          </nav>
        </div>

        {tableOfContents.length > 0 && (
          <aside className="hidden lg:block">
            <nav aria-label="Table of contents" className="sticky top-28">
              <p className="eyebrow">On this page</p>
              <ol className="mt-4 space-y-2.5 border-l hairline text-sm">
                {tableOfContents.map((item) => (
                  <li key={item.id} className={item.level === 3 ? "pl-7" : "pl-4"}>
                    <a href={`#${item.id}`} className="text-muted hover:text-accent">
                      {item.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>
        )}
      </div>

      {relatedPosts.length > 0 && (
        <section aria-labelledby="related-title" className="shell max-w-6xl">
          <h2 id="related-title" className="eyebrow mb-4 font-mono">
            Keep reading
          </h2>
          <PostList posts={relatedPosts} />
        </section>
      )}
    </article>
  );
}
