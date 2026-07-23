import { Github } from "lucide-react";
import { ManageCookiesButton } from "@/components/consent/ManageCookiesButton";
import { MoonMark } from "@/components/site/MoonMark";
import { externalLinks, siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-card/20" role="contentinfo">
      <div className="flex flex-col gap-8 px-5 pt-12 mx-auto max-w-6xl pb-safe-5 sm:px-6">
        <div className="flex flex-col gap-6 justify-between items-start sm:flex-row sm:items-center">
          <div className="flex items-center gap-2.5 text-foreground">
            <span className="grid place-items-center w-7 h-7 rounded-lg ring-1 bg-primary/10 text-primary ring-primary/25">
              <MoonMark className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <span className="font-mono text-xs font-semibold tracking-widest uppercase">
              {siteConfig.brandName}
            </span>
          </div>
          <nav
            role="navigation"
            className="flex flex-wrap gap-6 items-center text-sm text-muted-foreground"
            aria-label="Footer navigation"
          >
            <a
              href={externalLinks.kimiCode}
              target="_blank"
              rel="noopener noreferrer"
              data-analytics-event="outbound_link"
              data-analytics-label="footer-kimi-code"
              data-analytics-section="footer"
              className="transition-colors hover:text-foreground focus-visible-ring touch-manipulation"
            >
              Official site
            </a>
            <a
              href={externalLinks.docs}
              target="_blank"
              rel="noopener noreferrer"
              data-analytics-event="outbound_link"
              data-analytics-label="footer-docs"
              data-analytics-section="footer"
              className="transition-colors hover:text-foreground focus-visible-ring touch-manipulation"
            >
              Docs
            </a>
            <a
              href={externalLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              data-analytics-event="outbound_link"
              data-analytics-label="footer-github-kimi"
              data-analytics-section="footer"
              className="flex items-center gap-1.5 transition-colors hover:text-foreground focus-visible-ring touch-manipulation"
            >
              <Github className="w-4 h-4" aria-hidden="true" />
              GitHub
            </a>
          </nav>
        </div>
        <div className="flex flex-col gap-2 pt-6 text-xs leading-relaxed border-t border-white/5 text-muted-foreground/70">
          <p>
            <ManageCookiesButton className="font-medium rounded text-primary underline-offset-4 hover:underline focus-visible-ring" />
            {" · "}
            <a
              href={siteConfig.privacy.policyPath}
              className="text-muted-foreground underline-offset-4 hover:underline"
            >
              Privacy policy
            </a>
          </p>
          <p>{siteConfig.disclaimer}</p>
          <p className="flex flex-wrap items-center gap-1.5">
            <span>{siteConfig.footerCredit.prefix}</span>
            <a
              href={externalLinks.industryX}
              target="_blank"
              rel="noopener noreferrer"
              data-analytics-event="outbound_link"
              data-analytics-label="footer-credit-industryx"
              data-analytics-section="footer"
              className="font-semibold rounded-sm animate-industryx-glow focus-visible-ring touch-manipulation"
            >
              {siteConfig.footerCredit.name}
            </a>
          </p>
          <p>{siteConfig.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
