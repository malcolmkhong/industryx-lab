import { CopyButton } from '@/components/ui/CopyButton'
import { beginnerPageContent } from '../../content'
import { formatContent } from '../../utils/formatContent'

type CodeCardProps = {
  label: string
  value: string
}

export function CodeCard({ label, value }: CodeCardProps) {
  return (
    <div className="mt-5 overflow-hidden rounded-xl border border-white/10 bg-card/55">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
        <span className="font-mono text-xs font-semibold tracking-eyebrow text-muted-foreground">{label}</span>
        <CopyButton
          text={value}
          label={beginnerPageContent.stageUi.copy}
          accessibleLabel={formatContent(beginnerPageContent.stageUi.copyLabel, {
            label: label.toLowerCase(),
          })}
          variant="ghost"
          className="tap-target h-auto px-0 py-0"
        />
      </div>
      <pre className="code-surface overflow-x-auto px-5 py-5 font-mono text-sm leading-7 code-text">
        <code>{value}</code>
      </pre>
    </div>
  )
}
