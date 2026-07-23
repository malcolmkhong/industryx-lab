import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BeginnerHero({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  primaryHref,
  secondaryHref,
}: {
  eyebrow: string;
  title: string;
  description: string;
  primaryAction: string;
  secondaryAction: string;
  primaryHref: string;
  secondaryHref: string;
}) {
  return (
    <header className="mb-10 max-w-4xl">
      <p className="mb-4 font-mono text-xs font-semibold tracking-eyebrow text-primary">
        {eyebrow}
      </p>
      <h1 className="text-4xl font-semibold tracking-display text-foreground sm:text-5xl">
        {title}
      </h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
        {description}
      </p>
      <div className="flex flex-wrap gap-3 mt-7">
        <Button variant="default" size="lg" asChild className="tap-target min-h-11 rounded-lg px-5 py-3">
          <a
            href={primaryHref}
            data-analytics-event="cta_click"
            data-analytics-label="beginner-prerequisites"
            data-analytics-section="beginner-hero"
            className="gap-2"
          >
            {primaryAction}
            <Sparkles className="h-4 w-4" aria-hidden="true" />
          </a>
        </Button>
        <Button variant="outline" size="lg" asChild className="tap-target min-h-11 rounded-lg border px-5 py-3">
          <a
            href={secondaryHref}
            data-analytics-event="cta_click"
            data-analytics-label="beginner-stage-one"
            data-analytics-section="beginner-hero"
            className="gap-2"
          >
            {secondaryAction}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </Button>
      </div>
    </header>
  );
}