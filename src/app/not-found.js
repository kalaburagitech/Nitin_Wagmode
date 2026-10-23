// not-found.js - Custom 404 page with SEO
import Link from "next/link";
import { profile } from "@/data/profile";

export const metadata = {
  title: "404 - Page Not Found",
  description: `The page you are looking for does not exist or has been moved. Return to the homepage of ${profile.fullName}, ${profile.role}.`,
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-9xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            404
          </h1>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-primary to-primary/80 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5"
          >
            ← Back to Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3 border-2 border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-white transition-all duration-300 hover:-translate-y-0.5"
          >
            Contact Me
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-lg mx-auto">
          <Link
            href="/about"
            className="p-3 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
          >
            About
          </Link>
          <Link
            href="/projects"
            className="p-3 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
          >
            Projects
          </Link>
          <Link
            href="/skills"
            className="p-3 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
          >
            Skills
          </Link>
          <Link
            href="/resume"
            className="p-3 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
          >
            Resume
          </Link>
        </div>
      </div>
    </div>
  );
}