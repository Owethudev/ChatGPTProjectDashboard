export function LoadingSpinner({ label = "Loading" }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 px-6 py-8 text-sm text-slate-300">
      <div className="h-4 w-4 animate-spin rounded-full border-2 border-sky-400 border-t-transparent" />
      <span>{label}...</span>
    </div>
  );
}
