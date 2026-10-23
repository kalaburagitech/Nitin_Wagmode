import { generateMetadata, getBreadcrumbSchema } from "@/lib/seo-utils";
import { profile } from "@/data/profile";
import Services from "@/mainPages/portfolioPages/Services";

export const metadata = generateMetadata({
  title: "Services",
  description: `What ${profile.fullName} builds: React and Next.js web applications, React Native mobile apps, state/auth/API integration, and frontend performance work.`,
  path: "/services",
  keywords: ["Frontend Development Services", "React Native App Development", "Next.js Development"],
  type: "website",
});

const breadcrumbSchema = getBreadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
]);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Services />
    </>
  );
}
