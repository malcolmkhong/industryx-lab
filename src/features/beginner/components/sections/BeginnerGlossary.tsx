import { BookOpen } from "lucide-react"
import { beginnerGlossary } from "../../content"

export function BeginnerGlossary({
  section,
}: {
  section: {
    id: string
    eyebrow: string
    title: string
    description: string
  }
}) {
  return (
    <section
      id={section.id}
      className="scroll-mt-28 border-t border-white/10 pt-10"
    >
      <div className="flex items-center gap-3">
        <BookOpen className="h-5 w-5 text-primary" aria-hidden="true" />
        <p className="font-mono text-xs font-semibold tracking-eyebrow text-primary">
          {section.eyebrow}
        </p>
      </div>
      <h2 className="mt-3 text-2xl font-semibold tracking-display text-foreground">
        {section.title}
      </h2>
      <p className="mt-3 max-w-3xl prose-body leading-7 text-muted-foreground">
        {section.description}
      </p>
      <dl className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {beginnerGlossary.map((item) => (
          <div
            key={item.term}
            className="interactive-card rounded-xl border border-white/10 bg-card/55 p-5"
          >
            <dt className="font-medium text-foreground">{item.term}</dt>
            <dd className="mt-2 text-sm leading-6 text-muted-foreground">
              {item.definition}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}