export function MoonMark({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M20.4 15.2A8.5 8.5 0 0 1 8.8 3.6a8.5 8.5 0 1 0 11.6 11.6Z"
        fill="currentColor"
      />
      <circle cx="17.5" cy="5.5" r="1.1" fill="currentColor" opacity="0.7" />
    </svg>
  )
}
