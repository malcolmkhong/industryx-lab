import { cliAnimationContent, type CliLineTone } from '../content/cli'
import { useCliAnimation } from '../hooks/useCliAnimation'

const LINE_COLORS: Record<CliLineTone, string> = {
  command: 'text-[#f4f2ea]',
  muted: 'text-[#9b9a92] italic',
  success: 'text-[#d8f8df]',
}

export function CliAnimation() {
  const { finalCharacterCount, visibleLineCount } = useCliAnimation({
    lineCount: cliAnimationContent.lines.length,
    finalTextLength: cliAnimationContent.finalText.length,
  })

  return (
    <div
      role="region"
      aria-label={cliAnimationContent.activityLabel}
      className="h-[430px] w-full overflow-hidden rounded-xl border border-white/15 bg-[#111111] text-left font-mono shadow-[0_32px_90px_-24px_rgba(0,0,0,0.85)]"
    >
      <div className="relative flex h-9 items-center border-b border-white/10 px-3">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="absolute inset-x-0 text-center text-[10px] tracking-[0.12em] text-[#e6d8bd]">
          {cliAnimationContent.title}
        </span>
      </div>

      <div className="h-[391px] overflow-hidden p-3 text-[10px] leading-[1.55] sm:p-4 sm:text-[11px]">
        <div className="rounded-xl border border-[#168cff] p-2 sm:p-3">
          <div className="flex items-center gap-3">
            <span
              className="grid h-10 w-14 shrink-0 grid-cols-2 place-items-center rounded-md bg-[#168cff] px-3"
              aria-hidden="true"
            >
              <span className="h-2 w-1.5 bg-white" />
              <span className="h-2 w-1.5 bg-white" />
            </span>
            <div className="min-w-0 text-[#f1eee6]">
              <p>{cliAnimationContent.welcomeTitle}</p>
              <p>{cliAnimationContent.welcomeHelp}</p>
            </div>
          </div>
          <p className="mt-2 text-[#c9c6bd]">{cliAnimationContent.model}</p>
        </div>

        <div className="mt-3 space-y-1.5" aria-live="off">
          {cliAnimationContent.lines.slice(0, visibleLineCount).map((line) => (
            <p
              key={line.id}
              className={`break-words animate-in fade-in slide-in-from-bottom-1 duration-300 motion-reduce:animate-none ${LINE_COLORS[line.tone]}`}
            >
              {line.prompt ? <span className="text-[#f7f4ec]">{line.prompt} </span> : null}
              <span className={line.tone === 'command' ? 'text-[#b9d9ff]' : undefined}>
                {line.text}
              </span>
            </p>
          ))}

          {visibleLineCount === cliAnimationContent.lines.length ? (
            <p className="break-words text-[#f4f2ea]">
              {cliAnimationContent.finalText.slice(0, finalCharacterCount)}
              {finalCharacterCount < cliAnimationContent.finalText.length ? (
                <span
                  className="ml-0.5 inline-block h-3 w-1 translate-y-0.5 animate-caret-blink bg-[#d9d5cb] motion-reduce:animate-none"
                  aria-hidden="true"
                />
              ) : null}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  )
}
