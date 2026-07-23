import { ArrowUpRight, Github } from "lucide-react";
import Image from "next/image";
import { Reveal } from "@/components/content/Reveal";
import { Button } from "@/components/ui/button";
import { externalLinks, invitationLinks } from "@/config/site";
import invitationCard from "@/assets/invitation-card.webp";

export function Invite() {
  return (
    <section
      id="invite"
      className="overflow-hidden relative pt-24 pb-safe-6 sm:pt-32"
    >
      <div
        className="absolute inset-0 opacity-60 bg-grid mask-fade-edges"
        aria-hidden="true"
      />
      <div
        className="absolute left-1/2 top-1/2 h-[420px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[130px]"
        aria-hidden="true"
      />

      <div className="relative px-5 mx-auto max-w-6xl sm:px-6">
        <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          {/* the invitation card */}
          <Reveal className="mx-auto w-full max-w-sm">
            <div className="relative group">
              <div
                className="absolute -inset-8 rounded-[2.5rem] bg-primary/15 blur-3xl transition-opacity duration-slower group-hover:opacity-100"
                aria-hidden="true"
              />
              <Image
                src={invitationCard}
                alt="My personal Kimi invitation card"
                className="relative w-full -rotate-2 rounded-3xl border border-white/10 object-cover shadow-deep transition-transform duration-slower group-hover:rotate-0"
                width={1062}
                height={1332}
                loading="lazy"
                sizes="(min-width: 1024px) 384px, 90vw"
              />
            </div>
            <p className="mt-5 font-mono text-xs text-center text-muted-foreground/70">
              my personal invitation card — yes, it's really yours to use
            </p>
          </Reveal>

          {/* the pitch */}
          <div className="flex flex-col gap-7 items-start">
            <Reveal>
              <span className="font-mono text-xs tracking-eyebrow text-primary">
                YOUR SEAT IS RESERVED
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="text-3xl font-semibold tracking-display sm:text-4xl md:text-display-lg">
                Claim your seat.
                <br />
                Build something{" "}
                <span className="text-primary text-glow">wild.</span>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="max-w-lg text-base leading-relaxed text-muted-foreground">
                This is my personal invitation to Kimi — the AI coding agent I
                build with every single day. Open it, create your account, and
                the invite applies itself. No codes to type, no waitlist, no
                catch.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="flex flex-wrap gap-4 items-center">
                <Button variant="default" size="lg" asChild className="gap-2 rounded-xl px-7 py-3.5 font-semibold active:scale-[0.97] touch-manipulation">
                  <a
                    href={invitationLinks.subscribe}
                    data-analytics-event="invitation_click"
                    data-analytics-label="home-invitation"
                    data-analytics-section="invite"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Opens Kimi's official referral portal"
                  >
                    Redeem my invitation
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild className="gap-2 rounded-xl border px-7 py-3.5 text-foreground/85 hover:border-white/25 touch-manipulation">
                  <a
                    href={externalLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-4 w-4" aria-hidden="true" />
                    Star on GitHub
                  </a>
                </Button>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-mockup-sm text-muted-foreground/80">
                <span>1 · open the invite</span>
                <span className="text-primary/60" aria-hidden="true">
                  &rarr;
                </span>
                <span>2 · create your account</span>
                <span className="text-primary/60" aria-hidden="true">
                  &rarr;
                </span>
                <span>3 · start shipping</span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
