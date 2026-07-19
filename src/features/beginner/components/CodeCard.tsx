import { Clipboard } from 'lucide-react'
import { useCopy } from '@/hooks/useCopy'
import { beginnerPageContent } from '../content'
import { formatContent } from '../utils/formatContent'

type CodeCardProps = {
  label: string
  value: string
}

export function CodeCard({ label, value }: CodeCardProps) {
  const { copy } = useCopy()

  return (
    <div className="mt-5 overflow-hidden rounded-xl border border-white/10 bg-card/55">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
        <span className="font-mono text-xs font-semibold tracking-[0.16em] text-muted-foreground">{label}</span>
        <button
          type="button"
          onClick={() => copy(value)}
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground focus-visible-ring"
          aria-label={formatContent(beginnerPageContent.stageUi.copyLabel, { label: label.toLowerCase() })}
        >
          <Clipboard className="h-3.5 w-3.5" aria-hidden="true" />
          {beginnerPageContent.stageUi.copy}
        </button>
      </div>
      <pre className="overflow-x-auto px-5 py-5 font-mono text-sm leading-7 text-foreground/90">
        <code>{value}</code>
      </pre>
    </div>
  )
}
