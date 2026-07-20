import { BookOpen } from 'lucide-react'
import type { CSSProperties } from 'react'

export type TableOfContentsItem = {
  id: string
  label: string
}

const ACTIVE_TOKENS = {
  '--toc-from': 'hsl(var(--toc-accent-from) / 0.18)',
  '--toc-to': 'hsl(var(--toc-accent-to) / 0.12)',
  '--toc-border': 'hsl(var(--toc-accent-from) / 0.45)',
  '--toc-shadow': '0 0 24px -6px hsl(var(--toc-glow) / 0.55)',
} as CSSProperties

export function TableOfContents({ items }: { items: TableOfContentsItem[] }) {
  return (
    <aside className="sticky top-28 hidden max-h-[calc(100vh-8rem)] self-start overflow-y-auto overscroll-contain pr-2 [scrollbar-gutter:stable] xl:block">
      <div className="relative pl-6">
        <span
          className="absolute bottom-1 left-[7px] top-1 w-px bg-white/10"
          aria-hidden="true"
        />

        <p className="mb-3 flex items-center gap-2 font-mono text-[10px] font-semibold tracking-[0.18em] text-muted-foreground">
          <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
          JUMP TO
        </p>

        <nav aria-label="Jump to" className="space-y-0.5">
          {items.map((item, index) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={index === 0 ? 'location' : undefined}
              data-toc-link={item.id}
              data-active={index === 0 ? 'true' : 'false'}
              style={ACTIVE_TOKENS}
              className="toc-link relative -ml-6 block rounded-lg border border-transparent bg-transparent px-3 py-1.5 text-sm leading-snug text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible-ring"
            >
              <span className="relative z-10 block truncate">{item.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </aside>
  )
}