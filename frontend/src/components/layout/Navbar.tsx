export function Navbar() {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 px-4 py-4 shadow-sm backdrop-blur sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-400">Good morning</p>
          <h1 className="text-xl font-semibold text-white">
            Operations Overview
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-200">
            Export
          </button>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500/20 text-sm font-semibold text-sky-300">
            JS
          </div>
        </div>
      </div>
    </header>
  );
}
