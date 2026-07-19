import {
  CalendarClock,
  FileText,
  Gift,
  Globe2,
  MessageCircle,
  MessageSquarePlus,
  Search,
  Sparkles,
  UserRound,
  Wrench,
} from 'lucide-react'
import { comingSoonContent } from '../content'

type WorkspaceSidebarProps = {
  invitationHref: string
}

const sidebarIcons = [Wrench, CalendarClock, Search, FileText, Globe2]

export function WorkspaceSidebar({ invitationHref }: WorkspaceSidebarProps) {
  const { desktop } = comingSoonContent

  return (
    <aside className="hidden w-20 shrink-0 flex-col border-r border-white/[0.08] bg-white/[0.025] p-2.5 md:flex lg:w-56">
      <div className="grid grid-cols-2 gap-1 rounded-lg bg-white/[0.045] p-1">
        <button type="button" disabled aria-label={desktop.workspaceTab} className="grid h-8 place-items-center rounded-md text-muted-foreground disabled:opacity-75 lg:flex lg:gap-2">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="hidden text-xs lg:inline">{desktop.workspaceTab}</span>
        </button>
        <button type="button" disabled aria-label={desktop.chatTab} className="grid h-8 place-items-center rounded-md bg-white/[0.09] text-foreground shadow-sm lg:flex lg:gap-2">
          <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="hidden text-xs lg:inline">{desktop.chatTab}</span>
        </button>
      </div>

      <button type="button" disabled className="mt-3 flex h-10 items-center justify-center gap-2 rounded-lg bg-white/[0.085] px-3 text-xs font-medium text-foreground disabled:cursor-default lg:justify-start">
        <MessageSquarePlus className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span className="hidden lg:inline">{desktop.newChat}</span>
      </button>

      <nav className="mt-3 space-y-0.5" aria-label="Simulated workspace tools">
        {desktop.sidebarItems.map((label, index) => {
          const Icon = sidebarIcons[index]
          return (
            <button key={label} type="button" disabled aria-label={label} className="flex h-9 w-full items-center justify-center gap-3 rounded-md px-2 text-xs text-foreground/80 disabled:cursor-default lg:justify-start">
              <Icon className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
              <span className="hidden lg:inline">{label}</span>
            </button>
          )
        })}
      </nav>

      <div className="mt-5 hidden min-h-0 flex-1 lg:block">
        <p className="px-2 text-[11px] font-medium text-muted-foreground">{desktop.history}</p>
        <div className="mt-2 space-y-1">
          {desktop.placeholderConversations.map((conversation, index) => (
            <button key={conversation} type="button" disabled className={`block w-full truncate rounded-md px-2 py-2 text-left text-xs ${index === 0 ? 'bg-white/[0.055] text-foreground' : 'text-muted-foreground'}`}>
              {conversation}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-auto space-y-2 pt-4">
        {invitationHref ? (
          <a href={invitationHref} data-analytics-event="invitation_click" data-analytics-label="workspace-invite" target="_blank" rel="noopener noreferrer" aria-label={desktop.inviteAction} className="flex min-h-11 items-center justify-center gap-3 rounded-lg border border-primary/20 bg-primary/[0.08] px-2 text-primary transition-colors hover:bg-primary/[0.14] focus-visible-ring lg:justify-start">
            <Gift className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="hidden min-w-0 lg:block">
              <span className="block text-xs font-medium text-foreground">{desktop.inviteAction}</span>
              <span className="mt-0.5 block truncate text-[10px] text-muted-foreground">{desktop.inviteSupportingText}</span>
            </span>
          </a>
        ) : null}
        <div className="flex h-10 items-center justify-center gap-2 px-2 text-muted-foreground lg:justify-start">
          <UserRound className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="hidden truncate text-xs lg:inline">{desktop.previewAccount}</span>
        </div>
      </div>
    </aside>
  )
}
