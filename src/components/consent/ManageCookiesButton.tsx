"use client";

interface ManageCookiesButtonProps {
  className?: string;
}

/**
 * Footer link that re-opens the cookie consent banner by emitting the
 * in-tab consent change event the banner subscribes to. Wrapped in a
 * client component so the Server Component footer can render it.
 */
export function ManageCookiesButton({ className }: ManageCookiesButtonProps) {
  return (
    <button
      type="button"
      onClick={() =>
        window.dispatchEvent(new Event("industryx:consent-change"))
      }
      data-analytics-event="cta_click"
      data-analytics-label="footer-manage-cookies"
      data-analytics-section="footer"
      className={className}
    >
      Manage cookies
    </button>
  );
}
