import { ArrowUp, Paperclip } from "lucide-react";
import { comingSoonContent } from "../content";

export function WorkspaceComposer() {
  const { desktop } = comingSoonContent;

  return (
    <div className="w-full">
      <div className="rounded-2xl border border-white/[0.1] bg-white/[0.045] p-3 shadow-xl shadow-black/20">
        <div className="flex items-center justify-between gap-3 border-b border-white/[0.07] px-1 pb-2 text-mockup-sm text-muted-foreground">
          <span>{desktop.composerEyebrow}</span>
          <span
            className="coming-soon-status-dot h-1.5 w-1.5 rounded-full bg-primary"
            aria-hidden="true"
          />
        </div>
        <label htmlFor="coming-soon-message" className="sr-only">
          {desktop.inputLabel}
        </label>
        <input
          id="coming-soon-message"
          type="text"
          disabled
          placeholder={desktop.inputPlaceholder}
          className="px-1 w-full min-w-0 h-14 text-sm truncate bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
        <div className="flex gap-3 justify-between items-center">
          <button
            type="button"
            disabled
            aria-label="Attach file — unavailable while in development"
            className="grid place-items-center w-9 h-9 rounded-full text-muted-foreground disabled:cursor-not-allowed"
          >
            <Paperclip className="w-4 h-4" aria-hidden="true" />
          </button>
          <div className="flex gap-2 items-center">
            <span className="hidden text-mockup-sm text-muted-foreground sm:inline">
              {desktop.modelLabel}
            </span>
            <button
              type="button"
              disabled
              aria-label={desktop.sendLabel}
              className="grid place-items-center w-9 h-9 rounded-full bg-primary/20 text-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ArrowUp className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div
        className="grid grid-cols-2 gap-2 mt-3 sm:flex sm:flex-wrap sm:justify-center"
        aria-label="Simulated agent tools"
      >
        {desktop.toolChips.map((tool) => (
          <button
            key={tool}
            type="button"
            disabled
            className="min-h-9 w-full rounded-full border border-white/[0.09] bg-white/[0.025] px-3 text-mockup-sm text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto"
          >
            {tool}
          </button>
        ))}
      </div>
    </div>
  );
}
