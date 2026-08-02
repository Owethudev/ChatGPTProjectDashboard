import { PriorityBadge } from "../ui/PriorityBadge";
import { StatusBadge } from "../ui/StatusBadge";
import type { Task, TeamMember } from "../../types";

type TaskCardProps = {
  task: Task;
  member?: TeamMember;
  onSelect?: (taskId: string) => void;
  onStatusChange?: (taskId: string, status: Task["status"]) => void;
  onPriorityChange?: (taskId: string, priority: Task["priority"]) => void;
};

export function TaskCard({
  task,
  member,
  onSelect,
  onStatusChange,
  onPriorityChange,
}: TaskCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(task.id)}
      className="
        w-full
        rounded-2xl
        border
        border-slate-800
        bg-slate-900/80
        p-5
        text-left
        transition-all
        duration-200
        hover:-translate-y-1
        hover:border-sky-500/40
        hover:bg-slate-900
        hover:shadow-lg
        focus:outline-none
        focus:ring-2
        focus:ring-sky-500
      "
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-white">
            {task.title}
          </h4>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            {task.description}
          </p>
        </div>

        <StatusBadge status={task.status} />
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-slate-400">
        <PriorityBadge priority={task.priority} />

        <span className="text-slate-600">•</span>

        <span>
          👤 {member?.name ?? "Unassigned"}
        </span>

        <span className="text-slate-600">•</span>

        <span>
          📅 Due {task.dueDate}
        </span>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <select
          value={task.status}
          onClick={(event) => event.stopPropagation()}
          onChange={(event) =>
            onStatusChange?.(
              task.id,
              event.target.value as Task["status"],
            )
          }
          className="
            rounded-lg
            border
            border-slate-700
            bg-slate-950/70
            px-3
            py-2
            text-sm
            text-white
            transition-colors
            hover:border-sky-500
            focus:border-sky-500
            focus:outline-none
          "
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="In Review">In Review</option>
          <option value="Completed">Completed</option>
        </select>

        <select
          value={task.priority}
          onClick={(event) => event.stopPropagation()}
          onChange={(event) =>
            onPriorityChange?.(
              task.id,
              event.target.value as Task["priority"],
            )
          }
          className="
            rounded-lg
            border
            border-slate-700
            bg-slate-950/70
            px-3
            py-2
            text-sm
            text-white
            transition-colors
            hover:border-sky-500
            focus:border-sky-500
            focus:outline-none
          "
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </select>
      </div>
    </button>
  );
}