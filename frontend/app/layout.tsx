import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Links from "./components/Links";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { Space_Grotesk } from "next/font/google";
import { headers } from "next/headers";

// ─── Font ────────────────────────────────────────────────────────────────────
// Dropped weight "300" — saves one network round-trip on every load.
// Keeps 400/500/600/700 which are actually used in UI.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

// ─── Constants ───────────────────────────────────────────────────────────
// Set NEXT_PUBLIC_SITE_URL in .env.local and Vercel environment
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "";
const GA_ID = String(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || "");

// ─── Viewport ────────────────────────────────────────────────────────────────
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

// ─── Metadata ────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  applicationName: "Rishabh Jain Portfolio",

  title: {
    default: "Rishabh Jain — Full Stack Developer",
    template: "%s | Rishabh Jain",
  },

  // FIX: Previous description was too generic — Google ignored it and pulled
  // random page content instead (as seen in the search snippet screenshot).
  // A specific, action-oriented description forces Google to use it.
  description:
    "Rishabh Jain is a Mumbai-based Full Stack Developer specialising in React, Next.js, Node.js and MongoDB. Building scalable web apps, SaaS products, and AI-integrated solutions. Open for freelance & internship opportunities.",

  keywords: [
    "Rishabh Jain TSEC",
    "Rishabh Jain Full Stack Developer",
    "MERN Stack Developer Mumbai",
    "Next.js Developer India",
    "React Developer",
    "Full Stack Developer India",
    "Freelance Web Developer",
    "Node.js MongoDB Expert",
    "TypeScript React Developer",
  ],

  authors: [{ name: "Rishabh Jain", url: BASE_URL }],
  creator: "Rishabh Jain",
  publisher: "Rishabh Jain",
  category: "technology",

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
      noimageindex: false,
    },
  },

  openGraph: {
    title: "Rishabh Jain — Full Stack Developer",
    description:
      "Mumbai-based Full Stack Developer building scalable web apps with React, Next.js, Node.js & MongoDB. Open for freelance & internship opportunities.",
    url: BASE_URL,
    siteName: "Rishabh Jain",
    images: [
      {
        url: "/LogoLight.png",
        width: 1200,
        height: 630,
        alt: "Rishabh Jain — Full Stack Developer specialising in React & Next.js",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Rishabh Jain — Full Stack Developer",
    description:
      "Mumbai-based Full Stack Developer building scalable web apps with React, Next.js, Node.js & MongoDB.",
    creator: "@rishabhjain610",
    images: ["/LogoLight.png"],
  },

  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Rishabh Jain",
  },
  formatDetection: { telephone: false },
  manifest: "/site.webmanifest",

  // FIX: Canonical must match BASE_URL exactly (no trailing slash).
  alternates: {
    canonical: BASE_URL,
  },

  verification: {
    google: "ePQ4UK9TXEBxEOSROIEgx7FOv86l425KO6qU8J6kGE4",
  },
  // verification: {
  //   google: "TtCVRJScD-UOsCl5zgJf3NL2maM07UtsS2-WAKXzDao",
  // },

  icons: {
    icon: [
      {
        url: "/icon1.png",
        media: "(prefers-color-scheme: light)",
        sizes: "any",
      },
      {
        url: "/favicon.ico",
        media: "(prefers-color-scheme: dark)",
        sizes: "any",
      },
      {
        url: "/favicon-light.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon-dark.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: dark)",
      },
      { url: "/icon1.png", type: "image/png", sizes: "96x96" },
    ],

    referrer: "strict-origin-when-cross-origin",
    apple: "/apple-icon.png",
    other: [{ rel: "mask-icon", url: "/favicon-dark.svg", color: "#4A90E2" }],
  },
};

