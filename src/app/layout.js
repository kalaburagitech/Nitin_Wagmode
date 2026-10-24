import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "@/components/ReduxProvider";
import ThemeProvider from "@/components/theme/ThemeProvider";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import CursorRing from "@/components/motion/CursorRing";
import RouteProgress from "@/components/motion/RouteProgress";
import { getPersonSchema, getWebsiteSchema, DEFAULT_OG_IMAGE } from "@/lib/seo-utils";
import { accentStyles, themeBootstrap } from "@/lib/theme";
import { profile, SITE_URL } from "@/data/profile";
import { DEFAULT_ACCENT, DEFAULT_THEME } from "@/data/site";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const GOOGLE_SITE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const SITE_TITLE = `${profile.fullName} | ${profile.role} — React.js, Next.js, React Native`;
const SITE_DESCRIPTION = `Portfolio of ${profile.fullName}, a ${profile.role} in ${profile.city} with ${profile.experienceYears}+ years of experience building web and mobile applications with React.js, Next.js, React Native, TypeScript, and Redux Toolkit.`;

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f5f1" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0d14" },
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

export default function RootLayout({ children }) {
  return (
    <html
      lang="en-IN"
      className={`${DEFAULT_THEME === "dark" ? "dark " : ""}${display.variable} ${body.variable} ${mono.variable}`}
      data-accent={DEFAULT_ACCENT}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
        <style dangerouslySetInnerHTML={{ __html: accentStyles }} />
        {/* Without JavaScript, scroll-reveal content would stay hidden. */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([getPersonSchema(), getWebsiteSchema()]),
          }}
        />
      </head>
      <body className="overflow-x-hidden">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent"
        >
          Skip to content
        </a>

        {/* Google Analytics — only when NEXT_PUBLIC_GA_ID is configured */}
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config',${JSON.stringify(GA_ID)});`}
            </Script>
          </>
        )}

        <Providers>
          <ThemeProvider>
            <RouteProgress />
            <SiteHeader />
            <main id="main-content" tabIndex={-1} className="outline-none">
              {children}
            </main>
            <SiteFooter />
            <CursorRing />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
