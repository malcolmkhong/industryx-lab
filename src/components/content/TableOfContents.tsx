import { BookOpen } from 'lucide-react'
import { TocLink } from '@/components/ui/TocLink'

export type TableOfContentsItem = {
  id: string
  label: string
}

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
                    <TocLink
                      key={item.id}
                      id={item.id}
                      label={item.label}
                      data-active={index === 0 ? 'true' : 'false'}
                      aria-current={index === 0 ? 'location' : undefined}
                      className="-ml-6"
                    />
                  ))}
                </nav>
      </div>
    </aside>
  )
}