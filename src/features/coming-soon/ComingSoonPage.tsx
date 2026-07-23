"use client";

import { Wrench } from "lucide-react";
import Link from "next/link";
import { EmptyState } from "@/components/ui/empty-state";
import {
  completedNavigationLinks,
  type ComingSoonRoute,
} from "@/config/routes";
import { invitationLinks } from "@/config/site";
import { SimulatedAiDesktop } from "./components/SimulatedAiDesktop";
import { comingSoonContent } from "./content";
import "./coming-soon.css";

type ComingSoonPageProps = {
  route: ComingSoonRoute;
  invitationHref?: string;
};

export function ComingSoonPage({
  route,
  invitationHref = invitationLinks.subscribe,
}: ComingSoonPageProps) {
  const safeInvitationHref = invitationHref.trim();
  return (
    <main
      id="main-content"
      className="overflow-hidden relative px-5 pt-24 pb-12 mx-auto max-w-6xl sm:px-6 sm:pb-20 sm:pt-28"
      role="main"
    >
      <span
        className="coming-soon-ambient pointer-events-none absolute right-[8%] top-24 h-56 w-56 rounded-full bg-primary/[0.06] blur-3xl"
        aria-hidden="true"
      />

      <EmptyState
        icon={Wrench}
        status={comingSoonContent.status}
        title={`${route.pageName} ${comingSoonContent.headingSuffix}`}
        description={comingSoonContent.supportingDescription}
        primaryAction={
          safeInvitationHref
            ? {
                label: comingSoonContent.invitationAction,
                href: safeInvitationHref,
                external: true,
                ariaLabel: comingSoonContent.invitationAction,
                analytics: {
                  event: "invitation_click",
                  label: "coming-soon-invitation",
                  section: "coming-soon-hero",
                },
              }
            : undefined
        }
        secondaryAction={{
          label: comingSoonContent.exploreAction,
          href: route.fallbackPath,
          variant: "outline",
          analytics: {
            event: "cta_click",
            label: "beginner-cta",
            section: "coming-soon-fallback",
          },
        }}
        meta={comingSoonContent.invitationDisclosure}
      >
        <div className="flex gap-2 items-center mb-3 text-xs text-muted-foreground">
          <Wrench className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
          <span>{comingSoonContent.previewDisclosure}</span>
        </div>
        <SimulatedAiDesktop
          pageName={route.pageName}
          expectedFeatures={route.expectedFeatures}
          invitationHref={safeInvitationHref}
        />
      </EmptyState>

      <nav
        className="flex flex-wrap gap-y-2 gap-x-5 justify-center items-center mt-6"
        aria-label={comingSoonContent.availablePagesLabel}
      >
        {completedNavigationLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-sm transition-colors text-muted-foreground hover:text-foreground focus-visible-ring"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </main>
  );
}
