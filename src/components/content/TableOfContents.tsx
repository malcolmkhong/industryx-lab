export type TableOfContentsItem = {
  id: string
  label: string
}

export function TableOfContents({ items, variant = 'desktop' }: { items: TableOfContentsItem[]; variant?: 'desktop' | 'mobile' }) {
  if (variant === 'mobile') {
    return (
      <details className="mb-8 rounded-xl border border-white/10 bg-card/70 p-4 xl:hidden">
        <summary className="cursor-pointer font-mono text-xs font-semibold tracking-[0.16em] text-muted-foreground">ON THIS PAGE</summary>
        <div className="mt-4 space-y-2 border-t border-white/5 pt-3">
          {items.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="block rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-primary/10 hover:text-foreground focus-visible-ring">
              {item.label}
            </a>
          ))}
        </div>
      </details>
    )
  }

  return (
    <aside className="sticky top-24 hidden max-h-[calc(100vh-7rem)] self-start overflow-y-auto overscroll-contain pr-2 [scrollbar-gutter:stable] xl:block">
      <nav aria-label="Jump to" className="border-l border-white/10 pl-6">
        <p className="mb-4 font-mono text-xs font-semibold tracking-[0.16em] text-muted-foreground">JUMP TO</p>
        <ul className="space-y-1">
          {items.map((item, index) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={index === 0 ? 'location' : undefined}
                  data-toc-link={item.id}
                  data-active={index === 0 ? 'true' : 'false'}
                  className="toc-link -ml-[25px] block border-l-2 border-transparent py-2 pl-3 text-sm text-muted-foreground transition-colors hover:border-primary/45 hover:text-foreground focus-visible-ring"
                >
                  {item.label}
                </a>
              </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
