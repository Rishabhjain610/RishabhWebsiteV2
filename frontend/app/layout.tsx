import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Links from "./components/Links";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/next";
export const metadata: Metadata = {
  title: "Rishabh Jain - Full Stack Developer",
  description:
    "Portfolio of Rishabh Jain, a full‑stack developer based in Mumbai",
  keywords: [
    "Full Stack Developer",
    "MERN Stack Developer",
    "Node.js Developer",
    "Hire MERN Stack Developer",
    "Freelance MERN Stack Developer India",
    "MERN Stack Developer India",
    "MongoDB Express React Node Developer",
    "Full Stack MERN Developer",
    "Hire Next.js Developer",
    "Freelance Next.js Developer India",
    "Next.js Full Stack Developer",
    "TypeScript Developer",
    "React TypeScript Developer",
    "Full Stack Developer India",
    "Remote Full Stack Developer",
    "Hire Full Stack Developer India",
    "MERN Stack Web Developer",
    "Custom Web Application Developer",
    "SaaS Application Developer",
    "Startup MVP Developer",
    "Node.js Backend Developer",
    "Express.js Developer",
    "MongoDB Developer",
    "React.js Developer",
    "Next.js and Node.js Developer",
    "Scalable Web Application Developer",
    "REST API Development",
    "Next.js API Routes Developer",
    "JWT Authentication Implementation",
    "Secure Web Application Developer",
    "Cloud Deployment Expert",
    "Vercel Deployment Specialist",
    "Performance Optimized Websites",
    "Responsive Web Design Developer",
    "E-commerce Website Developer",
    "Admin Dashboard Developer",
    "Real Time Web Application Developer",
    "AI Integrated Web Applications",
    "Portfolio Website Developer",
    "Freelance Web Developer Mumbai",
    "Full Stack Developer Navi Mumbai",
    "Remote MERN Stack Developer",
    "Professional Developer Portfolio",
    "End to End Web Development Services",
    "Modern JavaScript Full Stack Engineer",
    "Enterprise Web Application Developer",
    "Affordable Full Stack Developer India",
    "SEO Optimized Website Developer",
    "Production Ready Web Applications",
    "React Node MongoDB Developer",
    "Custom Business Website Developer",
    "Technical Consultant Web Developer",
    "High Performance Web Developer",
  ],
  authors: [{ name: "Rishabh Jain", url: "https://rishabhjain.dpdns.org/" }],
  creator: "Rishabh Jain",
  publisher: "Rishabh Jain",
  robots: {
    index: true,
    follow: true,
    nocache: true,
  },
  openGraph: {
    title: "Rishabh Jain - Full Stack Developer",
    description:
      "Portfolio of Rishabh Jain, a full‑stack developer based in Mumbai",
    url: "https://rishabhjain.dpdns.org/",
    siteName: "Rishabh Jain Portfolio",
    images: [
      {
        url: "https://rishabhjain.dpdns.org/LogoDark.png",
        width: 1200,
        height: 630,
        alt: "Rishabh Jain Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rishabh Jain - Full Stack Developer",
    description:
      "Portfolio of Rishabh Jain, a full‑stack developer based in Mumbai",
    creator: "@rishabhjain",
    images: "https://rishabhjain.dpdns.org/LogoDark.png",
  },

  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Rishabh Jain",
  },
  formatDetection: {
    telephone: false,
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://rishabhjain.dpdns.org/",
  },
  verification: {
    google: "TtCVRJScD-UOsCl5zgJf3NL2maM07UtsS2-WAKXzDao",
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
      {
        url: "/icon1.png",
        type: "image/png",
        sizes: "96x96",
      },
    ],
    apple: "/apple-icon.png",
    other: [
      {
        rel: "icon",
        url: "/icon1.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        rel: "mask-icon",
        url: "/favicon.svg",
        color: "#4A90E2",
      },
    ],
  },
};
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space",
  display: "swap",
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={spaceGrotesk.variable}>
      <head>
        
        
        {/* … */}

        {/* rel="me" links for Indie‑Web / Mastodon verification */}
        <link rel="me" href="https://github.com/Rishabhjain610" />
        <link rel="me" href="https://www.linkedin.com/in/rishabhjain610/" />
        <link rel="me" href="https://twitter.com/rishabhjain" />
        <link rel="me" href="https://instagram.com/rishabh_jain610" />
        <link rel="me" href="mailto:rishabhjainwork1@gmail.com" />
      </head>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Links />
          <Navbar />
          {children}
          <Footer />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
