import { Badge } from "../ui/Badge";
import type { Task } from "../../types";

type TaskCardProps = {
  task: Task;
};

export function TaskCard({ task }: TaskCardProps) {
  const toneMap = {
    High: "danger" as const,
    Medium: "warning" as const,
    Low: "default" as const,
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h4 className="font-semibold text-white">{task.title}</h4>
          <p className="mt-2 text-sm text-slate-400">{task.description}</p>
        </div>
        <Badge label={task.priority} tone={toneMap[task.priority]} />
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-slate-400">
        <Badge label={task.status} tone="info" />
        <span>Assigned to {task.assignee}</span>
        <span>•</span>
        <span>Due {task.dueDate}</span>
      </div>
    </div>
  );
}
