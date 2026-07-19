### Task 6: Fix Features section - focus-visible on cards, aria-hidden on icons

**Files:**
- Modify: `app/src/sections/Features.tsx:1-80`

**Step 1: Update Features**
```tsx
import {
  Blocks,
  Code2,
  ScanEye,
  TerminalSquare,
  Users,
  Zap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'

interface Feature {
  icon: LucideIcon
  title: string
  desc: string
}

const FEATURES: Feature[] = [
  {
    icon: TerminalSquare,
    title: 'An agent, not autocomplete',
    desc: 'It reads and edits code, runs shell commands, searches files, and fetches docs â€” then decides its next move from the feedback it gets.',
  },
  {
    icon: ScanEye,
    title: "Show, don't tell",
    desc: 'Drop a screenshot or a screen recording straight into chat. Kimi Code turns what it sees â€” a mockup, a bug replay â€” into working code.',
  },
  {
    icon: Users,
    title: 'Subagents in parallel',
    desc: 'Built-in coder, explore, and plan subagents work in isolated contexts, so big tasks move fast while your main thread stays clean.',
  },
 …301 tokens truncated…       {FEATURES.map((feature, i) => (
            <Reveal key={feature.title} delay={(i % 3) * 100}>
              <article className="group flex h-full flex-col gap-4 rounded-2xl border border-white/5 bg-card/40 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-card/70 focus-visible-ring touch-manipulation" tabIndex={0} role="article">
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-primary transition-colors group-hover:border-primary/40 group-hover:text-primary focus-visible:border-primary/40 focus-visible:text-primary" aria-hidden="true">
                  <feature.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{feature.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

### Task 7: Fix Install section - focus-visible on CTAs and copy buttons, fix image loading

**Files:**
- Modify: `app/src/sections/Install.tsx:1-119`

**Step 1: Update Install**
```tsx
import { ArrowUpRight } from 'lucide-react'
import { CopyButton } from '@/components/CopyButton'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { INSTALL_COMMANDS, INVITE_SUBSCRIBE_URL } from '@/config'
import moonCoder from '@/assets/moon-coder.webp'

export function Install() {
  return (
    <section id="install" className="border-t border-white/5 bg-card/20 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          label="GET STARTED"
          title="Zero to first commit in about a minute."
          sub="Three steps â€” activate the invite, install the CLI, ship something. The invite link applies your code automatically."
        />

        <div className="mt-16 grid items-start gap-12 lg:grid-cols-[1fr_340px]">
          <div className="flex flex-col gap-10">
            <Reveal>
              <div className="flex gap-5">
                <span className="font-mono text-sm text-primary">01</span>
                <div className="flex flex-1 flex-col gap-4">
                  <h3 className="text-lg font-semibold tracking-tight">Activate your invitation</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Open my invite link and create your Kimi account â€” the invitation applies itself
                    at sign-up. Nothing to copy, nothing to paste.
                  </p>
                  <div>
                    <a
                      href={INVITE_SUBSCRIBE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.97] focus-visible-ring touch-manipulation"
                    >
                      Activate invitation
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="flex gap-5">
                <span className="font-mono text-sm text-primary">02</span>
                <div className="flex flex-1 flex-col gap-4">
                  <h3 className="text-lg font-semibold tracking-tight">Install the CLI</h3>
                  <div className="flex flex-col gap-2.5">
                    {INSTALL_COMMANDS.map((cmd) => (
                      <div
                        key={cmd.id}
                        className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/8 bg-background/70 px-4 py-3"
                      >
                        <div className="flex min-w-0 flex-col gap-1">
                          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
                            {cmd.label}
                          </span>
                          <code className="break-all font-mono text-xs text-foreground/85 sm:text-sm">
                            {cmd.command}
                          </code>
                        </div>
                        <CopyButton text={cmd.command} label={`Copy ${cmd.label} command`} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="flex gap-5">
                <span className="font-mono text-sm text-primary">03</span>
                <div className="flex flex-1 flex-col gap-4">
                  <h3 className="text-lg font-semibold tracking-tight">Launch and log in</h3>
                  <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/8 bg-background/70 px-4 py-3">
                    <code className="font-mono text-xs text-foreground/85 sm:text-sm">
                      cd your-project <span className="text-muted-foreground">&&</span> kimi
                    </code>
                    <CopyButton text={'cd your-project && kimi'} label="Copy launch command" />
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    On first launch, run{' '}
                    <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-xs text-primary">
                      /login
                    </code>{' '}
                    inside the CLI, sign in with the account you just created â€” and you're shipping.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={150} className="hidden lg:block">
            <div className="sticky top-28">
              <div className="relative">
                <div
                  className="absolute -inset-6 rounded-[2rem] bg-primary/10 blur-3xl"
                  aria-hidden="true"
                />
                <img
                  src={moonCoder}
                  alt="An astronaut coding on a crescent moon"
                  className="relative w-full rounded-3xl border border-white/10 object-cover shadow-[0_24px_80px_-24px_rgba(0,0,0,0.8)]"
                  width={1024}
                  height={1024}
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
              <p className="mt-4 text-center font-mono text-xs text-muted-foreground/70">
                your new pair programmer, literally over the moon
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
```

---

### Task 8: Fix Invite section - focus-visible on CTAs, aria-hidden on decorative

**Files:**
- Modify: `app/src/sections/Invite.tsx:1-95`

**Step 1: Update Invite**
```tsx
import { ArrowUpRight, Github } from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import { GITHUB_URL, INVITE_SUBSCRIBE_URL } from '@/config'
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
