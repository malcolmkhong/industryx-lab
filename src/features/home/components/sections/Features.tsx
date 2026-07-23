import {
  Blocks,
  Code2,
  ExternalLink,
  ScanEye,
  TerminalSquare,
  Users,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/content/Reveal";
import { SectionHeading } from "@/components/content/SectionHeading";
import {
  whyKimiCodeContent,
  type WhyKimiCodeIcon,
} from "@/features/home/content/whyKimiCode";

const FEATURE_ICONS: Record<WhyKimiCodeIcon, LucideIcon> = {
  agent: TerminalSquare,
  media: ScanEye,
  subagents: Users,
  extensions: Blocks,
  editors: Code2,
  setup: Zap,
};

export function Features() {
  return (
    <section id="why" className="relative py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          label={whyKimiCodeContent.label}
          title={whyKimiCodeContent.title}
          sub={whyKimiCodeContent.description}
        />

        <div className="mt-10 grid gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {whyKimiCodeContent.features.map((feature, index) => {
            const Icon = FEATURE_ICONS[feature.icon];

            return (
              <Reveal key={feature.id} delay={(index % 3) * 100}>
                <div className="group flex h-full flex-col gap-3 rounded-2xl border border-white/5 bg-card/40 p-4 transition-[transform,border-color,background-color] duration-slow hover:-translate-y-1 hover:border-primary/30 hover:bg-card/70 sm:gap-4 sm:p-7">
                  <span
                    className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-primary transition-colors group-hover:border-primary/40 group-hover:text-primary focus-visible:border-primary/40 focus-visible:text-primary"
                    aria-hidden="true"
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="text-lg font-semibold tracking-display text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
          <span className="font-mono text-[0.7rem] tracking-eyebrow text-foreground/60">
            OFFICIAL SOURCES
          </span>
          {whyKimiCodeContent.sources.map((source) => (
            <a
              key={source.href}
              href={source.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 underline decoration-white/20 underline-offset-4 transition-colors hover:text-primary focus-visible:text-primary"
            >
              {source.label}
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
