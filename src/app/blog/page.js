import BlogIndex from "@/components/blog/BlogIndex";
import {
  BLOG_BASE_URL,
  getAllBlogPostSummaries,
  getBlogCategories,
  toAbsoluteBlogUrl,
} from "@/lib/blogs";
import { generateMetadata, getBreadcrumbSchema } from "@/lib/seo-utils";
import { profile } from "@/data/profile";

export const metadata = generateMetadata({
  title: "Blog",
  description: `Technical articles by ${profile.fullName} on React, Next.js, React Native, TypeScript, state management, API integration, and frontend performance.`,
  path: "/blog",
  keywords: ["React Blog", "Next.js Blog", "React Native Blog", "Frontend Engineering Blog"],
  type: "website",
});

export default function BlogPage() {
  const postSummaries = getAllBlogPostSummaries();
  const categories = getBlogCategories(postSummaries);
  const publishedPosts = postSummaries.filter((post) => !post.draft);

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
  ]);

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${profile.fullName} Blog`,
    description:
      "Technical articles about React, Next.js, React Native, TypeScript, and frontend engineering.",
    url: `${BLOG_BASE_URL}/blog`,
    author: {
      "@type": "Person",
      name: profile.fullName,
      url: BLOG_BASE_URL,
    },
    blogPost: publishedPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      url: `${BLOG_BASE_URL}/blog/${post.slug}`,
      datePublished: post.date,
      dateModified: post.dateModified || post.date,
      image: toAbsoluteBlogUrl(post.image),
      keywords: post.keywords,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbSchema, blogSchema]),
        }}
      />
      <BlogIndex posts={postSummaries} categories={categories} />
    </>
  );
}
