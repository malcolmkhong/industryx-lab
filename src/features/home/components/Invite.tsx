import { ArrowUpRight, Github } from 'lucide-react'
import Image from 'next/image'
import { Reveal } from '@/components/Reveal'
import { externalLinks, invitationLinks } from '@/config/site'
import invitationCard from '@/assets/invitation-card.webp'

export function Invite() {
  return (
    <section id="invite" className="relative overflow-hidden py-24 sm:py-32">
      <div className="bg-grid mask-fade-edges absolute inset-0 opacity-60" aria-hidden="true" />
      <div
        className="absolute left-1/2 top-1/2 h-[420px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[130px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          {/* the invitation card */}
          <Reveal className="mx-auto w-full max-w-sm">
            <div className="group relative">
              <div
                className="absolute -inset-8 rounded-[2.5rem] bg-primary/15 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                aria-hidden="true"
              />
              <Image
                src={invitationCard}
                alt="My personal Kimi invitation card"
                className="relative w-full -rotate-2 rounded-3xl border border-white/10 object-cover shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)] transition-transform duration-500 group-hover:rotate-0"
                width={1062}
                height={1332}
                loading="lazy"
                sizes="(min-width: 1024px) 384px, 90vw"
              />
            </div>
            <p className="mt-5 text-center font-mono text-xs text-muted-foreground/70">
              my personal invitation card — yes, it's really yours to use
            </p>
          </Reveal>

          {/* the pitch */}
          <div className="flex flex-col items-start gap-7">
            <Reveal>
              <span className="font-mono text-xs tracking-[0.3em] text-primary">
                YOUR SEAT IS RESERVED
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
                Claim your seat.
                <br />
                Build something <span className="text-primary text-glow">wild.</span>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="max-w-lg text-base leading-relaxed text-muted-foreground">
                This is my personal invitation to Kimi — the AI coding agent I build with every
                single day. Open it, create your account, and the invite applies itself. No codes
                to type, no waitlist, no catch.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={invitationLinks.subscribe}
                  data-analytics-event="invitation_click"
                  data-analytics-label="final-invitation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.97] focus-visible-ring touch-manipulation"
                  title="Opens Kimi's official referral portal"
                >
                  Redeem my invitation
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href={externalLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-7 py-3.5 text-sm font-medium text-foreground/85 transition-colors hover:border-white/25 hover:text-foreground focus-visible-ring touch-manipulation"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  Star on GitHub
                </a>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] text-muted-foreground/80">
                <span>1 · open the invite</span>
                <span className="text-primary/60" aria-hidden="true">&rarr;</span>
                <span>2 · create your account</span>
                <span className="text-primary/60" aria-hidden="true">&rarr;</span>
                <span>3 · start shipping</span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
