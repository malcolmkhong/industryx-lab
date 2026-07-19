# Accessibility & UI Fixes Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix all accessibility, focus states, reduced motion, mobile navigation, and UI issues identified in the audit of the Kimi Code landing page.

**Architecture:** Systematic fixes across CSS utilities, all section components, and reusable components. Prioritize critical accessibility (focus-visible, reduced motion) first, then mobile nav, then polish.

**Tech Stack:** React 19 + Vite + TypeScript + Tailwind CSS + Radix UI + Lucide Icons

---

### Task 1: Add focus-visible & reduced-motion utilities to index.css

**Files:**
- Modify: `app/src/index.css:1-117`

**Step 1: Add focus-visible utility classes and prefers-reduced-motion media queries**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 232 30% 4%;
    --foreground: 0 0% 98%;
    --card: 232 22% 6%;
    --card-foreground: 0 0% 98%;
    --popover: 232 22% 6%;
    --popover-foreground: 0 0% 98%;
    --primary: 232 90% 76%;
    --primary-foreground: 232 45% 10%;
    --secondary: 232 15% 12%;
    --secondary-foreground: 0 0% 98%;
    --muted: 232 15% 12%;
    --muted-foreground: 232 12% 62%;
    --accent: 232 15% 12%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 72% 60%;
    --destructive-foreground: 0 0% 98%;
    --border: 232 14% 15%;
    --input: 232 14% 15%;
    --ring: 232 90% 76%;
    --radius: 0.75rem;
    --sidebar-background: 232 22% 6%;
    --sidebar-foreground: 0 0% 98%;
    --sidebar-primary: 232 90% 76%;
    --sidebar-primary-foreground: 232 45% 10%;
    --sidebar-accent: 232 15% 12%;
    --sidebar-accent-foreground: 0 0% 98%;
    --sidebar-border: 232 14% 15%;
    --sidebar-ring: 232 90% 76%;
  }
  
  /* Color scheme for dark mode */
  :root {
    color-scheme: dark;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  html {
    scroll-behavior: smooth;
  }
  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  body {
    @apply bg-background text-foreground;
    font-family:
      ui-sans-serif,
      system-ui,
      -apple-system,
      'Segoe UI',
      Roboto,
      'Helvetica Neue',
      Arial,
      sans-serif;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }
  ::selection {
    background: hsl(var(--primary) / 0.3);
    color: hsl(var(--foreground));
  }
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: hsl(var(--background));
  }
  ::-webkit-scrollbar-thumb {
    background: hsl(var(--border));
    border-radius: 8px;
  }
}

@layer utilities {
  .bg-grid {
    background-image:
      linear-gradient(to right, rgb(255 255 255 / 0.035) 1px, transparent 1px),
      linear-gradient(to bottom, rgb(255 255 255 / 0.035) 1px, transparent 1px);
    background-size: 54px 54px;
  }
  .mask-fade-edges {
    -webkit-mask-image: radial-gradient(ellipse 90% 70% at 50% 30%, black 30%, transparent 75%);
    mask-image: radial-gradient(ellipse 90% 70% at 50% 30%, black 30%, transparent 75%);
  }
  .text-glow {
    text-shadow: 0 0 40px hsl(var(--primary) / 0.45);
  }
  
  /* Focus visible utility */
  .focus-visible-ring {
    @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background;
  }
  
  /* Touch manipulation utility */
  .touch-manipulation {
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
  }
}

@keyframes drift {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-12px);
  }
}

@keyframes pulse-soft {
  0%, 100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .animate-drift {
    animation: drift 8s ease-in-out infinite;
  }
  .animate-pulse-soft {
    animation: pulse-soft 2.4s ease-in-out infinite;
  }
}

/* Reduced motion: disable animations */
@media (prefers-reduced-motion: reduce) {
  .animate-drift,
  .animate-pulse-soft {
    animation: none !important;
  }
}
```

**Step 2: Run dev server to verify no CSS errors**
```bash
cd app && bun run dev
```

---

### Task 2: Fix CopyButton component - add focus-visible, aria-label, touch-manipulation

**Files:**
- Modify: `app/src/components/CopyButton.tsx:1-33`

**Step 1: Update CopyButton with accessibility improvements**
```tsx
import { Check, Copy } from 'lucide-react'
import { useCopy } from '@/hooks/useCopy'

interface CopyButtonProps {
  text: string
  label?: string
  size?: 'sm' | 'lg'
  className?: string
}

export function CopyButton({ text, label = 'Copy', size = 'sm', className = '' }: CopyButtonProps) {
  const { copied, copy } = useCopy()

  const sizing =
    size === 'lg'
      ? 'h-12 px-6 text-sm gap-2.5 rounded-xl'
      : 'h-8 px-3 text-xs gap-1.5 rounded-lg'

  return (
    <button
      type="button"
      onClick={() => copy(text)}
      aria-label={label}
      className={`inline-flex shrink-0 items-center font-medium transition-all duration-200 focus-visible-ring touch-manipulation ${sizing} ${
        copied
          ? 'bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-400/30'
          : 'bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.97]'
      } ${className}`}
    >
      {copied ? <Check className={size === 'lg' ? 'h-4 w-4' : 'h-3.5 w-3.5'} aria-hidden="true" /> : <Copy className={size === 'lg' ? 'h-4 w-4' : 'h-3.5 w-3.5'} aria-hidden="true" />}
      {copied ? 'Copied!' : label}
    </button>
  )
}
```

---

### Task 3: Fix Reveal component - respect prefers-reduced-motion

**Files:**
- Modify: `app/src/components/Reveal.tsx:1-23`

**Step 1: Update Reveal**
```tsx
import type { ReactNode } from 'react'
import { useInView } from '@/hooks/useInView'
import { useEffect, useState } from 'react'

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
}

export function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>()
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  if (prefersReducedMotion) {
    return <div ref={ref} className={className}>{children}</div>
  }

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-out will-change-transform ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
```

---

