import { generateMetadata, getBreadcrumbSchema } from "@/lib/seo-utils";
import { profile } from "@/data/profile";
import Resume from "@/mainPages/portfolioPages/Resume";

export const metadata = generateMetadata({
  title: "Resume",
  description: `Resume of ${profile.fullName}, ${profile.role}: experience, education (BCA, Gulbarga University), key results, and a downloadable PDF.`,
  path: "/resume",
  keywords: ["Frontend Developer Resume", "React Developer CV", "Nitin Wagmode Resume"],
  type: "profile",
});

const breadcrumbSchema = getBreadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Resume", path: "/resume" },
]);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Resume />
    </>
  );
}
