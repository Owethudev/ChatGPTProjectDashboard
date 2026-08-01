import type { ProjectStatus, TaskStatus } from "../../types";

type StatusBadgeProps = {
  status: ProjectStatus | TaskStatus;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const toneMap: Record<string, string> = {
    Active: "bg-sky-500/15 text-sky-300",
    Planning: "bg-violet-500/15 text-violet-300",
    "On Track": "bg-emerald-500/15 text-emerald-300",
    "At Risk": "bg-amber-500/15 text-amber-300",
    Completed: "bg-emerald-500/15 text-emerald-300",
    Archived: "bg-slate-700 text-slate-200",
    "To Do": "bg-slate-700 text-slate-200",
    "In Progress": "bg-sky-500/15 text-sky-300",
    "In Review": "bg-amber-500/15 text-amber-300",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${toneMap[status] ?? "bg-slate-700 text-slate-200"}`}
    >
      {status}
    </span>
  );
}
