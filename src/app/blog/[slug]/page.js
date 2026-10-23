import BlogArticle from "@/components/blog/BlogArticle";
import {
  BLOG_BASE_URL,
  getAllBlogPostSummaries,
  getBlogPostBySlug,
  getPreviousAndNextBlogPosts,
  getRelatedBlogPosts,
  getTableOfContents,
  parseMarkdownBlocks,
  toAbsoluteBlogUrl,
} from "@/lib/blogs";
import {
  generateMetadata as buildMetadata,
  getArticleSchema,
  getBreadcrumbSchema,
} from "@/lib/seo-utils";
import { notFound } from "next/navigation";
import { profile } from "@/data/profile";

// Only posts known at build time exist; unknown slugs 404. This keeps
// SHOW_DRAFT_POSTS a build-time switch, consistent with the /blog index.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllBlogPostSummaries().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    return buildMetadata({
      title: "Blog post not found",
      description: "The requested blog post could not be found.",
      path: `/blog/${params.slug}`,
      noIndex: true,
    });
  }

  const metadata = buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    keywords: post.keywords?.length
      ? post.keywords
      : [post.category, ...post.tags, `${profile.fullName} Blog`],
    ogImage: post.image,
    ogImageAlt: post.imageAlt,
    type: "article",
    noIndex: post.draft,
  });

  const canonicalUrl = post.canonical || `${BLOG_BASE_URL}/blog/${post.slug}`;
  const datePublished = new Date(`${post.date}T00:00:00`).toISOString();
  const dateModified = new Date(`${post.dateModified || post.date}T00:00:00`).toISOString();

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      url: canonicalUrl,
      publishedTime: datePublished,
      modifiedTime: dateModified,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      ...metadata.twitter,
      title: `${post.title} | ${profile.fullName}`,
      description: post.description,
      images: metadata.twitter.images,
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default function BlogPostPage({ params }) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const blocks = parseMarkdownBlocks(post.content);
  const tableOfContents = getTableOfContents(post.content);
  const relatedPosts = getRelatedBlogPosts(post);
  const { previous, next } = getPreviousAndNextBlogPosts(post.slug);

  const articleSchema = getArticleSchema({
    title: post.title,
    description: post.description,
    image: toAbsoluteBlogUrl(post.image),
    datePublished: new Date(`${post.date}T00:00:00`).toISOString(),
    dateModified: new Date(`${post.dateModified || post.date}T00:00:00`).toISOString(),
    url: post.canonical || `${BLOG_BASE_URL}/blog/${post.slug}`,
    wordCount: post.wordCount,
    category: post.category,
    keywords: post.keywords,
    author: post.author,
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([articleSchema, breadcrumbSchema]),
        }}
      />
      <BlogArticle
        post={post}
        blocks={blocks}
        tableOfContents={tableOfContents}
        relatedPosts={relatedPosts}
        previousPost={previous}
        nextPost={next}
      />
    </>
  );
}
