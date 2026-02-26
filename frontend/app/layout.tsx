import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Links from "./components/Links";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/next"
export const metadata: Metadata = {
  title: "Rishabh Jain - Full Stack Developer",
  description: "Portfolio of Rishabh Jain, a full-stack developer",
  icons: {
    icon: [
      {
        url: "/LogoLight.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/LogoDark.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
};
import { Space_Grotesk } from "next/font/google"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space",
  display: "swap",
})
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={spaceGrotesk.variable}>
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