// Generates /sitemap.xml for all public pages and blog posts.
import { getAllBlogPostSummaries } from "@/lib/blogs";
import { SITE_URL } from "@/data/profile";

const pages = [
  { path: "", changeFrequency: "weekly", priority: 1.0 },
  { path: "/about", changeFrequency: "monthly", priority: 0.9 },
  { path: "/projects", changeFrequency: "monthly", priority: 0.9 },
  { path: "/experience", changeFrequency: "monthly", priority: 0.8 },
  { path: "/resume", changeFrequency: "monthly", priority: 0.9 },
  { path: "/skills", changeFrequency: "monthly", priority: 0.7 },
  { path: "/services", changeFrequency: "monthly", priority: 0.6 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.8 },
];

export default function sitemap() {
  const lastModified = new Date().toISOString();

  const blogRoutes = getAllBlogPostSummaries().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(`${post.dateModified || post.date}T00:00:00`).toISOString(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    ...pages.map((page) => ({
      url: `${SITE_URL}${page.path}`,
      lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...blogRoutes,
  ];
}
