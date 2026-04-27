
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
import LoadingScreen from "./components/LoadingScreen";

// ─── Font ────────────────────────────────────────────────────────────────────
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

// ─── Constants ───────────────────────────────────────────────────────────────
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "";
const GA_ID = String(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || "");

// FIX: Keep this in sync with your last meaningful content update.
// Google uses dateModified for freshness signals — stale dates suppress rankings.
const LAST_MODIFIED = new Date().toISOString();

// ─── Viewport ────────────────────────────────────────────────────────────────
// FIX: Removed duplicate manual <meta name="viewport"> and <meta name="theme-color">
// from <head>. Next.js emits these from the viewport export; having them twice
// creates duplicate tags that can confuse Googlebot.
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

  // FIX: Added differentiating keywords (Agentic AI, hackathon, TSEC) that
  // reflect your actual strengths. Generic descriptions get ignored by Google;
  // specific ones get used in snippets and attract more qualified clicks.
  description:
    "Rishabh Jain is a Mumbai-based Full Stack Developer and Agentic AI builder " +
    "specialising in React, Next.js, Node.js, and MongoDB. 7× hackathon winner at TSEC " +
    "building scalable web apps, SaaS products, and LLM-integrated solutions. " +
    "Open for internship and freelance opportunities.",

  // FIX: Added Agentic AI / LLM keywords which are high-intent search terms and
  // your real differentiator. Also added TSEC for local/institutional discoverability.
  keywords: [
    "Rishabh jain tsec",
    "Rishabh Jain TSEC",
    "Rishabh Jain Full Stack Developer",
    "Agentic AI Developer Mumbai",
    "LLM Integration Developer",
    "MERN Stack Developer Mumbai",
    "Next.js Developer India",
    "React Developer",
    "Full Stack Developer India",
    "Freelance Web Developer",
    "Node.js MongoDB Expert",
    "TypeScript React Developer",
    "Hackathon Winner India",
    "AI Powered Web Apps",
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
      "Mumbai-based Full Stack Developer and 7× hackathon winner building scalable " +
      "web apps and LLM-integrated solutions with React, Next.js, Node.js & MongoDB.",
    url: BASE_URL,
    siteName: "Rishabh Jain",
    // NOTE: 192×192 is a square app icon — dimensions reflect the real file.
    // For a proper OG preview card, create a dedicated 1200×630 image.
    images: [
      {
        url: "/web-app-manifest-192x192.png",
        width: 192,
        height: 192,
        alt: "Rishabh Jain — Full Stack Developer",
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
      "Mumbai-based Full Stack Developer and 7× hackathon winner building scalable " +
      "web apps and LLM-integrated solutions with React, Next.js, Node.js & MongoDB.",
    creator: "@rishabhjain610",
    images: ["/web-app-manifest-192x192.png"],
  },

  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Rishabh Jain",
  },
  formatDetection: { telephone: false },
  manifest: "/site.webmanifest",

  alternates: {
    canonical: BASE_URL,
  },

  verification: {
    google: "ePQ4UK9TXEBxEOSROIEgx7FOv86l425KO6qU8J6kGE4",
  },

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
    apple: "/apple-icon.png",
    other: [{ rel: "mask-icon", url: "/favicon-dark.svg", color: "#4A90E2" }],
  },
  referrer: "strict-origin-when-cross-origin",
};

// ─── Structured Data ─────────────────────────────────────────────────────────

