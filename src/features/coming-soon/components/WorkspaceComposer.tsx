import { ArrowUp, Paperclip } from 'lucide-react'
import { comingSoonContent } from '../content'

export function WorkspaceComposer() {
  const { desktop } = comingSoonContent

  return (
    <div className="w-full">
      <div className="rounded-2xl border border-white/[0.1] bg-white/[0.045] p-3 shadow-xl shadow-black/20">
        <div className="flex items-center justify-between gap-3 border-b border-white/[0.07] px-1 pb-2 text-[11px] text-muted-foreground">
          <span>{desktop.composerEyebrow}</span>
          <span className="coming-soon-status-dot h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
        </div>
        <label htmlFor="coming-soon-message" className="sr-only">{desktop.inputLabel}</label>
        <input id="coming-soon-message" type="text" disabled placeholder={desktop.inputPlaceholder} className="h-14 w-full min-w-0 truncate bg-transparent px-1 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed" />
        <div className="flex items-center justify-between gap-3">
          <button type="button" disabled aria-label="Attach file — unavailable while in development" className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground disabled:cursor-not-allowed">
            <Paperclip className="h-4 w-4" aria-hidden="true" />
          </button>
          <div className="flex items-center gap-2">
            <span className="hidden text-[11px] text-muted-foreground sm:inline">{desktop.modelLabel}</span>
            <button type="button" disabled aria-label={desktop.sendLabel} className="grid h-9 w-9 place-items-center rounded-full bg-primary/20 text-primary disabled:cursor-not-allowed disabled:opacity-65">
              <ArrowUp className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:justify-center" aria-label="Simulated agent tools">
        {desktop.toolChips.map((tool) => (
          <button key={tool} type="button" disabled className="min-h-9 w-full rounded-full border border-white/[0.09] bg-white/[0.025] px-3 text-[11px] text-muted-foreground disabled:cursor-default sm:w-auto">
            {tool}
          </button>
        ))}
      </div>
    </div>
  )
}
