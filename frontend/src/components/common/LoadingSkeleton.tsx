export function LoadingSkeleton() {
  return (
    <div className="space-y-4" aria-label="Loading content">
      <div className="h-4 w-1/3 animate-pulse rounded bg-slate-800" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-28 animate-pulse rounded-2xl bg-slate-800"
          />
        ))}
      </div>
    </div>
  );
}
