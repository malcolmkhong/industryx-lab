import { ChevronDown, List, X } from 'lucide-react'
import type { TableOfContentsItem } from './TableOfContents'

export function MobileContentsBar({ items }: { items: TableOfContentsItem[] }) {
  const total = items.length
  return (
    <details
      data-mobile-contents
      className="fixed inset-x-0 xl:hidden"
      style={{ top: 'calc(4rem + env(safe-area-inset-top))' }}
    >
      <summary
        role="button"
        aria-label="Contents"
        className="mobile-contents-summary mx-auto flex cursor-pointer list-none items-center gap-3 border-b border-white/10 bg-background/85 px-5 py-2.5 backdrop-blur-md transition-colors hover:bg-background/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background [&::-webkit-details-marker]:hidden sm:px-6"
      >
        <List className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
        <span
          data-mobile-contents-label
          className="min-w-0 flex-1 truncate font-mono text-xs font-semibold tracking-[0.14em] text-foreground"
        >
          {items[0]?.label ?? 'On this page'}
        </span>
        <ChevronDown
          className="mobile-contents-chevron h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
          aria-hidden="true"
        />
      </summary>

      <div className="fixed inset-0 z-[60]">
        <button
          type="button"
          aria-label="Close contents"
          data-mobile-contents-close
          className="absolute inset-0 cursor-default bg-black/65 backdrop-blur-sm"
        />
        <aside
          role="dialog"
          aria-modal="true"
          aria-label="On this page"
          className="mobile-contents-sheet absolute inset-y-0 right-0 h-dvh w-full max-w-sm overflow-y-auto border-l border-white/10 bg-background p-5 sm:max-w-md sm:p-6"
        >
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-semibold tracking-[0.18em] text-muted-foreground">
                ON THIS PAGE
              </span>
              <span
                data-mobile-contents-position
                className="font-mono text-xs text-muted-foreground/70"
              >
                1 / {total}
              </span>
            </div>
            <button
              type="button"
              aria-label="Close contents"
              data-mobile-contents-close
              data-mobile-contents-close-button
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-muted-foreground hover:bg-white/5 hover:text-foreground focus-visible-ring touch-manipulation"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <nav aria-label="On this page" className="flex flex-col">
            {items.map((item, index) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                data-toc-link={item.id}
                data-active={index === 0 ? 'true' : 'false'}
                className="rounded-lg border-l-2 border-transparent px-3 py-3 text-sm text-foreground transition-colors hover:bg-primary/10 data-[active=true]:border-primary data-[active=true]:bg-primary/10 data-[active=true]:font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </aside>
      </div>
    </details>
  )
}