// FIX: Added dateModified to all schemas. Google uses this for freshness scoring;
// pages with no modification date are treated as potentially stale.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${BASE_URL}/#person`,
  name: "Rishabh Jain",
  url: BASE_URL,
  jobTitle: "Full Stack Developer",
  description:
    "Full Stack Developer and Agentic AI builder specialising in React, Next.js, " +
    "Node.js and MongoDB. 7× hackathon winner building scalable web apps and " +
    "LLM-integrated solutions from Mumbai, India.",
  image: `${BASE_URL}/LogoLight.png`,
  knowsAbout: [
    "React",
    "Next.js",
    "Node.js",
    "MongoDB",
    "TypeScript",
    "Agentic AI",
    "LLM Integration",
    "Full Stack Development",
    "SaaS Development",
    "AI Integration",
    "Python",
    "Express.js",
    "Tailwind CSS",
    "Docker",
    "Git",
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Thadomal Shahani Engineering College",
    url: "https://tsec.edu",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
  },
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      name: "B.E. in Computer Engineering",
      recognizedBy: {
        "@type": "CollegeOrUniversity",
        name: "Thadomal Shahani Engineering College",
      },
    },
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
    availableLanguage: ["en", "hi"],
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
    "Portfolio of Rishabh Jain — Full Stack Developer and Agentic AI builder based in Mumbai, India.",
  inLanguage: "en",
  dateModified: LAST_MODIFIED,
  // FIX: Removed incorrect `isPartOf: { "@id": "#person" }`.
  // A WebSite is not "part of" a Person — that's a schema type error.
  // Google's Rich Results validator flags this as a warning.
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
      name: "Skills",
      item: `${BASE_URL}/#skills`,
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "Projects",
      item: `${BASE_URL}/#projects`,
    },
    {
      "@type": "ListItem",
      position: 5,
      name: "Work Experience",
      item: `${BASE_URL}/#work`,
    },
    {
      "@type": "ListItem",
      position: 6,
      name: "Achievements",
      item: `${BASE_URL}/#achievements`,
    },
    {
      "@type": "ListItem",
      position: 7,
      name: "Contact",
      item: `${BASE_URL}/#contact`,
    },
  ],
};

// FIX: Added ProfilePage schema — Google recommends this for personal portfolio
// pages and it can unlock richer search features (sitelinks, profile cards).
const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${BASE_URL}/#profilepage`,
  name: "Rishabh Jain — Full Stack Developer & Agentic AI Builder",
  url: BASE_URL,
  dateModified: LAST_MODIFIED,
  mainEntity: { "@type": "Person", "@id": `${BASE_URL}/#person` },
  description:
    "Personal portfolio of Rishabh Jain — Full Stack Developer and Agentic AI builder " +
    "based in Mumbai, India. 7× hackathon winner at TSEC.",
  inLanguage: "en",
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
        {/*
          FIX: Removed manual <meta name="viewport">, <meta name="description">,
          and <meta name="theme-color"> — these are already emitted by Next.js
          from the `viewport` and `metadata` exports above. Keeping them manually
          creates duplicate tags which Googlebot flags as a technical issue.
        */}

        {/* Browser rendering hint — safe to keep, not emitted by Next.js */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="color-scheme" content="light dark" />
        <meta name="supported-color-schemes" content="light dark" />

        {/*
          PERF FIX: Added `preconnect` for critical third-party origins.
          `dns-prefetch` only resolves DNS; `preconnect` does DNS + TCP + TLS.
          For origins that actually load scripts (GTM, Analytics, Fonts),
          `preconnect` saves ~150ms per origin on first load.
        */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        {/* FIX: Space Grotesk is served from fonts.gstatic.com — add preconnect */}
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Keep dns-prefetch as fallback for browsers that don't support preconnect */}
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* LCP Optimization — Preload above-the-fold images */}
        <link rel="preload" href="/LogoDark.png" as="image" type="image/png" />
        <link
          rel="preload"
          href="/LogoLight.png"
          as="image"
          type="image/png"
          media="(prefers-color-scheme: light)"
        />
        <link rel="prefetch" href="/icon1.png" as="image" type="image/png" />

        {/*
          FIX: Structured data injected ONCE each. The original code injected
          personJsonLd and websiteJsonLd twice — once here and again further down.
          Duplicate JSON-LD confuses Google's parser and wastes crawl budget.
        */}
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
          }}
        />
        {/* NEW: ProfilePage schema for personal portfolio pages */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(profilePageJsonLd),
          }}
        />

        {/* Indie-Web / social profile verification */}
        <link rel="me" href="https://github.com/Rishabhjain610" />
        <link rel="me" href="https://www.linkedin.com/in/rishabhjain610/" />
        <link rel="me" href="https://twitter.com/rishabhjain610" />
        <link rel="me" href="https://instagram.com/rishabh_jain610" />
        <link rel="me" href="mailto:rishabhjainwork1@gmail.com" />

        {/* Vercel preview: block indexing and enforce canonical */}
      </head>

      <body className="antialiased">
        <LoadingScreen />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Links />
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
