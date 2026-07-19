import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { CopyButton } from '@/components/CopyButton'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { installCommands, invitationLinks } from '@/config/site'
import moonCoder from '@/assets/moon-coder.webp'

export function Install() {
  return (
    <section id="install" className="border-t border-white/5 bg-card/20 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          label="GET STARTED"
          title="Zero to first commit in about a minute."
          sub="Three steps — activate the invite, install the CLI, ship something. The invite link applies your code automatically."
        />

        <div className="mt-16 grid items-start gap-12 lg:grid-cols-[1fr_340px]">
          <div className="flex flex-col gap-10">
            <Reveal>
              <div className="flex gap-5">
                <span className="font-mono text-sm text-primary">01</span>
                <div className="flex flex-1 flex-col gap-4">
                  <h3 className="text-lg font-semibold tracking-tight">Activate your invitation</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Open my invite link and create your Kimi account — the invitation applies itself
                    at sign-up. Nothing to copy, nothing to paste.
                  </p>
                  <div>
                    <a
                      href={invitationLinks.subscribe}
                      data-analytics-event="invitation_click"
                      data-analytics-label="install-invitation"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.97] focus-visible-ring touch-manipulation"
                      title="Opens Kimi's official referral portal">
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
                    {installCommands.map((cmd) => (
                      <div
                        key={cmd.id}
                        className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/8 bg-background/70 px-4 py-3">
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
                    inside the CLI, sign in with the account you just created — and you're shipping.
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
                  aria-hidden="true">
                </div>
                <Image
                  src={moonCoder}
                  alt="An astronaut coding on a crescent moon"
                  className="relative w-full rounded-3xl border border-white/10 object-cover shadow-[0_24px_80px_-24px_rgba(0,0,0,0.8)]"
                  width={1024}
                  height={1024}
                  loading="lazy"
                  sizes="340px"
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
