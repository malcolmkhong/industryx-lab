import { CheckCircle2 } from "lucide-react"
import { formatContent } from "../../utils/formatContent"

export function BeginnerCompletion({
  section,
  totalStages,
}: {
  section: {
    title: string
    description: string
    allComplete: string
    stagesRemaining: string
  }
  totalStages: number
}) {
  return (
    <section className="rounded-2xl border border-primary/25 bg-primary/[0.065] p-6 sm:p-8">
      <CheckCircle2 className="h-7 w-7 text-primary" aria-hidden="true" />
      <h2 className="mt-4 text-2xl font-semibold tracking-display text-foreground">
        {section.title}
      </h2>
      <p className="mt-3 max-w-3xl prose-body leading-7 text-muted-foreground">
        {section.description}
      </p>
      <p
        className="mt-5 font-mono text-sm text-primary"
        data-guide-completion
        data-all-complete={section.allComplete}
        data-remaining-template={section.stagesRemaining}
      >
        {formatContent(section.stagesRemaining, {
          remaining: totalStages,
        })}
      </p>
    </section>
  )
}