import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { Analytics } from '@/components/analytics/Analytics'
import { CookieConsent } from '@/components/consent/CookieConsent'
import { PageShell } from '@/components/site/PageShell'
import { siteConfig } from '@/config/site'
import '@/index.css'
import '@/styles/progressive.css'
import '@/styles/home-motion.css'

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#06070c',
  width: 'device-width',
  initialScale: 1,
}

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
    icon: [{ url: '/moon-mark.svg', type: 'image/svg+xml' }],
    shortcut: '/moon-mark.svg',
    apple: '/moon-mark.svg',
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION
      ? { 'msvalidate.01': process.env.BING_SITE_VERIFICATION }
      : undefined,
  },
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body>
        <PageShell>{children}</PageShell>
        <Analytics />
        <CookieConsent />
      </body>
    </html>
  )
}
