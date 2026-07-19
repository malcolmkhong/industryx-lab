import { Minus, PanelLeft, Square, X } from 'lucide-react'
import { comingSoonContent } from '../content'
import { StreamingAssistantResponse } from './StreamingAssistantResponse'
import { WorkspaceComposer } from './WorkspaceComposer'
import { WorkspaceSidebar } from './WorkspaceSidebar'

type SimulatedAiDesktopProps = {
  pageName: string
  expectedFeatures: string[]
  invitationHref: string
}

export function SimulatedAiDesktop({ pageName, expectedFeatures, invitationHref }: SimulatedAiDesktopProps) {
  const { desktop } = comingSoonContent

  return (
    <section className="coming-soon-window relative min-w-0 overflow-hidden rounded-xl border border-white/[0.1] bg-[#0d0e10] shadow-2xl shadow-black/35" aria-label={`${pageName} preview`}>
      <div className="flex h-10 items-center gap-3 border-b border-white/[0.08] bg-white/[0.025] px-3">
        <PanelLeft className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
        <p className="min-w-0 flex-1 truncate text-center text-[11px] text-muted-foreground">{desktop.applicationName}</p>
        <div className="flex items-center" aria-hidden="true">
          <Minus className="h-3.5 w-7 text-muted-foreground" />
          <Square className="h-3 w-7 text-muted-foreground" />
          <X className="h-3.5 w-7 text-muted-foreground" />
        </div>
      </div>

      <div className="flex min-h-[520px] min-w-0 sm:min-h-[600px] lg:min-h-[680px]">
        <WorkspaceSidebar invitationHref={invitationHref} />

        <div className="flex min-w-0 flex-1 flex-col bg-black/10">
          <div className="flex h-14 items-center justify-between gap-3 border-b border-white/[0.06] px-4 sm:px-5">
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-foreground">{pageName}</p>
              <p className="text-[11px] text-muted-foreground">{desktop.workspaceLabel}</p>
            </div>
            {invitationHref ? (
              <a href={invitationHref} data-analytics-event="invitation_click" data-analytics-label="workspace-upgrade" target="_blank" rel="noopener noreferrer" aria-label={desktop.upgradeAction} className="inline-flex min-h-9 items-center rounded-full border border-primary/20 bg-primary/10 px-3 text-xs font-medium text-primary transition-colors hover:bg-primary/15 focus-visible-ring">
                {desktop.upgradeAction}
              </a>
            ) : null}
          </div>

          <div className="flex flex-1 flex-col overflow-hidden px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
            <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center">
              <div className="mb-5 text-center">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary/80">{comingSoonContent.status}</p>
                <h2 className="mt-2 text-xl font-semibold tracking-[-0.025em] text-foreground sm:text-2xl">{pageName} agent workspace</h2>
              </div>
              <StreamingAssistantResponse pageName={pageName} expectedFeatures={expectedFeatures} />
              <div className="mt-5 sm:mt-6">
                <WorkspaceComposer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
