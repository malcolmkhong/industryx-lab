import {
  applyRovingTabindex,
  closeDesktopMenus,
  closeDropdownsOnFocusout,
  closeDropdownOnOutsidePointerdown,
  handleDropdownKeydown,
  syncDropdownOpenState,
  toggleDropdownOnClick,
  type DropdownNavigationContext,
} from './dropdownNavigation'
import {
  closeMobileContents,
  closeMobileNavigation,
  closeMobileOverlaysOnAnchorClick,
  closeMobileOverlaysOnPointerDown,
  handleMobileCloseClicks,
  handleMobileNavigationToggle,
} from './mobileNavigation'

declare global {
  interface Window {
    __industryxEnhancementsInstalled?: boolean
    __industryxEnhancementsCleanup?: () => void
  }
}

export function installProgressiveEnhancements() {
  if (window.__industryxEnhancementsInstalled) {
    // Tests reset the install flag between cases so a fresh DOM can be wired
    // up, but the document-level listeners persist across jsdom tests. Drop
    // any previously registered listeners before re-installing so a single
    // event only reaches the most recent closure.
    window.__industryxEnhancementsCleanup?.()
  }
  window.__industryxEnhancementsInstalled = true

  // Collect teardown callbacks for every document/window listener we register
  // below so a re-install can remove them deterministically.
  const cleanups: Array<() => void> = []
  window.__industryxEnhancementsCleanup = () => {
    for (const cleanup of cleanups) cleanup()
    cleanups.length = 0
  }

  const all = <T extends Element = HTMLElement>(selector: string, root: ParentNode = document) =>
    Array.from(root.querySelectorAll<T>(selector))

  const listen = <K extends string>(
    target: EventTarget,
    type: K,
    handler: EventListener,
    options?: AddEventListenerOptions | boolean,
  ) => {
    target.addEventListener(type, handler, options)
    cleanups.push(() => target.removeEventListener(type, handler, options))
  }

  // Per-group cleanups track listeners attached to elements that may be torn
  // out of the DOM between jsdom tests.
  const groupCleanups = new WeakMap<HTMLElement, Array<() => void>>()

  const navigationCtx: DropdownNavigationContext = {
    listen,
    trackGroupCleanup: (group, cleanup) => {
      const list = groupCleanups.get(group) ?? []
      list.push(cleanup)
      groupCleanups.set(group, list)
    },
    all,
  }

  const copyTimers = new WeakMap<HTMLButtonElement, number>()

  const markActiveNavigation = (pathname = window.location.pathname) => {
    const normalized = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname
    all<HTMLElement>('[data-nav-exact]').forEach((link) => {
      link.dataset.active = String(normalized === link.dataset.navExact)
    })
    all<HTMLElement>('[data-nav-prefix]').forEach((group) => {
      group.dataset.active = String(normalized.startsWith(group.dataset.navPrefix || '/missing'))
    })
  }

  const updateMobileScrollActions = () => {
    const visible = window.scrollY > window.innerHeight
    all<HTMLElement>('[data-mobile-scroll-actions]').forEach((actions) => {
      actions.dataset.visible = String(visible)
    })
  }

  const updateReadingProgress = () => {
    const bar = document.querySelector('[data-reading-progress]')
    if (!(bar instanceof HTMLElement)) return
    const main = bar.closest('main')
    if (!main) return
    const rect = main.getBoundingClientRect()
    const total = rect.height - window.innerHeight
    const scrolled = Math.max(0, -rect.top)
    const percent = total > 0 ? Math.min(100, (scrolled / total) * 100) : 0
    const fill = bar.querySelector<HTMLElement>('[data-reading-progress-fill]')
    if (fill) fill.style.width = `${percent}%`
  }

  const fallbackCopy = (text: string) => {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.cssText = 'position:fixed;opacity:0;pointer-events:none'
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove()
  }

  const copyText = async (text: string) => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard API unavailable')
      await navigator.clipboard.writeText(text)
    } catch {
      fallbackCopy(text)
    }
  }

  const showCopiedState = (button: HTMLButtonElement) => {
    button.dataset.copied = 'true'
    const existingTimer = copyTimers.get(button)
    if (existingTimer) window.clearTimeout(existingTimer)
    copyTimers.set(button, window.setTimeout(() => {
      button.dataset.copied = 'false'
      copyTimers.delete(button)
    }, 2200))
  }

  const updateGuideProgress = () => {
    const progress = document.querySelector('[data-guide-progress]')
    if (!(progress instanceof HTMLElement)) return
    const checkboxes = all<HTMLInputElement>('[data-guide-stage]')
    const completed = checkboxes.filter((item) => item.checked).length
    const total = Number(progress.dataset.totalStages || checkboxes.length)
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0
    const status = progress.querySelector('[data-guide-progress-status]')
    const percentLabel = progress.querySelector('[data-guide-progress-percent]')
    const progressbar = progress.querySelector('[data-guide-progressbar]')
    const fill = progress.querySelector('[data-guide-progress-fill]')
    const completion = document.querySelector('[data-guide-completion]')

    if (status) status.textContent = (progress.dataset.statusTemplate || '')
      .replace('{completed}', String(completed))
      .replace('{total}', String(total))
    if (percentLabel) percentLabel.textContent = percent + '%'
    if (progressbar) progressbar.setAttribute('aria-valuenow', String(percent))
    if (fill instanceof HTMLElement) fill.style.width = percent + '%'
    if (completion instanceof HTMLElement) {
      completion.textContent = completed === total
        ? completion.dataset.allComplete || ''
        : (completion.dataset.remainingTemplate || '').replace('{remaining}', String(total - completed))
    }

    checkboxes.forEach((checkbox) => {
      const label = checkbox.closest('[data-stage-complete]')
      if (label instanceof HTMLElement) label.dataset.stageComplete = String(checkbox.checked)
    })
  }

  const updateActiveHeading = () => {
    const links = all<HTMLElement>('[data-toc-link]')
    if (links.length === 0) return
    // Pick the section the reader is currently looking at. The active heading
    // is the last one whose top is in the upper third of the viewport (i.e.
    // just below the sticky site header). Falling back to the sticky-header
    // offset when the viewport is shorter than 480px keeps the desktop sidebar
    // from lagging behind on landscape phones.
    const threshold = Math.max(112, Math.round(window.innerHeight * 0.33))
    let activeId = links[0].dataset.tocLink
    let activeIndex = 0
    links.forEach((link, index) => {
      const heading = document.getElementById(link.dataset.tocLink || '')
      if (heading && heading.getBoundingClientRect().top <= threshold) {
        activeId = heading.id
        activeIndex = index
      }
    })
    links.forEach((link) => {
      const active = link.dataset.tocLink === activeId
      link.dataset.active = String(active)
      if (active) link.setAttribute('aria-current', 'location')
      else link.removeAttribute('aria-current')
    })
    const activeLink = links[activeIndex]
    const label = document.querySelector('[data-mobile-contents-label]')
    const position = document.querySelector('[data-mobile-contents-position]')
    if (label instanceof HTMLElement && activeLink) {
      label.textContent = (activeLink.textContent || '').trim()
    }
    if (position instanceof HTMLElement) {
      const mobileContents = document.querySelector('[data-mobile-contents]')
      if (mobileContents) {
        const mobileLinks = all<HTMLElement>('[data-toc-link]', mobileContents)
        const mobileIndex = mobileLinks.findIndex((link) => link.dataset.tocLink === activeId)
        position.textContent = `${mobileIndex >= 0 ? mobileIndex + 1 : 1} / ${mobileLinks.length}`
      } else {
        position.textContent = `${activeIndex + 1} / ${links.length}`
      }
    }
  }

  let headingFrame = 0
  const scheduleHeadingUpdate = () => {
    if (headingFrame) return
    headingFrame = window.requestAnimationFrame(() => {
      headingFrame = 0
      updateActiveHeading()
    })
  }

  listen(document, 'click', ((event: Event) => {
    const mouseEvent = event as MouseEvent
    if (toggleDropdownOnClick(mouseEvent, navigationCtx)) return
    if (!(mouseEvent.target instanceof Element)) return
    const copyButton = mouseEvent.target.closest('[data-copy-trigger]')
    if (copyButton instanceof HTMLButtonElement) {
      void copyText(copyButton.dataset.copyText || '').then(() => showCopiedState(copyButton))
      return
    }
    handleMobileCloseClicks(mouseEvent)
    const link = closeMobileOverlaysOnAnchorClick(mouseEvent)
    if (link && link.origin === window.location.origin) markActiveNavigation(link.pathname)
  }) as EventListener)

  listen(document, 'change', (event) => {
    if (event.target instanceof HTMLInputElement && event.target.matches('[data-guide-stage]')) {
      updateGuideProgress()
    }
  })

  listen(document, 'pointerdown', ((event: Event) => {
    const pointerEvent = event as PointerEvent
    if (!closeDropdownOnOutsidePointerdown(pointerEvent)) {
      closeDesktopMenus(navigationCtx)
    }
    closeMobileOverlaysOnPointerDown(pointerEvent)
  }) as EventListener)

  listen(document, 'focusout', ((event: Event) => {
    closeDropdownsOnFocusout(event as FocusEvent)
  }) as EventListener)

  listen(document, 'keydown', ((event: Event) => {
    const keyboardEvent = event as KeyboardEvent
    // Per-dropdown keyboard nav must run before the global Escape handler so
    // it can return focus to the trigger when a specific dropdown closes.
    if (
      keyboardEvent.target instanceof Element
      && keyboardEvent.target.closest('[data-nav-prefix]')
      && handleDropdownKeydown(keyboardEvent)
    ) {
      return
    }

    if (keyboardEvent.key === 'Escape') {
      closeDesktopMenus(navigationCtx)
      closeMobileNavigation()
      closeMobileContents()
    }
  }) as EventListener)

  listen(document, 'toggle', (event) => {
    handleMobileNavigationToggle(event)
  }, true)

  listen(window, 'scroll', () => {
    scheduleHeadingUpdate()
    updateMobileScrollActions()
    updateReadingProgress()
  }, { passive: true })
  listen(window, 'popstate', () => markActiveNavigation())

  applyRovingTabindex(navigationCtx)
  syncDropdownOpenState(navigationCtx)
  markActiveNavigation()
  updateMobileScrollActions()
  updateGuideProgress()
  updateActiveHeading()
  updateReadingProgress()
}
