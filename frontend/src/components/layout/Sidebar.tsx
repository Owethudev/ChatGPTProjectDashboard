import type { View } from "../../types";

type SidebarProps = {
  activeView: View;
  onNavigate: (view: View) => void;
};

const navItems: Array<{ label: string; view: View }> = [
  { label: "Dashboard", view: "dashboard" },
  { label: "Projects", view: "projects" },
  { label: "Tasks", view: "tasks" },
  { label: "Reports", view: "reports" },
];

export function Sidebar({ activeView, onNavigate }: SidebarProps) {
  return (
    <aside className="hidden w-72 flex-col border-r border-white/70 bg-white/60 p-6 backdrop-blur-2xl lg:flex">
      <div className="mb-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-sky-500">
          SYNTH
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-900">
          Neural OS
        </h2>
      </div>

      <nav className="space-y-2" aria-label="Sidebar navigation">
        {navItems.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => onNavigate(item.view)}
            className={`flex w-full items-center rounded-full px-4 py-3 text-left text-sm font-medium transition ${
              activeView === item.view
                ? "bg-gradient-to-r from-sky-500/15 to-violet-500/10 text-slate-900 shadow-[0_16px_40px_rgba(125,211,252,0.16)]"
                : "text-slate-600 hover:bg-white/80 hover:text-slate-900"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-auto rounded-[24px] border border-white/80 bg-white/75 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
        <p className="text-sm font-semibold text-slate-900">Ambient mode</p>
        <p className="mt-1 text-sm text-slate-600">
          The workspace stays calm and adaptive.
        </p>
      </div>
    </aside>
  );
}