// ─── Structured Data ─────────────────────────────────────────────────────────
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${BASE_URL}/#person`,
  name: "Rishabh Jain",
  url: BASE_URL,
  jobTitle: "Full Stack Developer",
  description:
    "Full Stack Developer specialising in React, Next.js, Node.js and MongoDB. Building scalable web apps and AI-integrated solutions from Mumbai, India.",
  image: `${BASE_URL}/LogoLight.png`,
  knowsAbout: [
    "React",
    "Next.js",
    "Node.js",
    "MongoDB",
    "TypeScript",
    "AI Agents",
    "Full Stack Development",
    "SaaS Development",
    "AI Integration",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Freelance",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  sameAs: [
    "https://github.com/Rishabhjain610",
    "https://www.linkedin.com/in/rishabhjain610/",
    "https://twitter.com/rishabhjain610",
    "https://instagram.com/rishabh_jain610",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Business",
    email: "rishabhjainwork1@gmail.com",
    availableLanguage: ["en"],
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  name: "Rishabh Jain Portfolio",
  url: BASE_URL,
  author: { "@type": "Person", "@id": `${BASE_URL}/#person` },
  description:
    "Portfolio of Rishabh Jain — Full Stack Developer based in Mumbai, India.",
  inLanguage: "en",
  isPartOf: {
    "@id": `${BASE_URL}/#person`,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const breadcrumbListJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: `${BASE_URL}`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "About",
      item: `${BASE_URL}/#about`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Projects",
      item: `${BASE_URL}/#projects`,
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Contact",
      item: `${BASE_URL}/#contact`,
    },
  ],
};

// ─── Layout ──────────────────────────────────────────────────────────────────
export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const hdrs = await headers();
  const host = hdrs.get("host") ?? "";
  const isVercelPreview =
    host.includes("vercel.app") || host.includes("vercel.sh");

  return (
    <html lang="en" suppressHydrationWarning className={spaceGrotesk.variable}>
      <head>
        {/* Performance & SEO Optimization Meta Tags */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Rishabh Jain is a Mumbai-based Full Stack Developer specialising in React, Next.js, Node.js and MongoDB."
        />
        <meta name="color-scheme" content="light dark" />
        <meta name="supported-color-schemes" content="light dark" />

        {/*
          PERF: Critical resource hints - tells browser to establish early
          connections and prefetch critical assets before they're needed.
          Saves ~100-200ms on font loading and analytics initialization.
        */}
        <link rel="preload" href="/LogoDark.png" as="image" type="image/png" />
        <link
          rel="preload"
          href="/LogoLight.png"
          as="image"
          type="image/png"
          media="(prefers-co- Multiple schemas for rich snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbListJsonLd),
         
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* LCP Optimization - Preload critical images */}
        <link
          rel="prefetch"
          href="/icon1.png"
          as="image"
          type="image/png"
          importance="high"
        />

        {/* Indie-Web / Mastodon rel=me verification */}
        <link rel="me" href="https://github.com/Rishabhjain610" />
        <link rel="me" href="https://www.linkedin.com/in/rishabhjain610/" />
        <link rel="me" href="https://twitter.com/rishabhjain610" />
        <link rel="me" href="https://instagram.com/rishabh_jain610" />
        <link rel="me" href="mailto:rishabhjainwork1@gmail.com" />

        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />

        {/*
          If the site is being viewed on the Vercel preview domain, instruct
          crawlers to not index and enforce the canonical to the custom domain.
        */}
        {isVercelPreview && (
          <>
            <meta name="robots" content="noindex, nofollow" />
            <link rel="canonical" href={BASE_URL} />
          </>
        )}

        {/* CWV Optimization - Add performance hints for browser */}
        <meta name="theme-color" content="#0a0a0a" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
      </head>

      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Links />
          {/*
            PERF FIX: strategy prop isn't exposed by @next/third-parties but the
            package already defers GA via script[type=module]. If TBT stays high
            after deploy, move GA initialisation to a useEffect in a client
            component so it runs after hydration instead.
          */}
          <GoogleAnalytics gaId={GA_ID} />
          <Navbar />
          <Suspense fallback={null}>{children}</Suspense>
          <Footer />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
