import { ChevronDown, List } from 'lucide-react'
import type { CSSProperties } from 'react'
import type { TableOfContentsItem } from './TableOfContents'

const LINK_TOKENS = {
  '--toc-from': 'hsl(var(--toc-accent-from) / 0.18)',
  '--toc-to': 'hsl(var(--toc-accent-to) / 0.12)',
  '--toc-border': 'hsl(var(--toc-accent-from) / 0.45)',
  '--toc-shadow': '0 0 24px -6px hsl(var(--toc-glow) / 0.55)',
} as CSSProperties

export function MobileContentsBar({ items }: { items: TableOfContentsItem[] }) {
  return (
    <details
          data-mobile-contents
          className="sticky top-28 z-40 mx-auto -mt-3 mb-3 w-[min(calc(100vw-2.5rem),18rem)] max-w-full xl:hidden"
        >
          <summary
            role="button"
            aria-label="Contents"
            className="mobile-contents-summary flex w-fit cursor-pointer list-none items-center gap-3 rounded-lg border border-white/10 bg-background/85 px-4 py-2.5 backdrop-blur-md transition-colors hover:bg-background/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background [&::-webkit-details-marker]:hidden"
          >
        <List className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
        <span
          data-mobile-contents-label
          className="min-w-0 flex-1 truncate font-mono text-xs font-semibold tracking-[0.14em] text-foreground"
        >
          {items[0]?.label ?? 'On this page'}
        </span>
        <span
          data-mobile-contents-position
          className="font-mono text-[10px] text-muted-foreground/70"
        >
          1 / {items.length}
        </span>
        <ChevronDown
          className="mobile-contents-chevron h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
          aria-hidden="true"
        />
      </summary>

      <div
              role="menu"
              aria-label="On this page"
              className="dropdown-menu absolute left-1/2 top-full z-50 mt-2 max-h-[min(60vh,24rem)] w-[min(calc(100vw-2.5rem),18rem)] -translate-x-1/2 overflow-y-auto overscroll-contain rounded-xl border border-white/10 bg-background p-2 shadow-2xl shadow-black/40 [scrollbar-gutter:stable]"
            >
        <p className="mb-2 flex items-center gap-2 px-3 pt-1 font-mono text-[10px] font-semibold tracking-[0.18em] text-muted-foreground">
          ON THIS PAGE
        </p>
        <div className="relative pl-6">
          <span
            className="absolute bottom-1 left-[7px] top-1 w-px bg-white/10"
            aria-hidden="true"
          />
          <nav aria-label="On this page" className="flex flex-col gap-0.5">
            {items.map((item, index) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                data-toc-link={item.id}
                data-active={index === 0 ? 'true' : 'false'}
                style={LINK_TOKENS}
                className="toc-link relative -ml-6 block rounded-lg border border-transparent bg-transparent px-3 py-2 text-sm leading-snug text-muted-foreground transition-colors duration-200 focus-visible-ring"
              >
                <span className="relative z-10 block truncate">{item.label}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </details>
  )
}