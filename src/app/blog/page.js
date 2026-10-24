import BlogIndex from "@/components/blog/BlogIndex";
import PageHeader from "@/components/ui/PageHeader";
import JsonLd from "@/components/ui/JsonLd";
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
  description: `Frontend guides by ${profile.fullName} on UI/UX, website performance, responsive design, React, Next.js, TypeScript, the MERN stack, and API testing.`,
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
      "Practical guides on UI/UX, website performance, responsive design, React, TypeScript, and full-stack development.",
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
      <JsonLd data={[breadcrumbSchema, blogSchema]} />
      <PageHeader
        crumbs={[{ label: "Blog" }]}
        eyebrow="Writing"
        title="Frontend guides and notes"
        intro="Practical guides on UI/UX, website performance, responsive design, React, TypeScript, and full-stack development."
      />
      <section className="shell py-16">
        <BlogIndex posts={postSummaries} categories={categories} />
      </section>
    </>
  );
}
