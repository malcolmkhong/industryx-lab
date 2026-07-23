/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        elevated: "0 18px 44px -28px hsl(var(--primary) / 0.7)",
        floating: "0 32px 90px -24px rgba(0, 0, 0, 0.85)",
        ambient: "0 2px 12px rgba(0, 0, 0, 0.04)",
        deep: "0 40px 100px -30px rgba(0, 0, 0, 0.9)",
      },
      zIndex: {
        base: "var(--z-base)",
        content: "var(--z-content)",
        header: "var(--z-header)",
        progress: "var(--z-progress)",
        nav: "var(--z-nav)",
        floating: "var(--z-floating)",
        banner: "var(--z-banner)",
        modal: "var(--z-modal)",
        skiplink: "var(--z-skiplink)",
      },
      letterSpacing: {
        "eyebrow-tight": "var(--tracking-eyebrow-tight)",
        "eyebrow-default": "var(--tracking-eyebrow-default)",
        eyebrow: "var(--tracking-eyebrow)",
        "eyebrow-loose": "var(--tracking-eyebrow-loose)",
        display: "var(--tracking-display)",
      },
      fontSize: {
        nano: ["0.625rem", { lineHeight: "1rem" }],
        micro: ["0.6875rem", { lineHeight: "1rem" }],
        compact: ["0.78125rem", { lineHeight: "1.125rem" }],
        "mockup-2xs": ["10px", { lineHeight: "1.4" }],
        "mockup-xs": ["10.5px", { lineHeight: "1.4" }],
        "mockup-sm": ["11px", { lineHeight: "1.5" }],
        "mockup-md": ["11.5px", { lineHeight: "1.5" }],
        "mockup-lg": ["12px", { lineHeight: "1.5" }],
        "mockup-xl": ["12.5px", { lineHeight: "1.55" }],
        "display-lg": [
          "2.75rem",
          { lineHeight: "1.1", letterSpacing: "var(--tracking-display)" },
        ],
      },
      transitionDuration: {
        fast: "var(--motion-fast)",
        base: "var(--motion-base)",
        slow: "var(--motion-slow)",
        slower: "var(--motion-slower)",
        press: "var(--motion-press)",
        pop: "var(--motion-pop)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
