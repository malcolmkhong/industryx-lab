'use client'

import { ArrowRight, ExternalLink, Wrench } from 'lucide-react'
import Link from 'next/link'
import { completedNavigationLinks, type ComingSoonRoute } from '@/config/routes'
import { invitationLinks } from '@/config/site'
import { SimulatedAiDesktop } from './components/SimulatedAiDesktop'
import { comingSoonContent } from './content'
import './coming-soon.css'

type ComingSoonPageProps = {
  route: ComingSoonRoute
  invitationHref?: string
}

export function ComingSoonPage({
  route,
  invitationHref = invitationLinks.subscribe,
}: ComingSoonPageProps) {
  const safeInvitationHref = invitationHref.trim()
  return (
    <main id="main-content" className="relative mx-auto max-w-6xl overflow-hidden px-5 pb-12 pt-24 sm:px-6 sm:pb-20 sm:pt-28" role="main">
      <span className="coming-soon-ambient pointer-events-none absolute right-[8%] top-24 h-56 w-56 rounded-full bg-primary/[0.06] blur-3xl" aria-hidden="true" />

      <header className="relative mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/[0.07] px-3 py-1.5 text-xs font-medium text-foreground">
          <span className="coming-soon-status-dot h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
          {comingSoonContent.status}
        </div>
        <h1 className="mt-6 text-balance text-3xl font-semibold tracking-[-0.035em] text-foreground sm:text-5xl">
          {route.pageName} {comingSoonContent.headingSuffix}
        </h1>
        <p className="mx-auto mt-5 max-w-[68ch] text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
          {comingSoonContent.supportingDescription}
        </p>
        <p className="mx-auto mt-3 max-w-[65ch] text-pretty text-sm leading-6 text-foreground/75">
          {route.description}
        </p>

        <div className="mt-7 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          {safeInvitationHref ? (
            <a
              href={safeInvitationHref}
              data-analytics-event="invitation_click"
              data-analytics-label="coming-soon-primary-invitation"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={comingSoonContent.invitationAction}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible-ring touch-manipulation"
            >
              {comingSoonContent.invitationAction}
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          ) : null}
          <Link
            href={route.fallbackPath}
            data-analytics-event="cta_click"
            data-analytics-label="coming-soon-fallback"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/10 bg-card/60 px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/35 hover:bg-primary/10 focus-visible-ring touch-manipulation"
          >
            {comingSoonContent.exploreAction}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <p className="mx-auto mt-4 max-w-[66ch] text-pretty text-xs leading-5 text-muted-foreground">
          {comingSoonContent.invitationDisclosure}
        </p>

        <nav className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2" aria-label={comingSoonContent.availablePagesLabel}>
          {completedNavigationLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible-ring">
              {link.label}
            </Link>
          ))}
        </nav>
      </header>

      <div className="relative mt-10 sm:mt-14">
        <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
          <Wrench className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
          <span>{comingSoonContent.previewDisclosure}</span>
        </div>
        <SimulatedAiDesktop
          pageName={route.pageName}
          expectedFeatures={route.expectedFeatures}
          invitationHref={safeInvitationHref}
        />
      </div>
    </main>
  )
}
