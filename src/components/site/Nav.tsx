'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, Menu, X } from 'lucide-react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  navigationGroups,
  routePaths,
  type NavigationGroup,
  type NavigationGroupId,
} from '@/config/routes'

export function Nav() {
  const [openMenu, setOpenMenu] = useState<NavigationGroupId | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<NavigationGroupId | null>('build-project')
  const desktopNavRef = useRef<HTMLElement>(null)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pathname = usePathname() ?? routePaths.home

  const cancelScheduledClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }

  const scheduleClose = (menuId: NavigationGroupId) => {
    cancelScheduledClose()
    closeTimerRef.current = setTimeout(() => {
      setOpenMenu((currentMenu) => (currentMenu === menuId ? null : currentMenu))
      closeTimerRef.current = null
    }, 160)
  }

  useEffect(() => {
    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (!desktopNavRef.current?.contains(event.target as Node)) {
        cancelScheduledClose()
        setOpenMenu(null)
      }
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        cancelScheduledClose()
        setOpenMenu(null)
      }
    }

    document.addEventListener('pointerdown', closeOnOutsidePointer)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsidePointer)
      document.removeEventListener('keydown', closeOnEscape)
      cancelScheduledClose()
    }
  }, [])

  const isGroupActive = (group: NavigationGroup) => pathname.startsWith(group.pathPrefix)

  return (
    <>
        <nav ref={desktopNavRef} className="hidden items-center gap-1 justify-self-center text-sm text-muted-foreground md:flex" aria-label="Main navigation">
          <Link
            href={routePaths.home}
            className={`rounded-lg border px-3 py-2 transition-colors hover:border-primary/45 hover:bg-primary/10 hover:text-foreground focus-visible-ring touch-manipulation ${
              pathname === '/' ? 'border-primary/35 bg-primary/10 text-foreground' : 'border-transparent'
            }`}
          >
            HOME
          </Link>

          {navigationGroups.map((group) => {
            const isOpen = openMenu === group.id
            const isActive = isGroupActive(group)

            return (
              <div
                key={group.id}
                className="relative"
                onMouseEnter={() => {
                  cancelScheduledClose()
                  setOpenMenu(group.id)
                }}
                onMouseLeave={() => scheduleClose(group.id)}
                onFocus={() => {
                  cancelScheduledClose()
                  setOpenMenu(group.id)
                }}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) {
                    cancelScheduledClose()
                    setOpenMenu(null)
                  }
                }}
              >
                <button
                  id={`${group.id}-trigger`}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`${group.id}-menu`}
                  aria-haspopup="menu"
                  className={`inline-flex items-center gap-1 rounded-lg border px-3 py-2 transition-colors hover:border-primary/45 hover:bg-primary/10 hover:text-foreground focus-visible-ring touch-manipulation ${
                    isOpen || isActive ? 'border-primary/45 bg-primary/10 text-foreground shadow-[0_0_22px_hsl(var(--primary)/0.12)]' : 'border-transparent'
                  }`}
                  onClick={() => {
                    cancelScheduledClose()
                    setOpenMenu(isOpen ? null : group.id)
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'ArrowDown') {
                      event.preventDefault()
                      setOpenMenu(group.id)
                    }
                  }}
                >
                  {group.label}
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                </button>

                {isOpen && (
                  <div className="absolute left-0 top-full w-52 pt-2" onMouseEnter={cancelScheduledClose}>
                    <div
                      id={`${group.id}-menu`}
                      role="menu"
                      aria-labelledby={`${group.id}-trigger`}
                      className="rounded-xl border border-white/10 bg-card/95 p-1.5 shadow-2xl shadow-black/35 backdrop-blur-xl"
                    >
                      {group.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          role="menuitem"
                          className="block rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground focus-visible-ring"
                          onClick={() => {
                            cancelScheduledClose()
                            setOpenMenu(null)
                          }}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        <Dialog open={mobileOpen} onOpenChange={setMobileOpen}>
          <DialogTrigger asChild>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center justify-self-end rounded-lg text-muted-foreground hover:bg-white/5 hover:text-foreground focus-visible-ring touch-manipulation md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-7 w-7" aria-hidden="true" />
            </button>
          </DialogTrigger>
          <DialogContent showCloseButton={false} className="fixed inset-y-0 right-0 left-auto z-50 h-full w-full max-w-sm translate-x-0 translate-y-0 rounded-none border-y-0 border-r-0 border-l border-white/10 bg-background p-6 sm:max-w-md">
            <div className="flex h-full flex-col">
              <div className="mb-8 flex items-center justify-between">
                <span className="font-mono text-sm font-semibold tracking-widest">MENU</span>
                <DialogClose asChild>
                  <button
                    type="button"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-muted-foreground hover:bg-white/5 hover:text-foreground focus-visible-ring touch-manipulation"
                    aria-label="Close menu"
                  >
                    <X className="h-7 w-7" aria-hidden="true" />
                  </button>
                </DialogClose>
              </div>

              <nav className="flex flex-1 flex-col" aria-label="Mobile navigation">
                <Link
                  href={routePaths.home}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-primary/10 focus-visible-ring"
                  onClick={() => setMobileOpen(false)}
                >
                  HOME
                </Link>

                {navigationGroups.map((group) => {
                  const expanded = mobileExpanded === group.id
                  return (
                    <div key={group.id} className="border-t border-white/5 py-1">
                      <button
                        type="button"
                        aria-expanded={expanded}
                        className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-medium text-foreground transition-colors hover:bg-primary/10 focus-visible-ring"
                        onClick={() => setMobileExpanded(expanded ? null : group.id)}
                      >
                        {group.label}
                        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${expanded ? 'rotate-180' : ''}`} aria-hidden="true" />
                      </button>
                      {expanded && (
                        <div className="space-y-1 pb-2 pl-3">
                          {group.items.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-primary/10 hover:text-foreground focus-visible-ring"
                              onClick={() => setMobileOpen(false)}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </nav>
            </div>
          </DialogContent>
        </Dialog>
    </>
  )
}
