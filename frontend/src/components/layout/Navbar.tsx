export function Navbar() {
  return (
    <header className="border-b border-white/70 bg-white/60 px-4 py-4 backdrop-blur-2xl sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">Good morning</p>
          <h1 className="text-xl font-semibold text-slate-900">
            Neural workspace overview
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="rounded-full border border-white/80 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
            Sync
          </button>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-violet-500 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(14,165,233,0.2)]">
            JS
          </div>
        </div>
      </div>
    </header>
  );
}
