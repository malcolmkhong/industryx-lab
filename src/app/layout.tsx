import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { Analytics } from '@/components/analytics/Analytics'
import { PageShell } from '@/components/site/PageShell'
import { siteConfig } from '@/config/site'
import '@/index.css'

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
      </body>
    </html>
  )
}
