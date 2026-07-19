                aria-hidden="true"
              />
              <img
                src={invitationCard}
                alt="My personal Kimi invitation card"
                className="relative w-full -rotate-2 rounded-3xl border border-white/10 object-cover shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)] transition-transform duration-500 group-hover:rotate-0"
                width={1062}
                height={1332}
                loading="lazy"
              />
            </div>
            <p className="mt-5 text-center font-mono text-xs text-muted-foreground/70">
              my personal invitation card â€” yes, it's really yours to use
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
                This is my personal invitation to Kimi â€” the AI coding agent I build with every
                single day. Open it, create your account, and the invite applies itself. No codes
                to type, no waitlist, no catch.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={INVITE_SUBSCRIBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.97] focus-visible-ring touch-manipulation"
                >
                  Redeem my invitation
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href={GITHUB_URL}
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
                <span>1 &middot; open the invite</span>
                <span className="text-primary/60" aria-hidden="true">&rarr;</span>
                <span>2 &middot; create your account</span>
                <span className="text-primary/60" aria-hidden="true">&rarr;</span>
                <span>3 &middot; start shipping</span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
```

---

### Task 9: Fix Stats section - semantic structure

**Files:**
- Modify: `app/src/sections/Stats.tsx:1-31`

**Step 1: Update Stats with semantic HTML**
```tsx
import { Reveal } from '@/components/Reveal'

const STATS = [
  { value: '1M', label: 'token context window' },
  { value: '#1', label: 'Frontend Code Arena Â· 1,679 pts' },
  { value: '6.3Ã—', label: 'faster million-token decoding' },
  { value: '2.8T', label: 'parameter MoE behind the wheel' },
]

export function Stats() {
  return (
    <section className="border-y border-white/5 bg-card/30" aria-labelledby="stats-heading">
      <h2 id="stats-heading" className="sr-only">Key Statistics</h2>
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <Reveal
            key={stat.label}
            delay={i * 90}
            className="flex flex-col items-center gap-2 px-6 py-10 text-center"
          >
            <dl className="flex flex-col items-center gap-2">
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-mono text-3xl font-semibold tracking-tight text-foreground sm:text-4xl" aria-label={stat.value}>
                {stat.value}
              </dd>
              <dd className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                {stat.label}
              </dd>
            </dl>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
```

---

### Task 10: Fix Quote section - blockquote semantics

**Files:**
- Read: `app/src/sections/Quote.tsx`
- Modify: `app/src/sections/Quote.tsx`

**Step 1: Update Quote**
```tsx
import { Quote as QuoteIcon } from 'lucide-react'
import { Reveal } from '@/components/Reveal'

export function Quote() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-28">
      <div
        className="absolute left-1/2 top-1/2 h-[380px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/8 blur-[120px]"
        aria-hidden="true"
      />
      <Reveal className="relative mx-auto flex max-w-3xl flex-col items-center gap-8 px-6 text-center">
        <span className="grid h-12 w-12 place-items-center rounded-full border border-primary/25 bg-primary/10 text-primary" aria-hidden="true">
          <QuoteIcon className="h-5 w-5" aria-hidden="true" />
        </span>
        <blockquote className="text-2xl font-medium leading-snug tracking-tight text-foreground sm:text-3xl">
          "I've tried every AI coding tool that's crossed my timeline. Kimi Code is the only one
          that never left my terminal â€” it plans, it edits, it runs the tests, and it{' '}
          <span className="text-primary">finishes</span>."
        </blockquote>
        <footer className="font-mono text-xs tracking-[0.25em] text-muted-foreground">
          â€” ME, EVERY WEEK SINCE I INSTALLED IT
        </footer>
      </Reveal>
    </section>
  )
}
```

---

### Task 11: Fix Banner section

**Files:**
- Read: `app/src/sections/Banner.tsx`
- Modify: `app/src/sections/Banner.tsx`

**Step 1: Update Banner**
```tsx
import banner from '@/assets/moon-banner.webp'

export function Banner() {
  return (
    <section className="relative h-[300px] overflow-hidden sm:h-[440px]" aria-hidden="true">
      <img
        src={banner}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[center_68%]"
        width={2048}
        height={1062}
        loading="lazy"
      />
      {/* fade only the top and bottom edges into the page background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,hsl(var(--background))_0%,transparent_20%,transparent_78%,hsl(var(--background))_100%)]" />
    </section>
  )
}
```

