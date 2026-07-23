import * as React from "react";
import { cn } from "@/lib/utils";

interface EmptyStateAction {
  label: string;
  href: string;
  external?: boolean;
  analytics?: {
    event: string;
    label: string;
    section: string;
  };
  variant?: "default" | "outline" | "neon";
  ariaLabel?: string;
}

interface EmptyStateProps {
  icon?: React.ComponentType<{ className?: string }>;
  status?: string;
  title: string;
  description?: string;
  meta?: string;
  primaryAction?: EmptyStateAction;
  secondaryAction?: EmptyStateAction;
  children?: React.ReactNode;
  className?: string;
}

const baseActionClass =
  "inline-flex h-11 min-h-11 items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-medium transition-colors focus-visible-ring touch-manipulation";

const variantClass: Record<NonNullable<EmptyStateAction["variant"]>, string> = {
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  outline:
    "border border-white/10 bg-card/60 text-foreground hover:border-primary/35 hover:bg-primary/10",
  neon: "neon-button",
};

/**
 * EmptyState — Reusable layout for "no content yet" surfaces.
 *
 * Used by:
 * - ComingSoonPage (planned-but-unpublished routes)
 * - not-found.tsx (unknown URLs)
 *
 * Composition:
 *   [icon]   [status badge]
 *   [title]
 *   [description]
 *   [primaryAction] [secondaryAction]
 *   [meta disclosure]
 *   [children] (optional preview/mockup area)
 */
export function EmptyState({
  icon: Icon,
  status,
  title,
  description,
  meta,
  primaryAction,
  secondaryAction,
  children,
  className,
}: EmptyStateProps) {
  return (
    <section
      className={cn(
        "flex relative flex-col items-center mx-auto max-w-5xl text-center",
        className,
      )}
      aria-label={title}
    >
      {Icon ? (
        <div
          className="mb-5 grid h-14 w-14 place-items-center rounded-2xl border border-primary/25 bg-primary/[0.08] text-primary"
          aria-hidden="true"
        >
          <Icon className="w-7 h-7" />
        </div>
      ) : null}

      {status ? (
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/[0.07] px-3 py-1.5 text-xs font-medium text-foreground">
          <span
            className="w-2 h-2 rounded-full bg-primary"
            aria-hidden="true"
          />
          {status}
        </div>
      ) : null}

      <h1 className="mt-6 text-3xl font-semibold text-balance tracking-display text-foreground sm:text-5xl">
        {title}
      </h1>

      {description ? (
        <p className="mx-auto mt-5 max-w-[68ch] text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}

      {(primaryAction || secondaryAction) && (
        <EmptyStateActions
          primaryAction={primaryAction}
          secondaryAction={secondaryAction}
        />
      )}

      {meta ? (
        <p className="mx-auto mt-4 max-w-[66ch] text-pretty text-xs leading-5 text-muted-foreground">
          {meta}
        </p>
      ) : null}

      {children ? (
        <div className="relative mt-10 w-full sm:mt-14">{children}</div>
      ) : null}
    </section>
  );
}

function EmptyStateActions({
  primaryAction,
  secondaryAction,
}: {
  primaryAction?: EmptyStateAction;
  secondaryAction?: EmptyStateAction;
}) {
  return (
    <div className="flex flex-col gap-3 justify-center items-stretch mt-7 sm:flex-row sm:items-center">
      {primaryAction ? <EmptyStateActionLink action={primaryAction} /> : null}
      {secondaryAction ? (
        <EmptyStateActionLink action={secondaryAction} />
      ) : null}
    </div>
  );
}

function EmptyStateActionLink({ action }: { action: EmptyStateAction }) {
  const variant = action.variant ?? "default";
  const className = cn(baseActionClass, variantClass[variant]);
  const analytics = action.analytics;
  const ariaProps = action.ariaLabel ? { "aria-label": action.ariaLabel } : {};
  const target = action.external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <a
      href={action.href}
      className={className}
      {...target}
      {...ariaProps}
      {...(analytics ?? {})}
    >
      {action.label}
    </a>
  );
}

export type { EmptyStateProps, EmptyStateAction };
