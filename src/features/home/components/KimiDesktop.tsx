'use client'

import { ArrowUp, Blocks, Check, Code2, FileCode2, FilePenLine, FlaskConical, History, LoaderCircle, Plus, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useDesktopAnimation } from '@/hooks/useDesktopAnimation'

interface ToolStep {
  icon: LucideIcon
  text: string
}

const TOOL_STEPS: ToolStep[] = [
  { icon: FileCode2, text: 'Read 12 files in src/auth' },
  { icon: FilePenLine, text: 'Rewrote session handling in 3 files' },
  { icon: FlaskConical, text: 'Ran test suite — 148 / 148 passed' },
]

const FINAL_LINES = [
  'Done — the auth module is refactored and the suite is fully green.',
  'I replaced the token store, added refresh-token rotation,',
  'and removed three dead code paths.',
]

const HISTORY = ['Refactor auth module', 'Fix checkout race', 'Write API docs']

// Pre-join FINAL_LINES the same way the renderer does (single space join)
// so the hook's typewriter can advance through the same string.
const FINAL_TEXT = FINAL_LINES.join(' ')

export function KimiDesktop() {
  const { stage, chars } = useDesktopAnimation({
    stepCount: TOOL_STEPS.length,
    finalTextLength: FINAL_TEXT.length,
  })
  const finished = chars >= FINAL_TEXT.length

  return (
    <div className="kimi-desktop-animation w-full overflow-hidden rounded-2xl border border-white/10 bg-white text-left shadow-[0_32px_90px_-24px_rgba(0,0,0,0.85)]">
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-zinc-200/80 bg-zinc-50 px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]/80" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]/80" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]/80" />
        <span className="ml-2 text-[11px] font-medium tracking-wide text-zinc-400">
          Kimi — Desktop
        </span>
      </div>

      <div className="flex">
        {/* sidebar */}
        <div className="hidden w-40 shrink-0 flex-col border-r border-zinc-200/80 bg-zinc-50/60 p-3 sm:flex">
          <div className="flex items-center gap-2 px-1">
            <span className="grid h-5 w-5 place-items-center rounded-[6px] bg-zinc-900 text-[10px] font-bold text-white">
              K
            </span>
            <span className="text-[12px] font-semibold text-zinc-800">Kimi</span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-[11px] text-zinc-600 shadow-sm">
            <Plus className="h-3 w-3" />
            New chat
          </div>
          <div className="mt-3 flex flex-col gap-0.5">
            <span className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] text-zinc-500">
              <Blocks className="h-3 w-3" />
              Plugins
            </span>
            <span className="flex items-center gap-1.5 rounded-md bg-zinc-900/[0.06] px-2 py-1 text-[11px] font-medium text-zinc-800">
              <Code2 className="h-3 w-3" />
              Kimi Code
            </span>
          </div>
          <div className="mt-4 flex items-center gap-1.5 px-1 text-[10px] uppercase tracking-wider text-zinc-400">
            <History className="h-3 w-3" />
            Chats
          </div>
          <div className="mt-1.5 flex flex-col gap-0.5">
            {HISTORY.map((item, i) => (
              <span
                key={item}
                className={`truncate rounded-md px-2 py-1 text-[11px] ${
                  i === 0 ? 'bg-zinc-900/[0.06] font-medium text-zinc-800' : 'text-zinc-500'
                }`}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* chat pane */}
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex h-[300px] flex-col gap-4 overflow-hidden px-4 py-4 sm:px-5">
            {/* user message */}
            <div
              className={`desktop-user-message flex justify-end transition-all duration-500 ${
                stage >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
              }`}
            >
              <div className="max-w-[85%] rounded-2xl rounded-br-md bg-zinc-100 px-3.5 py-2.5 text-[12.5px] leading-relaxed text-zinc-800">
                Refactor the auth module — and make sure every test still passes.
              </div>
            </div>

            {/* assistant */}
            <div
              className={`desktop-assistant-message flex gap-2.5 transition-all duration-500 ${
                stage >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
              }`}
            >
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-zinc-900">
                <Sparkles className="h-3 w-3 text-white" />
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <span className="desktop-thinking flex items-center gap-1.5 text-[12px] text-zinc-400">
                  Thinking
                  <span className="flex gap-0.5">
                    <span className="h-1 w-1 animate-bounce rounded-full bg-zinc-400 [animation-delay:0ms]" />
                    <span className="h-1 w-1 animate-bounce rounded-full bg-zinc-400 [animation-delay:150ms]" />
                    <span className="h-1 w-1 animate-bounce rounded-full bg-zinc-400 [animation-delay:300ms]" />
                  </span>
                </span>

                {TOOL_STEPS.map((step, i) => {
                  const revealed = stage >= 3 + i
                  return (
                    <div
                      key={step.text}
                      className={`desktop-tool-step flex items-center gap-2 rounded-lg border border-zinc-200/80 bg-zinc-50/80 px-2.5 py-1.5 transition-all duration-500 ${
                        revealed ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                      }`}
                    >
                      <step.icon className="h-3.5 w-3.5 shrink-0 text-zinc-500" />
                      <span className="min-w-0 flex-1 truncate text-[11.5px] text-zinc-600">
                        {step.text}
                      </span>
                      <Check className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                    </div>
                  )
                })}

                <p className="text-[12.5px] leading-relaxed text-zinc-800">
                  <span className="desktop-response-line">
                    {FINAL_TEXT.slice(0, Math.max(chars - 0, 0))}
                  </span>
                  {!finished ? (
                    <span
                      className="desktop-response-caret ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 animate-caret-blink bg-zinc-400"
                      aria-hidden="true"
                    />
                  ) : null}
                </p>
              </div>
            </div>
          </div>

          {/* composer */}
          <div className="border-t border-zinc-200/80 bg-white px-4 py-3 sm:px-5">
            <div className="rounded-xl border border-zinc-200 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <div className="px-3.5 pt-2.5 text-[12px] text-zinc-400">
                Ask anything, or start an Agent task…
              </div>
              <div className="flex items-center justify-between px-3 pb-2.5 pt-1.5">
                <Plus className="h-4 w-4 text-zinc-400" />
                <div className="flex items-center gap-2">
                  <span
                    role="status"
                    aria-live="polite"
                    className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 px-2 py-0.5 text-[10px] font-medium text-zinc-500"
                  >
                    {finished ? (
                      <Check className="h-3 w-3 text-emerald-500" />
                    ) : (
                      <LoaderCircle className="h-3 w-3 animate-spin" />
                    )}
                    {finished ? 'Done' : 'Working…'}
                  </span>
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-zinc-900 text-white">
                    <ArrowUp className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
