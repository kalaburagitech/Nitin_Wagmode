import { Sora, Russo_One } from "next/font/google";
import "./globals.css";
import Header from "@/global/Header";
import Footer from "@/global/Footer";
import ThemeProvider from "@/components/ThemeProvider";
import { Providers } from "@/components/ReduxProvider";
import CustomCursor from "@/components/CustomCursor";
import RouteTransition from "@/components/RouteTransition";
import Script from "next/script";
import { getPersonSchema, getWebsiteSchema, DEFAULT_OG_IMAGE } from "@/lib/seo-utils";
import { profile, SITE_URL } from "@/data/profile";
import { fallbackSettings } from "@/lib/publicContent";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const GOOGLE_SITE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

const russoOne = Russo_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-russo",
  display: "swap",
});

const SITE_TITLE = `${profile.fullName} | ${profile.role} — React.js, Next.js, React Native`;
const SITE_DESCRIPTION = `Portfolio of ${profile.fullName}, a ${profile.role} in ${profile.city} with ${profile.experienceYears}+ years of experience building web and mobile applications with React.js, Next.js, React Native, TypeScript, and Redux Toolkit.`;

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#05060d" },
  ],
};

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${profile.fullName}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    profile.fullName,
    "Frontend Developer",
    "React.js Developer",
    "Next.js Developer",
    "React Native Developer",
    "TypeScript Developer",
    "Redux Toolkit",
    "Frontend Developer Bengaluru",
    "Frontend Developer Portfolio",
  ],
  authors: [{ name: profile.fullName, url: SITE_URL }],
  creator: profile.fullName,
  publisher: profile.fullName,
  applicationName: `${profile.fullName} Portfolio`,
  referrer: "origin-when-cross-origin",
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: `${profile.fullName} — Portfolio`,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${profile.fullName} — ${profile.role}`,
        type: "image/png",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  category: "technology",
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  ...(GOOGLE_SITE_VERIFICATION
    ? { verification: { google: GOOGLE_SITE_VERIFICATION } }
    : {}),
};

// Applied before first paint so a saved light/dark choice and accent color
// don't flash. Mirrors ThemeProvider's defaults.
const themeBootstrap = `
(function () {
  var root = document.documentElement;
  var theme = null, color = null;
  try {
    theme = localStorage.getItem('theme');
    color = localStorage.getItem('primary-color');
  } catch (e) {}
  var dark = theme ? theme === 'dark' : ${fallbackSettings.defaultTheme !== "light"};
  root.classList.toggle('dark', dark);
  root.setAttribute('data-primary', color || '${fallbackSettings.defaultPrimaryColor}');
})();
`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`dark ${sora.variable} ${russoOne.variable}`}
      data-primary={fallbackSettings.defaultPrimaryColor}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([getPersonSchema(), getWebsiteSchema()]),
          }}
        />
      </head>
      <body className="font-sora overflow-x-hidden bg-white dark:bg-gray-900 transition-colors duration-300">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>

        {/* Google Analytics — only when NEXT_PUBLIC_GA_ID is configured */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}

        <Providers>
          <ThemeProvider>
            <RouteTransition />
            <Header />
            <main id="main-content">{children}</main>
            <Footer />
            <CustomCursor />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
