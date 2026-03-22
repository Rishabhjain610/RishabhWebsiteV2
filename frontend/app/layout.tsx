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

// ─── Font ────────────────────────────────────────────────────────────────────
// Dropped weight "300" — saves one network round-trip on every load.
// Keeps 400/500/600/700 which are actually used in UI.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space",
  display: "swap",
  preload: true,
});

// ─── Constants ───────────────────────────────────────────────────────────────
// FIX: Was pointing to dev preview URL. Always use production domain.
const BASE_URL = "https://rishabhjain.dpdns.org";
const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ?? "G-RC2P5J3SJ5";

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
    default: "Rishabh Jain — Full Stack Developer | MERN & Next.js",
    template: "%s | Rishabh Jain",
  },

  // FIX: Previous description was too generic — Google ignored it and pulled
  // random page content instead (as seen in the search snippet screenshot).
  // A specific, action-oriented description forces Google to use it.
  description:
    "Rishabh Jain is a Mumbai-based Full Stack Developer specialising in React, Next.js, Node.js and MongoDB. Building scalable web apps, SaaS products, and AI-integrated solutions. Open for freelance & internship opportunities.",

  keywords: [
    "Rishabh Jain",
    "Rishabh Jain TSEC",
    "Rishabh Jain Mumbai",
    "Rishabh Jain Navi Mumbai",
    "Rishabh Jain GDG TSEC",
    "Rishabh Jain Full Stack Developer",
    "Full Stack Developer Mumbai",
    "MERN Stack Developer India",
    "Next.js Developer India",
    "React Developer Mumbai",
    "Node.js Backend Developer",
    "MongoDB Developer",
    "TypeScript Developer India",
    "Freelance Full Stack Developer India",
    "Hire MERN Stack Developer",
    "Hire Next.js Developer India",
    "SaaS Application Developer",
    "Startup MVP Developer India",
    "AI Integrated Web Applications",
    "REST API Development India",
    "Vercel Deployment Expert",
    "Scalable Web Application Developer",
    "React TypeScript Developer",
    "Express.js Developer",
    "Custom Web Application Developer",
    "Remote Full Stack Developer India",
    "Portfolio Website Developer",
    "Admin Dashboard Developer",
    "Real Time Web Application Developer",
    "Affordable Full Stack Developer India",
    "SEO Optimised Website Developer",
    "Production Ready Web Applications",
    "GDG on Campus TSEC",
    "Thadomal Shahani Engineering College Developer",
  ],

  authors: [{ name: "Rishabh Jain", url: BASE_URL }],
  creator: "Rishabh Jain",
  publisher: "Rishabh Jain",
  category: "technology",

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

  openGraph: {
    title: "Rishabh Jain — Full Stack Developer | MERN & Next.js",
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
    title: "Rishabh Jain — Full Stack Developer | MERN & Next.js",
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
  knowsAbout: [
    "React",
    "Next.js",
    "Node.js",
    "MongoDB",
    "TypeScript",
    "Full Stack Development",
  ],
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
  // Enables Google Sitelinks search box (bonus SEO)
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

// ─── Layout ──────────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={spaceGrotesk.variable}>
      <head>
        {/*
          PERF FIX: preconnect tells the browser to open TCP+TLS connections to
          these origins before they're actually needed — saves ~200–400ms on
          font and analytics loads.
        */}
        <link rel="preload" href="/LogoDark.png" as="image" type="image/png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />

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
          <Suspense fallback={null}>{children}</Suspense>
          {children}
          <Footer />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
