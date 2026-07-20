/**
 * Behaviour shared by the mobile menu drawer and the in-page mobile contents
 * bar. Both are native <details> widgets that should close on link click and
 * on Escape, and both toggle a body class so the rest of the page knows the
 * overlay is open.
 */

export function closeMobileNavigation() {
  const navigation = document.querySelector('[data-mobile-navigation]')
  if (navigation instanceof HTMLDetailsElement) navigation.open = false
  document.body.classList.remove('mobile-navigation-open')
}

export function closeMobileContents() {
  const contents = document.querySelector('[data-mobile-contents]')
  if (contents instanceof HTMLDetailsElement) contents.open = false
}

export function handleMobileNavigationToggle(event: Event) {
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
}

export function closeMobileOverlaysOnPointerDown(event: PointerEvent) {
  if (!(event.target instanceof Element)) return
  const mobileNav = document.querySelector('[data-mobile-navigation]')
  if (mobileNav instanceof HTMLDetailsElement && mobileNav.open) {
    if (!event.target.closest('[data-mobile-navigation]')) {
      closeMobileNavigation()
    }
  }
}

export function handleMobileCloseClicks(event: MouseEvent) {
  if (!(event.target instanceof Element)) return
  if (event.target.closest('[data-mobile-navigation-close]')) closeMobileNavigation()
  if (event.target.closest('[data-mobile-contents-close]')) closeMobileContents()
}

export function closeMobileOverlaysOnAnchorClick(event: MouseEvent) {
  if (!(event.target instanceof Element)) return
  const link = event.target.closest('a[href]')
  if (!(link instanceof HTMLAnchorElement)) return
  if (link.closest('[data-mobile-navigation]')) closeMobileNavigation()
  if (link.closest('[data-mobile-contents]')) closeMobileContents()
  return link
}
