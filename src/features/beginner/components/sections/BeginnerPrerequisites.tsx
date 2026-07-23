import { ExternalLink, TerminalSquare } from "lucide-react"
import { beginnerPrerequisites } from "../../content"

export function BeginnerPrerequisites({
  section,
}: {
  section: {
    id: string
    eyebrow: string
    title: string
    description: string
    installationGuide: string
    loginLabel: string
    loginBeforeCommand: string
    command: string
    loginBeforeAction: string
    action: string
    loginAfterAction: string
  }
}) {
  return (
    <section
      id={section.id}
      className="scroll-mt-28 border-t border-white/10 pt-10"
    >
      <p className="font-mono text-xs font-semibold tracking-eyebrow text-primary">
        {section.eyebrow}
      </p>
      <h2 className="mt-3 text-2xl font-semibold tracking-display text-foreground">
        {section.title}
      </h2>
      <p className="mt-3 max-w-3xl prose-body leading-7 text-muted-foreground">
        {section.description}
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {beginnerPrerequisites.map((item) => (
          <div
            key={item.title}
            className="interactive-card rounded-xl border border-white/10 bg-card/55 p-5"
          >
            <TerminalSquare
              className="h-5 w-5 text-primary"
              aria-hidden="true"
            />
            <h3 className="mt-4 font-medium text-foreground">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {item.description}
            </p>
            <code className="mt-4 block overflow-x-auto rounded-md bg-black/30 px-3 py-2 font-mono text-xs text-foreground/90">
              {item.command}
            </code>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm text-primary hover:text-foreground focus-visible-ring"
            >
              {section.installationGuide}{" "}
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-xl border border-white/10 bg-card/45 p-5 text-sm leading-6 text-muted-foreground">
        <strong className="text-foreground">
          {section.loginLabel}
        </strong>{" "}
        {section.loginBeforeCommand}{" "}
        <code className="font-mono text-primary">
          {section.command}
        </code>
        , {section.loginBeforeAction}{" "}
        <code className="font-mono text-primary">
          {section.action}
        </code>
        , {section.loginAfterAction}
      </div>
    </section>
  )
}