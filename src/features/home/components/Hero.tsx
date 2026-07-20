import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import { invitationLinks } from '@/config/site'
import { cliAnimationContent } from '../content/cli'
import { CliAnimation } from './CliAnimation'

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-24 sm:pb-20 sm:pt-40">
      {/* backdrop */}
      <div className="bg-grid mask-fade-edges absolute inset-0" aria-hidden="true" />
      <div
        className="absolute left-1/2 top-[-20%] h-[560px] w-[860px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px] animate-drift"
        aria-hidden="true"
      />
      {/* moon */}
      <div className="animate-drift absolute right-[6%] top-28 hidden lg:block" aria-hidden="true">
        <div className="absolute -inset-14 rounded-full bg-primary/15 blur-3xl" />
        <div className="relative h-36 w-36 rounded-full bg-gradient-to-br from-[#dfe4ff] via-[#aab4f5] to-[#5f6bd8]">
          <div className="absolute -left-5 -top-4 h-full w-full rounded-full bg-background" />
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col items-start gap-7">
            <Reveal priority>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1.5 font-mono text-xs text-primary" aria-hidden="true">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Now powered by Kimi K3
              </span>
            </Reveal>

            <Reveal priority>
              <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
                Stop typing.
                <br />
                <span className="text-primary text-glow">Start shipping.</span>
              </h1>
            </Reveal>

            <Reveal priority>
              <p className="max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
                Kimi Code is Moonshot AI's agentic coding CLI. It reads your codebase, edits files,
                runs commands, and loops on its own output until the job is done — while you stay in
                the driver's seat of your terminal.
              </p>
            </Reveal>

            <Reveal priority className="w-full max-w-lg">
              <div className="flex flex-col gap-4 rounded-2xl border border-primary/20 bg-primary/[0.06] p-5 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-1.5">
                  <span className="font-mono text-[11px] tracking-[0.25em] text-primary">
                    MY INVITATION
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Skip the waitlist — my invite link applies itself.
                    <br className="hidden sm:block" /> No code to type, ever.
                  </p>
                </div>
                <a
                  href={invitationLinks.redeem}
                  data-analytics-event="invitation_click"
                  data-analytics-label="home-invitation"
                  data-analytics-section="hero"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 shrink-0 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.97] focus-visible-ring touch-manipulation"
                  title="Opens Kimi's official referral portal">
                  Redeem invitation
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </Reveal>

            <Reveal priority>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={invitationLinks.redeem}
                  data-analytics-event="invitation_click"
                  data-analytics-label="home-invitation"
                  data-analytics-section="hero"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.97] focus-visible-ring touch-manipulation"
                  title="Opens Kimi's official referral portal">
                  Claim your access
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href="#why"
                  data-analytics-event="cta_click"
                  data-analytics-label="hero-why-kimi"
                  data-analytics-section="hero"
                  className="inline-flex h-12 items-center rounded-xl border border-white/10 px-6 text-sm font-medium text-foreground/80 transition-colors hover:border-white/20 hover:text-foreground focus-visible-ring touch-manipulation">
                  Why Kimi Code?
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal priority className="lg:pl-4">
            <CliAnimation />
            <p className="mt-4 text-center font-mono text-xs text-muted-foreground/70">
              {cliAnimationContent.caption}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
