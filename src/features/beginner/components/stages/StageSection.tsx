import {
  Check,
  CheckCircle2,
  Circle,
  Clock3,
  ExternalLink,
  TriangleAlert,
} from "lucide-react";
import { CopyButton } from "@/components/ui/CopyButton";
import { beginnerPageContent, type BeginnerStage } from "../../content";
import { CodeCard } from "./CodeCard";
import { formatContent } from "../../utils/formatContent";

export function StageSection({ stage }: { stage: BeginnerStage }) {
  return (
    <section
      id={stage.id}
      className="pt-10 border-t scroll-mt-28 border-white/10"
    >
      <div className="flex flex-wrap gap-3 items-center mb-5">
        <span className="font-mono text-xs font-semibold tracking-eyebrow text-primary">
          {beginnerPageContent.stageUi.stage} {stage.stage}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.025] px-2.5 py-1 font-mono text-mockup-sm text-muted-foreground">
          <Clock3 className="w-3 h-3" aria-hidden="true" />
          {stage.duration}
        </span>
        <span className="flex-1 h-px min-w-16 bg-white/10" aria-hidden="true" />
      </div>

      <h2 className="text-2xl font-semibold tracking-tight text-foreground">
        {stage.title}
      </h2>
      <p className="mt-3 max-w-3xl leading-7 prose-body text-muted-foreground">
        {stage.goal}
      </p>

      <div className="mt-6 rounded-xl border border-primary/20 bg-primary/[0.055] p-5">
        <h3 className="text-base font-semibold text-foreground">
          {stage.question}
        </h3>
        <p className="mt-2 leading-7 text-foreground/80">{stage.answer}</p>
      </div>

      <div className="p-5 mt-5 rounded-xl border border-white/10 bg-card/55">
        <p className="font-mono text-xs font-semibold tracking-eyebrow text-muted-foreground">
          {beginnerPageContent.stageUi.whatYouNeed}
        </p>
        <ul className="mt-3 space-y-2">
          {stage.prerequisites.map((item) => (
            <li
              key={item}
              className="flex gap-2 text-sm leading-6 text-foreground/85"
            >
              <Circle
                className="mt-2 h-1.5 w-1.5 shrink-0 fill-primary text-primary"
                aria-hidden="true"
              />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {stage.command && (
        <CodeCard label={stage.command.label} value={stage.command.value} />
      )}

      <div className="overflow-hidden mt-5 rounded-xl border border-primary/25 bg-card/70">
        <div className="flex justify-between items-center px-5 py-3 border-b border-white/10">
          <span className="font-mono text-xs font-semibold tracking-eyebrow text-primary">
            {beginnerPageContent.stageUi.prompt}
          </span>
          <CopyButton
            text={stage.prompt}
            label={beginnerPageContent.stageUi.copy}
            accessibleLabel={formatContent(
              beginnerPageContent.stageUi.copyPromptFor,
              {
                stage: stage.title,
              },
            )}
            variant="ghost"
            className="px-0 py-0 h-auto tap-target"
          />
        </div>
        <p className="px-5 py-5 font-mono text-sm leading-7 border-l-2 code-surface border-primary code-text">
          {stage.prompt}
        </p>
      </div>

      {stage.callout && (
        <div className="p-5 mt-5 rounded-xl border border-white/10 bg-card/55">
          <p className="font-mono text-xs font-semibold tracking-eyebrow-default text-muted-foreground">
            {stage.callout.label}
          </p>
          <p className="mt-3 text-sm font-medium text-foreground">
            {stage.callout.beforeLink}{" "}
            <a
              href={stage.callout.href}
              className="text-primary hover:text-foreground focus-visible-ring"
            >
              {stage.callout.linkLabel}
            </a>
            {stage.callout.afterLink}
          </p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {stage.callout.description}
          </p>
        </div>
      )}

      <div className="mt-7">
        <h3 className="font-mono text-xs font-semibold tracking-eyebrow text-muted-foreground">
          {beginnerPageContent.stageUi.followSteps}
        </h3>
        <ol className="mt-4 space-y-4">
          {stage.steps.map((step, index) => (
            <li
              key={step.title}
              className="relative p-5 pl-16 rounded-xl border border-white/10 bg-card/45"
            >
              <span className="grid absolute top-5 left-5 place-items-center w-7 h-7 font-mono text-xs font-semibold rounded-full border border-primary/30 bg-primary/10 text-primary">
                {index + 1}
              </span>
              <h4 className="font-medium text-foreground">{step.title}</h4>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {step.body}
              </p>
              {step.code && (
                <CodeCard
                  label={beginnerPageContent.stageUi.example}
                  value={step.code}
                />
              )}
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-[1.4fr_1fr]">
        <div className="p-5 rounded-xl border border-white/10 bg-card/55">
          <p className="font-mono text-xs font-semibold tracking-eyebrow-default text-muted-foreground">
            {beginnerPageContent.stageUi.expectedResult}
          </p>
          <p className="mt-3 text-sm leading-6 text-foreground/85">
            {stage.expected}
          </p>
        </div>
        <div className="p-5 rounded-xl border border-white/10 bg-card/55">
          <p className="font-mono text-xs font-semibold tracking-eyebrow-default text-muted-foreground">
            {beginnerPageContent.stageUi.checkBeforeNextStage}
          </p>
          <ul className="mt-3 space-y-2">
            {stage.checks.map((check) => (
              <li
                key={check}
                className="flex gap-2 text-sm leading-6 text-foreground/85"
              >
                <Check
                  className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                {check}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <details className="group mt-5 rounded-xl border border-amber-300/15 bg-amber-300/[0.035] p-5">
        <summary className="flex gap-2 items-center font-medium list-none cursor-pointer text-foreground focus-visible-ring">
          <TriangleAlert
            className="w-4 h-4 text-amber-200"
            aria-hidden="true"
          />
          {beginnerPageContent.stageUi.commonProblems}
          <span className="ml-auto text-xs text-muted-foreground group-open:hidden">
            {beginnerPageContent.stageUi.show}
          </span>
          <span className="hidden ml-auto text-xs text-muted-foreground group-open:inline">
            {beginnerPageContent.stageUi.hide}
          </span>
        </summary>
        <div className="grid gap-4 pt-4 mt-4 border-t border-white/10 lg:grid-cols-2">
          {stage.commonProblems.map((item) => (
            <div
              key={item.problem}
              className="p-4 rounded-xl border interactive-card border-white/10 bg-card/55"
            >
              <p className="text-sm font-medium text-foreground">
                {item.problem}
              </p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                {item.fix}
              </p>
            </div>
          ))}
        </div>
      </details>

      <div className="flex flex-wrap gap-4 justify-between items-center mt-5">
        <div
          className="flex flex-wrap gap-y-2 gap-x-4"
          aria-label={formatContent(
            beginnerPageContent.stageUi.officialReferencesFor,
            { stage: stage.title },
          )}
        >
          {stage.references.map((reference) => (
            <a
              key={reference.href}
              href={reference.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-foreground focus-visible-ring"
            >
              {reference.label}
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          ))}
        </div>
        <label
          className="guide-stage-toggle tap-target inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border border-white/10 bg-card/55 px-3.5 py-2.5 text-sm text-muted-foreground transition-colors hover:border-primary/35 hover:text-foreground focus-within:ring-2 focus-within:ring-ring"
          data-stage-complete="false"
        >
          <input
            type="checkbox"
            className="sr-only"
            aria-label={formatContent(
              beginnerPageContent.stageUi.markStageComplete,
              {
                stage: stage.title,
              },
            )}
            data-guide-stage={stage.id}
          />
          <Circle
            className="w-4 h-4 guide-stage-incomplete-icon"
            aria-hidden="true"
          />
          <CheckCircle2
            className="hidden w-4 h-4 guide-stage-complete-icon text-primary"
            aria-hidden="true"
          />
          <span className="guide-stage-incomplete-label">
            {beginnerPageContent.stageUi.markComplete}
          </span>
          <span className="hidden guide-stage-complete-label">
            {beginnerPageContent.stageUi.completed}
          </span>
        </label>
      </div>
    </section>
  );
}
