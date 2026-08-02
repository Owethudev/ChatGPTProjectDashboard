import type { ProjectPriority, TaskPriority } from "../../types";

type PriorityBadgeProps = {
  priority: ProjectPriority | TaskPriority;
};

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const toneMap: Record<string, string> = {
    Low: "bg-slate-700 text-slate-200",
    Medium: "bg-violet-500/15 text-violet-300",
    High: "bg-amber-500/15 text-amber-300",
    Critical: "bg-rose-500/15 text-rose-300",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${toneMap[priority] ?? "bg-slate-700 text-slate-200"}`}
    >
      {priority}
    </span>
  );
}
