### Task 4: Fix Nav component - mobile menu, focus-visible, aria-labels

**Files:**
- Modify: `app/src/sections/Nav.tsx:1-59`

**Step 1: Update Nav with mobile drawer and accessibility**
```tsx
import { useEffect, useState } from 'react'
import { Github, Menu, X } from 'lucide-react'
import { MoonMark } from '@/components/MoonMark'
import { GITHUB_URL, INVITE_SUBSCRIBE_URL } from '@/config'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from '@/components/ui/dialog'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { href: '#why', label: 'Why Kimi Code' },
    { href: '#install', label: 'Install' },
    { href: GITHUB_URL, label: 'GitHub', external: true },
  ]

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-white/5 bg-background/80 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2.5 text-foreground focus-visible-ring touch-manipulation" aria-label="Kimi Code home">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/25" aria-hidden="true">
            <MoonMark className="h-[18px] w-[18px]" aria-hidden="true" />
          </span>
          <span className="font-mono text-sm font-semibold tracking-widest">KIMI&nbsp;CODE</span>
        </a>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className={`transition-colors hover:text-foreground focus-visible-ring touch-manipulation ${link.external ? 'flex items-center gap-1.5' : ''}`}
            >
              {link.external && <Github className="h-4 w-4" aria-hidden="true" />}
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href={INVITE_SUBSCRIBE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden inline-flex h-9 items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.97] focus-visible-ring touch-manipulation md:flex"
        >
          Get invite code
        </a>

        {/* Mobile menu button */}
        <Dialog>
          <DialogTrigger asChild>
            <button
              type="button"
              className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 focus-visible-ring touch-manipulation"
              aria-label="Open menu"
              aria-expanded="false"
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </DialogTrigger>
          <DialogContent className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-background border-l border-white/5 p-6 sm:max-w-md" side="right">
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between mb-8">
                <span className="font-mono text-sm font-semibold tracking-widest">MENU</span>
                <DialogClose asChild>
                  <button
                    type="button"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 focus-visible-ring touch-manipulation"
                    aria-label="Close menu"
                  >
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </DialogClose>
              </div>
              <nav className="flex flex-1 flex-col gap-4" aria-label="Mobile navigation">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-3 text-base font-medium text-foreground/80 hover:text-foreground focus-visible-ring touch-manipulation"
                    onClick={() => !link.external && document.querySelector('[data-radix-dialog-content]')?.querySelector('button[aria-label="Close menu"]')?.click()}
                  >
                    {link.external && <Github className="h-5 w-5" aria-hidden="true" />}
                    {link.label}
                  </a>
                ))}
                <div className="border-t border-white/5 pt-4 mt-auto" />
                <a
                  href={INVITE_SUBSCRIBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center h-11 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.97] focus-visible-ring touch-manipulation"
                >
                  Get invite code
                </a>
              </nav>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  )
}
```

---

### Task 5: Fix Hero section - focus-visible on buttons, aria-hidden on decorative elements

**Files:**
- Modify: `app/src/sections/Hero.tsx:1-103`

**Step 1: Update Hero**
```tsx
import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react'
import { KimiDesktop } from './KimiDesktop'
import { Reveal } from '@/components/Reveal'
import { INVITE_REDEEM_URL } from '@/config'

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-32 sm:pt-40">
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

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col items-start gap-7">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1.5 font-mono text-xs text-primary" aria-hidden="true">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Now powered by Kimi K3
              </span>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
                Stop typing.
                <br />
                <span className="text-primary text-glow">Start shipping.</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
                Kimi Code is Moonshot AI's agentic coding CLI. It reads your codebase, edits files,
                runs commands, and loops on its own output until the job is done â€” while you stay in
                the driver's seat of your terminal.
              </p>
            </Reveal>

            <Reveal delay={240} className="w-full max-w-lg">
              <div className="flex flex-col gap-4 rounded-2xl border border-primary/20 bg-primary/[0.06] p-5 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-1.5">
                  <span className="font-mono text-[11px] tracking-[0.25em] text-primary">
                    MY INVITATION
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Skip the waitlist â€” my invite link applies itself.
                    <br className="hidden sm:block" /> No code to type, ever.
                  </p>
                </div>
                <a
                  href={INVITE_REDEEM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 shrink-0 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.97] focus-visible-ring touch-manipulation"
                >
                  Redeem invitation
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={INVITE_REDEEM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.97] focus-visible-ring touch-manipulation"
                >
                  Claim your access
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href="#why"
                  className="inline-flex h-12 items-center rounded-xl border border-white/10 px-6 text-sm font-medium text-foreground/80 transition-colors hover:border-white/20 hover:text-foreground focus-visible-ring touch-manipulation"
                >
                  Why Kimi Code?
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200} className="lg:pl-4">
            <KimiDesktop />
            <p className="mt-4 text-center font-mono text-xs text-muted-foreground/70">
              the Kimi desktop app at work, slightly abridged
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
```

---

