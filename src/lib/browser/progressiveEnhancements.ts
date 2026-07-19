declare global {
  interface Window {
    __industryxEnhancementsInstalled?: boolean
  }
}

export function installProgressiveEnhancements() {
  if (window.__industryxEnhancementsInstalled) return
  window.__industryxEnhancementsInstalled = true

  const all = <T extends Element = HTMLElement>(selector: string) =>
    Array.from(document.querySelectorAll<T>(selector))
  const copyTimers = new WeakMap<HTMLButtonElement, number>()

  const closeDesktopMenus = (except?: Element) => {
    all<HTMLElement>('[data-nav-prefix]').forEach((group) => {
      if (group === except) return
      group.dataset.open = 'false'
      group.querySelector('[data-nav-trigger]')?.setAttribute('aria-expanded', 'false')
    })
  }

  const closeMobileNavigation = () => {
    const navigation = document.querySelector('[data-mobile-navigation]')
    if (navigation instanceof HTMLDetailsElement) navigation.open = false
    document.body.classList.remove('mobile-navigation-open')
  }

  const closeMobileContents = () => {
    const contents = document.querySelector('[data-mobile-contents]')
    if (contents instanceof HTMLDetailsElement) contents.open = false
  }

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
    let activeId = links[0].dataset.tocLink
    let activeIndex = 0
    links.forEach((link, index) => {
      const heading = document.getElementById(link.dataset.tocLink || '')
      if (heading && heading.getBoundingClientRect().top <= 112) {
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
      const totalLinks = mobileContents
        ? mobileContents.querySelectorAll('[data-toc-link]').length
        : links.length
      position.textContent = `${activeIndex + 1} / ${totalLinks}`
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

  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return
    const copyButton = event.target.closest('[data-copy-trigger]')
    if (copyButton instanceof HTMLButtonElement) {
      void copyText(copyButton.dataset.copyText || '').then(() => showCopiedState(copyButton))
      return
    }

    const trigger = event.target.closest('[data-nav-trigger]')
    if (trigger instanceof HTMLButtonElement) {
      const group = trigger.closest('[data-nav-prefix]')
      if (!(group instanceof HTMLElement)) return
      const willOpen = group.dataset.open !== 'true'
      closeDesktopMenus(group)
      group.dataset.open = String(willOpen)
      trigger.setAttribute('aria-expanded', String(willOpen))
      return
    }

    if (event.target.closest('[data-mobile-navigation-close]')) closeMobileNavigation()
    if (event.target.closest('[data-mobile-contents-close]')) closeMobileContents()
    const link = event.target.closest('a[href]')
    if (link instanceof HTMLAnchorElement) {
      if (link.closest('[data-mobile-navigation]')) closeMobileNavigation()
      if (link.closest('[data-mobile-contents]')) closeMobileContents()
      if (link.origin === window.location.origin) markActiveNavigation(link.pathname)
    }
  })

  document.addEventListener('change', (event) => {
    if (event.target instanceof HTMLInputElement && event.target.matches('[data-guide-stage]')) {
      updateGuideProgress()
    }
  })

  document.addEventListener('pointerdown', (event) => {
    if (!(event.target instanceof Element) || !event.target.closest('[data-nav-prefix]')) {
      closeDesktopMenus()
    }
  })

  document.addEventListener('focusout', (event) => {
    if (!(event.target instanceof Element)) return
    const group = event.target.closest('[data-nav-prefix]')
    if (!(group instanceof HTMLElement)) return
    window.setTimeout(() => {
      if (!group.contains(document.activeElement)) closeDesktopMenus()
    }, 0)
  })

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeDesktopMenus()
      closeMobileNavigation()
      closeMobileContents()
    }
    if (event.key === 'ArrowDown' && event.target instanceof Element) {
      const trigger = event.target.closest('[data-nav-trigger]')
      const group = trigger?.closest('[data-nav-prefix]')
      const firstItem = group?.querySelector('[role="menuitem"]')
      if (
        trigger instanceof HTMLButtonElement
        && group instanceof HTMLElement
        && firstItem instanceof HTMLElement
      ) {
        event.preventDefault()
        closeDesktopMenus(group)
        group.dataset.open = 'true'
        trigger.setAttribute('aria-expanded', 'true')
        firstItem.focus()
      }
    }
  })

  document.addEventListener('toggle', (event) => {
    const navigation = event.target
    if (navigation instanceof HTMLDetailsElement && navigation.matches('[data-mobile-navigation]')) {
      document.body.classList.toggle('mobile-navigation-open', navigation.open)
      if (navigation.open) {
        navigation
          .querySelector<HTMLElement>('[data-mobile-navigation-close-button]')
          ?.focus()
      }
    }
    if (navigation instanceof HTMLDetailsElement && navigation.matches('[data-mobile-contents]')) {
      document.body.classList.toggle('mobile-contents-open', navigation.open)
      if (navigation.open) {
        navigation
          .querySelector<HTMLElement>('[data-mobile-contents-close-button]')
          ?.focus()
      } else {
        navigation.querySelector<HTMLElement>('summary')?.focus()
      }
    }
  }, true)

  window.addEventListener('scroll', () => {
    scheduleHeadingUpdate()
    updateMobileScrollActions()
    updateReadingProgress()
  }, { passive: true })
  window.addEventListener('popstate', () => markActiveNavigation())
  markActiveNavigation()
  updateMobileScrollActions()
  updateGuideProgress()
  updateActiveHeading()
  updateReadingProgress()
}
