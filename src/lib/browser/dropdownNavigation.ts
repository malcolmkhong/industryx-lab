/**
 * Helpers that drive the desktop navigation dropdowns in `components/site/DesktopNav`.
 * The dropdowns are CSS-driven (hover/focus-within open the menu) but the
 * ARIA state, the click toggle, and keyboard navigation are wired here so
 * server-rendered markup stays accurate and assistive tech can tell whether
 * the popover is currently visible.
 */

export interface DropdownNavigationContext {
  /** Register a listener that can be torn down on re-install. */
  listen<K extends string>(
    target: EventTarget,
    type: K,
    handler: EventListener,
    options?: AddEventListenerOptions | boolean,
  ): void
  /** Track a per-group listener that should be torn down on re-install. */
  trackGroupCleanup(group: HTMLElement, cleanup: () => void): void
  /** Select every element matching `selector` under `root` (defaults to document). */
  all<T extends Element = HTMLElement>(selector: string, root?: ParentNode): T[]
}

const NAV_PREFIX_SELECTOR = '[data-nav-prefix]'
const NAV_TRIGGER_SELECTOR = '[data-nav-trigger]'
const NAV_MENU_ITEM_SELECTOR = '[role="menuitem"]'

export function closeDesktopMenus(ctx: DropdownNavigationContext, except?: Element) {
  ctx.all<HTMLElement>(NAV_PREFIX_SELECTOR).forEach((group) => {
    if (group === except) return
    group.dataset.open = 'false'
    group.querySelector(NAV_TRIGGER_SELECTOR)?.setAttribute('aria-expanded', 'false')
  })
}

export function setGroupOpen(group: HTMLElement, open: boolean) {
  group.dataset.open = String(open)
  const trigger = group.querySelector(NAV_TRIGGER_SELECTOR)
  if (trigger instanceof HTMLButtonElement) {
    trigger.setAttribute('aria-expanded', String(open))
  }
}

export function applyRovingTabindex(ctx: DropdownNavigationContext) {
  ctx
    .all<HTMLElement>(`${NAV_PREFIX_SELECTOR} ${NAV_MENU_ITEM_SELECTOR}`)
    .forEach((item) => item.setAttribute('tabindex', '-1'))
}

export function syncDropdownOpenState(ctx: DropdownNavigationContext) {
  ctx.all<HTMLElement>(NAV_PREFIX_SELECTOR).forEach((group) => {
    const onPointerEnter = () => setGroupOpen(group, true)
    const onPointerLeave = () => {
      // Leave the menu open if focus is still inside the group (keyboard users
      // moving the pointer out should not lose the open menu).
      if (!group.contains(document.activeElement)) setGroupOpen(group, false)
    }
    const onFocusIn = () => setGroupOpen(group, true)
    group.addEventListener('pointerenter', onPointerEnter)
    group.addEventListener('pointerleave', onPointerLeave)
    group.addEventListener('focusin', onFocusIn)
    ctx.trackGroupCleanup(group, () => {
      group.removeEventListener('pointerenter', onPointerEnter)
      group.removeEventListener('pointerleave', onPointerLeave)
      group.removeEventListener('focusin', onFocusIn)
    })
  })
}

export function toggleDropdownOnClick(event: MouseEvent, ctx: DropdownNavigationContext) {
  if (!(event.target instanceof Element)) return false
  const trigger = event.target.closest(NAV_TRIGGER_SELECTOR)
  if (!(trigger instanceof HTMLButtonElement)) return false
  const group = trigger.closest(NAV_PREFIX_SELECTOR)
  if (!(group instanceof HTMLElement)) return false
  const willOpen = group.dataset.open !== 'true'
  closeDesktopMenus(ctx, group)
  setGroupOpen(group, willOpen)
  return true
}

export function closeDropdownOnOutsidePointerdown(event: PointerEvent | MouseEvent) {
  if (!(event.target instanceof Element) || !event.target.closest(NAV_PREFIX_SELECTOR)) {
    // Caller still needs to know whether anything was closed.
    return false
  }
  return true
}

export function closeDropdownsOnFocusout(event: FocusEvent) {
  if (!(event.target instanceof Element)) return
  const group = event.target.closest(NAV_PREFIX_SELECTOR)
  if (!(group instanceof HTMLElement)) return
  window.setTimeout(() => {
    if (!group.contains(document.activeElement)) {
      setGroupOpen(group, false)
      group.querySelector(NAV_TRIGGER_SELECTOR)?.setAttribute('aria-expanded', 'false')
    }
  }, 0)
}

function getMenuItems(group: HTMLElement | null): HTMLElement[] {
  return group
    ? (Array.from(group.querySelectorAll<HTMLElement>(NAV_MENU_ITEM_SELECTOR)) as HTMLElement[])
    : []
}

function focusItem(items: HTMLElement[], nextIndex: number) {
  if (items.length === 0) return
  const clamped = Math.max(0, Math.min(items.length - 1, nextIndex))
  items[clamped].focus()
}

export function handleDropdownKeydown(event: KeyboardEvent) {
  if (!(event.target instanceof Element)) return false
  const group = event.target.closest(NAV_PREFIX_SELECTOR)
  if (!(group instanceof HTMLElement)) return false

  const items = getMenuItems(group)
  if (items.length === 0) return false

  const currentIndex = items.indexOf(document.activeElement as HTMLElement)

  if (event.key === 'ArrowDown') {
    event.preventDefault()
    const target = currentIndex === -1 ? 0 : (currentIndex + 1) % items.length
    setGroupOpen(group, true)
    focusItem(items, target)
    return true
  }

  if (event.key === 'ArrowUp') {
    event.preventDefault()
    const target = currentIndex === -1 ? items.length - 1 : (currentIndex - 1 + items.length) % items.length
    setGroupOpen(group, true)
    focusItem(items, target)
    return true
  }

  if (event.key === 'Home') {
    event.preventDefault()
    setGroupOpen(group, true)
    focusItem(items, 0)
    return true
  }

  if (event.key === 'End') {
    event.preventDefault()
    setGroupOpen(group, true)
    focusItem(items, items.length - 1)
    return true
  }

  if (event.key === 'Escape') {
    // Only act when the dropdown is actually open or a menu item is focused.
    if (group.dataset.open !== 'true' && currentIndex === -1) return false
    event.preventDefault()
    const trigger = group.querySelector<HTMLButtonElement>(NAV_TRIGGER_SELECTOR)
    // Defer the close until after focus has settled. Re-focusing the trigger
    // synchronously fires focusin on the group, which would otherwise
    // re-open the menu we just told to close.
    trigger?.focus()
    window.setTimeout(() => {
      setGroupOpen(group, false)
      group.querySelector(NAV_TRIGGER_SELECTOR)?.setAttribute('aria-expanded', 'false')
    }, 0)
    return true
  }

  return false
}
