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
    <aside className="hidden w-72 flex-col border-r border-slate-800 bg-slate-950/70 p-6 lg:flex">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-400">
          Northstar
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Project Hub</h2>
      </div>

      <nav className="space-y-2" aria-label="Sidebar navigation">
        {navItems.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => onNavigate(item.view)}
            className={`flex w-full items-center rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
              activeView === item.view
                ? "bg-slate-800 text-white shadow-sm"
                : "text-slate-400 hover:bg-slate-900 hover:text-slate-100"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-auto rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
        <p className="text-sm font-semibold text-white">Need a hand?</p>
        <p className="mt-1 text-sm text-slate-400">
          Add onboarding and support content here.
        </p>
      </div>
    </aside>
  );
}
