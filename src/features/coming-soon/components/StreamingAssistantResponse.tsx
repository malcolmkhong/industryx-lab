import { Check, LoaderCircle, Sparkles } from "lucide-react";
import { useDesktopAnimation } from "@/hooks/useDesktopAnimation";
import { comingSoonContent } from "../content";

type StreamingAssistantResponseProps = {
  pageName: string;
  expectedFeatures: string[];
};

export function StreamingAssistantResponse({
  pageName,
  expectedFeatures,
}: StreamingAssistantResponseProps) {
  const { desktop } = comingSoonContent;
  const finalText = `${desktop.responsePrefix} ${pageName} ${desktop.responseSuffix}`;
  const { stage, chars, typingStage } = useDesktopAnimation({
    stepCount: expectedFeatures.length,
    finalTextLength: finalText.length,
  });
  const activeState =
    stage < 3
      ? desktop.states[0]
      : stage < typingStage
        ? desktop.states[1]
        : chars < finalText.length
          ? desktop.states[2]
          : desktop.states[3];

  return (
    <section
      className="agent-response h-[420px] w-full overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.025] p-4 sm:h-[340px] sm:p-5 lg:h-[320px]"
      aria-label={desktop.responseLabel}
    >
      <div className="flex justify-end">
        <div
          className={`max-w-[88%] rounded-2xl rounded-br-md bg-white/[0.075] px-3.5 py-2.5 text-xs leading-5 text-foreground/80 transition-[transform,opacity] duration-slower ${stage >= 1 ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
        >
          {desktop.requestPrefix} {pageName} {desktop.requestSuffix}
        </div>
      </div>

      <div
        className={`mt-4 flex gap-3 transition-[transform,opacity] duration-slower ${stage >= 2 ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
      >
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
          <Sparkles className="h-4 w-4" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex min-h-5 items-center justify-between gap-3">
            <p className="text-xs font-medium text-foreground">
              {desktop.assistantName}
            </p>
            <p
              role="status"
              aria-live="polite"
              className="inline-flex items-center gap-1.5 text-mockup-sm text-muted-foreground"
            >
              {activeState !== desktop.states[3] ? (
                <LoaderCircle
                  className="h-3 w-3 animate-spin"
                  aria-hidden="true"
                />
              ) : (
                <Check className="h-3 w-3 text-primary" aria-hidden="true" />
              )}
              {activeState}
            </p>
          </div>

          <div className="mt-3 space-y-2">
            {stage === 2 ? (
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                {desktop.states[0]}
                <span className="flex gap-1" aria-hidden="true">
                  <span className="h-1 w-1 animate-bounce rounded-full bg-muted-foreground [animation-delay:0ms]" />
                  <span className="h-1 w-1 animate-bounce rounded-full bg-muted-foreground [animation-delay:150ms]" />
                  <span className="h-1 w-1 animate-bounce rounded-full bg-muted-foreground [animation-delay:300ms]" />
                </span>
              </span>
            ) : null}

            {expectedFeatures.map((feature, index) => (
              <div
                key={feature}
                className={`flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.025] px-2.5 py-2 transition-[transform,opacity] duration-slower ${stage >= 3 + index ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"}`}
              >
                <Check
                  className="h-3.5 w-3.5 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <span className="min-w-0 flex-1 truncate text-xs text-muted-foreground">
                  {feature}
                </span>
              </div>
            ))}

            {stage >= typingStage ? (
              <p className="text-sm leading-6 text-foreground/80">
                {finalText.slice(0, chars)}
                {chars < finalText.length ? (
                  <span
                    className="ml-0.5 inline-block h-4 w-1.5 translate-y-0.5 animate-caret-blink bg-muted-foreground"
                    aria-hidden="true"
                  />
                ) : null}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
