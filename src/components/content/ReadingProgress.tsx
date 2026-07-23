export function ReadingProgress() {
  return (
    <div
      aria-hidden="true"
      data-reading-progress
      className="fixed inset-x-0 top-0 z-progress h-0.5 bg-white/5"
    >
      <div
        data-reading-progress-fill
        className="h-full w-0 bg-primary transition-[width] duration-fast ease-out"
      />
    </div>
  );
}
