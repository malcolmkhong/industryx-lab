import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Analytics } from "@/components/analytics/Analytics";
import { PageViewTracker } from "@/components/analytics/PageViewTracker";
import { CookieConsent } from "@/components/consent/CookieConsent";
import { PageShell } from "@/components/site/PageShell";
import { siteConfig } from "@/config/site";
import "@/index.css";
import "@/styles/components/progressive.css";
import "@/styles/motion/home-motion.css";

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#06070c",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: siteConfig.homeMetadata.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.homeMetadata.description,
  authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
  creator: siteConfig.author.name,
  publisher: siteConfig.organization.name,
  icons: {
    icon: [
      { url: "/moon-mark.png", type: "image/png", sizes: "any" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    shortcut: "/moon-mark.png",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
      : undefined,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body>
        <PageShell>{children}</PageShell>
        <Analytics />
        <PageViewTracker />
        <CookieConsent />
      </body>
    </html>
  );
}
