import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

// Compact list of article links (home page, related posts).
export default function PostList({ posts, headingLevel = "h3" }) {
  const Heading = headingLevel;
  return (
    <ul className="border-t hairline">
      {posts.map((post) => (
        <li key={post.slug} className="border-b hairline">
          <Link
            href={`/blog/${post.slug}`}
            className="group grid gap-2 py-6 sm:grid-cols-[9rem_1fr_auto] sm:items-baseline sm:gap-8"
          >
            <span className="font-mono text-xs text-muted">{post.displayDate}</span>
            <span>
              <Heading className="text-lg font-semibold transition-colors group-hover:text-accent">
                {post.title}
                {post.draft && <span className="chip ml-2 align-middle">Draft</span>}
              </Heading>
              <span className="mt-1 block text-sm text-muted">{post.description}</span>
            </span>
            <span className="hidden items-center gap-1 text-xs text-muted sm:inline-flex">
              {post.readingTime}
              <FiArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
