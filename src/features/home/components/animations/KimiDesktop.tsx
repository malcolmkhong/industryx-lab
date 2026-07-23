"use client";

import {
  ArrowUp,
  Blocks,
  Check,
  Code2,
  FileCode2,
  FilePenLine,
  FlaskConical,
  History,
  LoaderCircle,
  Plus,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useDesktopAnimation } from "@/hooks/useDesktopAnimation";

interface ToolStep {
  icon: LucideIcon;
  text: string;
}

const TOOL_STEPS: ToolStep[] = [
  { icon: FileCode2, text: "Read 12 files in src/auth" },
  { icon: FilePenLine, text: "Rewrote session handling in 3 files" },
  { icon: FlaskConical, text: "Ran test suite — 148 / 148 passed" },
];

const FINAL_LINES = [
  "Done — the auth module is refactored and the suite is fully green.",
  "I replaced the token store, added refresh-token rotation,",
  "and removed three dead code paths.",
];

const HISTORY = ["Refactor auth module", "Fix checkout race", "Write API docs"];

// Pre-join FINAL_LINES the same way the renderer does (single space join)
// so the hook's typewriter can advance through the same string.
const FINAL_TEXT = FINAL_LINES.join(" ");

export function KimiDesktop() {
  const { stage, chars } = useDesktopAnimation({
    stepCount: TOOL_STEPS.length,
    finalTextLength: FINAL_TEXT.length,
  });
  const finished = chars >= FINAL_TEXT.length;

  return (
    <div className="overflow-hidden w-full text-left bg-white rounded-2xl border kimi-desktop-animation border-white/10 shadow-floating">
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-zinc-200/80 bg-zinc-50 px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]/80" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]/80" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]/80" />
        <span className="ml-2 font-medium tracking-wide text-mockup-sm text-zinc-400">
          Kimi — Desktop
        </span>
      </div>

      <div className="flex">
        {/* sidebar */}
        <div className="hidden flex-col p-3 w-40 border-r shrink-0 border-zinc-200/80 bg-zinc-50/60 sm:flex">
          <div className="flex gap-2 items-center px-1">
            <span className="grid h-5 w-5 place-items-center rounded-[6px] bg-zinc-900 text-mockup-2xs font-bold text-white">
              K
            </span>
            <span className="font-semibold text-mockup-lg text-zinc-800">
              Kimi
            </span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-mockup-sm text-zinc-600 shadow-sm">
            <Plus className="w-3 h-3" />
            New chat
          </div>
          <div className="mt-3 flex flex-col gap-0.5">
            <span className="flex items-center gap-1.5 rounded-md px-2 py-1 text-mockup-sm text-zinc-500">
              <Blocks className="w-3 h-3" />
              Plugins
            </span>
            <span className="flex items-center gap-1.5 rounded-md bg-zinc-900/[0.06] px-2 py-1 text-mockup-sm font-medium text-zinc-800">
              <Code2 className="w-3 h-3" />
              Kimi Code
            </span>
          </div>
          <div className="mt-4 flex items-center gap-1.5 px-1 text-mockup-2xs uppercase tracking-wider text-zinc-400">
            <History className="w-3 h-3" />
            Chats
          </div>
          <div className="mt-1.5 flex flex-col gap-0.5">
            {HISTORY.map((item, i) => (
              <span
                key={item}
                className={`truncate rounded-md px-2 py-1 text-mockup-sm ${
                  i === 0
                    ? "bg-zinc-900/[0.06] font-medium text-zinc-800"
                    : "text-zinc-500"
                }`}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* chat pane */}
        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex h-[300px] flex-col gap-4 overflow-hidden px-4 py-4 sm:px-5">
            {/* user message */}
            <div
              className={`desktop-user-message flex justify-end transition-[transform,opacity] duration-slower ${
                stage >= 1
                  ? "translate-y-0 opacity-100"
                  : "translate-y-2 opacity-0"
              }`}
            >
              <div className="max-w-[85%] rounded-2xl rounded-br-md bg-zinc-100 px-3.5 py-2.5 text-mockup-xl leading-relaxed text-zinc-800">
                Refactor the auth module — and make sure every test still
                passes.
              </div>
            </div>

            {/* assistant */}
            <div
              className={`desktop-assistant-message flex gap-2.5 transition-[transform,opacity] duration-slower ${
                stage >= 2
                  ? "translate-y-0 opacity-100"
                  : "translate-y-2 opacity-0"
              }`}
            >
              <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-zinc-900">
                <Sparkles className="w-3 h-3 text-white" />
              </span>
              <div className="flex flex-col flex-1 gap-2 min-w-0">
                <span className="desktop-thinking flex items-center gap-1.5 text-mockup-lg text-zinc-400">
                  Thinking
                  <span className="flex gap-0.5">
                    <span className="h-1 w-1 animate-bounce rounded-full bg-zinc-400 [animation-delay:0ms]" />
                    <span className="h-1 w-1 animate-bounce rounded-full bg-zinc-400 [animation-delay:150ms]" />
                    <span className="h-1 w-1 animate-bounce rounded-full bg-zinc-400 [animation-delay:300ms]" />
                  </span>
                </span>

                {TOOL_STEPS.map((step, i) => {
                  const revealed = stage >= 3 + i;
                  return (
                    <div
                      key={step.text}
                      className={`desktop-tool-step flex items-center gap-2 rounded-lg border border-zinc-200/80 bg-zinc-50/80 px-2.5 py-1.5 transition-[transform,opacity] duration-slower ${
                        revealed
                          ? "translate-y-0 opacity-100"
                          : "translate-y-2 opacity-0"
                      }`}
                    >
                      <step.icon className="h-3.5 w-3.5 shrink-0 text-zinc-500" />
                      <span className="flex-1 min-w-0 truncate text-mockup-md text-zinc-600">
                        {step.text}
                      </span>
                      <Check className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                    </div>
                  );
                })}

                <p className="leading-relaxed text-mockup-xl text-zinc-800">
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
          <div className="px-4 py-3 bg-white border-t border-zinc-200/80 sm:px-5">
            <div className="bg-white rounded-xl border border-zinc-200 shadow-ambient">
              <div className="px-3.5 pt-2.5 text-mockup-lg text-zinc-400">
                Ask anything, or start an Agent task…
              </div>
              <div className="flex items-center justify-between px-3 pb-2.5 pt-1.5">
                <Plus className="w-4 h-4 text-zinc-400" />
                <div className="flex gap-2 items-center">
                  <span
                    role="status"
                    aria-live="polite"
                    className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 px-2 py-0.5 text-mockup-2xs font-medium text-zinc-500"
                  >
                    {finished ? (
                      <Check className="w-3 h-3 text-emerald-500" />
                    ) : (
                      <LoaderCircle className="w-3 h-3 animate-spin" />
                    )}
                    {finished ? "Done" : "Working…"}
                  </span>
                  <span className="grid place-items-center w-6 h-6 text-white rounded-full bg-zinc-900">
                    <ArrowUp className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
