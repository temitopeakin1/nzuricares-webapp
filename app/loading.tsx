export default function Loading() {
  return (
    <div
      className="flex min-h-[40vh] flex-col items-center justify-center gap-3 px-4"
      aria-live="polite"
      aria-busy="true"
    >
      <div
        className="h-10 w-10 animate-spin rounded-full border-4 border-primary/30 border-t-primary"
        aria-hidden
      />
      <p className="text-sm font-medium text-gray-600">Loading page…</p>
    </div>
  );
}
