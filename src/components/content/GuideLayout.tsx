import type { ReactNode } from 'react'
import { MobileContentsBar } from './MobileContentsBar'
import { TableOfContents, type TableOfContentsItem } from './TableOfContents'

export function GuideLayout({ children, contents }: { children: ReactNode; contents: TableOfContentsItem[] }) {
  return (
    <div className="grid gap-12 xl:grid-cols-[minmax(0,1fr)_14rem] xl:items-start">
      <div className="min-w-0">
        <MobileContentsBar items={contents} />
        {children}
      </div>
      <TableOfContents items={contents} />
    </div>
  )
}
