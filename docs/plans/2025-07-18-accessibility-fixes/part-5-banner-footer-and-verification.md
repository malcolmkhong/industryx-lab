---

### Task 12: Fix Footer section - focus-visible, aria-hidden on icons

**Files:**
- Modify: `app/src/sections/Footer.tsx:1-54`

**Step 1: Update Footer**
```tsx
import { Github } from 'lucide-react'
import { MoonMark } from '@/components/MoonMark'
import { DOCS_URL, GITHUB_URL, KIMI_CODE_URL } from '@/config'

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-card/20" role="contentinfo">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2.5 text-foreground" aria-hidden="true">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/25">
              <MoonMark className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <span className="font-mono text-xs font-semibold tracking-widest">KIMI CODE</span>
          </div>
          <nav className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground" aria-label="Footer navigation">
            <a
              href={KIMI_CODE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground focus-visible-ring touch-manipulation"
            >
              Official site
            </a>
            <a
              href={DOCS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground focus-visible-ring touch-manipulation"
            >
              Docs
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 transition-colors hover:text-foreground focus-visible-ring touch-manipulation"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              GitHub
            </a>
          </nav>
        </div>
        <div className="flex flex-col gap-2 border-t border-white/5 pt-6 text-xs leading-relaxed text-muted-foreground/70">
          <p>
            An independent page made by a happy Kimi Code user. Not affiliated with, sponsored, or
            endorsed by Moonshot AI. Product names and marks belong to their respective owners.
          </p>
          <p>&copy; 2026 &middot; Built with conviction (and a little help from Kimi Code itself).</p>
        </div>
      </div>
    </footer>
  )
}
```

---

### Task 13: Run lint and dev server verification

**Step 1: Run lint**
```bash
cd app && bun run lint
```

**Step 2: Run dev server**
```bash
cd app && bun run dev
```

**Step 3: Manual verification checklist**
- [ ] Tab through all interactive elements - focus rings visible
- [ ] Test with prefers-reduced-motion - animations disabled
- [ ] Test mobile menu - opens/closes, links work
- [ ] Check all external links have noopener noreferrer
- [ ] Check all decorative icons have aria-hidden
- [ ] Check all icon-only buttons have aria-label
- [ ] Verify heading hierarchy (h1 â†’ h2 â†’ h3)
- [ ] Check image loading priorities
- [ ] No console errors

---

### Task 14: Commit all changes

```bash
cd app
git add -A
git commit -m "feat: comprehensive accessibility and UI fixes

- Add focus-visible utility and apply to all interactive elements
- Add prefers-reduced-motion support for all animations
- Implement mobile navigation with Radix Dialog
- Add aria-labels and aria-hidden where needed
- Fix external link rel attributes (noopener noreferrer)
- Fix image loading priorities (eager for above-fold)
- Update Stats with semantic dl/dt/dd structure
- Update Quote with blockquote/footer semantics
- Add touch-manipulation utility for better mobile UX
- Add color-scheme: dark for proper dark mode"
```
